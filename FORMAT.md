# FORMAT.md : ce que l'écran a le droit de lire

> **À lire avant de modifier un fichier de `template/`.** Ce document liste la part du format des
> fichiers de mémoire que l'écran de lecture interprète. Cette part est **contractuelle** : la
> changer casse l'écran de toutes les instances posées. Tout ce qui n'est pas listé ici est libre,
> et le restera.
>
> L'écran est un accessoire de lecture, pas un organe : une instance sans écran fonctionne à
> l'identique. Ce contrat n'existe donc pas pour contraindre la mémoire, il existe pour que
> l'accessoire ne devienne jamais une raison de ne pas faire évoluer le gabarit.

Version du contrat : **2**, introduite avec compagnon 0.14.0. La version 1 (0.13.0) reste lue sans
erreur : tout ce que la 2 ajoute est facultatif, et un fichier qui ne le porte pas s'affiche comme
avant.

---

## 1. Le principe

L'écran ne reçoit aucune interprétation. Il reçoit les fichiers de mémoire recopiés entiers et
verbatim dans `_ecran/etat.js`, et il les lit lui-même, dans le navigateur.

Trois conséquences, qui sont le cœur du dispositif :

1. **L'agent n'a aucun pouvoir d'omission.** Il ne choisit pas ce qui est affiché, il copie des
   fichiers nommés dans une liste fixe. Ce qu'il transporte, il le transporte en entier.
2. **Ce qui est affiché est vérifiable sur place.** Chaque section porte un bouton qui ouvre le
   texte brut du fichier dont elle est tirée. En cas d'écart entre l'écran et le fichier, c'est le
   fichier qui a raison, et l'écran le dit.
3. **Ce qui n'est pas lisible se déclare.** Un fichier non transporté s'affiche comme non
   transporté. Un fichier transporté mais dont rien n'a pu être lu s'affiche comme non lisible,
   avec un renvoi à sa source. L'écran n'invente jamais, et ne laisse jamais un blanc sans motif.

## 2. Ce que le dépôt livre

`ecran/compagnon.html` est l'écran lui-même. Il se copie **à la racine de l'instance**, à côté de
`ai-memory/`, et se remplace en migrant comme n'importe quel fichier du gabarit.

`ecran/etat.js` est un **état d'exemple**, celui d'une instance fictive. Il n'est pas copié dans une
instance : il sert à ouvrir l'écran depuis le dépôt et à voir ce qu'il donne, sans rien installer.
L'écran cherche son état à deux endroits, `_ecran/etat.js` d'abord puis `etat.js` à côté de lui, ce
qui fait fonctionner les deux cas avec un seul fichier.

Une instance ne reçoit donc aucun fichier d'amorçage. Tant que l'agent n'a pas régénéré son état,
l'écran affiche qu'il n'en a pas et pourquoi : c'est un état normal, et la page le dit pour que
personne n'y voie une panne.

## 3. Ce qui est transporté

| Fichier | Transporté | Pourquoi |
|---|---|---|
| `learned-rules.md` | oui | règles, hypothèses, contradictions |
| `mistakes.md` | oui | erreurs et frein de l'autonomie |
| `capabilities.md` | oui | grades, niveaux, interdits, registre |
| `operational-state.md` | oui | niveau courant, points chauds, journal |
| `principles.md` | oui | socle, court |
| `objectives.md` | oui | compétences visées |
| `VERSION.md` | oui | version du gabarit et écarts |
| `report.md` | oui, s'il existe | rapport de sortie, facultatif |
| `NOYAU-instructions-projet.md` | **non** | volumineux, et le plus spécifique du métier |
| `procedures.md` | **non** | chemins, comptes, parfois des identifiants |
| `examples.md` | **non** | non affiché |

Le motif du tri n'est pas le poids : `etat.js` complet reste indolore. Le motif est l'exposition.
`etat.js` est conçu pour être autoportant, donc c'est le fichier qui part par mail sans qu'on y
pense. Autant qu'il ne contienne ni le NOYAU ni les procédures.

L'écran affiche en pied de page ce qu'il a reçu et ce qu'il n'a pas reçu, pour qu'une absence se
voie au lieu de disparaître en silence.

## 4. Règle d'échappement de `etat.js`

Le contenu voyage dans des gabarits de chaîne. Dans chaque fichier recopié, l'agent échappe, dans
cet ordre : la barre oblique inverse, l'accent grave, puis la séquence dollar-accolade. Rien
d'autre n'est modifié : ni l'indentation, ni les accents, ni les emoji, ni les sauts de ligne.

## 5. Les blocs « Clé : valeur »

Utilisés par `learned-rules.md` et `mistakes.md`.

Une clé n'est reconnue que **en début de ligne**, indentation autorisée, **ou juste après un point
médian** `·`. Partout ailleurs, deux points au milieu d'une phrase restent de la ponctuation.

La valeur court jusqu'à la clé suivante, ce qui permet les valeurs sur plusieurs lignes, recollées
en un paragraphe, et plusieurs clés sur une même ligne séparées par `·`.

> **La seule chose à ne pas faire** : commencer une ligne de valeur par le nom d'une autre clé
> connue. La valeur serait coupée là. En pratique, indenter les continuations suffit à l'éviter,
> puisqu'une clé indentée reste une clé : c'est le mot lui-même qui est réservé, pas sa position.

### Clés d'une règle

`Domaine`, `Contexte`, `Règle`, `Origine`, `Statut`, `Score cumul`, `Score récent`, `Confiance`,
`Occurrences`, `Dernière conf`. Le titre du bloc est `## R### : <titre>`.

### Clés d'une erreur

`Fait`, `Pourquoi faux`, `Cause racine`, `Ce que je n'ai PAS fait, et qui aurait suffi`,
`Règle générée`, `Sévérité`, `Catégorie`, `Statut`, `Récidive`, `Date`. Le titre du bloc est
`## M### : <titre>`.

## 6. Les vocabulaires figés

Ce sont les seuls mots dont l'écran change le sens de ce qu'il affiche.

| Champ | Valeurs | Lecture |
|---|---|---|
| Statut d'une règle | `hypothèse`, `provisoire`, `active`, `en-consolidation`, `archivé` | premier mot du champ, gras ou non ; ce qui suit entre parenthèses est libre |
| Statut d'une erreur | `ouverte`, `corrigée`, `résolue` | idem |
| Date d'un statut | la mention `depuis le <jj/mm/aaaa>` accolée au statut | l'écran en tire l'ancienneté, mesurée par rapport à `arrete_le` et non par rapport à maintenant : il décrit un moment figé |
| Statut d'une capacité | le mot `OUVERT`, `DEMANDÉ`, `VERROUILLÉ` ou `SUR ACCORD` | lu sur le mot, pas sur l'emoji : les emoji peuvent changer sans rien casser |
| Décision au registre | la mention `en attente` | tout autre texte est affiché tel quel |
| Évaluation au registre | la cellule `Capacité` commence par `Évaluation`, suivie de l'identifiant de la compétence | la ligne va dans la file « Évaluations dues » au lieu de « Capacités demandées » |
| Grade | `stagiaire`, `junior`, `medior`, `senior`, `expert`, ou `non évaluée` | premier mot de la cellule, gras ou non ; le grade est relié à la grille par ce mot |
| Cadence d'un grade | « `<n>` jours, semaines, mois ou ans » et « `<n>` cas », dans n'importe quel ordre | l'écran calcule la prochaine échéance ; une partie absente ne déclenche rien |
| État d'une contradiction | la mention `Ouverte` | |

**Le cas le plus important du contrat : la confiance.** Le champ a deux formes, et deux seulement.

- `**non établie** (N occurrences sur M)` : l'écran affiche N points sur M et les mots « non
  établie ». Il n'affiche **jamais** de pourcentage, parce qu'une confiance non établie n'est pas
  une confiance basse. Sous trois occurrences, il n'y a rien à mesurer.
- un nombre décimal, virgule ou point : affiché tel quel.

Toute autre forme est affichée en clair sans être interprétée.

**La date du statut est facultative.** Une entrée écrite avant la convention, donc sans la mention
`depuis le`, reste parfaitement lisible : l'écran n'affiche simplement pas d'ancienneté. Aucune
migration de contenu n'est nécessaire, et aucune date ne doit être inventée pour faire propre.

L'écran n'assortit cette ancienneté d'aucun seuil ni d'aucune alerte. Le gabarit ne définit pas ce
qu'est une règle qui traîne, donc l'écran affiche le nombre et laisse le jugement à qui lit.

## 7. Les tableaux

L'écran lit les tableaux **par position de colonne**, pas par intitulé. Les intitulés peuvent donc
être réécrits librement ; l'ordre des colonnes, non.

| Où | Colonnes, dans l'ordre |
|---|---|
| `capabilities.md`, la grille | grade, pour y accéder, permet de demander, évaluation suivante |
| `capabilities.md`, grades actuels | compétence, grade, depuis le, accordé par |
| `capabilities.md`, un niveau | capacité, ce que ça permet, condition, statut, compétence (facultative) |
| `capabilities.md`, registre | date, capacité, décision, par, rappels (plusieurs dates séparées par des virgules) |
| `learned-rules.md`, hypothèses | id, hypothèse, origine, occurrences |
| `learned-rules.md`, contradictions | id, objet, état |
| `operational-state.md`, points chauds | numéro, sujet, attente |
| `operational-state.md`, journal des cas | numéro, date, sujet, corrections, trace, compétence |
| `VERSION.md`, écarts | référence, écart, raison |
| `VERSION.md`, historique | date, de vers, ce qui a été fait |
| `report.md`, fait | numéro, objet, référence, vérifié par, validé par |
| `report.md`, à faire | numéro, objet, référence, échéance, si repoussé, validé par |
| `report.md`, en attente | numéro, sujet, ce qui manque |

**Les lignes d'exemple du gabarit sont ignorées.** Une ligne est tenue pour un exemple dès qu'**une
seule** de ses cellules est un emplacement à remplir, c'est-à-dire du texte entièrement entouré de
chevrons, avec ou sans accents graves autour, ou un libellé commençant par `_ex`. Une vraie donnée
n'a jamais cette forme.

Le critère porte sur toutes les cellules et non sur la première, parce que la première est souvent
une date ou un numéro d'exemple qui, elle, ressemble à une vraie valeur. Sans cela, une instance
fraîchement posée afficherait une demande de capacité en attente qui n'existe pas et une
contradiction ouverte qu'elle n'a jamais eue, toutes deux venues du gabarit vierge.

## 8. Les titres de section

Repérés par **mot contenu**, pas par égalité stricte, ce qui laisse la formulation libre. Les mots
réservés : `Identité`, `Entretien`, `Points chauds`, `Journal des cas`, `Motifs ouverts`,
`Hypothèses`, `Contradictions`, `Interdits`, `Registre`, `Écarts`, `Historique`, `En un
paragraphe`, `Fait`, `À faire`, `En attente d'une décision`, `Non couvert`, et
`Niveau <n> : <titre>`, et depuis la version 2 du contrat `La grille` (en début de titre) et
`Grades actuels`.

## 8bis. Les compétences

Une compétence se reconnaît à **son premier mot**, jusqu'à l'espace, aux deux-points ou au point
médian : `C01 : revue de presse` et `C01` désignent la même. C'est ce premier mot qui relie « Grades
actuels », la colonne `Compétence` du journal des cas, celle des capacités et les lignes
`Évaluation · C01` du registre. La casse est indifférente.

**Ce que l'écran calcule, et ce qu'il ne décide pas.** Pour chaque compétence, il compte les cas du
journal postérieurs à `Depuis le` et ajoute la durée de la grille à cette date. Il en tire la
prochaine échéance, et il signale une évaluation que la grille dit due mais que le registre ne porte
pas. Il ne déclare jamais une évaluation faite, ni un grade changé : seul le registre le fait.
Quand le journal a été archivé en partie, le compte peut être trop bas ; le fichier fait foi.

## 9. Les identifiants

`R###` pour une règle, `M###` pour une erreur, `P###` pour un principe dur, `H-##` pour une
hypothèse, `C-##` pour une contradiction. Les deux premiers servent de titre de bloc, les autres
de première cellule de tableau.

## 10. Le front-matter du rapport

`report.md` s'ouvre sur un bloc entre deux lignes de trois tirets, en clés simples et listes à
puces indentées. Clés lues : `run`, `statut`, `arrêté_le`, `périmé_après`, `compétence`,
`autonomie`, `couvert`, `non_couvert`.

## 11. Ce que la construction de l'écran a révélé

Un écran qui lit vraiment les fichiers découvre ce que les fichiers ne disent pas. C'est son
deuxième usage, et il est écrit ici pour que les prochains relevés s'y ajoutent.

Trois manques relevés le 15/09/2026, en construisant la première version. Les trois sont corrigés
dans la 0.13.0 :

- une règle ne portait pas la date de son statut, donc rien ne distinguait une règle qui mûrit
  d'une règle qui stagne ;
- une erreur ne portait que la date de l'incident, alors que la rotation vers `_archive/` repose
  sur « résolue depuis longtemps » ;
- la colonne `Rappelé le` ne disait pas si elle gardait un rappel ou tous, alors que le nombre de
  rappels sans réponse est ce qui mesure l'attente.

Aucun n'était un défaut de l'écran. Tous étaient des endroits où le gabarit prévoyait une décision
fondée sur la durée, sans écrire la durée.
