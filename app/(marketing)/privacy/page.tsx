"use client";

import { motion } from "framer-motion";

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2025</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                When you use LearnLLM.dev, we collect information you provide directly to us:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Account information (name, email address) when you sign up</li>
                <li>Profile information from Google if you use Google Sign-In</li>
                <li>Learning progress and course completion data</li>
                <li>Any content you create in our playground or challenges</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide, maintain, and improve our services</li>
                <li>Track your learning progress across lessons</li>
                <li>Send you updates about your account and new features</li>
                <li>Respond to your comments and questions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-muted-foreground">
                We do not sell, trade, or otherwise transfer your personal information to third parties.
                We may share information only in the following circumstances:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-4">
                <li>With your consent</li>
                <li>To comply with legal obligations</li>
                <li>To protect our rights and prevent fraud</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-muted-foreground">
                We implement appropriate security measures to protect your personal information.
                Your data is stored securely using industry-standard encryption and security practices.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-muted-foreground mb-4">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Access your personal data</li>
                <li>Correct inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
              <p className="text-muted-foreground">
                We use cookies to maintain your session and remember your preferences.
                These are essential for the service to function properly.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at{" "}
                <a href="mailto:support@learnllm.dev" className="text-primary hover:underline">
                  support@learnllm.dev
                </a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
