"use client"
import { PayPalButtons } from '@paypal/react-paypal-js'
import { useMutation } from 'convex/react'
import Link from 'next/link'
import React from 'react'
import { api } from '../../../convex/_generated/api'

function UpgradePlans() {



  return (
    <div style={{ backgroundImage: "url('/pattern.png')" }}>
      <h2 className='font-medium text-3xl'>Plans</h2>
      <p>Upgrade your plan to work on multiple files</p>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 " >
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:items-center md:gap-8 ">
          <div
            className="rounded-2xl  shadow-md sm:order-last sm:px-8 lg:p-12 hover:scale-105 border-2 border-gray-300 backdrop-blur-lg transition-all"
            style={{ backgroundImage: "url('/gradient-card1.jpg')" }}
          >
            <div className="text-center">
              <h2 className="text-lg font-medium text-black">
                Premium
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-black sm:text-4xl"> 4.99$ </strong>

                <span className="text-sm font-medium text-black">/One-Time</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> Unlimited PDF uploads </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> Unlimited Notes Taking </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> Email support </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> Help center access </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> Priority Acess </span>
              </li>

            </ul>

            <Link href={'/dashboard/payment'}>
              <p
                className="mt-8 block rounded-full border bg-white px-12 py-3 text-center text-sm font-medium text-black border-1 border-black hover:bg-black hover:text-white focus:ring-3 focus:outline-hidden"
              >
                Get Started
              </p>
            </Link>

          </div>

          <div className="rounded-2xl border-2 border-gray-300 p-6 shadow-xs sm:px-8 lg:p-12 shadow-md  hover:scale-105 transition-all"
          style={{ backgroundImage: "url('/gradient-card.avif')" }}>
            <div className="text-center">
              <h2 className="text-lg font-medium text-gray-900">
                Free
                <span className="sr-only">Plan</span>
              </h2>

              <p className="mt-2 sm:mt-4">
                <strong className="text-3xl font-bold text-gray-900 sm:text-4xl"> 0$ </strong>

                <span className="text-sm font-medium text-gray-700">/month</span>
              </p>
            </div>

            <ul className="mt-6 space-y-2">
              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> 5 PDF Uploads </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> Limited Notes Taking </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> Email support </span>
              </li>

              <li className="flex items-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-black"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

                <span className="text-white"> Help center access </span>
              </li>

            </ul>

            <a
              className="mt-8 block rounded-full border border-black bg-white px-12 py-3 text-center text-sm font-medium text-black focus:ring-3 focus:outline-hidden"
            >
              Current Plan
            </a>
          </div>
        </div>
      </div>

    </div>
  )
}

export default UpgradePlans