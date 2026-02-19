
import { CommunityPost } from "./community-post";
import { Avatar1Icon, Avatar2Icon, Avatar3Icon } from "./icons";

const feedData = [
  {
    id: 1,
    author: {
      name: "Suresh P.",
      avatar: <Avatar1Icon />,
    },
    timestamp: "2h ago",
    content: "Just harvested my first batch of tomatoes! 🍅 They are looking great. Thanks to the tips from the AgroQuiz, I was able to avoid the leaf curl virus this time.",
    image: "https://www.livemint.com/lm-img/img/2023/07/19/1600x900/Farm-workers-harvest-tomatoes-in-Karad--Maharashtr_1689697961597_1689746231371.jpg",
    imageHint: "tomato harvest",
    stats: {
      likes: 24,
      comments: 5,
      shares: 2,
      upvotes: 30,
      downvotes: 6,
    },
  },
  {
    id: 2,
    author: {
      name: "Meena K.",
      avatar: <Avatar2Icon />,
    },
    timestamp: "5h ago",
    content: "My wheat farm is thriving after following the AI-generated crop calendar. The reminders for fertilization were spot on! Check out my digital farm progress. #KrishiQuest",
    image: "https://picsum.photos/600/400?random=11",
    imageHint: "wheat farm",
    stats: {
      likes: 45,
      comments: 12,
      shares: 8,
      upvotes: 55,
      downvotes: 10,
    },
  },
  {
    id: 3,
    author: {
      name: "Vikram S.",
      avatar: <Avatar3Icon />,
    },
    timestamp: "1d ago",
    content: "I am having trouble with pests on my corn crop. Any suggestions for organic pesticides? I've already tried a neem oil spray.",
    image: null,
    imageHint: "",
    stats: {
      likes: 15,
      comments: 22,
      shares: 1,
      upvotes: 18,
      downvotes: 3,
    },
  },
];

export function CommunityFeed() {
  return (
    <div className="space-y-6">
      {feedData.map(post => (
        <CommunityPost key={post.id} post={post} />
      ))}
    </div>
  );
}
