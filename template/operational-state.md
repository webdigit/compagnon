# operational-state.md : Tableau de bord vivant

> **Statut : mémoire AUTO-ÉCRITE.** État courant, relu au démarrage de chaque session.
> **Ce n'est pas un journal** : ce qui est clos en sort. Sans cette discipline, le fichier grossit
> jusqu'à ne plus être relu, et cesse d'être un état.
>
> **Rotation** : archivez dans `_archive/` par trimestre, ou dès que la lecture complète devient
> pénible. Un état qu'on ne lit plus en entier ne sert plus à rien.

_État arrêté au `<jj/mm/aaaa, hh:mm>`._

---

## Identité et niveau

- **`<nom de l'agent>`**, agent de `<opérateur>`, projet `<chemin>`.
- **Compétence 01 `<identifiant>`** : **L1, non prouvée**, `<n>` cas évalués.
- **Autonomie : N1, lecture seule intégrale.** Aucune écriture pré-autorisée.
- Gabarit de référence : **compagnon `<version>`** (voir `VERSION.md`).

## Mémoire

> **Aucun nombre ne se recopie ici.** Chaque fichier tient son propre compte et fait foi sur
> lui-même : les règles et leur statut dans `learned-rules.md`, les erreurs ouvertes dans
> `mistakes.md`, les cibles dans `objectives.md`, les ouvertures dans `capabilities.md`. Un compteur
> dupliqué diverge toujours, et le jour où il diverge, on ne sait plus lequel croire (compagnon P7).
>
> Ce qui vit ici est ce qu'aucun autre fichier ne sait : l'état d'ensemble, ce qui attend une
> décision, et le fil des cas traités.

## Rituel de collaboration

> Ce qui a été convenu avec l'opérateur sur la façon de travailler ensemble. À remplir dès la
> première séance, ça évite de le redemander.

- **Signalement des corrections** : `<comment l'opérateur signale qu'il corrige>`
- **Ce qui se soumet avant d'agir** : `<la liste>`
- **Fin de session** : bloc `🧠 MISE À JOUR MÉMOIRE` obligatoire. **C'est le maillon faible connu :
  rien ne force l'agent à le produire.**

## Entretien

- **Dernier balayage complet (NOYAU §4bis)** : `<jj/mm/aaaa>`, ou **jamais**.
- Au-delà d'un mois, l'agent le signale en ouverture de session et **propose** la passe. Il ne la
  lance pas de son chef : elle prend du temps qui appartient à l'opérateur.

## Points chauds : ce qui attend une décision

| # | Sujet | Attente |
|---|---|---|
| 1 | `<ce qui bloque>` | `<qui doit trancher>` |

## Journal des cas

| # | Date | Sujet | Corrections | Trace |
|---|---|---|---|---|
| 01 | `<jj/mm/aaaa>` | `<sujet>` | `<combien, sur quoi>` | `<E00X>` |

## Motifs ouverts

> Les règles provisoires et ce qui leur manque pour mûrir. C'est la file d'attente de
> l'apprentissage.

- `<motif>` → **R00X** (son compte d'occurrences vit dans `learned-rules.md`)

---

_Prochaine consolidation : au balayage mensuel, ou plus tôt si une gâchette du NOYAU §4 s'active._
_Dernière mise à jour : `<jj/mm/aaaa>`._
