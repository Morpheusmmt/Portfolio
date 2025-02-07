import { z } from "zod";

// Frontend types for form validation
export const messageSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

export type Message = z.infer<typeof messageSchema>;

export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  github: z.string(),
  live: z.string(),
});

export type Project = z.infer<typeof projectSchema>;

export const skillSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type Skill = z.infer<typeof skillSchema>;