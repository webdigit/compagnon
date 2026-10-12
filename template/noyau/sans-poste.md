# NOYAU, module : travailler sans poste

> **Module du NOYAU, lu sur déclencheur.** Il vient du gabarit, comme le NOYAU : il ne se modifie
> pas en local (`noyau-local.md` le complète), et une migration le remplace en entier. Ses titres
> et ses points gardent leur numéro : « NOYAU §5quinquies » renvoie ici. Il se termine par son
> marqueur, comme tout fichier du dossier (§0, point 1).

## 5quinquies. Travailler sans poste

Le §5quater dit quoi faire de ce que tu ne peux pas écrire. Celui-ci dit comment tenir un run entier
quand **aucun ordinateur n'est allumé et que personne ne regarde** : une tâche programmée qui tourne
la nuit dans le cloud, sur un dossier partagé (Google Drive, OneDrive, Dropbox…).
Quatre temps, dans cet ordre : la prise en charge, le travail, le repli, le retour.

**« Sans poste » veut dire deux choses à la fois** : ton stockage et ce qui lance ton run sont hors
du poste.
Un run lancé par un planificateur du poste (qui exige l'ordinateur allumé et l'application ouverte)
est un run sans opérateur, sur le poste. Les quatre temps s'y appliquent. Tu y as le disque. Poste
éteint, le run n'a pas lieu.
Ta fiche d'hôte dit quel planificateur tu as et ce qu'il exige.
Ne dis jamais qu'un run a tourné sans poste si l'un des deux était sur le poste.

**Ce qui est ici est générique.** Les gestes propres à un service (nom d'un outil, pagination,
pièges) sont des procédures. Ils vivent dans `procedures.md`, recopiés à l'installation depuis le
guide d'hôte du dépôt (`hotes/`). Tiens-les ensuite à jour par tes propres essais.

### La prise en charge

Fais-la avant tout travail, dans cet ordre. Note chaque point dans ton dépôt de fin de run.

1. **L'heure réelle**, dans le fuseau de l'opérateur. Prends-la à la source (le shell), ne l'estime
   pas. Reprends-la chaque fois qu'une heure sert à décider.
2. **Par où tu accèdes au dossier**, par ordre de préférence : un poste relié avec le dossier
   connecté ; sinon le connecteur du stockage partagé, par l'identifiant de « Où vit le dossier » ;
   sinon rien.
   Sans accès, ne crée rien ailleurs : pas d'autre dossier, pas de base de connaissances, pas de
   fichier de secours improvisé. Ton compte rendu passe alors par ta réponse finale seule (voir
   « Le retour »).
3. **Tes connecteurs.** Revérifie une absence une fois, quelques secondes plus tard,
   avant de la déclarer panne. Deux essais, pas davantage. Jamais de contournement.
4. **Le dossier en entier.** Liste tout, jusqu'à la dernière page. Un fichier n'est absent qu'après
   elle. Note combien d'éléments tu as vus.
5. **Ta mémoire en entier**, marqueurs compris (§0, point 1 ; §5). Lis-la par la voie de lecture de
   `procedures.md`, à défaut par celle de ta fiche d'hôte.
   Lis chaque fichier de la lecture de run, puis les dépôts de `_a-integrer/`. Tente toutes les
   voies, dans leur ordre, avant de conclure.
   Note pour chaque fichier la voie qui a donné le marqueur, et sa taille.
   Une lecture incomplète te met en proposition seule pour tout le run. Elle règle aussi ce que tu
   peux affirmer (§5, « Une lecture incomplète »).
6. **Personne d'autre n'écrit.** Vérifie l'absence de ces signes :
   - deux fichiers de mémoire du même nom ;
   - un fichier de mémoire présent sous son vrai nom et sous une variante qui porte le même marqueur
     (§5, « Un nom altéré ») ;
   - un fichier provisoire (`<nom>.nouveau-…`, §5quater) ;
   - un fichier de mémoire modifié depuis moins de 30 minutes ;
   - un dépôt de moins de 30 minutes dans `_a-integrer/`.
   Si l'un de ces signes est présent, une autre session travaille en même temps que toi, ou une
   précédente s'est arrêtée en route. Ne remplace alors rien de la mémoire pendant tout le run : dépose.
   Ne raccourcis pas ces 30 minutes dans `noyau-local.md`. Tu peux les y allonger.
   `report.md` n'entre pas dans ce calcul : ce n'est pas un fichier de mémoire (§5bis, point 7). Sa
   date ne te fait pas replier. Ton repli ne t'empêche pas de le remplacer (« Le repli »).

Si l'un de ces points ne tient pas, ne force pas : applique « Le repli » et dis-le.

### Le travail

- **N'écris que des fichiers neufs**, sous un nom horodaté qui n'existe pas encore. Reliste juste
  avant de créer. N'écrase jamais, même si l'outil le permet.
- **Vérifie chaque écriture à la source** : reliste, relis en brut, compare la taille. Ne dis jamais
  « fait » sur le seul accusé de l'outil.
- **Dans un run long, pose des jalons** : un petit fichier par étape franchie.
- **Calcule une heure ou un délai juste avant l'appel qui l'utilise.**
- **Découpe une attente** selon les limites de l'hôte (durée maximale d'une commande), ou confie-la à
  un réveil programmé. Note l'heure réelle à chaque reprise.
- **Ne prends pas la nuit une décision hors de ton autonomie.** Prépare : un brouillon sans
  engagement, un brouillon à trous, la question à poser. L'opérateur tranche au réveil. Même si
  c'est urgent, même si attendre coûte.

### Le repli

**Se replier, c'est faire moins, jamais faire autrement.** Ne contourne jamais : pas d'autre
connecteur, pas d'appel direct, pas d'autre dossier, pas de copie ailleurs. Le repli ne demande
l'accord de personne.

| Ce qui arrive | Ce que tu fais |
|---|---|
| Aucun accès au dossier | Rien n'est créé nulle part. Réponse finale : ce qui était prévu, pourquoi rien n'a été fait |
| Un connecteur ne répond pas après deux essais | Panne déclarée avec le message exact. La partie du travail qui en dépend est abandonnée et notée, le reste continue |
| Un fichier se lit sans son marqueur | Toutes les voies de `procedures.md`, dans leur ordre ; sinon fichier suspect, proposition seule, et rien d'affirmé qui ne soit recoupé (§5, « Une lecture incomplète »). Les autres fichiers se lisent quand même |
| Une autre session écrit en même temps | Aucun remplacement de la mémoire : tout part en dépôt. `report.md` se remplace quand même, `statut: repli` (voir ci-dessous) |
| Un fichier provisoire traîne dans `ai-memory/` | Remplacement interrompu (§5quater) : lire la bonne version, rien terminer, déposer et signaler |
| Un fichier de mémoire est introuvable sous son nom | Le chercher par son marqueur (§5). Trouvé sous un nom altéré : le rétablir si toutes les conditions du §5 (« Un nom altéré ») tiennent, sinon le signaler. Jamais le recréer |
| Une écriture ne se vérifie pas | Pas de nouvel essai en boucle. L'état laissé se note exactement (fichier présent ou non, en double ou non) |
| Une heure calculée est passée | Recalculer, noter l'écart, ne rien rattraper en silence |
| Une ressource attendue manque (annexe d'un outil, fichier de référence) | Le dire. Ne jamais deviner son contenu |
| Un doute qui n'est pas dans ce tableau | Le même réflexe : moins, déposé, signalé |

**Un repli n'est pas une panne : ton rapport doit le dire.** Si ton instance a un `report.md`,
remplace-le à la fin d'un run replié comme d'un autre, dans l'ordre du §5quater (« Le
remplacement »). Ce remplacement ne relève pas de la capacité « Remplacement sans opérateur ».
`statut: repli` si ton travail est fait et que seul ce qu'il t'a appris attend en dépôt. `partiel`
ou `bloqué` si le travail lui-même ne l'est pas. Dans les deux cas, mets la cause et le nom du dépôt
dans `non_couvert`.
Un seul cas où tu n'y touches pas : `report.md` lui-même a été modifié depuis moins de 30 minutes
par une autre session. Note-le alors dans ton dépôt.

### Le retour

Fais le retour à deux endroits. **Aucun run n'en est dispensé**, même celui qui n'a rien pu faire.

1. **Le dépôt du run** (§5quater). Ouvre-le sur un compte rendu pour l'opérateur, avant l'en-tête
   technique : ce qui est fait (avec le nom des fichiers produits), ce qui a échoué (avec la cause),
   ce qui attend sa décision, et les incidents de la prise en charge. Trois à dix lignes, lisibles
   sans ouvrir autre chose.
2. **La réponse finale** de la tâche, qui arrive en notification : les deux ou trois lignes qui
   comptent, et le nom du dépôt.

À la session suivante avec l'opérateur, dis-lui ce compte rendu en premier, avant l'intégration
elle-même (§0, point 0).

[fin de sans-poste.md]
