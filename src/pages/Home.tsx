import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Sparkles, BookOpen, Target, Lightbulb, Link2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import heroBg from "@/assets/hero-bg.jpg";

const Home = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section 
          className="relative overflow-hidden py-20 md:py-32"
          style={{
            backgroundImage: `url(${heroBg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/80" />
          
          <div className="container relative z-10 px-4">
            <div className="mx-auto max-w-4xl text-center">
              <Badge variant="secondary" className="mb-6 gap-2 px-4 py-2 text-sm shadow-md">
                <Sparkles className="h-4 w-4" />
                AI-Powered Learning Platform
              </Badge>
              
              <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Transform Articles into{" "}
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  Interactive Quizzes
                </span>
              </h1>
              
              <p className="mb-10 text-lg text-muted-foreground sm:text-xl md:text-2xl">
                Harness the power of AI to convert any Wikipedia article into engaging
                educational quizzes. Learn smarter, not harder.
              </p>
              
              <Button
                asChild
                size="lg"
                className="group h-14 gap-2 px-8 text-lg shadow-lg transition-all hover:shadow-glow"
              >
                <Link to="/generate">
                  Generate Your First Quiz
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 md:py-24">
          <div className="container px-4">
            <h2 className="mb-12 text-center text-3xl font-bold md:text-4xl">
              What you'll get:
            </h2>
            
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-success/10">
                  <Target className="h-6 w-6 text-success" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">5-10 intelligent questions</h3>
                <p className="text-muted-foreground">
                  AI-generated questions that test your understanding of key concepts
                </p>
              </div>

              <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10">
                  <BookOpen className="h-6 w-6 text-warning" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Multiple difficulty levels</h3>
                <p className="text-muted-foreground">
                  Questions range from easy to hard, perfect for all knowledge levels
                </p>
              </div>

              <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-secondary/10">
                  <Lightbulb className="h-6 w-6 text-secondary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Detailed explanations</h3>
                <p className="text-muted-foreground">
                  Every answer includes context to enhance your learning
                </p>
              </div>

              <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Key entities extraction</h3>
                <p className="text-muted-foreground">
                  Automatically identifies important people, places, and concepts
                </p>
              </div>

              <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-info/10">
                  <Link2 className="h-6 w-6 text-info" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Related topic suggestions</h3>
                <p className="text-muted-foreground">
                  Discover connected subjects to expand your knowledge
                </p>
              </div>

              <div className="group rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/50">
                  <BookOpen className="h-6 w-6 text-accent-foreground" />
                </div>
                <h3 className="mb-2 text-xl font-semibold">Quiz history tracking</h3>
                <p className="text-muted-foreground">
                  Access all your past quizzes anytime for review
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
