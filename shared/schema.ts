import { z } from "zod";

// Tipos para validação de formulário no frontend
export const messageSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de e-mail inválido"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

export type Message = z.infer<typeof messageSchema>;

// Schema para projetos
export const projectSchema = z.object({
  title: z.string(),
  description: z.string(),
  image: z.string(),
  github: z.string(),
  live: z.string(),
});

export type Project = z.infer<typeof projectSchema>; //

// Schema para habilidades
export const skillSchema = z.object({
  title: z.string(),
  description: z.string(),
  icon: z.string(),
});

export type Skill = z.infer<typeof skillSchema>; // Tipo Skill baseado no schema
