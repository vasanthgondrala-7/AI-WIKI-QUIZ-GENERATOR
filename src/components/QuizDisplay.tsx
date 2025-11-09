import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, XCircle, Clock, Trophy } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  answer: string;
  difficulty: string;
  explanation: string;
}

interface QuizData {
  title: string;
  summary: string;
  quiz: Question[];
  key_entities?: any;
  related_topics?: string[];
}

interface QuizDisplayProps {
  quizData: QuizData;
  quizId: string;
  onComplete: (results: any) => void;
}

export const QuizDisplay = ({ quizData, quizId, onComplete }: QuizDisplayProps) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [showResults, setShowResults] = useState(false);
  const [startTime] = useState(Date.now());

  const questions = quizData.quiz;
  const progress = ((currentQuestion + 1) / questions.length) * 100;

  const handleNext = () => {
    if (selectedAnswer) {
      setAnswers({ ...answers, [currentQuestion]: selectedAnswer });
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(answers[currentQuestion + 1] || "");
      } else {
        // Quiz complete
        const finalAnswers = { ...answers, [currentQuestion]: selectedAnswer };
        calculateResults(finalAnswers);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || "");
    }
  };

  const calculateResults = (finalAnswers: Record<number, string>) => {
    let correct = 0;
    questions.forEach((q, i) => {
      if (finalAnswers[i] === q.answer) correct++;
    });

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    const accuracy = (correct / questions.length) * 100;

    const results = {
      quiz_id: quizId,
      score: correct,
      total_questions: questions.length,
      accuracy: accuracy.toFixed(2),
      time_taken: timeTaken,
      answers: finalAnswers,
    };

    setShowResults(true);
    onComplete(results);
  };

  const currentQ = questions[currentQuestion];
  const isCorrect = showResults && answers[currentQuestion] === currentQ.answer;
  const isWrong = showResults && answers[currentQuestion] !== currentQ.answer;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy": return "bg-success/10 text-success";
      case "medium": return "bg-warning/10 text-warning";
      case "hard": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  if (showResults) {
    const correctCount = Object.entries(answers).filter(
      ([idx, ans]) => ans === questions[parseInt(idx)].answer
    ).length;
    const accuracy = (correctCount / questions.length) * 100;
    const timeTaken = Math.floor((Date.now() - startTime) / 1000);

    return (
      <Card className="shadow-lg">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gradient-primary">
            <Trophy className="h-10 w-10 text-white" />
          </div>
          <CardTitle className="text-3xl">Quiz Complete!</CardTitle>
          <CardDescription>Here's how you performed</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-primary">{correctCount}/{questions.length}</div>
                <div className="text-sm text-muted-foreground">Correct Answers</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-secondary">{accuracy.toFixed(0)}%</div>
                <div className="text-sm text-muted-foreground">Accuracy</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6 text-center">
                <div className="text-3xl font-bold text-info">{Math.floor(timeTaken / 60)}:{(timeTaken % 60).toString().padStart(2, '0')}</div>
                <div className="text-sm text-muted-foreground">Time Taken</div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <h3 className="font-semibold">Review Your Answers:</h3>
            {questions.map((q, i) => {
              const userAnswer = answers[i];
              const isCorrect = userAnswer === q.answer;
              return (
                <Card key={i} className={isCorrect ? "border-success/50" : "border-destructive/50"}>
                  <CardContent className="pt-6">
                    <div className="mb-2 flex items-start justify-between gap-2">
                      <p className="font-medium">Q{i + 1}. {q.question}</p>
                      {isCorrect ? (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                      ) : (
                        <XCircle className="h-5 w-5 shrink-0 text-destructive" />
                      )}
                    </div>
                    <div className="space-y-1 text-sm">
                      <p className="text-muted-foreground">Your answer: <span className={isCorrect ? "text-success" : "text-destructive"}>{userAnswer}</span></p>
                      {!isCorrect && <p className="text-success">Correct answer: {q.answer}</p>}
                      <p className="text-muted-foreground italic">{q.explanation}</p>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {quizData.related_topics && quizData.related_topics.length > 0 && (
            <div>
              <h3 className="mb-3 font-semibold">Explore Related Topics:</h3>
              <div className="flex flex-wrap gap-2">
                {quizData.related_topics.map((topic, i) => (
                  <Badge key={i} variant="secondary">{topic}</Badge>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <div className="mb-4">
          <Progress value={progress} className="h-2" />
          <div className="mt-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Question {currentQuestion + 1} of {questions.length}</span>
            <Badge className={getDifficultyColor(currentQ.difficulty)}>
              {currentQ.difficulty}
            </Badge>
          </div>
        </div>
        <CardTitle className="text-xl">{currentQ.question}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <RadioGroup value={selectedAnswer} onValueChange={setSelectedAnswer}>
          {currentQ.options.map((option, i) => (
            <div key={i} className="flex items-center space-x-2 rounded-lg border p-4 transition-colors hover:bg-accent/50">
              <RadioGroupItem value={option} id={`option-${i}`} />
              <Label htmlFor={`option-${i}`} className="flex-1 cursor-pointer">
                {option}
              </Label>
            </div>
          ))}
        </RadioGroup>

        <div className="flex justify-between gap-3">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
          >
            Previous
          </Button>
          <Button
            onClick={handleNext}
            disabled={!selectedAnswer}
            className="gap-2"
          >
            {currentQuestion === questions.length - 1 ? "Finish Quiz" : "Next Question"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
