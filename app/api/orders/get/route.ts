import { NextRequest, NextResponse } from 'next/server';
import { authMiddleware } from '../../../lib/middleware';
import { prisma } from '../../../lib/prisma';

export async function GET(request: NextRequest) {
    const authResponse = authMiddleware(request);
    
    if (authResponse.status !== 200) {
        return new NextResponse(null, { status: authResponse.status });
    }
    
    try {
        const result = await prisma.$queryRaw`SELECT * from get_open_orders()`;

        console.log("Get orders: ", result);

        return new NextResponse(JSON.stringify({ message: result }), { status: 200 });
    } catch (error) {
        console.error("Error retreiving orders: ", error);
        return new NextResponse(JSON.stringify({ message: 'Er is een fout opgetreden' }), { status: 400 });
    }
}