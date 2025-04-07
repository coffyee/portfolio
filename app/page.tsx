"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  ArrowRight,
  ChevronDown,
  Github,
  Linkedin,
  Mail,
  Menu,
  X,
  Calendar,
  Code,
  Smartphone,
  Globe,
  Database,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ParticlesBackground } from "@/components/particles-background"
import { TypewriterEffect } from "@/components/typewriter-effect"
import { AnimatedGradientText } from "@/components/animated-gradient-text"
import { ProjectCard } from "@/components/project-card"

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8])

  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    // Set dark mode by default
    document.documentElement.classList.add("dark")

    const handleScroll = () => {
      const sections = document.querySelectorAll("section")
      const scrollPosition = window.scrollY + 100

      sections.forEach((section) => {
        const sectionTop = section.offsetTop
        const sectionHeight = section.offsetHeight
        const sectionId = section.getAttribute("id")

        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight && sectionId) {
          setActiveSection(sectionId)
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })
      setActiveSection(sectionId)
      setMobileMenuOpen(false)
    }
  }

  const navItems = [
    { name: "Home", section: "home" },
    { name: "About", section: "about" },
    { name: "Experience", section: "experience" },
    { name: "Projects", section: "projects" },
    { name: "Skills", section: "skills" },
    { name: "Contact", section: "contact" },
  ]

  const projects = [
    {
      title: "PosApt App",
      description: "Point of Sale application for business management, inventory tracking, and sales reporting.",
      image: "/placeholder.svg?height=300&width=500&text=PosApt+App",
      tags: ["Flutter", "Database", "Payment Processing"],
      links: [{ platform: "Google Play", url: "https://play.google.com/store/apps/details?id=com.volgai.pos_account" }],
    },
    {
      title: "Food Order App",
      description:
        "A comprehensive food ordering application with restaurant listings, menu browsing, and order tracking.",
      image: "/placeholder.svg?height=300&width=500&text=Food+Order+App",
      tags: ["Flutter", "Firebase", "Payment Integration"],
      links: [{ platform: "Google Play", url: "https://play.google.com/store/apps/details?id=com.volgai.foodApp" }],
    },
    {
      title: "BMiDate – Dating App",
      description: "A dating application with user profiles, matching algorithm, and real-time chat functionality.",
      image: "/placeholder.svg?height=300&width=500&text=BMiDate+App",
      tags: ["Flutter", "Firebase", "Real-time Chat"],
      links: [
        { platform: "Google Play", url: "https://play.google.com/store/apps/details?id=com.dateapp.bmidate" },
        { platform: "App Store", url: "https://apps.apple.com/np/app/b-midate-date-chat-hookup/id1610073728" },
      ],
    },
    {
      title: "Kaha App",
      description: "Location-based service application with feature enhancements and bug fixes.",
      image: "/placeholder.svg?height=300&width=500&text=Kaha+App",
      tags: ["Flutter", "Maps API", "Location Services"],
      links: [{ platform: "Google Play", url: "https://play.google.com/store/apps/details?id=com.kaha_hits.kaha" }],
    },
    {
      title: "StopGrab App",
      description: "E-commerce platform with product browsing, cart management, and secure checkout.",
      image: "/placeholder.svg?height=300&width=500&text=StopGrab+App",
      tags: ["Flutter", "Firebase", "Payment Integration"],
      links: [{ platform: "Google Play", url: "https://play.google.com/store/apps/details?id=com.app.stopgrab" }],
    },
    {
      title: "Electricity Bill Calculator Nepal",
      description: "Utility app for calculating accurate monthly electricity bill payments in Nepal.",
      image: "/placeholder.svg?height=300&width=500&text=Electricity+Bill+App",
      tags: ["Flutter", "Calculations", "Utility"],
      links: [
        { platform: "Google Play", url: "https://play.google.com/store/apps/details?id=np.shrestha.electricitybill" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background dark">
      <ParticlesBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/10 backdrop-blur-md border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-xl font-bold relative group">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              Shukla Shrestha
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 group-hover:w-full transition-all duration-300"></span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <button
                key={item.section}
                onClick={() => scrollToSection(item.section)}
                className={`text-sm font-medium hover:text-primary transition-colors relative group ${
                  activeSection === item.section ? "text-primary" : "text-white"
                }`}
              >
                {item.name}
                <span
                  className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-300 ${
                    activeSection === item.section ? "w-full" : "w-0 group-hover:w-full"
                  }`}
                ></span>
              </button>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button className="md:hidden relative z-50" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="md:hidden fixed inset-0 z-40 bg-black/90 backdrop-blur-md flex items-center justify-center"
            >
              <div className="flex flex-col space-y-8 items-center">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.section}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    onClick={() => scrollToSection(item.section)}
                    className={`text-2xl font-medium hover:text-primary transition-colors ${
                      activeSection === item.section ? "text-primary" : "text-white"
                    }`}
                  >
                    {item.name}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Hero Section */}
      <section id="home" ref={heroRef} className="min-h-screen flex items-center relative pt-16 overflow-hidden">
        <motion.div style={{ opacity, scale }} className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-cyan-500/20 opacity-30" />
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
        </motion.div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6"
            >
              <AnimatedGradientText text="Shukla Shrestha" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              <TypewriterEffect
                words={[
                  { text: "Software " },
                  { text: "Engineer", className: "text-purple-500" },
                  { text: " & " },
                  { text: "Mobile App", className: "text-cyan-500" },
                  { text: " Developer" },
                ]}
                className="text-2xl md:text-3xl font-medium text-white"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button
                onClick={() => scrollToSection("projects")}
                className="bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"
              >
                View My Projects
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                onClick={() => scrollToSection("contact")}
                className="border-purple-500/50 hover:bg-purple-500/10 text-white"
              >
                Contact Me
              </Button>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 md:py-32 bg-gradient-to-b from-background to-background/80 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              About Me
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="text-white text-lg">Experienced Flutter Developer with 3+ Years of Expertise</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative"
            >
              <div className="aspect-square rounded-lg overflow-hidden border-8 border-white/10 shadow-xl relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                <Image
                  src="/images/profile.png"
                  alt="Shukla Shrestha"
                  width={600}
                  height={600}
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-lg"></div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                Who am I?
              </h3>
              <p className="text-white mb-6">
                I'm an experienced Flutter developer with more than 3 years of expertise in building mobile
                applications. I specialize in creating high-quality, responsive, and feature-rich apps for both Android
                and iOS platforms.
              </p>
              <p className="text-white mb-6">
                My technical skills include Google Firebase integration, third-party API integration, and state
                management with Provider, Flutter Bloc, and GetX.
              </p>

              <div className="flex flex-wrap gap-3 mb-6">
                <Badge className="bg-purple-500/20 text-white hover:bg-purple-500/30 border-purple-500/30">
                  Flutter
                </Badge>
                <Badge className="bg-cyan-500/20 text-white hover:bg-cyan-500/30 border-cyan-500/30">Dart</Badge>
                <Badge className="bg-purple-500/20 text-white hover:bg-purple-500/30 border-purple-500/30">
                  Firebase
                </Badge>
                <Badge className="bg-cyan-500/20 text-white hover:bg-cyan-500/30 border-cyan-500/30">
                  API Integration
                </Badge>
                <Badge className="bg-purple-500/20 text-white hover:bg-purple-500/30 border-purple-500/30">
                  State Management
                </Badge>
                <Badge className="bg-cyan-500/20 text-white hover:bg-cyan-500/30 border-cyan-500/30">
                  Payment Integration
                </Badge>
              </div>

              <div className="flex gap-4">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-500 text-white hover:text-white"
                >
                  <Github className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-500 text-white hover:text-white"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-purple-500/50 hover:bg-purple-500/10 hover:border-purple-500 text-white hover:text-white"
                  onClick={() => (window.location.href = "mailto:shukla.sth@gmail.com")}
                >
                  <Mail className="h-5 w-5" />
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              Work Experience
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="text-white text-lg">My professional journey as a developer</p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              {
                company: "VolgAI Pvt Ltd",
                position: "Senior Flutter Developer",
                period: "June 2021 - Present",
                description:
                  "Created a diverse range of Flutter applications including e-commerce, dating, notification, coffee rewards, and POS systems.",
                icon: <Code className="h-6 w-6 text-white" />,
              },
              {
                company: "Masovision Technology",
                position: "Part-time Flutter Developer",
                period: "August 2022 - October 2023",
                description: "Implemented feature enhancements for the Kaha mobile app and bug fixes.",
                icon: <Smartphone className="h-6 w-6 text-white" />,
              },
              {
                company: "Candid IT Solution",
                position: "Junior Flutter Developer",
                period: "February 2021 - May 2021",
                description:
                  "Developed delivery and seller applications while also providing bug fixes and implementing feature enhancements for the Stopgrab e-commerce platform, ensuring seamless functionality across Android and iOS platforms.",
                icon: <Globe className="h-6 w-6 text-white" />,
              },
              {
                company: "Medini Software Pvt. Ltd",
                position: "Internship and Trainee",
                period: "August 2020 - December 2020",
                description: "Worked extensively with Laravel as well as gained experience in Flutter app development.",
                icon: <Code className="h-6 w-6 text-white" />,
              },
            ].map((experience, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true, margin: "-100px" }}
                className="mb-12 relative pl-8 before:content-[''] before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-gradient-to-b before:from-purple-500 before:to-cyan-500"
              >
                <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-background border-2 border-purple-500 flex items-center justify-center">
                  {experience.icon}
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10 hover:border-purple-500/50 transition-colors">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                      {experience.position} at {experience.company}
                    </h3>
                    <div className="flex items-center text-sm text-white mt-2 md:mt-0">
                      <Calendar className="h-4 w-4 mr-2 text-white" />
                      {experience.period}
                    </div>
                  </div>
                  <p className="text-white">{experience.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 md:py-32 bg-gradient-to-b from-background/80 to-background relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              My Projects
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="text-white text-lg">Showcasing my Flutter application portfolio</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 md:py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              My Skills
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="text-white text-lg">Technologies and tools I work with</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                Technical Skills
              </h3>

              {[
                { name: "Flutter & Dart", level: 95, color: "from-cyan-500 to-blue-500" },
                { name: "Firebase", level: 90, color: "from-yellow-500 to-orange-500" },
                { name: "State Management", level: 85, color: "from-purple-500 to-pink-500" },
                { name: "API Integration", level: 90, color: "from-green-500 to-emerald-500" },
                { name: "Payment Integration", level: 80, color: "from-purple-500 to-cyan-500" },
                { name: "UI/UX Design", level: 75, color: "from-pink-500 to-rose-500" },
              ].map((skill, index) => (
                <div key={index} className="mb-6">
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-white">{skill.name}</span>
                    <span className="text-white">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      transition={{ duration: 1, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={`h-full bg-gradient-to-r ${skill.color} relative`}
                    >
                      <div
                        className="absolute inset-0 bg-white/20 animate-pulse"
                        style={{ animationDelay: `${index * 0.2}s` }}
                      ></div>
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                Languages & Tools
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6">
                {[
                  {
                    name: "Flutter",
                    color: "from-cyan-500 to-blue-500",
                    icon: <Smartphone className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "Dart",
                    color: "from-blue-500 to-indigo-500",
                    icon: <Code className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "Firebase",
                    color: "from-orange-500 to-red-500",
                    icon: <Database className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "Provider",
                    color: "from-purple-500 to-pink-500",
                    icon: <Code className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "Flutter Bloc",
                    color: "from-green-500 to-emerald-500",
                    icon: <Code className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "GetX",
                    color: "from-purple-500 to-cyan-500",
                    icon: <Code className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "Git",
                    color: "from-orange-500 to-red-500",
                    icon: <Code className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "C/C++",
                    color: "from-slate-500 to-zinc-500",
                    icon: <Code className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "Java",
                    color: "from-orange-500 to-red-500",
                    icon: <Code className="h-5 w-5 mb-2 text-white" />,
                  },
                  {
                    name: "Laravel",
                    color: "from-red-500 to-pink-500",
                    icon: <Globe className="h-5 w-5 mb-2 text-white" />,
                  },
                ].map((tool, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 0 20px rgba(192, 132, 252, 0.4)",
                    }}
                    className="bg-white/5 backdrop-blur-sm rounded-lg p-4 text-center border border-white/10 hover:border-purple-500/50 transition-colors flex flex-col items-center"
                  >
                    {tool.icon}
                    <span className={`font-medium bg-clip-text text-transparent bg-gradient-to-r ${tool.color}`}>
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 md:py-32 bg-gradient-to-b from-background/80 to-background relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-grid-white/5 [mask-image:linear-gradient(to_bottom,transparent,black)]" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-3xl mx-auto text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
              Get In Touch
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-8"></div>
            <p className="text-white text-lg">Have a project in mind? Let's work together!</p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
            >
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                Contact Information
              </h3>
              <p className="text-white mb-8">
                Feel free to reach out to me through any of these channels. I'm always open to discussing new projects,
                creative ideas, or opportunities to be part of your vision.
              </p>

              <div className="space-y-6">
                <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-full">
                    <Mail className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Email</h4>
                    <p className="text-white">shukla.sth@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-full">
                    <Smartphone className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Phone</h4>
                    <p className="text-white">+977 9847260218</p>
                  </div>
                </motion.div>

                <motion.div className="flex items-center gap-4" whileHover={{ x: 5 }}>
                  <div className="bg-gradient-to-r from-purple-500 to-cyan-500 p-3 rounded-full">
                    <Globe className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-white">Location</h4>
                    <p className="text-white">Kalanki, Kathmandu, Nepal</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true, margin: "-100px" }}
              className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10 shadow-[0_0_15px_rgba(149,128,255,0.2)]"
            >
              <h3 className="text-2xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-500 to-cyan-500">
                Send Me a Message
              </h3>

              <form className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white">
                      Name
                    </label>
                    <input
                      id="name"
                      type="text"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors text-white"
                      placeholder="Your Name"
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white">
                      Email
                    </label>
                    <input
                      id="email"
                      type="email"
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors text-white"
                      placeholder="Your Email"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-white">
                    Subject
                  </label>
                  <input
                    id="subject"
                    type="text"
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors text-white"
                    placeholder="Subject"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-colors text-white"
                    placeholder="Your Message"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-purple-500 to-cyan-500 hover:from-purple-600 hover:to-cyan-600 text-white border-0"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-white/10 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/5" />

        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center">
            <p className="text-white">© {new Date().getFullYear()} Shukla Shrestha. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

