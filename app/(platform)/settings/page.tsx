"use client";

import * as React from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { User, Mail, Shield, Bell, Palette, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect if not logged in
  React.useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-bold mb-2">Settings</h1>
          <p className="text-muted-foreground mb-8">
            Manage your account settings and preferences
          </p>

          {/* Profile Section */}
          <div className="bg-card border-2 border-border rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Profile
            </h2>

            <div className="flex items-center gap-6 mb-6">
              {session.user.image ? (
                <img
                  src={session.user.image}
                  alt={session.user.name || "User"}
                  className="w-20 h-20 rounded-full border-4 border-primary"
                />
              ) : (
                <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-bold text-3xl">
                  {session.user.name?.charAt(0).toUpperCase() || session.user.email?.charAt(0).toUpperCase() || "U"}
                </div>
              )}
              <div>
                <h3 className="text-lg font-semibold">{session.user.name || "User"}</h3>
                <p className="text-muted-foreground">{session.user.email}</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Display Name</label>
                <Input
                  defaultValue={session.user.name || ""}
                  placeholder="Your display name"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Name synced from your Google account
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <Input
                  defaultValue={session.user.email || ""}
                  type="email"
                  disabled
                />
                <p className="text-xs text-muted-foreground mt-1">
                  Email cannot be changed
                </p>
              </div>
            </div>
          </div>

          {/* Subscription Section */}
          <div className="bg-card border-2 border-border rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Subscription
            </h2>

            <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-semibold">Free Plan</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded">Current</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Access to beginner lessons and limited features
                </p>
              </div>
              <Button variant="default">
                Upgrade to Pro
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>

          {/* Preferences Section */}
          <div className="bg-card border-2 border-border rounded-xl p-6 mb-6">
            <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <Palette className="w-5 h-5 text-primary" />
              Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3 border-b border-border">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                </div>
                <span className="text-muted-foreground text-sm">Use toggle in navbar</span>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <p className="font-medium">Email Notifications</p>
                  <p className="text-sm text-muted-foreground">Receive updates about new courses</p>
                </div>
                <Button variant="outline" size="sm">
                  Coming Soon
                </Button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="bg-card border-2 border-red-500/20 rounded-xl p-6">
            <h2 className="text-xl font-semibold mb-4 text-red-500">Danger Zone</h2>
            <p className="text-sm text-muted-foreground mb-4">
              Once you delete your account, there is no going back. Please be certain.
            </p>
            <Button variant="outline" className="text-red-500 border-red-500/50 hover:bg-red-500/10">
              Delete Account
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
