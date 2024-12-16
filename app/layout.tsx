"use client";

import { useState, useEffect } from 'react';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './Navbar/page';
import Footer from "./footer/page";

const inter = Inter({ subsets: ['latin'] });

// Create theme context


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState('light');

  // Initialize theme from localStorage if available
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
    document.documentElement.classList.toggle('dark', savedTheme === 'dark');
  }, []);

  

  return (
    <html lang="en" className={theme}>
      <body className={`${inter.className} min-h-screen transition-colors duration-300 
        ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-800'}`}>
          <Navbar />
          {children}
        <Footer />
      </body>
    </html>
  );
}
