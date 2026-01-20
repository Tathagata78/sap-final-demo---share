"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"; 
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export function FeedbackForm() {
  const [open, setOpen] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const resetForm = () => {
    setFeedback("");
    setError(null);
    setSubmitting(false);
    setSubmitted(false);
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ feedback }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error submitting feedback");
      }

      console.log("Feedback submitted:", feedback);
      setSubmitted(true);
      setFeedback("");
      setOpen(false);
    } catch (err) {
      console.error("Error submitting feedback:", err);
      setError("Error submitting feedback");
    } finally {
      setSubmitting(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={() => {
          resetForm();
          setOpen(true);
        }}
        size={"sm"}
        className="text-xs"
      >
        Feedback
      </Button>

      <Dialog
        open={open}
        onOpenChange={(o) => {
          if (!o) resetForm();
          setOpen(o);
        }}
      >
        <DialogContent className="sm:max-w-[425px] bg-accent">
          <DialogHeader>
            <DialogTitle className="text-sm font-semibold text-slate-900 dark:text-neutral-100">
              Provide Your Feedback
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-500 dark:text-neutral-400">
              We appreciate your feedback! Please let us know your thoughts.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-2">
            <div className="grid items-center gap-4">
              <Textarea
                id="feedback"
                placeholder="Enter your feedback here..."
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="resize-none min-h-[100px] text-xs placeholder:text-xs 
                  border-slate-200 focus-visible:ring-slate-400 
                  dark:bg-neutral-950 dark:border-neutral-800 dark:text-neutral-200 dark:placeholder:text-neutral-500 dark:focus-visible:ring-neutral-700"
              />
            </div>
            {error && <p className="text-red-500 text-xs italic">{error}</p>}
          </div>

          <DialogFooter className="flex-row justify-end space-x-2">
            <Button
              variant="outline"
              onClick={handleCancel}
              className="h-8 text-xs border-slate-200 text-slate-700 hover:bg-slate-100 
                dark:border-neutral-800 dark:text-neutral-300 dark:hover:bg-neutral-700 dark:hover:text-white"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={submitting}
              className="h-8 text-xs bg-slate-900 text-white hover:bg-slate-800 
                dark:bg-neutral-100 dark:text-neutral-900 dark:hover:bg-neutral-300"
            >
              {submitting ? "Submitting..." : "Submit"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {submitted && (
        <div className="mt-4 text-xs font-medium text-emerald-600 dark:text-emerald-400">
          Thank you for your feedback!
        </div>
      )}
    </>
  );
}
