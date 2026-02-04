'use client';

import { ArrowRight, Brain, Zap, BookOpen, Target, TrendingUp, Users, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FloatingCode } from '@/components/floating-code';

export default function LandingPage() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen overflow-hidden bg-white relative">
      <FloatingCode />
      {/* Navigation */}
      <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                <Brain className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Brainion
              </span>
            </Link>
            <div className="hidden gap-8 md:flex">
              <a href="#features" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                Features
              </a>
              <a href="#benefits" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                Benefits
              </a>
              <a href="#testimonials" className="text-sm font-medium text-foreground/70 hover:text-foreground transition">
                Testimonials
              </a>
            </div>
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-6 py-2.5 text-sm font-semibold text-gray-900 shadow-lg hover:bg-white/30 hover:shadow-xl transition-all duration-300"
            >
              Get Started
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute -top-40 right-0 h-80 w-80 rounded-full bg-gradient-to-b from-primary/20 to-transparent blur-3xl" />
          <div className="absolute -bottom-40 left-0 h-80 w-80 rounded-full bg-gradient-to-b from-accent/20 to-transparent blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium text-primary">AI-Powered Learning Paths</span>
          </div>

          <h1 className="mb-6 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight text-balance">
            Learn Anything,
            <span className="block bg-gradient-to-r from-gray-700 via-gray-500 to-gray-900 bg-clip-text text-transparent animate-fadeUp">
              Faster Than Ever
            </span>
          </h1>

          <p className="mb-8 max-w-2xl mx-auto text-lg sm:text-xl text-foreground/60 text-balance">
            Create personalized learning curriculums in seconds with AI. Master any skill with structured paths tailored to your pace and goals.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/dashboard"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-white/90 backdrop-blur-md border border-white/40 px-8 py-3.5 text-base font-semibold text-gray-900 shadow-2xl hover:bg-white hover:shadow-[0_20px_60px_rgba(0,0,0,0.15)] transition-all duration-300 hover:scale-105"
            >
              Start Learning Free
              <ArrowRight className="h-5 w-5" />
            </Link>
            <button className="inline-flex items-center justify-center gap-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30 px-8 py-3.5 text-base font-semibold text-gray-900 hover:bg-white/30 transition-all duration-300">
              Watch Demo
              <span className="text-xs ml-1">3 min</span>
            </button>
          </div>

          <div className="mt-16 grid grid-cols-3 gap-4 sm:gap-8 pt-12 border-t border-border/40">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-1">1M+</div>
              <p className="text-sm text-foreground/60">Learning Paths Created</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-accent mb-1">50K+</div>
              <p className="text-sm text-foreground/60">Active Learners</p>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-secondary mb-1">4.9★</div>
              <p className="text-sm text-foreground/60">User Rating</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-balance mb-4">
              Intelligent Learning, Simplified
            </h2>
            <p className="text-lg text-foreground/60 max-w-2xl mx-auto">
              Cutting-edge AI technology meets intuitive design to create your perfect learning experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                icon: Brain,
                title: 'AI-Powered Generation',
                description: 'Instantly generate personalized curriculums using advanced AI that understands your learning style.',
              },
              {
                icon: Zap,
                title: 'Lightning Fast',
                description: 'Get comprehensive learning paths in seconds, not days. From topic to full curriculum instantly.',
              },
              {
                icon: Target,
                title: 'Goal-Oriented',
                description: 'Set your learning goals and let AI create the perfect structured path to achieve them.',
              },
              {
                icon: BookOpen,
                title: 'Rich Content',
                description: 'Access integrated resources, books, videos, and exercises curated for each learning path.',
              },
              {
                icon: TrendingUp,
                title: 'Progress Tracking',
                description: 'Monitor your learning journey with detailed analytics and adaptive difficulty adjustments.',
              },
              {
                icon: Users,
                title: 'Community Learning',
                description: 'Share curriculums, get feedback, and learn alongside thousands of other learners.',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="group relative rounded-2xl border border-border/40 bg-white p-8 transition-all duration-300 hover:border-primary/30 hover:bg-gradient-to-br hover:from-white hover:to-primary/5 hover:shadow-lg hover:shadow-primary/10"
              >
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-colors">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground">{feature.title}</h3>
                <p className="text-foreground/60">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 text-balance">
                Why Learners Choose Brainion
              </h2>
              <p className="text-lg text-foreground/60 mb-8">
                Traditional learning is broken. Generic curricula don't adapt to your pace, your goals, or your learning style. Brainion changes that.
              </p>

              {[
                'Personalized learning paths that adapt to you',
                'Save 10+ hours per week on curriculum planning',
                'Access expert-curated content and resources',
                'Track progress with intelligent analytics',
                'Achieve your goals 3x faster',
              ].map((benefit, idx) => (
                <div key={idx} className="mb-4 flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gradient-to-r from-primary to-accent">
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </div>
                  </div>
                  <p className="text-foreground font-medium">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="relative">
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary/20 via-accent/20 to-secondary/20 blur-3xl" />
              <div className="relative rounded-3xl border border-primary/20 bg-gradient-to-br from-white/80 to-white/40 backdrop-blur p-8 shadow-2xl shadow-primary/20">
                <div className="space-y-4">
                  <div className="rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 p-4 border border-primary/10">
                    <p className="text-sm font-medium text-foreground">Your Learning Style</p>
                    <p className="text-xs text-foreground/60 mt-1">Visual • Hands-on • Practical</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-accent/10 to-secondary/10 p-4 border border-accent/10">
                    <p className="text-sm font-medium text-foreground">Your Goal</p>
                    <p className="text-xs text-foreground/60 mt-1">Master React in 30 days</p>
                  </div>
                  <div className="rounded-lg bg-gradient-to-r from-secondary/10 to-primary/10 p-4 border border-secondary/10">
                    <p className="text-sm font-medium text-foreground">Personalized Curriculum</p>
                    <p className="text-xs text-foreground/60 mt-1">30-day structured path generated in 2 seconds</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-balance">
              Loved by Learners Worldwide
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: 'Sarah Chen',
                role: 'Product Manager',
                content: 'Brainion cut my learning time in half. The personalized paths are incredible.',
                avatar: '👩‍💼',
              },
              {
                name: 'Marcus Johnson',
                role: 'Software Engineer',
                content: 'Finally, a tool that understands how I learn. Best productivity tool I\'ve invested in.',
                avatar: '👨‍💻',
              },
              {
                name: 'Emily Rodriguez',
                role: 'Data Scientist',
                content: 'The AI-generated curriculums are so well-structured. Highly recommend to anyone serious about learning.',
                avatar: '👩‍🔬',
              },
            ].map((testimonial, idx) => (
              <div key={idx} className="rounded-2xl border border-border/40 bg-white p-8 hover:shadow-lg hover:shadow-primary/10 transition-shadow">
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">⭐</span>
                  ))}
                </div>
                <p className="mb-6 text-foreground/80 italic">"{testimonial.content}"</p>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-bold text-foreground">{testimonial.name}</p>
                    <p className="text-sm text-foreground/60">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative px-4 sm:px-6 lg:px-8 py-20 sm:py-32">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/10 to-secondary/10 blur-3xl" />
        </div>

        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-6 text-balance">
            Ready to Transform Your Learning?
          </h2>
          <p className="text-xl text-foreground/60 mb-8 text-balance">
            Join thousands of learners already mastering new skills with AI-powered personalized curriculums.
          </p>
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-10 py-4 text-lg font-bold text-white shadow-2xl shadow-primary/30 hover:shadow-2xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Start Your Free Curriculum Now
            <ArrowRight className="h-6 w-6" />
          </Link>

          <p className="mt-6 text-sm text-foreground/60">
            No credit card required • Start free • Upgrade anytime
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 px-4 sm:px-6 lg:px-8 py-12 bg-foreground/[0.02]">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent">
                  <Brain className="h-5 w-5 text-white" />
                </div>
                <span className="font-bold">Brainion</span>
              </Link>
              <p className="text-sm text-foreground/60">AI-powered personalized learning.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Product</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition">Features</a></li>
                <li><a href="#" className="hover:text-foreground transition">Pricing</a></li>
                <li><a href="#" className="hover:text-foreground transition">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Resources</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition">Blog</a></li>
                <li><a href="#" className="hover:text-foreground transition">Docs</a></li>
                <li><a href="#" className="hover:text-foreground transition">Support</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
              <ul className="space-y-2 text-sm text-foreground/60">
                <li><a href="#" className="hover:text-foreground transition">Privacy</a></li>
                <li><a href="#" className="hover:text-foreground transition">Terms</a></li>
                <li><a href="#" className="hover:text-foreground transition">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-border/40 pt-8 flex flex-col sm:flex-row justify-between items-center text-sm text-foreground/60">
            <p>&copy; 2024 Brainion. All rights reserved.</p>
            <div className="flex gap-6 mt-4 sm:mt-0">
              <a href="#" className="hover:text-foreground transition">Twitter</a>
              <a href="#" className="hover:text-foreground transition">GitHub</a>
              <a href="#" className="hover:text-foreground transition">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
