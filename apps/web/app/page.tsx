"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function LandingPage() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-background/80 backdrop-blur-lg border-b"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            <div className="flex items-center space-x-2">
              <svg
                className="w-8 h-8 text-primary"
                viewBox="0 0 40 40"
                fill="none"
              >
                <path
                  d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
                <circle cx="20" cy="20" r="6" fill="currentColor" />
                <path
                  d="M20 14V20L24 24"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-2xl font-bold text-foreground">
                Smart Call
              </span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                How It Works
              </a>
              <a
                href="#pricing"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Pricing
              </a>
              <Link
                href="/sign-in"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/sign-up"
                className="bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-medium hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-40 md:pb-32 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-secondary/30 to-background"></div>

        {/* Animated Background SVG */}
        <div className="absolute inset-0 opacity-30">
          <svg
            className="w-full h-full"
            viewBox="0 0 1200 800"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                  offset="0%"
                  style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0.1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "hsl(var(--primary))", stopOpacity: 0 }}
                />
              </linearGradient>
            </defs>
            <circle
              cx="200"
              cy="200"
              r="300"
              fill="url(#grad1)"
              className="animate-pulse"
              style={{ animationDuration: "4s" }}
            />
            <circle
              cx="1000"
              cy="600"
              r="400"
              fill="url(#grad1)"
              className="animate-pulse"
              style={{ animationDuration: "5s", animationDelay: "1s" }}
            />
          </svg>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left space-y-8">
              <div className="inline-block px-4 py-2 bg-secondary rounded-full text-sm font-medium text-foreground mb-4">
                🚀 Transform Your Communication
              </div>
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
                Make Every Call
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-foreground to-muted-foreground">
                  Smarter & Faster
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto lg:mx-0">
                Revolutionize your business calls with AI-powered insights,
                real-time transcription, and intelligent automation.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  href="/sign-up"
                  className="bg-primary text-primary-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
                >
                  Start Free Trial
                </Link>
                <button className="border-2 border-border text-foreground px-8 py-4 rounded-lg text-lg font-semibold hover:bg-secondary transition-all flex items-center justify-center gap-2">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" />
                  </svg>
                  Watch Demo
                </button>
              </div>
              <div className="flex items-center gap-8 justify-center lg:justify-start pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">10K+</div>
                  <div className="text-sm text-muted-foreground">
                    Active Users
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">50M+</div>
                  <div className="text-sm text-muted-foreground">
                    Calls Processed
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground">
                    99.9%
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </div>
            </div>

            {/* Hero Illustration */}
            <div className="relative hidden lg:block">
              <svg viewBox="0 0 500 500" className="w-full h-auto">
                <defs>
                  <linearGradient
                    id="heroGrad"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop
                      offset="0%"
                      style={{ stopColor: "hsl(var(--primary))" }}
                    />
                    <stop
                      offset="100%"
                      style={{ stopColor: "hsl(var(--muted-foreground))" }}
                    />
                  </linearGradient>
                </defs>

                {/* Phone device */}
                <rect
                  x="150"
                  y="50"
                  width="200"
                  height="400"
                  rx="20"
                  fill="hsl(var(--card))"
                  stroke="hsl(var(--border))"
                  strokeWidth="2"
                />
                <rect
                  x="170"
                  y="70"
                  width="160"
                  height="280"
                  rx="10"
                  fill="hsl(var(--background))"
                />

                {/* Sound waves */}
                <g
                  className="animate-pulse"
                  style={{ animationDuration: "2s" }}
                >
                  <path
                    d="M 100 250 Q 120 230 140 250"
                    stroke="url(#heroGrad)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.6"
                  />
                  <path
                    d="M 90 250 Q 115 220 140 250"
                    stroke="url(#heroGrad)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.4"
                  />
                  <path
                    d="M 80 250 Q 110 210 140 250"
                    stroke="url(#heroGrad)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.2"
                  />
                </g>

                <g
                  className="animate-pulse"
                  style={{ animationDuration: "2s", animationDelay: "0.3s" }}
                >
                  <path
                    d="M 360 250 Q 380 230 400 250"
                    stroke="url(#heroGrad)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.6"
                  />
                  <path
                    d="M 360 250 Q 385 220 410 250"
                    stroke="url(#heroGrad)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.4"
                  />
                  <path
                    d="M 360 250 Q 390 210 420 250"
                    stroke="url(#heroGrad)"
                    strokeWidth="3"
                    fill="none"
                    opacity="0.2"
                  />
                </g>

                {/* AI Brain */}
                <circle
                  cx="250"
                  cy="200"
                  r="30"
                  fill="url(#heroGrad)"
                  opacity="0.2"
                  className="animate-pulse"
                />
                <path
                  d="M 240 190 L 250 200 L 265 185"
                  stroke="hsl(var(--primary))"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                />

                {/* Floating particles */}
                <circle
                  cx="120"
                  cy="150"
                  r="4"
                  fill="hsl(var(--primary))"
                  opacity="0.6"
                  className="animate-bounce"
                />
                <circle
                  cx="380"
                  cy="180"
                  r="3"
                  fill="hsl(var(--primary))"
                  opacity="0.4"
                  className="animate-bounce"
                  style={{ animationDelay: "0.5s" }}
                />
                <circle
                  cx="140"
                  cy="350"
                  r="5"
                  fill="hsl(var(--primary))"
                  opacity="0.5"
                  className="animate-bounce"
                  style={{ animationDelay: "1s" }}
                />
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Powerful Features for Modern Teams
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Everything you need to transform your business communication
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                AI-Powered Insights
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Get real-time intelligent suggestions and sentiment analysis
                during your calls to improve outcomes.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Live Transcription
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Automatic real-time transcription with speaker identification
                and searchable archives.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Lightning Fast
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Connect instantly with crystal-clear HD quality and minimal
                latency worldwide.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Enterprise Security
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Bank-level encryption and compliance with GDPR, HIPAA, and SOC 2
                standards.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Advanced Analytics
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Comprehensive dashboards and reports to track performance and
                optimize your calls.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-primary"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Smart Integrations
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                Seamlessly connect with your favorite CRM, calendar, and
                productivity tools.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              How Smart Call Works
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Get started in minutes with our simple three-step process
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connection lines */}
            <div className="hidden md:block absolute top-24 left-1/4 right-1/4 h-1 bg-gradient-to-r from-primary/20 via-primary to-primary/20"></div>

            {/* Step 1 */}
            <div className="text-center relative">
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="hsl(var(--secondary))"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="hsl(var(--primary))"
                    opacity="0.1"
                  />
                  <text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="text-5xl font-bold fill-primary"
                  >
                    1
                  </text>
                  <path
                    d="M 70 130 L 85 145 L 130 100"
                    stroke="hsl(var(--primary))"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Sign Up
              </h3>
              <p className="text-muted-foreground">
                Create your account in seconds. No credit card required for
                trial.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center relative">
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="hsl(var(--secondary))"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="hsl(var(--primary))"
                    opacity="0.1"
                  />
                  <text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="text-5xl font-bold fill-primary"
                  >
                    2
                  </text>
                  <rect
                    x="75"
                    y="125"
                    width="50"
                    height="8"
                    rx="4"
                    fill="hsl(var(--primary))"
                  />
                  <rect
                    x="70"
                    y="138"
                    width="60"
                    height="6"
                    rx="3"
                    fill="hsl(var(--primary))"
                    opacity="0.6"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Configure
              </h3>
              <p className="text-muted-foreground">
                Set up your preferences and integrate with your existing tools.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center relative">
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <svg viewBox="0 0 200 200" className="w-full h-full">
                  <circle
                    cx="100"
                    cy="100"
                    r="90"
                    fill="hsl(var(--secondary))"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="hsl(var(--primary))"
                    opacity="0.1"
                  />
                  <text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="text-5xl font-bold fill-primary"
                  >
                    3
                  </text>
                  <path
                    d="M 85 125 L 100 140 L 125 115"
                    stroke="hsl(var(--primary))"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-foreground mb-3">
                Start Calling
              </h3>
              <p className="text-muted-foreground">
                Begin making smarter calls with AI-powered assistance
                immediately.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 md:py-32 bg-secondary/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Loved by Teams Worldwide
            </h2>
            <p className="text-xl text-muted-foreground">
              See what our customers have to say
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all"
              >
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <svg
                      key={j}
                      className="w-5 h-5 text-primary"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  "Smart Call has transformed how our team communicates. The AI
                  insights are game-changing!"
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                    {String.fromCharCode(64 + i)}
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">
                      Customer {i}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      CEO, Company {i}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 md:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-muted-foreground">
              Choose the plan that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Starter Plan */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Starter
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-foreground">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-muted-foreground">
                    100 minutes/month
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-muted-foreground">
                    Basic transcription
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-muted-foreground">Email support</span>
                </li>
              </ul>
              <Link
                href="/sign-up"
                className="block w-full bg-secondary text-foreground text-center py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Professional Plan */}
            <div className="bg-primary text-primary-foreground rounded-2xl p-8 transform scale-105 shadow-2xl relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-foreground text-background px-4 py-1 rounded-full text-sm font-semibold">
                Most Popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Professional</h3>
              <div className="mb-6">
                <span className="text-5xl font-bold">$99</span>
                <span className="opacity-80">/month</span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Unlimited minutes</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>AI-powered insights</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Advanced analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>Priority support</span>
                </li>
              </ul>
              <Link
                href="/sign-up"
                className="block w-full bg-background text-foreground text-center py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity"
              >
                Get Started
              </Link>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-card border border-border rounded-2xl p-8 hover:shadow-xl transition-all">
              <h3 className="text-2xl font-bold text-foreground mb-2">
                Enterprise
              </h3>
              <div className="mb-6">
                <span className="text-5xl font-bold text-foreground">
                  Custom
                </span>
              </div>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-muted-foreground">
                    Everything in Pro
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-muted-foreground">
                    Custom integrations
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-muted-foreground">
                    Dedicated support
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <svg
                    className="w-6 h-6 text-primary flex-shrink-0"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="text-muted-foreground">SLA guarantee</span>
                </li>
              </ul>
              <button className="w-full bg-secondary text-foreground py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-br from-primary/10 via-secondary/30 to-primary/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Ready to Transform Your Calls?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of teams already using Smart Call to revolutionize
              their communication.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/sign-up"
                className="bg-primary text-primary-foreground px-10 py-4 rounded-lg text-lg font-semibold hover:opacity-90 transition-all transform hover:scale-105 shadow-lg"
              >
                Start Your Free Trial
              </Link>
              <button className="border-2 border-border text-foreground px-10 py-4 rounded-lg text-lg font-semibold hover:bg-secondary transition-all">
                Schedule a Demo
              </button>
            </div>
            <p className="mt-6 text-sm text-muted-foreground">
              No credit card required • 14-day free trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-secondary/30 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <svg
                  className="w-8 h-8 text-primary"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M20 5L5 12.5V27.5L20 35L35 27.5V12.5L20 5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                  />
                  <circle cx="20" cy="20" r="6" fill="currentColor" />
                </svg>
                <span className="text-xl font-bold text-foreground">
                  Smart Call
                </span>
              </div>
              <p className="text-muted-foreground text-sm">
                Making every call smarter, faster, and more productive.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Features
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Pricing
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Integrations
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    About
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Careers
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Privacy
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Terms
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Security
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Compliance
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © 2025 Smart Call. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
