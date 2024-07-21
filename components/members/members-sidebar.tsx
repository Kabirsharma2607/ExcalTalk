import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { MembersAction } from "./members-action";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MembersItem } from "@/components/members/members-item";
import { UserAvatar } from "../user-avatar";
import { MemberRole } from "@prisma/client";

interface MembersSidebarProps {
  serverId: string;
}

export const MembersSidebar = async ({ serverId }: MembersSidebarProps) => {
  const profile = await currentProfile();
  if (!profile) {
    return redirect("/");
  }

  const server = await db.server.findFirst({
    where: { id: serverId },
    include: { members: { include: { profile: true } } },
  });
  if (!server) {
    // Handle the case when server is null
    return null;
  }
  server.members.sort((a, b) => {
    if (a.role === MemberRole.ADMIN && b.role !== MemberRole.ADMIN) {
      return -1;
    }
    if (a.role !== MemberRole.ADMIN && b.role === MemberRole.ADMIN) {
      return 1;
    }
    if (a.role === MemberRole.MODERATOR && b.role !== MemberRole.MODERATOR) {
      return -1;
    }
    if (a.role !== MemberRole.MODERATOR && b.role === MemberRole.MODERATOR) {
      return 1;
    }
    return 0;
  });
  //console.log(servers);
  return (
    <div className="space-y-4 flex flex-col items-center h-full text-primary w-full dark:bg-[#1E1F22] bg-indigo-500 py-3 text-white">
      <MembersAction server={server} />

      <Separator className="h-[2px] bg-zinc-300 dark:bg-zinc-700 rounded-md w-10 mx-auto" />
      <ScrollArea className="flex-1 w-full">
        {server?.members?.map((member) => (
          <div key={member.id} className="mb-4">
            <MembersItem
              id={member.profile.id}
              name={member.profile.name}
              imageUrl={member.profile.imageUrl}
              role={member.role}
            />
          </div>
        ))}
      </ScrollArea>
    </div>
  );
};
