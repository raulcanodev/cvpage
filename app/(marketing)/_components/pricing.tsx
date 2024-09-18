"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Dispatch, SetStateAction, useState } from "react";

// Define the type for a single pricing plan
interface PricingPlan {
    name: string;
    description: string;
    price: string; 
    link: string;
    features: string[];
}

// Sample pricing plans with a unique price
const pricingPlans: PricingPlan[] = [
    {
        name: "Free",
        description: "Give it a try",
        price: '0',
        link: "https://www.linkedin.com/in/maheshwar-reddy-mutupuri-713927258/",
        features: [
            "Landing page",
            "Domain name",
            "Access to some UI blocks",
        ],
    },
    {
        name: "PRO",
        description: "Only for great people, only one time payment",
        price: '8/∞',
        link: "https://www.linkedin.com/in/maheshwar-reddy-mutupuri-713927258/",
        features: [
            "Landing page",
            "Domain name",
            "Access to all UI blocks",
            "Style customization",
            "Remove branding",
        ],
    },
];

export default function Pricing() {
    return (
        <section className="flex justify-center items-center w-full h-full md:px-3 md:py-8 lg:py-9 lg:px-8">
            <div className="relative w-full max-w-4xl">
                <Heading />
                <div className="relative z-10 flex justify-center w-full flex-col items-center gap-8 md:flex-row md:gap-4">
                    <PricingCards pricingPlans={pricingPlans} />
                </div>
            </div>
        </section>
    );
}

function Heading() {
    return (
        <div id="pricing" className="relative px-5 md:px-0 z-10 my-12 grid grid-cols-1 justify-items-center gap-6">
            <p className="border py-0.5 px-3 rounded-full text-sm  dark:bg-black/5">
          Pricing
        </p>
            <motion.p
                initial={{ rotateX: 90, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeIn' }}
                viewport={{ once: true }}
                className="text-2xl md:text-4xl font-bold text-center"
            >
                Choose the plan that&apos;s right for you
            </motion.p>
            <motion.p
                initial={{ rotateX: -90, opacity: 0 }}
                whileInView={{ rotateX: 0, opacity: 1 }}
                transition={{ duration: 1, ease: 'easeIn' }}
                viewport={{ once: true }}
                className="text-wrap text-center text-sm sm:text-base"
            >
                So I can buy a kebap, and you can get your page
            </motion.p>
        </div>
    );
}

const PricingCardVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0 },
};

function PricingCards({ pricingPlans }: { pricingPlans: PricingPlan[] }) {
    return (
        <>
            {pricingPlans.map((plan, index) => (
                <motion.div
                    initial="hidden"
                    variants={PricingCardVariants}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.3 }}
                    whileInView="visible"
                    key={index}
                    className="overflow-hidden relative group/card w-full max-w-sm rounded-xl border-gray-300 p-6 text-left dark:border-gray-600 hover:dark:ring-offset-0 dark:ring-white shadow-md border hover:ring-1 dark:hover:ring-0 hover:ring-offset-4 transition-all hover:shadow-xl ring-gray-700 ease-in-out duration-200 shadow-input dark:border-white/[0.2] dark:shadow-white/10"
                >
                    <p className="mb-1 mt-0 text-sm font-bold uppercase">
                        {plan.name}
                    </p>
                    <p className="my-0 mb-6 text-sm">{plan.description}</p>
                    <div className="mb-4 overflow-hidden">
                        <AnimatePresence mode="wait">
                            <motion.p
                                key="price" // No need to depend on billing now
                                initial={{ rotateX: 90, opacity: 0 }}
                                animate={{ rotateX: 0, opacity: 1 }}
                                transition={{ type: 'spring', stiffness: 100 }}
                                className="my-0 text-3xl font-semibold"
                            >
                                <span>${plan.price}</span> {/* Unique price */}
                            </motion.p>
                        </AnimatePresence>
                    </div>
                    <button className="w-full border rounded-lg mb-4 px-3 py-2 h-11 bg-black hover:ring-1 hover:ring-offset-2 transition-all ease-in-out duration-150 dark:hover:ring-0 dark:ring-offset-0 dark:bg-white ring-black text-center font-medium text-white dark:text-black hover:scale-105 active:scale-95">
                        Get Started
                    </button>
                    {plan.features.map((feature, index) => (
                        <div key={index} className="mb-3 flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check">
                                <path d="M20 6 9 17l-5-5" />
                            </svg>
                            <span className="text-sm">{feature}</span>
                        </div>
                    ))}
                    <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#2b2b2b_1px,transparent_1px),linear-gradient(to_bottom,#2b2b2b_1px,transparent_1px)] dark:group-hover/card:bg-[linear-gradient(to_right,#4f4f4f_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f_1px,transparent_1px)] group-hover/card:bg-[linear-gradient(to_right,#d6d4d4_1px,transparent_1px),linear-gradient(to_bottom,#d6d4d4_1px,transparent_1px)] bg-[size:2.5rem_2.5rem] [mask-image:linear-gradient(to_top,white,transparent,transparent)]"></div>
                </motion.div>
            ))}
        </>
    );
}