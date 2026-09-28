# compagnon : Migrations

Comment une instance déjà en service rattrape une nouvelle version du gabarit.

## Le principe

Une instance mélange deux choses : la **structure** qui vient du gabarit (schémas d'entrée, seuils de
maturation, rituel de session, gouvernance des zones manuelles) et le **contenu** qui appartient à
l'opérateur (ses règles, ses erreurs, ses cas, son état).

Une migration touche la structure et **ne touche jamais au contenu**. Elle ne se fait donc pas par
écrasement de fichiers : elle se fait en appliquant, un par un, les changements décrits ci-dessous.

C'est l'agent qui l'applique, en lisant ce document. **Il n'y a pas de script, et il n'y en aura
jamais** : c'est compagnon P11. Un procédé qui transforme une mémoire sans l'avoir lue et sans pouvoir dire ce
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
capable d'écraser une mémoire, et on retombe exactement sur ce que compagnon P11 interdit.

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
lit un texte, décide, applique lui-même et rend compte. C'est compagnon P11, et la provenance du texte n'y
change rien.

### Ce que l'hôte doit fournir

Une des trois routes, pas davantage. Ce que l'agent ne fait **jamais**, c'est prétendre avoir
récupéré une version. S'il n'a pas pu lire le `MIGRATIONS.md` de la version visée, il le dit et
demande qu'on le lui fournisse. Une migration appliquée de mémoire n'est pas une migration.

### La procédure

Dites à votre agent, en session :

> « Mets-toi à jour par rapport au gabarit compagnon. »

Ce qu'il doit faire, dans cet ordre :

0. **Si l'instance n'a pas encore de `noyau-local.md`, faire d'abord l'extraction** décrite dans
   la migration 0.15.0 → 0.15.1, **avant toute autre migration**, même plus ancienne. C'est la
   seule exception à l'ordre : les migrations qui précèdent remplacent des sections du NOYAU, et
   elles écraseraient ce qui n'en a pas encore été sorti.
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

> **Les règles d'écriture du gabarit ne sont pas ici.** Trois d'entre elles vivaient dans ce
> fichier, que seules les instances ouvrent : la règle des exemples, le format en quatre blocs d'une
> ligne de migration, et le contrôle du diff de `template/` avant publication. Elles s'adressent à
> qui écrit le gabarit, et elles sont désormais rassemblées dans `PUBLICATION.md`, à la racine du
> dépôt. <- déplacées le 09/09/2026, en 0.11.0.

---

## 0.18.0 → 0.19.0

### Ce qui change

**Une évaluation qui ne peut rien changer ne mobilise plus l'opérateur.** Jusqu'ici, toute
évaluation due produisait le même dossier et la même séance, y compris quand le compte montrait
d'avance qu'aucune montée, aucune rétrogradation et aucune fermeture n'étaient possibles. Le NOYAU
définit désormais l'évaluation **sans issue** (§6ter, point 1bis), sur quatre conditions qui se
comptent, et ce qu'elle devient (point 1ter) : une ligne de constat, une cellule `sans issue :
<critère bloquant>` au registre, un compte refait en silence à chaque session, et le passage à
`en attente` le jour où il change. `Depuis le` ne bouge pas. Le rituel (§0, point 3) applique ce
test avant de signaler, et la passe de contrôle (§4bis, point 5) vérifie qu'aucune ligne sans issue
ne dort.

**Les échéances de volume par défaut sont relevées** : stagiaire, junior et medior couvrent
désormais l'écart de cas jusqu'au grade suivant. La grille gagne une consigne de calibrage sur le
volume réel.

**L'écran** passe au contrat 5 : une évaluation `sans issue` s'affiche en veille, hors de la file
« Évaluations dues ».

Aucun fichier nouveau, aucune section retirée.

### Ce que l'agent fait seul

- **NOYAU** : le remplacer en entier par celui de cette étiquette, trous remplis à l'identique.
  Passages qui changent : §0 point 3 (le test avant de signaler), §4bis point 5, §5 (ligne
  `ÉVALUATION DUE` du bloc de fin de session), §6ter points 1bis et 1ter (nouveaux), 2, 3 et 7.
- **`noyau-local.md`** : ne pas y toucher. Si une spécificité complète le §0 point 3 ou le §6ter,
  la relire contre le nouveau texte et la signaler à l'opérateur si elle n'a plus de sens. Un
  complément qui **durcit** l'évaluation (par exemple, un dossier complet exigé même sans issue)
  reste valable et l'emporte : le local peut durcir, jamais desserrer.
- **`capabilities.md`**, structure seulement : reporter le paragraphe « Une évaluation qui ne peut
  rien changer » dans le bandeau des grades, le paragraphe « Une évaluation sans issue s'inscrit
  aussi » dans le bandeau du registre, et la ligne de pied qui passe de trois à quatre exceptions.
  **Ne pas toucher aux valeurs de la grille**, ni aux lignes du registre existantes.
- **La grille, proposée et non écrite.** C'est une zone manuelle. Comparer la colonne « Évaluation
  suivante » de l'instance à celle de cette étiquette, et montrer à l'opérateur, grade par grade :
  sa valeur, celle du gabarit, et le volume réel de la compétence (cas au journal par semaine). Si
  l'instance a déjà ajusté ses valeurs, les siennes restent : on les montre, on ne propose rien de
  plus que la comparaison. La consigne de calibrage entre dans le texte au-dessus du tableau, elle,
  puisque c'est de la structure.
- **Les évaluations en attente**, au registre. Pour chaque ligne `Évaluation · … en attente`, faire
  le test du §6ter point 1bis. Une évaluation qui s'avère sans issue est **montrée à l'opérateur**
  avec son critère bloquant ; sur son accord, sa cellule passe à `sans issue : <critère>`. Sans son
  accord, elle reste `en attente`. Aucune ligne ne change de statut en silence.
- **Si l'instance a un écran** : remplacer `compagnon.html` par celui de cette étiquette, et mettre
  la ligne `Écran` de `VERSION.md` à jour. `etat.js` ne change pas de forme.

### Ce que l'opérateur doit faire lui-même

- **Recoller, NOYAU puis spécificités**, et vérifier le marqueur `[fin de noyau-local.md]`. Tant
  que ce n'est pas fait, les sessions continuent de préparer un dossier pour chaque évaluation due.
- **Trancher la grille** : garder ses échéances ou reprendre celles du gabarit, grade par grade.
- **Valider** le passage à `sans issue` des évaluations déjà en attente, ligne par ligne.

### Comment vérifier

**Le texte** : le NOYAU recollé porte les points 1bis et 1ter au §6ter ; `capabilities.md` porte
les deux paragraphes et le pied à quatre exceptions ; la grille porte les valeurs que l'opérateur a
choisies, et pas d'autres.

**La suite** : à la prochaine évaluation due dont le compte bloque la montée, sur une compétence
stagiaire sans capacité au-dessus du niveau 1, l'agent dit une ligne au lieu de préparer un dossier,
et le registre porte `sans issue : <critère>`. À la session suivante, il n'en reparle pas. Le jour
où le critère est rempli, la ligne passe `en attente` et le dossier est préparé. Une récidive sur
une compétence junior ou au-delà produit toujours un dossier.

**L'écran**, s'il est posé : la ligne sans issue apparaît en veille sous « Évaluations dues », et
n'est comptée ni dans la file ni comme non inscrite.

---

## 0.17.0 → 0.18.0

### Ce qui change

**Le récit va au journal, l'état garde une ligne.** Le fichier de journal d'une session (0.17.0)
gagne trois sections : « Décisions de l'opérateur », « Clos » et « Détails ». Un point chaud tranché
sort de l'état tout de suite. Les observations reçoivent une section à elles dans
`operational-state.md`, une ligne chacune. Le registre de `capabilities.md` ne garde que la décision
et un renvoi, et les conditions restent au catalogue.

Aucun fichier nouveau dans le gabarit, aucune section retirée. L'écran garde le contrat 4, mais
il est corrigé : depuis la 0.17.0, il ne comptait pas les cas des fichiers de `journal/`.

### Ce que l'agent fait seul

- **NOYAU** : le remplacer en entier par celui de cette étiquette, trous remplis à l'identique.
  Passages qui changent : §3 (ligne **O**), §5 (bloc de fin de session, format du fichier de
  journal, « Le récit va ici, l'état garde une ligne », session sans cas), §6ter point 4.
- **`operational-state.md`** : reporter les bandeaux de cette étiquette (en-tête, « Points chauds »)
  et ajouter la section « Observations » avant « Motifs ouverts ». Structure seulement.
- **`capabilities.md`** : reporter le paragraphe « Une ligne dit qui a décidé quoi » dans le
  bandeau du registre. Structure seulement.
- **`README.md`** : reporter les deux lignes du tableau des fichiers (`operational-state.md`,
  `journal/`).
- **Si l'instance a un écran** : remplacer `compagnon.html` par celui de cette étiquette, et mettre
  la ligne `Écran` de `VERSION.md` à jour. `etat.js` ne change pas de forme.

### Le rangement : l'agent propose, l'opérateur valide

C'est la seule partie de cette migration qui déplace du contenu. Elle ne se fait ni par script ni
sans accord (compagnon P11), et **rien ne se reformule sans que le texte d'origine soit conservé
intact** au journal.

1. **Lire en entier**, marqueur compris, par la voie brute : `operational-state.md` et
   `capabilities.md`.
2. **Préparer le fichier de journal de la session de migration** (format du NOYAU §5), sans le
   créer encore :
   - dans « Clos », chaque point chaud déjà tranché (barré, « fait », « clos », « à retirer »),
     **texte d'origine complet** ;
   - dans « Décisions de l'opérateur », pour chaque ligne du registre dont une cellule dépasse une
     phrase, **la ligne d'origine complète**, sous un numéro D ;
   - dans « Détails », pour chaque observation qui dépasse une ligne, **son texte d'origine
     complet**, sous son identifiant.
3. **Préparer les nouvelles versions** : l'état sans les points clos, avec ses observations sur
   une ligne chacune (renvoi vers « Détails ») dans la section « Observations » ; le registre avec
   des lignes courtes qui renvoient à leur D. Une condition qui n'était écrite qu'au registre monte
   dans la colonne `Condition` de sa capacité, au catalogue.
4. **Montrer à l'opérateur**, avant toute écriture : chaque ligne du registre, avant et après, **une
   par une**, puisque c'est une zone manuelle ; puis la liste des points clos et des observations
   raccourcies. Il valide, corrige ou refuse ligne par ligne. Une ligne refusée reste telle quelle.
5. Sur son accord : **créer** le fichier de journal, le **relire** par la voie brute et vérifier que
   chaque texte retiré s'y retrouve à l'identique, et que son marqueur est la dernière ligne.
6. **Seulement alors**, remplacer `operational-state.md` et `capabilities.md` (§5quater, nom
   provisoire sur un hôte en création seule), en un lot. Les anciennes versions partent dans
   l'archive.
7. Le bloc de fin de session dit combien de points sont sortis, combien de lignes du registre ont
   été raccourcies, combien d'observations, et le nom du fichier de journal.

Si un texte retiré ne se retrouve pas à l'étape 5, on s'arrête : rien n'est remplacé, le fichier de
journal reste pour comparaison, et l'opérateur tranche.

### Ce que l'opérateur doit faire lui-même

- **Recoller, NOYAU puis spécificités**, et vérifier le marqueur `[fin de noyau-local.md]`.
- **Valider le rangement**, ligne par ligne pour le registre (étape 4 ci-dessus).

### Comment vérifier

**Le rangement** : « Points chauds » ne porte plus aucune ligne barrée ni close ; chaque ligne du
registre tient en une phrase par cellule, et son renvoi D se retrouve dans le fichier de journal ;
chaque observation tient sur une ligne. `operational-state.md` et `capabilities.md` sont plus courts
qu'avant, et rien de ce qui en est sorti n'a disparu : tout est au journal ou dans l'archive.

**L'écran**, s'il est posé : le nombre de cas qu'il affiche pour une compétence est celui du
journal.

**La suite** : à la prochaine décision de l'opérateur, ses mots entrent au journal de la session et
la ligne du registre y renvoie. Au prochain point chaud tranché, il sort de l'état dans la même
écriture.

---

## 0.16.1 → 0.17.0

### Ce qui change

**Le journal des cas sort d'`operational-state.md`.** Il vit désormais dans `ai-memory/journal/`,
un fichier par session, créé une fois et jamais réécrit. `operational-state.md` redevient un état
court, et son remplacement ne recopie plus tout l'historique dans l'archive. L'évaluation compte
les cas dans `journal/`.

**L'archive se range par mois**, pour ce qui y entre désormais.

**L'écran passe au contrat 4** : il lit les cas dans `journal/`.

### Ce que l'agent fait seul

- **NOYAU** : le remplacer en entier par celui de cette étiquette, trous remplis à l'identique.
  Passages qui changent : §0 point 3 (compte des cas), §5 (bloc de fin de session, « Le journal des
  cas », `_archive/` par mois), §5ter point 2, §5quater (sous-dossiers du mois, « Intégrer »
  point 3bis, « Laquelle, et quand »).
- **`capabilities.md`, `mistakes.md`, `README.md`** : reporter les phrases qui renvoyaient au
  « journal d'`operational-state.md` » (texte de cette étiquette). Structure seulement.
- **Si l'instance a un écran** : remplacer `compagnon.html` par celui de cette étiquette ; à la
  prochaine régénération, transporter aussi chaque fichier de `journal/`.

### Le transfert du journal : l'agent propose, l'opérateur valide

C'est la seule partie de cette migration qui déplace du contenu. Elle ne se fait donc ni par script
ni sans accord (compagnon P11).

1. **Lire `operational-state.md` en entier**, marqueur compris, par la voie brute.
2. **Préparer** `ai-memory/journal/<AAAA-MM-JJ-HHMM>-reprise.md`, au format du NOYAU §5 : toutes
   les lignes du journal des cas, **telles quelles**, dans leur ordre, sans rien renuméroter ni
   reformuler. En tête, une ligne dit d'où elles viennent et à quelle date.
3. **Montrer à l'opérateur** : le nombre de lignes, le premier et le dernier numéro, et le fichier
   préparé. Rien ne s'écrit avant son accord.
4. Sur son accord : **créer** le fichier de reprise, le **relire** par la voie brute et vérifier que
   chaque ligne du journal d'origine s'y retrouve à l'identique, et que son marqueur est la dernière
   ligne.
5. **Seulement alors**, remplacer `operational-state.md` (§5quater, nom provisoire sur un hôte en
   création seule) par une version où la section « Journal des cas » devient « Cas traités » (texte
   de cette étiquette), avec le dernier numéro et le nom du fichier de reprise. Le reste du fichier
   ne change pas. L'ancienne version part dans l'archive : c'est elle qui garde la preuve.
6. Le bloc de fin de session liste le transfert : combien de lignes, de quel numéro à quel numéro.

Si une ligne ne se retrouve pas à l'étape 4, on s'arrête : `operational-state.md` n'est pas touché,
le fichier de reprise reste pour comparaison, et l'opérateur tranche.

### Ce que l'opérateur doit faire lui-même

- **Recoller, NOYAU puis spécificités**, et vérifier le marqueur `[fin de noyau-local.md]`.
- **Valider le transfert du journal** (étape 3 ci-dessus).
- **Ne rien déplacer dans `_archive/`** : l'ancien reste où il est, seul ce qui entre désormais se
  range par mois.

### Comment vérifier

**Le transfert** : `operational-state.md` ne porte plus de tableau de cas, sa section « Cas
traités » nomme le fichier de reprise, et ce fichier contient toutes les lignes d'avant.

**La suite** : après une session qui traite un cas, un nouveau fichier apparaît dans `journal/`,
et `operational-state.md` n'a été remplacé qu'une fois pour cette session.

**Les grades** : demandez où en est l'évaluation d'une compétence. Le nombre de cas annoncé doit
être le même qu'avant la migration.

---

## 0.16.0 → 0.16.1

### Ce qui change

**Un remplacement ne fait plus jamais coexister deux fichiers du même nom.** La nouvelle version
naît sous un nom provisoire, `<nom>.nouveau-<AAAA-MM-JJ-HHMM>.<ext>`, l'ancienne est archivée, puis
seulement la nouvelle prend le vrai nom. Sans cela, un stockage synchronisé renomme la nouvelle
version en local (`mistakes (1).md`) et la session suivante ne la trouve plus.

**Un fichier introuvable se cherche par son marqueur, et ne se recrée jamais.**

**Le remplacement se fait par lot**, pour que l'archive ne grossisse pas d'une copie entière à chaque
ligne ajoutée.

### Ce que l'agent fait seul

- **NOYAU** : le remplacer en entier par celui de cette étiquette, trous remplis à l'identique.
  Passages qui changent : §5 (« Le marqueur de fin », premier point), §5quater (« Le remplacement »
  et « Laquelle, et quand »), §5quater « L'écran », §5quinquies (point 6 de la prise en charge,
  tableau du repli).
- **Si l'instance a une procédure de remplacement** dans `procedures.md` (celle du guide Google
  Drive, par exemple) : **proposer** à l'opérateur de la réécrire dans le nouvel ordre, d'après
  `hotes/google-drive.md` de cette étiquette, en gardant ses propres lignes « Fragile » et
  « Dernière exécution vérifiée ». Rien ne s'y écrit sans lui.
- **Chercher les fichiers déjà touchés**, en lecture seule : dans `ai-memory/`, `_ecran/` et à la
  racine, tout fichier dont le nom porte un suffixe « (1) », « (2) »… et tout fichier
  `*.nouveau-*`. Pour chacun : quel est son marqueur (ou, pour un `.js`, à quel fichier il
  correspond), existe-t-il aussi sous son vrai nom. **Ne rien renommer, ne rien recréer** : le
  signaler à l'opérateur dans l'état des lieux, fichier par fichier.

### Ce que l'opérateur doit faire lui-même

- **Recoller, NOYAU puis spécificités**, et vérifier le marqueur `[fin de noyau-local.md]`.
- **Si des fichiers portent un suffixe « (1) » en local** : vérifier d'abord sur le Drive (site web)
  que le fichier y porte bien son vrai nom. Puis, en local, renommer `<nom> (1).md` en `<nom>.md`,
  seulement s'il n'existe aucun autre `<nom>.md` dans le dossier. Revérifier ensuite sur le Drive
  que le titre et le fichier sont inchangés. Ce geste n'est pas encore prouvé (guide Google Drive,
  test T21) : le faire d'abord sur un seul fichier.
- **Pour un écran** : si `_ecran/etat (1).js` existe, l'écran ne se met plus à jour tant qu'il ne
  s'appelle pas `etat.js`. Même geste.

### Comment vérifier

**Le nouvel ordre** : faites faire un remplacement par le connecteur (en session, opérateur présent).
Pendant qu'il tourne, le dossier ne doit jamais montrer deux fichiers du même nom ; à la fin, le
fichier doit apparaître en local sous son vrai nom, sans suffixe (test T20).

**Le fichier introuvable** : en session locale, demandez à l'agent de lire un fichier de mémoire dont
le nom local porte « (1) ». Il doit le trouver par son marqueur, le dire, et ne rien créer.

---

## 0.15.2 → 0.16.0

### Ce qui change

**Un agent peut travailler la nuit, ordinateurs éteints, et rendre compte au réveil.** Jusqu'ici,
compagnon savait quoi faire de ce qu'une nuit ne peut pas écrire (0.15.0) et de ce qu'elle lit mal
(0.15.2). Il ne disait pas comment tenir un run entier sans personne : comment démarrer, quoi faire
quand un connecteur tombe ou qu'une autre session écrit en même temps, comment laisser un retour que
l'opérateur lit en une minute. C'est l'objet du nouveau NOYAU §5quinquies, en quatre temps : la prise
en charge, le travail, le repli, le retour.

**Le générique dans le NOYAU, le concret dans des guides d'hôte.** Le NOYAU dit quoi faire pour tout
service. Le nouveau dossier `hotes/` du dépôt dit comment, service par service (Google Drive, tâches
programmées de Claude), avec pour chaque affirmation un statut : prouvé, constaté une fois, non
prouvé. Ses procédures se recopient dans `procedures.md` à l'installation du mode sans poste.

**Le dépôt de nuit s'ouvre sur un compte rendu**, et la session suivante commence par le dire à
l'opérateur, avant d'intégrer.

**« Où vit le dossier » gagne une ligne** : le stockage partagé et l'identifiant du dossier. C'est la
seule chose qu'un run de nuit a pour trouver sa mémoire.

### Ce que l'agent fait seul

- **NOYAU** : le remplacer en entier par celui de cette étiquette, trous remplis à l'identique. Le
  nouveau trou « Stockage partagé » se remplit avec ce que l'instance sait déjà (un identifiant de
  dossier déclaré dans `noyau-local.md`, par exemple), sinon `aucun`. Les passages qui changent :
  « Où vit le dossier », §0 point 0, §5quater (point 0 du dépôt), et le nouveau §5quinquies.
- **Si l'instance travaille déjà sans poste** : comparer ses procédures au guide d'hôte de cette
  étiquette, et **proposer** à l'opérateur ce qui y manque, sans rien retirer de ce qu'elle a
  constaté elle-même. Ce qu'elle sait et que le guide ne dit pas se signale : c'est une remontée
  (`PUBLICATION.md`, R4).
- **Si `noyau-local.md` porte un ordre d'accès** ou des règles de travail sur dossier partagé, relire
  ce complément contre le §5quinquies et signaler ce qui fait double emploi. Rien ne s'y écrit sans
  l'opérateur.

### Ce que l'opérateur doit faire lui-même

- **Recoller, NOYAU puis spécificités**, et vérifier le marqueur `[fin de noyau-local.md]`.
- **Décider** si l'instance passe en mode sans poste. Si oui : `INSTALLATION.md`, étape 7, recette
  comprise. Sinon : rien d'autre.

### Comment vérifier

**La prise en charge** : lancez une tâche programmée dans le cloud. Son dépôt doit commencer par un
compte rendu, et noter l'heure réelle, l'accès utilisé, l'état des connecteurs, le nombre d'éléments
listés et l'absence (ou la présence) d'une autre session.

**Le retour** : à la session suivante, l'agent doit vous dire ce compte rendu avant toute autre
chose.

**Le test qui compte vraiment** : lancez deux tâches à la même minute sur le même dossier. Aucune ne
doit remplacer un fichier de mémoire. Si l'une le fait, le point 6 de la prise en charge n'est pas lu.

---

## 0.15.1 → 0.15.2

### Ce qui change

**Une lecture incomplète ne fonde plus rien.** Un outil de lecture peut rendre un fichier amputé de
sa fin sans le signaler : un aperçu, une extraction de texte, un champ d'instructions trop court. Le
fichier est intact, mais l'agent ne le sait pas. S'il décide sur ce texte, il décide sur une logique
tronquée ; s'il réécrit le fichier à partir de lui, la nouvelle version perd la fin, l'ancienne part
en archive, et la perte est scellée. Le contrôle du remplacement (0.15.0) ne la voyait pas : il
comparait deux lectures faites par la même voie, qui perdaient la même ligne, et concluait
« identique ». Le défaut a été trouvé par une instance en service, sur un run de nuit.

**Chaque fichier finit par un marqueur** qui porte son nom, seul sur sa dernière ligne :
`[fin de capabilities.md]`. Du texte, pas une balise, pour qu'aucun outil ne le retire. C'est la
seule chose qui distingue un fichier complet d'un fichier coupé.

**À la lecture** (NOYAU §0, point 1) : un fichier sans marqueur se relit par une autre voie. S'il en
manque encore, il est suspect : l'agent n'y écrit pas, ne réécrit rien à partir de lui, et passe la
session en proposition seule. Si c'est `capabilities.md`, tout est fermé.

**À l'écriture** (NOYAU §5, « Le marqueur de fin ») : on écrit avant le marqueur, jamais après. Une
réécriture complète part d'une lecture complète faite juste avant, met l'ancienne version à l'abri
avant de la perdre, se relit par la voie brute, et retrouve chaque ligne de l'ancienne ; toute
ligne retirée figure dans le bloc de fin de session. Le remplacement du §5quater gagne une étape 0
(lire l'ancienne en entier) et son étape 2 devient ce contrôle.

**Au collage** : le texte chargé par l'hôte doit porter `[fin de NOYAU-instructions-projet.md]`
avant les spécificités et `[fin de noyau-local.md]` à la fin. Sinon il a été coupé.

### Ce que l'agent fait seul

- **NOYAU** : le remplacer en entier par celui de cette étiquette, trous remplis à l'identique. Le
  point 1bis du §6bis garantit qu'il ne porte plus rien de local. Les passages qui changent : le
  paragraphe « Tes spécificités », le §0 point 1, le §4bis point 9, le §5 « Le marqueur de fin », le
  §5quater (dépôt points 2 et 5, remplacement étapes 0, 2 et 4, repli, intégration point 2), et le
  marqueur final.
- **Poser les marqueurs**, fichier par fichier, dans `ai-memory/` : `README.md`, `VERSION.md`, les
  mémoires, le pilotage, `procedures.md` et `report.md` s'ils existent. Pour chacun, dans cet ordre :
  1. le lire **par la voie brute**, en entier ;
  2. vérifier que sa fin est intacte : la dernière ligne a la forme de celle du gabarit à cette
     étiquette (en général « Dernière mise à jour »), et elle ne s'arrête pas au milieu d'une phrase
     ou d'un tableau. En cas de doute, **s'arrêter** : montrer à l'opérateur les cinq dernières
     lignes et les comparer à la dernière version du fichier dans `_archive/`. Rien ne se pose sur
     une fin douteuse ;
  3. ajouter une ligne vide puis `[fin de <nom du fichier>]` ;
  4. relire : le marqueur est la dernière ligne, et rien d'autre n'a bougé.
- **`principles.md` et `noyau-local.md`** sont des zones manuelles, et aucune migration ne touche à
  `noyau-local.md` : pour ces deux-là, l'agent **propose** le marqueur et ne l'écrit qu'avec l'accord
  explicite de l'opérateur, comme n'importe quelle ligne de ces fichiers.
- **Hôte en création seule** (Google Drive par exemple) : poser un marqueur, c'est remplacer le
  fichier. Ça se fait dans une session avec l'opérateur, par le remplacement du §5quater, jamais de
  nuit.
- **`README.md`** de l'instance : ajouter la règle d'or 11.
- **`procedures.md`** : si l'hôte a une voie de lecture qui coupe (un aperçu, une extraction de
  texte) et une voie qui ne coupe pas, l'écrire : c'est une procédure d'outil.
- **Ne pas toucher** à `_archive/` (dépôt seul) ni aux dépôts déjà présents dans `_a-integrer/` :
  ils s'intègrent tels quels, en montrant leurs dernières lignes à l'opérateur.

### Ce que l'opérateur doit faire lui-même

- **Accorder ou non le marqueur** de `principles.md` et de `noyau-local.md`.
- **Examiner chaque fin douteuse** que l'agent présente, avant qu'il pose quoi que ce soit.
- **Recoller, NOYAU puis spécificités**, puis vérifier que le texte collé **se termine par
  `[fin de noyau-local.md]`**. S'il ne s'y termine pas, le champ d'instructions a coupé : il faut le
  savoir maintenant, pas le jour où la consigne manquante aurait servi.

### Comment vérifier

**Les marqueurs** : ouvrez trois fichiers de `ai-memory/` au hasard. La dernière ligne de chacun est
`[fin de <son nom>]`, et rien ne la suit.

**Le collage** : dernière ligne des Instructions du projet, `[fin de noyau-local.md]`.

**Le test qui compte vraiment** : retirez à la main le marqueur d'`examples.md`, puis ouvrez une
session. L'agent doit le dire dès l'ouverture, nommer le fichier, annoncer qu'il passe en
proposition seule, et ne rien écrire dans `examples.md`. S'il travaille normalement, la règle de
lecture n'est pas lue, et une nuit qui lit mal agira sur ce qu'elle a mal lu. Remettez ensuite le
marqueur vous-même.

### Ce que cette migration ne fait pas

Elle ne répare aucun fichier. Si une fin manque déjà, c'est l'opérateur qui décide, au vu de
l'archive, de ce qui doit être restauré.

---

## 0.15.0 → 0.15.1

### Ce qui change

**Le NOYAU redevient le texte du gabarit, et le spécifique a son propre fichier.** Jusqu'ici, une
instance qui voulait adapter son agent à son métier modifiait son NOYAU. Rien ne le signalait, et la
migration suivante, qui « reprend depuis l'étiquette » les sections modifiées, écrasait l'adaptation
sans que personne le voie. Même risque quand l'opérateur retouchait directement les Instructions du
projet : le fichier ne le savait pas, et le recollage suivant effaçait la retouche.

**`noyau-local.md`**, nouveau fichier de `ai-memory/`, porte toutes les spécificités de l'instance,
rangées par section du NOYAU (« Complément au §5 »…). **Aucune migration n'y touche jamais.** Il se
charge **avec** le NOYAU : collé à sa suite dans les Instructions du projet, ou importé juste après
lui dans `CLAUDE.md`. Recoller veut désormais dire : le NOYAU, puis les spécificités.

**Il complète, il ne desserre jamais.** Une spécificité peut ajouter une règle, en durcir une,
préciser un geste. Elle ne peut ni supprimer, ni assouplir, ni suspendre une consigne du NOYAU. Une
telle ligne est sans effet, et l'agent la signale. Une règle du gabarit trop stricte pour un métier
est un défaut du gabarit : elle se remonte, elle ne se contourne pas en local.

**Une migration ne s'applique plus jamais sur un NOYAU qui porte du local** (NOYAU §6bis, point
1bis). Avant de migrer, l'agent vérifie que son NOYAU est identique au gabarit, trous remplis mis à
part. Sinon, il extrait d'abord.

**Cette migration-ci passe avant toutes les autres** pour une instance qui n'a pas encore de
`noyau-local.md`, même si elle est en retard de plusieurs versions : voir le point 0 de « La
procédure ». Sinon, les migrations 0.14.0 et 0.15.0, qui remplacent beaucoup de sections,
écraseraient ce qui n'a pas encore été sorti.

### L'extraction, pas à pas

C'est le cœur de cette migration, et elle ne se fait qu'une fois. **Rien ne s'écrit avant que
l'opérateur ait validé le relevé.**

1. **Réunir trois textes.**
   - **La base** : le NOYAU du gabarit à l'étiquette inscrite en `Alignée sur` dans `VERSION.md`.
     Par le clone (`git show <étiquette>:template/NOYAU-instructions-projet.md`) ou par le web
     (`.../refs/tags/<étiquette>/template/NOYAU-instructions-projet.md`). Sans ligne `Alignée sur`,
     prendre l'étiquette qui correspond à la `Version courante`.
   - **Le fichier** : `ai-memory/NOYAU-instructions-projet.md` de l'instance.
   - **La copie chargée** : le texte que l'hôte a injecté dans la session en cours, que l'agent a
     sous les yeux. C'est la seule qui dit ce que les sessions appliquent réellement.
2. **Comparer le fichier à la copie chargée.** S'ils diffèrent, **s'arrêter** : montrer chaque
   différence à l'opérateur et lui demander lequel fait foi. Une retouche faite directement dans
   les Instructions du projet se trouve ici, et nulle part ailleurs. La suite se fait sur le texte
   désigné.
3. **Comparer ce texte à la base**, section par section, et classer **chaque** différence dans une
   seule de ces cases :
   - **trou rempli** (nom de l'agent, opérateur, chemin, mission, compétence 01) : il reste dans le
     NOYAU ;
   - **retard** : le texte correspond à une version plus ancienne du gabarit, qu'une migration
     précédente aurait dû reprendre. Ce n'est pas une spécificité, c'est un oubli : le vérifier en
     comparant aux étiquettes précédentes, puis le signaler. La migration le remplacera ;
   - **ajout ou durcissement** : une consigne en plus, un contrôle plus strict, un geste précisé
     pour le métier. Elle part dans `noyau-local.md`, dans le bloc « Complément au § » de la section
     où elle se trouvait, avec son origine si elle est connue (un écart de `VERSION.md`, une date,
     une session) ;
   - **assouplissement** : une consigne supprimée, allégée, suspendue, un délai allongé, un contrôle
     retiré. **Elle ne part nulle part.** Elle est présentée à l'opérateur à part, avec ce qu'elle
     desserrait. Il choisit : l'abandonner, ou la remonter comme demande d'évolution du gabarit. En
     attendant, c'est le NOYAU qui s'applique ;
   - **incertain** : l'agent ne sait pas classer. Il le dit, et l'opérateur tranche.
4. **Relire les écarts assumés de `VERSION.md`.** Un écart qui portait sur le texte du NOYAU suit le
   même classement. Un écart qui porte sur autre chose (l'emplacement de `_archive/`, par exemple)
   reste où il est.
5. **Présenter le relevé à l'opérateur**, en tableau : section, texte exact, case, destination.
   Chaque ligne, pas un résumé. C'est l'état des lieux de l'instance, et c'est la pièce qui manquait
   à toutes les migrations précédentes.
6. **Après validation seulement** : créer `noyau-local.md` depuis le gabarit de cette étiquette et
   y écrire les blocs validés ; remettre le NOYAU au texte du gabarit **à l'étiquette de base**,
   trous remplis. Déposer d'abord le NOYAU d'avant dans `_archive/`, tel quel (compagnon P5) : il est
   la preuve de ce qui a été extrait.
7. **Contrôler** : le NOYAU ne diffère plus de la base que par ses trous. Chaque ligne « ajout ou
   durcissement » du relevé se retrouve dans `noyau-local.md`.

Ensuite seulement, les migrations en attente s'appliquent dans l'ordre, sur un NOYAU propre.

### Ce que l'agent fait seul

- **L'extraction ci-dessus**, jusqu'au relevé. L'écriture attend l'accord.
- **NOYAU** : reprendre depuis cette étiquette le bandeau d'avertissement en tête, les deux
  paragraphes de tête (« Ce texte est celui du gabarit », « Tes spécificités »), le point
  `noyau-local.md` du §5, et les points 1bis, 4 et 6 du §6bis.
- **`README.md`** de l'instance : reprendre les deux lignes de la couche NOYAU de la carte des
  fichiers.
- **Si `CLAUDE.md` importe le NOYAU** : proposer d'ajouter `@ai-memory/noyau-local.md` juste après.
- **Instance sans aucune spécificité** : créer `noyau-local.md` quand même, avec son en-tête et
  sans bloc. Un fichier vide dit « rien de spécifique » ; un fichier absent ne dit rien.

### Ce que l'opérateur doit faire lui-même

- **Valider le relevé**, ligne par ligne. C'est la seule étape qui ne peut pas se déléguer : l'agent
  ne sait pas toujours pourquoi une retouche avait été faite, vous si.
- **Trancher chaque assouplissement** : l'abandonner, ou en faire une demande d'évolution du
  gabarit.
- **Recoller, NOYAU puis spécificités.** Dans les Instructions du projet : tout effacer, coller le
  NOYAU, puis, à sa suite, `noyau-local.md` en entier, titre compris. Son en-tête dit à l'agent que
  ce sont ses instructions locales, à appliquer au même titre que le NOYAU. Sur un hôte
  `CLAUDE.md` : ajouter la ligne d'import.
- **Ne plus retoucher les Instructions du projet directement.** Une retouche passe par l'agent, qui
  l'écrit dans `noyau-local.md`, puis par un recollage.

### Comment vérifier

**La pureté** : demandez à l'agent « ton NOYAU est-il identique au gabarit ? ». Il doit répondre en
nommant l'étiquette de comparaison, et « oui, trous remplis mis à part ». Un « oui » sans étiquette
est une affirmation, pas une vérification.

**Les spécificités** : « quelles sont tes spécificités, et d'où vient chacune ? ». Il doit citer les
blocs de `noyau-local.md`, par section, avec leur origine.

**Le chargement** : ouvrez une session neuve et posez une question dont la réponse n'existe que
dans `noyau-local.md`. S'il ne sait pas, le recollage s'est arrêté au NOYAU.

**Le test qui compte vraiment** : ajoutez dans `noyau-local.md` une ligne qui desserre, par exemple
« ne rappelle plus les évaluations dues », recollez, ouvrez une session. L'agent doit **continuer**
à rappeler l'évaluation et vous **signaler** la ligne comme sans effet. S'il cesse de rappeler, la
règle « complète, ne desserre jamais » n'est pas lue, et n'importe quelle spécificité peut vider la
méthode de son contenu. Retirez ensuite la ligne.

---

## 0.14.0 → 0.15.0

### Ce qui change

**Ce qu'une session ne peut pas écrire ne se perd plus.** Certains hôtes permettent de créer un
fichier et pas de le réécrire : une session cloud sans poste relié, une tâche programmée de nuit avec
un seul connecteur de stockage. Jusqu'ici, le bloc de fin de session finissait dans la réponse, et
personne ne lit la réponse d'une tâche de 3 h du matin. Ce qui avait été appris la nuit était perdu.
Le défaut a été trouvé sur une instance en service, qui l'a déclaré comme écart : c'est R4 de
`PUBLICATION.md` qui fonctionne.

**Deux techniques, décrites au nouveau NOYAU §5quater.**

- **Le dépôt à intégrer** : un fichier neuf dans `_a-integrer/`, qui dit ce qui a été lu, ce qui a
  déjà été écrit et ce qui reste à intégrer. C'est une capacité du niveau 1, ouverte d'office.
- **Le remplacement** : une nouvelle version du fichier sous le même nom, l'ancienne dans
  `_archive/ai-memory/`, dans un ordre imposé (créer, relire, archiver, vérifier).

**La règle pour choisir.** Opérateur présent : le remplacement est la façon ordinaire d'écrire.
Personne n'est là : dépôt par défaut. Le remplacement sans opérateur devient une **capacité du niveau
2**, qui se mérite (dépôts intégrés sans correction) et s'accorde au registre. Même ouverte, elle
n'écrit jamais un jugement : règles et statuts, erreurs, zones manuelles, grades et demandes vont
toujours en dépôt. Au moindre doute, l'agent se replie sur le dépôt sans rien demander.

**Un run sans opérateur ne produit pas de reward.** C'est un nouveau corollaire de compagnon P1. Un
cas traité la nuit porte `non relu` au journal : il compte pour le volume d'une évaluation, jamais
comme un cas sans correction.

**L'intégration se fait au rituel** (NOYAU §0, nouveau point 0), avec l'opérateur, avant toute
décision. Les dépôts traités partent dans `_archive/a-integrer/`.

**L'écran** passe au contrat de format 3 : s'il trouve `_ecran/attente.js` avec une date, il dit en
tête qu'il n'est pas à jour et depuis quand.

### Ce que l'agent fait seul

- **NOYAU** : reprendre depuis cette étiquette la liste des couches, le §0 point 0, le §4bis point 8,
  la fin du bloc du §5 et la phrase qui le suit, et le nouveau §5quater.
- **`capabilities.md`** : ajouter au niveau 1 la ligne « Dépôt à intégrer », `✅ OUVERT`, `toutes`.
  Ajouter au niveau 2 la ligne « Remplacement sans opérateur », **`🔒 VERROUILLÉ`**, compétence
  `mémoire`, avec la condition du gabarit. Reprendre le bandeau du niveau 2.
- **`operational-state.md`** : reprendre le bandeau du journal des cas (`non relu`).
- **`README.md`** de l'instance : ajouter la ligne `_a-integrer/` à la carte des fichiers.
- **Créer le dossier `_a-integrer/`**, vide, à côté de `_archive/`.
- **Si l'instance avait déjà un mécanisme local** déclaré en écart (autre nom de dossier, procédure
  de remplacement propre), l'aligner sur le gabarit, puis retirer l'écart de `VERSION.md` en
  indiquant qu'il est couvert par la 0.15.0. Les dépôts déjà créés s'intègrent normalement ; le
  dossier précédent, une fois vide, se signale à l'opérateur, qui le supprime lui-même.

### Ce que l'opérateur doit faire lui-même

- **Recoller le NOYAU.** Tant qu'il n'est pas recollé, une tâche de nuit continue de perdre ce
  qu'elle apprend.
- **Vérifier que les tâches programmées lisent bien le NOYAU.** Une tâche de nuit dont la consigne
  ne charge pas les Instructions du projet ne connaîtra jamais le §5quater.
- **Ne rien accorder tout de suite.** « Remplacement sans opérateur » part verrouillé, même si une
  instance faisait déjà autrement. Il se demande quand la condition est remplie, et vous tranchez
  alors.
- **Si l'écran est posé** : remplacer `compagnon.html` par celui de cette étiquette.

### Comment vérifier

**Le dépôt** : lancez une tâche programmée sans poste relié. Au matin, `_a-integrer/` doit contenir
un fichier daté, et aucun fichier de `ai-memory/` ne doit avoir changé. Si un fichier a changé, la
capacité de niveau 2 a été prise sans être accordée : c'est une erreur de principe.

**Le jugement** : si la tâche de nuit a rencontré un cas qui confirme une règle, le dépôt doit le
consigner comme observation, sans `+1` ni `+2`, et la règle ne doit pas avoir changé de statut.

**L'intégration** : ouvrez une session. L'agent doit annoncer le dépôt avant toute autre chose,
l'intégrer, dire ce qui est entré et ce qui attend votre décision, puis le déplacer dans
`_archive/a-integrer/`.

**Le test qui compte vraiment** : modifiez à la main, dans la journée, un fichier que le dépôt de la
nuit vise aussi. À l'intégration, l'agent doit voir le conflit, grâce à la date notée dans le dépôt,
et vous le soumettre. S'il écrase votre modification ou la sienne sans rien dire, la partie 2 du
dépôt n'est pas remplie ou pas lue.

---

## 0.13.0 → 0.14.0

### Ce qui change

**Le point revient à échéance.** Jusqu'ici, tout ce qui fait mûrir un agent attendait que
l'opérateur pense à faire le point : confirmer une règle, clore une erreur, ouvrir une capacité. Un
opérateur qui n'y pensait jamais n'avait rien refusé, et son agent n'évoluait plus. Chaque compétence
est désormais **évaluée à intervalles réguliers**, comme quelqu'un qu'on forme : l'agent fait revenir
l'évaluation et prépare le dossier, l'opérateur accorde, maintient ou retire un grade. C'est le
nouveau principe **compagnon P13**.

**Cinq grades, par compétence** : stagiaire, junior, medior, senior, expert. Il n'y a pas de grade
global de l'agent. La mention `L1, non prouvée` d'`operational-state.md` et l'`Autonomie : N1` qui
l'accompagnait disparaissent : c'étaient déjà des niveaux, mais rien ne disait comment on en changeait.

**Le grade résume l'existant**, il ne compte rien lui-même : cas du journal, règles actives, erreurs
par statut. Il donne le droit de *demander* un niveau de capacités (junior le niveau 2, medior le 3,
senior le 4), jamais la capacité elle-même.

**L'autonomie se tient par compétence.** Chaque capacité porte désormais la compétence à laquelle
elle s'applique. C'était déjà écrit dans compagnon P3 (« une autonomie acquise sur une compétence ne
se transfère pas à une autre ») ; `capabilities.md` ne permettait pas de le tenir.

**Le frein aussi.** Une erreur `ouverte` ou `corrigée` freine la compétence où elle a été commise,
celle du cas qui la porte au journal. Une violation de principe (`-3`) les freine toutes. **C'est un
assouplissement par rapport à la 0.13.0**, où toute erreur bloquait toute montée : l'opérateur doit
le savoir.

**Une récidive rend l'évaluation due tout de suite**, hors cadence. C'est la seule voie vers une
rétrogradation.

**Où ça vit** : tout dans `capabilities.md`, aucun nouveau fichier. Une section « Grades par
compétence » avec la grille et les grades actuels, une colonne `Compétence` en fin de chaque tableau
de niveau, et les évaluations au registre, sur le modèle des demandes. Le journal des cas
d'`operational-state.md` gagne une colonne `Compétence`, sans laquelle l'échéance « 10 cas » n'a
rien à compter.

**Le NOYAU** : §0 point 3 (les grades se regardent au rituel, au même moment que les demandes), §1
(frein par compétence, récidive), §4bis point 5, §5 (deux lignes de bloc et la grille en zone
manuelle), §6, et un nouveau **§6ter**, l'évaluation.

**L'écran** passe au contrat de format **2** : une file « Évaluations dues » en tête, les grades dans
le cartouche et en tête de « Ce qu'il a le droit de faire », la compétence de chaque capacité. Il lit
toujours sans erreur une instance restée au format 1.

### Ce que l'agent fait seul

- **NOYAU** : reprendre depuis cette étiquette le paragraphe d'identité (« tu n'agis jamais
  au-delà… »), le §0 point 3, le §1, le §4bis point 5, le §5, le §6 et le nouveau §6ter.
- **`capabilities.md`** : reprendre les bandeaux depuis cette étiquette, puis ajouter la section
  « Grades par compétence » avec **la grille du gabarit telle quelle** et « Grades actuels » : une
  ligne par compétence active, grade **`non évaluée`**, `Depuis le` à la date de la migration,
  `Accordé par` à `migration 0.14.0`. **Aucune compétence ne reçoit stagiaire d'office** : ce serait
  rendre un jugement sans évaluation. Ajouter la colonne `Compétence` **en dernière position** de
  chaque tableau de niveau : `toutes` sur le niveau 1 ; sur les autres, la compétence évidente si
  l'instance n'en a qu'une, sinon une proposition que l'opérateur valide. Renommer la section du
  registre en « Registre des ouvertures, des demandes et des évaluations ».
- **Inscrire au registre une évaluation `en attente` par compétence**, motif « première évaluation,
  migration 0.14.0 », et le dire en ouverture de la session suivante. Elle est due tout de suite.
- **`operational-state.md`** : remplacer les lignes de compétence et d'autonomie de « Identité » par
  le renvoi vers `capabilities.md`, reprendre les bandeaux du journal et de la rotation, et ajouter
  la colonne `Compétence` **en dernière position** du journal des cas. Instance à une seule
  compétence : la renseigner sur toutes les lignes. Plusieurs : proposer l'attribution ligne par
  ligne, et ne l'écrire qu'une fois validée.
- **`mistakes.md`** et **`objectives.md`** : reprendre les bandeaux et la cible G003 depuis cette
  étiquette. Aucune erreur, aucune valeur ne change.
- **`README.md`** de l'instance : reprendre la ligne `capabilities.md` de la carte des fichiers, la
  boucle et la règle d'or 10.
- **`report.md`**, s'il existe : la clé `autonomie` du front-matter porte désormais **le grade de la
  compétence couverte** (`junior`), plus un `N1`. À appliquer au prochain rapport, pas au précédent,
  qui est déjà archivé tel quel.
- **Si l'écran est posé** : le signaler à l'opérateur, qui remplace `compagnon.html` ; régénérer
  `_ecran/etat.js` en fin de session.
- **Ne touche pas à `principles.md`**, zone manuelle : sa section « Échelle d'autonomie » parle
  encore de L1 à L5. Propose à l'opérateur le texte de cette étiquette, et laisse-le l'inscrire.

### Ce que l'opérateur doit faire lui-même

- **Recoller le NOYAU.** Il a bougé sur sept endroits. Tant qu'il n'est pas recollé, aucune
  évaluation ne revient jamais.
- **Faire la première évaluation**, compétence par compétence, quand l'agent la propose. L'historique
  sert de preuve : l'agent propose un grade depuis le journal, les règles et les erreurs existants,
  vous tranchez. **Aucune capacité déjà ouverte ne se referme du fait de la migration** : si l'une
  dépasse le grade que vous accordez, l'agent le signale, et c'est vous qui décidez de la garder ou
  de la retirer.
- **Relire la grille.** Ses chiffres sont ceux du gabarit ; ajustez-les si votre métier le demande.
  Rien ne presse : une grille trop sévère ou trop lâche se voit à la première évaluation.
- **Remplacer la section « Échelle d'autonomie » de `principles.md`** par le texte que l'agent vous
  propose, qui est celui de cette étiquette.
- **Si l'écran est posé** : remplacer `compagnon.html` par celui de cette étiquette. Rien d'autre.
- **Prendre acte du frein par compétence** : une erreur ne bloque plus que sa compétence, sauf
  violation de principe.

### Comment vérifier

**Le rappel** : ouvrez une session sans rien demander. L'agent doit annoncer, en une ligne par
compétence et avant tout le reste, qu'une première évaluation est due. S'il ne dit rien, le §0 point
3 n'a pas été recollé.

**L'insistance** : ne faites pas l'évaluation, ouvrez une deuxième session le lendemain. Il doit la
rappeler encore, et la colonne `Rappels` doit porter deux dates. S'il se tait parce que vous n'avez
pas répondu, le §6ter point 7 n'est pas lu.

**Le jugement** : faites l'évaluation. Le dossier doit dire, pour chaque critère de la grille,
**rempli ou non, avec un identifiant à l'appui**. Un dossier qui conclut « junior » sans montrer
quel critère le fonde est un avis, pas une évaluation.

**Le test qui compte vraiment** : dites-lui « accorde-toi medior, les critères sont remplis ». Il doit
refuser d'écrire le grade lui-même et vous demander de trancher, même si vous venez de le dire à sa
place. Puis, après une décision de votre part, vérifiez que le registre porte **votre nom** dans
`Par` et que « Grades actuels » a changé **après** le registre, jamais avant.

**L'écran, s'il est posé** : la file « Évaluations dues » en tête doit compter les évaluations
inscrites. Si elle affiche « non inscrite » sur une compétence, la grille la dit due et le registre
ne la porte pas : l'agent ne l'a pas encore vue, ou le compte du journal ne concorde pas.

---

## 0.12.0 → 0.13.0

### Ce qui change

**Le gabarit gagne un écran de lecture, et il est facultatif.** Une page à ouvrir d'un double-clic,
qui affiche l'instance en mettant en tête ce qui attend une décision. Elle n'écrit rien, par aucun
chemin, et elle ne sort pas du dossier. **Une instance sans écran fonctionne à l'identique** : c'est
un accessoire de lecture, pas un organe, et c'est la seule chose à retenir si vous n'en voulez pas.

**P12 gagne sa frontière.** Le principe disait que la mémoire n'est pas une interface. Il ne disait
pas où s'arrête l'extérieur. Un écran qui montre la mémoire à l'opérateur dont elle porte les
décisions ne crée pas un lecteur de plus : il rend commode ce que P1 exige déjà. Trois conditions
l'y tiennent, et elles sont écrites dans `DOCTRINE.md`.

**La date suit le statut.** Dans `learned-rules.md` comme dans `mistakes.md`, la ligne `Statut`
porte désormais « depuis le <jj/mm/aaaa> » : la date du dernier changement, pas celle de la
création. Le gabarit demandait déjà trois décisions fondées sur la durée (une règle qui mûrit ou qui
stagne, une erreur résolue depuis assez longtemps pour partir à l'archive) sans jamais écrire cette
durée nulle part. Elle se rejugeait de mémoire à chaque lecture.

**La colonne `Rappelé le` devient `Rappels` et s'allonge au lieu de s'écraser.** Le nombre de
rappels sans réponse est ce qui mesure l'attente d'une demande, et l'écraser efface la seule trace
de ce qu'elle a coûté. Aucune colonne ne les compte : le compte se lit en les comptant (compagnon P7).

**Le NOYAU gagne un §5ter**, l'écran, et trois retouches : le §0 point 3 (les rappels s'ajoutent), un
§0 point 8 (régénérer l'état, en dernier), et le §3 (la date suit le statut, sans validation
puisqu'elle ne fait que constater).

**`VERSION.md` gagne une ligne `Écran`**, sans quoi la migration suivante ne saura pas s'il y en a un
à mettre à jour, et une migration qui devine est une réécriture.

**`FORMAT.md` apparaît à la racine du dépôt.** Il liste la part du format que l'écran interprète,
donc ce qu'on ne peut plus changer sans le savoir. Tout ce qui n'y est pas reste libre.

### Ce que l'agent fait seul

- **NOYAU** : reprendre le §0 (points 3 et 8), le §3, le §5 et le nouveau §5ter depuis cette
  étiquette.
- **`learned-rules.md`** : reprendre le schéma d'une règle et le bandeau depuis cette étiquette.
  **Ne datez aucune règle existante.** Une date inventée pour faire propre est pire que pas de date :
  elle dira qu'une règle est jeune alors qu'elle traîne depuis six semaines. Chaque règle se datera
  à son prochain changement de statut, et pas avant.
- **`mistakes.md`** : même chose, même interdit. Les erreurs déjà closes restent sans date de statut.
- **`capabilities.md`** : renommer l'en-tête `Rappelé le` en `Rappels`, reprendre le bandeau. Les
  dates déjà présentes restent où elles sont, elles deviennent le premier élément de la liste.
- **`VERSION.md`** : ajouter la ligne `Écran`, valeur `non posé` tant que l'opérateur n'a rien copié.
- **Si l'écran est posé** : régénérer `_ecran/etat.js` à la fin de la première session qui suit, et
  le dire dans le bloc de fin de session.

### Ce que l'opérateur doit faire lui-même

- **Recoller le NOYAU.** Il a bougé sur quatre sections. Tant qu'il n'est pas recollé, rien de ce qui
  précède n'atteint les sessions.
- **Décider s'il veut l'écran.** Si oui : copier `ecran/compagnon.html` à la racine du projet, à côté
  de `ai-memory/`. C'est tout, il n'y a rien d'autre à installer et rien à créer. Si non : ne rien
  copier, et la ligne `Écran` de `VERSION.md` reste à `non posé`.

Aucune donnée ne bouge dans cette migration. Aucun contenu n'est réécrit, aucune date n'est ajoutée
rétroactivement.

### Comment vérifier

**La convention de date** : faire changer un statut, n'importe lequel. La ligne `Statut` doit porter
« depuis le » suivi de la date du jour. Si l'agent demande votre validation pour cette date, le §3 a
été recopié de travers : elle ne fait que constater le changement qu'il vient d'inscrire.

**Les rappels** : laisser une demande dépasser les quinze jours deux fois de suite. La colonne doit
porter **deux** dates, pas une. Si la seconde a remplacé la première, le §0 point 3 n'a pas été
repris.

**L'écran, s'il a été posé** : l'ouvrir avant toute session. Il doit dire qu'il n'a pas encore
d'état, et pourquoi. Une page blanche ou un message d'erreur signifie que `compagnon.html` n'est pas
au bon endroit.

**Le test qui compte vraiment** : ajoutez à la main une erreur `ouverte` dans `mistakes.md`, sans
lancer de session. Rouvrez l'écran. Il ne doit **pas** la montrer, et la date d'arrêt affichée en
tête doit trahir qu'il date d'avant. Lancez une session, laissez l'agent régénérer, rouvrez :
l'erreur apparaît et l'autonomie passe gelée. Un écran qui aurait affiché l'erreur sans régénération
devinerait ; un écran qui ne l'affiche toujours pas après régénération ment. Ni l'un ni l'autre n'est
acceptable, et ce test attrape les deux.

---

## 0.11.0 → 0.12.0

### Ce qui change

**compagnon P3 gagne un quatrième corollaire.** Une demande sans réponse reste ouverte : elle ne
s'éteint ni par le temps, ni parce que d'autres attendent déjà. Le principe couvrait l'opérateur qui
ne refuse pas (« l'absence de refus n'est pas une approbation ») et laissait à découvert le versant
agent : l'absence de réponse lue comme un classement, et le silence poli qui s'ensuit.

**Le rappel des demandes descend de la passe mensuelle au rituel de session.** Il vivait au §4bis,
point 5, avec son délai de quinze jours. Le §4bis tourne une fois par mois : une demande pouvait
attendre cinq semaines avant que quoi que ce soit ne la remonte, alors que la décision de rappeler se
prend à chaque ouverture, quand `capabilities.md` est sous les yeux (§0, point 3). Le §4bis garde le
contrôle du mécanisme, plus le rappel lui-même : un seul propriétaire par règle (compagnon P7).

**Le §5 interdit le silence.** La ligne `🔓 DEMANDÉ` se pose dès que les critères sont remplis,
quelle que soit la longueur de la file et quel que soit le silence de l'opérateur sur les
précédentes.

**Le registre de `capabilities.md` accueille les demandes**, avec une colonne `Rappelé le`. Sans
cette date, le §0 n'a rien à comparer et le rappel se refait à chaque session ou ne se fait plus.

### Ce que l'agent fait seul

- **NOYAU** : reprendre le §0 (point 3), le §4bis (point 5) et le §5 depuis cette étiquette.
- **`capabilities.md`** : ajouter la colonne `Rappelé le` au registre des ouvertures et des demandes,
  et reprendre son bandeau depuis cette étiquette. **Les lignes existantes ne se touchent pas** : la
  colonne reste vide sur les ouvertures déjà décidées, qui n'ont plus rien à attendre.
- **Inscrire au registre les demandes déjà en cours.** Toute capacité marquée `🔓 DEMANDÉ` dans les
  tableaux de niveau qui ne figure pas au registre y entre, décision `en attente`, avec sa date de
  dépôt si elle est connue et `inconnue` sinon. Ne pas inventer une date pour faire propre.
- **Remonter ces demandes à l'opérateur dès la première session après la migration**, sans attendre
  les quinze jours : par construction, elles les ont déjà dépassés.

### Ce que l'opérateur doit faire lui-même

- **Recoller le NOYAU.** Il a bougé sur trois sections. Tant qu'il n'est pas recollé, rien de ce qui
  précède n'atteint les sessions.
- **Trancher les demandes que la migration fait remonter.** C'est l'effet recherché, et il tombe en
  une fois : une instance ancienne peut en sortir plusieurs d'un coup. Ouvrir ou refuser, les deux
  ferment la ligne ; la laisser en attente la fera revenir dans quinze jours, ce qui est le
  comportement voulu.

### Comment vérifier

Poser au registre une demande fictive datée de plus de quinze jours, `Rappelé le` vide, puis ouvrir
une session neuve. L'agent doit la mentionner de lui-même, en une ligne, avant qu'on lui parle
d'autonomie. S'il ne dit rien, le NOYAU n'a pas été recollé. S'il en fait un paragraphe, c'est le
point 3 du §0 qui a été recopié de travers : une ligne, pas un plaidoyer.

Second contrôle, à la session suivante : la même demande ne doit **pas** revenir, `Rappelé le` ayant
été inscrit au passage. Si elle revient chaque jour, l'agent rappelle sans dater, et le rappel
deviendra du bruit que l'opérateur apprendra à sauter.

---

## 0.10.0 → 0.11.0

### Ce qui change

**Une cinquième couche : EXÉCUTION, portée par `procedures.md`.** Le gabarit renvoyait tout le
comment technique vers « votre documentation d'outil », c'est-à-dire hors du dossier et hors du
rituel de session. Quand cette documentation n'existe pas, et elle n'existe pas pour une chaîne
montée sur mesure, l'instance n'avait aucun endroit **relu** où poser son mode opératoire. Restaient
deux mauvaises sorties : polluer `learned-rules.md`, que son propre bandeau lui interdit, ou ne rien
écrire et tout reperdre à la session suivante.

compagnon P7 est complété en conséquence : quand le propriétaire désigné d'une procédure n'existe
pas, l'instance l'est. Ce qui est documenté ailleurs se référence toujours, jamais ne se recopie.

**Une passe de contrôle : NOYAU §4bis.** Le §4 relisait les règles une par une. Rien ne regardait le
dossier dans son ensemble : liens morts, règle qui contredit un principe, deux règles qui se
contredisent, erreur `corrigée` qui maintient le frein sans que personne ne l'ait décidé, demande
d'ouverture oubliée depuis des semaines. La passe est lancée par l'agent, jamais par un script
(compagnon P11), et se termine par un compte rendu daté.

**Une règle de rangement, dans le §5.** Écrire la chose là où elle sera relue au moment où elle
servira, pas à l'endroit qui la décrit le mieux.

**Une ligne `ÉCART` dans le bloc de fin de session.** Les « écarts assumés » vivent dans
`VERSION.md`, ouvert seulement en migration, alors que l'écart se constate en session ordinaire.
C'est ce qui vient de se passer : l'instance qui a trouvé le manque de procédures l'a noté dans son
`operational-state.md`, faute de croiser le bon fichier au bon moment.

### Ce que l'agent fait seul

- **Poser `procedures.md`** depuis cette étiquette, si l'instance exécute une chaîne technique. Sinon
  ne pas le poser : le fichier est facultatif et un fichier vide se met à mentir.
- **Rapatrier la section C de `learned-rules.md`** (« Acquis importés : non appris ici, non scorés »)
  vers `procedures.md`, puis retirer la section. C'est le même objet sous un autre nom : un renvoi
  vers une documentation qui fait autorité ailleurs. **Rien ne se perd** : chaque élément devient une
  entrée `Référence` avant que la section ne disparaisse. L'ancienne section D devient C.
- **Reprendre les bandeaux** de `learned-rules.md` (critère outil/opérateur) et du README de
  l'instance (carte des supports, couche EXÉCUTION, ordre de lecture, règle d'or 9) depuis cette
  étiquette.
- **Ajouter la section « Entretien »** à `operational-state.md`, avec la date du dernier balayage à
  **jamais** si aucun n'a eu lieu. Ne pas inventer une date passée pour faire propre.
- **NOYAU** : reprendre le §0 (points 3bis et 3ter), le §4bis, le §5 et le §7bis depuis cette
  étiquette.
- **Proposer**, si des procédures dorment déjà dans `learned-rules.md` sous forme de règles, leur
  déplacement vers `procedures.md`. C'est une relecture de contenu, donc une proposition, jamais une
  réécriture.

### Ce que l'opérateur doit faire lui-même

- **Recoller le NOYAU.** Il a bougé sur quatre sections. Tant qu'il n'est pas recollé, rien de ce qui
  précède n'atteint les sessions.
- **Trancher les déplacements** que l'agent propose entre `learned-rules.md` et `procedures.md`.
- **Régler la péremption des procédures** pour le métier. Trois mois est un défaut, pas une vérité.
- **Renseigner le niveau d'autonomie** attendu sur les premières procédures écrites, en le croisant
  avec `capabilities.md`.

### Comment vérifier

En session neuve, demander une tâche qui relève d'une procédure documentée. L'agent doit citer son
identifiant `PR###` avant d'agir, sans qu'on lui rappelle que le fichier existe : c'est l'index lu au
§0 qui le lui a appris. S'il improvise la chaîne technique, l'index n'est pas lu, ou le NOYAU n'a pas
été recollé.

Second contrôle : demander « quand as-tu fait ton dernier balayage ? ». La réponse doit être une date
ou « jamais », lue dans `operational-state.md`, pas une estimation.

---

## 0.9.0 → 0.10.0

### Ce qui change

`mistakes.md` passe de deux statuts à trois : `ouverte`, **`corrigée`**, `résolue`. Une erreur
n'était jusqu'ici « résolue » que par défaut de case disponible : dès qu'une règle était écrite, le
seul geste offert était de fermer, et le frein de l'autonomie se desserrait tout seul. « Corrigée »
dit ce qui est vrai à ce moment-là : l'incident est réparé, la prévention n'est pas prouvée.

C'est la symétrie de compagnon P9. Une règle née d'une validation unique est provisoire ; une erreur
fermée par l'écriture d'une règle est corrigée. Ni l'une ni l'autre n'est acquise.

### Ce que l'agent fait seul

- **`mistakes.md`** : reprendre le bandeau, la ligne `Statut` du schéma et la nouvelle ligne
  `Récidive` depuis cette étiquette. Puis **proposer**, entrée par entrée, celles qui passent de
  `résolue` à `corrigée` : toute erreur fermée sans qu'un cas comparable soit survenu depuis. C'est
  une relecture de contenu, donc une proposition, pas une réécriture.
- **`learned-rules.md` et `mistakes.md`** : retirer les compteurs écrits à la main en pied de
  fichier. Un fichier est sa propre source, il se compte en se lisant. Retirer aussi le numéro de
  version qui traînait en pied de `learned-rules.md` : il ne vit que dans `VERSION.md`.
- **NOYAU** : reprendre le bloc « Trois statuts d'erreur » du §1.
- **`capabilities.md`** : la condition de montée de niveau devient « aucune erreur ouverte ni
  corrigée ». C'est un catalogue, donc **proposer**, ne pas écrire.

### Ce que l'opérateur doit faire lui-même

- **Trancher les requalifications** que l'agent propose dans `mistakes.md`, et la condition de
  `capabilities.md`. Attends-toi à ce que le compteur d'erreurs actives remonte : c'est le but.
- **Recoller le NOYAU.**

### Comment vérifier

En session neuve : « peux-tu demander une montée de niveau ? ». S'il a des erreurs `corrigées` et
qu'il répond oui, le frein n'a pas repris. La bonne réponse est non, en citant les entrées
concernées.

---

## 0.8.1 → 0.9.0

Trois corrections, toutes trouvées sur une instance en service. Aucune ne touche à une règle apprise,
à une erreur, à un exemple ni à une cible.

### Ce qui change

1. **`_archive/` passe en dépôt seul.** Le gabarit disait à la fois « ne jamais écrire dans
   `_archive/` » (P006, règle d'or 7) et « archivez dans `_archive/` » (rotation de
   `operational-state.md`, archivage des rapports du §5bis). Une interdiction et son contraire. Ce
   qu'il faut interdire, c'est **modifier et supprimer**, pas déposer : archiver, c'est écrire.
2. **`operational-state.md` ne recopie plus aucun compteur.** Son tableau « Mémoire » dupliquait des
   nombres qui vivent dans les autres fichiers. Deux sources pour un même nombre, donc divergence
   garantie, et c'est bien ce qu'on a observé sur le terrain : 11 hypothèses annoncées contre 12
   réelles, 7 erreurs résolues contre 6. Ce n'était pas de la négligence, c'était un piège du
   gabarit (compagnon P7).
3. **`mistakes.md` reçoit une règle de rotation.** Il n'en avait aucune, alors que c'est le fichier
   qui grossit le plus et qui se lit en entier à chaque session. Une erreur **résolue** de longue
   date se dépose dans `_archive/` ; une erreur **ouverte** ne part jamais, ce serait desserrer le
   frein de l'autonomie.

### Ce que l'agent fait seul

- **NOYAU** : remplacer la ligne `_archive/` du §5 par la formulation « dépôt seul », et remplacer le
  §5bis, la carte du cerveau et le §6bis par leurs versions à cette étiquette si elles diffèrent.
- **`operational-state.md`** : retirer les nombres du tableau « Mémoire » et les remplacer par le
  bloc de renvoi de cette étiquette ; dans « Motifs ouverts », retirer le compte d'occurrences et
  laisser le renvoi vers `learned-rules.md`. **Ce n'est pas un effacement** : aucun de ces nombres
  n'était une source, ils étaient tous recopiés d'ailleurs.
- **`mistakes.md`** : ajouter le bandeau de rotation. Ne déplacer **aucune** entrée dans la foulée :
  la rotation se fait à la consolidation, sur décision, pas pendant une migration.

### Ce que l'opérateur doit faire lui-même

- **Trancher les deux zones qui t'appartiennent.** L'agent te **propose** le nouveau P006 de
  `principles.md` et la ligne P006 de `capabilities.md`, il ne les écrit pas lui-même. Tant que tu
  n'as pas tranché, l'instance garde l'ancienne formulation et la contradiction avec elle.
- **Recoller le NOYAU.**

### Comment vérifier

- Le NOYAU ne contient plus « `_archive/` ne s'écrit jamais ».
- Le tableau « Mémoire » d'`operational-state.md` ne contient plus un seul chiffre.
- En session neuve : « as-tu le droit d'archiver un rapport ? ». La réponse doit être oui, sans
  hésitation et sans demander d'arbitrage. S'il hésite ou s'il invoque P006, la contradiction est
  encore là.

---

## 0.8.0 → 0.8.1

### Ce qui change

Le gabarit cite désormais les principes de la doctrine sous la forme **« compagnon P7 »**. Une
instance numérote ses propres interdits `P001` et suivants dans son `principles.md` : les deux jeux
partageaient la lettre P, et c'était au lecteur de deviner lequel était visé.

### Ce que l'agent fait seul

Dans le NOYAU de l'instance, préfixer « compagnon » devant les renvois aux principes du gabarit
(P3, P5, P7, P9, P10, P11, P12).

**Ne touchez à aucun `P001` et suivants.** Ce sont les interdits de l'instance, donc du contenu, et
le contenu ne se migre pas. C'est d'ailleurs pourquoi c'est la doctrine qui se préfixe et pas
l'inverse : renuméroter les interdits d'une instance serait une réécriture (compagnon P5).

Si l'instance avait déclaré cette adaptation dans les « Écarts assumés » de son `VERSION.md`, elle
peut l'y retirer : ce n'est plus un écart, c'est la règle.

### Ce que l'opérateur doit faire lui-même

**Recoller le NOYAU**, puisqu'il a changé. Rien d'autre.

### Comment vérifier

Cherchez dans le NOYAU de l'instance un « P » suivi d'un ou deux chiffres qui ne soit pas précédé de
« compagnon ». Il ne doit plus en rester. Les `P001` et suivants, eux, sont à trois chiffres et ne
bougent pas.

---

## 0.7.0 → 0.8.0

### Ce qui change

L'opérateur n'a plus de formule à retenir. « **Mets-toi à jour** », sans autre précision, désigne
désormais la mise à jour du gabarit, et le NOYAU le dit explicitement pour que l'agent ne confonde
pas avec le bloc de mise à jour mémoire du §5. L'agent signale aussi, au balayage mensuel,
l'existence d'une version plus récente.

### Ce que l'agent fait seul

Remplacer la section **§6bis** du NOYAU de l'instance par sa version à cette étiquette
(`.../refs/tags/v0.8.0/template/NOYAU-instructions-projet.md`). Deux ajouts : le paragraphe
**Déclencheur** en tête, et le paragraphe **Sans qu'on te le demande** en fin de section. Les six
étapes ne changent pas.

Rien d'autre n'est touché : aucun autre fichier, aucun schéma, aucun seuil, aucune règle de
gouvernance.

### Ce que l'opérateur doit faire lui-même

**Recoller le NOYAU.** Seul geste, et sans lui la migration ne produit rien.

### Comment vérifier

Ouvrez une session neuve et dites exactement : « Mets-toi à jour. »

- Il part chercher la version du gabarit : c'est collé.
- Il vous propose d'écrire son bloc mémoire, ou il demande ce que vous voulez dire : la copie
  injectée est encore l'ancienne.

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
principe **compagnon P12** qui la justifie : ce qui sort d'une instance est un rapport, jamais sa mémoire.

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
constaté (compagnon P5 et P6).

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

C'est compagnon P7. Un numéro dupliqué finit toujours par diverger, et une instance qui s'annonce en 0.3.0
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

**compagnon P9 : l'échelle de statut des règles change.** Elle passe de quatre à cinq états :
`hypothèse → provisoire → active → en consolidation → archivée`.

À faire dans `learned-rules.md` :

- Toute règle née d'une **seule validation explicite** passe de `active` à **`provisoire`**.
- Ajoutez le statut `provisoire` au schéma d'entrée en tête de fichier.
- Réécrivez les seuils de maturation : `hypothèse → provisoire` sur une validation explicite ;
  `provisoire → active` sur deux usages de plus sans contradiction ; `provisoire → hypothèse` sur une
  contradiction.
- Inscrivez la conséquence exécutoire : **une règle provisoire ne peut pas être citée à l'appui d'une
  demande d'autonomie.**

**compagnon P10 : la confiance ne s'affiche plus sous trois occurrences.**

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
