import { NextResponse, NextRequest } from "next/server";
import { prisma } from '../../lib/prisma';

export async function GET(_request: NextRequest) {
    try {
        const data = await prisma.system_settings.findFirst({
            where: {
                id: 1
            },
            select: {
                id: true,
                jwt: true,
                refresh: true,
                hash: true
            }
        })

        return new NextResponse(JSON.stringify(data), { status: 200 });

    } catch (error) {
        console.error("Error retreiving orders: ", error);
        return new NextResponse(JSON.stringify({ message: 'Er is een fout opgetreden' }), { status: 400 });
    }
}