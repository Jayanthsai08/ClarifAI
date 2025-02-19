import React from 'react'
import { motion } from "framer-motion";

function LandingDetails() {
    return (
        <div >
            <div className="flex flex-row justify-between mr-30 p-8 ">
                <div><h1 className="text-7xl  font-semibold leading-tight text-transparent bg-black bg-clip-text lg:mt-16 md:mt-10">
                    Loaded with <br /> Smart <span className="text-7xl font-semibold text-red-700">Features</span>
                </h1></div>
                <div className="p-12">
      <ul className="mt-6 space-y-2">
        {[
          "AI Assistant",
          "Smart Note-Taking",
          "Cloud-Based Storage",
          "Download notes PDF",
          "Split View",
        ].map((text, index) => (
          <motion.li
            key={index}
            className="flex items-center gap-1"
            initial={{ x: 100, opacity: 0 }} // Slide in from the right
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
            viewport={{ once: true, amount: 0.5 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-7 text-red-700"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-gray-700 text-xl">{text}</span>
          </motion.li>
        ))}
      </ul>
    </div>

            </div>

        </div>
    )
}

export default LandingDetails