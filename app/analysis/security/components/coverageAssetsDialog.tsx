import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface CoverageAssetsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
}

export function CoverageAssetsDialog({
  open,
  onOpenChange,
  title,
}: CoverageAssetsDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            This is a demo dialog displaying details for{" "}
            <strong>{title}</strong>.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-center py-6 bg-muted/50 rounded-md border border-dashed">
          <span className="text-sm text-muted-foreground">
            Placeholder Data Grid
          </span>
        </div>
        <div className="flex justify-end">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
