import { useEffect } from "react";

export default function Page({ 
  title, 
  description,
  image,
  type = "website",
  author = "MEGATREX4",
  keywords = "M4SUB, Minecraft, Server",
  children 
}) {
  useEffect(() => {
    // Basic meta tags
    document.title = title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description || "");
    document.querySelector('meta[name="keywords"]')?.setAttribute("content", keywords);
    document.querySelector('meta[name="author"]')?.setAttribute("content", author);
    
    // Open Graph meta tags
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", description || "");
    document.querySelector('meta[property="og:type"]')?.setAttribute("content", type);
    document.querySelector('meta[property="og:image"]')?.setAttribute("content", image || "/logo192.png");
    
    // Twitter meta tags
    document.querySelector('meta[property="twitter:title"]')?.setAttribute("content", title);
    document.querySelector('meta[property="twitter:description"]')?.setAttribute("content", description || "");
    document.querySelector('meta[property="twitter:image"]')?.setAttribute("content", image || "/logo192.png");

  }, [title, description, image, type, author, keywords]);

  return <>{children}</>;
}