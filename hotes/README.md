# compagnon : guides d'hôte

> **À qui s'adresse ce dossier.** À qui installe une instance qui doit travailler **sans poste
> allumé** : une tâche programmée de nuit, dans le cloud, sur un dossier partagé. Une instance ne le
> lit pas en session : elle lit son `procedures.md`, dans lequel ces recettes ont été recopiées.

**À ne pas confondre avec `template/hotes/`.** Ici, un guide détaillé par **service** (un stockage,
un planificateur), recopié dans `procedures.md` à l'installation du mode sans poste. Là, une fiche
courte par **outil où l'agent tourne** (Claude, Codex, Gemini), posée dans `ai-memory/hotes/` et lue
d'office à chaque session sur cet outil. Les deux tiennent le même système de statuts.

Le NOYAU (§5quinquies) dit **quoi** faire sans poste : la prise en charge, le travail, le repli, le
retour. Il le dit pour tous les services. Ce dossier dit **comment**, service par service : les noms
d'outils, leurs pièges, les gestes qui marchent. C'est le critère de `procedures.md` : ce qui change
quand l'outil change est une procédure.

## Les guides

| Guide | Ce qu'il couvre |
|---|---|
| `google-drive.md` | Le dossier partagé sur Google Drive, par le connecteur Google Drive de Claude |
| `claude-taches-programmees.md` | Les tâches programmées de Claude qui tournent dans le cloud, sans ordinateur |

Un run de nuit a toujours besoin de deux choses : **où il travaille** (un stockage) et **ce qui le
lance** (un planificateur). Il faut donc un guide de chaque sorte.

## Comment on s'en sert

1. **À l'installation du mode sans poste** (`INSTALLATION.md`, étape 7), on recopie dans le
   `procedures.md` de l'instance les procédures des deux guides qui la concernent, **au format du
   schéma d'entrée** de ce fichier. On remplace les exemples par les identifiants réels de l'instance.
2. **Ensuite, l'instance les tient elle-même.** Chaque exécution met à jour sa ligne « Dernière
   exécution vérifiée » ; chaque surprise, sa ligne « Fragile ». La copie de l'instance devient la
   plus juste des deux, et c'est normal : c'est elle qui tourne.
3. **Ce qu'une instance découvre remonte ici** (`PUBLICATION.md`, R3 et R4). Un guide d'hôte ne
   s'écrit pas en lisant une documentation, il s'écrit en faisant tourner une instance.

## Le statut de chaque affirmation

Chaque recette porte l'un de ces statuts, et un seul :

- **Prouvé** : constaté sur une instance en service, avec la date et la source.
- **Constaté une fois** : vu, mais sur un seul essai. À traiter comme probable, pas comme acquis.
- **Non prouvé** : cru, lu ou déduit, jamais constaté. Un test est prévu ou à prévoir.

Une affirmation sans statut n'a pas sa place ici. Le jour où une recette cesse de marcher, elle ne se
corrige pas en silence : son statut change, avec la date et ce qui a été vu.
