'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { facilityRequestSchema, type FacilityRequest } from '@/lib/validations/forms'
import { ArrowLeft, Building2, CheckCircle } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function FacilityRequest() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<FacilityRequest>({
    resolver: zodResolver(facilityRequestSchema)
  })

  const watchedConsent = watch('consent') || false

  const onSubmit = async (data: FacilityRequest) => {
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/request-staff', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        router.push('/success?type=request')
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting request:', error)
      alert('There was an error submitting your request. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contractLengths = [
    '1-4 weeks',
    '1-3 months',
    '3-6 months',
    '6-12 months',
    'Permanent placement',
    'Ongoing/PRN'
  ]

  const shiftTypes = [
    'Clinic-Based',
    'Home-Based/In-Home',
    'School-Based',
    'Telehealth',
    'Flexible/Multiple Settings'
  ]

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="pt-20 pb-16">
        <div className="container-custom">
          {/* Back Link */}
          <div className="mb-6">
            <Link 
              href="/" 
              className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Link>
          </div>

          <div className="max-w-3xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent-100 rounded-full mb-4">
                <Building2 className="w-8 h-8 text-accent-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Request ABA Talent
              </h1>
              <p className="text-xl text-gray-600">
                Build a Team That Stays. Serve Families with Confidence. Connect with clinically vetted BCBAs, RBTs, and behavioral health professionals.
              </p>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Staffing Request Form</CardTitle>
                <CardDescription>
                  Tell us about your staffing needs and we'll match you with qualified professionals.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Contact Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactName">Contact Name *</Label>
                        <Input
                          id="contactName"
                          {...register('contactName')}
                          className={errors.contactName ? 'border-red-500' : ''}
                        />
                        {errors.contactName && (
                          <p className="text-sm text-red-600 mt-1">{errors.contactName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="workEmail">Work Email *</Label>
                        <Input
                          id="workEmail"
                          type="email"
                          {...register('workEmail')}
                          className={errors.workEmail ? 'border-red-500' : ''}
                        />
                        {errors.workEmail && (
                          <p className="text-sm text-red-600 mt-1">{errors.workEmail.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          {...register('phone')}
                          className={errors.phone ? 'border-red-500' : ''}
                        />
                        {errors.phone && (
                          <p className="text-sm text-red-600 mt-1">{errors.phone.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="organizationName">Organization Name *</Label>
                        <Input
                          id="organizationName"
                          {...register('organizationName')}
                          className={errors.organizationName ? 'border-red-500' : ''}
                        />
                        {errors.organizationName && (
                          <p className="text-sm text-red-600 mt-1">{errors.organizationName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city">City *</Label>
                        <Input
                          id="city"
                          {...register('city')}
                          className={errors.city ? 'border-red-500' : ''}
                        />
                        {errors.city && (
                          <p className="text-sm text-red-600 mt-1">{errors.city.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="state">State *</Label>
                        <Input
                          id="state"
                          {...register('state')}
                          className={errors.state ? 'border-red-500' : ''}
                        />
                        {errors.state && (
                          <p className="text-sm text-red-600 mt-1">{errors.state.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Staffing Needs */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Staffing Requirements</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="roleNeeded">Role Needed *</Label>
                        <Input
                          id="roleNeeded"
                          placeholder="e.g., BCBA, RBT, Behavior Technician"
                          {...register('roleNeeded')}
                          className={errors.roleNeeded ? 'border-red-500' : ''}
                        />
                        {errors.roleNeeded && (
                          <p className="text-sm text-red-600 mt-1">{errors.roleNeeded.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="numberOfOpenings">Number of Openings *</Label>
                        <Input
                          id="numberOfOpenings"
                          type="number"
                          min="1"
                          {...register('numberOfOpenings')}
                          className={errors.numberOfOpenings ? 'border-red-500' : ''}
                        />
                        {errors.numberOfOpenings && (
                          <p className="text-sm text-red-600 mt-1">{errors.numberOfOpenings.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shiftType">Work Setting *</Label>
                        <Select onValueChange={(value) => setValue('shiftType', value)}>
                          <SelectTrigger className={errors.shiftType ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select work setting" />
                          </SelectTrigger>
                          <SelectContent>
                            {shiftTypes.map((shift) => (
                              <SelectItem key={shift} value={shift}>
                                {shift}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.shiftType && (
                          <p className="text-sm text-red-600 mt-1">{errors.shiftType.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="contractLength">Contract Length *</Label>
                        <Select onValueChange={(value) => setValue('contractLength', value)}>
                          <SelectTrigger className={errors.contractLength ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select contract length" />
                          </SelectTrigger>
                          <SelectContent>
                            {contractLengths.map((length) => (
                              <SelectItem key={length} value={length}>
                                {length}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.contractLength && (
                          <p className="text-sm text-red-600 mt-1">{errors.contractLength.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="startDate">Approximate Start Date *</Label>
                        <Input
                          id="startDate"
                          type="date"
                          {...register('startDate')}
                          className={errors.startDate ? 'border-red-500' : ''}
                        />
                        {errors.startDate && (
                          <p className="text-sm text-red-600 mt-1">{errors.startDate.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="budgetRange">Budget/Rate Range (Optional)</Label>
                        <Input
                          id="budgetRange"
                          placeholder="e.g., $40-50/hour"
                          {...register('budgetRange')}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Additional Information</h3>
                    
                    <div>
                      <Label htmlFor="notes">Special Requirements or Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Please describe any specific requirements, certifications needed, or additional details..."
                        rows={4}
                        {...register('notes')}
                      />
                    </div>
                  </div>

                  {/* Consent */}
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="consent"
                        checked={watchedConsent}
                        onCheckedChange={(checked) => setValue('consent', checked as boolean)}
                        className={errors.consent ? 'border-red-500' : ''}
                      />
                      <Label htmlFor="consent" className="text-sm leading-relaxed">
                        I agree to Polaris Pathways Behavioral Talent's{' '}
                        <Link href="/terms" className="text-primary-600 hover:underline">
                          Terms of Service
                        </Link>{' '}
                        and{' '}
                        <Link href="/privacy" className="text-primary-600 hover:underline">
                          Privacy Policy
                        </Link>
                        . I consent to be contacted about staffing solutions via email, phone, or text.
                      </Label>
                    </div>
                    {errors.consent && (
                      <p className="text-sm text-red-600">{errors.consent.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <div className="pt-6">
                    <Button
                      type="submit"
                      size="lg"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting Request...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Submit Staffing Request
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}