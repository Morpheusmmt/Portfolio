import emailjs from "emailjs-com";
import { messageSchema } from "../shared/schema";

export async function sendEmail(data: unknown) {
  // Valida os dados usando o schema existente
  const message = messageSchema.parse(data);

  try {
    // Envia o e-mail usando o EmailJS
    const response = await emailjs.send(
      'service_1225xnp',  // Substitua pelo seu ID de serviço
      'template_3xg9ele',  // Substitua pelo seu ID de template
      {
        from_name: message.name,
        from_email: message.email,
        to_name: "1maida.martins@gmail.com",  // Para onde o e-mail será enviado
        message: message.message,
      },
      'mkHC_yRfAtZiCGgXE'  // Substitua pela sua chave pública do EmailJS
    );

    console.log("Email enviado com sucesso", response);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error);
  }
}
