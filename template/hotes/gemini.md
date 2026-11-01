# hotes/gemini.md : Ce que Gemini sait faire ici

> **Statut : mémoire AUTO-ÉCRITE**, lue d'office à chaque session sous Gemini (NOYAU, « Ta fiche
> d'hôte »). Ce qu'elle contient est un constat d'outil, jamais une règle de jugement : elle complète
> le NOYAU, elle ne le desserre jamais. Chaque ligne porte un statut : **Prouvé** (constaté en
> service, avec la date et la source), **Constaté une fois**, ou **Non prouvé** (cru ou lu, jamais vu).
>
> **Deux parties, deux propriétaires.** « Du gabarit » vient du dépôt compagnon : une migration la
> remplace, l'agent n'y écrit pas. « Constaté ici » appartient à l'instance : l'agent y ajoute ce
> qu'il constate, une ligne et un statut chacun, et aucune migration n'y touche. Une ligne d'ici qui
> contredit une ligne du gabarit ne la remplace pas : les deux restent, et l'écart se signale à
> l'opérateur pour remonter au dépôt (ligne `ÉCART` du bloc de fin de session).

## Du gabarit

> **Aucune instance n'a encore tourné sous Gemini.** Cette partie est un emplacement. La première
> session réelle écrit ce qu'elle constate sous « Constaté ici », ligne par ligne, jamais ce que dit
> une documentation, et ces lignes remontent au dépôt.

### Comment je suis chargé

- `GEMINI.md` à la racine du projet. Non prouvé.

### Lire un fichier en entier

- Rien de constaté.

### Écrire

- Rien de constaté.

### Ce que cet hôte expose

- Rien de constaté.

### Ce que cet hôte n'expose pas

- Rien de constaté.

### Un geste que l'hôte refuse

Un refus de l'hôte (un outil qui refuse, une erreur d'autorisation, un « Self-Modification »)
s'écrit sous « Constaté ici », une ligne, avec le geste, le contexte (tâche programmée,
conversation, connecteur) et la date.

Un second refus du même geste dans le même contexte : la ligne devient **Désactivé**. Tu
n'essaies plus ce geste dans ce contexte, jusqu'à ce qu'un essai avec l'opérateur présent
montre que l'hôte l'accepte de nouveau. Alors la ligne passe à **Prouvé**, avec la date de
l'essai.

Un refus n'autorise aucun contournement. Le geste manquant se déclare non fait, avec sa raison.

## Constaté ici

_Rien encore._

[fin de gemini.md]
