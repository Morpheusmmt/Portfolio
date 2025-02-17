import type { Express } from "express";
import { createServer, type Server } from "http";
import { sendEmail } from "../server/sendEmail"; 
import { db } from "../server/db"; 
import { messageSchema } from "../shared/schema"; 

export function registerRoutes(app: Express): Server {
  const httpServer = createServer(app);
  
  app.post("/api/send-email", async (req, res) => {
    try {
      // Valida os dados recebidos
      const message = messageSchema.parse(req.body);

      // Salva os dados no banco de dados
      await db.insert("messages").values(message); 
      // Envia o e-mail
      await sendEmail(message);

      res.status(200).json({ message: "E-mail enviado com sucesso" });
    } catch (error) {
      console.error("Erro ao enviar e-mail:", error);
      res.status(500).json({ error: "Erro ao processar sua solicitação" });
    }
  });

  return httpServer;
}
