"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { addMockTweet } from "@/lib/data";

const MAX_TWEET_LENGTH = 280;

export function TweetForm() {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const remainingChars = MAX_TWEET_LENGTH - content.length;
  const isOverLimit = remainingChars < 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() || isOverLimit || isSubmitting) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Add the tweet to our mock data
    addMockTweet(content);

    // Reset form
    setContent("");
    setIsSubmitting(false);

    // Refresh the page to show the new tweet
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="border rounded-lg p-4 bg-card">
      <div className="flex gap-3">
        <Avatar className="h-10 w-10 border">
          <AvatarImage
            src="/placeholder.svg?height=40&width=40"
            alt="Your avatar"
          />
          <AvatarFallback>YA</AvatarFallback>
        </Avatar>
        <div className="flex-1 space-y-3">
          <Textarea
            placeholder="What's happening?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[100px] resize-none border-none focus-visible:ring-0 p-0 shadow-none"
          />
          <div className="flex items-center justify-between">
            <div
              className={`text-sm ${
                remainingChars <= 20 && remainingChars > 0
                  ? "text-warning"
                  : isOverLimit
                  ? "text-destructive"
                  : "text-muted-foreground"
              }`}
            >
              {remainingChars} characters remaining
            </div>
            <Button
              type="submit"
              disabled={!content.trim() || isOverLimit || isSubmitting}
              className="gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Posting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" />
                  Tweet
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}
