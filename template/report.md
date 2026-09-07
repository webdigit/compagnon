---
schéma: compagnon/report/1
agent: <nom de l'agent>
opérateur: <opérateur>
compétence: <identifiant de la compétence couverte>
run: <AAAA-MM-JJ-nn>
arrêté_le: <AAAA-MM-JJ HH:MM>
périmé_après: <AAAA-MM-JJ HH:MM>
statut: complet | partiel | bloqué
autonomie: N<n>
couvert:
  - <ce qui a réellement été balayé>
non_couvert:
  - <ce qui ne l'a pas été, et pourquoi>
---

# report.md : Rapport de sortie

> **Statut : SORTIE PUBLIQUE, auto-écrite.** C'est le **seul** fichier de ce dossier destiné à être
> lu de l'extérieur : par l'opérateur pressé, ou par un agent chapeau qui arbitre entre plusieurs
> instances. Tout le reste du dossier est le cerveau de l'agent et ne se lit pas d'ailleurs (compagnon P12).
>
> **Ce n'est pas une mémoire.** Aucune règle, aucun reward, aucun score n'entre ici. Ce qui
> s'apprend va dans `learned-rules.md`. Ce qui décrit **l'agent** va dans `operational-state.md`.
> Ce qui décrit **le travail** vient ici.
>
> **Ce n'est pas un journal.** Ce fichier ne porte que le **dernier** rapport. Le précédent part
> d'abord dans `_archive/rapports/<AAAA-MM-JJ>-<run>.md`, tel quel, sans être modifié (compagnon P5).
>
> **Ce fichier est facultatif.** Une instance dont personne ne lit la sortie n'en a pas besoin, et
> son absence n'est pas un manquement.

## Contrat de lecture

Pour qui lit ce fichier sans connaître le reste du dossier :

1. **Regardez `périmé_après` avant tout.** Passé cette date, ce rapport décrit un état qui n'existe
   plus. Il ne se rattrape pas par déduction : il se refait.
2. **Regardez `non_couvert`.** Le silence de ce rapport n'est pas une absence de sujet, c'est une
   absence de regard. Ce qui n'a pas été balayé est écrit, précisément pour ça.
3. **Ne confondez pas « proposé » et « validé ».** Une ligne non validée est un avis d'agent, pas une
   décision de <OPÉRATEUR>. Agir dessus, c'est valider à sa place.
4. **Les références font foi, pas ce fichier.** Un identifiant renvoie au système qui porte la
   donnée. En cas d'écart, c'est le système source qui a raison.
5. **Ce fichier se lit, il ne s'écrit pas de l'extérieur.** Personne d'autre que l'agent de cette
   instance n'y touche, et personne ne touche au reste du dossier (compagnon P12).

## En un paragraphe

`<Ce qu'il faut retenir si on ne lit rien d'autre. Trois lignes au plus, en clair, sans jargon
interne.>`

## Fait

> Rien n'entre ici sans **vérification effective** : on observe la source, pas sa représentation.
> Ce qui est lancé mais non constaté n'est pas fait, il est *en cours*, et il descend d'une section.

| # | Objet | Référence | Vérifié par | Validé par |
|---|---|---|---|---|
| 01 | `<ce qui a été produit ou changé>` | `<ID dans le système qui le porte>` | `<le constat fait, pas l'accusé reçu>` | `<OPÉRATEUR>` ou `non` |
| _ex._ | _Réponse postée au client_ | _Ticket #412_ | _Relu sur le ticket après envoi_ | _<OPÉRATEUR>_ |

## À faire : proposé, non arbitré

> L'agent ne classe **pas** ses items par rapport à ceux des autres instances : il n'en sait rien.
> Il donne une échéance et ce que coûte le report. L'arbitrage appartient à qui lit.

| # | Objet | Référence | Échéance | Si c'est repoussé | Validé par |
|---|---|---|---|---|---|
| 01 | `<ce qu'il reste>` | `<ID>` | `<AAAA-MM-JJ, ou vide>` | `<la conséquence concrète, en une ligne>` | `<OPÉRATEUR>` ou `non` |
| _ex._ | _Relancer le devis_ | _Lead 118_ | _2026-09-12_ | _Le client relance un concurrent, cité en réunion_ | _non_ |

## En attente d'une décision de <OPÉRATEUR>

> Ce qui est bloqué **côté métier**, et par qui. Ce qui bloque l'agent lui-même (sa méthode, son
> niveau d'autonomie, une règle contradictoire) n'est pas ici : c'est dans `operational-state.md`,
> section « Points chauds ». Deux files distinctes, deux lecteurs distincts (compagnon P7).

| # | Sujet | Ce qui manque pour trancher |
|---|---|---|
| 01 | `<le sujet>` | `<l'information ou l'arbitrage attendu>` |

## Non couvert

`<Ce qui n'a pas été regardé pendant ce run, et pourquoi : hors périmètre, source indisponible,
temps, accès manquant. Une ligne par angle mort. C'est la section la plus utile à un lecteur
extérieur, et la plus tentante à laisser vide.>`

---

_Rapport produit en fin de run, après le bloc `🧠 MISE À JOUR MÉMOIRE` : ce qui vient d'être appris
peut changer ce qu'on conclut. Voir NOYAU §5bis._
