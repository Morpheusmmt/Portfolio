import emailjs from "@emailjs/browser";
import { messageSchema } from "../shared/schema";

export async function sendEmail(data: unknown) {
  const message = messageSchema.parse(data); 

  try {
    const response = await emailjs.send(
      'service_mv0vzea',   
      'template_77ktgvl',  
      {
        from_name: message.name,              
        from_email: message.email,            
        message: message.message              
      },
      'mkHC_yRfAtZiCGgXE'  
    );

    console.log("Email enviado com sucesso", response);
  } catch (error) {
    console.error("Erro ao enviar e-mail:", error?.response?.text || error);
  }
}
