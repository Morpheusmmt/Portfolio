import emailjs from "@emailjs/browser";
import { z } from "zod";

// Esquema de validação para a mensagem
const messageSchema = z.object({
  from_name: z.string().min(2, "Nome inválido"),
  from_email: z.string().email("Endereço de email inválido"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

export async function sendEmail(data: unknown) {
  const message = messageSchema.parse(data);

  try {
    const response = await emailjs.send(
      "service_mv0vzea", 
      "template_38m6r1p", 
      {
        from_name: message.from_name,
        from_email: message.from_email,
        message: message.message,
      },
      "mkHC_yRfAtZiCGgXE" 
    );

    console.log("Email enviado com sucesso", response);
  } catch (error: any) {
    console.error("Erro ao enviar e-mail:", error?.text || error);
    throw new Error("Erro ao enviar e-mail");
  }
}
