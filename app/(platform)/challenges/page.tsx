"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  Trophy, Star, Clock, Code, Zap, Target, Award,
  TrendingUp, Filter, Search, ChevronRight, Lock,
  CheckCircle2, Circle, Play
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

// Challenge data structure
interface Challenge {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
  timeEstimate: string;
  completed: boolean;
  locked: boolean;
  category: string;
  skills: string[];
}

// Sample challenges data
const challenges: Challenge[] = [
  {
    id: "1",
    title: "Build Your First Chatbot",
    description: "Create a simple chatbot using OpenAI API that can answer questions about a specific topic",
    difficulty: "beginner",
    points: 100,
    timeEstimate: "30 min",
    completed: true,
    locked: false,
    category: "API Integration",
    skills: ["API", "Prompting", "JavaScript"]
  },
  {
    id: "2",
    title: "Prompt Engineering Master",
    description: "Design 5 different prompts for various tasks using advanced techniques like few-shot learning",
    difficulty: "beginner",
    points: 150,
    timeEstimate: "45 min",
    completed: true,
    locked: false,
    category: "Prompt Engineering",
    skills: ["Prompting", "Chain of Thought", "Few-Shot"]
  },
  {
    id: "3",
    title: "Document Q&A System",
    description: "Build a RAG system that can answer questions from uploaded PDF documents",
    difficulty: "intermediate",
    points: 250,
    timeEstimate: "2 hours",
    completed: false,
    locked: false,
    category: "RAG",
    skills: ["RAG", "Embeddings", "Vector DB", "LangChain"]
  },
  {
    id: "4",
    title: "Custom AI Agent",
    description: "Create an autonomous agent that can research topics and provide comprehensive summaries",
    difficulty: "intermediate",
    points: 300,
    timeEstimate: "3 hours",
    completed: false,
    locked: false,
    category: "AI Agents",
    skills: ["Agents", "Tools", "ReAct", "LangChain"]
  },
  {
    id: "5",
    title: "Semantic Search Engine",
    description: "Build a semantic search engine using embeddings and hybrid search techniques",
    difficulty: "intermediate",
    points: 350,
    timeEstimate: "3 hours",
    completed: false,
    locked: false,
    category: "Vector Search",
    skills: ["Embeddings", "Vector DB", "BM25", "Hybrid Search"]
  },
  {
    id: "6",
    title: "Fine-tune Your Own Model",
    description: "Fine-tune a small language model on a custom dataset using LoRA",
    difficulty: "advanced",
    points: 500,
    timeEstimate: "4 hours",
    completed: false,
    locked: true,
    category: "Fine-tuning",
    skills: ["LoRA", "Fine-tuning", "PyTorch", "Hugging Face"]
  },
  {
    id: "7",
    title: "Production RAG System",
    description: "Deploy a production-ready RAG application with caching, monitoring, and optimization",
    difficulty: "advanced",
    points: 600,
    timeEstimate: "6 hours",
    completed: false,
    locked: true,
    category: "Deployment",
    skills: ["RAG", "Production", "Monitoring", "Optimization"]
  },
  {
    id: "8",
    title: "Multi-Agent System",
    description: "Build a collaborative multi-agent system where agents work together to solve complex tasks",
    difficulty: "advanced",
    points: 700,
    timeEstimate: "8 hours",
    completed: false,
    locked: true,
    category: "Advanced Agents",
    skills: ["Multi-Agent", "Coordination", "Complex Tasks"]
  },
];

const difficultyColors = {
  beginner: "bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20",
  intermediate: "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 border-yellow-500/20",
  advanced: "bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20",
};

export default function ChallengesPage() {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedDifficulty, setSelectedDifficulty] = React.useState<string>("all");
  const [selectedCategory, setSelectedCategory] = React.useState<string>("all");

  const totalPoints = challenges.reduce((sum, c) => sum + (c.completed ? c.points : 0), 0);
  const completedCount = challenges.filter(c => c.completed).length;
  const progressPercentage = (completedCount / challenges.length) * 100;

  const filteredChallenges = challenges.filter((challenge) => {
    const matchesSearch = challenge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         challenge.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = selectedDifficulty === "all" || challenge.difficulty === selectedDifficulty;
    const matchesCategory = selectedCategory === "all" || challenge.category === selectedCategory;
    return matchesSearch && matchesDifficulty && matchesCategory;
  });

  const categories = Array.from(new Set(challenges.map(c => c.category)));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-b border-border">
        <div className="container mx-auto px-4 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-4xl"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/20 rounded-full text-sm font-medium text-primary mb-4">
              <Trophy className="w-4 h-4" />
              Coding Challenges
            </div>
            <h1 className="text-5xl font-bold mb-4">
              Put Your Skills to the Test
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Complete hands-on challenges to reinforce your learning and earn points
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Card className="p-4 bg-card/50 backdrop-blur-sm border-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Trophy className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{totalPoints}</div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-green-500/10 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{completedCount}/{challenges.length}</div>
                    <div className="text-sm text-muted-foreground">Completed</div>
                  </div>
                </div>
              </Card>

              <Card className="p-4 bg-card/50 backdrop-blur-sm border-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{Math.round(progressPercentage)}%</div>
                    <div className="text-sm text-muted-foreground">Progress</div>
                  </div>
                </div>
              </Card>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Overall Progress</span>
                <span className="text-sm text-muted-foreground">{completedCount} of {challenges.length} completed</span>
              </div>
              <div className="h-3 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-purple-600"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Filters */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search challenges..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11"
            />
          </div>

          {/* Difficulty Filter */}
          <div className="flex gap-2">
            {["all", "beginner", "intermediate", "advanced"].map((level) => (
              <Button
                key={level}
                variant={selectedDifficulty === level ? "default" : "outline"}
                onClick={() => setSelectedDifficulty(level)}
                className="capitalize"
              >
                {level}
              </Button>
            ))}
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="h-11 px-4 rounded-lg border border-border bg-background text-foreground cursor-pointer"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Challenges Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredChallenges.map((challenge, index) => (
            <motion.div
              key={challenge.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className={`p-6 h-full transition-all hover:shadow-lg ${
                challenge.locked ? "opacity-60" : "hover:scale-[1.02] cursor-pointer"
              }`}>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {challenge.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-green-600" />
                      ) : challenge.locked ? (
                        <Lock className="w-5 h-5 text-muted-foreground" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                      <h3 className="font-bold text-lg">{challenge.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {challenge.description}
                    </p>
                  </div>
                </div>

                {/* Meta Info */}
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${
                    difficultyColors[challenge.difficulty]
                  }`}>
                    {challenge.difficulty}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted">
                    {challenge.category}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-muted flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {challenge.timeEstimate}
                  </span>
                  <span className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {challenge.points} pts
                  </span>
                </div>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {challenge.skills.map((skill) => (
                    <span key={skill} className="text-xs px-2 py-1 bg-secondary rounded">
                      {skill}
                    </span>
                  ))}
                </div>

                {/* Action Button */}
                <Button
                  className="w-full group"
                  disabled={challenge.locked}
                  variant={challenge.completed ? "outline" : "default"}
                >
                  {challenge.locked ? (
                    <>
                      <Lock className="w-4 h-4 mr-2" />
                      Complete previous challenges to unlock
                    </>
                  ) : challenge.completed ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Review Solution
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Start Challenge
                      <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredChallenges.length === 0 && (
          <div className="text-center py-16">
            <Target className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">No challenges found</h3>
            <p className="text-muted-foreground">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
