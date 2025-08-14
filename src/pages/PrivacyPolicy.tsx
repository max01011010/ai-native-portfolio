"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Privacy Policy</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8">Last updated: 08/14/2025</p>

      <div className="prose dark:prose-invert max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">1. Introduction</h2>
        <p className="mb-4">
          This Privacy Policy explains how this application (“App”) handles your information. By using the App, you agree to the practices described here.
        </p>

        <h2 className="text-2xl font-semibold mb-3">2. Information We Collect</h2>
        <p className="mb-4">
          We do not collect personally identifiable information (such as your name, email address, or contact details) for the purpose of selling, renting, or otherwise using it for monetary gain.
        </p>
        <p className="mb-4">
          The App may automatically collect limited, non-identifiable information (such as device type, operating system, and usage statistics) solely to improve functionality, ensure security, and fix technical issues.
        </p>

        <h2 className="text-2xl font-semibold mb-3">3. Advertising and Cookies</h2>
        <p className="mb-4">
          Some Apps may display ads served by Google AdSense or other third-party advertising networks.
        </p>
        <p className="mb-4">
          These ad providers may use cookies, web beacons, or similar technologies to deliver relevant ads and measure their effectiveness.
        </p>
        <p className="mb-4">
          Google, as a third-party vendor, uses cookies to serve ads based on your prior visits to this App or other websites. You can opt out of personalized advertising by visiting Google Ads Settings.
        </p>
        <p className="mb-4">
          You can also choose to receive only non-personalized ads, which will not be based on your previous browsing history but may still use contextual information such as your general location.
        </p>
        <p className="mb-4">
          Before cookies are stored or accessed on your device for advertising purposes, you will be presented with a consent prompt allowing you to accept or deny such use.
        </p>
        <p className="mb-4">
          The data collected by these ad networks is subject to their own privacy policies. We encourage you to review Google’s Privacy Policy here: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">https://policies.google.com/privacy</a>.
        </p>

        <h2 className="text-2xl font-semibold mb-3">4. How We Use Information</h2>
        <p className="mb-4">
          Any information collected is used only to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Operate and improve the App</li>
          <li>Display relevant advertising (if applicable)</li>
          <li>Provide technical support and troubleshoot issues</li>
          <li>Ensure compliance with applicable laws and security standards</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-3">5. Sharing of Information</h2>
        <p className="mb-4">
          We do not sell, trade, or rent your personal information to others.
          We may share non-identifiable, aggregated usage data with service providers solely for analytics, advertising, security, or maintenance purposes.
        </p>

        <h2 className="text-2xl font-semibold mb-3">6. Data Security</h2>
        <p className="mb-4">
          We take reasonable steps to protect any information collected through the App. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
        </p>

        <h2 className="text-2xl font-semibold mb-3">7. Third-Party Services</h2>
        <p className="mb-4">
          If the App uses third-party services (such as hosting, analytics, or advertising networks), those services may have their own privacy policies. You are encouraged to review them separately.
        </p>

        <h2 className="text-2xl font-semibold mb-3">8. Your Privacy Rights</h2>
        <p className="mb-4">
          If you are a resident of the European Economic Area (EEA) or California, you have the right to:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Accept or deny the use of cookies, including those used for advertising. If you choose to deny cookies, you may still see ads, but they will not be personalized based on your browsing history.</li>
          <li>Request access to any personal data we may hold about you.</li>
          <li>Request correction or deletion of your personal data.</li>
          <li>Request restriction or object to the processing of your personal data.</li>
          <li>Opt out of the sale of personal data (we do not sell personal data, but third-party services may collect information under their own privacy policies).</li>
          <li>Request data portability.</li>
        </ul>
        <p className="mb-4">
          Our Apps do not, for the most part, collect personally identifiable information directly. However, third-party services integrated into the Apps (such as advertising networks or AI models) may collect such information in accordance with their own workflows and privacy policies. You are encouraged to review those policies before using the App.
        </p>
        <p className="mb-4">
          To exercise your rights, contact us at contact@maxabardo.work. We will require verification of your identity before fulfilling your request.
        </p>

        <h2 className="text-2xl font-semibold mb-3">9. Changes to This Policy</h2>
        <p className="mb-8">
          We may update this Privacy Policy from time to time. Continued use of the App after changes are posted means you accept the updated policy.
        </p>

        <div className="text-center">
          <Button asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;