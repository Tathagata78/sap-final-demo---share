"use client";

import { useEffect, useState } from "react";
import { CloudUpload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/dropzone";

type PreviewFile = {
  file: File;
  preview: string;
};

export function UploadDialog() {
  const [files, setFiles] = useState<File[] | undefined>(undefined);
  const [previews, setPreviews] = useState<PreviewFile[] | undefined>(
    undefined
  );
  const [isOpen, setIsOpen] = useState(false);

  const handleDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
  };

  useEffect(() => {
    if (!files || files.length === 0) {
      setPreviews(undefined);
      return;
    }

    const next = files.map((f) => ({
      file: f,
      preview: URL.createObjectURL(f),
    }));
    setPreviews(next);

    return () => {
      next.forEach((p) => URL.revokeObjectURL(p.preview));
    };
  }, [files]);

  const removeFile = (index: number) => {
    if (!files) return;
    if (previews && previews[index]) {
      try {
        URL.revokeObjectURL(previews[index].preview);
      } catch {
        /* error */
      }
    }

    const nextFiles = files.filter((_, i) => i !== index);
    setFiles(nextFiles.length ? nextFiles : undefined);

    if (previews) {
      const nextPreviews = previews.filter((_, i) => i !== index);
      setPreviews(nextPreviews.length ? nextPreviews : undefined);
    }
  };

  const reset = () => {
    if (previews && previews.length > 0) {
      previews.forEach((p) => {
        try {
          URL.revokeObjectURL(p.preview);
        } catch {
          /* the error handling part */
        }
      });
    }
    setFiles(undefined);
    setPreviews(undefined);
  };

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen]);

  const handleUpload = () => {
    if (!files || files.length === 0) return;
    const formData = new FormData();
    files.forEach((file) => formData.append("files", file));

    console.log(`Uploading ${files.length} files...`, files);
    reset();
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="sm"
          className="inline-flex items-center gap-1"
        >
          <CloudUpload className="h-4 w-4" />
          <span className="text-xs">Upload Files</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="min-w-fit max-h-[92vh] overflow-hidden bg-accent">
        <style jsx>{`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        <DialogHeader>
          <DialogTitle className="text-sm font-medium">
            Upload Files
          </DialogTitle>
          <DialogDescription className="text-xs">
            Drag and drop your files below. Supports images and documents.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-2">
          <Dropzone
            onDrop={handleDrop}
            src={files}
            maxFiles={5}
            maxSize={1024 * 1024 * 10}
            className={
              "w-full h-40 rounded-lg overflow-hidden px-6 flex flex-col justify-center items-center " +
              "bg-white border border-slate-200 dark:border-neutral-800"
            }
          >
            <DropzoneEmptyState className="text-center space-y-2">
              <div className="flex flex-col items-center gap-2">
                <div className="rounded-full p-2 bg-slate-50 dark:bg-accent border border-slate-100 dark:border-neutral-600">
                  <CloudUpload className="h-5 w-5 text-slate-600 dark:text-slate-200" />
                </div>
                <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
                  Drop files here or click to browse
                </p>
                <p className="text-xs text-muted-foreground">
                  Up to 5 files • Max 10 MB each
                </p>
              </div>
            </DropzoneEmptyState>

            <DropzoneContent className="text-center space-y-2 max-w-full" />
          </Dropzone>

          {previews && previews.length > 0 && (
            <div className="max-h-40 overflow-y-auto space-y-2 pr-2 hide-scrollbar">
              {previews.map((p, i) => (
                <div
                  key={p.preview}
                  className="flex items-center justify-between gap-3 bg-slate-50 dark:bg-slate-900 rounded-md p-2 border border-slate-100 dark:border-slate-700"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {p.file.type.startsWith("image/") ? (
                      <img
                        src={p.preview}
                        alt={p.file.name}
                        className="h-10 w-10 rounded-md object-cover border border-slate-200 dark:border-slate-700"
                      />
                    ) : (
                      <div className="h-10 w-10 rounded-md flex items-center justify-center bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-100 font-medium text-xs">
                        {p.file.name.split(".").pop()?.slice(0, 3) ?? "FILE"}
                      </div>
                    )}

                    <div className="min-w-0">
                      <div className="text-sm font-medium text-slate-800 dark:text-slate-100 truncate">
                        {p.file.name}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {(p.file.size / 1024 / 1024).toFixed(2)} MB
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs px-2 py-1 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200">
                      {p.file.type.split("/")[0] || "file"}
                    </span>
                    <button
                      onClick={() => removeFile(i)}
                      className="p-1 rounded-md text-slate-600 dark:text-slate-300"
                      aria-label="Remove file"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <DialogFooter className="flex-col sm:justify-between items-center w-full gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={reset}
            disabled={!files || files.length === 0}
            className="w-full sm:w-auto text-xs disabled:opacity-60 disabled:cursor-not-allowed"
          >
            Reset
          </Button>
          <Button
            onClick={handleUpload}
            size="sm"
            disabled={!files || files.length === 0}
            className="w-full sm:w-auto text-xs disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {files && files.length > 0
              ? `Upload ${files.length} file${files.length > 1 ? "s" : ""}`
              : "Upload"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
