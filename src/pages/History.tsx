import { Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const History = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      
      <main className="flex-1 py-12 md:py-16">
        <div className="container px-4">
          <div className="mx-auto max-w-4xl">
            <div className="mb-8 text-center">
              <h1 className="mb-2 text-3xl font-bold md:text-4xl">Quiz History</h1>
              <p className="text-muted-foreground">Your past generated quizzes</p>
            </div>

            <Card className="shadow-md">
              <CardContent className="py-16">
                <div className="flex flex-col items-center justify-center text-center">
                  <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent">
                    <Clock className="h-10 w-10 text-primary" />
                  </div>
                  
                  <h2 className="mb-3 text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                    No Quizzes Yet
                  </h2>
                  
                  <p className="max-w-md text-muted-foreground">
                    Generate your first quiz to see it appear here. All your quiz
                    history will be saved for future reference.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default History;
