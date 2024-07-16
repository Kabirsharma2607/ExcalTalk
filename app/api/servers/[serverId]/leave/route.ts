import { currentProfile } from "@/lib/current-profile";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  {
    params,
  }: {
    params: {
      serverId: string;
    };
  }
) {
  try {
    const profile = await currentProfile();
    if (!profile) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const serverId = params?.serverId;
    if (!serverId) {
      return new NextResponse("Invalid server", { status: 400 });
    }
    const response = await db.server.update({
      where: {
        id: params.serverId,
        profileId: {
          not: profile.id,
        },
        members: {
          some: {
            profileId: profile.id,
          },
        },
      },
      data: {
        members: {
          deleteMany: {
            profileId: profile.id,
          },
        },
      },
    });
    return NextResponse.json(response);
  } catch (error) {
    console.log("[SERVER_ID]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
