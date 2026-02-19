

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Trophy } from 'lucide-react';
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Avatar1Icon, Avatar2Icon, Avatar3Icon } from "./icons";

const leaderboardData = [
  { rank: 1, name: "Suresh P.", score: 15200, avatar: <Avatar1Icon/> },
  { rank: 2, name: "Meena K.", score: 14800, avatar: <Avatar2Icon/> },
  { rank: 3, name: "Vikram S.", score: 13500, avatar: <Avatar3Icon/> },
  { rank: 12, name: "You", score: 8450, avatar: null, isUser: true },
  { rank: 13, name: "Anita D.", score: 8200, avatar: <Avatar2Icon/> },
];

export function CommunityLeaderboard() {
  return (
    <div className="p-4 rounded-lg" style={{ backgroundColor: '#023047' }}>
        <div className="flex items-center gap-2 font-headline text-xl mb-2 text-white">
          <Trophy className="text-amber-400" />
          Community Leaderboard
        </div>
        <p className="text-sm text-white/80 mb-4">See who's leading in your Panchayat!</p>
        
        <Table>
          <TableHeader>
            <TableRow className="border-b-white/20">
              <TableHead className="w-[50px] text-white/90">Rank</TableHead>
              <TableHead className="text-white/90">Farmer</TableHead>
              <TableHead className="text-right text-white/90">Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {leaderboardData.map((farmer) => (
              <TableRow key={farmer.rank} className={farmer.isUser ? "bg-amber-400/10 border-b-white/20" : "border-b-white/20"}>
                <TableCell className="font-bold text-white">{farmer.rank}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="h-8 w-8">
                      {farmer.avatar ? farmer.avatar : <Avatar1Icon/>}
                       <AvatarFallback>{farmer.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white">{farmer.name}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold text-white">{farmer.score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
    </div>
  );
}
