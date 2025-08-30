"use server";
import {prisma} from "@/db/connector";


export async function getProfiles() {
    const profiles = await prisma.profile.findMany({
        orderBy: {
            "id": "asc",
        }
    });

    return profiles;
}
