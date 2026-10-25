# hotes/claude.md : Ce que Claude sait faire ici

> **Statut : mémoire AUTO-ÉCRITE**, lue d'office à chaque session sous Claude (NOYAU, « Ta fiche
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

### Comment je suis chargé

- **Projet claude.ai** (navigateur, application de bureau, Cowork) : le champ **Instructions du
  projet**, NOYAU puis `noyau-local.md`. Ce champ ne charge pas cette fiche : c'est le NOYAU qui me
  dit de la lire. Prouvé (instances en service, depuis août 2026).
- **Cowork sur un dossier** : `CLAUDE.md` à la racine du projet, chargé au démarrage. Prouvé
  (instance en service, septembre et octobre 2026).
- **Les lignes `@` de `CLAUDE.md` ne suffisent pas à me charger la mémoire sous Cowork.** Une session
  a reçu le texte de `CLAUDE.md` sans le contenu des fichiers importés : je lis moi-même chaque
  fichier de la liste. Constaté une fois (04/10/2026).
- **Claude Code** : `CLAUDE.md` et ses imports `@`. Non prouvé : aucune instance n'y a tourné.
- **Tâche programmée** créée depuis le projet : elle reçoit les Instructions du projet à jour à
  chaque exécution. Prouvé (instance d'essai, 24 au 26/09/2026, guide
  `hotes/claude-taches-programmees.md` du dépôt).
- **Je ne relis pas le champ Instructions par un outil** : je ne le vois que tel qu'il m'a été
  injecté, et je le compare au fichier. Prouvé (recollages contrôlés, septembre 2026).

### Lire un fichier en entier

- **Session reliée à un poste** : le shell du poste, les dossiers connectés montés sous
  `$HOME/mnt/<nom>`. Le marqueur se contrôle par `tail -n 1`, la voie brute. Prouvé (instances en
  service, septembre et octobre 2026).
- **Le nom de montage n'est pas stable.** Quand deux dossiers connectés portent le même nom, chacun
  reçoit un préfixe tiré de son dossier parent (`<parent>--<nom>`), et le nom nu peut désigner un
  autre dossier, vide. Le bon est celui qui contient `ai-memory/NOYAU-instructions-projet.md` et dont
  le NOYAU porte le chemin de « Où vit le dossier ». Constaté une fois (04/10/2026).
- **Un dossier connecté vide** peut être un ancien emplacement de l'instance, resté connecté après un
  déménagement. Constaté une fois (04/10/2026).
- **L'outil de lecture de fichiers peut couper un gros fichier** sans le dire ; la fin se revérifie au
  shell. Prouvé (instance en service, 09 et 15/09/2026).
- **Sans poste** : le connecteur Google Drive. La recette complète est dans `procedures.md` si le
  mode sans poste est installé (`INSTALLATION.md`, étape 7), sinon dans le guide
  `hotes/google-drive.md` du dépôt. Ce qui suit est ce qu'il faut savoir avant de l'ouvrir.
- **Une sortie d'outil de plus de 50 000 caractères est enregistrée dans un fichier** du conteneur
  de la session, au lieu d'arriver dans la conversation : le message dit « Output has been saved to
  <chemin> », au format JSON. Le shell du conteneur le lit (`jq`, `python3`). En dessous, elle arrive
  dans la conversation. Ce seuil est celui de la documentation de l'hôte, et rien ne le règle : on ne
  force pas une sortie courte à partir dans un fichier. Le base64 grossit le fichier d'un tiers :
  par `download_file_content`, un fichier de moins de 37 Ko environ arrive dans la conversation.
  Constaté (session Cowork dans le cloud, 08 et 25/10/2026 : 4,9 à 16 Ko dans la conversation,
  50 à 144 Ko dans un fichier). En tâche programmée : même moteur, non constaté ; le premier run le
  constate et l'écrit sous « Constaté ici ».
- **Le connecteur ne donne pas d'empreinte.** Ni `get_file_metadata` ni `search_files` ne renvoient
  `md5Checksum`. La seule preuve venue du Drive est la taille, `fileSize`. Constaté une fois
  (25/10/2026).
- **Ce que rend `read_file_content`** : du texte, pas le fichier. Un `\` devant la ponctuation de
  Markdown (constatés : `#`, `*`, `-`, `.`, `<`, `>`, `[`, `]`, `_`, `` ` ``), deux espaces en fin
  de chaque ligne, les suites d'espaces réduites à une (alignements et retraits compris), le dernier
  retour à la ligne retiré. **Les emojis le coupent** : environ deux à trois caractères perdus par
  emoji, marqueur compris (NOYAU §5, « Aucun emoji »). Constaté (08/10/2026, six fichiers ;
  25/10/2026, trois fichiers).
- **Lire pour décider : `read_file_content` d'abord.** La lecture est complète si sa dernière ligne,
  une fois les `\` retirés, est le marqueur. Sinon, lire exactement (ci-dessous) ou faire le contrôle
  de queue.
- **Lire exactement**, pour réécrire, et pour décider quand le texte est incomplet. Ce qui suit est la
  voie brute de cet hôte sans poste. Dans l'ordre, la première qui tient :
  1. **Sortie dans un fichier** : décoder le base64 de `download_file_content` au shell. Exact si la
     taille est égale à `fileSize` et la dernière ligne est le marqueur. Constaté (08 et 25/10/2026,
     quatre fichiers de 50 à 144 Ko, empreinte identique au fichier du poste pour l'un).
  2. **Sortie dans la conversation : la double recopie.** Recopier le base64 en entier dans un
     fichier du conteneur, par l'outil d'écriture de fichiers et jamais par `echo`, puis le décoder.
     Recopier de même le texte de `read_file_content`, puis le restaurer (procédure « Lire
     intégralement » de `procedures.md`, sinon celle du guide `hotes/google-drive.md` du dépôt). Trois preuves, toutes : taille du décodé
     égale à `fileSize` ; marqueur en dernière ligne ; décodé et restauré identiques, ou identiques
     aux espaces près. Une seule manque : une recopie est fausse ; recommencer une fois, puis
     passer au point 3. Deux recopies de deux formes différentes qui concordent ne se trompent pas
     au même endroit. Constaté une fois (25/10/2026, `VERSION.md`, 4 890 octets : décodé et
     restauré identiques, empreinte identique au fichier du poste).
  3. **Rien ne tient** : pas de réécriture, dépôt (NOYAU §5quater). Pour décider : contrôle de queue,
     sinon lecture incomplète.
  La double recopie coûte deux fois la taille du fichier en sortie. Elle ne se fait que pour un
  fichier qu'on doit lire exactement.
- **Contrôle de queue**, pour décider seulement, quand `read_file_content` n'a pas rendu le marqueur
  et que le base64 est dans la conversation : recopie seulement ses 128 derniers caractères (des
  groupes de quatre, alignés sur la fin) et décode-les (`printf '%s' '<...>' | base64 -d`). Ils
  doivent finir par le marqueur, et leur début recouvrir la fin du texte de `read_file_content` sur
  au moins vingt caractères, `\` retirés et espaces réduits des deux côtés. Les deux ensemble font une
  lecture complète, bonne pour décider, jamais pour réécrire. Pas de recouvrement : lecture
  incomplète. Constaté une fois (08/10/2026, `capabilities.md`, 14 Ko : 64 caractères décodés,
  marqueur et recouvrement présents).
- **Chercher les emojis** (NOYAU §5, « Aucun emoji ») : au shell, sur une copie locale ou un fichier
  du poste,
  `python3 -c "import re,sys; p=re.compile('[\U00010000-\U0010FFFF\u2300-\u23FF\u2600-\u27BF\u2B00-\u2BFF\uFE0F\u200D]'); [print(f, len(p.findall(open(f,encoding='utf-8').read()))) for f in sys.argv[1:]]" *.md`.
  Sans copie locale, le texte de `read_file_content` montre ceux qui sont au-delà de U+FFFF sous une forme illisible (`ð`) : c'est un
  indice, pas un compte. Prouvé (gabarit 0.27.0, 08/10/2026).
- **Deux systèmes de fichiers** : le conteneur cloud de la session et le poste ne se voient pas. Un
  fichier écrit dans l'un n'existe pas dans l'autre tant qu'il n'a pas été transféré. Prouvé
  (instances en service, septembre 2026).

### Écrire

- **Au shell du poste** : modification localisée par `sed` ou un court script qui relit le fichier
  lui-même, jamais par un texte recopié depuis une sortie d'outil, qui peut être tronquée ; relecture
  par `tail -n 1` après. Prouvé (instances en service, septembre et octobre 2026).
- **Du conteneur vers le poste** : un fichier déjà transféré sous le même nom dans la session peut
  repartir avec son ancien contenu, et l'outil répond quand même qu'il est écrit. Un nom jamais
  utilisé, puis l'empreinte comparée. Constaté une fois (03/10/2026).
- **Renommer sans copier, sur le poste** : `mv -n "<nom altéré>" "<vrai nom>"` au shell du poste.
  `-n` ne remplace jamais un fichier existant, mais saute la collision sans le dire : la liste du
  dossier, relue après, dit seule si le renommage a eu lieu. Prouvé pour le déplacement dans un
  dossier connecté (dépôt du gabarit, septembre 2026). Qu'un renommage fait sur le poste se reporte
  sur le stockage partagé sous le même identifiant : non prouvé, c'est la vérification du NOYAU §5
  (« Un nom altéré ») qui le constatera.
- **Renommer sans copier, sans poste** : `update_file` du connecteur Google Drive, titre seul.
  Prouvé (archivages et renommages de la procédure de remplacement, instance d'essai, septembre
  2026). Que l'identifiant reste le même : non prouvé comme tel.
- **Supprimer** est fermé par défaut sur le poste, et s'ouvre dossier par dossier, sur une demande
  que l'opérateur accepte. Prouvé (instances en service, septembre 2026).
- **Git sur le poste** : une commande git lancée depuis le shell de la session, même en lecture,
  laisse un verrou `index.lock` dans le clone. Prouvé (02/10/2026, deux fois).

### Ce que cet hôte expose

- **Les tâches programmées** : les créer et les lister avec leurs heures de début et de fin. Prouvé
  (instance d'essai, septembre 2026). Les relancer avec une consigne : constaté une fois
  (04/10/2026). Recettes : guide `hotes/claude-taches-programmees.md` du dépôt, recopié dans
  `procedures.md` à l'installation du mode sans poste. Annoncé pour le 06/10/2026 : les nouvelles
  tâches Cowork tourneront dans le cloud et ne pourront pas être liées à un dossier du poste. Non
  prouvé (aide de Claude, lue le 04/10/2026).
- **La mémoire de compte** de l'opérateur, lisible selon la règle d'isolation de l'instance. Prouvé
  (instances en service, depuis août 2026).
- **Le web** : l'API GitHub a déjà refusé une lecture depuis une session Cowork, quand `git
  ls-remote` passait. Constaté une fois (09/09/2026).

### Ce que cet hôte n'expose pas

- **Un projet claude.ai sans dossier** (navigateur) n'a ni shell ni fichiers du poste : l'instance ne
  s'y lit que par ce que l'opérateur colle ou dépose. Constaté une fois (02/10/2026).
- **Une tâche programmée dans le cloud** n'a pas de poste : elle n'a que le stockage partagé, souvent
  en création seule (NOYAU §5quater). Prouvé (instance d'essai, 26/09/2026).
- **Une tâche programmée dans le cloud ne voit pas les noms du poste.** Un fichier que la
  synchronisation du poste a matérialisé sous `<nom> (1).md` reste `<nom>.md` pour elle, et elle ne
  peut ni le voir ni le rétablir : seule une session reliée au poste le voit, au rituel (NOYAU §0,
  point 1). Constaté une fois (instance en service, 06/10/2026).

## Constaté ici

_Rien encore._

[fin de claude.md]
