"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Component() {
  return (
    <section className=" min-h-screen flex flex-col items-center justify-center p-4 mt-8">
      <div className="max-w-2xl mx-auto text-center">
        <div className="flex flex-col items-center mb-8 gap-4 max-w-xl">
          {/* <p className="border py-0.5 px-3 rounded-full text-sm shadow-sm bg-white/5 shadow-white/20">
            Create Your Page
          </p> */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Build Your Online Presence with Hitmeto
          </h1>
          <p className="text-wrap text-center text-sm sm:text-base">
            hitme.to empowers you to create and launch your own stunning web page in minutes, 
            no coding skills required. Start your digital journey today!
          </p>
        </div>
        <Button className="text-lg py-6 px-8">
          Get Started for Free
        </Button>
        <div className="mt-12 relative w-full aspect-video max-w-2xl mx-auto">
          <Image
            src="/hero.png"
            alt="hitme.to interface preview"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-2xl"
          />
        </div>
        <div className="mt-8 text-zinc-400 text-sm">
          <p>Trusted by creators, entrepreneurs, and businesses worldwide</p>
        </div>
      </div>
    </section>
  );
}