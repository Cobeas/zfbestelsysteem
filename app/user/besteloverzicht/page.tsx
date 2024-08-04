"use client";

import { useEffect, useState } from "react";

type Order = {
    bestelling_id: number;
    tafel: number;
    bar: number;
    item_naam: string;
    aantal: number;
    notities: string;
    totaal_prijs_per_item: number;
    is_snack: boolean;
};

type TransformedOrder = {
    bestelling_id: number;
    tafel: number;
    bar: number;
    items: string;
    totaal_prijs: number;
    notities: string;
};

export default function BestelOverzicht() {
    const [data, setData] = useState<Order[]>([]);

    useEffect(() => {
        const wsUrl = process.env.NEXT_PUBLIC_WEBSOCKET_URL || "ws://localhost:8080";
        const ws = new WebSocket(wsUrl);

        ws.onopen = () => {
            console.log("Websocket connected to ", wsUrl);
        };

        ws.onmessage = (event) => {
            const message = JSON.parse(event.data);
            if (message.event === 'open_orders') {
                setData(message.data);
            }
        };

        ws.onclose = () => {
            console.log("Websocket closed");
        };

        return () => {
            ws.close();
        };
    })

    return (
        <div>
            <h1>Besteloverzicht</h1>
            <textarea style={{width: '100%', minHeight: '300px'}} value={JSON.stringify(data, null, 2)} readOnly />
        </div>
    );
}