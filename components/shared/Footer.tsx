import * as React from "react";
import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import { Logo, LogoText } from "./Logo";

const footerLinks = [
  { label: "Learn", href: "/learn" },
  { label: "Challenges", href: "/challenges" },
  { label: "Pricing", href: "/pricing" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

const legalLinks = [
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

const socialLinks = [
  { icon: Github, href: "https://github.com/learnllm", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/learnllm", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com/company/learnllm", label: "LinkedIn" },
];

export function Footer() {
  return (
    <footer className="border-t bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo & Copyright */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2">
              <Logo className="w-6 h-6" />
              <LogoText className="text-lg" />
            </Link>
            <span className="hidden md:block text-sm text-muted-foreground">
              © {new Date().getFullYear()}
            </span>
          </div>

          {/* Links */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <span className="text-muted-foreground/50">|</span>
            {legalLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Social */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 rounded-lg bg-muted hover:bg-primary flex items-center justify-center transition-colors group"
                aria-label={social.label}
              >
                <social.icon className="w-4 h-4 text-muted-foreground group-hover:text-white transition-colors" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Copyright */}
        <p className="md:hidden text-center text-sm text-muted-foreground mt-4">
          © {new Date().getFullYear()} LearnLLM.dev
        </p>
      </div>
    </footer>
  );
}
