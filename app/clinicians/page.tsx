'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Checkbox } from '@/components/ui/checkbox'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { clinicianApplicationSchema, type ClinicianApplication } from '@/lib/validations/forms'
import { ArrowLeft, Users, CheckCircle, Upload } from 'lucide-react'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export default function ClinicianApplication() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm<ClinicianApplication>({
    resolver: zodResolver(clinicianApplicationSchema)
  })

  const watchedShiftPreferences = watch('shiftPreferences') || []
  const watchedConsent = watch('consent') || false

  const handleShiftPreferenceChange = (shift: string, checked: boolean) => {
    if (checked) {
      setValue('shiftPreferences', [...watchedShiftPreferences, shift])
    } else {
      setValue('shiftPreferences', watchedShiftPreferences.filter(s => s !== shift))
    }
  }

  const onSubmit = async (data: ClinicianApplication) => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('firstName', data.firstName)
      formData.append('lastName', data.lastName)
      formData.append('email', data.email)
      formData.append('phone', data.phone)
      formData.append('city', data.city)
      formData.append('state', data.state)
      formData.append('specialty', data.specialty)
      formData.append('yearsExperience', data.yearsExperience)
      formData.append('shiftPreferences', JSON.stringify(data.shiftPreferences))
      formData.append('consent', String(data.consent))

      // Append resume file if selected
      const fileInput = document.querySelector<HTMLInputElement>('input[type="file"]')
      if (fileInput?.files?.[0]) {
        formData.append('resume', fileInput.files[0])
      }

      const response = await fetch('/api/apply', {
        method: 'POST',
        body: formData,
      })

      if (response.ok) {
        router.push('/success?type=apply')
      } else {
        throw new Error('Submission failed')
      }
    } catch (error) {
      console.error('Error submitting application:', error)
      alert('There was an error submitting your application. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const specialties = [
    'Board Certified Behavior Analyst (BCBA)',
    'Board Certified Assistant Behavior Analyst (BCaBA)',
    'Registered Behavior Technician (RBT)',
    'Behavior Technician',
    'Behavior Therapist',
    'Behavior Interventionist',
    'Clinical Supervisor',
    'Program Director',
    'Administrative Support',
    'Other'
  ]

  const experienceLevels = [
    'Less than 1 year',
    '1-2 years',
    '3-5 years',
    '6-10 years',
    '11-15 years',
    'More than 15 years'
  ]

  const workSettingOptions = [
    { value: 'clinic', label: 'Clinic-Based' },
    { value: 'home', label: 'Home-Based/In-Home' },
    { value: 'school', label: 'School-Based' },
    { value: 'telehealth', label: 'Telehealth' },
    { value: 'flexible', label: 'Flexible/Multiple Settings' }
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
              <div className="inline-flex items-center justify-center w-16 h-16 bg-primary-100 rounded-full mb-4">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Apply for ABA Opportunities
              </h1>
              <p className="text-xl text-gray-600">
                Find a Career That Fits Your Life—Not Just Your License. Join our network of BCBAs, RBTs, and behavioral health professionals.
              </p>
            </div>

            {/* Form */}
            <Card>
              <CardHeader>
                <CardTitle>Application Form</CardTitle>
                <CardDescription>
                  Please fill out the information below. This usually takes 3-5 minutes.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          {...register('firstName')}
                          className={errors.firstName ? 'border-red-500' : ''}
                        />
                        {errors.firstName && (
                          <p className="text-sm text-red-600 mt-1">{errors.firstName.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          {...register('lastName')}
                          className={errors.lastName ? 'border-red-500' : ''}
                        />
                        {errors.lastName && (
                          <p className="text-sm text-red-600 mt-1">{errors.lastName.message}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          {...register('email')}
                          className={errors.email ? 'border-red-500' : ''}
                        />
                        {errors.email && (
                          <p className="text-sm text-red-600 mt-1">{errors.email.message}</p>
                        )}
                      </div>
                      
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

                  {/* Professional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Professional Information</h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="specialty">Specialty/Role *</Label>
                        <Select onValueChange={(value) => setValue('specialty', value)}>
                          <SelectTrigger className={errors.specialty ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select your specialty" />
                          </SelectTrigger>
                          <SelectContent>
                            {specialties.map((specialty) => (
                              <SelectItem key={specialty} value={specialty}>
                                {specialty}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.specialty && (
                          <p className="text-sm text-red-600 mt-1">{errors.specialty.message}</p>
                        )}
                      </div>
                      
                      <div>
                        <Label htmlFor="yearsExperience">Years of Experience *</Label>
                        <Select onValueChange={(value) => setValue('yearsExperience', value)}>
                          <SelectTrigger className={errors.yearsExperience ? 'border-red-500' : ''}>
                            <SelectValue placeholder="Select experience level" />
                          </SelectTrigger>
                          <SelectContent>
                            {experienceLevels.map((level) => (
                              <SelectItem key={level} value={level}>
                                {level}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        {errors.yearsExperience && (
                          <p className="text-sm text-red-600 mt-1">{errors.yearsExperience.message}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Work Setting Preferences */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Work Setting Preferences *</h3>
                    <p className="text-sm text-gray-600">Select all that apply</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {workSettingOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <Checkbox
                            id={option.value}
                            checked={watchedShiftPreferences.includes(option.value)}
                            onCheckedChange={(checked) =>
                              handleShiftPreferenceChange(option.value, checked as boolean)
                            }
                          />
                          <Label htmlFor={option.value} className="text-sm font-normal">
                            {option.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                    {errors.shiftPreferences && (
                      <p className="text-sm text-red-600">{errors.shiftPreferences.message}</p>
                    )}
                  </div>

                  {/* Resume Upload */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900">Resume (Optional)</h3>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">
                        Upload your resume (PDF, DOC, or DOCX)
                      </p>
                      <Input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        className="mt-2"
                        {...register('resume')}
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
                        . I consent to be contacted about opportunities via email, phone, or text.
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
                          Submitting Application...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-5 h-5 mr-2" />
                          Submit Application
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