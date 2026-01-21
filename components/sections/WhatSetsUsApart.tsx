import { UserCheck, MessageSquare, Target, Compass, TrendingUp, Heart } from 'lucide-react'

export default function WhatSetsUsApart() {
  const differentiators = [
    {
      icon: UserCheck,
      title: 'Clinical-first vetting',
      description: 'with BCBA advisor oversight'
    },
    {
      icon: MessageSquare,
      title: 'Recruiters trained in ABA',
      description: 'language, ethics, and red flags'
    },
    {
      icon: Target,
      title: 'Focus on retention and alignment',
      description: 'not just speed'
    },
    {
      icon: Compass,
      title: 'Career-path thinking',
      description: 'for clinicians'
    },
    {
      icon: TrendingUp,
      title: 'Growth-path thinking',
      description: 'for clinics'
    },
    {
      icon: Heart,
      title: 'Human-first philosophy',
      description: 'grounded in real outcomes'
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: `url('/images/what-makes-us-different-background.jpg')`,
        }}
      />
      <div className="absolute inset-0 bg-white/90" />

      {/* Content */}
      <div className="relative container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Section label with orange accent */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-orange-500" />
            <span className="text-gray-600 text-sm font-medium">Why Us</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-12">
            Why Polaris Is Different
          </h2>

          {/* Differentiators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {differentiators.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                      <Icon className="w-6 h-6 text-orange-500" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-gray-600">
                      {item.description}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
