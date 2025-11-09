import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sparkles, Link2, BookOpen, Lightbulb } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const GenerateQuiz = () => {
  const [url, setUrl] = useState("");

  const examples = [
    {
      title: "Artificial Intelligence",
      url: "https://en.wikipedia.org/wiki/Artificial_Intelligence",
      icon: "🤖",
    },
    {
      title: "Renaissance",
      url: "https://en.wikipedia.org/wiki/Renaissance",
      icon: "🎨",
    },
    {
      title: "Quantum Mechanics",
      url: "https://en.wikipedia.org/wiki/Quantum_mechanics",
      icon: "⚛️",
    },
  ];

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            {/* Header */}
            <div className="mb-8 text-center">
              <div className="mb-4 inline-flex items-center justify-center rounded-2xl bg-gradient-primary p-4 shadow-glow">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">Generate Quiz</h1>
              <p className="text-muted-foreground">From any Wikipedia article</p>
            </div>

            {/* Input Card */}
            <Card className="mb-12 shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Link2 className="h-5 w-5 text-primary" />
                  Wikipedia Article URL
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Input
                  type="url"
                  placeholder="https://en.wikipedia.org/wiki/..."
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  className="h-12 text-base"
                />
                <Button 
                  className="w-full gap-2 shadow-md hover:shadow-lg"
                  size="lg"
                >
                  <Sparkles className="h-5 w-5" />
                  Generate Quiz
                </Button>
              </CardContent>
            </Card>

            {/* Examples */}
            <div className="mb-12">
              <h2 className="mb-6 text-xl font-semibold">Try these examples:</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {examples.map((example, index) => (
                  <Card
                    key={index}
                    className="cursor-pointer transition-all hover:shadow-md"
                    onClick={() => setUrl(example.url)}
                  >
                    <CardContent className="p-6">
                      <div className="mb-3 text-3xl">{example.icon}</div>
                      <h3 className="mb-2 font-semibold">{example.title}</h3>
                      <p className="text-xs text-muted-foreground line-clamp-1">
                        {example.url}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-success/10">
                    <BookOpen className="h-5 w-5 text-success" />
                  </div>
                  <CardTitle className="text-lg">What you'll get</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-success">•</span>
                      5-10 intelligent questions
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-warning">•</span>
                      Multiple difficulty levels
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-secondary">•</span>
                      Detailed explanations
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-primary">•</span>
                      Key entities extraction
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1 text-info">•</span>
                      Related topic suggestions
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 bg-gradient-to-br from-secondary/5 to-transparent">
                <CardHeader>
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-warning/10">
                    <Lightbulb className="h-5 w-5 text-warning" />
                  </div>
                  <CardTitle className="text-lg">Pro Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      Choose articles with detailed, factual content
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      Historical and scientific topics work best
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-1">•</span>
                      Use "Take Quiz" mode to test yourself
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default GenerateQuiz;
