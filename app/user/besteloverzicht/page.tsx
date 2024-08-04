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
    return (
        <div>
            <h1>Besteloverzicht</h1>
        </div>
    );
}