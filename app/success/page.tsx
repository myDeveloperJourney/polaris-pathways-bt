'use client'

import { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CheckCircle, Users, Building2, ArrowRight, Home } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

function SuccessContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  
  const isClinicianApplication = type === 'apply'
  const isFacilityRequest = type === 'request'

  const getContent = () => {
    if (isClinicianApplication) {
      return {
        icon: Users,
        title: 'Application Submitted Successfully!',
        description: 'Thank you for applying with Polaris Pathways. We\'ve received your application and will guide you through the next steps of your ABA career journey.',
        nextSteps: [
          'Our team will review your application and career goals within 24-48 hours',
          'You\'ll receive an email with next steps and career alignment discussion',
          'We\'ll match you with opportunities that fit your values, lifestyle, and growth goals',
          'Begin your pathway to a career where you can grow, stay, and thrive'
        ],
        cta: {
          primary: { text: 'Return Home', href: '/', icon: Home },
          secondary: null
        }
      }
    } else if (isFacilityRequest) {
      return {
        icon: Building2,
        title: 'Staffing Request Received!',
        description: 'Thank you for choosing Polaris Pathways. We\'ve received your staffing request and will connect you with clinically aligned ABA professionals.',
        nextSteps: [
          'Our team will contact you within 2-4 hours during business hours',
          'We\'ll discuss your clinic culture, values, and specific staffing needs',
          'Receive profiles of clinically vetted, culture-fit BCBAs and RBTs',
          'Build a stable team focused on better outcomes'
        ],
        cta: {
          primary: { text: 'Return Home', href: '/', icon: Home },
          secondary: null
        }
      }
    } else {
      return {
        icon: CheckCircle,
        title: 'Thank You!',
        description: 'Your submission has been received successfully.',
        nextSteps: [
          'We\'ll review your submission and get back to you soon',
          'Check your email for confirmation and next steps'
        ],
        cta: {
          primary: { text: 'Return Home', href: '/', icon: Home },
          secondary: null
        }
      }
    }
  }

  const content = getContent()
  const Icon = content.icon

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <Card className="text-center">
              <CardHeader className="pb-6">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto">
                  <Icon className="w-10 h-10 text-green-600" />
                </div>
                <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  {content.title}
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  {content.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-8">
                {/* Next Steps */}
                <div className="text-left">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">What happens next?</h3>
                  <div className="space-y-3">
                    {content.nextSteps.map((step, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                          <span className="text-sm font-medium text-primary-600">{index + 1}</span>
                        </div>
                        <p className="text-gray-700">{step}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-50 rounded-lg p-6">
                  <h4 className="font-semibold text-gray-900 mb-2">Need immediate assistance?</h4>
                  <p className="text-gray-600 mb-4">
                    Our team is here to guide you through the next steps.
                  </p>
                  <div className="text-sm text-center">
                    <span className="font-medium text-gray-900">Email:</span>{' '}
                    <a href="mailto:hello@polarispathbt.com" className="text-primary-600 hover:underline">
                      hello@polarispathbt.com
                    </a>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button asChild size="lg" className="flex-1">
                    <Link href={content.cta.primary.href} className="flex items-center justify-center">
                      <content.cta.primary.icon className="w-5 h-5 mr-2" />
                      {content.cta.primary.text}
                    </Link>
                  </Button>
                  {content.cta.secondary && (
                    <Button variant="outline" asChild size="lg" className="flex-1">
                      <Link href={content.cta.secondary.href} className="flex items-center justify-center">
                        <content.cta.secondary.icon className="w-5 h-5 mr-2" />
                        {content.cta.secondary.text}
                      </Link>
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function SuccessPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-20 pb-16">
          <div className="container-custom">
            <div className="max-w-2xl mx-auto">
              <Card className="text-center">
                <CardHeader className="pb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 mx-auto">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <CardTitle className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                    Loading...
                  </CardTitle>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </main>
    }>
      <SuccessContent />
    </Suspense>
  )
}