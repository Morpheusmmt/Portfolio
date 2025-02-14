import express from "express";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { messageSchema, projectSchema, skillSchema } from "@shared/schema";

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

export function registerRoutes(app: Express): Server {
  // Endpoint para obter todos os projetos
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  // Endpoint para obter um projeto específico pelo ID
  app.get("/api/projects/:id", async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: "Project not found" }); // Retorna erro 404 se o projeto não for encontrado
    }
    res.json(project);
  });

  // Endpoint para obter todas as habilidades
  app.get("/api/skills", async (_req, res) => {
    const skills = await storage.getSkills();
    res.json(skills);
  });

  // Endpoint para receber mensagens do formulário de contato
  app.post("/api/messages", async (req, res) => {
    try {
      // Valida os dados da mensagem usando o schema
      const messageData = messageSchema.parse(req.body);
      const message = await storage.createMessage(messageData);
      res.status(201).json(message); // Retorna status 201 indicando que a mensagem foi criada com sucesso
    } catch (error) {
      res.status(400).json({ message: "Invalid message data" }); // Retorna erro 400 se os dados forem inválidos
    }
  });

  // Criação do servidor HTTP
  const httpServer = createServer(app);
  return httpServer;
}

async function main() {
  const server = registerRoutes(app);

  if (process.env.NODE_ENV !== "production") {
    await setupVite(app, server);
  }

  server.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on http://0.0.0.0:${port}`);
  });
}

main().catch(console.error);