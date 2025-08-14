"use client";

import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const TermsAndConditions: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-12 bg-white dark:bg-gray-950 text-gray-900 dark:text-gray-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-6 text-center">Terms and Conditions</h1>
      <p className="text-sm text-gray-600 dark:text-gray-400 text-center mb-8">Last updated: 08/14/2025</p>

      <div className="prose dark:prose-invert max-w-3xl mx-auto">
        <h2 className="text-2xl font-semibold mb-3">1. Acceptance of Terms</h2>
        <p className="mb-4">
          By using this application (“App”), you agree to be bound by these Terms and Conditions (“Terms”). If you do not agree, you may not use the App.
        </p>

        <h2 className="text-2xl font-semibold mb-3">2. No Warranty</h2>
        <p className="mb-4">
          The App is provided “as is” and “as available”, without any warranties of any kind, whether express or implied, including but not limited to warranties of merchantability, fitness for a particular purpose, accuracy, or non-infringement.
        </p>

        <h2 className="text-2xl font-semibold mb-3">3. Limitation of Liability</h2>
        <p className="mb-4">
          To the maximum extent permitted by law, the creator shall not be liable for any direct, indirect, incidental, special, consequential, or exemplary damages, including but not limited to personal injury, property damage, loss of data, loss of profits, or any other losses or damages, whether arising from:
        </p>
        <ul className="list-disc list-inside mb-4">
          <li>Use or inability to use the App</li>
          <li>Reliance on any information or results provided by the App</li>
          <li>Actions or decisions made based on the use of the App</li>
          <li>Events occurring outside the App that may be linked to its use</li>
        </ul>
        <p className="mb-4">
          This limitation applies regardless of whether such damages arise in contract, tort, strict liability, or otherwise, and even if the creator has been advised of the possibility of such damages.
        </p>

        <h2 className="text-2xl font-semibold mb-3">4. User Responsibility</h2>
        <p className="mb-4">
          You are solely responsible for how you use the App and for any consequences of that use. You should not rely on the App as a substitute for professional advice, judgment, or independent verification.
        </p>

        <h2 className="text-2xl font-semibold mb-3">5. Indemnification</h2>
        <p className="mb-4">
          You agree to indemnify, defend, and hold harmless the creator, its affiliates, and their respective officers, employees, and agents from any claims, liabilities, damages, losses, or expenses (including legal fees) arising from your use of the App or violation of these Terms.
        </p>

        <h2 className="text-2xl font-semibold mb-3">6. Third-Party Content and Links</h2>
        <p className="mb-4">
          The App may include links to third-party websites, services, or content. The creator does not endorse and is not responsible for any third-party content, services, or resources. You use them at your own risk.
        </p>

        <h2 className="text-2xl font-semibold mb-3">7. Changes to the Terms</h2>
        <p className="mb-4">
          We may update these Terms from time to time. Continued use of the App after changes are posted means you accept the new Terms.
        </p>

        <h2 className="text-2xl font-semibold mb-3">8. Governing Law</h2>
        <p className="mb-4">
          These Terms shall be governed by and construed in accordance with the laws of the United States of America, without regard to its conflict of law principles.
        </p>

        <h2 className="text-2xl font-semibold mb-3">9. Severability</h2>
        <p className="mb-8">
          If any provision of these Terms is found to be invalid or unenforceable, the remaining provisions shall remain in full force and effect.
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

export default TermsAndConditions;