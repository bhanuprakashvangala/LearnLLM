"use client";

import { motion } from "framer-motion";

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-background py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>
          <p className="text-muted-foreground mb-8">Last updated: December 2025</p>

          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By accessing and using LearnLLM.dev, you accept and agree to be bound by these Terms of Service.
                If you do not agree to these terms, please do not use our service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">2. Description of Service</h2>
              <p className="text-muted-foreground">
                LearnLLM.dev is an educational platform that provides courses, tutorials, and interactive
                learning materials about Large Language Models (LLMs) and AI development.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">3. User Accounts</h2>
              <p className="text-muted-foreground mb-4">To access certain features, you must create an account. You agree to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide accurate and complete information</li>
                <li>Maintain the security of your account credentials</li>
                <li>Notify us immediately of any unauthorized access</li>
                <li>Be responsible for all activities under your account</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Use the service for any illegal purpose</li>
                <li>Share your account with others</li>
                <li>Attempt to access other users' accounts</li>
                <li>Interfere with the proper functioning of the service</li>
                <li>Copy or redistribute course content without permission</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">5. Intellectual Property</h2>
              <p className="text-muted-foreground">
                All content on LearnLLM.dev, including text, graphics, logos, and course materials,
                is owned by LearnLLM and protected by intellectual property laws. You may not reproduce,
                distribute, or create derivative works without our express permission.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">6. Payment and Refunds</h2>
              <p className="text-muted-foreground">
                Premium subscriptions are billed according to the plan you select. We offer a 30-day
                money-back guarantee for premium plans. Refund requests should be sent to our support team.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">7. Disclaimer</h2>
              <p className="text-muted-foreground">
                The service is provided "as is" without warranties of any kind. We do not guarantee
                that the service will be uninterrupted or error-free. Educational content is for
                informational purposes and should not be considered professional advice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">8. Limitation of Liability</h2>
              <p className="text-muted-foreground">
                LearnLLM shall not be liable for any indirect, incidental, special, or consequential
                damages arising from your use of the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Terms</h2>
              <p className="text-muted-foreground">
                We reserve the right to modify these terms at any time. We will notify users of
                significant changes via email or through the service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact</h2>
              <p className="text-muted-foreground">
                For questions about these Terms of Service, contact us at{" "}
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
