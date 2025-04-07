document.addEventListener("DOMContentLoaded", () => {
  // Set current year in footer
  document.getElementById("current-year").textContent = new Date().getFullYear()

  // Mobile menu toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn")
  const mobileNav = document.querySelector(".mobile-nav")
  const mobileNavItems = document.querySelectorAll(".mobile-nav-item")

  mobileMenuBtn.addEventListener("click", () => {
    mobileNav.classList.toggle("active")
    if (mobileNav.classList.contains("active")) {
      mobileMenuBtn.innerHTML = '<i class="fas fa-times"></i>'
      document.body.style.overflow = "hidden"
    } else {
      mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
      document.body.style.overflow = ""
    }
  })

  // Navigation active state and smooth scrolling
  const sections = document.querySelectorAll("section")
  const navItems = document.querySelectorAll(".nav-item")
  const mobileNavItemsList = document.querySelectorAll(".mobile-nav-item")
  const allNavItems = [...navItems, ...mobileNavItemsList]

  function setActiveNavItem() {
    const scrollPosition = window.scrollY + 100

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.offsetHeight
      const sectionId = section.getAttribute("id")

      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        allNavItems.forEach((item) => {
          item.classList.remove("active")
          if (item.getAttribute("data-section") === sectionId) {
            item.classList.add("active")
          }
        })
      }
    })
  }

  window.addEventListener("scroll", setActiveNavItem)
  setActiveNavItem()

  // Smooth scrolling for navigation
  function scrollToSection(e) {
    const targetSection = e.target.getAttribute("data-section")
    if (!targetSection) return

    e.preventDefault()
    const section = document.getElementById(targetSection)

    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      })

      if (mobileNav.classList.contains("active")) {
        mobileNav.classList.remove("active")
        mobileMenuBtn.innerHTML = '<i class="fas fa-bars"></i>'
        document.body.style.overflow = ""
      }
    }
  }

  allNavItems.forEach((item) => {
    item.addEventListener("click", scrollToSection)
  })

  // Hero buttons scroll
  const heroButtons = document.querySelectorAll(".hero-buttons button")
  heroButtons.forEach((button) => {
    button.addEventListener("click", scrollToSection)
  })

  // Animate skill bars
  const skillBars = document.querySelectorAll(".skill-progress")

  function animateSkillBars() {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width") + "%"
      setTimeout(() => {
        bar.style.width = width
      }, 300)
    })
  }

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        if (entry.target.classList.contains("skill-bars")) {
          animateSkillBars()
        } else {
          entry.target.classList.add("animate")
        }
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)

  // Observe elements for animation
  document
    .querySelectorAll(
      ".section-header, .about-image-container, .about-text, .timeline-item, .project-card, .skill-bars, .tool-card, .contact-info, .contact-form-container",
    )
    .forEach((el) => {
      observer.observe(el)
    })

  // Particles background
  const canvas = document.getElementById("particles-canvas")
  const ctx = canvas.getContext("2d")

  // Set canvas dimensions
  function resizeCanvas() {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }

  window.addEventListener("resize", resizeCanvas)
  resizeCanvas()

  // Create particles
  const particles = []
  const particleCount = 100

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 1,
      color: i % 2 === 0 ? "#a855f7" : "#06b6d4",
      speedX: Math.random() * 0.5 - 0.25,
      speedY: Math.random() * 0.5 - 0.25,
      opacity: Math.random() * 0.5 + 0.2,
    })
  }

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    particles.forEach((particle) => {
      // Move particles
      particle.x += particle.speedX
      particle.y += particle.speedY

      // Wrap around edges
      if (particle.x < 0) particle.x = canvas.width
      if (particle.x > canvas.width) particle.x = 0
      if (particle.y < 0) particle.y = canvas.height
      if (particle.y > canvas.height) particle.y = 0

      // Draw particle
      ctx.beginPath()
      ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2)
      ctx.fillStyle =
        particle.color +
        Math.floor(particle.opacity * 255)
          .toString(16)
          .padStart(2, "0")
      ctx.fill()
    })

    // Connect nearby particles with lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x
        const dy = particles[i].y - particles[j].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < 100) {
          ctx.beginPath()
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.1 * (1 - distance / 100)})`
          ctx.lineWidth = 0.5
          ctx.moveTo(particles[i].x, particles[i].y)
          ctx.lineTo(particles[j].x, particles[j].y)
          ctx.stroke()
        }
      }
    }
  }

  animate()

  // Typewriter effect
  const typewriterText = document.querySelector(".typewriter-text")
  const words = typewriterText.innerHTML
  typewriterText.innerHTML = ""

  let charIndex = 0

  function typeWriter() {
    if (charIndex < words.length) {
      typewriterText.innerHTML += words.charAt(charIndex)
      charIndex++
      setTimeout(typeWriter, 50)
    }
  }

  setTimeout(typeWriter, 1000)
})

