import { 
  FileText, 
  Eye, 
  Brain, 
  Search, 
  Target, 
  Globe, 
  Shield,
  Upload,
  ScanText,
  Zap,
  ArrowRight,
  Github
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useEffect, useRef, useState } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

export default function MedAILanding() {
  const horizontalSectionRef = useRef<HTMLDivElement>(null)
  const workflowContainerRef = useRef<HTMLDivElement>(null)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const section = horizontalSectionRef.current
    const container = workflowContainerRef.current
    
    if (!section || !container) return

    // Wait for the component to mount and get accurate measurements
    const setupAnimation = () => {
      // Refresh ScrollTrigger to get accurate measurements
      ScrollTrigger.refresh()
      
      const containerWidth = container.scrollWidth
      const sectionWidth = section.offsetWidth
      const scrollDistance = containerWidth - sectionWidth

      console.log('Container width:', containerWidth, 'Section width:', sectionWidth, 'Scroll distance:', scrollDistance)

      // Only proceed if we have content that overflows
      if (scrollDistance <= 0) {
        console.log('No overflow detected, skipping animation')
        return
      }

      // Create the horizontal scroll animation with longer duration
      gsap.to(container, {
        x: -scrollDistance,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          pin: true,
          scrub: 0.5, // Slower scrub for smoother, longer animation
          start: "top top",
          end: () => `+=${scrollDistance * 2}`, // Double the scroll distance for longer animation
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            console.log('Scroll progress:', self.progress)
          }
        }
      })

      // Create individual card centering animations
      const cards = container.querySelectorAll('.workflow-card')
      cards.forEach((card) => {
        // Set all cards to full opacity and normal scale - no individual animations
        gsap.set(card, { opacity: 1, scale: 1, y: 0 })
      })
    }

    // Delay to ensure DOM is ready and measurements are accurate
    const timer = setTimeout(setupAnimation, 300)

    // Also setup on window resize
    const handleResize = () => {
      ScrollTrigger.refresh()
      // Close mobile menu on resize to desktop
      if (window.innerWidth >= 1024) {
        setIsMobileMenuOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', handleResize)
      ScrollTrigger.getAll().forEach(trigger => trigger.kill())
    }
  }, [isMobileMenuOpen])

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      const nav = target.closest('nav')
      if (!nav && isMobileMenuOpen) {
        setIsMobileMenuOpen(false)
      }
    }

    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside)
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [isMobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' })
    setIsMobileMenuOpen(false) // Close mobile menu when navigating
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const features = [
    {
      icon: FileText,
      title: "Multi-format Support",
      description: "Process PDF files and images seamlessly with our advanced document handling system."
    },
    {
      icon: Eye,
      title: "Intelligent OCR",
      description: "Extract text from images and PDFs using powerful Tesseract OCR technology."
    },
    {
      icon: Brain,
      title: "Smart Medical Parsing",
      description: "Identify and extract medical values using advanced regex patterns and NLP techniques."
    },
    {
      icon: Search,
      title: "Semantic Understanding",
      description: "Leverage SentenceTransformer models for deep contextual analysis of medical reports."
    },
  
  ]

  const techStack = {
    backend: ["Python", "Tesseract OCR", "SentenceTransformer", "Scikit-learn", "NumPy", "Pandas", "OpenCV"],
    guiWeb: ["Custom Tkinter", "PyQt5", "Tkinter", "Django", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"]
  }

  const workflowSteps = [
    {
      icon: Upload,
      title: "Upload Report",
      description: "Upload your medical report as PDF or image file"
    },
    {
      icon: ScanText,
      title: "OCR & Text Extraction",
      description: "Extract and digitize text content using advanced OCR"
    },
    {
      icon: Brain,
      title: "Medical Value Parsing",
      description: "Parse and identify key medical values and indicators"
    },
    {
      icon: Zap,
      title: "Text Embeddings",
      description: "Generate semantic embeddings for deeper understanding"
    },
    {
      icon: Target,
      title: "Similarity Matching & Diagnosis",
      description: "Match patterns and provide diagnostic insights"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Fixed Navigation */}
      <nav className="fixed top-0 w-full bg-white/90 backdrop-blur-lg border-b border-slate-200/50 z-50 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MedAI
              </h1>
            </div>
            
            {/* Centered Navigation - Desktop Only */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <div className="flex items-center space-x-6 xl:space-x-8 bg-slate-50/80 px-6 xl:px-8 py-3 rounded-full border border-slate-200/50 shadow-sm">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-slate-600 hover:text-blue-600 transition-all duration-200 font-medium text-sm hover:scale-105"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-slate-600 hover:text-blue-600 transition-all duration-200 font-medium text-sm hover:scale-105"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('tech-stack')}
                  className="text-slate-600 hover:text-blue-600 transition-all duration-200 font-medium text-sm hover:scale-105"
                >
                  Tech Stack
                </button>
                <button 
                  onClick={() => scrollToSection('installation')}
                  className="text-slate-600 hover:text-blue-600 transition-all duration-200 font-medium text-sm hover:scale-105"
                >
                  Installation
                </button>
              </div>
            </div>
            
            {/* Contact Button - Desktop Only */}
            <div className="hidden sm:flex flex-shrink-0">
              <Button 
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-4 sm:px-6 py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-xs sm:text-sm"
                onClick={() => window.open('mailto:contact@medai.com', '_blank')}
              >
                <span className="hidden sm:inline">Contact Us</span>
                <span className="sm:hidden">Contact</span>
              </Button>
            </div>
            
            {/* Mobile Menu Button */}
            <div className="lg:hidden">
              <Button 
                variant="ghost" 
                size="sm"
                className="text-slate-600 p-2"
                onClick={toggleMobileMenu}
              >
                {isMobileMenuOpen ? (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                ) : (
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
          
          {/* Mobile Navigation Menu */}
          <div className={`lg:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-96 opacity-100 visible' 
              : 'max-h-0 opacity-0 invisible overflow-hidden'
          }`}>
            <div className="mt-4 pb-4 border-t border-slate-200/50">
              <div className="flex flex-col space-y-3 pt-4">
                <button 
                  onClick={() => scrollToSection('features')}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm text-left py-2 hover:bg-slate-50 px-2 rounded"
                >
                  Features
                </button>
                <button 
                  onClick={() => scrollToSection('how-it-works')}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm text-left py-2 hover:bg-slate-50 px-2 rounded"
                >
                  How It Works
                </button>
                <button 
                  onClick={() => scrollToSection('tech-stack')}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm text-left py-2 hover:bg-slate-50 px-2 rounded"
                >
                  Tech Stack
                </button>
                <button 
                  onClick={() => scrollToSection('installation')}
                  className="text-slate-600 hover:text-blue-600 transition-colors duration-200 font-medium text-sm text-left py-2 hover:bg-slate-50 px-2 rounded"
                >
                  Installation
                </button>
                <div className="pt-2 sm:hidden">
                  <Button 
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 font-semibold text-sm"
                    onClick={() => {
                      window.open('mailto:contact@medai.com', '_blank')
                      setIsMobileMenuOpen(false)
                    }}
                  >
                    Contact Us
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                100% Local Processing
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-800 leading-tight">
                MedAI
                <span className="block text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold text-blue-600 mt-2">
                  Smart Medical Analysis
                </span>
              </h1>
              
              <p className="text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg mx-auto lg:mx-0">
                Analyze medical reports using advanced OCR, NLP, and AI technology. 
                Process documents locally with complete privacy protection while gaining 
                powerful diagnostic insights.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-md mx-auto lg:mx-0">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('installation')}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold border-2 w-full sm:w-auto"
                >
                  See How It Works
                </Button>
              </div>
              
              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-2 sm:space-y-0 sm:space-x-6 text-xs sm:text-sm text-slate-500">
                <div className="flex items-center">
                  <FileText className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  PDF & Image Support
                </div>
                <div className="flex items-center">
                  <Globe className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  Multi-language
                </div>
                <div className="flex items-center">
                  <Brain className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                  AI-Powered
                </div>
              </div>
            </div>
            
            {/* Right side - Medical Report Mockup */}
            <div className="relative lg:pl-8 mt-8 lg:mt-0">
              <div className="relative max-w-md mx-auto lg:max-w-none">
                {/* Background decoration */}
                <div className="absolute -top-2 sm:-top-4 -right-2 sm:-right-4 w-48 h-48 sm:w-72 sm:h-72 bg-blue-100 rounded-full opacity-20"></div>
                <div className="absolute -bottom-4 sm:-bottom-8 -left-4 sm:-left-8 w-32 h-32 sm:w-48 sm:h-48 bg-green-100 rounded-full opacity-20"></div>
                
                {/* Medical Report Card */}
                <Card className="relative z-10 p-4 sm:p-6 lg:p-8 shadow-2xl bg-white border-0">
                  <div className="space-y-4 sm:space-y-6">
                    {/* Header */}
                    <div className="border-b pb-3 sm:pb-4">
                      <div className="flex justify-between items-start mb-2 sm:mb-3">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-800">Medical Report</h3>
                          <p className="text-xs sm:text-sm text-slate-500">Patient: John Doe</p>
                        </div>
                        <div className="text-right text-xs sm:text-sm text-slate-500">
                          <p>Date: 12/07/2025</p>
                          <p>ID: #MR-2025-001</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* Vital Signs */}
                    <div>
                      <h4 className="font-semibold text-slate-700 mb-2 sm:mb-3 flex items-center text-sm sm:text-base">
                        <Target className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2 text-blue-600" />
                        Vital Signs
                      </h4>
                      <div className="grid grid-cols-2 gap-2 sm:gap-4 text-xs sm:text-sm">
                        <div className="bg-green-50 p-2 sm:p-3 rounded-lg">
                          <p className="font-medium text-green-800">Blood Pressure</p>
                          <p className="text-green-600 text-base sm:text-lg font-bold">120/80</p>
                          <p className="text-green-600 text-xs">Normal</p>
                        </div>
                        <div className="bg-blue-50 p-2 sm:p-3 rounded-lg">
                          <p className="font-medium text-blue-800">Heart Rate</p>
                          <p className="text-blue-600 text-base sm:text-lg font-bold">72 bpm</p>
                          <p className="text-blue-600 text-xs">Normal</p>
                        </div>
                        <div className="bg-yellow-50 p-2 sm:p-3 rounded-lg">
                          <p className="font-medium text-yellow-800">Temperature</p>
                          <p className="text-yellow-600 text-base sm:text-lg font-bold">98.6°F</p>
                          <p className="text-yellow-600 text-xs">Normal</p>
                        </div>
                        <div className="bg-purple-50 p-2 sm:p-3 rounded-lg">
                          <p className="font-medium text-purple-800">O2 Saturation</p>
                          <p className="text-purple-600 text-base sm:text-lg font-bold">98%</p>
                          <p className="text-purple-600 text-xs">Normal</p>
                        </div>
                      </div>
                    </div>
                    
                    {/* AI Analysis */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-3 sm:p-4 rounded-lg border border-blue-200">
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="bg-blue-600 p-1.5 sm:p-2 rounded-full">
                          <Brain className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold text-blue-800 mb-1 sm:mb-2 text-sm sm:text-base">AI Analysis</h4>
                          <p className="text-xs sm:text-sm text-blue-700 mb-1 sm:mb-2">
                            All vital signs within normal ranges. No immediate concerns detected.
                          </p>
                          <div className="flex items-center text-xs text-blue-600">
                            <Zap className="w-2 h-2 sm:w-3 sm:h-3 mr-1" />
                            Processed in 0.8s
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status indicator */}
                    <div className="flex items-center justify-center pt-1 sm:pt-2">
                      <div className="flex items-center space-x-2 text-green-600">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span className="text-xs sm:text-sm font-medium">Analysis Complete</span>
                      </div>
                    </div>
                  </div>
                </Card>
                
                {/* Floating indicators around the report - Hidden on small screens */}
                <div className="hidden sm:block absolute -top-4 lg:-top-6 -left-4 lg:-left-6 bg-white p-2 lg:p-3 rounded-lg shadow-lg border border-green-200 z-20">
                  <div className="flex items-center space-x-1 lg:space-x-2 text-green-600">
                    <Eye className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm font-medium">OCR Active</span>
                  </div>
                </div>
                
                <div className="hidden sm:block absolute -top-4 lg:-top-6 -right-4 lg:-right-6 bg-white p-2 lg:p-3 rounded-lg shadow-lg border border-blue-200 z-20">
                  <div className="flex items-center space-x-1 lg:space-x-2 text-blue-600">
                    <Search className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm font-medium">AI Processing</span>
                  </div>
                </div>
                
                <div className="hidden sm:block absolute -bottom-4 lg:-bottom-6 -left-4 lg:-left-6 bg-white p-2 lg:p-3 rounded-lg shadow-lg border border-purple-200 z-20">
                  <div className="flex items-center space-x-1 lg:space-x-2 text-purple-600">
                    <Brain className="w-3 h-3 lg:w-4 lg:h-4" />
                    <span className="text-xs lg:text-sm font-medium">NLP Analysis</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 to-blue-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Advanced AI Technology
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 sm:mb-6">
              Powerful 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Features
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              Everything you need to analyze medical reports with precision and privacy. 
              Our cutting-edge AI technology transforms complex medical data into actionable insights.
            </p>
          </div>

          {/* Main Features Grid */}
          <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {/* Featured Card - Larger */}
            <div className="lg:col-span-2">
              <Card className="p-6 sm:p-8 h-full bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex flex-col sm:flex-row items-start space-y-4 sm:space-y-0 sm:space-x-6">
                  <div className="bg-white/20 p-3 sm:p-4 rounded-2xl group-hover:bg-white/30 transition-colors duration-300 mx-auto sm:mx-0">
                    <Brain className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Smart Medical Analysis</h3>
                    <p className="text-blue-100 text-base sm:text-lg leading-relaxed mb-4 sm:mb-6">
                      Our advanced AI combines OCR technology, NLP processing, and semantic understanding 
                      to provide comprehensive medical report analysis with unmatched accuracy.
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start space-y-2 sm:space-y-0 sm:space-x-4 text-blue-100 text-sm">
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                        <span>Real-time Processing</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Shield className="w-4 h-4" />
                        <span>100% Secure</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Secondary Feature */}
            <div>
              <Card className="p-4 sm:p-6 h-full bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] group">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-green-100 to-emerald-100 p-3 sm:p-4 rounded-2xl w-fit mx-auto mb-3 sm:mb-4 group-hover:from-green-200 group-hover:to-emerald-200 transition-colors duration-300">
                    <Shield className="h-8 w-8 sm:h-10 sm:w-10 text-green-600" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-slate-800 mb-2 sm:mb-3">Privacy-First Design</h3>
                  <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                    100% local processing ensures your medical data never leaves your system. 
                    Complete privacy protection you can trust.
                  </p>
                </div>
              </Card>
            </div>
          </div>

          {/* Feature Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {features.slice(0, 6).map((feature, index) => (
              <Card 
                key={index} 
                className="p-4 sm:p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] hover:-translate-y-1 group"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-2.5 sm:p-3 rounded-xl w-fit mx-auto mb-3 sm:mb-4 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-slate-800 mb-2 text-base sm:text-lg">{feature.title}</h3>
                  <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>

          {/* Additional Features - Two Column Layout */}
          <div className="mt-8 sm:mt-12 grid md:grid-cols-2 gap-6 sm:gap-8">
            {features.slice(6).map((feature, index) => (
              <Card 
                key={index + 6} 
                className="p-4 sm:p-6 bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group"
              >
                <div className="flex items-start space-x-3 sm:space-x-4">
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 p-2.5 sm:p-3 rounded-xl group-hover:from-purple-100 group-hover:to-pink-100 transition-colors duration-300">
                    <feature.icon className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-slate-800 mb-2 text-base sm:text-lg">{feature.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {/* Call to Action */}
          <div className="mt-12 sm:mt-16 text-center">
            <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-100">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-3 sm:mb-4">
                Ready to Transform Your Medical Analysis?
              </h3>
              <p className="text-slate-600 mb-4 sm:mb-6 max-w-2xl mx-auto text-sm sm:text-base">
                Join healthcare professionals who trust MedAI for accurate, private, and efficient medical report analysis.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center max-w-md mx-auto">
                <Button 
                  size="lg" 
                  onClick={() => scrollToSection('installation')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 w-full sm:w-auto"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  onClick={() => scrollToSection('how-it-works')}
                  className="px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold border-2 hover:bg-slate-50 w-full sm:w-auto"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Horizontal Scroll */}
      <section 
        ref={horizontalSectionRef}
        id="how-it-works" 
        className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden"
        style={{ height: 'auto', minHeight: '100vh' }}
      >
        {/* Background decorative elements */}
        <div className="absolute top-20 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '3s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{animationDelay: '1.5s'}}></div>
        
        {/* Fixed Header */}
        <div className="relative z-20 py-12 sm:py-16 lg:py-20 px-4 sm:px-6">
          <div className="text-center">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Seamless Workflow
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 sm:mb-6">
              How It 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Works
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
           
              <span className="lg:hidden">Our intelligent, privacy-first AI workflow designed for healthcare professionals.</span>
            </p>
          </div>
        </div>

        {/* Mobile/Tablet - Vertical Stack */}
        <div className="lg:hidden pb-12 sm:pb-16">
          <div className="container mx-auto px-4 sm:px-6">
            <div className="space-y-6 sm:space-y-8">
              {workflowSteps.map((step, index) => (
                <Card key={index} className="p-6 sm:p-8 bg-white/95 backdrop-blur-md border-0 shadow-2xl relative overflow-hidden">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-50/80"></div>
                  
                  {/* Step Number */}
                  <div className="absolute top-4 right-4 w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-lg sm:text-2xl">{index + 1}</span>
                  </div>

                  <div className="relative z-10">
                    {/* Icon */}
                    <div className="mb-6 sm:mb-8">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-4 sm:p-6 rounded-3xl shadow-lg w-fit">
                        <step.icon className="h-8 w-8 sm:h-12 sm:w-12 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="mb-6 sm:mb-8">
                      <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-bold mb-4 sm:mb-6">
                        Step {index + 1} of {workflowSteps.length}
                      </div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-800 mb-4 sm:mb-6">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-base sm:text-lg lg:text-xl">
                        {step.description}
                      </p>
                    </div>

                    {/* Progress Indicator */}
                    <div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                          style={{ width: `${((index + 1) / workflowSteps.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-xs sm:text-sm text-slate-500 font-medium">Workflow Progress</span>
                        <span className="text-xs sm:text-sm text-blue-600 font-bold">{Math.round(((index + 1) / workflowSteps.length) * 100)}%</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Desktop - Horizontal Scroll */}
        <div className="hidden lg:block absolute inset-0 overflow-hidden" style={{ marginTop: '250px' }}>
          <div 
            ref={workflowContainerRef}
            className="flex items-center space-x-16 pl-[50vw]"
            style={{ 
              width: `${workflowSteps.length * 600 + 800}px`,
              minWidth: '100vw'
            }}
          >
            {workflowSteps.map((step, index) => (
              <div key={index} className="workflow-card flex-shrink-0" style={{ width: '500px' }}>
                <Card className="h-[500px] p-10 bg-white/95 backdrop-blur-md border-0 shadow-2xl transition-all duration-500 relative overflow-hidden">
                  {/* Card Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-50/80 to-indigo-50/80"></div>
                  
                  {/* Step Number */}
                  <div className="absolute top-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-2xl">{index + 1}</span>
                  </div>

                  <div className="relative z-10 h-full flex flex-col">
                    {/* Icon */}
                    <div className="mb-8">
                      <div className="bg-gradient-to-br from-blue-500 to-indigo-600 p-6 rounded-3xl shadow-lg w-fit">
                        <step.icon className="h-12 w-12 text-white" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1">
                      <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-bold mb-6">
                        Step {index + 1} of {workflowSteps.length}
                      </div>
                      <h3 className="text-3xl font-bold text-slate-800 mb-6">
                        {step.title}
                      </h3>
                      <p className="text-slate-600 leading-relaxed text-xl mb-8">
                        {step.description}
                      </p>
                    </div>

                    {/* Progress Indicator */}
                    <div className="mt-8">
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full"
                          style={{ width: `${((index + 1) / workflowSteps.length) * 100}%` }}
                        ></div>
                      </div>
                      <div className="flex justify-between items-center mt-3">
                        <span className="text-sm text-slate-500 font-medium">Workflow Progress</span>
                        <span className="text-sm text-blue-600 font-bold">{Math.round(((index + 1) / workflowSteps.length) * 100)}%</span>
                      </div>
                    </div>

                    {/* Arrow to next step */}
                    {index < workflowSteps.length - 1 && (
                      <div className="absolute -right-8 top-1/2 transform -translate-y-1/2 z-20">
                        <div className="w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center border-4 border-blue-200">
                          <ArrowRight className="h-6 w-6 text-blue-500" />
                        </div>
                      </div>
                    )}
                  </div>
                </Card>
              </div>
            ))}

            {/* End spacing */}
            <div style={{ width: '50vw' }}></div>
          </div>
        </div>

        
        
      </section>

      {/* Tech Stack Section */}
      <section id="tech-stack" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-indigo-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/4 w-48 h-48 sm:w-64 sm:h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{animationDelay: '4s'}}></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Cutting-Edge Technology
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 sm:mb-6">
              Tech 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Stack
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              Built with modern, reliable technologies and frameworks for optimal performance, 
              scalability, and exceptional user experience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 max-w-6xl mx-auto">
            {/* Backend Card */}
            <Card className="p-0 bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden">
              <div className="relative">
                {/* Gradient Header */}
                <div className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 p-6 sm:p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <div className="bg-white/20 p-2.5 sm:p-3 rounded-xl">
                        <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">Backend & AI</h3>
                        <p className="text-blue-100 text-sm sm:text-base">Core processing power</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    Robust backend infrastructure powered by Python ecosystem and advanced machine learning frameworks.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {techStack.backend.map((tech, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 text-blue-800 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group-hover:border-blue-300"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full"></div>
                          <span>{tech}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Performance Stats */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100">
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-blue-600">99.9%</div>
                        <div className="text-xs text-slate-500 font-medium">Accuracy</div>
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-blue-600">&lt;1s</div>
                        <div className="text-xs text-slate-500 font-medium">Processing</div>
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-blue-600">100%</div>
                        <div className="text-xs text-slate-500 font-medium">Local</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* GUI & Web Version Card */}
            <Card className="p-0 bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] group overflow-hidden">
              <div className="relative">
                {/* Gradient Header */}
                <div className="bg-gradient-to-br from-emerald-600 via-green-700 to-teal-800 p-6 sm:p-8 text-white relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/10 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/10 rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12"></div>
                  <div className="relative z-10">
                    <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                      <div className="bg-white/20 p-2.5 sm:p-3 rounded-xl">
                        <Globe className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl sm:text-2xl font-bold">GUI & Web Version</h3>
                        <p className="text-emerald-100 text-sm sm:text-base">User interface solutions</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-6 sm:p-8">
                  <p className="text-slate-600 mb-4 sm:mb-6 leading-relaxed text-sm sm:text-base">
                    Comprehensive user interface solutions including desktop GUI applications and modern web platforms.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {techStack.guiWeb.map((tech, index) => (
                      <div 
                        key={index}
                        className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 text-emerald-800 px-3 sm:px-4 py-2 sm:py-3 rounded-xl text-xs sm:text-sm font-semibold hover:from-emerald-100 hover:to-teal-100 transition-all duration-300 hover:scale-105 hover:shadow-md cursor-pointer group-hover:border-emerald-300"
                        style={{animationDelay: `${index * 0.1}s`}}
                      >
                        <div className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-emerald-500 rounded-full"></div>
                          <span>{tech}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Feature Stats */}
                  <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-slate-100">
                    <div className="grid grid-cols-3 gap-3 sm:gap-4 text-center">
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-emerald-600">GUI</div>
                        <div className="text-xs text-slate-500 font-medium">Desktop</div>
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-emerald-600">Web</div>
                        <div className="text-xs text-slate-500 font-medium">Platform</div>
                      </div>
                      <div>
                        <div className="text-lg sm:text-2xl font-bold text-emerald-600">100%</div>
                        <div className="text-xs text-slate-500 font-medium">Responsive</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Installation Section */}
      <section id="installation" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-10 right-10 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-10 left-10 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 sm:w-64 sm:h-64 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-pulse" style={{animationDelay: '4s'}}></div>
        
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12 sm:mb-16">
            <div className="inline-flex items-center px-3 sm:px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium mb-4 sm:mb-6">
              <Zap className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Easy Setup
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-800 mb-4 sm:mb-6">
              Quick 
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                Installation
              </span>
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
              Get started with MedAI in just a few simple steps. Our streamlined installation process 
              gets you up and running in minutes.
            </p>
          </div>
          
          <Card className="p-0 bg-white border-0 shadow-2xl hover:shadow-3xl transition-all duration-500 overflow-hidden group">
            {/* Header with gradient */}
            <div className="bg-gradient-to-br from-slate-800 via-slate-900 to-black p-6 sm:p-8 text-white relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 sm:w-32 sm:h-32 bg-white/5 rounded-full -mr-12 sm:-mr-16 -mt-12 sm:-mt-16"></div>
              <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 bg-white/5 rounded-full -ml-8 sm:-ml-12 -mb-8 sm:-mb-12"></div>
              <div className="relative z-10">
                <div className="flex items-center space-x-3 sm:space-x-4 mb-3 sm:mb-4">
                  <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-2.5 sm:p-3 rounded-xl shadow-lg">
                    <Github className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl sm:text-2xl font-bold">Install Dependencies</h3>
                    <p className="text-slate-300 text-sm sm:text-base">Set up your development environment</p>
                  </div>
                </div>
              </div>
            </div>
            
            <CardContent className="p-6 sm:p-8">
              {/* Step indicators */}
              <div className="flex flex-col sm:flex-row items-center justify-center mb-6 sm:mb-8 space-y-4 sm:space-y-0">
                <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">1</div>
                    <span className="text-slate-600 font-medium text-sm sm:text-base">Clone Repository</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">2</div>
                    <span className="text-slate-600 font-medium text-sm sm:text-base">Install Dependencies</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 hidden sm:block" />
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 text-white rounded-full flex items-center justify-center text-xs sm:text-sm font-bold">3</div>
                    <span className="text-slate-600 font-medium text-sm sm:text-base">Setup OCR</span>
                  </div>
                </div>
              </div>

              {/* Code block with improved styling */}
              <div className="relative mb-6 sm:mb-8">
                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 flex space-x-1.5 sm:space-x-2 z-10">
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
                </div>
                <div className="bg-gradient-to-br from-slate-900 to-black text-green-400 p-4 sm:p-6 lg:p-8 rounded-xl font-mono text-xs sm:text-sm overflow-x-auto border border-slate-700 shadow-inner">
                  <div className="mb-2 sm:mb-3 text-slate-500"># Step 1: Clone the repository</div>
                  <div className="mb-4 sm:mb-6 text-white">
                    <span className="text-blue-400">git</span> clone https://github.com/yourusername/medai.git
                  </div>
                  <div className="mb-2 sm:mb-3 text-white">
                    <span className="text-blue-400">cd</span> medai
                  </div>
                  <div className="mb-4 sm:mb-6 text-white border-t border-slate-700 pt-3 sm:pt-4">
                  </div>
                  <div className="mb-2 sm:mb-3 text-slate-500"># Step 2: Install Python dependencies</div>
                  <div className="mb-4 sm:mb-6 text-white">
                    <span className="text-blue-400">pip</span> install -r requirements.txt
                  </div>
                  <div className="mb-2 sm:mb-3 text-slate-500"># Step 3: Install Tesseract OCR</div>
                  <div className="mb-2 sm:mb-3 text-white">
                    <span className="text-yellow-400"># macOS</span>
                  </div>
                  <div className="mb-3 sm:mb-4 text-white">
                    <span className="text-blue-400">brew</span> install tesseract
                  </div>
                  <div className="mb-2 sm:mb-3 text-white">
                    <span className="text-yellow-400"># Ubuntu/Debian</span>
                  </div>
                  <div className="mb-3 sm:mb-4 text-white">
                    <span className="text-blue-400">sudo apt-get</span> install tesseract-ocr
                  </div>
                  <div className="mb-2 sm:mb-3 text-white">
                    <span className="text-yellow-400"># Windows</span>
                  </div>
                  <div className="text-white">
                    Download from <span className="text-green-400">https://github.com/UB-Mannheim/tesseract/wiki</span>
                  </div>
                </div>
              </div>

              {/* Feature highlights */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-3 sm:p-4 rounded-xl border border-blue-200">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-blue-500 p-1.5 sm:p-2 rounded-lg">
                      <Zap className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-blue-800 text-sm sm:text-base">Quick Setup</div>
                      <div className="text-blue-600 text-xs sm:text-sm">5 minutes or less</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 p-3 sm:p-4 rounded-xl border border-green-200">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-green-500 p-1.5 sm:p-2 rounded-lg">
                      <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-green-800 text-sm sm:text-base">Local Only</div>
                      <div className="text-green-600 text-xs sm:text-sm">100% privacy</div>
                    </div>
                  </div>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-3 sm:p-4 rounded-xl border border-purple-200">
                  <div className="flex items-center space-x-2 sm:space-x-3">
                    <div className="bg-purple-500 p-1.5 sm:p-2 rounded-lg">
                      <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                    </div>
                    <div>
                      <div className="font-semibold text-purple-800 text-sm sm:text-base">Cross Platform</div>
                      <div className="text-purple-600 text-xs sm:text-sm">Windows, macOS, Linux</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Button 
                  variant="outline" 
                  className="flex-1 group border-2 border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all duration-200 py-3 sm:py-4 text-sm sm:text-base"
                  onClick={() => window.open('https://github.com/Dielldev/MedAI', '_blank')}
                >
                  <Github className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                  View on GitHub
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
                <Button 
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-200 group py-3 sm:py-4 text-sm sm:text-base"
                  onClick={() => scrollToSection('features')}
                >
                  <Brain className="mr-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:scale-110 transition-transform duration-200" />
                  Explore Features
                  <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform duration-200" />
                </Button>
              </div>

              {/* Additional help text */}
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-start space-x-2 sm:space-x-3">
                  <div className="bg-blue-500 p-1.5 sm:p-2 rounded-lg mt-0.5 sm:mt-1">
                    <FileText className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold text-blue-800 mb-1 text-sm sm:text-base">Need Help?</div>
                    <p className="text-blue-700 text-xs sm:text-sm leading-relaxed">
                      Check out our comprehensive documentation and troubleshooting guide on GitHub. 
                      For additional support, reach out to our community or contact us directly.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-64 h-64 sm:w-96 sm:h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 sm:w-72 sm:h-72 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" style={{animationDelay: '2s'}}></div>
        
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          {/* Main footer content */}
          <div className="py-12 sm:py-16 border-b border-slate-200/50">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
              {/* Brand section */}
              <div className="sm:col-span-2 lg:col-span-1 text-center sm:text-left">
                <div className="mb-4 sm:mb-6">
                  <h3 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2 sm:mb-3">
                    MedAI
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm max-w-md mx-auto sm:mx-0">
                    Privacy-first AI technology for intelligent medical report analysis. 
                    Empowering healthcare professionals with secure, local processing.
                  </p>
                </div>
                <div className="flex items-center justify-center sm:justify-start space-x-2 text-sm text-slate-500">
                  <Shield className="w-4 h-4" />
                  <span>100% Local Processing</span>
                </div>
              </div>

              {/* Product section */}
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-slate-800">Product</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <button 
                      onClick={() => scrollToSection('features')}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                    >
                      Features
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('how-it-works')}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                    >
                      How It Works
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('tech-stack')}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                    >
                      Technology
                    </button>
                  </li>
                  <li>
                    <button 
                      onClick={() => scrollToSection('installation')}
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                    >
                      Installation
                    </button>
                  </li>
                </ul>
              </div>

              {/* Resources section */}
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-slate-800">Resources</h4>
                <ul className="space-y-2 sm:space-y-3">
                  <li>
                    <a 
                      href="https://github.com/Dielldev/MedAI" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/Dielldev/MedAI" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                    >
                      Support
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/Dielldev/MedAI" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                    >
                      Releases
                    </a>
                  </li>
                  <li>
                    <a 
                      href="https://github.com/Dielldev/MedAI" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-slate-600 hover:text-blue-600 transition-colors duration-200 text-sm hover:translate-x-1 transform inline-block"
                    >
                      License
                    </a>
                  </li>
                </ul>
              </div>

              {/* Contact section */}
              <div className="text-center sm:text-left">
                <h4 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 text-slate-800">Connect</h4>
                <div className="space-y-3 sm:space-y-4">
                  <a 
                    href="mailto:diellgovori9@gmail.com"
                    className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-slate-600 hover:text-blue-600 transition-colors duration-200 group"
                  >
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                      <svg className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600 group-hover:text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                      </svg>
                    </div>
                    <span className="text-sm">diellgovori9@gmail.com</span>
                  </a>
                  <a 
                    href="https://github.com/Dielldev" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:justify-start space-x-2 sm:space-x-3 text-slate-600 hover:text-blue-600 transition-colors duration-200 group"
                  >
                    <div className="bg-slate-100 p-2 rounded-lg group-hover:bg-blue-100 transition-colors duration-200">
                      <Github className="w-3 h-3 sm:w-4 sm:h-4 text-slate-600 group-hover:text-blue-600" />
                    </div>
                    <span className="text-sm">DiellDev</span>
                  </a>
                </div>
                
                {/* Get started CTA */}
                <div className="mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-slate-200/50">
                  <Button 
                    onClick={() => scrollToSection('installation')}
                    className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-2.5 sm:py-3 px-4 text-sm font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    Get Started
                    <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom footer */}
          <div className="py-6 sm:py-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Left side - Copyright */}
              <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-center md:text-left">
                <p className="text-slate-600 text-sm">
                  © 2025 MedAI. All rights reserved.
                </p>
                <div className="flex items-center space-x-4 text-slate-500 text-xs">
                  <a href="#" className="hover:text-slate-700 transition-colors duration-200">Privacy Policy</a>
                  <span>•</span>
                  <a href="#" className="hover:text-slate-700 transition-colors duration-200">Terms of Service</a>
                </div>
              </div>

              {/* Right side - Made by */}
              <div className="flex items-center space-x-2 text-slate-600 text-sm">
                <span>Made by</span>
                <span className="text-blue-600 font-semibold">Diell Govori</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
