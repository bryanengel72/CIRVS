import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wrench, Zap, Droplet, ThermometerSnowflake, Home, 
  Sofa, Maximize2, Activity, CircleDashed, ShieldCheck, 
  CalendarCheck, Trash2, Phone, Mail, Menu, X, ChevronDown, 
  ArrowRight, CheckCircle2, MapPin
} from 'lucide-react';

const services = [
  {
    title: "Electrical System Repairs",
    icon: Zap,
    items: [
      "Battery replacement and charging systems",
      "Wiring repairs and upgrades",
      "Troubleshooting electrical issues",
      "Solar panel installation and maintenance"
    ]
  },
  {
    title: "Plumbing and Water System Repairs",
    icon: Droplet,
    items: [
      "Freshwater system inspection and repair",
      "Wastewater and sewage system repairs",
      "Water heater repair or replacement",
      "Leak detection and sealing"
    ]
  },
  {
    title: "HVAC System Repairs",
    icon: ThermometerSnowflake,
    items: [
      "Air conditioning unit repair and replacement",
      "Furnace and heating system services",
      "Ventilation system cleaning and repair"
    ]
  },
  {
    title: "Exterior Repairs",
    icon: Home,
    items: [
      "Roof inspection and resealing",
      "Awning repair or replacement",
      "Window and door repair or replacement",
      "Exterior lighting upgrades and repairs"
    ]
  },
  {
    title: "Interior Repairs",
    icon: Sofa,
    items: [
      "Cabinetry and furniture repair",
      "Flooring repair or replacement",
      "Upholstery repair or reupholstering",
      "Appliance repair or replacement (e.g., refrigerators, microwaves)"
    ]
  },
  {
    title: "Slide-Out Repairs",
    icon: Maximize2,
    items: [
      "Slide-out motor and mechanism repair",
      "Seal replacement for slide-outs",
      "Structural repairs and reinforcement"
    ]
  },
  {
    title: "Suspension Repairs",
    icon: Activity,
    items: [
      "Suspension system inspection and repair",
      "Brake inspection and repair"
    ]
  },
  {
    title: "Tire and Wheel Services",
    icon: CircleDashed,
    items: [
      "Tire inspection and replacement",
      "Wheel alignment and balancing",
      "Tire pressure monitoring system (TPMS) installation"
    ]
  },
  {
    title: "Safety Inspections and Upgrades",
    icon: ShieldCheck,
    items: [
      "Comprehensive RV safety inspections",
      "Fire extinguisher inspection and replacement",
      "Smoke and carbon monoxide detector installation",
      "Backup camera and sensor installation"
    ]
  },
  {
    title: "Preventive Maintenance Packages",
    icon: CalendarCheck,
    items: [
      "Routine inspection and maintenance plans",
      "Winterization and de-winterization services",
      "Pre-trip inspection services"
    ]
  },
  {
    title: "Tank Cleaning (Black/Gray)",
    icon: Trash2,
    items: [
      "Black and gray water tank cleaning",
      "Tank flush and sanitization",
      "Clog removal and odor control",
      "Inspection for leaks and blockages"
    ]
  }
];

const ServiceAccordion: React.FC<{ service: typeof services[0], index: number }> = ({ service, index }) => {
  const [isOpen, setIsOpen] = useState(false);
  const Icon = service.icon;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.05 }}
      className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow"
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-slate-50 transition-colors"
      >
        <div className="flex items-center gap-4">
          <div className="p-2 bg-sky-100 text-sky-700 rounded-lg">
            <Icon className="w-6 h-6" />
          </div>
          <h3 className="font-semibold text-slate-900 text-lg">{service.title}</h3>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-5 h-5 text-slate-500" />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="p-5 pt-0 border-t border-slate-100 bg-slate-50/50">
              <ul className="space-y-3 mt-4">
                {service.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-sky-500 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 selection:bg-sky-200 selection:text-sky-900">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo Placeholder */}
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
              <div className="w-10 h-10 bg-sky-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-sky-600/20">
                <Wrench className="w-6 h-6" />
              </div>
              <div>
                <span className="font-bold text-2xl tracking-tight text-slate-900 block leading-none">CIRVS</span>
                <span className="text-[10px] font-semibold text-slate-500 uppercase tracking-wider block mt-1">Certified Integrity RV Service</span>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8">
              <button onClick={() => scrollTo('services')} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Services</button>
              <button onClick={() => scrollTo('about')} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">About</button>
              <button onClick={() => scrollTo('contact')} className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors">Contact</button>
              <button onClick={() => scrollTo('contact')} className="bg-sky-600 hover:bg-sky-700 text-white px-5 py-2.5 rounded-full font-medium text-sm transition-all shadow-lg shadow-sky-600/20 hover:shadow-sky-600/40 flex items-center gap-2">
                Fix My RV
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Mobile Menu Toggle */}
            <div className="md:hidden flex items-center">
              <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-slate-600 p-2">
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-b border-slate-200 overflow-hidden"
            >
              <div className="px-4 pt-2 pb-6 space-y-1">
                <button onClick={() => scrollTo('services')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Services</button>
                <button onClick={() => scrollTo('about')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">About</button>
                <button onClick={() => scrollTo('contact')} className="block w-full text-left px-3 py-3 text-base font-medium text-slate-700 hover:bg-slate-50 rounded-lg">Contact</button>
                <div className="pt-4 px-3">
                  <button onClick={() => scrollTo('contact')} className="w-full bg-sky-600 text-white px-5 py-3 rounded-xl font-medium flex items-center justify-center gap-2">
                    Fix My RV
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?q=80&w=2070&auto=format&fit=crop" 
            alt="RV on the road" 
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-slate-900/70 mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-50 via-transparent to-transparent"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 text-sky-200 backdrop-blur-sm border border-sky-400/30 text-sm font-medium mb-6">
              <MapPin className="w-4 h-4" />
              Expert RV Repairs Across Florida
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
              Your Journey,<br />
              <span className="text-sky-400">Our Priority.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Certified Integrity RV Service keeps you on the road with confidence. From electrical to plumbing, we provide exceptional mobile RV repair and maintenance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button onClick={() => scrollTo('contact')} className="bg-sky-600 hover:bg-sky-500 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg shadow-sky-600/30 flex items-center justify-center gap-2">
                Schedule a Repair
                <ArrowRight className="w-5 h-5" />
              </button>
              <button onClick={() => scrollTo('services')} className="bg-white/10 hover:bg-white/20 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-full font-semibold text-lg transition-all flex items-center justify-center">
                View Our Services
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">What We Do</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Comprehensive RV Services
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              We offer a full range of repair and maintenance services to ensure your RV is always ready for the next adventure.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceAccordion key={index} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="mb-12 lg:mb-0 relative"
            >
              <div className="aspect-w-3 aspect-h-4 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1621905252507-b35492cc74b4?q=80&w=2069&auto=format&fit=crop" 
                  alt="RV Technician working" 
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-sky-600 text-white p-8 rounded-2xl shadow-xl hidden md:block max-w-xs">
                <p className="text-2xl font-bold mb-1">30+ Years</p>
                <p className="text-sky-100 text-sm">Experience in heavy duty truck & automotive maintenance</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-base font-semibold text-sky-600 tracking-wide uppercase">The Team</h2>
              <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl mb-6">
                Meet David Griffin
              </p>
              
              <div className="prose prose-lg text-slate-600">
                <p>
                  David Griffin, owner and operator of Certified Integrity RV Service LLC, is a graduate of the <strong>National RV Training Academy</strong> and a <strong>Certified RV Technician</strong>.
                </p>
                <p>
                  David has been trained in RV Air conditioning, furnaces, water heaters, refrigerators, plumbing, and exterior components. He has been self-employed for over 20 years in the transportation business and brings over 30 years of experience in heavy-duty truck and automotive maintenance and repairs.
                </p>
                <p>
                  Specializing in preventative maintenance, David keeps your investment in top working condition. He has a strong work ethic, attention to detail, and is highly customer-service oriented. If there is a job beyond his ability, he will search to find you a technician who can.
                </p>
                <p className="font-medium text-slate-900 italic mt-6">
                  "Thank you for taking the time to read my bio. I look forward to providing you an exceptional service experience."
                </p>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-sky-600" />
                  Certified RV Technician
                </div>
                <div className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg text-sm font-medium text-slate-700 border border-slate-200">
                  <Wrench className="w-5 h-5 text-sky-600" />
                  NRVTA Graduate
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-slate-900 text-white relative overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-sky-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-indigo-600/20 blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl mb-6">
                Ready for your next adventure?
              </h2>
              <p className="text-lg text-slate-300 mb-8 max-w-lg">
                At Certified Integrity RV Service LLC (CIRVS), we're dedicated to keeping you on the road with confidence. Whether you have a question, need to schedule a repair, or want to discuss a custom upgrade, we're here to help.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Phone className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium">Call or Text Us</p>
                    <a href="tel:239-297-3899" className="text-xl font-semibold hover:text-sky-400 transition-colors">239-297-3899</a>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center shrink-0 border border-white/10">
                    <Mail className="w-6 h-6 text-sky-400" />
                  </div>
                  <div>
                    <p className="text-sm text-slate-400 font-medium">Email Us</p>
                    <a href="mailto:David.cirvs@outlook.com" className="text-xl font-semibold hover:text-sky-400 transition-colors">David.cirvs@outlook.com</a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-2xl text-slate-900">
              <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="first-name" className="block text-sm font-medium text-slate-700 mb-1">First name</label>
                    <input type="text" id="first-name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="John" />
                  </div>
                  <div>
                    <label htmlFor="last-name" className="block text-sm font-medium text-slate-700 mb-1">Last name</label>
                    <input type="text" id="last-name" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="Doe" />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" id="email" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="john@example.com" />
                </div>
                <div>
                  <label htmlFor="rv-details" className="block text-sm font-medium text-slate-700 mb-1">RV Make/Model & Year</label>
                  <input type="text" id="rv-details" className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all" placeholder="e.g. 2020 Winnebago View" />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1">How can we help?</label>
                  <textarea id="message" rows={4} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition-all resize-none" placeholder="Describe the issue or service needed..."></textarea>
                </div>
                <button type="submit" className="w-full bg-sky-600 hover:bg-sky-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors shadow-md">
                  Send Message
                </button>
                <p className="text-xs text-slate-500 text-center mt-4">
                  This form is for demonstration. Please use the email or phone number to contact us directly.
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-sky-600 rounded flex items-center justify-center text-white">
              <Wrench className="w-4 h-4" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">CIRVS</span>
          </div>
          
          <p className="text-slate-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} Certified Integrity RV Service LLC. All rights reserved.
          </p>
          
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
