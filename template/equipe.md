# equipe.md : Les agents que je coordonne

> **Gouvernance : zone MANUELLE.** <OPÉRATEUR> ajoute, retire et règle les membres. Le coordinateur
> propose, il n'écrit pas ici.
>
> **Ce fichier n'existe que chez un coordinateur** (NOYAU §5septies). De ses membres, le
> coordinateur ne lit que leur rapport et l'état de leur tâche programmée. Il n'écrit jamais chez
> eux (compagnon P12, P16).
>
> **Un seul niveau.** Un membre n'est jamais lui-même coordinateur.
>
> **Le canal de décision** s'ouvre par la relation elle-même (NOYAU §5octies) : ce membre te nomme
> dans sa ligne « Coordonné par », avec l'adresse de ton dossier d'échange. Ici, `Décisions` à `oui`
> le laisse ouvert, `non` le ferme pour ce membre. `Ce qu'il m'adresse` donne l'adresse de son
> `../handoff/<mon nom>/`, où il dépose ses missions `D`. Aucune ligne de `paire.md` n'est
> nécessaire.
>
> **`Relançable` dit si un membre peut être relancé, pas qui en décide.** `oui` : le coordinateur
> peut proposer une relance, et la faire seul si la capacité « Relance seule » de ce membre est
> ouverte dans `capabilities.md`. Même chose pour les autres actions sur sa tâche (test, suspension,
> texte), chacune avec sa capacité. `non` : il se lit, il ne se relance pas. Un membre sans tâche
> programmée est toujours `non`, et de même un membre dont l'hôte ne liste pas la tâche (une tâche
> locale à l'application de bureau, par exemple) : elle ne se déclenche pas d'ailleurs.
>
> **Un membre en lecture seule** entre ici pour être vu, rien de plus : `Relançable` et `Décisions` à
> `non`, `Tâche programmée` à `sans objet (lecture seule)`. Le coordinateur lit son rapport et le
> signale comme les autres (périmé, absent, en retard de version), sans jamais agir sur lui. C'est ce
> qui permet à la vue de coordination de montrer tout le parc d'un opérateur, pas seulement l'équipe
> qui travaille (`noyau/coordination.md`, point 11).
>
> **La colonne `Tâche programmée` porte l'identifiant tel que la liste des tâches le donne.** C'est
> de là que le coordinateur le tire pour déclencher : un nom ne suffit pas, deux tâches peuvent le
> porter. Le dossier se donne de même par son identifiant de stockage quand il n'a pas de chemin
> lisible depuis le cloud.

## Les membres

| Membre | Projet | Rapport | Tâche programmée | Passage attendu | Relançable | Décisions | Ce qu'il m'adresse | Depuis le |
|---|---|---|---|---|---|---|---|---|
| `<nom>` | `<nom du projet, et chemin ou identifiant de stockage du dossier>` | `<chemin du report.md>` | `<identifiant · nom>` ou `aucune` | `<ex. chaque jour avant 9h30>` | `oui` ou `non` | `oui` ou `non` | `<chemin ou identifiant de son ../handoff/<mon nom>/>` | `<jj/mm/aaaa>` |

## Ce que je remonte à <OPÉRATEUR>

`<Ce qui mérite son attention à chaque passage : un membre qui n'a pas tourné, un rapport périmé ou
partiel, une décision attendue, une version en retard. Et ce que je garde pour moi.>`

## Ma cadence

`<Quand je passe, et par quelle tâche programmée.>`

---

_Dernière mise à jour : `<jj/mm/aaaa>`._

[fin de equipe.md]
