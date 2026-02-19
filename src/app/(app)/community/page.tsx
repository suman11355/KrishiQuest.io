
import { CommunityFeed } from "@/components/krishi-quest/community-feed";
import { CommunityLeaderboard } from "@/components/krishi-quest/community-leaderboard";
import { CreatePost } from "@/components/krishi-quest/create-post";

export default function CommunityPage() {
  return (
    <>
      <div className="text-center p-4">
        <h1 className="font-headline text-4xl font-bold text-primary mb-2">Community Hub</h1>
        <p className="text-lg text-muted-foreground mb-8">Connect with fellow farmers, share your progress, and ask questions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <CreatePost />
          <CommunityFeed />
        </div>
        <div className="lg:col-span-1">
          <CommunityLeaderboard />
        </div>
      </div>
    </>
  );
}
