import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";

interface DemoViewerProps {
  project: {
    title: string;
    demoUrl?: string;
    description: string;
  };
}

export default function DemoViewer({ project }: DemoViewerProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2"
        variant="secondary"
      >
        <Play className="h-4 w-4" />
        Live Demo
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="max-w-4xl w-full h-[80vh]">
          <DialogHeader>
            <DialogTitle>{project.title} - Live Demo</DialogTitle>
          </DialogHeader>
          <div className="flex-1 w-full h-full min-h-[60vh] bg-card rounded-md overflow-hidden">
            {project.demoUrl ? (
              <iframe
                src={project.demoUrl}
                className="w-full h-full border-0"
                title={`${project.title} demo`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                Demo not available
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
