import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma";

export async function POST(request: NextRequest) {
    const data = {
        "dranken":[
            {"bier":1},{"pitcher_bier":5},{"rosé_bier":1}
        ],
        "snacks":[
            {"bitterballen":1}
        ],
        "barcount":2,
        "tafelcount":10,
        "barindeling":[
            null,"1","1","1","1","1","2","2","2","2","2"
        ]
    }
    const { dranken, snacks, barcount, barindeling } = data
    
    try {
        const result = await prisma.$executeRaw`
            SELECT update_tables(
                ${JSON.stringify(dranken)}::jsonb,
                ${JSON.stringify(snacks)}::jsonb,
                ${JSON.stringify(barindeling)}::jsonb,
                ${barcount}::int
            )
        `;

        console.log("Update result: ", result);

        return new NextResponse(JSON.stringify({ message: result }), { status: 200 });
    } catch (error) {
        console.error("Error updating tables: ", error);
        return new NextResponse(JSON.stringify({ message: 'Er ging iets mis bij het updaten' }), { status: 400 });
    }
}