"use client"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TbBrandDisney } from "react-icons/tb";
import { FaGoogleWallet } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import { useSwipeable } from "react-swipeable"; // Import the hook

const Products = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0); // Explicitly type as number
  const [direction, setDirection] = useState<number>(0); // Explicitly type as number
  const [showPopup, setShowPopup] = useState<boolean>(false); // Explicitly type as boolean
  const [selectedCountry, setSelectedCountry] = useState<string>("United Kingdom"); // Explicitly type as string
  const [selectedMonths, setSelectedMonths] = useState<number>(1); // Explicitly type as number
  const [price, setPrice] = useState<number>(0); // Explicitly type as number

  const products = [
    {
      id: 1,
      name: "Disney",
      icon: <TbBrandDisney className="text-6xl text-disney-blue" />,
      description: "Unlock the magic of Disney with endless movies, shows, and unforgettable moments!",
      prices: {
        1: { PKR: 800, USD: 15, GBP: 12 },
        3: { PKR: 2100, USD: 40, GBP: 32 },
        6: { PKR: 4000, USD: 75, GBP: 60 },
        12: { PKR: 7200, USD: 140, GBP: 110 }
      }
    },
    {
      id: 2,
      name: "Spotify Premium",
      icon: <FaGoogleWallet className="text-6xl text-green-500" />,
      description: "Ad-free music streaming with offline downloads",
      prices: {
        1: { PKR: 500, USD: 10, GBP: 8 },
        3: { PKR: 1400, USD: 27, GBP: 22 },
        6: { PKR: 2700, USD: 50, GBP: 40 },
        12: { PKR: 5000, USD: 90, GBP: 75 }
      }
    }
  ];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      y: 0,
      opacity: 0,
      rotateY: direction > 0 ? -45 : 45,
      scale: 0.8
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      y: 0,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
      transition: {
        duration: 0.5
      }
    })
  };

  const getPrice = () => {
    const product = products[currentIndex];
    const currency =
      selectedCountry === "United States"
        ? "USD"
        : selectedCountry === "United Kingdom"
        ? "GBP"
        : "PKR";
    return product.prices[selectedMonths as 1 | 3 | 6 | 12][currency];
  };

  useEffect(() => {
    const price = getPrice();
    setPrice(price);
  }, [selectedCountry, selectedMonths, currentIndex]);

  const handlePurchase = () => {
    const product = products[currentIndex];
    const currency =
      selectedCountry === "United States"
        ? "$"
        : selectedCountry === "United Kingdom"
        ? "£"
        : "PKR";
    const message = `
*Product Details*%0A
-------------------------
Product: *${product.name}*%0A
Duration: *${selectedMonths} month(s)*%0A
Country: *${selectedCountry}*%0A
Price: *${currency} ${price}*%0A
-------------------------
    `;
    window.open(`https://wa.me/+447475712040?text=${encodeURIComponent(message)}`, "_blank");
  };

  // Swipe handlers
  const handleSwiped = (eventData: any) => {
    if (eventData.dir === "Left") {
      setCurrentIndex((prev) => (prev === products.length - 1 ? 0 : prev + 1));
    } else if (eventData.dir === "Right") {
      setCurrentIndex((prev) => (prev === 0 ? products.length - 1 : prev - 1));
    }
  };

  const swipeHandlers = useSwipeable({
    onSwiped: handleSwiped,
    trackMouse: true
  });

  return (
    <div className="bg-gradient-to-b from-slate-900 to-slate-800 min-h-screen py-16 px-4 perspective-1000">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl text-center font-bold text-white mb-12 animate-fade-in">
          Premium Subscriptions
        </h2>

        <div className="relative h-[400px] md:h-[450px]" {...swipeHandlers}> {/* Add swipeable handlers here */}
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full"
            >
              <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl shadow-2xl p-8 mx-auto max-w-3xl transform hover:scale-105 transition-transform duration-300 border border-slate-700/50 backdrop-blur-sm">
                <div className="flex flex-col items-center space-y-6">
                  <div className="transform hover:scale-110 transition-transform duration-300">
                    {products[currentIndex].icon}
                  </div>
                  <h3 className="font-bold text-2xl text-white">{products[currentIndex].name}</h3>
                  <p className="text-gray-300 text-center text-lg">
                    {products[currentIndex].description}
                  </p>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transform transition-all duration-300"
                    onClick={() => setShowPopup(true)}
                  >
                    Subscribe Now
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Popup Modal */}
        <AnimatePresence>
          {showPopup && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-white p-6 rounded-xl shadow-lg max-w-lg w-full"
              >
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-2xl font-bold text-gray-800">
                    Subscribe to {products[currentIndex].name}
                  </h3>
                  <button onClick={() => setShowPopup(false)}>
                    <FiX className="text-xl text-gray-600" />
                  </button>
                </div>
                <div className="space-y-4">
                  <label className="text-lg text-gray-700">
                    Select Country
                    <select
                      className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                      value={selectedCountry}
                      onChange={(e) => setSelectedCountry(e.target.value)}
                    >
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="United States">United States</option>
                      <option value="Pakistan">Pakistan</option>
                    </select>
                  </label>

                  <label className="text-lg text-gray-700">
                    Select Duration
                    <select
                      className="w-full p-2 mt-2 border border-gray-300 rounded-md"
                      value={selectedMonths}
                      onChange={(e) => setSelectedMonths(Number(e.target.value))}
                    >
                      <option value={1}>1 Month</option>
                      <option value={3}>3 Months</option>
                      <option value={6}>6 Months</option>
                      <option value={12}>12 Months</option>
                    </select>
                  </label>

                  <div className="text-xl font-semibold text-gray-800">
                    Price: {selectedCountry === "United States" ? "$" : selectedCountry === "United Kingdom" ? "£" : "PKR"} {price}
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-full font-semibold shadow-lg hover:bg-blue-700 transform transition-all duration-300"
                    onClick={handlePurchase}
                  >
                    Purchase Now
                  </motion.button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Products;
