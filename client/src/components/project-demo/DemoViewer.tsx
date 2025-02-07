import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ExternalLink } from "lucide-react";

interface Project {
  title: string;
  demoUrl: string;
}

interface DemoViewerProps {
  project: Project;
}

export default function DemoViewer({ project }: DemoViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        size="sm"
        className="flex items-center gap-2"
        onClick={() => setIsOpen(true)}
      >
        <ExternalLink size={16} />
        Live Demo
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl h-[80vh]">
          <DialogHeader>
            <DialogTitle>{project.title} - Live Demo</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full h-full min-h-[60vh]">
            <iframe
              src={project.demoUrl}
              className="w-full h-full border-0 rounded-md"
              title={`${project.title} demo`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
