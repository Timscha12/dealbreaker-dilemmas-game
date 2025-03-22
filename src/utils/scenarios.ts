
export interface Scenario {
  id: number;
  text: string;
}

export const scenarios: Scenario[] = [
  { id: 1, text: "... hat keinen Führerschein" },
  { id: 2, text: "... steht auf Füße" },
  { id: 3, text: "... redet mit Pflanzen" },
  { id: 4, text: "... hat denselben Vornamen wie dein Ex" },
  { id: 5, text: "... besteht auf tägliches Horoskop-Lesen vor Entscheidungen" },
  { id: 6, text: "... trägt immer Tierkostüme zu Hause" },
  { id: 7, text: "... glaubt an Verschwörungstheorien" },
  { id: 8, text: "... hat noch nie eine Serie durchgeschaut" },
  { id: 9, text: "... telefoniert jeden Tag eine Stunde mit den Eltern" },
  { id: 10, text: "... lässt den Wasserhahn beim Zähneputzen laufen" },
  { id: 11, text: "... ist ein verurteilter Steuerhinterzieher" },
  { id: 12, text: "... hängt täglich 5 Stunden auf Social Media" },
  { id: 13, text: "... ist Vegetarier/in und kritisiert jeden, der Fleisch isst" },
  { id: 14, text: "... schläft immer mit 5 großen Kuscheltieren im Bett" },
  { id: 15, text: "... lacht grundsätzlich über die eigenen Witze" },
  { id: 16, text: "... sammelt lebende Spinnen als Haustiere" },
  { id: 17, text: "... hat eine Kollektion von über 200 Paar Schuhen" },
  { id: 18, text: "... will mindestens 8 Kinder haben" },
  { id: 19, text: "... geht nie ohne volle Kriegsbemalung aus dem Haus" },
  { id: 20, text: "... singt ständig Disney-Lieder beim Duschen" },
  { id: 21, text: "... ist noch Jungfrau mit 35" },
  { id: 22, text: "... sortiert Gummibärchen nach Farben, bevor sie gegessen werden" },
  { id: 23, text: "... führt Selbstgespräche in der dritten Person" },
  { id: 24, text: "... kann nur einschlafen, wenn der Fernseher läuft" },
  { id: 25, text: "... trägt grundsätzlich nur Kleidung von einer bestimmten Marke" },
  { id: 26, text: "... postet jede Mahlzeit auf Instagram" },
  { id: 27, text: "... liest Zeitungen von hinten nach vorne" },
  { id: 28, text: "... hat ein lebensgroßes Poster eines Prominenten im Schlafzimmer" },
  { id: 29, text: "... hat eine Allergie gegen Haustiere" },
  { id: 30, text: "... beendet Unterhaltungen immer mit einem Fingerschnipsen" },
  { id: 31, text: "... trägt auch im Winter Sandalen mit Socken" },
  { id: 32, text: "... besteht darauf, dass beide Partner denselben Haarschnitt tragen" },
  { id: 33, text: "... hat einen schrecklichen Musikgeschmack" },
  { id: 34, text: "... hat 7 gescheiterte Ehen hinter sich" },
  { id: 35, text: "... teilt ein Bankkonto mit den Eltern" },
  { id: 36, text: "... weigert sich, Trinkgeld zu geben" },
  { id: 37, text: "... sammelt Fingernägelabschnitte in einem Glas" },
  { id: 38, text: "... spricht mit einem übertriebenen britischen Akzent, obwohl nicht von dort" },
  { id: 39, text: "... hat ein Tattoo des Ex-Partners, das nicht entfernt werden soll" },
  { id: 40, text: "... begrüßt jeden mit einem komplizierten Handshake-Ritual" },
  // Weitere Szenarien würden hier hinzugefügt werden
];

// Function to get random scenarios
export function getRandomScenarios(count: number = 10): Scenario[] {
  const shuffled = [...scenarios].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
