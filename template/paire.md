# paire.md : Les agents avec qui je travaille en paire

> **Gouvernance : zone MANUELLE.** <OPÉRATEUR> crée, règle et retire les paires. L'agent propose,
> il n'écrit pas ici. Écrire une ligne ici, c'est accorder la boucle entre pairs : l'agent relève le
> dossier d'échange de son collègue et lui répond sans attendre <OPÉRATEUR> (compagnon P18). Rien
> d'autre ne s'accorde ici : ce que l'agent a le droit de faire reste dans `capabilities.md`.
>
> **Ce fichier n'existe que chez un agent qui travaille en paire** (NOYAU §5octies). Chaque agent
> de la paire a le sien, dans son propre dossier, écrit dans sa propre session. Aucun des deux
> n'écrit jamais chez l'autre.
>
> **Un projet, un agent.** Le collègue vit toujours dans un autre projet, avec sa propre mémoire. Un
> second hôte sur la même mémoire n'est pas un collègue : c'est le même agent.
>
> **Une ligne par collègue.** Un agent peut travailler avec plusieurs, pilote avec l'un et exécutant
> avec l'autre. Chez moi, chacun a son sous-dossier, `../handoff/<collègue>/`, et ne lit que lui.
>
> **Un rôle par paire.** Le `pilote` ouvre les missions, les revoit, les clôt, et escalade. L'
> `exécutant` les réalise dans le chantier et rend compte. Les deux fichiers d'une même paire disent
> la même chose, chacun de son côté : un écart entre eux se signale à <OPÉRATEUR>, il ne se tranche
> pas.
>
> **Les chemins se donnent tels qu'on les lit depuis le cloud** quand la paire tourne sans poste :
> un identifiant de stockage, pas un nom (NOYAU §5quinquies).

## Mes paires

| Collègue | Son projet | Ce qu'il m'adresse | Mon rôle | Chantier | Relais | Depuis le |
|---|---|---|---|---|---|---|
| `<nom>` | `<nom du projet, et chemin ou identifiant de stockage>` | `<chemin ou identifiant de son ../handoff/<mon nom>/>` | `pilote` ou `exécutant` | `<chemin ou identifiant du chantier, ou « aucun »>` | `<nom du coordinateur et chemin de son ../handoff/<pilote>-<exécutant>/, ou « aucun »>` | `<jj/mm/aaaa>` |

## Le chantier

`<Ce sur quoi la paire travaille, s'il existe un dossier pour ça : le dépôt d'un site, un dossier de
projet. Il n'est le dossier d'aucun agent. Qui y écrit (l'exécutant, dans les limites de son
capabilities.md), qui le lit (le pilote, sans y écrire). Sans chantier, écrire « aucun » : un
document vit alors là où son lecteur le cherche (NOYAU §5octies).>`

## Ce qui reste à <OPÉRATEUR>

`<Ce que la paire ne fait jamais sans son GO, en plus des interdits absolus : pousser, déployer,
écrire dans un système externe, envoyer. Une revue acceptée n'est jamais un GO.>`

## Ma cadence

`<Quand je relève le dossier de mon collègue, et par quelle tâche programmée.>`

---

_Dernière mise à jour : `<jj/mm/aaaa>`._

[fin de paire.md]
