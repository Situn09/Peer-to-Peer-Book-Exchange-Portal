import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/BookCard";
import { useStore } from "@/lib/store";
import { useEffect } from "react";
// import { useStore } from "@/lib/store";

const HomePage = () => {
  const { books, fetchBooks } = useStore();
  const recentBooks = books
    .filter((book) => book.isAvailable)
    .sort((a, b) => b.createdAt - a.createdAt)
    .slice(0, 4);

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <div className="hero bg-book-background border-b border-border">
        <div className="container mx-auto px-4 py-20 md:py-32">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif mb-6">
              Share Books,{" "}
              <span className="text-book-primary">Spread Knowledge</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8">
              A community platform where book lovers can exchange, give away, or
              rent books directly with each other. Join our community today!
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button size="lg" className="w-full sm:w-auto">
                  Join the Community
                </Button>
              </Link>
              <Link to="/browse">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto"
                >
                  Browse Books
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl md:text-3xl font-serif font-bold">
            Recently Added Books
          </h2>
          <Link to="/browse" className="text-book-primary hover:underline">
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </div>

      <div className="bg-book-light">
        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-serif font-bold mb-6">
                How It Works
              </h2>
              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-book-primary text-white flex items-center justify-center flex-shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Create an account
                    </h3>
                    <p className="text-muted-foreground">
                      Sign up as a Book Owner if you want to share books, or as
                      a Book Seeker if you're looking for books.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-book-primary text-white flex items-center justify-center flex-shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      List or browse books
                    </h3>
                    <p className="text-muted-foreground">
                      Book Owners can list their available books while Seekers
                      can browse through the listings.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="h-8 w-8 rounded-full bg-book-primary text-white flex items-center justify-center flex-shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">
                      Connect and exchange
                    </h3>
                    <p className="text-muted-foreground">
                      Connect with other users through the provided contact
                      information and arrange your book exchange.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?q=80&w=1470&auto=format&fit=crop"
                alt="Book exchange"
                className="rounded-lg shadow-lg max-w-full h-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
