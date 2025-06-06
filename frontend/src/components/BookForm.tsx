import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { BACKEND_URL, useStore } from "@/lib/store";
import { useState } from "react";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  author: z.string().min(2, {
    message: "Author must be at least 2 characters.",
  }),
  genre: z.string().optional(),
  location: z.string().min(2, {
    message: "Location is required.",
  }),
  imageUrl: z.string().optional(),
  contact: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

export function BookForm() {
  const { addBook, currentUser } = useStore();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      genre: "",
      location: "",
      imageUrl: "",
      contact: currentUser?.email || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      let uploadedImageUrl = "";

      // Upload image first
      if (image) {
        const formData = new FormData();
        formData.append("image", image);

        const res = await fetch(`${BACKEND_URL}/api/books/upload`, {
          method: "POST",
          body: formData,
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        uploadedImageUrl = data.imageUrl;
      }

      addBook({
        title: values.title!,
        author: values.author!,
        genre: values.genre,
        location: values.location!,
        contact: values.contact!,
        imageUrl: uploadedImageUrl,
      });
      toast({
        title: "Book added successfully",
        description: "Your book has been listed for exchange.",
      });
      navigate("/dashboard");
    } catch (error) {
      toast({
        title: "Error adding book",
        description: "Please try again later.",
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-0">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Book Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter book title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="author"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Author</FormLabel>
              <FormControl>
                <Input placeholder="Enter author name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="genre"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Genre (Optional)</FormLabel>
              <FormControl>
                <Input placeholder="Enter genre" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Cover Image (Optional)</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload Cover Image of the book"
                  onChange={handleImageChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="location"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City/Location</FormLabel>
              <FormControl>
                <Input placeholder="Enter your city or location" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="contact"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Contact Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter contact email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          Add Book
        </Button>
      </form>
    </Form>
  );
}
