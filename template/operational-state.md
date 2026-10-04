# operational-state.md : Tableau de bord vivant

> **Statut : mémoire AUTO-ÉCRITE.** État courant, relu au démarrage de chaque session.
> **Ce n'est pas un journal** : ce qui est clos en sort, **dans l'écriture même qui le clôt**, et
> sa trace va dans « Clos » du fichier de journal de la session (NOYAU §5). Sans cette discipline,
> le fichier grossit jusqu'à ne plus être relu, et cesse d'être un état.
>
> **Rotation** : archivez dans `_archive/` par trimestre, ou dès que la lecture complète devient
> pénible. Un état qu'on ne lit plus en entier ne sert plus à rien.
> **Le journal des cas ne vit plus ici** (depuis compagnon 0.17.0) : il vit dans `journal/`, un
> fichier par session. Un état qui porte son historique grossit à chaque session, et chaque
> remplacement recopie tout cet historique dans l'archive.

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

> **Un point tranché sort d'ici tout de suite.** Pas de ligne barrée, pas de « à retirer au
> prochain passage » : il sort dans l'écriture qui le clôt, et une ligne dans « Clos » du journal
> de la session dit ce qui l'a clos. Une ligne, un sujet : le contexte va dans « Détails » du
> journal, et la ligne y renvoie. Les numéros ne se réutilisent pas.

| # | Sujet | Attente |
|---|---|---|
| 1 | `<ce qui bloque>` | `<qui doit trancher>` |

## Cas traités

> Les cas ne s'écrivent pas ici : chacun va dans le fichier de journal de sa session,
> `ai-memory/journal/<AAAA-MM-JJ-HHMM>-<session|run>.md` (format : NOYAU §5, « Le journal des
> cas »). Ici ne reste que le repère qui évite de relire tout le dossier. **Cette ligne se met à
> jour en place**, à chaque session qui inscrit un cas : le numéro qu'elle portait passe en
> « Précédent ». Un repère écrit dans une autre section n'est pas lu.

- **Dernier cas inscrit** : `<#>`, dans `journal/<nom du fichier>`. Précédent : `<#>`, dans
  `journal/<nom du fichier>`.

## Observations

> Les faits notables qui n'ont pas encore rejoint un motif (NOYAU §3). **Une ligne chacune** : le
> fait, et d'où il vient. Le récit, s'il en faut un, va dans « Détails » du journal de la session,
> sous le même identifiant. Quand des observations convergent en hypothèse, elles sortent d'ici
> dans la même écriture : l'hypothèse garde `← [O001, O002]`, et « Clos » du journal reçoit leurs
> lignes.

- `<O001 (jj/mm) : le fait, en une phrase ← [cas #, pièce]>`

## Motifs ouverts

> Les règles provisoires et ce qui leur manque pour mûrir. C'est la file d'attente de
> l'apprentissage.

- `<motif>` → **R00X** (son compte d'occurrences vit dans `learned-rules.md`)

---

_Prochaine consolidation : au balayage mensuel, ou plus tôt si une gâchette du NOYAU §4 s'active._
_Prochaine évaluation : se lit dans `capabilities.md`, elle ne se recopie pas ici._
_Dernière mise à jour : `<jj/mm/aaaa>`._

[fin de operational-state.md]
