
'use client';
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Avatar1Icon } from "./icons";
import { Image as ImageIcon, Send } from "lucide-react";

export function CreatePost() {
  return (
    <Card className="shadow-md">
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          <Avatar className="h-10 w-10 border">
            <Avatar1Icon/>
            <AvatarFallback>R</AvatarFallback>
          </Avatar>
          <div className="w-full space-y-2">
            <Textarea placeholder="What's happening on your farm today?" className="h-24 bg-white text-black"/>
            <div className="flex justify-between items-center">
              <Button variant="outline" size="sm">
                <ImageIcon className="h-4 w-4 mr-2"/>
                Add Photo
              </Button>
              <Button>
                <Send className="h-4 w-4 mr-2"/>
                Post
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
