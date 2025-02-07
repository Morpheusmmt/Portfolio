import { SiGithub, SiLinkedin } from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-background py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground mb-4 md:mb-0">
            © {new Date().getFullYear()} Maida Martins dos Santos. Todos os direitos reservados.
          </p>
          <div className="flex space-x-6">
            <a
              href="https://github.com/Morpheusmmt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <SiGithub size={24} />
            </a>
            <a
              hrefhttps="//www.linkedin.com/in/maida-martins23"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <SiLinkedin size={24} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
