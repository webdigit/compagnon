# operational-state.md — Tableau de bord vivant

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

| Fichier | Contenu |
|---|---|
| `learned-rules.md` | `<n>` règles (`<n>` provisoires, `<n>` actives), `<n>` hypothèses, `<n>` contradictions ouvertes |
| `mistakes.md` | `<n>` entrées — `<n>` ouvertes, `<n>` résolues |
| `examples.md` | `<n>` exemples |
| `objectives.md` | `<n>` cibles, `<n>` validées |
| `capabilities.md` | N1, `<n>` écritures ouvertes |

## Rituel de collaboration

> Ce qui a été convenu avec l'opérateur sur la façon de travailler ensemble. À remplir dès la
> première séance, ça évite de le redemander.

- **Signalement des corrections** : `<comment l'opérateur signale qu'il corrige>`
- **Ce qui se soumet avant d'agir** : `<la liste>`
- **Fin de session** : bloc `🧠 MISE À JOUR MÉMOIRE` obligatoire. **C'est le maillon faible connu :
  rien ne force l'agent à le produire.**

## Points chauds — ce qui attend une décision

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

- `<motif>` → **R00X**, `<n>`/3 occurrences

---

_Prochaine consolidation : au balayage mensuel, ou plus tôt si une gâchette du NOYAU §4 s'active._
_Dernière mise à jour : `<jj/mm/aaaa>`._
