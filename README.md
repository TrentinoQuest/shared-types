# Trentino Quest — Shared Types

Pacchetto TypeScript contenente i **DTO (Data Transfer Object)** condivisi tra i tre componenti software di Trentino Quest:

- [`trentino-quest-backend`](https://github.com/TrentinoQuest/backend) — produce/consuma i DTO via REST API
- [`trentino-quest-mobile`](https://github.com/TrentinoQuest/mobile) — consuma i DTO per typing delle chiamate HTTP
- [`trentino-quest-backoffice`](https://github.com/TrentinoQuest/backoffice) — consuma i DTO per typing delle chiamate HTTP

Progetto del corso di **Ingegneria del Software** (a.a. 2025-2026), Università degli Studi di Trento, Prof. Sandro Fiore.
**Gruppo 19**: Valerio Cancemi (242804), Federico Caposano (243138).

## Scopo

Garantire un'unica fonte di verità per i contratti API. I DTO definiti qui corrispondono direttamente agli schemi `components.schemas` dell'OpenAPI specification del backend. Modificare un DTO qui e propagare il cambio a tutti i consumatori è automatico: TypeScript segnala dove il codice va aggiornato.

Questo pacchetto **non contiene logica runtime**, solo dichiarazioni di tipo TypeScript.

## Installazione nei progetti consumatori

Il pacchetto è privato e non pubblicato su npm registry pubblico. Si installa direttamente da GitHub:

```bash
npm install github:TrentinoQuest/shared-types
```

Una volta installato, importi i tipi normalmente:

```typescript
import { LoginRequest, User, Quest } from '@trentino-quest/shared-types';
```

## Sviluppo

Requisiti: Node.js >= 22, npm.

```bash
npm install
npm run build
```

| Comando                | Descrizione                   |
| ---------------------- | ----------------------------- |
| `npm run build`        | Compila TypeScript in `dist/` |
| `npm run typecheck`    | Verifica tipi senza compilare |
| `npm run lint`         | Esegue ESLint                 |
| `npm run lint:fix`     | ESLint con auto-fix           |
| `npm run format`       | Formatta tutto con Prettier   |
| `npm run format:check` | Verifica formattazione        |

## Struttura

I tipi sono organizzati per dominio in sottocartelle di `src/`, ognuna corrispondente a un modulo del backend:

```
src/
├── auth/         # LoginRequest, RegisterRequest, AuthResponse
├── users/        # User, UserProfile
├── quests/       # Quest, QuestType, CompleteQuestRequest, ProximityFeedback
├── qrcodes/      # QRCode
├── collectibles/ # Collectible
├── businesses/   # Business, BusinessRegistrationRequest
├── offers/       # Offer
├── leaderboard/  # LeaderboardEntry
├── common/       # GeoPoint, Links, PaginatedMeta, Error
└── index.ts      # barrel export di tutto
```

I tipi vengono aggiunti progressivamente man mano che le feature corrispondenti vengono sviluppate, mantenendo allineamento con l'OpenAPI del backend.

## Repo correlati

- [`trentino-quest-docs`](https://github.com/TrentinoQuest/docs) — Deliverable D1, D2, ADR
- [`trentino-quest-backend`](https://github.com/TrentinoQuest/backend) — Backend Express + MongoDB
- [`trentino-quest-mobile`](https://github.com/TrentinoQuest/mobile) — App mobile Ionic/Angular
- [`trentino-quest-backoffice`](https://github.com/TrentinoQuest/backoffice) — Pannello amministrativo Angular
