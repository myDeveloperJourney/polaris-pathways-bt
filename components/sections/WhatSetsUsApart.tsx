import { UserCheck, MessageSquare, Target, Compass, TrendingUp, Heart } from 'lucide-react'

/*
 * Background position reference (applied via Tailwind arbitrary values below):
 * base (<640px): 52% 78%  - Mobile: hands center-right, away from left icon rail
 * sm (≥640px):   42% 70%  - Transitioning
 * md (≥768px):   30% 60%  - Tablet: 2-col grid starts, can show more left
 * lg (≥1024px):  24% 54%  - Desktop: hands as focal point
 * xl (≥1280px):  22% 50%  - Wide desktop: slight left bias, face de-emphasized
 */

export default function WhatSetsUsApart() {
  // Order per Mark's requirements: Retention first, Culture-fit before Career/Growth paths
  const differentiators = [
    {
      icon: Target,
      title: 'Focus on retention and alignment',
      description: 'Human-first placements grounded in real outcomes, not just speed.'
    },
    {
      icon: UserCheck,
      title: 'Clinical-first vetting',
      description: 'With BCBA advisor oversight.'
    },
    {
      icon: MessageSquare,
      title: 'Recruiters trained in ABA',
      description: 'Language, ethics, and red flags.'
    },
    {
      icon: Heart,
      title: 'Culture-fit placements',
      description: 'Teams that stay, not churn.'
    },
    {
      icon: Compass,
      title: 'Career-path thinking',
      description: 'For clinicians.'
    },
    {
      icon: TrendingUp,
      title: 'Growth-path thinking',
      description: 'For clinics.'
    }
  ]

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background image: responsive positioning keeps hands/activity visible */}
      <div
        className="absolute inset-0 bg-cover bg-[position:52%_78%] sm:bg-[position:42%_70%] md:bg-[position:30%_60%] lg:bg-[position:24%_54%] xl:bg-[position:22%_50%]"
        style={{ backgroundImage: `url('/images/guided-hand.jpeg')` }}
      />

      {/* Overlay stack (order matters: later = on top) */}
      {/* 1. Vertical gradient: darker top/bottom for text, lighter middle to show hands */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/75 via-gray-900/35 to-gray-900/65" />
      {/* 2. Right gradient: de-emphasizes therapist face on right edge */}
      <div className="absolute inset-0 bg-gradient-to-l from-gray-900/50 via-transparent to-transparent" />
      {/* 3. Left gradient (mobile only): ensures icon rail readability */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/35 via-transparent to-transparent md:from-transparent" />

      {/* Content */}
      <div className="relative container-custom">
        <div className="max-w-5xl mx-auto">
          {/* Section label */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-0.5 bg-orange-400" />
            <span className="text-gray-200 text-sm font-medium">Why Us</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-12">
            Why Polaris Is Different
          </h2>

          {/* Differentiators Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
            {differentiators.map((item, index) => {
              const Icon = item.icon
              return (
                <div key={index} className="flex gap-3 md:gap-4">
                  <div className="flex-shrink-0">
                    {/* Icon circle: smaller + more transparent on mobile to reduce competition with hands */}
                    <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-orange-500/10 md:bg-orange-500/20 backdrop-blur-sm flex items-center justify-center">
                      <Icon className="w-4 h-4 md:w-6 md:h-6 text-orange-400" strokeWidth={1.5} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-base md:text-lg font-semibold text-white mb-0.5">
                      {item.title}
                    </h3>
                    <p className="text-sm md:text-base text-gray-300">
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
