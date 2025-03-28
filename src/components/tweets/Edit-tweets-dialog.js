"use client";

import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

const MAX_TWEET_LENGTH = 280;

export function EditTweetDialog({ tweet, isOpen, onClose, onUpdate }) {
  const [content, setContent] = useState(tweet.content);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Reset content when dialog opens with a new tweet
  useEffect(() => {
    if (isOpen) {
      setContent(tweet.content);
    }
  }, [isOpen, tweet.content]);

  const remainingChars = MAX_TWEET_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() || isOverLimit || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    onUpdate(content);
    setIsSubmitting(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Tweet</DialogTitle>
            <DialogDescription>
              Make changes to your tweet. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[100px] resize-none"
              placeholder="What's happening?"
              autoFocus
            />
            <div
              className={`mt-2 text-sm ${
                remainingChars <= 20 && remainingChars > 0
                  ? "text-warning"
                  : isOverLimit
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {remainingChars} characters remaining
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={
                !content.trim() ||
                content === tweet.content ||
                isOverLimit ||
                isSubmitting
              }
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
