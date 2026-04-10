import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Zap, ShieldCheck, Smartphone, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

// Animation Variants
const fadeInUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

// Features Data (cleaner + scalable)
const features = [
  {
    icon: <Zap className="text-blue-600" />,
    title: "Fast Registration",
    desc: "Optimized workflows that convert users in under 60 seconds.",
  },
  {
    icon: <ShieldCheck className="text-indigo-600" />,
    title: "Secure by Design",
    desc: "Your data is protected with modern encryption standards.",
  },
  {
    icon: <Smartphone className="text-blue-500" />,
    title: "Fully Responsive",
    desc: "Works seamlessly across all devices and screen sizes.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-hidden relative">

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-60 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-indigo-100 rounded-full blur-[120px] opacity-60" />
      </div>

      {/* HERO */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-24 lg:flex items-center gap-12">

        {/* LEFT */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:w-1/2 text-center lg:text-left space-y-8"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-bold uppercase tracking-wider"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
            </span>
            v2.0 live
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl lg:text-5xl font-black leading-tight"
          >
            Registration <br />
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Made Simple.
            </span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg text-slate-600 max-w-xl mx-auto lg:mx-0"
          >
            Fast, secure, and scalable onboarding for modern applications.
            Start building better user experiences today.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-wrap justify-center lg:justify-start gap-4"
          >
            <Link
              to="/register"
              className="group bg-slate-900 text-white px-8 py-4 rounded-2xl font-semibold flex items-center gap-2 hover:bg-blue-600 transition"
            >
              Get Started
              <ArrowRight
                size={18}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>

            <Link
              to="/learn-more"
              className="px-8 py-4 rounded-2xl border border-slate-200 font-semibold hover:bg-slate-50 transition"
            >
              Learn More
            </Link>
          </motion.div>
        </motion.div>

        {/* RIGHT IMAGE */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="lg:w-1/2 mt-16 lg:mt-0 relative"
        >
          <img
            src="https://illustrations.popsy.co/white/app-launch.svg"
            alt="Registration illustration"
            className="w-full max-w-lg drop-shadow-2xl animate-float"
          />

          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent rounded-full -z-10 scale-110" />
        </motion.div>
      </main>

      {/* FEATURES */}
      <section className="relative z-10 bg-slate-50/60 border-y border-slate-100 py-24">
        <div className="max-w-7xl mx-auto px-6">

          <div className="text-center mb-14">
            <h2 className="text-3xl font-bold">Why NexusFlow?</h2>
            <div className="w-20 h-1 bg-blue-600 mx-auto mt-3 rounded-full" />
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} />
            ))}
          </div>

        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-950 text-white border-t border-slate-800 py-10">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">

          <div className="flex items-center gap-2 opacity-60">
            <Zap size={18} />
            <span className="font-bold">NexusFlow</span>
          </div>

          <p className="text-slate-400 text-sm text-center">
            &copy; {new Date().getFullYear()} NexusFlow. All rights reserved.
          </p>

          <div className="flex gap-5 text-slate-400">
            <FaTwitter className="hover:text-blue-500 cursor-pointer transition" />
            <FaGithub className="hover:text-black cursor-pointer transition" />
            <FaLinkedin className="hover:text-blue-700 cursor-pointer transition" />
          </div>

        </div>
      </footer>

      {/* FLOAT ANIMATION */}
      <style>{`
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
          100% { transform: translateY(0px); }
        }
        .animate-float {
          animation: float 5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
}

// Feature Card
function FeatureCard({ icon, title, desc }) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="p-8 bg-white border border-slate-100 rounded-3xl shadow-sm hover:shadow-lg transition"
    >
      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-5">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-slate-500">{desc}</p>
    </motion.div>
  );
}