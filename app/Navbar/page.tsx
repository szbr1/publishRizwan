"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { RiMenu4Fill, RiCloseFill } from "react-icons/ri"; 
import Image from "next/image";
import logo from '@/sources/logo.png'

const Navbar = () => {
  // State for scroll position, active menu item, and mobile menu visibility
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [activeItem, setActiveItem] = useState<string>("/");

  const navItems = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Reviews", href: "/reviews" },
    { name: "Terms & Policies", href: "/Terms&Policies" },
    // { name: "Contact", href: "/contact" }
  ];

  // Handling scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-gradient-to-r from-slate-900/95 to-blue-900/95 backdrop-blur-md shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  <div className="flex items-center justify-between h-20">
    {/* Logo */}
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.05 }}
      className="flex-shrink-0 flex items-center w-64"
    >
      <Link className="flex relative " href="/">
        <Image src={logo} height={68} width={68} alt="Logo" />
        <span className="absolute lg:top-8 text-white left-12 top-7 sm:left- sm:top-12">
          <span className="text-white text-lg font-light md:font-semibold lg:font-bold absolute left-5 lg:left-0 " style={{ fontFamily: 'Cursive, sans-serif' }}>Ri</span>
          <span className="text-pink-500 text-lg font-extralight md:font-light lg:font-medium absolute left-9 top-[7px] lg:left-4 font-cursive font-bold text-sm lg:mt-2 "  >zwan</span>
        </span>
      </Link>
    </motion.div>
  </div>
</div>


          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                >
                  <Link
                    href={item.href}
                    className={`relative text-slate-200 hover:text-blue-400 px-4 py-2 text-base font-medium group transition-colors duration-300 ${
                      activeItem === item.href ? "text-blue-400" : ""
                    }`}
                    onClick={() => setActiveItem(item.href)}
                  >
                    {item.name}
                    <motion.span
                      className="absolute inset-x-0 bottom-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transform origin-left"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: activeItem === item.href ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  </Link>
                </motion.div>
              ))}
              
              {/* Settings Button */}
              <motion.button
                className="relative p-3 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white shadow-lg hover:shadow-xl"
                whileHover={{
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(59, 130, 246, 0.6)",
                }}
                whileTap={{ scale: 0.95 }}
                animate={{
                  rotate: isSpinning ? 360 : 0,
                  transition: { duration: 1, ease: "linear" },
                }}
                onClick={() => {
                  setIsSpinning(true);
                  setTimeout(() => setIsSpinning(false), 1000);
                }}
              >
              </motion.button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <motion.button
              onClick={() => setIsOpen(!isOpen)}
              className="text-3xl text-slate-200 hover:text-blue-400 transition-colors duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              {isOpen ? <RiCloseFill /> : <RiMenu4Fill />}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gradient-to-b from-slate-900 to-blue-900 px-4 pt-4 pb-6 space-y-2"
          >
            {navItems.map((item) => (
              <motion.div
                key={item.name}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -20, opacity: 0 }}
              >
                <Link
                  href={item.href}
                  className="block px-4 py-3 rounded-lg text-lg font-medium text-slate-200 hover:text-blue-400 hover:bg-slate-800/50 transition-all duration-300"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
