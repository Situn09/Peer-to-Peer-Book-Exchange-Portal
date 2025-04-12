import { Book } from "@/types";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { useStore } from "@/lib/store";

interface BookCardProps {
  book: Book;
  showActions?: boolean;
}

export const BookCard = ({ book, showActions = false }: BookCardProps) => {
  const { currentUser, toggleBookAvailability, deleteBook } = useStore();
  const isOwner = currentUser?.id === book.ownerId;

  return (
    <Card className="overflow-hidden book-card h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img
          src={
            book.imageUrl ||
            "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
          }
          alt={book.title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        <div className="absolute top-2 right-2">
          {book.isAvailable ? (
            <Badge className="bg-green-500">Available</Badge>
          ) : (
            <Badge variant="secondary">Rented</Badge>
          )}
        </div>
      </div>
      <CardContent className="p-4 flex-grow">
        <h3 className="font-serif text-lg font-semibold line-clamp-1">
          {book.title}
        </h3>
        <p className="text-muted-foreground text-sm">{book.author}</p>
        {book.genre && (
          <p className="text-xs text-muted-foreground mt-1">
            Genre: {book.genre}
          </p>
        )}
        <div className="mt-2">
          <p className="text-sm flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 text-book-primary"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {book.location}
          </p>
        </div>
        <p className="text-xs text-muted-foreground mt-2">
          Listed {formatDistanceToNow(book.createdAt, { addSuffix: true })}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0 mt-auto">
        {showActions && isOwner ? (
          <div className="flex flex-col space-y-2 w-full">
            <Button
              variant="outline"
              onClick={() => toggleBookAvailability(book.id)}
              className="w-full"
            >
              Mark as {book.isAvailable ? "Unavailable" : "Available"}
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteBook(book.id)}
              className="w-full"
            >
              Delete Listing
            </Button>
          </div>
        ) : (
          <Link to={`/book/${book.id}`} className="w-full">
            <Button className="w-full">View Details</Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
};
