/**
 * Stato di piazzamento fisico del QR code di una quest principale.
 *
 * Traccia il ciclo di vita operativo del QR sul territorio, gestito
 * dall'Operatore Manutenzione (RF40-45 del Deliverable D1):
 *  - PENDING:  la quest e' stata creata dall'admin con la sola area di
 *              ricerca; il QR non e' ancora stato piazzato fisicamente.
 *  - PLACED:   l'operatore ha piazzato il QR e registrato la posizione
 *              esatta via GPS; la quest e' attivabile.
 *  - REPORTED: l'operatore ha segnalato il QR come mancante o
 *              danneggiato; necessita di un intervento di sostituzione.
 *
 * Le quest secondarie non hanno placementStatus: non prevedono un QR
 * fisico, solo un check-in geolocalizzato.
 */
export enum PlacementStatus {
  PENDING = 'pending',
  PLACED = 'placed',
  REPORTED = 'reported',
}
