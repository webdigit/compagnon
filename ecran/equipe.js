/* ------------------------------------------------------------------
   equipe.js : transport de l'état d'une équipe vers la vue de coordination.

   AUTO-ÉCRIT par le coordinateur à la fin de chaque passage de
   coordination (NOYAU §5septies, point 11). Ne se modifie pas à la main :
   le passage suivant écraserait la correction sans le dire.

   Ce fichier ne contient AUCUNE interprétation. Il recopie, entiers et
   verbatim, equipe.md et le report.md du coordinateur, puis le report.md
   de chaque membre, dans l'ordre de equipe.md. Rien de la mémoire d'un
   membre (compagnon P12). Contrat : FORMAT.md, section 12.

   Règle d'échappement : celle de etat.js (FORMAT.md, section 4).

   ÉTAT D'EXEMPLE. Équipe fictive « Atelier », posée pour éprouver la vue.
   Aucune donnée réelle ici.
------------------------------------------------------------------ */

window.COMPAGNON_EQUIPE = {

  schema: "compagnon/equipe/1",
  gabarit: "0.38.0",
  derniere_etiquette: "v0.38.0",
  coordinateur: "Atelier",
  operateur: "L. Marchal",
  arrete_le: "2026-10-26 08:50",
  note: "État d'exemple. Équipe fictive, aucune donnée réelle.",

  equipe: `# equipe.md : Les agents que je coordonne

> **Gouvernance : zone MANUELLE.** L. Marchal ajoute, retire et règle les membres.

## Les membres

| Membre | Projet | Rapport | Tâche programmée | Passage attendu | Relançable | Décisions | Ce qu'il m'adresse | Depuis le |
|---|---|---|---|---|---|---|---|---|
| Comptoir | Comptoir, \`C:\\Comptoir\` | \`ai-memory\\report.md\` de ce dossier | \`trig_exemple_comptoir\` · Comptoir quotidien | en semaine à 8h | oui | oui | \`..\\handoff\\atelier\\\` | 01/10/2026 |
| Caisse | Caisse, \`C:\\Caisse\` | \`ai-memory\\report.md\` de ce dossier | \`trig_exemple_caisse\` · Caisse du soir | chaque jour à 19h | oui | non | aucun | 01/10/2026 |
| Stock | Stock, \`C:\\Stock\` | \`ai-memory\\report.md\` de ce dossier | aucune | aucun : lu quand il a tourné | non | non | aucun | 01/10/2026 |
| Archives | Archives, \`C:\\Archives\` | \`ai-memory\\report.md\` de ce dossier | sans objet (lecture seule) | aucun : lu quand il a tourné | non | non | aucun | 20/10/2026 |

[fin de equipe.md]
`,

  rapport_coordinateur: `---
schéma: compagnon/report/1
agent: Atelier
opérateur: L. Marchal
compétence: C01 · coordination
run: 2026-10-26-01
arrêté_le: 2026-10-26 08:50
périmé_après: 2026-10-26 14:30
statut: complet
autonomie: junior
couvert:
  - Les quatre rapports de equipe.md, et l'état des deux tâches programmées.
non_couvert:
  - aucun
gabarit: 0.38.0
coordonné_par: aucun
relancé_par: aucun
demandes_en_attente:
  - aucune
évaluations_dues:
  - aucune
---

# report.md : Rapport de sortie

## En un paragraphe

Passage de 8h45. Comptoir a tourné et attend deux décisions, dont une échéance passée hier. Caisse a un rapport périmé depuis ce matin : sa tâche du soir n'a pas démarré, je propose une relance. Stock est en retard de version, mission U ouverte.

[fin de report.md]
`,

  membres: [
    { nom: "Comptoir", lecture: "lu", rapport: `---
schéma: compagnon/report/1
agent: Comptoir
opérateur: L. Marchal
compétence: C01 · devis-entrants
run: 2026-10-26-01
arrêté_le: 2026-10-26 08:12
périmé_après: 2026-10-27 08:00
statut: complet
autonomie: junior
couvert:
  - Boîte devis, 14 messages depuis le dernier run.
non_couvert:
  - Pièces jointes de plus de 10 Mo, non ouvertes.
gabarit: 0.38.0
coordonné_par: Atelier
relancé_par: aucun
demandes_en_attente:
  - Création de devis brouillon · C01 · déposée le 20/10/2026
évaluations_dues:
  - aucune
---

# report.md : Rapport de sortie

## En un paragraphe

Quatorze demandes lues, trois devis à préparer. Le devis Bertin attend votre accord sur la remise depuis hier.

## Fait

| # | Objet | Référence | Vérifié par | Validé par |
|---|---|---|---|---|
| 01 | Tri des demandes | 14 messages | Relu dans la boîte | non |

## À faire : proposé, non arbitré

| # | Objet | Référence | Échéance | Si c'est repoussé | Validé par |
|---|---|---|---|---|---|
| 01 | Envoyer le devis Bertin | Devis D-118 | 2026-10-25 | Le client relance un concurrent, cité au téléphone | non |
| 02 | Préparer le devis Lemaire | Demande du 24/10 | 2026-10-29 | Un délai de réponse de plus d'une semaine | non |

## En attente d'une décision de L. Marchal

| # | Sujet | Ce qui manque pour trancher | Recommandation |
|---|---|---|---|
| 01 | Remise Bertin | Votre accord sur 8 % | Accorder : client récurrent, marge tenue |
| 02 | Demandes hors zone | Une règle : répondre ou décliner | Décliner poliment au-delà de 50 km |

[fin de report.md]
` },
    { nom: "Caisse", lecture: "lu", rapport: `---
schéma: compagnon/report/1
agent: Caisse
opérateur: L. Marchal
compétence: C01 · rapprochement-caisse
run: 2026-10-24-01
arrêté_le: 2026-10-24 19:20
périmé_après: 2026-10-25 20:00
statut: partiel
autonomie: stagiaire
couvert:
  - Ventes du 24/10, terminal 1.
non_couvert:
  - Terminal 2 injoignable, ventes non rapprochées.
gabarit: 0.37.0
coordonné_par: Atelier
relancé_par: aucun
demandes_en_attente:
  - aucune
évaluations_dues:
  - C01 · 2 semaines écoulées · en attente
---

# report.md : Rapport de sortie

## En un paragraphe

Rapprochement partiel : le terminal 2 n'a pas répondu. Écart de 12,40 € sur le terminal 1, expliqué par un remboursement.

[fin de report.md]
` },
    { nom: "Stock", lecture: "lu", rapport: `---
schéma: compagnon/report/1
agent: Stock
opérateur: L. Marchal
compétence: C01 · inventaire
run: 2026-10-20-01
arrêté_le: 2026-10-20 10:05
périmé_après: 2026-11-03 10:00
statut: complet
autonomie: junior
couvert:
  - Inventaire du dépôt A.
non_couvert:
  - Dépôt B, hors périmètre de ce run.
gabarit: 0.35.0
coordonné_par: Atelier
relancé_par: aucun
demandes_en_attente:
  - aucune
évaluations_dues:
  - aucune
---

# report.md : Rapport de sortie

## En un paragraphe

Inventaire du dépôt A fait, sans écart notable.

[fin de report.md]
` },
    { nom: "Archives", lecture: "absent", motif: "Pas de report.md dans ai-memory." }
  ]
};
