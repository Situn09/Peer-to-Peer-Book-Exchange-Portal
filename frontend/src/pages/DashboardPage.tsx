// import { useStore } from "@/lib/store";
import { BookCard } from "@/components/BookCard";
import { Button } from "@/components/ui/button";
import { Link, Navigate } from "react-router-dom";
import { BookForm } from "@/components/BookForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useStore } from "@/lib/store";
import { useEffect } from "react";

const DashboardPage = () => {
  const { currentUser, books, fetchBooks } = useStore();

  useEffect(() => {
    fetchBooks();
  }, []);

  if (!currentUser) {
    return <Navigate to="/login" />;
  }

  const userBooks = books.filter((book) => book.ownerId === currentUser.id);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-4">Your Dashboard</h1>
        <p className="text-muted-foreground">
          {currentUser.role === "owner"
            ? "Manage your book listings and see exchange requests."
            : "Find books and manage your requests."}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1">
          <div className="bg-card rounded-lg p-6 shadow-sm">
            <div className="flex flex-col items-center text-center">
              <div className="h-24 w-24 rounded-full bg-book-light flex items-center justify-center mb-4">
                <span className="text-3xl font-serif text-book-primary">
                  {currentUser.name.charAt(0)}
                </span>
              </div>
              <h2 className="text-xl font-semibold mb-1">{currentUser.name}</h2>
              <p className="text-sm text-muted-foreground mb-2">
                {currentUser.email}
              </p>
              <div className="inline-block bg-book-light px-3 py-1 rounded-full text-xs font-medium mb-4">
                {currentUser.role === "owner" ? "Book Owner" : "Book Seeker"}
              </div>
              <div className="w-full mt-4">
                {currentUser.role === "owner" && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="w-full">Add New Book</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Add a Book Listing</DialogTitle>
                        <DialogDescription>
                          Fill in the details of the book you want to share with
                          others.
                        </DialogDescription>
                      </DialogHeader>
                      <BookForm />
                    </DialogContent>
                  </Dialog>
                )}
                {currentUser.role === "seeker" && (
                  <Link to="/browse">
                    <Button className="w-full">Find Books</Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2">
          {currentUser.role === "owner" && (
            <div>
              <h2 className="text-xl font-serif font-bold mb-4">
                Your Book Listings
              </h2>
              {userBooks.length === 0 ? (
                <div className="bg-card rounded-lg p-8 text-center shadow-sm">
                  <h3 className="text-lg font-medium mb-2">
                    No books listed yet
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    Start sharing your books with the community.
                  </p>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button>Add Your First Book</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[500px]">
                      <DialogHeader>
                        <DialogTitle>Add a Book Listing</DialogTitle>
                        <DialogDescription>
                          Fill in the details of the book you want to share with
                          others.
                        </DialogDescription>
                      </DialogHeader>
                      <BookForm />
                    </DialogContent>
                  </Dialog>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {userBooks.map((book) => (
                    <BookCard key={book.id} book={book} showActions />
                  ))}
                </div>
              )}
            </div>
          )}

          {currentUser.role === "seeker" && (
            <div>
              <h2 className="text-xl font-serif font-bold mb-4">
                Recently Added Books
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {books
                  .filter((book) => book.isAvailable)
                  .sort((a, b) => b.createdAt - a.createdAt)
                  .slice(0, 4)
                  .map((book) => (
                    <BookCard key={book.id} book={book} />
                  ))}
              </div>
              <div className="mt-6 text-center">
                <Link to="/browse">
                  <Button variant="outline">View All Available Books</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
