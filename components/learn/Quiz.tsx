"use client";

import * as React from "react";
import { CheckCircle2, XCircle, HelpCircle, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // index of correct option
  explanation: string;
}

interface QuizProps {
  title?: string;
  questions: QuizQuestion[];
}

export function Quiz({ title = "Knowledge Check", questions }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = React.useState(0);
  const [selectedAnswer, setSelectedAnswer] = React.useState<number | null>(null);
  const [showResult, setShowResult] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const [answeredQuestions, setAnsweredQuestions] = React.useState<boolean[]>(
    new Array(questions.length).fill(false)
  );

  const question = questions[currentQuestion];
  const isLastQuestion = currentQuestion === questions.length - 1;
  const isAnswered = answeredQuestions[currentQuestion];

  const handleSelectAnswer = (index: number) => {
    if (!isAnswered) {
      setSelectedAnswer(index);
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswer === null) return;

    const newAnsweredQuestions = [...answeredQuestions];
    newAnsweredQuestions[currentQuestion] = true;
    setAnsweredQuestions(newAnsweredQuestions);

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setShowResult(true);
    } else {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setScore(0);
    setAnsweredQuestions(new Array(questions.length).fill(false));
  };

  if (showResult) {
    const percentage = Math.round((score / questions.length) * 100);
    const isPassed = percentage >= 70;

    return (
      <div className="my-8 p-8 border-2 border-border rounded-xl bg-gradient-to-br from-primary/5 to-accent/5">
        <div className="text-center">
          <div className="inline-flex p-4 rounded-full bg-primary/10 mb-4">
            <Trophy className={cn(
              "w-12 h-12",
              isPassed ? "text-primary" : "text-muted-foreground"
            )} />
          </div>
          <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
          <div className="text-5xl font-bold text-primary mb-4">
            {percentage}%
          </div>
          <p className="text-lg text-muted-foreground mb-2">
            You scored {score} out of {questions.length}
          </p>
          {isPassed ? (
            <p className="text-success font-medium mb-6">
              Great job! You've mastered this concept!
            </p>
          ) : (
            <p className="text-warning font-medium mb-6">
              Keep learning! Review the material and try again.
            </p>
          )}
          <Button variant="default" onClick={handleReset}>
            Retake Quiz
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-8 border-2 border-border rounded-xl overflow-hidden bg-card">
      {/* Header */}
      <div className="bg-muted px-6 py-4 border-b border-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HelpCircle className="w-5 h-5 text-primary" />
            <h3 className="text-lg font-bold">{title}</h3>
          </div>
          <div className="text-sm text-muted-foreground">
            Question {currentQuestion + 1} of {questions.length}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-2 bg-muted">
        <div
          className="h-full bg-primary transition-all duration-300"
          style={{
            width: `${((currentQuestion + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      <div className="p-6">
        <h4 className="text-xl font-bold mb-6">{question.question}</h4>

        {/* Options */}
        <div className="space-y-3 mb-6">
          {question.options.map((option, index) => {
            const isSelected = selectedAnswer === index;
            const isCorrect = index === question.correctAnswer;
            const showCorrect = isAnswered && isCorrect;
            const showIncorrect = isAnswered && isSelected && !isCorrect;

            return (
              <button
                key={index}
                onClick={() => handleSelectAnswer(index)}
                disabled={isAnswered}
                className={cn(
                  "w-full text-left p-4 rounded-lg border-2 transition-all",
                  !isAnswered && "hover:border-primary hover:bg-primary/5 cursor-pointer",
                  isAnswered && "cursor-not-allowed",
                  isSelected && !isAnswered && "border-primary bg-primary/10",
                  showCorrect && "border-success bg-success/10",
                  showIncorrect && "border-error bg-error/10"
                )}
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="flex-1">{option}</span>
                  {showCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  )}
                  {showIncorrect && (
                    <XCircle className="w-5 h-5 text-error flex-shrink-0" />
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Explanation */}
        {isAnswered && (
          <div className={cn(
            "p-4 rounded-lg border-2 mb-6",
            selectedAnswer === question.correctAnswer
              ? "bg-success/5 border-success/20"
              : "bg-warning/5 border-warning/20"
          )}>
            <div className="font-medium mb-2">
              {selectedAnswer === question.correctAnswer ? "Correct!" : "Incorrect"}
            </div>
            <p className="text-sm text-muted-foreground">{question.explanation}</p>
          </div>
        )}

        {/* Actions */}
        <div className="flex items-center justify-between gap-4">
          <div className="text-sm text-muted-foreground">
            Score: {score}/{currentQuestion + (isAnswered ? 1 : 0)}
          </div>
          <div className="flex items-center gap-3">
            {!isAnswered ? (
              <Button
                variant="default"
                onClick={handleSubmitAnswer}
                disabled={selectedAnswer === null}
              >
                Submit Answer
              </Button>
            ) : (
              <Button variant="default" onClick={handleNext}>
                {isLastQuestion ? "See Results" : "Next Question"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
