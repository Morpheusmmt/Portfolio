import { motion } from "framer-motion";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../../components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { Textarea } from "../../components/ui/textarea";
import { useToast } from "../../hooks/use-toast";
import { Github, Linkedin, Mail, Phone, MessageSquare } from "lucide-react";
import { Card, CardContent } from "../../components/ui/card";
import { sendEmail } from "../../../../server/sendEmail";

// Esquema de validação do formulário usando zod
const formSchema = z.object({
  name: z.string().min(2, "O nome deve ter pelo menos 2 caracteres"),
  email: z.string().email("Endereço de email inválido"),
  message: z.string().min(10, "A mensagem deve ter pelo menos 10 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

// Métodos de contato com ícones e informações
const contactMethods = [
  {
    icon: <Github className="h-6 w-6" />,
    label: "GitHub",
    href: "https://github.com/Morpheusmmt",
    username: "@morpheusmmt",
  },
  {
    icon: <Linkedin className="h-6 w-6" />,
    label: "LinkedIn",
    href: "//www.linkedin.com/in/maida-martins23",
    username: "Maida Martins",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    label: "Email",
    href: "mailto:1maida.martins@gmail.com",
    username: "1maida.martins@gmail.com",
  },
  {
    icon: <Phone className="h-6 w-6" />,
    label: "Telefone",
    href: "tel:+55 85 98960-9615",
    username: "+55 (85) 98960-9615",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    label: "WhatsApp",
    href: "https://w.app/maidamartins",
    username: "+55 85981896407",
  },
];

export default function Contato() {
  const { toast } = useToast();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(data: FormValues) {
    try {
      // Simulando um atraso para melhorar a experiência do usuário
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Enviar email utilizando o template ajustado
      await sendEmail({
        to_name: "Maida",
        from_name: data.name,
        from_email: data.email,
        message: data.message,
      });

      toast({
        title: "Mensagem enviada!",
        description: "Obrigado pelo seu contato. Responderemos em breve.",
      });

      form.reset();
    } catch (error: any) {
      toast({
        title: "Erro",
        description: `Falha ao enviar mensagem: ${error.message || "Por favor, tente novamente."}`,
        variant: "destrutivo",
      });
    }
  }

  return (
    <section id="contact" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Entre em Contato</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Tem um projeto em mente ou só quer dizer oi? Fique à vontade para entrar em contato por qualquer um desses canais!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-12">
          {contactMethods.map((method) => (
            <motion.div
              key={method.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <a
                href={method.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="mb-4 flex justify-center text-primary">
                      {method.icon}
                    </div>
                    <h3 className="font-semibold mb-2">{method.label}</h3>
                    <p className="text-sm text-muted-foreground">{method.username}</p>
                  </CardContent>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-md mx-auto"
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input placeholder="Seu nome" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="seu.email@exemplo.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mensagem</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Conte-me sobre seu projeto..."
                        className="min-h-[120px]"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                className="w-full bg-primary hover:bg-primary/90"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? "Enviando..." : "Enviar Mensagem"}
              </Button>
            </form>
          </Form>
        </motion.div>
      </div>
    </section>
  );
}