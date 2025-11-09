const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container px-4 py-8">
        <div className="text-center text-sm text-muted-foreground">
          <p>Built with React, Tailwind CSS, and AI</p>
          <p className="mt-1">
            Backend: Python FastAPI • Database: PostgreSQL/MySQL
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
