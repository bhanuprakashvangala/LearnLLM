import * as React from "react";
import { Cookie } from "lucide-react";

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Cookie className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-4xl font-bold">Cookie Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>
        </div>

        <div className="prose prose-lg dark:prose-invert max-w-none">
          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">What Are Cookies</h2>
            <p className="text-muted-foreground mb-4">
              Cookies are small text files that are stored on your computer or mobile device when you visit our website.
              They help us provide you with a better experience by remembering your preferences and understanding how
              you use our platform.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">How We Use Cookies</h2>
            <p className="text-muted-foreground mb-4">We use cookies for the following purposes:</p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li><strong className="text-foreground">Essential Cookies:</strong> Required for the website to function properly, including authentication and security.</li>
              <li><strong className="text-foreground">Preference Cookies:</strong> Remember your settings like dark mode preference and language.</li>
              <li><strong className="text-foreground">Analytics Cookies:</strong> Help us understand how visitors interact with our website to improve our services.</li>
              <li><strong className="text-foreground">Progress Cookies:</strong> Track your learning progress across lessons and challenges.</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Types of Cookies We Use</h2>
            <div className="space-y-4">
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Session Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Temporary cookies that are deleted when you close your browser. Used for login sessions and shopping cart functionality.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Persistent Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Remain on your device for a set period. Used for remembering your preferences and login information.
                </p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg border border-border">
                <h3 className="font-semibold mb-2">Third-Party Cookies</h3>
                <p className="text-sm text-muted-foreground">
                  Set by third-party services we use, such as analytics providers. These help us understand website usage patterns.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Managing Cookies</h2>
            <p className="text-muted-foreground mb-4">
              You can control and manage cookies in various ways. Most browsers allow you to:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
              <li>View what cookies are stored and delete them individually</li>
              <li>Block third-party cookies</li>
              <li>Block cookies from specific sites</li>
              <li>Block all cookies</li>
              <li>Delete all cookies when you close your browser</li>
            </ul>
            <p className="text-muted-foreground mt-4">
              Please note that blocking all cookies may affect your experience on our website, as some features
              require cookies to function properly.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground">
              If you have any questions about our Cookie Policy, please contact us at{" "}
              <a href="mailto:privacy@learnllm.dev" className="text-primary hover:underline">
                privacy@learnllm.dev
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
