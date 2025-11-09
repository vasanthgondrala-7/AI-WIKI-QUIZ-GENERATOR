import { Link, useLocation } from "react-router-dom";
import { Sparkles, Home, History, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const Header = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-3 transition-transform hover:scale-105">
          <img src={logo} alt="WikiMind Logo" className="h-10 w-10" />
          <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            WikiMind
          </span>
        </Link>

        <nav className="flex items-center gap-2">
          <Button
            variant={isActive("/") ? "default" : "ghost"}
            asChild
            className="gap-2"
          >
            <Link to="/">
              <Home className="h-4 w-4" />
              <span className="hidden sm:inline">Home</span>
            </Link>
          </Button>
          
          <Button
            variant={isActive("/generate") ? "default" : "ghost"}
            asChild
            className="gap-2"
          >
            <Link to="/generate">
              <Sparkles className="h-4 w-4" />
              <span className="hidden sm:inline">Generate Quiz</span>
            </Link>
          </Button>
          
          <Button
            variant={isActive("/history") ? "default" : "ghost"}
            asChild
            className="gap-2"
          >
            <Link to="/history">
              <Clock className="h-4 w-4" />
              <span className="hidden sm:inline">History</span>
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
