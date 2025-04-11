
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { AppState, Book, User } from '@/types';

// Sample book covers
const sampleBookCovers = [
  'https://images.unsplash.com/photo-1541963463532-d68292c34b19?q=80&w=388&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=387&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=387&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=387&auto=format&fit=crop',
];

// Sample books for initial state
const sampleBooks: Book[] = [
  {
    id: '1',
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    location: 'New York',
    contact: 'john@example.com',
    ownerId: '1',
    isAvailable: true,
    imageUrl: sampleBookCovers[0],
    createdAt: Date.now() - 10000000,
  },
  {
    id: '2',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian',
    location: 'Los Angeles',
    contact: 'jane@example.com',
    ownerId: '1',
    isAvailable: true,
    imageUrl: sampleBookCovers[1],
    createdAt: Date.now() - 20000000,
  },
  {
    id: '3',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    location: 'Chicago',
    contact: 'john@example.com',
    ownerId: '1',
    isAvailable: true,
    imageUrl: sampleBookCovers[2],
    createdAt: Date.now() - 30000000,
  },
];

// Sample users for initial state
const sampleUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    password: 'password123',
    mobile: '123-456-7890',
    role: 'owner',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    password: 'password123',
    mobile: '098-765-4321',
    role: 'seeker',
  },
];

export const useStore = create<AppState & {
  login: (email: string, password: string) => User | null;
  logout: () => void;
  register: (user: Omit<User, 'id'>) => User;
  addBook: (book: Omit<Book, 'id' | 'ownerId' | 'createdAt' | 'isAvailable' | 'imageUrl'>) => Book;
  toggleBookAvailability: (bookId: string) => void;
  deleteBook: (bookId: string) => void;
}>()(
  persist(
    (set, get) => ({
      users: sampleUsers,
      books: sampleBooks,
      currentUser: null,
      
      login: (email, password) => {
        const user = get().users.find(
          (user) => user.email === email && user.password === password
        );
        
        if (user) {
          set({ currentUser: user });
          return user;
        }
        
        return null;
      },
      
      logout: () => {
        set({ currentUser: null });
      },
      
      register: (userData) => {
        const newUser = {
          ...userData,
          id: Math.random().toString(36).substring(2, 9),
        };
        
        set((state) => ({
          users: [...state.users, newUser],
          currentUser: newUser,
        }));
        
        return newUser;
      },
      
      addBook: (bookData) => {
        const currentUser = get().currentUser;
        if (!currentUser) throw new Error('User not authenticated');
        
        const randomIndex = Math.floor(Math.random() * sampleBookCovers.length);
        
        const newBook = {
          ...bookData,
          id: Math.random().toString(36).substring(2, 9),
          ownerId: currentUser.id,
          isAvailable: true,
          imageUrl: sampleBookCovers[randomIndex],
          createdAt: Date.now(),
        };
        
        set((state) => ({
          books: [...state.books, newBook],
        }));
        
        return newBook;
      },
      
      toggleBookAvailability: (bookId) => {
        set((state) => ({
          books: state.books.map((book) =>
            book.id === bookId 
              ? { ...book, isAvailable: !book.isAvailable } 
              : book
          ),
        }));
      },
      
      deleteBook: (bookId) => {
        set((state) => ({
          books: state.books.filter((book) => book.id !== bookId),
        }));
      },
    }),
    {
      name: 'book-exchange-storage',
    }
  )
);
