export interface GalleryItem {
  id: string;
  title: string;
  category: "Symposium" | "Hackathon" | "Ceremony" | "Gaming";
  imageUrl: string;
  aspect: "aspect-square" | "aspect-[4/3]" | "aspect-[3/4]" | "aspect-[16/9]";
}

export const GALLERY_DATA: GalleryItem[] = [
  {
    id: "g-1",
    title: "Neural Arena Hackathon Moments",
    category: "Hackathon",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-[4/3]"
  },
  {
    id: "g-2",
    title: "Inaugural Brainwave Unveiling",
    category: "Ceremony",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-square"
  },
  {
    id: "g-3",
    title: "Cyber Grid eSports Showdown",
    category: "Gaming",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-[3/4]"
  },
  {
    id: "g-4",
    title: "Keynote Address: Neuralink Futures",
    category: "Symposium",
    imageUrl: "https://images.unsplash.com/photo-1475721027785-f74eccf877e2?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-[16/9]"
  },
  {
    id: "g-5",
    title: "CodeMatrix Finalist Sprint",
    category: "Hackathon",
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-square"
  },
  {
    id: "g-6",
    title: "Grand Prize Winners Celebration",
    category: "Ceremony",
    imageUrl: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?q=80&w=800&auto=format&fit=crop",
    aspect: "aspect-[4/3]"
  }
];
