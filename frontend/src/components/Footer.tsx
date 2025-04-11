
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-white border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-serif text-xl font-bold mb-4">BookSwap</h3>
            <p className="text-muted-foreground">
              Connecting book lovers through a peer-to-peer book exchange platform.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-book-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/browse" className="text-muted-foreground hover:text-book-primary transition-colors">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-muted-foreground hover:text-book-primary transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-muted-foreground hover:text-book-primary transition-colors">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-serif text-lg font-bold mb-4">Contact</h4>
            <p className="text-muted-foreground mb-2">
              Have questions or feedback? Reach out to us.
            </p>
            <a
              href="mailto:info@bookswap.com"
              className="text-book-primary hover:underline"
            >
              info@bookswap.com
            </a>
          </div>
        </div>
        <div className="border-t border-border mt-8 pt-4 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} BookSwap. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
