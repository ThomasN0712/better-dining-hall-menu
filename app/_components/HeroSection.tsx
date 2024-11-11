import { ChevronRight, Download, Linkedin, Mail } from "lucide-react";
import "@/app/_styles/globals.css";
import ShinyButton from "./ui/ShinyButton";
import Link from "next/link";
import { TextGenerateEffect } from "./ui/TextGenerate";

const HeroSection = () => {
  return (
    <>
      <div className="h-screen w-full dark:bg-dark-100 bg-white dark:bg-grid-white/[0.04] bg-grid-black/[0.06] flex items-center justify-center absolute top-0 left-0">
        {/* Radial gradient for the container to give a faded look */}
        <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-dark-100 bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]" />
      </div>

      <div
        className="pb-20 pt-36 sm:p-0 sm:min-h-screen flex flex-col items-center justify-center relative"
        id="#home"
      >
        <div className="flex flex-col justify-center items-center relative z-10 text-center">
          <p className="uppercase font-bold text-sm tracking-widest">
            Based In California, USA
          </p>
          <TextGenerateEffect
            words="Hi this is Thomas 👋"
            className="text-[40px] md:text-6xl lg:text-7xl font-bold text-center max-w-5xl leading-snug tracking-wide waving-hand"
          />
          <p className="pt-5 pb-10 text-lg sm:text-base md:text-lg text-dark-200 dark:text-stone-200">
            I&apos;m a Computer Science student, soon will graduate and are
            actively looking for a job.
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <ShinyButton icon={<ChevronRight />}>
              <Link href="#work">See My Work</Link>
            </ShinyButton>
            <a
              href="/resume/Thomas_resume.pdf"
              download
              className="flex items-center gap-2.5 group"
            >
              <Download className="text-primary" />
              <span className="group-hover:text-white/70 transition-colors duration-200 font-semibold">
                Download Resume
              </span>
            </a>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-6 mt-8">
            <a
              href="https://www.linkedin.com/in/thomasnguyen0712/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-dark-200 dark:text-stone-200 hover:text-primary transition-colors duration-200 transform hover:scale-150 hover:rotate-6"
            >
              <Linkedin size={24} />
            </a>
            <a
              href="https://github.com/ThomasN0712"
              target="_blank"
              rel="noopener noreferrer"
              className="transform hover:scale-150 hover:-rotate-6 transition-all duration-300"
            >
              <img
                src="imgs/logos/github-dark-logo.svg"
                alt="GitHub"
                className="w-6 h-6 dark:hidden"
              />
              <img
                src="imgs/logos/github-logo.svg"
                alt="GitHub Dark Mode"
                className="w-6 h-6 hidden dark:block"
              />
            </a>
            <a
              href="mailto:thomasnguyen0712@gmail.com"
              className="text-dark-200 dark:text-stone-200 hover:text-primary transition-colors duration-200 transform hover:scale-150 hover:rotate-6"
            >
              <Mail size={24} />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
