"use client";

import { Plus, UserPlus } from "lucide-react";
import { ActionToolTip } from "@/components/action-tooltip";
import { useModal } from "@/hooks/use-modal-store";
import { ServerWithMembersWithProfile } from "@/types";
import { Server } from "@prisma/client";

interface MembersActionProps {
  server: Server;
}

export const MembersAction = ({ server }: MembersActionProps) => {
  const { onOpen } = useModal();
  return (
    <div>
      <ActionToolTip side="right" align="center" label="Add Members">
        <button
          onClick={() => onOpen("invite", { server })}
          className="group flex items-center"
        >
          <div className="flex mx-3 h-[45px] w-[45px] rounded-[24px] group-hover:rounded-[16px] transition-all overflow-hidden items-center justify-center bg-background dark:bg-neutral-700 group-hover:bg-emerald-500">
            <UserPlus
              className="group-hover:text-white transition text-emerald-500"
              size={20}
            />
          </div>
        </button>
      </ActionToolTip>
    </div>
  );
};
