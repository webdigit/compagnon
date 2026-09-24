# operational-state.md : Tableau de bord vivant

> **Statut : mémoire AUTO-ÉCRITE.** État courant, relu au démarrage de chaque session.
> **Ce n'est pas un journal** : ce qui est clos en sort. Sans cette discipline, le fichier grossit
> jusqu'à ne plus être relu, et cesse d'être un état.
>
> **Rotation** : archivez dans `_archive/` par trimestre, ou dès que la lecture complète devient
> pénible. Un état qu'on ne lit plus en entier ne sert plus à rien.
> **Sauf les cas que l'évaluation compte** : une ligne du journal postérieure à la plus ancienne
> date `Depuis le` de « Grades actuels » (`capabilities.md`) reste ici. L'archiver ferait tomber le
> compte à zéro, et une évaluation due ne se déclencherait plus.

_État arrêté au `<jj/mm/aaaa, hh:mm>`._

---

## Identité et niveau

- **`<nom de l'agent>`**, agent de `<opérateur>`, projet `<chemin>`.
- **Compétences, grades et autonomie** : tenus dans `capabilities.md`, section « Grades par
  compétence ». Ils ne se recopient pas ici : un grade écrit à deux endroits finit par dire deux
  choses (compagnon P7).
- **Compétence 01 `<identifiant>`** : `<ce qu'elle couvre, en une ligne>`.
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

> **La colonne `Compétence` n'est pas facultative.** C'est elle que l'évaluation compte : sans elle,
> l'échéance « 10 cas » n'a rien à compter, et une erreur ne sait pas quelle compétence elle freine.
> Précisez dans `Corrections` si elles portaient sur le **fond** ou sur la **forme** : seul le fond
> compte pour les grades.

| # | Date | Sujet | Corrections | Trace | Compétence |
|---|---|---|---|---|---|
| 01 | `<jj/mm/aaaa>` | `<sujet>` | `<combien, fond ou forme, sur quoi>` | `<E00X>` | `<C01>` |

## Motifs ouverts

> Les règles provisoires et ce qui leur manque pour mûrir. C'est la file d'attente de
> l'apprentissage.

- `<motif>` → **R00X** (son compte d'occurrences vit dans `learned-rules.md`)

---

_Prochaine consolidation : au balayage mensuel, ou plus tôt si une gâchette du NOYAU §4 s'active._
_Prochaine évaluation : se lit dans `capabilities.md`, elle ne se recopie pas ici._
_Dernière mise à jour : `<jj/mm/aaaa>`._
