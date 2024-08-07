"use client";
import { cn } from "@/lib/utils";
import { Member, MemberRole, Profile, Server } from "@prisma/client";
import { Crown, ShieldCheck, User } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { UserAvatar } from "../user-avatar";

interface ServerMemberProps {
  member: Member & { profile: Profile };
  server: Server;
  profileId: string;
}

export const ServerMember = ({
  member,
  server,
  profileId,
}: ServerMemberProps) => {
  const params = useParams();
  const router = useRouter();
  const roleIconMap = {
    [MemberRole.GUEST]: <User className="h-4 w-4 ml-2 text-green-500" />,
    [MemberRole.MODERATOR]: (
      <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />
    ),
    [MemberRole.ADMIN]: <Crown className="h-4 w-4 ml-2 text-rose-500" />,
  };
  const onClick = () => {
    if (profileId === member.profile.id) {
      // prevent navigating to the same conversation
      return null;
    }
    router.push(`/servers/${params?.serverId}/conversations/${member.id}`);
    // prevent default link click behavior
  };
  const icon = roleIconMap[member.role];
  return (
    <button
      className={cn(
        "group px-2 py-2 rounded-md flex items-center gap-x-2 w-full hover:bg-zinc-700/10 dark:hover:bg-zinc-700/50 transition mb-1",
        params?.memberId === member.id && "bg-zinc-700/20 dark: bg-zinc-700"
      )}
      onClick={onClick}
    >
      <UserAvatar
        src={member.profile.imageUrl}
        classname="h-8 w-8 md:h-8 md:w-8"
      />
      <p
        className={cn(
          "font-semibold text-sm text-zinc-500 group-hover:text-zinc-600 dark:text-zinc-400 dark:group-hover:text-zinc-300 transition",
          params?.channelId === member.id &&
            "text-primary dark:text-zinc-200 dark:group-hover:text-white"
        )}
      >
        {member.profile.name}
      </p>
      {icon}
    </button>
  );
};
