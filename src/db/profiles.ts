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

export async function addProfile(name: string) {
    return prisma.profile.create({
        data: {
            name,
        },
    });
}

export async function renameProfile(id: number, name: string) {
    return prisma.profile.update({
        data: {
            name,
        },
        where: {
            id,
        }
    })
}

export async function deleteProfile(id: number) {
    return prisma.profile.delete({
        where: {
            id,
        }
    })
}
