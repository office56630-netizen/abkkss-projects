'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Sprout, Droplet, TrendingUp, Shield, Users, Award, ChevronRight, Leaf, Sun, Factory } from 'lucide-react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Header */}
      <header className="bg-green-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sprout className="h-10 w-10" />
              <div>
                <h1 className="text-xl md:text-2xl font-bold">अखिल भारतीय किसान कल्याण सेवा समिति</h1>
                <p className="text-sm text-green-100">हर खेत – जैविक खेत, हर थाली – पोषण से भरी!</p>
              </div>
            </div>
            <nav className="hidden md:flex gap-4">
              <Link href="/admin">
                <Button variant="ghost" className="text-white hover:bg-green-600">Admin</Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 md:py-32">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1567471945805-069e09c11098?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1ODF8MHwxfHNlYXJjaHwyfHx0cmFkaXRpb25hbCUyMGFncmljdWx0dXJlfGVufDB8fHxncmVlbnwxNzY4MjAzMDU2fDA&ixlib=rb-4.1.0&q=85" 
            alt="Indian Farmers" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl md:text-6xl font-bold text-green-800 mb-6">
              🌾 रसायन-मुक्त कृषि की ओर 🌾
            </h2>
            <p className="text-xl md:text-2xl text-gray-700 mb-8">
              "मिट्टी से मित्रता, प्रकृति से प्रेम और किसान से शक्ति"
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" className="bg-green-600 hover:bg-green-700 text-lg px-8 py-6">
                  किसान रजिस्ट्रेशन करें
                  <ChevronRight className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Vision, Mission, Commitment */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-green-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Sun className="h-8 w-8 text-orange-500" />
                  <CardTitle className="text-2xl text-green-800">🌟 दृष्टिकोण</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  भारत को एक स्वावलंबी, समृद्ध और रसायन-मुक्त कृषि राष्ट्र बनाना, जहाँ हर किसान न केवल अन्नदाता हो, बल्कि प्रकृति रक्षक भी बने।
                </p>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-8 w-8 text-blue-500" />
                  <CardTitle className="text-2xl text-green-800">🎯 मिशन</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ किसानों को जैविक खेती के लिए प्रेरित करना</li>
                  <li>✅ प्राकृतिक खेती को बढ़ावा देना</li>
                  <li>✅ देसी गोवंश आधारित कृषि को बढ़ावा</li>
                  <li>✅ किसानों की आय में वृद्धि</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-green-200 hover:shadow-xl transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-8 w-8 text-green-600" />
                  <CardTitle className="text-2xl text-green-800">🤝 प्रतिबद्धता</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-700">
                  <li>✅ जैविक खेती के लिए जनजागरूकता</li>
                  <li>✅ गैर-रासायनिक खेती का प्रसार</li>
                  <li>✅ ग्राम स्तर पर समन्वय</li>
                  <li>✅ युवा किसानों को प्रेरित करना</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Hi-Tech Farming Section */}
      <section className="py-16 bg-gradient-to-b from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">🚜 Hi-Tech Farming (हाईटेक खेती)</h2>
            <p className="text-xl text-gray-700">आधुनिक तकनीक से कम जमीन पर अधिक उत्पादन</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1506180064210-cfa64ed82c11?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwxfHxncmVlbmhvdXNlJTIwZmFybWluZyUyMEluZGlhfGVufDB8fHxncmVlbnwxNzY4MjAzMDQ5fDA&ixlib=rb-4.1.0&q=85"
                alt="Hi-Tech Farming"
                className="rounded-lg shadow-xl w-full h-[400px] object-cover"
              />
            </div>
            <div className="space-y-6">
              <Card className="border-l-4 border-l-green-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Factory className="h-6 w-6 text-green-600" />
                    नियंत्रित वातावरण
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>🏠 Polyhouse / Greenhouse</li>
                    <li>🌡️ Climate control (humidity, temp)</li>
                    <li>💧 Automated irrigation & fertigation</li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-l-4 border-l-blue-600">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Leaf className="h-6 w-6 text-blue-600" />
                    वैज्ञानिक तकनीक
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-gray-700">
                    <li>💧 ड्रिप इरिगेशन</li>
                    <li>🌱 हाइड्रोपोनिक्स</li>
                    <li>🏗️ वर्टिकल फार्मिंग</li>
                    <li>📊 मिट्टी परीक्षण</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-4 gap-6">
            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <TrendingUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">💰 अधिक आय</h3>
                <p className="text-sm text-gray-600">2 से 5 गुना तक आय वृद्धि</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Droplet className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">💧 कम पानी</h3>
                <p className="text-sm text-gray-600">50% तक पानी की बचत</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Shield className="h-12 w-12 text-orange-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">🛡️ मौसम सुरक्षा</h3>
                <p className="text-sm text-gray-600">सालभर उत्पादन</p>
              </CardContent>
            </Card>

            <Card className="text-center hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <h3 className="font-bold text-lg mb-2">⭐ उच्च गुणवत्ता</h3>
                <p className="text-sm text-gray-600">A-grade फसल</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Government Support */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 text-center mb-8">📘 सरकारी सहायता</h2>
            <Card className="border-green-200">
              <CardContent className="pt-6">
                <ul className="space-y-4 text-gray-700 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>पॉलीहाउस एवं ग्रीनहाउस पर <strong className="text-green-700">40-60% सब्सिडी</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>ड्रिप इरिगेशन पर <strong className="text-green-700">50-70% सब्सिडी</strong></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>हाइड्रोपोनिक यूनिट पर <strong className="text-green-700">प्रोजेक्ट आधारित सहायता</strong></span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">🚜 एक साथ आएं, जैविक भारत बनाएं!</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            रजिस्टर करें अपने गांव की जैविक क्रांति के लिए। जुड़ें हमारे किसान प्रशिक्षण शिविरों में।
          </p>
          <Link href="/register">
            <Button size="lg" className="bg-white text-green-700 hover:bg-gray-100 text-lg px-8 py-6">
              अभी रजिस्टर करें
              <Users className="ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-green-900 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-lg font-semibold mb-2">🌱 "कृषि का मूल धर्म – प्रकृति के अनुरूप जीवन" 🌱</p>
          <p className="text-green-300">अखिल भारतीय किसान कल्याण सेवा समिति</p>
          <p className="text-sm text-green-400 mt-2">हर खेत से हर घर तक – स्वस्थ अन्न, स्वस्थ जीवन, स्वच्छ भारत।</p>
        </div>
      </footer>
    </div>
  )
}