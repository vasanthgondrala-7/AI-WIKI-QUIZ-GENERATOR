import { useEffect, useState } from "react";
import { Clock, ExternalLink } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const History = () => {
  const [quizResults, setQuizResults] = useState<any[]>([]);

  useEffect(() => {
    loadQuizHistory();
  }, []);

  const loadQuizHistory = () => {
    try {
      const existingHistory = localStorage.getItem("quizHistory");
      const history = existingHistory ? JSON.parse(existingHistory) : [];
      setQuizResults(history);
    } catch (error: any) {
      console.error("Error loading quiz history:", error);
      setQuizResults([]);
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-6xl">
            <div className="mb-8">
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">Quiz History</h1>
              <p className="text-muted-foreground">Your past completed quizzes</p>
            </div>

            {quizResults.length === 0 ? (
              <Card className="shadow-md">
                <CardContent className="py-16">
                  <div className="flex flex-col items-center justify-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
                      <Clock className="h-10 w-10 text-primary" />
                    </div>
                    
                    <h2 className="mb-3 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                      No Quizzes Yet
                    </h2>
                    
                    <p className="max-w-md text-muted-foreground mb-6">
                      Generate your first quiz to see it appear here. All your quiz
                      history will be saved for future reference.
                    </p>

                    <Button asChild>
                      <a href="/generate">Generate Your First Quiz</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="shadow-md">
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Quiz Title</TableHead>
                        <TableHead className="text-center">Score</TableHead>
                        <TableHead className="text-center">Accuracy</TableHead>
                        <TableHead className="text-center">Time</TableHead>
                        <TableHead>Completed</TableHead>
                        <TableHead className="text-right">Link</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {quizResults.map((result, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">
                            {result.quizTitle || "Unknown Quiz"}
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge variant="secondary">
                              {result.score}/{result.total_questions}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            <Badge 
                              className={
                                result.accuracy >= 80 
                                  ? "bg-success/10 text-success" 
                                  : result.accuracy >= 60
                                  ? "bg-warning/10 text-warning"
                                  : "bg-destructive/10 text-destructive"
                              }
                            >
                              {result.accuracy}%
                            </Badge>
                          </TableCell>
                          <TableCell className="text-center">
                            {Math.floor(result.time_taken / 60)}:{(result.time_taken % 60).toString().padStart(2, '0')}
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {new Date(result.completedAt).toLocaleDateString()}
                          </TableCell>
                          <TableCell className="text-right">
                            {result.quizUrl && (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                              >
                                <a 
                                  href={result.quizUrl} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="gap-2"
                                >
                                  <ExternalLink className="h-4 w-4" />
                                  View Article
                                </a>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default History;
