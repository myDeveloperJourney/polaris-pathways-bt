import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Learn how Polaris Pathways Behavioral Talent collects, uses, and protects your personal information.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-gray-900">
                  Privacy Policy
                </CardTitle>
                <CardDescription className="text-lg text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="prose prose-gray max-w-none">
                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Introduction</h2>
                  <p className="text-gray-700 mb-4">
                    Polaris Pathways Behavioral Talent (&ldquo;we,&rdquo; &ldquo;our,&rdquo; or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our ABA staffing platform.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Information We Collect</h2>
                  
                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Personal Information</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Contact information (name, email, phone number, address)</li>
                    <li>Professional credentials and licenses</li>
                    <li>Work history and experience</li>
                    <li>Education and certifications</li>
                    <li>Background check results and references</li>
                  </ul>

                  <h3 className="text-lg font-semibold text-gray-800 mb-3">Facility Information</h3>
                  <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>Facility details and contact information</li>
                    <li>Staffing requirements and preferences</li>
                    <li>Billing and payment information</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">How We Use Your Information</h2>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Matching healthcare professionals with appropriate opportunities</li>
                    <li>Facilitating communication between facilities and professionals</li>
                    <li>Processing applications and verifying credentials</li>
                    <li>Providing customer support and service improvements</li>
                    <li>Ensuring compliance with healthcare regulations</li>
                    <li>Sending relevant updates and notifications</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Information Sharing</h2>
                  <p className="text-gray-700 mb-4">
                    We may share your information with:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Healthcare facilities when you apply for positions</li>
                    <li>Background check and verification service providers</li>
                    <li>Payment processors for billing purposes</li>
                    <li>Legal authorities when required by law</li>
                    <li>Service providers who assist in our operations (under strict confidentiality agreements)</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Data Security</h2>
                  <p className="text-gray-700 mb-4">
                    We implement appropriate technical and organizational security measures to protect your personal information against unauthorized or unlawful processing, accidental loss, destruction, or damage. This includes:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security assessments and updates</li>
                    <li>Access controls and authentication measures</li>
                    <li>Staff training on data protection practices</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Your Rights</h2>
                  <p className="text-gray-700 mb-4">
                    You have the right to:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2">
                    <li>Access and review your personal information</li>
                    <li>Request corrections to inaccurate information</li>
                    <li>Request deletion of your information (subject to legal requirements)</li>
                    <li>Opt-out of certain communications</li>
                    <li>Request data portability where applicable</li>
                  </ul>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Cookies and Tracking</h2>
                  <p className="text-gray-700 mb-4">
                    We use cookies and similar technologies to enhance your experience, analyze usage patterns, and improve our services. You can control cookie settings through your browser preferences.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">HIPAA Compliance</h2>
                  <p className="text-gray-700 mb-4">
                    As a healthcare staffing platform, we are committed to maintaining HIPAA compliance where applicable. We implement appropriate safeguards to protect health information and ensure authorized access only.
                  </p>
                </section>

                <section className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact Us</h2>
                  <p className="text-gray-700 mb-4">
                    If you have questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="text-gray-700">
                      <strong>Email:</strong> contact@polarispathbt.com
                    </p>
                  </div>
                </section>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}