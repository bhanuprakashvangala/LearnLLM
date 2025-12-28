import * as React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin, Youtube, Mail } from "lucide-react";
import { Logo, LogoText } from "./Logo";

const footerLinks = {
  product: [
    { label: "Learn", href: "/learn" },
    { label: "Challenges", href: "/challenges" },
    { label: "Playground", href: "/playground" },
    { label: "Pricing", href: "/pricing" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  resources: [
    { label: "Getting Started", href: "/learn/beginner" },
    { label: "API Tutorials", href: "/learn/intermediate" },
    { label: "Advanced Topics", href: "/learn/advanced" },
    { label: "Help Center", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/cookies" },
  ],
};

const socialLinks = [
  { icon: Github, href: "https://github.com/learnllm", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/learnllm", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/learnllm", label: "LinkedIn" },
  { icon: Youtube, href: "https://youtube.com/@learnllm", label: "YouTube" },
];

export function Footer() {
  return (
    <footer className="relative border-t overflow-hidden bg-background">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4 w-fit">
              <Logo className="w-8 h-8" />
              <LogoText className="text-xl" />
            </Link>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Master Large Language Models through interactive tutorials, real-world challenges, and hands-on projects.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg bg-muted hover:bg-primary flex items-center justify-center transition-all hover:scale-105 group border border-border"
                  aria-label={social.label}
                >
                  <social.icon className="w-4 h-4 text-foreground group-hover:text-white transition-colors" />
                </a>
              ))}
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="py-10 border-t">
          <div className="bg-muted/50 rounded-2xl p-8 md:p-10 border-2 border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-2xl font-bold mb-2 text-foreground">
                  Subscribe to our newsletter
                </h3>
                <p className="text-base text-muted-foreground">
                  Get weekly AI tips, tutorials, and exclusive updates.
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex h-12 rounded-lg border-2 border-border bg-background px-4 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:border-primary transition-all flex-1 md:w-72"
                />
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-bold bg-primary text-white hover:bg-primary/90 shadow-md h-12 px-6 py-2">
                  <Mail className="w-4 h-4" />
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} LearnLLM.dev. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              {footerLinks.legal.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
