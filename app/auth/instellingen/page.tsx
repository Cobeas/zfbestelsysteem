"use client";

export default function Instellingen() {
    
    const updateDb = async () => {
        try {
            const response = await fetch("/api/settings/save", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            const responseData = await response.json();
            console.log(responseData);

            if (response.ok) {
                alert("Instellingen opgeslagen");
            } else {
                alert("Er ging iets mis bij het opslaan van de instellingen");
            }
        } catch (error) {
            console.error("Error updating settings: ", error);
            alert("Er ging iets mis bij het opslaan van de instellingen");
        }
    }

    const insertOrder = async () => {
        try {
            const response = await fetch("/api/orders/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    tafelnummer: '1',
                    drank: { bier: '1' },
                    snacks: { bitterballen: '2' },
                    notities: "Geen mosterd"
                })
            });

            const responseData = await response.json();
            console.log(responseData);

            if (response.ok) {
                alert("Bestelling ingevoerd");
            } else {
                alert("Er ging iets mis bij het invoeren van de bestelling");
            }
        } catch (error) {
            console.error("Error inserting order: ", error);
            alert("Er ging iets mis bij het invoeren van de bestelling");
        }
    }

    return (
        <div>
            <h1>Instellingen</h1>
            <button onClick={() => updateDb()}>Instellingen opslaan</button>
            <button onClick={() => insertOrder()}>Bestelling invoeren</button>
        </div>
    )
}