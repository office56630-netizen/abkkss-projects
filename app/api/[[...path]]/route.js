import { MongoClient } from 'mongodb'
import { NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'

const MONGO_URL = process.env.MONGO_URL
const DB_NAME = process.env.DB_NAME || 'kisan_kalyan'

let cachedClient = null

async function connectToDatabase() {
  if (cachedClient) {
    return cachedClient
  }

  const client = await MongoClient.connect(MONGO_URL, {
    maxPoolSize: 10,
    minPoolSize: 2,
  })

  cachedClient = client
  return client
}

// CORS headers
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
}

// Handle OPTIONS request
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders })
}

// GET handler
export async function GET(request) {
  try {
    const { pathname } = new URL(request.url)

    // Get all farmers
    if (pathname === '/api/farmers') {
      const client = await connectToDatabase()
      const db = client.db(DB_NAME)
      const farmers = await db.collection('farmers').find({}).sort({ registeredAt: -1 }).toArray()

      return NextResponse.json(
        { success: true, farmers },
        { headers: corsHeaders }
      )
    }

    // Health check
    if (pathname === '/api/health') {
      return NextResponse.json(
        { status: 'ok', message: 'Server is running' },
        { headers: corsHeaders }
      )
    }

    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: corsHeaders }
    )
  } catch (error) {
    console.error('GET Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500, headers: corsHeaders }
    )
  }
}

// POST handler
export async function POST(request) {
  try {
    const { pathname } = new URL(request.url)

    // Register farmer
    if (pathname === '/api/farmers') {
      const body = await request.json()
      
      // Validate required fields
      const required = ['name', 'mobile', 'village', 'district', 'state', 'pincode', 'farmSize', 'cropType', 'farmingMethod']
      for (const field of required) {
        if (!body[field]) {
          return NextResponse.json(
            { error: `${field} is required` },
            { status: 400, headers: corsHeaders }
          )
        }
      }

      // Validate mobile number
      if (!/^[0-9]{10}$/.test(body.mobile)) {
        return NextResponse.json(
          { error: 'Invalid mobile number. Must be 10 digits.' },
          { status: 400, headers: corsHeaders }
        )
      }

      // Validate pincode
      if (!/^[0-9]{6}$/.test(body.pincode)) {
        return NextResponse.json(
          { error: 'Invalid pincode. Must be 6 digits.' },
          { status: 400, headers: corsHeaders }
        )
      }

      const client = await connectToDatabase()
      const db = client.db(DB_NAME)

      // Check if farmer already exists
      const existing = await db.collection('farmers').findOne({ mobile: body.mobile })
      if (existing) {
        return NextResponse.json(
          { error: 'इस मोबाइल नंबर से पहले ही रजिस्ट्रेशन हो चुका है।' },
          { status: 400, headers: corsHeaders }
        )
      }

      const farmer = {
        id: uuidv4(),
        name: body.name,
        mobile: body.mobile,
        email: body.email || '',
        village: body.village,
        district: body.district,
        state: body.state,
        pincode: body.pincode,
        farmSize: body.farmSize,
        cropType: body.cropType,
        farmingMethod: body.farmingMethod,
        registeredAt: new Date().toISOString()
      }

      await db.collection('farmers').insertOne(farmer)

      return NextResponse.json(
        { success: true, message: 'रजिस्ट्रेशन सफल!', farmer },
        { status: 201, headers: corsHeaders }
      )
    }

    // Admin login (simple implementation)
    if (pathname === '/api/admin/login') {
      const body = await request.json()
      
      if (body.password === 'admin123') {
        return NextResponse.json(
          { success: true, message: 'Login successful' },
          { headers: corsHeaders }
        )
      }

      return NextResponse.json(
        { error: 'Invalid password' },
        { status: 401, headers: corsHeaders }
      )
    }

    return NextResponse.json(
      { error: 'Not found' },
      { status: 404, headers: corsHeaders }
    )
  } catch (error) {
    console.error('POST Error:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500, headers: corsHeaders }
    )
  }
}

// PUT handler
export async function PUT(request) {
  try {
    return NextResponse.json(
      { error: 'Method not implemented' },
      { status: 501, headers: corsHeaders }
    )
  } catch (error) {
    console.error('PUT Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}

// DELETE handler
export async function DELETE(request) {
  try {
    return NextResponse.json(
      { error: 'Method not implemented' },
      { status: 501, headers: corsHeaders }
    )
  } catch (error) {
    console.error('DELETE Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500, headers: corsHeaders }
    )
  }
}