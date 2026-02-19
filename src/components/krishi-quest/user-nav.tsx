
'use client';

import {
  Avatar,
  AvatarFallback,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Avatar1Icon, Avatar2Icon, Avatar3Icon } from "./icons";
import type { UserProfile } from "@/lib/types";
import { useTheme } from "next-themes";
import { Moon, Sun, Monitor, LogOut, User, Edit, MoreVertical } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";


const avatarComponents = {
    avatar1: Avatar1Icon,
    avatar2: Avatar2Icon,
    avatar3: Avatar3Icon,
};

export function UserNav({ userProfile }: { userProfile: UserProfile }) {
    const { setTheme } = useTheme();
    const router = useRouter();
    const AvatarComponent = avatarComponents[userProfile.avatar];

    const handleLogout = () => {
        // In a real app, you'd clear session/token here
        localStorage.removeItem('krishi-quest-user-profile');
        router.push('/login');
    }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-10 w-10 rounded-full">
          <MoreVertical className="h-5 w-5" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex items-center gap-3">
              <Avatar className="h-8 w-8 border-2 border-primary">
                <AvatarComponent />
                <AvatarFallback>{userProfile.name.charAt(0)}</AvatarFallback>
              </Avatar>
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{userProfile.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {userProfile.location} Panchayat
              </p>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link href="/dashboard">
                <User className="mr-2 h-4 w-4" />
                <span>Profile</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
             <Link href="/profile-setup">
                <Edit className="mr-2 h-4 w-4" />
                <span>Edit Profile</span>
             </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
                <Monitor className="mr-2 h-4 w-4" />
                <span>Theme</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
                <DropdownMenuSubContent>
                     <DropdownMenuItem onClick={() => setTheme("light")}>
                        <Sun className="mr-2 h-4 w-4" />
                        <span>Light</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setTheme("dark")}>
                        <Moon className="mr-2 h-4 w-4" />
                        <span>Dark</span>
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => setTheme("system")}>
                        <Monitor className="mr-2 h-4 w-4" />
                        <span>System</span>
                    </DropdownMenuItem>
                </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
