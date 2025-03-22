
export interface Scenario {
  id: number;
  text: string;
}

export const scenarios: Scenario[] = [
  { id: 1, text: "Sie/Er hat keinen Führerschein" },
  { id: 2, text: "Sie/Er steht auf Füße" },
  { id: 3, text: "Sie/Er redet mit Pflanzen" },
  { id: 4, text: "Sie/Er hat denselben Vornamen wie dein Ex" },
  { id: 5, text: "Sie/Er besteht auf tägliches Horoskop-Lesen vor Entscheidungen" },
  { id: 6, text: "Sie/Er trägt immer Tierkostüme zu Hause" },
  { id: 7, text: "Sie/Er glaubt an Verschwörungstheorien" },
  { id: 8, text: "Sie/Er hat noch nie eine Serie durchgeschaut" },
  { id: 9, text: "Sie/Er telefoniert jeden Tag eine Stunde mit den Eltern" },
  { id: 10, text: "Sie/Er lässt den Wasserhahn beim Zähneputzen laufen" },
  { id: 11, text: "Sie/Er ist ein verurteilter Steuerhinterzieher" },
  { id: 12, text: "Sie/Er hängt täglich 5 Stunden auf Social Media" },
  { id: 13, text: "Sie/Er ist Vegetarier/in und kritisiert jeden, der Fleisch isst" },
  { id: 14, text: "Sie/Er schläft immer mit 5 großen Kuscheltieren im Bett" },
  { id: 15, text: "Sie/Er lacht grundsätzlich über die eigenen Witze" },
  { id: 16, text: "Sie/Er sammelt lebende Spinnen als Haustiere" },
  { id: 17, text: "Sie/Er hat eine Kollektion von über 200 Paar Schuhen" },
  { id: 18, text: "Sie/Er will mindestens 8 Kinder haben" },
  { id: 19, text: "Sie/Er geht nie ohne volle Kriegsbemalung aus dem Haus" },
  { id: 20, text: "Sie/Er singt ständig Disney-Lieder beim Duschen" },
  { id: 21, text: "Sie/Er ist noch Jungfrau mit 35" },
  { id: 22, text: "Sie/Er sortiert Gummibärchen nach Farben, bevor sie gegessen werden" },
  { id: 23, text: "Sie/Er führt Selbstgespräche in der dritten Person" },
  { id: 24, text: "Sie/Er kann nur einschlafen, wenn der Fernseher läuft" },
  { id: 25, text: "Sie/Er trägt grundsätzlich nur Kleidung von einer bestimmten Marke" },
  { id: 26, text: "Sie/Er postet jede Mahlzeit auf Instagram" },
  { id: 27, text: "Sie/Er liest Zeitungen von hinten nach vorne" },
  { id: 28, text: "Sie/Er hat ein lebensgroßes Poster eines Prominenten im Schlafzimmer" },
  { id: 29, text: "Sie/Er hat eine Allergie gegen Haustiere" },
  { id: 30, text: "Sie/Er beendet Unterhaltungen immer mit einem Fingerschnipsen" },
  { id: 31, text: "Sie/Er trägt auch im Winter Sandalen mit Socken" },
  { id: 32, text: "Sie/Er besteht darauf, dass beide Partner denselben Haarschnitt tragen" },
  { id: 33, text: "Sie/Er hat einen schrecklichen Musikgeschmack" },
  { id: 34, text: "Sie/Er hat 7 gescheiterte Ehen hinter sich" },
  { id: 35, text: "Sie/Er teilt ein Bankkonto mit den Eltern" },
  { id: 36, text: "Sie/Er weigert sich, Trinkgeld zu geben" },
  { id: 37, text: "Sie/Er sammelt Fingernägelabschnitte in einem Glas" },
  { id: 38, text: "Sie/Er spricht mit einem übertriebenen britischen Akzent, obwohl nicht von dort" },
  { id: 39, text: "Sie/Er hat ein Tattoo des Ex-Partners, das nicht entfernt werden soll" },
  { id: 40, text: "Sie/Er begrüßt jeden mit einem komplizierten Handshake-Ritual" },
  // Weitere Szenarien würden hier hinzugefügt werden
];

// Function to get random scenarios
export function getRandomScenarios(count: number = 10): Scenario[] {
  const shuffled = [...scenarios].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}
