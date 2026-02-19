
'use client';

import { useState } from 'react';
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, ArrowUp, ArrowDown } from "lucide-react";
import { cn } from '@/lib/utils';

export function CommunityPost({ post }: { post: any }) {
    const [upvoted, setUpvoted] = useState(false);
    const [downvoted, setDownvoted] = useState(false);

    const handleUpvote = () => {
        setUpvoted(!upvoted);
        setDownvoted(false);
    };

    const handleDownvote = () => {
        setDownvoted(!downvoted);
        setUpvoted(false);
    };

    const voteCount = post.stats.upvotes - post.stats.downvotes + (upvoted ? 1 : 0) - (downvoted ? 1 : 0);

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow">
      <CardHeader className="p-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 border-2 border-secondary">
            {post.author.avatar}
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{post.author.name}</p>
            <p className="text-xs text-muted-foreground">{post.timestamp}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border">
            <Image
              src={post.image}
              alt="Post image"
              fill
              className="object-cover"
              data-ai-hint={post.imageHint}
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex justify-between items-center p-4 pt-0 border-t">
        <div className="flex items-center gap-4 text-muted-foreground">
            <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                <Heart className="h-5 w-5" /> 
                <span className="text-sm">{post.stats.likes}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                <MessageCircle className="h-5 w-5" />
                <span className="text-sm">{post.stats.comments}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center gap-1.5">
                <Share2 className="h-5 w-5" />
                <span className="text-sm">{post.stats.shares}</span>
            </Button>
        </div>
        <div className="flex items-center gap-2">
            <Button variant={upvoted ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={handleUpvote}>
                <ArrowUp className={cn("h-5 w-5", upvoted && "text-primary")} />
            </Button>
            <span className="font-bold text-lg min-w-[2rem] text-center">{voteCount}</span>
             <Button variant={downvoted ? "secondary" : "ghost"} size="icon" className="h-8 w-8" onClick={handleDownvote}>
                <ArrowDown className={cn("h-5 w-5", downvoted && "text-destructive")} />
            </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
