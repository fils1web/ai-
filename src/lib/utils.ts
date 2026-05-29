import { v4 as uuidv4 } from "uuid";
import type { Message } from "@/types";

export function createMessage(role: "user" | "assistant", content: string): Message {
  return {
    id: uuidv4(),
    role,
    content,
    timestamp: Date.now(),
  };
}

export function formatTime(timestamp: number): string {
  return new Intl.DateTimeFormat("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(timestamp));
}

export const rwandaImages = [
  "https://images.unsplash.com/photo-1562599810-2a99b2f22fe6?w=1920&q=80",
  "https://images.unsplash.com/photo-1523805009345-7448845a9e53?w=1920&q=80",
  "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&q=80",
  "https://images.unsplash.com/photo-1511497584788-876760111969?w=1920&q=80",
  "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1920&q=80",
  "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=1920&q=80",
  "https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=1920&q=80",
  "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=1920&q=80",
  "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=1920&q=80",
  "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1920&q=80",
];

export function getRandomRwandaImages(count: number = 20): string[] {
  const shuffled = [...rwandaImages].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
