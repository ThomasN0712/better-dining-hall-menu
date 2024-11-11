"use client";

import AnimatedParagraph from "@/app/_components/AnimatedParagraph";
import { testimonialItems } from "@/app/_lib/constants";
import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

const Testimonials = () => {
  const [curIndex, setCurIndex] = useState(0);
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.5,
  });

  const goToTestimonial = (index: number) => {
    setCurIndex(index);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (inView) {
      interval = setInterval(() => {
        setCurIndex((prevIndex) =>
          prevIndex === testimonialItems.length - 1 ? 0 : prevIndex + 1
        );
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [curIndex, inView]);

  const currentTestimonial = testimonialItems[curIndex];

  return (
    <div ref={ref} className="mb-32 space-y-10">
      <div className="flex items-start gap-4">
        <div className="text-primary text-9xl font-bold leading-none">“</div>
        <motion.div
          key={`description-${curIndex}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        >
          <AnimatedParagraph paragraph={currentTestimonial.description} />
        </motion.div>
      </div>

      <motion.div
        className="flex items-center justify-center gap-4"
        key={`avatar-${curIndex}`}
        initial={{ opacity: 0, x: -70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="rounded-full overflow-hidden inline-block">
          <Image
            src={currentTestimonial.image}
            alt="avatar"
            width={60}
            height={60}
          />
        </div>
        <div>
          <h3 className="text-lg font-semibold">{currentTestimonial.name}</h3>
          <p className="text-sm opacity-70">{currentTestimonial.proffesion}</p>
        </div>
      </motion.div>

      <div className="flex justify-center items-center gap-2">
        {testimonialItems.map((testimonial, i) => (
          <button
            key={i}
            onClick={() => goToTestimonial(i)}
            className={`h-4 ${
              curIndex === i
                ? "w-9 bg-primary duration-1000"
                : "w-4 bg-[#333333] hover:bg-[#444444] duration-300"
            } rounded-full transition-colors`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
