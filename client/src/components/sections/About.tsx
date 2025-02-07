import { motion } from "framer-motion"; // Biblioteca para animações
import { Card, CardContent } from "@/components/ui/card"; // Componentes de UI
import { Code2, Database, Palette, Server, TrendingUp } from "lucide-react"; // Ícones

// Lista de habilidades com ícones, títulos e descrições
const skills = [
  {
    icon: <Code2 className="h-8 w-8 text-primary" />,
    title: "Desenvolvimento Web",
    description: "Criação de aplicações responsivas e interativas com React, TypeScript e Next.js.",
  },
  {
    icon: <Server className="h-8 w-8 text-primary" />,
    title: "Backend",
    description: "Desenvolvimento de APIs e lógica de negócios utilizando Node.js e Express.",
  },
  {
    icon: <Database className="h-8 w-8 text-primary" />,
    title: "Banco de Dados",
    description: "Gerenciamento de dados com MongoDB, Firebase e modelagem eficiente para aplicações escaláveis.",
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "UI/UX Design",
    description: "Criação de interfaces modernas e intuitivas com foco em experiência do usuário.",
  },
  {
    icon: <TrendingUp className="h-8 w-8 text-primary" />,
    title: "Otimização e Performance",
    description: "Melhoria no desempenho de aplicações, garantindo carregamento rápido e experiência fluida.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        {/* Animação de entrada para o título e descrição */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Sobre Mim</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sou uma desenvolvedora apaixonada por tecnologia, sempre buscando criar soluções eficientes e inovadoras. 
            Tenho experiência no desenvolvimento de aplicações modernas, do frontend ao backend, garantindo performance e uma ótima experiência de usuário.
          </p>
        </motion.div>

        {/* Grid responsivo para exibir as habilidades */}
        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }} // Delay para animação escalonada
            >
              {/* Card para cada habilidade */}
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <div className="mb-4 flex justify-center">{skill.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{skill.title}</h3>
                  <p className="text-muted-foreground">{skill.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
