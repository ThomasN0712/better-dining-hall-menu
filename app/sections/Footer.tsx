import Link from "next/link";
import { Linkedin, Mail } from "lucide-react";
import Image from "next/image";
import ShinyButton from "@/components/ShinyButton";

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

        {/* Right Column */}
        <div className="flex justify-between gap-6 sm:gap-16">
          <div className="font-bold space-y-2.5 text-sm sm:text-base flex flex-col items-start mt-0 pt-0">
            <span className="block text-lg sm:text-lg font-semibold">
              Find the site useful?
            </span>
            <br />
            <ShinyButton>
              <Link href="#work" className="whitespace-nowrap">
                <span className="flex font-edu font-bold items-center whitespace-nowrap">
                  Buy me a Celsius
                  <Image
                    src="/celsius.png"
                    alt="Celsius"
                    width={12}
                    height={12}
                    className="ml-3 rotate-6"
                  />
                </span>
              </Link>
            </ShinyButton>
          </div>

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
                src="/github-dark-logo.svg"
                alt="GitHub"
                width={20}
                height={20}
                className="mr-2 dark:hidden"
              />
              <Image
                src="/github-logo.svg"
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
