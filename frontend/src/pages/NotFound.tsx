
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="container mx-auto px-4 flex items-center justify-center min-h-[calc(100vh-16rem)] text-center">
      <div>
        <h1 className="text-9xl font-serif font-bold text-book-primary mb-6">404</h1>
        <h2 className="text-3xl font-bold mb-4">Page Not Found</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button size="lg">Return to Homepage</Button>
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
