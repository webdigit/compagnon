# compagnon : Migrations

Comment une instance déjà en service rattrape une nouvelle version du gabarit.

## Le principe

Une instance mélange deux choses : la **structure** qui vient du gabarit (schémas d'entrée, seuils de
maturation, rituel de session, gouvernance des zones manuelles) et le **contenu** qui appartient à
l'opérateur (ses règles, ses erreurs, ses cas, son état).

Une migration touche la structure et **ne touche jamais au contenu**. Elle ne se fait donc pas par
écrasement de fichiers : elle se fait en appliquant, un par un, les changements décrits ci-dessous.

C'est l'agent qui l'applique, en lisant ce document. **Il n'y a pas de script, et il n'y en aura
jamais** : c'est P11. Un procédé qui transforme une mémoire sans l'avoir lue et sans pouvoir dire ce
qu'il a changé n'est pas une migration, c'est une réécriture.

## Comment une instance connaît sa version

Chaque instance porte un fichier `ai-memory/VERSION.md` qui déclare la version du gabarit dont elle
est née, et l'historique de ses migrations. Une instance sans ce fichier est antérieure à la 0.3.0 :
traitez-la comme une **0.2.0** et appliquez tout ce qui suit.

## Se mettre à jour

Trois routes, par ordre de préférence. Une seule suffit.

| Route | Pour quel hôte | Ce qu'elle donne |
|---|---|---|
| **Le dépôt cloné** | Un hôte avec un shell : Claude Code, Cowork, un terminal | Le texte à l'étiquette, plus le commit exact, donc un rapport vérifiable |
| **Le web** | Un hôte qui sait lire une URL, un projet de chat par exemple | Le même texte, à la même étiquette, sans rien installer |
| **L'opérateur colle** | Un hôte qui n'a ni shell ni accès web | Le texte, sans traçabilité automatique |

La plupart des instances n'auront jamais de clone : la route web est la voie normale, la première
est celle de qui développe le gabarit.

### Où vit le clone

Le dépôt se clone **à côté** de l'instance, jamais dedans :

```
Projects/
  compagnon/          <- le clone du gabarit
  <votre projet>/
    ai-memory/        <- votre mémoire, elle n'est dans aucun dépôt
```

C'est cette séparation, et rien d'autre, qui rend un `git fetch` inoffensif : `ai-memory/` n'est
versioné par aucun dépôt, donc aucune opération git sur le clone ne peut atteindre votre contenu.
Un clone posé à l'intérieur du projet supprime cette garantie. La première mise à jour devient
capable d'écraser une mémoire, et on retombe exactement sur ce que P11 interdit.

### S'aligner sur une étiquette, pas sur `main`

`main` est l'atelier. Il porte le travail en cours, parfois non commité, qui ne correspond à aucune
version publiée. Une instance s'aligne toujours sur une **étiquette**, seule chose dont on puisse
dire à la fois le numéro et le contenu.

```
git fetch --tags
git tag -l                          # la liste des versions publiées
git show v0.5.6:MIGRATIONS.md       # le texte exact de cette version
```

`git show` lit un fichier à une étiquette **sans déplacer le clone** : pas de `checkout`, pas de
`HEAD` détaché à rattraper la fois suivante, et le clone reste utilisable pour la mise à jour
d'après. Le rapport de migration cite alors l'étiquette et le commit, ce qui le rend vérifiable par
quelqu'un d'autre que celui qui l'a écrit.

### Sans dépôt local : la route web

Le dépôt est public. N'importe quel hôte capable de lire une URL peut donc lire le même texte, à la
même étiquette, sans rien cloner ni installer. Aucune authentification.

**1. Trouver la dernière version publiée.**

```
https://api.github.com/repos/webdigit/compagnon/tags
```

La première entrée porte l'étiquette la plus récente. Deux replis si cette adresse est inaccessible :
la page `https://github.com/webdigit/compagnon/tags`, ou le premier titre `## [x.y.z]` de
`https://raw.githubusercontent.com/webdigit/compagnon/main/CHANGELOG.md`.

Ce dernier repli lit `main`, ce que la section précédente interdit. La nuance tient en une phrase :
on y prend un **numéro**, jamais un contenu. Et si l'étiquette annoncée par le changelog ne répond
pas à l'étape 2, c'est qu'elle n'est pas publiée : prenez la précédente.

**2. Lire le guide à cette étiquette.**

```
https://raw.githubusercontent.com/webdigit/compagnon/refs/tags/<étiquette>/MIGRATIONS.md
```

C'est ce fichier-ci, au mot près, tel qu'il était à la publication de cette version.

**3. Récupérer un fichier du gabarit, si la migration en demande un.**

```
https://raw.githubusercontent.com/webdigit/compagnon/refs/tags/<étiquette>/template/<fichier>.md
```

Rien d'autre ne passe par cette route. En particulier, **aucune écriture ne vient du web** : l'agent
lit un texte, décide, applique lui-même et rend compte. C'est P11, et la provenance du texte n'y
change rien.

### Ce que l'hôte doit fournir

Une des trois routes, pas davantage. Ce que l'agent ne fait **jamais**, c'est prétendre avoir
récupéré une version. S'il n'a pas pu lire le `MIGRATIONS.md` de la version visée, il le dit et
demande qu'on le lui fournisse. Une migration appliquée de mémoire n'est pas une migration.

### La procédure

Dites à votre agent, en session :

> « Mets-toi à jour par rapport au gabarit compagnon. »

Ce qu'il doit faire, dans cet ordre :

1. Lire `ai-memory/VERSION.md` pour connaître sa version courante.
2. Identifier la plus haute version publiée, par le dépôt cloné ou par le web.
3. Lire le `MIGRATIONS.md` **à cette étiquette**, jamais celui de `main` ni d'un arbre de travail.
4. Appliquer **dans l'ordre** toutes les migrations postérieures à sa version.
5. Pour chaque migration : appliquer le changement de structure, laisser le contenu intact, et
   **lister ce qui a été touché**.
6. Mettre à jour `ai-memory/VERSION.md`, en y inscrivant l'étiquette et le commit d'alignement.
7. Signaler ce qu'il **n'a pas** pu faire seul : les zones manuelles de l'opérateur, et tout ce qui
   se passe hors du disque, c'est-à-dire le champ d'instructions de l'hôte et sa base de
   connaissances.
8. **Terminer par un rapport de migration en deux listes** : ce qu'il a changé, et ce que
   l'opérateur doit faire lui-même. La seconde liste n'est jamais implicite, et le recollage du
   NOYAU y figure en tête chaque fois que le NOYAU a bougé.

Une migration ne se fait jamais en silence. Si l'agent ne peut pas dire précisément ce qu'il a
changé, il n'a pas migré, il a réécrit.

> **Format d'une ligne de migration, à tenir.** Toute ligne comporte quatre blocs, dans cet ordre :
> **ce qui change**, **ce que l'agent fait seul**, **ce que l'opérateur doit faire lui-même** (avec
> « rien » écrit noir sur blanc quand c'est rien), et **comment vérifier que c'est fait**.
>
> Le troisième bloc est celui qu'on oublie, et c'est celui qui décide si la migration prend effet :
> un NOYAU modifié mais non recollé ne change rien aux sessions. Un agent qui lit une ligne sans ce
> bloc n'a aucun moyen de deviner ce qui reste à faire hors du disque. <- posé le 07/09/2026.

> **Règle de publication, à tenir.** Avant de publier une version, comparer le gabarit stérile entre
> l'ancienne étiquette et la nouvelle :
>
> ```
> git diff v0.5.5..v0.5.6 -- template/
> ```
>
> Si `template/` a bougé et que la version n'a pas de ligne de migration qui en rend compte, elle
> n'est pas publiable. La prose dit ce que l'auteur a pensé à écrire ; le diff dit ce qui a
> réellement changé. Les quatre versions publiées sans ligne de migration auraient été arrêtées par
> ce contrôle. <- posé le 27/08/2026.

---

## 0.6.1 → 0.7.0

### Ce qui change

La mise à jour ne demande plus de dépôt cloné. Le dépôt étant public, un hôte qui sait lire une URL
lit le guide à l'étiquette, ce qui met la procédure à portée d'un projet de chat. Le NOYAU porte
désormais cette adresse, et toute ligne de migration dit explicitement ce qui reste à faire à la
main.

### Ce que l'agent fait seul

Remplacer la section **§6bis** du NOYAU de l'instance par sa version à cette étiquette
(`.../refs/tags/v0.7.0/template/NOYAU-instructions-projet.md`, section « 6bis »).

Ajouter aussi, dans le `VERSION.md` de l'instance, sous « Comment se mettre à jour », le renvoi à la
route web (deux phrases, même source). C'est tout. Aucun autre fichier n'est touché, aucun schéma,
aucun seuil, aucune règle de gouvernance.

### Ce que l'opérateur doit faire lui-même

**Recoller le NOYAU** dans le champ que son hôte injecte au démarrage. C'est le seul geste, et sans
lui la migration ne produit rien : les sessions continuent de lire l'ancienne copie.

### Comment vérifier

Ouvrez une session neuve et demandez : « d'où vas-tu chercher le guide de mise à jour du gabarit ? »

- Il cite une adresse `raw.githubusercontent.com/webdigit/compagnon/refs/tags/...` : c'est collé.
- Il parle d'un dépôt local, ou répond qu'il ne peut pas aller le chercher : le recollage n'a pas
  été fait, ou l'a été sur l'ancien texte.

---

## 0.6.0 → 0.6.1

**Rien à faire.** Édition typographique du dépôt : les tirets cadratins ont été remplacés par des
deux-points, des virgules ou des parenthèses. Aucun mot de doctrine, aucun seuil, aucune structure ne
change.

Cette ligne existe parce que `template/` a bougé et que la règle de publication l'exige. Si vous
alignez votre instance sur cette étiquette, vous pouvez passer la même revue sur vos propres
fichiers, ou ne rien faire : le gabarit ne l'impose pas.

**Ce que l'opérateur doit faire lui-même : rien.** Le NOYAU n'a pas bougé, il n'y a rien à recoller.

**Comment vérifier : rien à vérifier.**

---

## 0.5.6 → 0.6.0

**Migration facultative, et sans transformation de contenu.** Aucun schéma d'entrée, aucun seuil de
maturation, aucune règle de gouvernance ne change. `principles.md`, `learned-rules.md`,
`examples.md`, `mistakes.md`, `operational-state.md`, `objectives.md` et `capabilities.md` ne sont
**pas touchés**. Une instance qui ne fait rien de cette version reste correcte et reste à jour sur
tout le reste.

Ce que la 0.6.0 ajoute : un fichier `report.md`, une couche **INTERFACE** dans le gabarit, et le
principe **P12** qui la justifie : ce qui sort d'une instance est un rapport, jamais sa mémoire.

### 1. Trancher : cette instance produit-elle un rapport ? (opérateur)

Une seule question : **la sortie de cet agent est-elle lue par quelqu'un d'autre que son
opérateur ?** Un agent chapeau qui arbitre entre plusieurs instances, une revue hebdomadaire, une
autre équipe.

- **Non** → il n'y a rien à faire. Inscrivez simplement dans l'historique de `VERSION.md` :
  « 0.6.0 constatée, instance sans rapport de sortie ». Ce n'est pas un écart au gabarit : le fichier
  y est déclaré facultatif. Ne l'inscrivez donc pas dans « Écarts assumés ».
- **Oui** → appliquez les points 2 et 3.

### 2. Poser le fichier

Récupérez `template/report.md` **à l'étiquette** (`git show v0.6.0:template/report.md`), posez-le
dans `ai-memory/`, remplissez les chevrons, créez `_archive/rapports/`.

**N'écrivez aucun rapport rétroactif.** Le premier rapport se produit au prochain run réel. Un
rapport reconstitué de mémoire n'a ni vérification ni généalogie, et il sera lu comme un état
constaté (P5, P6).

### 3. Reporter la section §5bis dans le NOYAU, puis **recoller**

Ajoutez au NOYAU de l'instance la section **§5bis « Le rapport de sortie »**, la ligne « Interface »
dans la carte du cerveau, l'étape 7 du rituel de session, et la mention de `report.md` à l'étape 1.
Le texte de référence est dans `template/NOYAU-instructions-projet.md` à l'étiquette.

⚠️ **Puis recollez le NOYAU** dans le champ que votre hôte injecte au démarrage. Modifier le fichier
ne change rien aux sessions tant que la copie n'a pas été refaite. C'est l'oubli le plus courant.

Une instance qui ne produit pas de rapport **garde son NOYAU tel quel** : la section n'a pas d'objet,
et son absence n'est pas une divergence à consigner.

### Ce que l'opérateur doit faire lui-même

- Trancher le point 1 : cette instance produit-elle un rapport, oui ou non.
- Si oui, **recoller le NOYAU** après l'ajout du §5bis. C'est le geste qui décide de tout : un NOYAU
  modifié mais non recollé ne change rien aux sessions.

### Comment vérifier

Si l'instance produit un rapport : ouvrez une session neuve et demandez « que fais-tu en fin de run
qui a un livrable ? ». S'il cite `report.md`, le recollage a pris. Sinon, la copie injectée est
encore l'ancienne.

Si l'instance n'en produit pas : rien à vérifier, l'historique de `VERSION.md` suffit.

### Ce que cette migration ne fait pas

Elle ne déplace **rien**. Si des sujets métier traînent dans la section « Points chauds » de
`operational-state.md` (leur vraie place est désormais le rapport, cette section étant réservée à ce
qui bloque l'agent lui-même), l'agent les **signale** à l'opérateur et ne les déplace pas d'office.
C'est du contenu, il appartient à l'opérateur.

---

## 0.5.5 → 0.5.6

**Trois points : deux vérifications et une ligne à ajouter.** Aucun fichier de contenu n'est
transformé : `learned-rules.md`, `mistakes.md`, `examples.md` et `operational-state.md` ne sont pas
touchés.

### 1. La troisième copie du NOYAU

Le NOYAU vit à **deux** endroits : le fichier `ai-memory/NOYAU-instructions-projet.md`, et la copie
injectée au démarrage par votre hôte (le champ Instructions d'un projet claude.ai, le `CLAUDE.md`
d'un hôte qui en lit un). Pas trois.

Cherchez dans la base de connaissances de votre projet une copie du NOYAU déposée comme *document*,
et **retirez-la**. Un document n'est pas injecté au démarrage, donc il ne sert à rien ; mais il est
retrouvé par recherche, et il diverge dès la première modification du vrai NOYAU. Une version périmée
qui contredit la bonne sur les seuils de maturation est pire qu'une absence : l'agent n'a aucun moyen
de savoir laquelle fait foi.

Cette vérification est **hors du disque**. L'agent ne peut ni la faire ni la défaire seul, c'est
l'opérateur, dans l'interface de l'hôte. En revanche l'agent est le **seul** à pouvoir constater le
désaccord, parce qu'il est le seul à recevoir la copie injectée en même temps qu'il peut lire le
fichier. Demandez-lui de comparer les deux et de vous dire s'ils divergent.

### 2. Le numéro de version ne vit qu'à un endroit

Parcourez les fichiers de l'instance et retirez tout numéro de version du gabarit qui ne serait pas
dans `VERSION.md`, notamment en pied de `ai-memory/README.md`. Remplacez-le par un renvoi :
`voir VERSION.md`.

C'est P7. Un numéro dupliqué finit toujours par diverger, et une instance qui s'annonce en 0.3.0
alors que son `VERSION.md` dit 0.5.5 fait échouer sa propre migration suivante : l'agent qui cherche
son point de départ en trouve deux.

### 3. Tracer l'alignement dans `VERSION.md`

Ajoutez au tableau d'en-tête de `ai-memory/VERSION.md` une ligne **Alignée sur**, portant
l'étiquette et le commit court du dépôt sur lesquels l'instance vient d'être mise à jour :

```
| **Alignée sur** | `v0.5.6` au commit `abc1234` |
```

Sans elle, « je suis en 0.5.6 » est une déclaration ; avec elle, c'est un fait vérifiable par
quelqu'un qui n'était pas là.

### Ce que cette migration ne fait pas

Elle ne touche pas au **contenu**. Si des affirmations périmées traînent dans les fichiers de
l'instance (une consigne d'installation déjà exécutée, un état qui n'est plus vrai), l'agent les
**signale** à l'opérateur et ne les corrige pas d'office. Elles appartiennent à l'opérateur.

Trouvé le 27/08/2026 sur l'instance de référence, qui portait les deux défauts.

---

## 0.5.4 → 0.5.5

**Rien d'obligatoire côté instance.** La 0.5.5 ajoute un avertissement au NOYAU du gabarit ; le
reporter dans le vôtre est utile mais facultatif.

En revanche, retenez la règle qu'il énonce, parce qu'elle vaut pour **toutes** les migrations
futures : le fichier `NOYAU-instructions-projet.md` et la copie chargée par votre hôte sont deux
objets distincts. **Toute migration qui touche le NOYAU se termine par un recollage.**

---

## 0.5.2 → 0.5.4

**Un seul changement, dans le NOYAU de l'instance.**

Ajoutez en tête du NOYAU une section **« Où vit le dossier »** portant le **chemin complet** du
dossier du projet, puis **recollez le NOYAU** dans le champ que votre hôte injecte au démarrage.
Modifier le fichier ne suffit pas : c'est la copie collée dans les Instructions qui est lue.

Pourquoi : le NOYAU est la seule chose qu'une session neuve reçoit. S'il ne dit pas où est le
dossier, une session qui démarre sans dossier connecté ne peut pas le lire, et va chercher
l'information ailleurs, hors du projet. Rien d'autre ne change : aucun schéma, aucun seuil, aucune
règle de gouvernance.

---

## 0.3.0 → 0.5.2

**Rien à migrer côté instance.** Cette ligne existe pour que l'agent ne cherche pas.

Ce qui a bougé entre la 0.3.0 et la 0.5.2 concerne le dépôt, pas les mémoires en service : le
gabarit stérile `template/` (0.4.0), la licence et la déduplication du numéro de version (0.5.0), la
décision sur le nom (0.5.1), le bandeau d'avertissement du NOYAU du gabarit et le tableau des deux
fichiers homonymes (0.5.2). Aucun schéma d'entrée, aucun seuil, aucune règle de gouvernance n'a
changé.

Une instance née en 0.3.0 est donc **structurellement à jour en 0.5.2**. Mettez simplement à jour
son `VERSION.md`, en notant que la migration a été une constatation et pas une transformation.

> **Règle du document, à tenir.** Toute version publiée doit avoir sa ligne ici, **y compris quand
> elle ne demande rien**. Un intervalle muet est indiscernable d'un intervalle oublié, et un agent
> qui ne trouve pas sa version soit invente, soit abandonne. Les deux sont pires que « rien à
> faire ». ← trouvé le 27/08/2026, quatre versions publiées sans ligne de migration.

---

## 0.2.0 → 0.3.0

**Ajouté : `ai-memory/VERSION.md`.** Créez le fichier, déclarez la version d'origine de l'instance et
la date de cette migration. Sans lui, aucune migration future ne saura d'où partir.

Rien d'autre ne change dans les fichiers de mémoire. La 0.3.0 ajoute de la documentation au gabarit
(`INSTALLATION.md`, `MIGRATIONS.md`), pas de la structure aux instances.

---

## 0.1.0 → 0.2.0

Cette migration a du mordant : elle **déclasse** des règles. C'est voulu.

**P9 : l'échelle de statut des règles change.** Elle passe de quatre à cinq états :
`hypothèse → provisoire → active → en consolidation → archivée`.

À faire dans `learned-rules.md` :

- Toute règle née d'une **seule validation explicite** passe de `active` à **`provisoire`**.
- Ajoutez le statut `provisoire` au schéma d'entrée en tête de fichier.
- Réécrivez les seuils de maturation : `hypothèse → provisoire` sur une validation explicite ;
  `provisoire → active` sur deux usages de plus sans contradiction ; `provisoire → hypothèse` sur une
  contradiction.
- Inscrivez la conséquence exécutoire : **une règle provisoire ne peut pas être citée à l'appui d'une
  demande d'autonomie.**

**P10 : la confiance ne s'affiche plus sous trois occurrences.**

- Toute règle à moins de trois occurrences : remplacez la confiance chiffrée par **« non établie »**.
  Pas par un chiffre bas. « Non établie » et « faible » appellent des décisions opposées.
- Corrigez la définition de la confiance dans le schéma : au-delà de trois occurrences, c'est une
  mesure glissante du feedback des dix derniers usages, pas une probabilité.

**Dans le NOYAU de l'instance** : reportez la nouvelle chaîne de maturation et les nouveaux seuils.

**Dans `capabilities.md`** : ajoutez la condition « aucune règle provisoire citée en preuve » aux
demandes de montée de niveau.

**Ce que la migration ne fait pas.** Elle ne supprime aucune règle et n'en réécrit aucune. Elle
change leur **statut** et leur **confiance affichée**. Le contenu et la généalogie restent intacts.

**Signalez à l'opérateur** combien de règles ont été déclassées. C'est une information qu'il doit
avoir : son agent vient de perdre toutes ses règles mûres, et c'est le comportement correct.
