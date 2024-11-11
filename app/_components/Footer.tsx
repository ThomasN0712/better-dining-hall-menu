import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";

const Footer = () => {
  return (
    <div>
      <div className="mt-16 p-10 border-t border-dark-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-center gap-10 md:gap-0">
        {/* Left Column */}
        <div className="space-y-2.5">
          <h3 className="text-xl font-bold relative z-10">Thomas Nguyen</h3>
          <p className="text-dark-200/70 dark:text-stone-200/70 relative z-10">
            &copy; 2024 | All rights reserved.
          </p>
        </div>

        {/* Middle Column */}
        <div className="hidden sm:flex items-center space-x-2.5">
          <span className="text-base text-dark-200/70 dark:text-stone-200/70 relative z-10">
            Made using Next.js
          </span>
          <Image
            src="/imgs/logos/nextjs.svg"
            alt="Next.js Logo"
            width={30}
            height={30}
            className="invert-0 dark:invert"
          />
          <span className="text-base text-dark-200/70 dark:text-stone-200/70 relative z-10">
            React
          </span>
          <Image
            src="/imgs/logos/react.svg"
            alt="React Logo"
            width={30}
            height={30}
          />
          <span className="text-base text-dark-200/70 dark:text-stone-200/70 relative z-10">
            and Vercel
          </span>
          <Image
            src="/imgs/logos/vercel.svg"
            alt="React Logo"
            width={30}
            height={30}
            className="invert-0 dark:invert"
          />
        </div>

        {/* Right Column */}
        <div className="flex justify-between gap-0 gap-6 sm:gap-16">
          <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
            <li className="text-lg sm:text-lg font-semibold">Navigate</li>
            <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
              <Link href="/">Home</Link>
            </li>
            <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
              <Link href="#work">Work</Link>
            </li>
            <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
              <Link href="#about">About</Link>
            </li>
            <li className="text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
              <Link href="#contact">Contact</Link>
            </li>
          </ul>

          <ul className="space-y-2.5 relative z-10 text-sm sm:text-base">
            <li className="text-lg font-semibold">Socials</li>
            <li className="flex items-center text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
              <Linkedin className="mr-2 w-5 h-5" />
              <Link
                href="https://www.linkedin.com/in/thomasnguyen0712/"
                target="_blank"
              >
                LinkedIn
              </Link>
            </li>
            <li className="flex items-center text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
              <Image
                src="/imgs/logos/github-dark-logo.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="mr-2 dark:hidden"
              />
              <Image
                src="/imgs/logos/github-logo.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="mr-2 hidden dark:block"
              />
              <Link href="https://github.com/ThomasN0712" target="_blank">
                Github
              </Link>
            </li>
            <li className="flex items-center text-dark-200/60 hover:text-dark-200 dark:text-white/50 dark:hover:text-white">
              <Mail className="mr-2 w-5 h-5" />
              <Link href="mailto:thomasnguyen0712@gmail.com" target="_blank">
                Mail
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Footer;
