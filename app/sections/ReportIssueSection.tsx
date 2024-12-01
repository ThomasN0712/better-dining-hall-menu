"use client";

import React, { useState } from "react";

const ReportIssueForm: React.FC = () => {
  const [errorType, setErrorType] = useState("");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSuccess(false);

    const reportData = {
      errorType,
      message,
      email,
    };

    try {
      const response = await fetch("/api/report-issue", {
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
    <div className="flex justify-center pl-32 pr-32">
      <div className="w-full rounded-lg bg-gray-100 p-6 shadow-md dark:bg-gray-800">
        <h2 className="mb-4 text-lg font-semibold text-gray-700 dark:text-gray-300">
          Report an Issue
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Error Type
            </label>
            <select
              value={errorType}
              onChange={(e) => setErrorType(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light dark:border-gray-700 dark:bg-gray-900"
              required
            >
              <option value="" disabled>
                Select an error type
              </option>
              <option value="Unable to load menu">Unable to load menu</option>
              <option value="Wrong information">Wrong information</option>
              <option value="Wrong menu item">Wrong menu item</option>
              <option value="Wrong allergen">Wrong allergen</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light dark:border-gray-700 dark:bg-gray-900"
              rows={4}
              placeholder="Describe the issue in detail..."
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Your Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-light focus:ring-primary-light dark:border-gray-700 dark:bg-gray-900"
              placeholder="you@example.com"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-primary-light py-2 text-white shadow-md hover:bg-primary-dark dark:bg-primary-dark hover:dark:bg-primary-light"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
          {success && (
            <p className="mt-4 text-green-500">
              Thank you! Your report has been submitted.
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ReportIssueForm;
