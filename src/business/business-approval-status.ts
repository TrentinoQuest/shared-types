/**
 * Stato di approvazione dell'affiliazione di un'Attivita Locale.
 *
 * Un'attivita si registra in stato PENDING e puo' autenticarsi, ma non
 * puo' pubblicare offerte finche' un amministratore non ne approva
 * l'affiliazione (RF38 del Deliverable D1):
 *  - PENDING:  richiesta inviata, in attesa di revisione admin
 *  - APPROVED: affiliazione approvata, l'attivita e' operativa
 *  - REJECTED: affiliazione rifiutata dall'admin
 */
export enum BusinessApprovalStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
}
