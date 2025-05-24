'use client';
import React from 'react';
import { useAuth } from '@clerk/nextjs';
import {
  Star,
  Hash,
  Clock,
  Globe,
  Sparkles,
  Zap,
  RefreshCw,
} from 'lucide-react';
import Link from 'next/link';
import { Logo } from './my-snippets/components/Logo/Logo';

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <Navbar />
      <Hero />
      <Features />
      <Footer />
    </div>
  );
};

export default Home;

const Navbar = () => {
  return (
    <nav className="px-6 py-6 lg:px-12">
      <div className="max-w-6xl mx-auto flex items-center justify-between">
        <Logo />
        <Buttons />
      </div>
    </nav>
  );
};

const Buttons = () => {
  const { userId } = useAuth();

  if (userId) {
    return (
      <Link href="/my-snippets">
        <button className="bg-black hover:bg-gray-800 px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-200 hover:scale-105">
          Access App
        </button>
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <Link href="/sign-in">
        <button className="text-gray-600 hover:text-gray-900 px-4 py-2 text-sm font-medium transition-colors">
          Sign In
        </button>
      </Link>
      <Link href="/sign-up">
        <button className="bg-black hover:bg-gray-800 px-6 py-2.5 rounded-full text-white text-sm font-medium transition-all duration-200 hover:scale-105">
          Get Started
        </button>
      </Link>
    </div>
  );
};

const Hero = () => {
  const TechGrid = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Main grid lines */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <pattern
            id="grid"
            width="60"
            height="60"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="rgb(59 130 246 / 0.3)"
              strokeWidth="1"
            />
          </pattern>
          <linearGradient id="line-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgb(59 130 246 / 0)" />
            <stop offset="50%" stopColor="rgb(59 130 246 / 0.6)" />
            <stop offset="100%" stopColor="rgb(59 130 246 / 0)" />
          </linearGradient>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Floating code elements - hidden on small screens, repositioned on tablets */}
      <div className="hidden sm:block absolute top-1/4 left-4 sm:left-8 lg:left-12 text-xs font-mono text-blue-400/60 animate-float">
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-blue-200/50 shadow-lg">
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
          </div>
          <code className="text-gray-700 text-xs">const ai = generate()</code>
        </div>
      </div>

      <div
        className="hidden sm:block absolute top-1/3 right-4 sm:right-8 lg:right-16 text-xs font-mono text-purple-400/60 animate-float"
        style={{ animationDelay: '2s' }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-purple-200/50 shadow-lg">
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
          </div>
          <code className="text-gray-700 text-xs">transform.py</code>
        </div>
      </div>

      <div
        className="hidden md:block absolute bottom-1/4 left-1/4 text-xs font-mono text-cyan-400/60 animate-float"
        style={{ animationDelay: '4s' }}
      >
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-2 sm:p-3 border border-cyan-200/50 shadow-lg">
          <div className="flex items-center gap-1 sm:gap-2 mb-1">
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-yellow-400 rounded-full"></div>
            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-400 rounded-full"></div>
          </div>
          <code className="text-gray-700 text-xs">modify(snippet)</code>
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative text-center px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-20 pb-6 sm:pb-8 lg:pb-24 overflow-hidden min-h-0">
      <TechGrid />

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="inline-flex items-center gap-2 bg-blue-50/80 backdrop-blur-sm border border-blue-200/80 rounded-full px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm text-blue-700 font-medium mb-6 sm:mb-8 shadow-lg">
          <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 animate-pulse" />
          <span className="whitespace-nowrap">
            Now with AI-powered features
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4 sm:mb-6 relative px-2">
          <span className="block">Smart snippet manager</span>
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent block mt-1 sm:mt-0">
            Powered by AI
          </span>
        </h1>

        <div className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed relative px-4 sm:px-0">
          Store, organize, and enhance your code snippets with AI. Generate new
          snippets, modify existing ones, and transform languages instantly.
          {/* Tech accent lines - hidden on mobile */}
          <div className="hidden sm:block absolute -left-8 top-1/2 w-4 h-px bg-gradient-to-r from-blue-400/60 to-transparent"></div>
          <div className="hidden sm:block absolute -right-8 top-1/2 w-4 h-px bg-gradient-to-l from-purple-400/60 to-transparent"></div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 relative px-4 sm:px-0">
          <Link href="/sign-up">
            <button className="w-full sm:w-auto relative bg-black hover:bg-gray-800 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-white font-medium text-base sm:text-lg transition-all duration-200 hover:scale-105 shadow-lg overflow-hidden group">
              <span className="relative z-10">Start Building</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
          <Link href="#features">
            <button className="w-full sm:w-auto text-gray-600 hover:text-gray-900 px-6 sm:px-8 py-3 sm:py-4 font-medium text-base sm:text-lg transition-colors relative group">
              See Features
              <div className="absolute bottom-2 left-6 right-6 sm:left-8 sm:right-8 h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};
const Features = () => {
  return (
    <div id="features" className="py-24 px-6 relative">
      {/* Background tech decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-px h-32 bg-gradient-to-b from-transparent via-gray-200/50 to-transparent"></div>
        <div className="absolute top-40 right-20 w-32 h-px bg-gradient-to-r from-transparent via-gray-200/50 to-transparent"></div>
        <div className="absolute bottom-40 left-1/4 w-4 h-4 border border-gray-200/50 rounded transform rotate-45"></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to manage code
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Powerful features that make code snippet management effortless and
            intelligent
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 auto-rows-fr">
          {/* AI Snippet Generation - Large */}
          <div className="md:col-span-2 lg:col-span-3 group relative p-8 rounded-3xl bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-100/50 hover:border-purple-200 hover:shadow-2xl transition-all duration-500 min-h-[280px]">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI Snippet Generation
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Generate code snippets from natural language descriptions using
                advanced AI models
              </p>
            </div>
          </div>

          {/* AI-Powered Modifications - Large */}
          <div className="md:col-span-2 lg:col-span-3 group relative p-8 rounded-3xl bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100/50 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 min-h-[280px]">
            <div className="relative z-10">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                AI-Powered Modifications
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg">
                Enhance and modify your existing snippets with intelligent AI
                assistance
              </p>
            </div>
          </div>

          {/* Dynamic Language Transform - Medium */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-6 rounded-3xl bg-gradient-to-br from-green-50 to-emerald-50 border border-green-100/50 hover:border-green-200 hover:shadow-xl transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Dynamic Language Transform
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Convert snippets between programming languages instantly
              </p>
            </div>
          </div>

          {/* Real-time Editing - Medium */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-6 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 border border-orange-100/50 hover:border-orange-200 hover:shadow-xl transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Real-time Editing
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Write and edit with automatic saving and live syntax
                highlighting
              </p>
            </div>
          </div>

          {/* Smart Organization - Medium */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-6 rounded-3xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100/50 hover:border-indigo-200 hover:shadow-xl transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <Hash className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Smart Organization
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Organize with custom tags and intelligent categorization
              </p>
            </div>
          </div>

          {/* Universal Language Support - Small */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-6 rounded-3xl bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-100/50 hover:border-teal-200 hover:shadow-xl transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-teal-500 to-blue-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <Globe className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Universal Language Support
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Support for all major programming languages with perfect syntax
              </p>
            </div>
          </div>

          {/* Quick Favorites - Small */}
          <div className="md:col-span-2 lg:col-span-2 group relative p-6 rounded-3xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-100/50 hover:border-yellow-200 hover:shadow-xl transition-all duration-500">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
                <Star className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Quick Favorites
              </h3>
              <p className="text-gray-600 leading-relaxed">
                Mark important snippets as favorites for instant access
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-100 py-12 px-6 bg-white">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
          <p className="text-sm text-gray-500">
            © {currentYear} Codebin by Piyush
          </p>
          <div className="hidden md:flex items-center gap-6">
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
            >
              Terms of Service
            </a>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <a
            href="#"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="sr-only">Twitter</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="sr-only">GitHub</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </a>
          <a
            href="#"
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <span className="sr-only">LinkedIn</span>
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};
