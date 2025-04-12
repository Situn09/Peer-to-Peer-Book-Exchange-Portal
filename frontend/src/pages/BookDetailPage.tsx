import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
// import { useStore } from "@/lib/store";
import { formatDistanceToNow } from "date-fns";
import { useStore } from "@/lib/store";
import { Review } from "@/types";
import { useState } from "react";

type ReviewSectionProps = {
  reviews: Review[];
};
const ReviewSection: React.FC<ReviewSectionProps> = ({ reviews }) => {
  return (
    <section className="py-10 ">
      <h2 className="text-3xl font-bold text-center mb-8">Customer Reviews</h2>
      <div className="max-w-2xl mx-auto space-y-6">
        {reviews.map((review) => (
          <div
            key={review.id}
            className="bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow"
          >
            <h3 className="text-xl font-semibold mb-2">{review.name}</h3>
            <p className="text-yellow-500 text-lg mb-1">
              {"⭐".repeat(review.rating)}
            </p>
            <p className="text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

type ReviewDetail = {
  rating: number;
  comment: string;
};

const StarRatingForm: React.FC<{
  onSubmit: (review: ReviewDetail) => void;
}> = ({ onSubmit }) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (rating === 0 || comment.trim() === "") {
      alert("Please provide a rating and comment.");
      return;
    }
    onSubmit({ rating, comment });
    setRating(0);
    setHover(0);
    setComment("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white w-full p-6 rounded-2xl shadow-md max-w-xl  space-y-4"
    >
      <h2 className="text-2xl font-bold mb-2">Write a Review</h2>

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill={(hover || rating) >= star ? "#facc15" : "none"}
              viewBox="0 0 24 24"
              stroke="#facc15"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.532 4.715a1 1 0 00.95.69h4.962c.969 0 1.371 1.24.588 1.81l-4.018 2.92a1 1 0 00-.364 1.118l1.532 4.715c.3.921-.755 1.688-1.538 1.118L12 17.75l-4.018 2.92c-.783.57-1.838-.197-1.538-1.118l1.532-4.715a1 1 0 00-.364-1.118l-4.018-2.92c-.783-.57-.38-1.81.588-1.81h4.962a1 1 0 00.95-.69l1.532-4.715z"
              />
            </svg>
          </button>
        ))}
      </div>

      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring focus:border-blue-400"
        placeholder="Write your review here..."
        rows={4}
      />

      <button
        type="submit"
        className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700 transition"
      >
        Submit Review
      </button>
    </form>
  );
};

const BookDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { books, users, currentUser, addBookReview } = useStore();

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

  const addReview = ({ rating, comment }) => {
    const review_detail = {
      id: Math.floor(Math.random() * 1000), // Random ID for demo purposes
      name: currentUser ? currentUser.name : "Anonymous",
      rating: rating, // Default rating for demo purposes
      comment: comment,
    };
    addBookReview(book.id, review_detail);
  };
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex justify-center">
          <div className="max-w-md h-fit overflow-hidden rounded-lg shadow-lg transition-all hover:shadow-xl">
            <img
              src={
                book.imageUrl ||
                "https://images.unsplash.com/photo-1544947950-fa07a98d237f"
              }
              alt={book.title}
              className="w-full h-fit object-cover aspect-[3/4]"
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

          <div className="space-y-4 mt-10">
            <ReviewSection reviews={book.reviews} />
            <StarRatingForm onSubmit={addReview} />
            {/* <h2 className="text-lg font-semibold mb-2">Write a Review</h2>
            <div>
              <textarea
                about="Write Review on this book "
                className="w-full h-24 p-2 border rounded-md"
                placeholder="Share your thoughts about this book..."
                onChange={(e) => setReview(e.target.value)}
                value={review}
              />
            </div>
            <Button className="mt-2" onClick={addReview}>
              Write your experience
            </Button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailPage;
