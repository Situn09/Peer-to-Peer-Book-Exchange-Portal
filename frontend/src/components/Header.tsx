import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
// import { useStore } from "@/lib/store";
import { useToast } from "@/components/ui/use-toast";
import { useStore } from "@/lib/store";

export const Header = () => {
  const { currentUser, logout } = useStore();
  const { toast } = useToast();

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out successfully",
      description: "You have been logged out of your account",
    });
  };

  return (
    <header className="w-full bg-white border-b border-border sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <div className="text-book-primary font-serif text-2xl font-bold">
            BookSwap
          </div>
        </Link>

        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to="/"
            className="text-foreground hover:text-book-primary transition-colors"
          >
            Home
          </Link>
          <Link
            to="/browse"
            className="text-foreground hover:text-book-primary transition-colors"
          >
            Browse Books
          </Link>
          {currentUser && (
            <Link
              to="/dashboard"
              className="text-foreground hover:text-book-primary transition-colors"
            >
              Dashboard
            </Link>
          )}
          <Link
            to="/about"
            className="text-foreground hover:text-book-primary transition-colors"
          >
            About
          </Link>
        </nav>

        <div className="flex items-center space-x-4">
          {currentUser ? (
            <>
              <span className="hidden md:inline-block text-muted-foreground">
                Hello, {currentUser.name}
              </span>
              <Button onClick={handleLogout} variant="outline">
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/register">
                <Button>Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};
