import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wrench, Zap, Droplet, ThermometerSnowflake, Home,
  Sofa, Maximize2, Activity, CircleDashed, ShieldCheck,
  CalendarCheck, Trash2, Phone, Mail, Menu, X, ChevronDown,
  ArrowRight, CheckCircle2, MapPin, Star, Settings
} from 'lucide-react';

import { getImageUrl } from './lib/supabase';

const services = [
  {
    title: "Electrical Systems",
    icon: Zap,
    description: "Complete electrical diagnostics, repairs, and solar upgrades.",
    items: ["Battery & charging systems", "Wiring upgrades", "Solar panel installation"]
  },
  {
    title: "Plumbing & Water",
    icon: Droplet,
    description: "Freshwater, wastewater, and heating solutions.",
    items: ["Freshwater repair", "Sewage system fixing", "Water heater installation"]
  },
  {
    title: "Climate Control",
    icon: ThermometerSnowflake,
    description: "HVAC, furnace, and ventilation services.",
    items: ["A/C unit repair", "Furnace servicing", "Ventilation cleaning"]
  },
  {
    title: "Exterior Maintenance",
    icon: Home,
    description: "Roofing, sealing, and structural exterior care.",
    items: ["Roof sealing", "Awning repair", "External lighting"]
  },
  {
    title: "Interior Refinement",
    icon: Sofa,
    description: "Cabinetry, flooring, and appliance repair.",
    items: ["Flooring replacement", "Appliance repair", "Upholstery fixing"]
  },
  {
    title: "Slide-Out Mechanisms",
    icon: Maximize2,
    description: "Motor repair and seal replacements.",
    items: ["Motor mechanism repair", "Seal replacement", "Structural reinforcement"]
  },
  {
    title: "Suspension & Brakes",
    icon: Activity,
    description: "Ensuring a smooth and safe ride.",
    items: ["Suspension inspection", "Brake pad replacement", "Rotor resurfacing"]
  },
  {
    title: "Tire Services",
    icon: CircleDashed,
    description: "Tire inspection, balancing, and TPMS.",
    items: ["Tire replacement", "Wheel alignment", "TPMS setup"]
  },
  {
    title: "Safety Inspections",
    icon: ShieldCheck,
    description: "Comprehensive safety audits.",
    items: ["Fire extinguisher checks", "Detector installation", "Camera setups"]
  },
  {
    title: "Preventive Care",
    icon: CalendarCheck,
    description: "Routine maintenance and seasonal prep.",
    items: ["Routine plans", "Winterization", "Pre-trip inspections"]
  },
  {
    title: "Sanitation Services",
    icon: Trash2,
    description: "Black and gray tank cleaning.",
    items: ["Tank flushing", "Odor control", "Leak inspection"]
  }
];

const ServiceCard: React.FC<{ service: typeof services[0], index: number }> = ({ service, index }) => {
  const Icon = service.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white border border-slate-100 shadow-xl rounded-2xl p-6 group relative overflow-hidden h-full flex flex-col hover:shadow-2xl transition-all"
    >
      <div className="absolute top-0 right-0 p-4 opacity-[0.03] group-hover:opacity-10 transition-opacity duration-500 transform group-hover:scale-110">
        <Icon className="w-24 h-24 text-sky-400" />
      </div>

      <div className="relative z-10 flex-col flex h-full">
        <div className="w-14 h-14 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 text-sky-400 group-hover:bg-sky-500 group-hover:text-white group-hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] transition-all duration-300">
          <Icon className="w-7 h-7" />
        </div>

        <h3 className="text-xl font-bold text-slate-900 mb-2 font-display">{service.title}</h3>
        <p className="text-slate-600 mb-6 text-sm">{service.description}</p>

        <ul className="space-y-2 mt-auto">
          {service.items.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
              <CheckCircle2 className="w-4 h-4 text-sky-500 shrink-0 mt-0.5 opacity-70" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

const BackgroundOrbs = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
    <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-sky-600/20 rounded-full blur-[120px] mix-blend-screen animate-float"></div>
    <div className="absolute top-1/3 -right-1/4 w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[150px] mix-blend-screen animate-float-delayed"></div>
    <div className="absolute bottom-[-10%] left-1/3 w-[400px] h-[400px] bg-blue-600/20 rounded-full blur-[100px] mix-blend-screen animate-float"></div>
  </div>
);

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80; // Height of navbar
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  // Prevent scrolling when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [isMobileMenuOpen]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 selection:bg-sky-500/30 selection:text-sky-200">

      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'py-3 bg-slate-950/80 backdrop-blur-xl border-b border-white/5 shadow-2xl shadow-black/50' : 'py-5 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">

            {/* Logo */}
            <div
              className="flex items-center gap-3 cursor-pointer group"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="w-10 h-10 bg-sky-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-[0_0_15px_rgba(14,165,233,0.5)] group-hover:shadow-[0_0_25px_rgba(14,165,233,0.8)] transition-all duration-300">
                <Settings className="w-6 h-6 animate-[spin_10s_linear_infinite]" />
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tight text-white block leading-none font-display text-glow">CIRVS</span>
                <span className="text-[10px] font-semibold text-sky-400 uppercase tracking-widest block mt-1">Certified RV Service</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 glass px-8 py-3 rounded-full">
              {['services', 'about', 'contact'].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollTo(item)}
                  className="text-sm font-medium text-slate-300 hover:text-white hover:text-glow transition-all capitalize"
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="hidden md:block">
              <button
                onClick={() => scrollTo('contact')}
                className="relative overflow-hidden group bg-sky-500 hover:bg-sky-400 text-white px-6 py-3 rounded-full font-medium text-sm transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] hover:shadow-[0_0_30px_rgba(14,165,233,0.5)] flex items-center gap-2"
              >
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out rounded-full" />
                <span className="relative z-10">Fix My RV</span>
                <ArrowRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-white p-2 z-[60] relative"
                aria-label="Toggle menu"
              >
                <motion.div animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}>
                  {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
                </motion.div>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-slate-950/95 backdrop-blur-3xl flex flex-col justify-center items-center md:hidden"
          >
            <BackgroundOrbs />
            <div className="relative z-10 flex flex-col items-center gap-8 w-full px-6">
              {[
                { id: 'services', label: 'Our Services' },
                { id: 'about', label: 'About Us' },
                { id: 'contact', label: 'Contact' }
              ].map((item, i) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => scrollTo(item.id)}
                  className="text-4xl font-display font-bold text-white hover:text-sky-400 transition-colors"
                >
                  {item.label}
                </motion.button>
              ))}

              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
                onClick={() => scrollTo('contact')}
                className="mt-8 w-full max-w-xs bg-sky-500 text-white px-8 py-4 rounded-full font-bold text-lg flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(14,165,233,0.4)] active:scale-95 transition-transform"
              >
                Fix My RV <ArrowRight className="w-5 h-5" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-20 justify-center overflow-hidden">
        <BackgroundOrbs />

        {/* Background Image Overlay */}
        <div className="absolute inset-0 z-0 opacity-80 mix-blend-luminosity">
          <img
            src={getImageUrl('hero-bg.jpeg')}
            alt="RV on the road"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-white via-slate-950/40 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/80 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-12 items-center">

            {/* Center the hero content since the right side is removed */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-3xl mx-auto text-center col-span-1 lg:col-span-2 flex flex-col items-center relative"
            >
              {/* Radial gradient background behind text to ensure readability */}
              <div className="absolute inset-0 bg-slate-950/40 blur-3xl -z-10 rounded-full scale-150"></div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border-sky-500/30 text-sky-100 text-sm font-medium mb-8 shadow-[0_0_20px_rgba(14,165,233,0.3)] bg-slate-900/40"
              >
                <MapPin className="w-4 h-4 text-sky-400" />
                Premier Mobile RV Repair in Florida
              </motion.div>

              <motion.h1
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
                  }
                }}
                className="text-6xl md:text-8xl font-black font-display text-white tracking-tight mb-6 leading-[1.1] drop-shadow-2xl"
              >
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>More</motion.span>{" "}
                <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>Miles,</motion.span><br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600 drop-shadow-[0_4px_4px_rgba(0,0,0,0.8)]">
                  <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>Less</motion.span>{" "}
                  <motion.span className="inline-block" variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>Worries.</motion.span>
                </span>
              </motion.h1>

              <p className="text-xl text-slate-100 mb-10 max-w-xl leading-relaxed font-medium mx-auto drop-shadow-lg">
                Professional, certified, and fully mobile RV repair services brought directly to your location. We fix it right, so you can explore further.
              </p>

              <div className="flex flex-col sm:flex-row gap-5 justify-center w-full">
                <button
                  onClick={() => scrollTo('contact')}
                  className="bg-white text-slate-900 hover:bg-sky-50 px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-3 focus:ring-4 focus:ring-sky-500/50"
                >
                  Schedule Service
                  <motion.div
                    animate={{ x: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ArrowRight className="w-5 h-5" />
                  </motion.div>
                </button>
              </div>

              <div className="mt-12 flex items-center gap-4 text-sm text-slate-100 font-medium justify-center drop-shadow-md">
                <div className="flex gap-1 bg-slate-900/40 px-3 py-2 rounded-full border border-white/10 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="flex items-center justify-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 drop-shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                    </div>
                  ))}
                </div>
                <span>Trusted by hundreds of RV owners</span>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-32 relative bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block mb-4"
            >
              <span className="bg-sky-500/10 text-sky-600 font-semibold px-4 py-2 rounded-full border border-sky-500/20 text-sm tracking-widest uppercase">Expertise</span>
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-black font-display text-slate-900 mb-6">
              Comprehensive RV Solutions
            </h2>
            <p className="text-xl text-slate-600 font-medium">
              From mechanical repairs to luxury upgrades, we handle every aspect of your RV's maintenance with precision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-32 relative bg-slate-900 border-y border-white/5">
        <BackgroundOrbs />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="relative order-2 lg:order-1"
            >
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass border-white/10 shadow-2xl p-2 z-10">
                <img
                  src={getImageUrl('david-griffin.jpeg')}
                  alt="David Griffin, RV Technician"
                  className="w-full h-full object-cover rounded-2xl filter grayscale-[20%] contrast-125"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent rounded-2xl"></div>
              </div>

              {/* Decorative behind image */}
              <div className="absolute top-10 -left-10 w-full h-full border-2 border-sky-500/20 rounded-3xl z-0 transform -rotate-3"></div>

              <div className="absolute -bottom-8 -right-8 glass-card border-white/20 p-6 rounded-2xl shadow-2xl z-20 hidden md:block backdrop-blur-xl">
                <p className="text-4xl font-black text-white font-display mb-1">30<span className="text-sky-400">+</span></p>
                <p className="text-slate-300 font-medium text-sm">Years Experience</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              className="order-1 lg:order-2"
            >
              <span className="text-sky-400 font-semibold tracking-widest uppercase text-sm">The Expert</span>
              <h2 className="text-4xl md:text-6xl font-black font-display text-white mt-4 mb-8">
                Meet David Griffin
              </h2>

              <div className="space-y-6 text-lg text-slate-300 font-light leading-relaxed">
                <p>
                  As the owner and operator of CIRVS, I bring a commitment to excellence forged through the <strong className="text-white font-medium">National RV Training Academy</strong> as a <strong className="text-white font-medium">Certified RV Technician</strong>.
                </p>
                <p>
                  Specializing in advanced systems—from climate control and plumbing to complex electrical arrays—I combine specialized RV training with over three decades of heavy-duty transportation mechanic experience.
                </p>

                <blockquote className="border-l-4 border-sky-500 pl-6 py-2 my-8">
                  <p className="text-xl text-white italic font-display">
                    "My goal isn't just to fix your RV; it's to ensure your peace of mind on the open road. I treat every rig as if it were my own family's."
                  </p>
                </blockquote>
              </div>

              <div className="mt-10 flex flex-wrap gap-4">
                <div className="glass px-5 py-3 rounded-xl flex items-center gap-3 border-white/10">
                  <ShieldCheck className="w-5 h-5 text-sky-400" />
                  <span className="font-semibold text-sm text-white uppercase tracking-wider">Certified Tech</span>
                </div>
                <div className="glass px-5 py-3 rounded-xl flex items-center gap-3 border-white/10">
                  <Wrench className="w-5 h-5 text-sky-400" />
                  <span className="font-semibold text-sm text-white uppercase tracking-wider">NRVTA Grad</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-32 relative overflow-hidden">
        <BackgroundOrbs />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl lg:text-7xl font-black font-display text-white mb-6 leading-tight">
                Let's Get You <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-600">Back Out There.</span>
              </h2>
              <p className="text-xl text-slate-400 mb-12 max-w-md font-light">
                Whether it's an emergency repair or a planned upgrade, we're ready to deploy to your location.
              </p>

              <div className="space-y-8">
                <a href="tel:239-297-3899" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors -ml-4">
                  <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all text-sky-400">
                    <Phone className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm tracking-widest uppercase text-slate-500 font-semibold mb-1">Call or Text</p>
                    <p className="text-2xl font-bold text-white group-hover:text-sky-300 transition-colors tracking-wider">239-297-3899</p>
                  </div>
                </a>

                <a href="mailto:David.cirvs@outlook.com" className="group flex items-center gap-6 p-4 rounded-2xl hover:bg-white/5 transition-colors -ml-4">
                  <div className="w-16 h-16 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center group-hover:bg-sky-500 group-hover:text-white transition-all text-sky-400">
                    <Mail className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm tracking-widest uppercase text-slate-500 font-semibold mb-1">Email Us</p>
                    <p className="text-xl font-bold text-white group-hover:text-sky-300 transition-colors break-all">David.cirvs@outlook.com</p>
                  </div>
                </a>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="glass border-white/10 rounded-3xl p-8 sm:p-10 shadow-2xl relative"
            >
              {/* Decorative border gradient */}
              <div className="absolute inset-0 rounded-3xl border border-transparent bg-gradient-to-b from-sky-500/20 to-transparent pointer-events-none" style={{ maskImage: 'linear-gradient(to bottom, black, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)' }}></div>

              <h3 className="text-3xl font-bold text-white font-display mb-8">Request Service</h3>

              <form className="space-y-5 relative z-10" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">First Name</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all" placeholder="John" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">Last Name</label>
                    <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all" placeholder="Doe" />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                  <input type="email" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all" placeholder="john@example.com" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">RV Details</label>
                  <input type="text" className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all" placeholder="Year, Make, Model (e.g., 2022 Airstream)" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest pl-1">Service Needed</label>
                  <textarea rows={4} className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent transition-all resize-none" placeholder="Briefly describe the issue..."></textarea>
                </div>

                <button type="submit" className="w-full bg-sky-500 hover:bg-sky-400 text-white font-bold text-lg py-4 px-6 rounded-xl transition-all hover:shadow-[0_0_20px_rgba(14,165,233,0.4)] active:scale-[0.98] mt-4">
                  Send Request
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-white/10 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-sky-500 rounded-lg flex items-center justify-center text-white">
              <Settings className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white font-display">CIRVS</span>
          </div>

          <p className="text-slate-500 text-sm font-medium">
            &copy; {new Date().getFullYear()} Certified Integrity RV Service LLC. All rights reserved.
          </p>

          <div className="flex gap-8">
            <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors text-sm font-medium uppercase tracking-wider">Privacy</a>
            <a href="#" className="text-slate-500 hover:text-sky-400 transition-colors text-sm font-medium uppercase tracking-wider">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
