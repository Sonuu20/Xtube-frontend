"use client";

import { useState } from "react";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import {
  Heart,
  MoreHorizontal,
  Trash,
  Edit,
  MessageCircle,
  Share2,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { EditTweetDialog } from "./Edit-tweets-dialog";

export function TweetCard({ tweet, onLikeToggle, onDelete, onUpdate }) {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const { id, author, content, timestamp, likeCount, likedByCurrentUser } =
    tweet;

  // Check if the current user is the author (for demo purposes)
  const isAuthor = author.id === "current-user"; // In a real app, compare with actual user ID

  // Format the timestamp
  const formattedTime = formatDistanceToNow(new Date(timestamp), {
    addSuffix: true,
  });

  // Get initials for avatar fallback
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-4 pb-0 flex flex-row items-start space-x-0">
        <Link href={`/user/${author.id}`} className="mr-3">
          <Avatar className="h-10 w-10 border">
            <AvatarImage src={author.avatar} alt={author.username} />
            <AvatarFallback>{getInitials(author.name)}</AvatarFallback>
          </Avatar>
        </Link>
        <div className="flex-1 space-y-1">
          <div className="flex items-center justify-between">
            <div>
              <Link
                href={`/user/${author.id}`}
                className="font-semibold hover:underline"
              >
                {author.name}
              </Link>
              <span className="text-muted-foreground text-sm ml-2">
                @{author.username}
              </span>
            </div>
            {isAuthor && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => onDelete(id)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
          <p className="text-sm text-muted-foreground">{formattedTime}</p>
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <p className="whitespace-pre-wrap">{content}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <div className="flex space-x-4">
          <Button
            variant="ghost"
            size="sm"
            className={`flex items-center space-x-1 ${
              likedByCurrentUser ? "text-primary" : ""
            }`}
            onClick={() => onLikeToggle(id)}
          >
            <Heart
              className={`h-4 w-4 ${likedByCurrentUser ? "fill-primary" : ""}`}
            />
            <span>{likeCount}</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Reply</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            className="flex items-center space-x-1"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </Button>
        </div>
      </CardFooter>

      <EditTweetDialog
        tweet={tweet}
        isOpen={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        onUpdate={(content) => {
          onUpdate(id, content);
          setIsEditDialogOpen(false);
        }}
      />
    </Card>
  );
}
