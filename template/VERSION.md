# Version du gabarit

Cette instance déclare de quelle version du gabarit **compagnon** elle est née, et l'historique de
ses migrations. Ce fichier est lu au démarrage de toute migration : sans lui, on ne sait pas d'où
partir.

| | |
|---|---|
| **Gabarit** | compagnon |
| **Version courante** | **<VERSION D'ORIGINE, ex. 0.3.0>** |
| **Dépôt de référence** | `https://github.com/webdigit/compagnon.git` |
| **Copie locale** | `<chemin, si le dépôt est cloné à côté>` |
| **Instance** | `<nom de l'agent>`, `<opérateur>`, `<organisation>` |
| **Posée le** | `<jj/mm/aaaa>` |
| **Alignée sur** | `<étiquette, ex. v0.5.6>` au commit `<sha court>` |

## Comment se mettre à jour

Sur demande de l'opérateur (« mets-toi à jour par rapport au gabarit »), récupérer les étiquettes du
dépôt, identifier la plus haute version publiée, lire son `MIGRATIONS.md` **à cette étiquette**
(`git show <tag>:MIGRATIONS.md`, jamais l'arbre de travail), et appliquer **dans l'ordre** toutes les
migrations postérieures à la version ci-dessus.

La migration touche la **structure**, jamais le **contenu**. Elle est appliquée par l'agent qui lit
les notes, jamais par un script (P11). Puis mettre ce fichier à jour, y compris la ligne
**Alignée sur**, et **lister ce qui a été touché**. Une migration silencieuse est une réécriture.

## Historique

| Date | De → vers | Ce qui a été fait |
|---|---|---|
| `<jj/mm/aaaa>` | — → `<version>` | Pose initiale de l'instance. |

## Écarts assumés par rapport au gabarit

Aucun à ce jour. Si cette instance diverge volontairement du gabarit sur un point, il se note ici,
avec sa raison. **Un écart non écrit est un écart qui sera écrasé à la prochaine migration.**
