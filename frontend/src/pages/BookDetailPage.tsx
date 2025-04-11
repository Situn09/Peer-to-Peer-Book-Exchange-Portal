import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { useStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import { useStore } from "@/lib/store";

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, users } = useStore();

  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
        <p className="mb-6">
          The book you're looking for doesn't exist or has been removed.
        </p>
        <Button onClick={() => navigate("/browse")}>Browse Books</Button>
      </div>
    );
  }

  const owner = users.find((user) => user.id === book.ownerId);

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <div className="max-w-md overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
            <img
              src={
                book.imageUrl ||
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
              }
              alt={book.title}
              className="w-full h-auto object-cover aspect-[3/4]"
            />
          </div>
        </div>

        <div>
          <div className="mb-2">
            {book.isAvailable ? (
              <Badge className="bg-green-500">Available</Badge>
            ) : (
              <Badge variant="secondary">Unavailable</Badge>
            )}
          </div>

          <h1 className="text-3xl font-serif font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-muted-foreground mb-6">by {book.author}</p>

          {book.genre && (
            <div className="mb-4">
              <span className="font-medium">Genre:</span> {book.genre}
            </div>
          )}

          <div className="mb-4">
            <span className="font-medium">Location:</span> {book.location}
          </div>

          <div className="mb-4">
            <span className="font-medium">Listed:</span>{" "}
            {formatDistanceToNow(book.createdAt, { addSuffix: true })}
          </div>

          <div className="mb-6">
            <span className="font-medium">Shared by:</span>{" "}
            {owner ? owner.name : "Unknown user"}
          </div>

          <div className="bg-book-light p-6 rounded-lg mb-6">
            <h2 className="text-lg font-semibold mb-2">Contact Information</h2>
            <p>To exchange, rent, or inquire about this book, contact:</p>
            <div className="mt-2">
              <p>
                <span className="font-medium">Email:</span> {book.contact}
              </p>
              {owner && (
                <p className="mt-1">
                  <span className="font-medium">Phone:</span> {owner.mobile}
                </p>
              )}
            </div>
          </div>

          <div className="flex space-x-4">
            <Button onClick={() => navigate(-1)} variant="outline">
              Back
            </Button>
            <Button
              onClick={() =>
                (window.location.href = `mailto:${book.contact}?subject=Regarding your book: ${book.title}`)
              }
            >
              Contact Owner
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
