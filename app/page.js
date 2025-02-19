"use client"
import { Button } from "../components/ui/button";
import { api } from "../convex/_generated/api";
import { UserButton, useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { useEffect, useRef } from "react";
import LandingHeader from "./dashboard/_components/LandingHeader";
import Image from "next/image";
import Link from "next/link";
import LandingDetails from "./dashboard/_components/LandingDetails"
import Footer from "./dashboard/_components/Footer"
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Home() {
  const { user } = useUser();
  const createUser = useMutation(api.user.createUser);

  // Step 1: Create a ref for the Features Section
  const featuresRef = useRef(null);
  const imageSectionRef = useRef(null);

  useEffect(() => {
    const checkAndCreateUser = async () => {
      if (user) {
        await createUser({
          email: user?.primaryEmailAddress?.emailAddress,
          imageUrl: user?.imageUrl,
          userName: user?.fullName,
          upgrade: user?.upgrade ?? false,
        });
      }
    };

    checkAndCreateUser();
  }, [user, createUser]);



  return (
    <div className="min-h-screen " style={{ backgroundImage: "url('/pattern.png')" }}>
      {/* Navigation */}
      <nav className=" sticky top-0 z-50 flex items-center justify-between px-8 py-4 ">
        <LandingHeader />
      </nav>
      <div className="rounded-2xl mx-12 my-3 p-2  backdrop-blur-md " style={{ backgroundImage: "url('/gradient-hero.png')" }} >
        {/* Hero Section */}
        <section className="container px-4 mx-auto mt-12 text-center">
          <h1 className="text-7xl font-bold leading-tight text-transparent bg-white bg-clip-text font-hel">
            Simplify <span className="text-7xl text-red-600">PDF</span> <span className="text-7xl text-blue-700">Note</span>-Taking
            <br />
            with AI-Powered Insights
          </h1>
          <p className="mt-6 text-2xl text-white lg:mx-80 md:mx-20 sm:mx-5">
            Elevate your note-taking experience with our AI-powered PDF app.
            Seamlessly extract key insights from any PDF with just a few clicks.
          </p>

          <div className="mt-8 space-x-4">
            {user ? (
              <Link href="/dashboard">
                <Button className="px-8 py-6 mb-36 text-lg size-xl border-2 border-black bg-black hover:bg-white hover:text-black  text-white rounded-lg hover:scale-105 transition-transform">
                  Get Started
                </Button>
              </Link>
            ) : (
              <Button
                className="px-8 py-6 mb-36 text-lg size-xl bg-black text-white rounded-lg hover:scale-105 transition-transform"
                onClick={() => alert("Please log in to get started!")}
              >
                Get Started
              </Button>
            )}

          </div>
        </section>

        {/* Image Display Section */}
        <section
          ref={imageSectionRef}
          className="container px-4 mx-auto mt-5 mb-24 py-0 text-center flex justify-center items-center "
        >

          <div className="flex justify-center mt-80 mb-10 absolute ">
            <Image
              src="/landing.png"
              alt="Descriptive Text"
              width={1000}
              height={600}
              className=" rounded-xl drop-shadow-xl "
            />
          </div>


        </section>
      </div>

      <div className="flex flex-row justify-between px-6 py-16">
      <div className="flex flex-col gap-20">
        <motion.div
        className=" rounded-full p-2 glow-effect backdrop-blur-xl items-center border-2 border-gray-200"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-black text-xl">Instant AI Insights</h2>
        </motion.div>
        <motion.div
        className=" rounded-full p-2 glow-effect backdrop-blur-xl items-center border-2 border-gray-200"
          initial={{ x: -100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-red-700 text-xl ml-4">Powerful Tools</h2>
        </motion.div>
        
      </div>
      <div className="flex flex-col gap-20">
        
        <motion.div
        className=" rounded-full p-2 glow-effect backdrop-blur-xl items-center border-2 border-gray-200"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-red-700 text-xl">Personalized Editor</h2>
        </motion.div>
        <motion.div
        className=" rounded-full p-2 glow-effect backdrop-blur-xl items-center border-2 border-gray-200"
          initial={{ x: 100, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <h2 className="text-black text-xl ml-6">Cloud Storage</h2>
        </motion.div>
      </div>
    </div>
      {/* Features Section */}
      <section ref={featuresRef} className="container px-40 mt-6 mx-auto mb-10">
        <LandingDetails />
      </section>

      {/* CTA Section */}
      <section className="container px-4 mx-auto py-5 text-center">
        <div className="p-8 backdrop-blur-lg  rounded-2xl ">
          <h2 className="text-3xl font-bold text-black ">
            Ready to Transform Your Studying Experience?
          </h2>

          {user ? (
            <Link href="/dashboard">
              <Button
                variant="secondary"
                className="mt-6 px-8 py-4 text-lg size-xl border-2 border-black bg-black hover:bg-white hover:text-black  text-white rounded-lg hover:scale-105 transition-transform"
              >
                Start Free Trial
              </Button>
            </Link>
          ) : (
            <Button
              variant="secondary"
              className="mt-6 px-8 py-4 text-lg size-xl border-2 border-black bg-black hover:bg-white hover:text-black  text-white rounded-lg hover:scale-105 transition-transform"
              onClick={() => toast("Please log in to start the free trial!")}
            >
              Start Free Trial
            </Button>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
