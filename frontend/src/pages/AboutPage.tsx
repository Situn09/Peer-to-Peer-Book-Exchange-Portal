
const AboutPage = () => {
  return (
    <div className="container mx-auto px-4 py-10">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-serif font-bold mb-6">About BookSwap</h1>
        
        <div className="prose prose-lg max-w-none">
          <p className="text-lg text-muted-foreground mb-6">
            BookSwap is a community-driven platform that connects book lovers who want to share, 
            exchange, or rent books directly with each other. Our mission is to promote reading, 
            reduce waste, and build connections through shared literary experiences.
          </p>
          
          <h2 className="text-2xl font-serif font-medium mt-8 mb-4">Our Mission</h2>
          <p className="mb-6">
            We believe that books are meant to be shared and stories are meant to be spread. 
            In a world of digital consumption, we aim to revitalize the physical book experience 
            by creating a sustainable ecosystem of book sharing. Our platform not only helps reduce 
            waste but also builds a community around the love of reading.
          </p>
          
          <h2 className="text-2xl font-serif font-medium mt-8 mb-4">How It Works</h2>
          <p className="mb-4">
            BookSwap connects two types of users:
          </p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">
              <strong>Book Owners</strong> - People who have books they want to share, exchange, 
              or rent out to others.
            </li>
            <li className="mb-2">
              <strong>Book Seekers</strong> - People looking for specific books or browsing 
              for interesting reads.
            </li>
          </ul>
          <p className="mb-6">
            Users create an account, specify their role, and can then either list books or browse 
            available listings. When a match is found, users connect directly to arrange the exchange 
            or rental.
          </p>
          
          <h2 className="text-2xl font-serif font-medium mt-8 mb-4">Community Guidelines</h2>
          <p className="mb-3">To ensure a positive experience for everyone, we ask all users to:</p>
          <ul className="list-disc pl-6 mb-6">
            <li className="mb-2">Provide accurate information about books and their condition</li>
            <li className="mb-2">Respond to inquiries in a timely manner</li>
            <li className="mb-2">Be respectful in all communications</li>
            <li className="mb-2">Honor arrangements made with other users</li>
            <li className="mb-2">Update book availability status promptly</li>
          </ul>
          
          <h2 className="text-2xl font-serif font-medium mt-8 mb-4">Contact Us</h2>
          <p className="mb-6">
            Have questions, suggestions, or feedback? We'd love to hear from you! 
            Reach out to us at <a href="mailto:info@bookswap.com" className="text-book-primary hover:underline">info@bookswap.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
