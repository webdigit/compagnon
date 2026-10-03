# compagnon : Installation assistée

> **Ce fichier s'adresse à l'agent qui installe compagnon**, pas à la personne qui le lui demande.
> Elle n'a rien à lire ici : elle a collé une consigne dans sa conversation, et c'est toi qui suis la
> procédure. Si tu es humain et que tu es arrivé ici par hasard, la page qui vous concerne est
> [`README.md`](README.md), section « Installer ».

Tu vas poser une instance compagnon dans le dossier du projet où tu travailles, pour la personne qui
te l'a demandé. Dans ce fichier, elle s'appelle **l'opérateur**.

Tu fais pour lui les étapes 1 à 3 d'[`INSTALLATION.md`](INSTALLATION.md) : choisir la première
compétence, poser le dossier, fixer l'autonomie. Tu ne peux pas faire l'étape 4, et tu ne fais pas
semblant : tu la lui prépares, tu lui expliques, et tu t'arrêtes.

---

## Avant de commencer : cinq règles qui tiennent du début à la fin

1. **Une question à la fois.** L'opérateur découvre la méthode. Une liste de dix questions le
   perd ; une question, avec ta proposition de réponse quand tu en as une, le fait avancer.
2. **Tu proposes, il valide.** Rien de ce qui parle de lui, de son métier ou de ses interdits ne
   s'écrit sans qu'il ait vu le texte et dit oui.
3. **Tu n'écris que dans le dossier du projet**, et seulement ce que cette procédure nomme :
   `ai-memory/`, plus `compagnon.html` à la racine s'il veut l'écran, plus `CLAUDE.md` si ton hôte
   le lit (étape 6). Rien d'autre, nulle part ailleurs. Seule exception : la copie du gabarit que tu
   récupères à l'étape 1, si elle ne peut pas être posée ailleurs. Elle est temporaire, et elle part
   à l'étape 8.
4. **Tu ne réécris pas le gabarit.** Tu remplis ses trous et tu recopies le reste tel quel, octet
   pour octet. Un fichier que tu as « amélioré » à l'installation est un fichier que la prochaine
   mise à jour écrasera, et l'opérateur ne saura jamais pourquoi.
5. **Tu dis où tu en es**, en une ligne, à chaque étape franchie. L'opérateur doit pouvoir
   reprendre demain là où il s'est arrêté.

---

## Étape 1 : Récupérer le gabarit, à la dernière version publiée

**Trouve la dernière étiquette publiée** : la première entrée de
`https://api.github.com/repos/webdigit/compagnon/tags`. Si cette adresse ne répond pas, applique les
replis de la section « Sans dépôt local » de [`MIGRATIONS.md`](MIGRATIONS.md), étape 1.

**Puis récupère le dossier `template/` à cette étiquette**, par la première route qui marche :

- **Route A, si tu as un shell avec git** : clone le dépôt **hors du dossier du projet** si ton hôte
  le permet (`git clone --branch <étiquette> --depth 1 https://github.com/webdigit/compagnon.git`).
  Note aussi le commit court de l'étiquette (`git rev-list -n 1 <étiquette>`).
- **Route B, si tu peux lire des adresses web brutes** : liste les fichiers par
  `https://api.github.com/repos/webdigit/compagnon/contents/template?ref=<étiquette>`, puis lis
  chacun par `https://raw.githubusercontent.com/webdigit/compagnon/refs/tags/<étiquette>/template/<fichier>`.
  ⚠️ **Il te faut le texte exact.** Un outil qui résume, reformule ou abrège la page ne convient
  pas, même s'il en donne l'essentiel : le gabarit recopié serait faux sans que rien ne le montre.
  Si c'est le seul outil web que tu as, passe à la route C.
- **Route C, sinon** : demande à l'opérateur de télécharger la version publiée. Dis-lui exactement
  quoi faire : ouvrir `https://github.com/webdigit/compagnon/tags`, cliquer sur **zip** sous la
  première étiquette de la liste, et décompresser le fichier dans le dossier du projet. Attends
  qu'il te dise que c'est fait. Le dossier décompressé s'appelle `compagnon-<x.y.z>`, et c'est sa
  version. **Pas le bouton vert « Code », puis « Download ZIP »** : il donne `main`, qui peut porter
  une version pas encore publiée.

**Contrôle avant d'aller plus loin** : chaque fichier de `template/` que tu as en main se termine
par une ligne `[fin de <son nom>]`, et rien après. Un fichier sans cette ligne a été coupé en route.
Relis-le par une autre voie ; s'il manque encore, arrête-toi et dis-le à l'opérateur. On ne pose pas
une instance sur un gabarit amputé.

Dis à l'opérateur, en une ligne, quelle version tu installes.

## Étape 2 : Lire avant d'écrire

Lis, à la même étiquette, [`INSTALLATION.md`](INSTALLATION.md) en entier, et la section « Ce que
compagnon ne prétend pas » de [`DOCTRINE.md`](DOCTRINE.md). C'est INSTALLATION.md qui fait foi sur
ce qu'il faut remplir : ce fichier-ci te dit seulement comment le faire avec l'opérateur.

Puis dis à l'opérateur, en quatre ou cinq lignes et sans jargon, ce qu'il va obtenir : un agent qui
apprend de ses corrections, qui démarre sans aucun droit d'écriture, et qui ne gagne de l'autonomie
que quand lui la lui accorde. Et ce que ça lui demande : relire, et corriger en disant pourquoi.
S'il hésite, c'est maintenant qu'il doit pouvoir s'arrêter, pas après.

## Étape 3 : Les questions, une à la fois

Dans cet ordre. Pour chacune, propose une réponse quand le contexte t'en donne une, et attends la
sienne avant de passer à la suivante.

1. **Qui il est** : son nom, et son organisation s'il en a une.
2. **Le nom de l'agent.** Propose-en un ou deux, courts. C'est ainsi que l'agent se présentera à
   chaque session.
3. **La première compétence.** C'est la question qui compte, et c'est celle où il aura besoin de
   toi. Une seule compétence, **fréquente, corrigeable et à faible risque** (INSTALLATION.md,
   étape 1). « M'aider au quotidien » est trop vaste : aide-le à resserrer, par exemple en lui
   demandant ce qu'il fait plusieurs fois par semaine et qu'il aimerait déléguer. Obtiens les trois
   lignes : ce qui est dedans, ce qui est dehors, à quoi ressemble un travail bien fait.
4. **La mission**, en deux ou trois lignes. Rédige-la toi-même à partir de la compétence, et
   soumets-la.
5. **Ses interdits métier**, ceux qu'aucune autonomie ne lèvera jamais. Montre-lui d'abord les
   principes durs déjà écrits dans `principles.md` (ne jamais envoyer, ne jamais engager…), puis
   demande-lui ce qu'il ajouterait pour son métier. Deux suffisent pour commencer ; aucun, c'est
   permis, et on le note.
6. **Ses valeurs**, facultatives. Demande-lui s'il y a deux ou trois choses qu'il veut voir
   portées par le travail de l'agent quand rien d'autre ne tranche : la bienveillance, le partage,
   la rentabilité, ou autre chose. **S'il n'en a pas, tu passes à la suite** : c'est une réponse
   complète, et l'agent fonctionnera à l'identique. S'il en a, **une valeur à la fois**, trois au
   plus :
   - **Ce qu'elle veut dire pour lui**, concrètement. Une réponse vague (« être sympa ») appelle
     une relance : « à quoi verrais-tu qu'il l'a respectée ? ».
   - **La mise en situation.** Tire de la compétence 01 une situation précise et réaliste, où la
     valeur pèse vraiment : celle où elle coûte quelque chose (du temps, de la marge, de la
     fermeté). Décris-la en deux ou trois lignes et demande-lui ce qu'il attend que l'agent y
     fasse, et pourquoi. Sa réponse devient la ligne « En situation ». S'il ne sait pas répondre,
     la valeur n'est pas mûre : propose de ne pas la retenir pour l'instant, il pourra l'ajouter
     plus tard.
   - **La hiérarchie**, s'il en a donné plusieurs. Demande-lui d'abord laquelle est la plus
     importante, et, s'il y en a trois, laquelle l'est le moins. Puis **mets ce classement à
     l'épreuve** : construis une situation où les deux premières tirent dans deux sens, et
     demande-lui ce qu'il attend. S'il y en a trois, fais de même pour la deuxième et la
     troisième. Si une réponse contredit le classement qu'il vient de donner, dis-le-lui
     simplement et laisse-le trancher : c'est lui qui fixe l'ordre, la situation sert à vérifier
     qu'il tient. Chaque situation de conflit retenue s'ajoute à la valeur qui l'emporte.

   Puis remets chaque valeur en forme (`principles.md`, section « Valeurs ») et soumets-lui le
   texte : ce sont ses mots, tu ne fais que les ranger.
7. **Comment il travaille** : langue, tutoiement ou vouvoiement, niveau de concision, ce qu'il veut
   qu'on lui soumette avant d'agir. Une question, une réponse libre, que tu remets en forme.
8. **L'écran de lecture** : une page qu'il ouvrira d'un double-clic pour voir où en est l'agent.
   Facultatif. Demande-lui s'il le veut.

**Ce que tu ne demandes pas**, et que tu remplis toi-même :

- **le chemin complet du dossier** : tu le connais, puisque tu y travailles. Montre-le-lui pour
  confirmation, en entier. C'est le trou le plus souvent mal rempli (INSTALLATION.md, étape 4) ;
- **le stockage partagé** : `aucun`. Le mode sans poste s'installe plus tard, après la première
  semaine (INSTALLATION.md, étape 7) ;
- **`report.md`** : ne le pose pas. Il ne sert qu'à qui fait lire la sortie de l'agent par un
  tiers, et l'opérateur l'ajoutera s'il en a l'usage ;
- **la grille des grades et le niveau d'autonomie** : ceux du gabarit, tels quels. Lecture seule
  intégrale au départ, niveau 1 ouvert, rien d'autre (INSTALLATION.md, étape 3).

## Étape 4 : Écrire le dossier

Avant d'écrire, montre à l'opérateur un récapitulatif court de ses réponses, et attends son accord.

Puis :

1. **Crée `ai-memory/`** à la racine du dossier du projet, et copies-y les fichiers de `template/`,
   sauf `report.md`. Ne crée pas `journal/` : il naîtra à la première session qui traite un cas.
2. **Remplis les trous d'identité, partout dans `ai-memory/`**, en majuscules comme en minuscules :
   `<NOM DE L'AGENT>`, `<OPÉRATEUR>`, `<organisation>`, `<COMPÉTENCE 01>` et ses variantes, la
   mission, le chemin complet du dossier (`<CHEMIN COMPLET…>`, `<chemin>`), le stockage partagé.
   Les fichiers qui en portent : le NOYAU, `README.md`, `principles.md`, `capabilities.md`,
   `operational-state.md` et `VERSION.md`. Cherche-les tous, ne te fie pas à cette liste. S'il n'a
   pas d'organisation, retire `, <organisation>` plutôt que de laisser un trou.
3. **`principles.md`** : la mission, ses interdits métier en P008, P009 (retire la ligne de ceux
   qu'il n'a pas donnés, et la ligne d'exemple en italique sous P008), ses valeurs s'il en a donné
   (dans l'ordre fixé, ligne « Aucune valeur déclarée » retirée ; sinon, tu la laisses), sa façon
   de travailler. C'est
   une zone manuelle : tu y écris **sous sa dictée**, le texte qu'il a validé, et rien de plus.
4. **`capabilities.md`** : remplace la ligne modèle de « Grades actuels » par celle de la compétence
   01 (un identifiant court, par exemple `C01 : <la compétence en quelques mots>`), au grade
   stagiaire, datée du jour, `activation`. Au registre, date la ligne « Ensemble du niveau 1 » du
   jour et mets-y le nom de l'opérateur ; retire les lignes d'exemple qui la suivent, ce sont des
   décisions que personne n'a prises. Dans « Interdits absolus », remplace `<vos interdits métier>`
   par ses P008 et P009, ou retire la ligne s'il n'en a donné aucun. Ne touche ni à la grille ni
   au reste du catalogue, dont les lignes modèles entre chevrons restent telles quelles.
5. **`operational-state.md`** : la section « Identité et niveau », et « Rituel de collaboration »
   à partir de sa réponse à la question 7. Le reste se remplira à la première vraie session.
6. **`VERSION.md`** : la version installée, l'étiquette et son commit court s'il est connu, la date
   de pose, l'instance, la ligne `Écran`, et la première ligne de l'historique. `Copie locale` :
   `aucune`. La copie temporaire de l'étape 1 n'en est pas une.
7. **`noyau-local.md`** : n'y ajoute rien. Il reste vide de spécificités, et c'est normal.
8. **L'écran, s'il le veut** : copie `ecran/compagnon.html`, de la même étiquette, à la **racine du
   dossier du projet**, à côté de `ai-memory/`, pas dedans.

**Ce que tu laisses tel quel** : tout ce qui, entre chevrons, décrit un format plutôt qu'une
identité. Les `<jj/mm/aaaa>`, `<AAAA-MM-JJ HH:MM>`, `<fichier>` ou `<étiquette>` des schémas
d'entrée et des exemples sont des modèles que l'agent suivra plus tard, pas des trous. Les exemples
**fictifs** signalés comme tels restent aussi : ils partiront au premier vrai cas.

## Étape 5 : Vérifier ce que tu as écrit

Relis chaque fichier de `ai-memory/` **depuis le disque**, pas depuis ce que tu crois y avoir mis :

- il se termine par `[fin de <son nom>]`, et rien après ;
- il ne contient plus aucun des trous d'identité de l'étape 4, point 2. Deux passages les citent
  pour les expliquer, et restent tels quels : le bandeau d'avertissement en tête du NOYAU, et
  l'encadré « À REMPLIR » en tête du `README.md` ;
- le NOYAU ne diffère du gabarit que par ses trous remplis.

Un seul écart, et tu le corriges avant d'aller plus loin. Puis dis à l'opérateur : « Le dossier est
posé. Il reste une étape, et c'est toi qui dois la faire. »

## Étape 6 : Préparer l'allumage, sans le faire

C'est l'étape 4 d'INSTALLATION.md, et la seule qui décide si tout le reste servira. **Tu ne peux pas
te donner tes propres instructions de démarrage.** Si le NOYAU n'est pas dans ce que ton hôte
injecte à chaque nouvelle conversation, l'instance est morte, quel que soit le soin mis à l'écrire.
Explique-le à l'opérateur avec ces mots-là, ou d'autres aussi simples.

Puis guide-le selon ton hôte. Nomme celui où tu tournes ; si tu n'en es pas sûr, dis-le et
demande-lui ce qu'il voit à l'écran.

- **Un projet Claude (application de bureau ou claude.ai, Cowork compris)** : il ouvre les
  **Instructions du projet**. Préviens-le avant : le fichier qu'il va copier s'ouvre sur un
  avertissement « CE FICHIER N'EST PAS PRÊT À ÊTRE COLLÉ ». Il vise le gabarit, pas sa copie
  remplie : il colle quand même le texte entier, avertissement compris. Il ouvre `ai-memory/NOYAU-instructions-projet.md` dans un éditeur de
  texte (le Bloc-notes suffit), sélectionne tout, copie, et colle dans le champ. Puis, **à la
  suite**, la même chose avec `ai-memory/noyau-local.md`, titre compris. Il enregistre.
  Ne lui propose pas de fichier tout prêt à coller qui réunirait les deux : ce serait une troisième
  copie du NOYAU, qui divergerait à la première modification (INSTALLATION.md, étape 4).
- **Un hôte qui lit `CLAUDE.md` à la racine** (Claude Code, par exemple) : tu peux l'écrire toi-même,
  avec le contenu donné à l'étape 4 d'INSTALLATION.md. Si le dossier n'a pas d'`AGENTS.md`, retire
  les deux lignes qui le nomment. Montre-le-lui ensuite : c'est lui qui vérifie
  qu'il est bien là, à la racine.
- **Un autre hôte** : cherche avec lui le champ ou le fichier que l'hôte injecte au démarrage
  (INSTALLATION.md, étape 4, « Autres hôtes »).

Donne-lui aussi le contrôle qu'il peut faire seul : le texte collé doit contenir
`[fin de NOYAU-instructions-projet.md]` au milieu, et se terminer par `[fin de noyau-local.md]`.
S'il manque le second, le champ a coupé le texte.

## Étape 7 : Le test, dans une conversation neuve

**Pas dans celle-ci.** Ici, tu as tout lu pendant l'installation : tu répondrais juste, même si
l'allumage avait échoué, et le test ne prouverait rien.

Demande à l'opérateur d'ouvrir une **nouvelle conversation dans le même projet** et d'y poser la
question de l'étape 5 d'INSTALLATION.md :

> « Qui es-tu, quel est le rituel de session, et que dois-tu produire à la fin ? »

Dis-lui ce qu'il doit voir : l'agent se présente sous le nom choisi, décrit les étapes du rituel et
cite le bloc de mise à jour mémoire de fin de session. S'il se présente comme `<NOM DE L'AGENT>`,
c'est le gabarit qui a été collé ; s'il répond quelque chose de vague et général, le NOYAU n'est pas
chargé. Dans les deux cas : reprendre l'étape 6.

## Étape 8 : Ce que tu laisses derrière toi

Dis-lui, pour finir :

- **Si une copie du gabarit est restée dans le projet** (le dossier `compagnon-<x.y.z>` de la route
  C, ou le clone de la route A), de la supprimer une fois le test passé. Il contient un deuxième `NOYAU-instructions-projet.md`, celui du
  gabarit, plein de trous : c'est exactement le fichier qu'on colle par erreur
  (INSTALLATION.md, étape 4, « D'abord : le bon fichier »). Si ton hôte te permet de le supprimer,
  propose-le-lui ; sinon, il le fait à la main.
- **Ce qui commence maintenant** : faire passer de vrais cas, corriger en disant ce qui cloche et
  pourquoi, et réclamer le bloc de fin de session les premières fois (INSTALLATION.md, étape 6). Les
  premiers jours, l'agent ne sera pas meilleur, il sera un peu plus lent. C'est normal.
- **La checklist** de fin d'INSTALLATION.md, avec ce qui est déjà coché et ce qui reste à lui.

Tu t'arrêtes là. Ne traite aucun cas réel dans cette conversation : l'agent qui le fera est celui
qui démarrera avec le NOYAU, pas toi.
