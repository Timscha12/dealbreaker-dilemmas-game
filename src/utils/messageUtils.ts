
/**
 * Returns a custom game over message based on the number of accepted scenarios
 */
export function getCustomGameOverMessage(acceptedCount: number): string {
  switch (acceptedCount) {
    case 0:
      return "Ohje! Sei mal nicht so wählerisch! Dein Traumpartner muss wohl vom Himmel fallen… mit Zertifikat.";
    case 1:
      return "Ohje! Sei mal nicht so wählerisch! Dein Traumpartner muss wohl vom Himmel fallen… mit Zertifikat.";
    case 2:
      return "Du hast echt Standards, was? Zwei Häkchen? Das ist schon fast ein Bewerbungsgespräch.";
    case 3:
      return "Na gut, aber so wird das nix mit euch zwei. Du bist so picky, Tinder hätte dich schon dreimal rausgeworfen.";
    case 4:
      return "Langsam wird's interessant… aber noch kein Match made in heaven. Dein Date wäre vielleicht okay – wenn ihr nicht reden müsstet.";
    case 5:
      return "Halbzeit! Könnte schlimmer sein… aber auch besser. Ihr würdet euch auf 'nem Festival treffen… und dann ignorieren.";
    case 6:
      return "Okay okay, da geht was – aber red mal lieber nicht über Füße. Ihr würdet daten, aber getrennte Zahnbürsten… forever.";
    case 7:
      return "Nicht schlecht! Dein Herz ist offen… oder deine Standards sind niedrig? Ihr würdet zusammenziehen – in getrennte Wohnungen.";
    case 8:
      return "Wow, das ist fast Liebe auf den ersten… Kompromiss. Du siehst das Gute im Menschen. Selbst in Clown-Puppen.";
    case 9:
      return "Das ist Hingabe. Oder Wahnsinn. Nur noch eine Macke trennt dich von deiner Traumkatastrophe.";
    case 10:
      return "Seelenverwandte. Oder einfach völlig schmerzfrei? Herzlichen Glückwunsch! Du würdest sogar heiraten, obwohl sie/er mit Pflanzen redet und Katzen tanzen lässt.";
    default:
      if (acceptedCount > 10) {
        return "Seelenverwandte. Oder einfach völlig schmerzfrei? Herzlichen Glückwunsch! Du würdest sogar heiraten, obwohl sie/er mit Pflanzen redet und Katzen tanzen lässt.";
      } else {
        return "Ohje! Sei mal nicht so wählerisch! Dein Traumpartner muss wohl vom Himmel fallen… mit Zertifikat.";
      }
  }
}

/**
 * Returns a custom emoji based on the number of accepted scenarios
 */
export function getCustomGameOverEmoji(acceptedCount: number): string {
  switch (acceptedCount) {
    case 0:
      return "😬";
    case 1:
      return "🟥";
    case 2:
      return "🟧";
    case 3:
      return "🟨";
    case 4:
      return "🟩";
    case 5:
      return "🟦";
    case 6:
      return "🟪";
    case 7:
      return "🟫";
    case 8:
      return "🔷";
    case 9:
      return "🟩";
    case 10:
      return "💖";
    default:
      if (acceptedCount > 10) {
        return "💖";
      } else {
        return "😬";
      }
  }
}
