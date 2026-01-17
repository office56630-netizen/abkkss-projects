'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Sprout, ArrowLeft, Download, Users } from 'lucide-react'

export default function AdminPage() {
  const [authenticated, setAuthenticated] = useState(false)
  const [password, setPassword] = useState('')
  const [farmers, setFarmers] = useState([])
  const [loading, setLoading] = useState(false)
  const [stats, setStats] = useState({ total: 0, organic: 0, hitech: 0 })

  const handleLogin = (e) => {
    e.preventDefault()
    // Simple password check (in production, use proper auth)
    if (password === 'admin123') {
      setAuthenticated(true)
      fetchFarmers()
    } else {
      alert('गलत पासवर्ड!')
    }
  }

  const fetchFarmers = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/farmers')
      const data = await response.json()
      if (response.ok) {
        setFarmers(data.farmers || [])
        // Calculate stats
        const total = data.farmers?.length || 0
        const organic = data.farmers?.filter(f => f.farmingMethod === 'जैविक')?.length || 0
        const hitech = data.farmers?.filter(f => f.farmingMethod === 'हाईटेक')?.length || 0
        setStats({ total, organic, hitech })
      }
    } catch (error) {
      console.error('Error fetching farmers:', error)
    } finally {
      setLoading(false)
    }
  }

  const downloadCSV = () => {
    if (farmers.length === 0) return

    const headers = ['नाम', 'मोबाइल', 'ईमेल', 'गाँव', 'जिला', 'राज्य', 'पिनकोड', 'खेत का आकार', 'फसल', 'खेती का तरीका', 'रजिस्ट्रेशन तिथि']
    const csvData = farmers.map(f => [
      f.name, f.mobile, f.email || '', f.village, f.district, f.state, f.pincode,
      f.farmSize, f.cropType, f.farmingMethod, new Date(f.registeredAt).toLocaleDateString('hi-IN')
    ])

    const csv = [headers, ...csvData].map(row => row.join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `farmers-${new Date().toISOString().split('T')[0]}.csv`
    a.click()
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardHeader>
            <CardTitle className="text-2xl text-green-800">Admin Login</CardTitle>
            <CardDescription>कृपया पासवर्ड डालें</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  required
                />
              </div>
              <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                Login
              </Button>
              <Link href="/">
                <Button variant="ghost" className="w-full">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  वापस जाएं
                </Button>
              </Link>
            </form>
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
              <h1 className="text-xl md:text-2xl font-bold">Admin Dashboard</h1>
              <p className="text-sm text-green-100">रजिस्टर्ड किसानों की जानकारी</p>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <Link href="/">
            <Button variant="ghost">
              <ArrowLeft className="mr-2 h-4 w-4" />
              होम पेज
            </Button>
          </Link>
          <Button onClick={downloadCSV} className="bg-green-600 hover:bg-green-700">
            <Download className="mr-2 h-4 w-4" />
            CSV Download करें
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-green-600" />
                कुल किसान
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-green-700">{stats.total}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-blue-600" />
                जैविक खेती
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-blue-700">{stats.organic}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Sprout className="h-5 w-5 text-purple-600" />
                हाईटेक खेती
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-4xl font-bold text-purple-700">{stats.hitech}</p>
            </CardContent>
          </Card>
        </div>

        {/* Farmers Table */}
        <Card>
          <CardHeader>
            <CardTitle>रजिस्टर्ड किसानों की सूची</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-center py-8 text-gray-500">लोड हो रहा है...</p>
            ) : farmers.length === 0 ? (
              <p className="text-center py-8 text-gray-500">अभी तक कोई किसान रजिस्टर नहीं हुआ है।</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>नाम</TableHead>
                      <TableHead>मोबाइल</TableHead>
                      <TableHead>गाँव</TableHead>
                      <TableHead>जिला</TableHead>
                      <TableHead>राज्य</TableHead>
                      <TableHead>खेत (एकड़)</TableHead>
                      <TableHead>फसल</TableHead>
                      <TableHead>खेती का तरीका</TableHead>
                      <TableHead>तिथि</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {farmers.map((farmer) => (
                      <TableRow key={farmer.id}>
                        <TableCell className="font-medium">{farmer.name}</TableCell>
                        <TableCell>{farmer.mobile}</TableCell>
                        <TableCell>{farmer.village}</TableCell>
                        <TableCell>{farmer.district}</TableCell>
                        <TableCell>{farmer.state}</TableCell>
                        <TableCell>{farmer.farmSize}</TableCell>
                        <TableCell>{farmer.cropType}</TableCell>
                        <TableCell>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            farmer.farmingMethod === 'जैविक' ? 'bg-green-100 text-green-800' :
                            farmer.farmingMethod === 'हाईटेक' ? 'bg-purple-100 text-purple-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {farmer.farmingMethod}
                          </span>
                        </TableCell>
                        <TableCell>{new Date(farmer.registeredAt).toLocaleDateString('hi-IN')}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}