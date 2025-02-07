import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code2, Palette, Rocket } from "lucide-react";

const skills = [
  {
    icon: <Code2 className="h-8 w-8 text-primary" />,
    title: "Development",
    description: "Expertise in modern web technologies including React, Node.js, and TypeScript",
  },
  {
    icon: <Palette className="h-8 w-8 text-primary" />,
    title: "Design",
    description: "Creating beautiful, intuitive interfaces with attention to detail",
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: "Performance",
    description: "Building fast, scalable applications with optimal user experience",
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">About Me</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            I'm a passionate web developer with a focus on creating beautiful and functional
            digital experiences. With years of experience in the industry, I've developed
            a strong understanding of modern web technologies and best practices.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
            <motion.div
              key={skill.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
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
