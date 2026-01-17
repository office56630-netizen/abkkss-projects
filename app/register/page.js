'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Sprout, ArrowLeft, CheckCircle } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    email: '',
    village: '',
    district: '',
    state: '',
    pincode: '',
    farmSize: '',
    cropType: '',
    farmingMethod: ''
  })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/farmers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
        setTimeout(() => {
          router.push('/')
        }, 3000)
      } else {
        alert(data.error || 'रजिस्ट्रेशन में समस्या आई। कृपया पुनः प्रयास करें।')
      }
    } catch (error) {
      alert('रजिस्ट्रेशन में समस्या आई। कृपया पुनः प्रयास करें।')
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-green-800 mb-2">रजिस्ट्रेशन सफल!</h2>
            <p className="text-gray-600 mb-4">आपका रजिस्ट्रेशन सफलतापूर्वक हो गया है। धन्यवाद!</p>
            <Link href="/">
              <Button className="bg-green-600 hover:bg-green-700">होम पेज पर जाएं</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Sprout className="h-10 w-10" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold">अखिल भारतीय किसान कल्याण सेवा समिति</h1>
              <p className="text-sm text-green-100">किसान रजिस्ट्रेशन फॉर्म</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            वापस जाएं
          </Button>
        </Link>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">किसान रजिस्ट्रेशन फॉर्म</CardTitle>
            <CardDescription>कृपया अपनी जानकारी सही-सही भरें</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">व्यक्तिगत जानकारी</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">पूरा नाम *</Label>
                    <Input 
                      id="name" 
                      name="name" 
                      placeholder="अपना पूरा नाम लिखें"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="mobile">मोबाइल नंबर *</Label>
                    <Input 
                      id="mobile" 
                      name="mobile" 
                      type="tel"
                      placeholder="10 अंकों का मोबाइल नंबर"
                      value={formData.mobile}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">ईमेल (वैकल्पिक)</Label>
                  <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              {/* Address Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">पता की जानकारी</h3>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="village">गाँव *</Label>
                    <Input 
                      id="village" 
                      name="village" 
                      placeholder="गाँव का नाम"
                      value={formData.village}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="district">जिला *</Label>
                    <Input 
                      id="district" 
                      name="district" 
                      placeholder="जिला का नाम"
                      value={formData.district}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">राज्य *</Label>
                    <Input 
                      id="state" 
                      name="state" 
                      placeholder="राज्य का नाम"
                      value={formData.state}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pincode">पिनकोड *</Label>
                    <Input 
                      id="pincode" 
                      name="pincode" 
                      placeholder="6 अंकों का पिनकोड"
                      value={formData.pincode}
                      onChange={handleChange}
                      pattern="[0-9]{6}"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Farming Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-green-800">खेती की जानकारी</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="farmSize">खेत का आकार (एकड़ में) *</Label>
                  <Input 
                    id="farmSize" 
                    name="farmSize" 
                    type="number"
                    step="0.1"
                    placeholder="उदाहरण: 2.5"
                    value={formData.farmSize}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropType">मुख्य फसल *</Label>
                  <Select value={formData.cropType} onValueChange={(value) => handleSelectChange('cropType', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="फसल चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="धान">धान</SelectItem>
                      <SelectItem value="गेहूं">गेहूं</SelectItem>
                      <SelectItem value="दलहन">दलहन</SelectItem>
                      <SelectItem value="तिलहन">तिलहन</SelectItem>
                      <SelectItem value="सब्जियां">सब्जियां</SelectItem>
                      <SelectItem value="फल">फल</SelectItem>
                      <SelectItem value="गन्ना">गन्ना</SelectItem>
                      <SelectItem value="कपास">कपास</SelectItem>
                      <SelectItem value="अन्य">अन्य</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmingMethod">खेती का तरीका *</Label>
                  <Select value={formData.farmingMethod} onValueChange={(value) => handleSelectChange('farmingMethod', value)} required>
                    <SelectTrigger>
                      <SelectValue placeholder="तरीका चुनें" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="पारंपरिक">पारंपरिक (Traditional)</SelectItem>
                      <SelectItem value="रासायनिक">रासायनिक (Chemical)</SelectItem>
                      <SelectItem value="जैविक">जैविक (Organic)</SelectItem>
                      <SelectItem value="प्राकृतिक">प्राकृतिक (Natural)</SelectItem>
                      <SelectItem value="हाईटेक">हाईटेक (Hi-Tech)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-green-600 hover:bg-green-700 text-lg py-6"
                disabled={loading}
              >
                {loading ? 'रजिस्टर हो रहा है...' : 'रजिस्ट्रेशन करें'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}