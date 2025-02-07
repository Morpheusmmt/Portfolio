import express, { type Express } from "express";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer, createLogger } from "vite";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";

// Criando um logger para o Vite
const viteLogger = createLogger();

// Função para logar mensagens no console
export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

// Função para configurar o Vite no servidor Express
export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,  // Habilita o modo middleware
    hmr: { server }, // Habilita HMR (Hot Module Replacement) para o Vite
    allowedHosts: true,  // Permite hosts específicos
  };

  // Cria e configura o servidor Vite
  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,  // Desabilita o arquivo de configuração do Vite
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);  // Se ocorrer erro, o processo é encerrado
      },
    },
    server: serverOptions,
    appType: "custom",  // Define o tipo de aplicação como customizado
  });

  app.use(vite.middlewares); // Usa middlewares do Vite no Express

  // Manipula requisições para todas as URLs
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        __dirname,
        "..",
        "client",
        "index.html",
      );

      // Sempre recarrega o arquivo index.html do disco para garantir que esteja atualizado
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`, // Adiciona um hash para evitar cache
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);  // Envia a página gerada para o cliente
    } catch (e) {
      vite.ssrFixStacktrace(e as Error); // Corrige stacktrace de erros do SSR
      next(e);  // Passa o erro para o próximo middleware
    }
  });
}

// Função para servir arquivos estáticos
export function serveStatic(app: Express) {
  const distPath = path.resolve(__dirname, "public");

  // Verifica se o diretório de build existe
  if (!fs.existsSync(distPath)) {
    throw new Error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`,
    );
  }

  // Serve arquivos estáticos da pasta 'public'
  app.use(express.static(distPath));

  // Se o arquivo não for encontrado, envia o index.html
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}
