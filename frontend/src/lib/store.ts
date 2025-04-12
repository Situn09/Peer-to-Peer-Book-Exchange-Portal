import { create } from "zustand";
import { AppState, Book, User } from "@/types";

export const BACKEND_URL =
  "https://peer-to-peer-book-exchange-portal.onrender.com";

export const useStore = create<
  AppState & {
    fetchUsers: () => Promise<void>;
    fetchBooks: () => Promise<void>;
    login: (email: string, password: string) => Promise<User | null>;
    logout: () => void;
    register: (user: Omit<User, "id">) => Promise<User>;
    addBook: (
      book: Omit<Book, "id" | "ownerId" | "createdAt" | "isAvailable">
    ) => Promise<Book>;
    toggleBookAvailability: (bookId: string) => Promise<void>;
    deleteBook: (bookId: string) => Promise<void>;
  }
>()((set, get) => ({
  users: [],
  books: [],
  currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,

  fetchUsers: async () => {
    const res = await fetch(`${BACKEND_URL}/api/users`);
    const users = await res.json();
    set({ users });
  },

  fetchBooks: async () => {
    const res = await fetch(`${BACKEND_URL}/api/books`);
    const books = await res.json();
    set({ books });
  },

  login: async (email, password) => {
    const res = await fetch(`${BACKEND_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const resp = await res.json();
    //   set({ books });
    // const { users } = get();
    // const user = users.find(
    //   (user) => user.email === email && user.password === password
    // );
    if (resp) {
      set({ currentUser: resp.user });
      localStorage.setItem("currentUser", JSON.stringify(resp.user));
      return resp.user;
    }
    return null;
  },

  logout: () => {
    set({ currentUser: null });
  },

  register: async (userData) => {
    const newUser = {
      ...userData,
      id: Math.random().toString(36).substring(2, 9),
    };
    await fetch(`${BACKEND_URL}/api/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newUser),
    });

    // Optionally refresh users
    get().fetchUsers();

    set({ currentUser: newUser });
    return newUser;
  },

  addBook: async (bookData) => {
    const currentUser = get().currentUser;
    if (!currentUser) throw new Error("User not authenticated");

    const sampleBookCovers = [
      "https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=387&auto=format&fit=crop",
    ];

    const newBook = {
      ...bookData,
      id: Math.random().toString(36).substring(2, 9),
      ownerId: currentUser.id,
      isAvailable: true,
      imageUrl:
        bookData.imageUrl ||
        sampleBookCovers[Math.floor(Math.random() * sampleBookCovers.length)],
      createdAt: Date.now(),
    };

    await fetch(`${BACKEND_URL}/api/books`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBook),
    });

    get().fetchBooks();
    return newBook;
  },

  toggleBookAvailability: async (bookId) => {
    const { books } = get();
    const book = books.find((b) => b.id === bookId);
    if (!book) return;

    const updatedBook = { ...book, isAvailable: !book.isAvailable };

    await fetch(`${BACKEND_URL}/api/books/${bookId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedBook),
    });

    get().fetchBooks();
  },

  deleteBook: async (bookId) => {
    await fetch(`${BACKEND_URL}/api/books/${bookId}`, {
      method: "DELETE",
    });

    get().fetchBooks();
  },
}));
