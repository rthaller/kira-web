// Neue Funktion zur Beschreibung des Reifegrads
function reifegradText(prozent) {
  if (prozent < 20) return "Stufe 1: Digitale Neulinge";
  if (prozent < 40) return "Stufe 2: Digitale fortgeschrittene Anfänger*innen";
  if (prozent < 60) return "Stufe 3: Digitale Anwender*innen";
  if (prozent < 80) return "Stufe 4: Digitale Gewandte";
  return "Stufe 5: Digitale Expert*innen";
}

// Erweiterung im Bereich zeigeAuswertung
labels.forEach((hp, i) => {
  const p = document.createElement("p");
  const prozent = werte[i];
  const best = bestwerte[i];
  let text = `Im Bereich '${hp}' erreicht Ihr Unternehmen einen Reifegrad von ${prozent} %. `;
  text += `Das entspricht der ${reifegradText(prozent)}.`;
  if (prozent < best) {
    text += ` Im Vergleich zum Best Practice (${best} %) besteht Verbesserungspotenzial.`;
  } else if (prozent === best) {
    text += ` Sie erreichen damit den Best Practice-Wert (${best} %).`;
  } else {
    text += ` Sie liegen damit über dem aktuellen Best Practice (${best} %).`;
  }
  p.textContent = text;
  textauswertung.appendChild(p);
});