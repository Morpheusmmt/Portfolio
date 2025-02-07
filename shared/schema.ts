import { z } from "zod";

// Tipos para validação de formulário no frontend
export const messageSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),  // Nome com mínimo de 2 caracteres
  email: z.string().email("Endereço de e-mail inválido"),  // Validação de e-mail
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),  // Mensagem com mínimo de 10 caracteres
});

export type Message = z.infer<typeof messageSchema>;  // Tipo Message baseado no schema

// Schema para projetos
export const projectSchema = z.object({
  title: z.string(),  // Título do projeto
  description: z.string(),  // Descrição do projeto
  image: z.string(),  // URL da imagem do projeto
  github: z.string(),  // URL do repositório no GitHub
  live: z.string(),  // URL da versão ao vivo do projeto
});

export type Project = z.infer<typeof projectSchema>;  // Tipo Project baseado no schema

// Schema para habilidades
export const skillSchema = z.object({
  title: z.string(),  // Título da habilidade
  description: z.string(),  // Descrição da habilidade
  icon: z.string(),  // Ícone da habilidade
});

export type Skill = z.infer<typeof skillSchema>;  // Tipo Skill baseado no schema
