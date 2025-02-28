import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "Mega-Sena",
    description: "Aplicação web simples que simula o sorteio da Mega-Sena, permitindo ao usuário gerar números aleatórios para apostas. Desenvolvida com HTML, CSS e JavaScript.",
    image: "https://images.pexels.com/photos/4249023/pexels-photo-4249023.jpeg?",
    github: "https://github.com/Morpheusmmt/Mega-Sena-",
    live: "https://morpheusmmt.github.io/Mega-Sena-/"
  },
  {
    title: "Previsão Meteorológica",
    description: "Consome dados de API externa para exibir temperatura, umidade e condições climáticas em tempo real. Construído com HTML, CSS e JavaScript.",
    image: "https://images.pexels.com/photos/29780143/pexels-photo-29780143.jpeg",
    github: "https://github.com/Morpheusmmt/clima",
    live: "https://morpheusmmt.github.io/clima/"
  },
  {
    title: "Calculadora IMC",
    description: "Este projeto é uma aplicação web que calcula o Índice de Massa Corporal (IMC), utilizando manipulação do DOM e validação de dados com JavaScript. A aplicação possui um design responsivo, demonstrando habilidades em front-end.",
    image: "https://images.pexels.com/photos/15319043/pexels-photo-15319043/free-photo-of-cuidados-de-saude-assistencia-medica-nutricionista-dietista.jpeg",
    github: "https://github.com/Morpheusmmt/calc-IMC",
    live: "https://morpheusmmt.github.io/calc-IMC/"
  },
  {
    title: "Pomodoro Timer",
    description: "Este aplicativo Pomodoro foi desenvolvido com React, TypeScript e Vite. Ele permite personalizar o tempo de trabalho, intervalos e ciclos, utilizando a técnica Pomodoro.",
    image: "https://images.pexels.com/photos/1179490/pexels-photo-1179490.jpeg",
    github: "https://github.com/Morpheusmmt/pomodoro",
    live: "https://pomodoro-one-mu.vercel.app/"
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Meus Projetos</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Veja alguns dos meus projetos que mostram minhas habilidades e experiência.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">{project.description}</p>
                  <div className="flex gap-4">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github size={16} />
                        Código
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex items-center gap-2"
                      asChild
                    >
                      <a href={project.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink size={16} />
                        Visualização do projeto
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
