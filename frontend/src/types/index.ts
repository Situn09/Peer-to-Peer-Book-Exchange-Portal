export type UserRole = "owner" | "seeker";

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  mobile: string;
  role: UserRole;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  genre?: string;
  location: string;
  contact: string;
  ownerId: string;
  isAvailable: boolean;
  imageUrl?: string;
  createdAt: number;
}

export interface AppState {
  users: User[];
  currentUser: User | null;
  books: Book[];
}
