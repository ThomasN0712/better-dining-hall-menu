"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Linkedin,
  Mail,
  CircleUser,
  CheckIcon,
  ChevronRightIcon,
} from "lucide-react";
import Image from "next/image";
import { BackgroundBeams } from "@/components/BackgroundBeams";
import ShinyButton from "@/components/ShinyButton";
import { AnimatedSentButton } from "@/components/AnimatedSentButton";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://better-dining-hall-menu.onrender.com";

const Footer = () => {
  // State and handler for the report issue form
  const [errorType, setErrorType] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const isFormValid = errorType && message;

  const handleSubmit = async () => {
    if (!isFormValid) return;

    setIsSubmitting(true);
    setSuccess(false);

    const reportData = { errorType, message, email };

    try {
      const response = await fetch("http://127.0.0.1:8000/report-issue", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        setSuccess(true);
        setErrorType("");
        setMessage("");
        setEmail("");
      } else {
        console.error("Failed to send report");
      }
    } catch (error) {
      console.error("Error submitting report:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="rounded-7xl relative mx-auto max-w-[96vw] rounded-xl border bg-[#0A0A0A] antialiased dark:border-white/25 md:max-w-[80vw]"
      id="report"
    >
      {/* Background Beams */}
      <div className="-z-1 absolute inset-0">
        <BackgroundBeams />
      </div>
      <div>
        <div className="item ce flex flex-col justify-start gap-16 p-10 lg:flex-row lg:gap-32 lg:pl-24 lg:pt-10">
          <h1 className="relative z-10 max-w-96 text-5xl font-bold leading-[110%]">
            Have problems with the menu? Report the issue
          </h1>

          {/* Report Issue Form */}
          <div className="item z-10 flex">
            <div className="min-w-96 rounded-xl shadow-md">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="space-y-4"
              >
                {" "}
                <div>
                  <select
                    value={errorType}
                    onChange={(e) => setErrorType(e.target.value)}
                    className="block w-full rounded-md border-b bg-transparent pb-2 shadow-sm focus:border-primary-light focus:ring-primary-light"
                    required
                  >
                    <option value="" disabled>
                      What is the problem?
                    </option>
                    <option value="Unable to load menu">
                      Unable to load menu
                    </option>
                    <option value="Wrong information">Wrong information</option>
                    <option value="Wrong menu item">Wrong menu item</option>
                    <option value="Wrong allergen">Wrong allergen</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="text-md block pb-2 font-medium text-text-light dark:text-text-dark">
                    Tell me more about the issues...
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="block w-full rounded-md border-b bg-transparent pb-2 text-text-light shadow-sm dark:text-text-dark"
                    rows={4}
                    required
                  />
                </div>
                <div>
                  <label className="text-md block pb-2 font-medium text-text-light dark:text-text-dark">
                    Your Name or Email (Optional)
                  </label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full rounded-md border-b bg-transparent pb-2 shadow-sm"
                  />
                </div>
                <div className="flex justify-end">
                  <AnimatedSentButton
                    buttonColor={isFormValid ? "#000000" : "#cccccc"}
                    buttonTextColor="#ffffff"
                    sentStatus={success}
                    initialText={
                      <span className="group inline-flex items-center">
                        Send
                        <ChevronRightIcon className="ml-1 size-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    }
                    changeText={
                      <span className="group inline-flex items-center">
                        <CheckIcon className="mr-2 size-4" />
                        Sent
                      </span>
                    }
                    onClick={isFormValid ? handleSubmit : undefined}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="border-dark-200 flex flex-col justify-between gap-10 border-t p-10 dark:border-white/25 md:flex-row md:gap-0">
          {/* Left Column */}
          <div className="space-y-1.5">
            <h3 className="relative z-10 text-xl font-bold text-text-headingLight dark:text-text-headingDark">
              Made with 💖
            </h3>
            <p className="relative z-10 text-text-mutedLight dark:text-text-mutedDark">
              by Thomas Nguyen
            </p>
            <p className="relative z-10 text-text-mutedLight dark:text-text-mutedDark">
              &copy; 2024 | All rights reserved.
            </p>
          </div>

          {/* Right Column */}
          <div className="flex justify-between gap-6 sm:gap-16">
            {/* "Find the site useful?" Section */}
            <div className="mt-0 flex flex-col items-start space-y-2 pt-0 text-sm font-bold sm:text-base">
              <span className="block text-lg font-semibold text-text-headingLight dark:text-text-headingDark">
                Find the site useful?
              </span>
              <br />
              <ShinyButton>
                <Link
                  href="https://www.paypal.com/donate/?business=P2X7QT54YNJHY&no_recurring=0&item_name=I%27m+a+CS+student+sharing+my+projects.+Hosting+costs+add+up%E2%80%94your+donation+helps+cover+them+and+fuels+my+addiction+for+Celsius%21&currency_code=USD"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="whitespace-nowrap"
                >
                  <span className="flex items-center whitespace-nowrap font-bold">
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

            {/* Socials */}
            <ul className="relative z-10 space-y-2.5 text-sm sm:text-base">
              <li className="text-lg font-semibold text-text-headingLight dark:text-text-headingDark">
                Socials
              </li>
              <li className="flex items-center text-text-mutedLight hover:text-text-headingLight dark:text-text-mutedDark dark:hover:text-text-headingDark">
                <CircleUser className="mr-2 h-5 w-5 text-text-headingLight dark:text-text-headingDark" />
                <Link href="https://www.thomasnguyen.tech/" target="_blank">
                  About Me
                </Link>
              </li>
              <li className="flex items-center text-text-mutedLight hover:text-text-headingLight dark:text-text-mutedDark dark:hover:text-text-headingDark">
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
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
