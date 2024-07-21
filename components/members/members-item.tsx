"use client";

import Image from "next/image";
import { useParams, useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { ActionToolTip } from "@/components/action-tooltip";
import { UserAvatar } from "../user-avatar";
import { Crown, ShieldCheck, User } from "lucide-react";
import { MemberRole } from "@prisma/client";

interface MemberItemProps {
  id: string;
  imageUrl: string;
  name: string;
  role: MemberRole;
}

export const MembersItem = ({ id, imageUrl, name, role }: MemberItemProps) => {
  const router = useRouter();
  const roleIconMap = {
    GUEST: <User className="h-4 w-4 ml-2 text-green-500" />,
    MODERATOR: <ShieldCheck className="h-4 w-4 ml-2 text-indigo-500" />,
    ADMIN: <Crown className="h-4 w-4 ml-2 text-rose-500" />,
  };
  return (
    <div>
      <ActionToolTip
        side="right"
        align="center"
        label={name}
        labelImage={roleIconMap[role]}
      >
        <button
          onClick={() => {}}
          className="group relative flex items-center justify-center"
        >
          <div
            className={cn(
              "absolute right-0  rounded-r-full transition-all w-[4px]",
              role === MemberRole.GUEST &&
                "bg-green-500 text-primary rounded-[16px] h-[20px]",
              role === MemberRole.MODERATOR &&
                "bg-white dark:bg-indigo-500 text-primary rounded-[16px] h-[20px]",
              role === MemberRole.ADMIN &&
                "bg-rose-500 text-primary rounded-[16px] h-[20px]"
            )}
          />
          <div
            className={cn(
              "relative group flex mx-3 h-[48px] w-[48px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center"
            )}
          >
            <UserAvatar classname="h-[48px] w-[48px]" src={imageUrl} />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};
