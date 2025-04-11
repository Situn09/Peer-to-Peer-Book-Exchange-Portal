import { useEffect, useState } from "react";
import { BookCard } from "@/components/BookCard";
// import { useStore } from "@/lib/store";
import { Input } from "@/components/ui/input";
import { Book } from "@/types";
import { useStore } from "@/lib/store";

const BrowseBooksPage = () => {
  const { books, fetchBooks } = useStore();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationFilter, setLocationFilter] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation =
      locationFilter === "" ||
      book.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesGenre =
      genreFilter === "" ||
      book.genre?.toLowerCase().includes(genreFilter.toLowerCase());
    return book.isAvailable && matchesSearch && matchesLocation && matchesGenre;
  });

  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold mb-4">
          Browse Available Books
        </h1>
        <p className="text-muted-foreground">
          Explore books shared by our community members for exchange or rent.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div>
          <label htmlFor="search" className="text-sm font-medium mb-2 block">
            Search by Title or Author
          </label>
          <Input
            id="search"
            type="search"
            placeholder="Search books..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-medium mb-2 block">
            Filter by Location
          </label>
          <Input
            id="location"
            type="text"
            placeholder="Enter a location..."
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="location" className="text-sm font-medium mb-2 block">
            Filter by Location
          </label>
          <Input
            id="genre"
            type="text"
            placeholder="Enter a Genre..."
            value={genreFilter}
            onChange={(e) => setGenreFilter(e.target.value)}
          />
        </div>
      </div>

      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search filters or check back later for new
            listings.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseBooksPage;
