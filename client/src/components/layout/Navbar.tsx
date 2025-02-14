import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "../../components/ui/button";

// Itens do menu de navegação
const navItems = [
  { href: "#about", label: "Sobre" },
  { href: "#projects", label: "Projetos" },
  { href: "#contacts", label: "Contato" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false); // Estado do menu mobile
  const [isScrolled, setIsScrolled] = useState(false); // Estado para verificar rolagem da página

  // Efeito para monitorar a rolagem e alterar o estilo do navbar
  useEffect(() => {
    const handleScroll = () => {
      requestAnimationFrame(() => {
        setIsScrolled(window.scrollY > 50);
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Impede a rolagem do fundo quando o menu mobile está aberto
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Nome do portfólio que leva à página inicial */}
          <Link href="/">
            <span className="text-2xl font-bold text-primary cursor-pointer">Portfolio</span>
          </Link>

          {/* Menu para telas grandes */}
          <div className="hidden md:flex space-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-foreground hover:text-primary transition-colors"
                tabIndex={0}
              >
                {item.label}
              </a>
            ))}
            {/* Botão do currículo */}
            <Button asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-background">
              <a href="https://drive.google.com/file/d/1OE6UAee8JacqDB74mqRjpSO1ifC-kGyX/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">Currículo</a>
            </Button>
          </div>

          {/* Botão do menu mobile */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu para dispositivos móveis */}
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden pb-4"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="block py-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setIsOpen(false)}
                tabIndex={0}
              >
                {item.label}
              </a>
            ))}
            {/* Botão do currículo para mobile */}
            <Button asChild variant="outline" className="w-full mt-2 border-primary text-primary hover:bg-primary hover:text-background">
              <a href="https://drive.google.com/file/d/1OE6UAee8JacqDB74mqRjpSO1ifC-kGyX/view?usp=drivesdk" target="_blank" rel="noopener noreferrer">Currículo</a>
            </Button>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
}