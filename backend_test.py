#!/usr/bin/env python3
"""
Backend API Testing for Kisan Kalyan Website
Tests all backend APIs including farmer registration, retrieval, and validation
"""

import requests
import json
import sys
import time
from datetime import datetime

# Get base URL from environment
BASE_URL = "https://jaivikkheti.preview.emergentagent.com"
API_BASE = f"{BASE_URL}/api"

def print_test_result(test_name, success, message="", details=None):
    """Print formatted test results"""
    status = "✅ PASS" if success else "❌ FAIL"
    print(f"{status} - {test_name}")
    if message:
        print(f"    {message}")
    if details:
        print(f"    Details: {details}")
    print()

def test_health_check():
    """Test the health check endpoint"""
    print("🔍 Testing Health Check API...")
    try:
        response = requests.get(f"{API_BASE}/health", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('status') == 'ok':
                print_test_result("Health Check", True, "Server is running properly")
                return True
            else:
                print_test_result("Health Check", False, "Unexpected response format", data)
                return False
        else:
            print_test_result("Health Check", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        print_test_result("Health Check", False, f"Connection error: {str(e)}")
        return False

def test_get_farmers_empty():
    """Test getting farmers when database is empty"""
    print("🔍 Testing Get All Farmers API (Empty State)...")
    try:
        response = requests.get(f"{API_BASE}/farmers", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and isinstance(data.get('farmers'), list):
                print_test_result("Get Farmers (Empty)", True, f"Retrieved {len(data['farmers'])} farmers")
                return True, data['farmers']
            else:
                print_test_result("Get Farmers (Empty)", False, "Unexpected response format", data)
                return False, []
        else:
            print_test_result("Get Farmers (Empty)", False, f"HTTP {response.status_code}", response.text)
            return False, []
            
    except Exception as e:
        print_test_result("Get Farmers (Empty)", False, f"Connection error: {str(e)}")
        return False, []

def test_farmer_registration_valid():
    """Test farmer registration with valid data"""
    print("🔍 Testing Farmer Registration API (Valid Data)...")
    
    # Use realistic Indian farmer data
    farmer_data = {
        "name": "राजेश कुमार",
        "mobile": "9876543210",
        "email": "rajesh@example.com",
        "village": "सरायपुर",
        "district": "मेरठ",
        "state": "उत्तर प्रदेश",
        "pincode": "250001",
        "farmSize": "2.5",
        "cropType": "धान",
        "farmingMethod": "जैविक"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/farmers",
            json=farmer_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 201:
            data = response.json()
            if data.get('success') and data.get('farmer'):
                farmer = data['farmer']
                # Verify all fields are present
                required_fields = ['id', 'name', 'mobile', 'village', 'district', 'state', 'pincode', 'farmSize', 'cropType', 'farmingMethod', 'registeredAt']
                missing_fields = [field for field in required_fields if field not in farmer]
                
                if not missing_fields:
                    print_test_result("Farmer Registration (Valid)", True, f"Farmer registered successfully with ID: {farmer['id']}")
                    return True, farmer
                else:
                    print_test_result("Farmer Registration (Valid)", False, f"Missing fields in response: {missing_fields}")
                    return False, None
            else:
                print_test_result("Farmer Registration (Valid)", False, "Unexpected response format", data)
                return False, None
        else:
            print_test_result("Farmer Registration (Valid)", False, f"HTTP {response.status_code}", response.text)
            return False, None
            
    except Exception as e:
        print_test_result("Farmer Registration (Valid)", False, f"Connection error: {str(e)}")
        return False, None

def test_farmer_registration_duplicate():
    """Test farmer registration with duplicate mobile number"""
    print("🔍 Testing Farmer Registration API (Duplicate Mobile)...")
    
    # Use same mobile number as previous test
    farmer_data = {
        "name": "सुरेश कुमार",
        "mobile": "9876543210",  # Same mobile as previous test
        "email": "suresh@example.com",
        "village": "रामपुर",
        "district": "गाजियाबाद",
        "state": "उत्तर प्रदेश",
        "pincode": "201001",
        "farmSize": "1.5",
        "cropType": "गेहूं",
        "farmingMethod": "पारंपरिक"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/farmers",
            json=farmer_data,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code == 400:
            data = response.json()
            if 'error' in data and 'मोबाइल नंबर' in data['error']:
                print_test_result("Duplicate Mobile Check", True, "Correctly rejected duplicate mobile number")
                return True
            else:
                print_test_result("Duplicate Mobile Check", False, "Wrong error message", data)
                return False
        else:
            print_test_result("Duplicate Mobile Check", False, f"Expected 400, got {response.status_code}", response.text)
            return False
            
    except Exception as e:
        print_test_result("Duplicate Mobile Check", False, f"Connection error: {str(e)}")
        return False

def test_farmer_registration_validation():
    """Test farmer registration validation"""
    print("🔍 Testing Farmer Registration Validation...")
    
    validation_tests = [
        {
            "name": "Missing Name",
            "data": {
                "mobile": "9876543211",
                "village": "Test Village",
                "district": "Test District",
                "state": "Test State",
                "pincode": "123456",
                "farmSize": "1.0",
                "cropType": "Test Crop",
                "farmingMethod": "Test Method"
            },
            "expected_error": "name is required"
        },
        {
            "name": "Invalid Mobile (9 digits)",
            "data": {
                "name": "Test Farmer",
                "mobile": "987654321",  # 9 digits
                "village": "Test Village",
                "district": "Test District",
                "state": "Test State",
                "pincode": "123456",
                "farmSize": "1.0",
                "cropType": "Test Crop",
                "farmingMethod": "Test Method"
            },
            "expected_error": "Invalid mobile number"
        },
        {
            "name": "Invalid Mobile (11 digits)",
            "data": {
                "name": "Test Farmer",
                "mobile": "98765432111",  # 11 digits
                "village": "Test Village",
                "district": "Test District",
                "state": "Test State",
                "pincode": "123456",
                "farmSize": "1.0",
                "cropType": "Test Crop",
                "farmingMethod": "Test Method"
            },
            "expected_error": "Invalid mobile number"
        },
        {
            "name": "Invalid Pincode (5 digits)",
            "data": {
                "name": "Test Farmer",
                "mobile": "9876543212",
                "village": "Test Village",
                "district": "Test District",
                "state": "Test State",
                "pincode": "12345",  # 5 digits
                "farmSize": "1.0",
                "cropType": "Test Crop",
                "farmingMethod": "Test Method"
            },
            "expected_error": "Invalid pincode"
        },
        {
            "name": "Invalid Pincode (7 digits)",
            "data": {
                "name": "Test Farmer",
                "mobile": "9876543213",
                "village": "Test Village",
                "district": "Test District",
                "state": "Test State",
                "pincode": "1234567",  # 7 digits
                "farmSize": "1.0",
                "cropType": "Test Crop",
                "farmingMethod": "Test Method"
            },
            "expected_error": "Invalid pincode"
        }
    ]
    
    all_passed = True
    
    for test in validation_tests:
        try:
            response = requests.post(
                f"{API_BASE}/farmers",
                json=test["data"],
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            if response.status_code == 400:
                data = response.json()
                if 'error' in data and test["expected_error"].lower() in data['error'].lower():
                    print_test_result(f"Validation - {test['name']}", True, f"Correctly rejected: {data['error']}")
                else:
                    print_test_result(f"Validation - {test['name']}", False, f"Wrong error message: {data.get('error', 'No error message')}")
                    all_passed = False
            else:
                print_test_result(f"Validation - {test['name']}", False, f"Expected 400, got {response.status_code}")
                all_passed = False
                
        except Exception as e:
            print_test_result(f"Validation - {test['name']}", False, f"Connection error: {str(e)}")
            all_passed = False
    
    return all_passed

def test_get_farmers_with_data():
    """Test getting farmers after registration"""
    print("🔍 Testing Get All Farmers API (With Data)...")
    try:
        response = requests.get(f"{API_BASE}/farmers", timeout=10)
        
        if response.status_code == 200:
            data = response.json()
            if data.get('success') and isinstance(data.get('farmers'), list):
                farmers = data['farmers']
                if len(farmers) > 0:
                    # Check if farmers are sorted by registeredAt (newest first)
                    if len(farmers) > 1:
                        first_date = farmers[0].get('registeredAt')
                        second_date = farmers[1].get('registeredAt')
                        if first_date and second_date and first_date >= second_date:
                            print_test_result("Get Farmers (With Data)", True, f"Retrieved {len(farmers)} farmers, correctly sorted")
                        else:
                            print_test_result("Get Farmers (With Data)", True, f"Retrieved {len(farmers)} farmers, but sorting may be incorrect")
                    else:
                        print_test_result("Get Farmers (With Data)", True, f"Retrieved {len(farmers)} farmer")
                    
                    # Verify farmer data structure
                    farmer = farmers[0]
                    required_fields = ['id', 'name', 'mobile', 'village', 'district', 'state', 'pincode', 'farmSize', 'cropType', 'farmingMethod', 'registeredAt']
                    missing_fields = [field for field in required_fields if field not in farmer]
                    
                    if missing_fields:
                        print_test_result("Farmer Data Structure", False, f"Missing fields: {missing_fields}")
                        return False, farmers
                    else:
                        print_test_result("Farmer Data Structure", True, "All required fields present")
                        return True, farmers
                else:
                    print_test_result("Get Farmers (With Data)", False, "No farmers found after registration")
                    return False, []
            else:
                print_test_result("Get Farmers (With Data)", False, "Unexpected response format", data)
                return False, []
        else:
            print_test_result("Get Farmers (With Data)", False, f"HTTP {response.status_code}", response.text)
            return False, []
            
    except Exception as e:
        print_test_result("Get Farmers (With Data)", False, f"Connection error: {str(e)}")
        return False, []

def test_mongodb_connection():
    """Test MongoDB connection by attempting to register a farmer"""
    print("🔍 Testing MongoDB Connection...")
    
    # Try to register a test farmer to verify database connectivity
    test_farmer = {
        "name": "डेटाबेस टेस्ट",
        "mobile": "9999999999",
        "village": "टेस्ट गांव",
        "district": "टेस्ट जिला",
        "state": "टेस्ट राज्य",
        "pincode": "999999",
        "farmSize": "1.0",
        "cropType": "टेस्ट फसल",
        "farmingMethod": "टेस्ट विधि"
    }
    
    try:
        response = requests.post(
            f"{API_BASE}/farmers",
            json=test_farmer,
            headers={'Content-Type': 'application/json'},
            timeout=10
        )
        
        if response.status_code in [201, 400]:  # 201 for success, 400 for duplicate (both indicate DB connection works)
            if response.status_code == 201:
                print_test_result("MongoDB Connection", True, "Database connection working - farmer registered")
            else:
                # Check if it's a duplicate error (which means DB is working)
                data = response.json()
                if 'error' in data and 'मोबाइल नंबर' in data['error']:
                    print_test_result("MongoDB Connection", True, "Database connection working - duplicate detection working")
                else:
                    print_test_result("MongoDB Connection", False, f"Unexpected error: {data.get('error', 'Unknown error')}")
                    return False
            return True
        else:
            print_test_result("MongoDB Connection", False, f"HTTP {response.status_code}", response.text)
            return False
            
    except Exception as e:
        print_test_result("MongoDB Connection", False, f"Connection error: {str(e)}")
        return False

def run_all_tests():
    """Run all backend tests"""
    print("=" * 60)
    print("🚀 STARTING KISAN KALYAN BACKEND API TESTS")
    print("=" * 60)
    print(f"Testing against: {API_BASE}")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print()
    
    test_results = {}
    
    # Test 1: Health Check
    test_results['health_check'] = test_health_check()
    
    # Test 2: Get farmers (empty state)
    test_results['get_farmers_empty'], initial_farmers = test_get_farmers_empty()
    
    # Test 3: MongoDB Connection
    test_results['mongodb_connection'] = test_mongodb_connection()
    
    # Test 4: Farmer Registration (Valid)
    test_results['farmer_registration'], registered_farmer = test_farmer_registration_valid()
    
    # Test 5: Farmer Registration (Duplicate)
    test_results['duplicate_check'] = test_farmer_registration_duplicate()
    
    # Test 6: Validation Tests
    test_results['validation'] = test_farmer_registration_validation()
    
    # Test 7: Get farmers (with data)
    test_results['get_farmers_with_data'], final_farmers = test_get_farmers_with_data()
    
    # Summary
    print("=" * 60)
    print("📊 TEST SUMMARY")
    print("=" * 60)
    
    passed = sum(1 for result in test_results.values() if result)
    total = len(test_results)
    
    for test_name, result in test_results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} - {test_name.replace('_', ' ').title()}")
    
    print()
    print(f"Overall Result: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 ALL TESTS PASSED! Backend APIs are working correctly.")
        return True
    else:
        print("⚠️  Some tests failed. Please check the details above.")
        return False

if __name__ == "__main__":
    success = run_all_tests()
    sys.exit(0 if success else 1)