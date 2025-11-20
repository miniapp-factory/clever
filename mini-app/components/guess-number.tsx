"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";

export default function GuessNumber() {
  const [target, setTarget] = useState(0);
  const [guess, setGuess] = useState("");
  const [feedback, setFeedback] = useState("");
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    resetGame();
  }, []);

  const resetGame = () => {
    setTarget(Math.floor(Math.random() * 100) + 1);
    setGuess("");
    setFeedback("");
    setAttempts(0);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const num = parseInt(guess, 10);
    if (isNaN(num) || num < 1 || num > 100) {
      setFeedback("Please enter a number between 1 and 100.");
      return;
    }
    setAttempts(attempts + 1);
    if (num === target) {
      setFeedback(`Correct! You guessed it in ${attempts + 1} tries.`);
    } else if (num < target) {
      setFeedback("Higher");
    } else {
      setFeedback("Lower");
    }
    setGuess("");
  };

  return (
    <Card className="w-full max-w-sm mx-auto mt-8">
      <CardHeader>
        <h2 className="text-xl font-semibold text-center">Guess the Number</h2>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            type="number"
            placeholder="Enter a number (1-100)"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            min={1}
            max={100}
          />
          <Button type="submit" className="w-full">
            Guess
          </Button>
        </form>
        {feedback && (
          <p className="mt-4 text-center font-medium">{feedback}</p>
        )}
        {feedback.startsWith("Correct") && attempts <= 7 && (
          <p className="mt-2 text-center text-green-600">
            🎉 You earned a reward for guessing under 7 tries!
          </p>
        )}
      </CardContent>
      <CardFooter className="flex justify-center">
        <Button variant="outline" onClick={resetGame}>
          Reset Game
        </Button>
      </CardFooter>
    </Card>
  );
}
