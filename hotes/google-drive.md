# Guide d'hôte : Google Drive

> Le dossier de l'instance vit dans Google Drive. Un poste peut le voir en local (Google Drive pour
> ordinateur), mais un run de nuit n'a que le **connecteur Google Drive** de Claude. Ce guide dit ce
> que ce connecteur sait faire, ce qu'il ne sait pas faire, et les gestes qui marchent.
>
> **Source** : l'instance Pilote, projet « TEST SYNCHRO DRIVE », essais du 24 au 26/09/2026 (tests T1
> à T14). Statuts : voir `hotes/README.md`. **État des connaissances au 26/09/2026**, à compléter par
> les tests en cours ; noms altérés côté poste, au 06/10/2026 ; voies de lecture, au 08/10/2026
> (tests L1 à L7, instance GESTION PLANNING, lecture seule).

---

## Ce que le connecteur sait faire, et ce qu'il ne sait pas faire

| Geste | Possible ? | Statut |
|---|---|---|
| Lister un dossier par son identifiant | Oui, en plusieurs pages | Prouvé (T1, T2a, T10) |
| Lire un fichier `.md` ou `.txt` | Oui, deux outils : l'un rend du texte retouché, et le coupe s'il porte des emojis ; l'autre rend le fichier exact, en base64 | Prouvé (T2a) ; mécanisme constaté une fois (L1 à L7, 08/10/2026) |
| Créer un fichier texte | Oui, à condition de désactiver la conversion | Prouvé (T1 à T14) |
| **Réécrire le contenu d'un fichier existant** | **Non.** La mise à jour ne change que le titre et le dossier parent | Prouvé (v2 de la synthèse Pilote) |
| Renommer, déplacer | Oui | Prouvé (archivages PR008) |
| Supprimer | Par la corbeille, avec validation | **Non prouvé** (test T19 à faire) |
| Lire un autre dossier du même compte | Oui, par son identifiant | Prouvé (T11, lecture seule) |

**Conséquence directe** : sur Google Drive, le connecteur est un hôte **en création seule**. Toute
mise à jour de la mémoire passe par le **remplacement** ou le **dépôt** du NOYAU §5quater. Il n'y a
pas de troisième voie.

---

## Les pièges, du plus coûteux au moins coûteux

1. **La pagination.** Une recherche renvoie ses résultats en plusieurs pages, et la première peut
   être très courte (5 éléments sur 29, avec une taille de page demandée de 100). Même une recherche
   par identifiant **et** par titre peut renvoyer le bon fichier en page 2. **Un fichier n'est absent
   qu'après la dernière page.** Prouvé, six fois.
2. **La lecture qui coupe, et pourquoi.** L'outil de lecture texte (`read_file_content`) rend
   parfois un `.md` sans sa fin, marqueur compris. Le fichier est sain : le téléchargement brut
   (`download_file_content`) rend tout. Prouvé (T2a, quatre fichiers). **La cause constatée : les
   emojis.** Le 08/10/2026, sur six fichiers d'une instance en service : `mistakes.md` (109 Ko, aucun
   emoji au-delà de U+FFFF) et `objectives.md` (8 Ko, aucun) sont arrivés entiers ; `report.md` (1
   emoji), `learned-rules.md` (4), `operational-state.md` (6) et `capabilities.md` (11) ont perdu
   leur fin, marqueur compris, environ deux à trois caractères par emoji. La taille n'y est pour
   rien. Constaté une fois (L1 à L4) ; mécanisme exact supposé. D'où la règle du NOYAU §5, « Aucun
   emoji ».
   **Ce que rend `read_file_content`, même entier** : du texte retouché, pas le fichier. `\` ajouté
   devant `#`, `*`, `[`, `_`, `` ` ``, `>` ; suites d'espaces réduites à une ; deux espaces et un
   retour en fin de ligne ; emojis au-delà de U+FFFF illisibles (`ð`). Comparé ligne à ligne au
   fichier brut, `learned-rules.md` diffère sur 112 blocs, même `\` retirés. **Il suffit pour lire et
   décider, si son marqueur est là ; il ne fonde jamais une réécriture.** Constaté une fois (L2).
2bis. **Où arrive le contenu.** Une sortie trop longue n'arrive pas dans la conversation : l'hôte
   Claude l'enregistre dans un fichier JSON du conteneur et donne son chemin. Le shell la lit. Pour
   `download_file_content`, le décodage donne alors le fichier exact (taille égale à celle du
   listage, marqueur en dernière ligne : 87, 109 et 144 Ko, L5). Une sortie courte arrive dans la
   conversation : le base64 d'un petit fichier (14 et 16 Ko, L6) ne se décode qu'en le recopiant, ce
   qu'on ne fait jamais en entier. Seuil non mesuré, entre 16 et 87 Ko. Constaté une fois, en
   session Cowork dans le cloud ; en tâche programmée, non prouvé.
3. **Les écritures simultanées.** Google Drive accepte deux fichiers du même nom dans un même
   dossier. Deux sessions qui remplacent le même fichier à dix secondes d'écart créent deux versions,
   et la seconde peut archiver celle que la première venait d'écrire. Constaté deux fois le
   26/09/2026 (Pilote, O005 et O008). D'où le point 6 de la prise en charge (NOYAU §5quinquies).
4. **La conversion.** Un fichier texte créé sans précaution devient un Google Doc. Toujours
   `disableConversionToGoogleType: true` et le bon `contentMimeType`. Prouvé.
5. **L'heure.** Les dates du Drive sont en UTC. Pour horodater, prendre l'heure dans le shell cloud
   avec le fuseau de l'opérateur (`TZ=Europe/Brussels date`). Prouvé.
6. **L'identifiant change à chaque remplacement.** Un lien partagé vers un fichier de mémoire pointe,
   après remplacement, vers la version archivée. Prouvé.
7. **L'archive qui enfle.** Chaque remplacement archive une copie **entière** de l'ancienne version.
   Un fichier qui grossit, remplacé souvent, fait croître l'archive bien plus vite que lui. Chez
   Pilote, en un jour et demi : environ 1 Mo et 70 fichiers, dont 19 versions d'`operational-state`
   en une seule journée (de 3,5 à 20 Ko, parfois à cinq minutes d'écart) et 13 versions d'une
   synthèse de 4 à 52 Ko. Ces deux fichiers faisaient près de 60 % de l'archive. Remèdes : remplacer
   par lot (NOYAU §5quater, une fois par point d'étape, une fois par run sans opérateur, depuis
   0.16.1) ; sortir de l'état ce qui ne fait que s'ajouter, le journal des cas (`journal/`, un
   fichier par session, depuis 0.17.0). Un document de travail qui grossit (une synthèse, un
   compte rendu cumulatif) suit la même logique : un complément daté plutôt qu'une nouvelle version
   entière, et une consolidation rare, en séance avec l'opérateur. Constat prouvé (26/09/2026) ;
   effet des remèdes non encore mesuré.

### Côté poste (quand un ordinateur est relié)

- **Mac** : un fichier créé par le connecteur peut rester illisible en local (« Resource deadlock
  avoided ») tant que Google Drive pour ordinateur ne l'a pas téléchargé. Le lire par le connecteur,
  ou le copier dans la session, ce qui le télécharge. Prouvé, à plusieurs reprises.
- **Mac** : après un remplacement fait dans l'ancien ordre (nouvelle version créée **sous le même
  nom** pendant que l'ancienne l'occupe encore), la nouvelle version reste affichée en local sous
  `<nom> (1).md`, alors que son titre sur le Drive est bien `<nom>.md`. Google Drive pour ordinateur
  a résolu le doublon passager par un suffixe, et ne le retire pas une fois l'ancienne archivée. Une
  session locale ne trouve alors plus `<nom>.md`, et l'écran ne charge plus `_ecran/etat.js`. Prouvé
  (six fichiers, dont `etat.js` et `attente.js`, 26/09/2026 ; titres Drive vérifiés corrects le même
  jour).
- **Le nom provisoire réduit le « (1) », il ne le supprime pas.** Avec l'ordre du NOYAU §5quater
  (nouvelle version sous `<nom>.nouveau-…`, ancienne archivée, puis renommage), le Mac a affiché
  `<nom>.md` sans suffixe : constaté une fois (Pilote, 27/09/2026, deux fichiers). Mais le
  06/10/2026, après un remplacement de `report.md` fait dans cet ordre par une tâche programmée dans
  le cloud, le poste a matérialisé `report (1).md`, sans aucun `report.md` local, alors que le Drive
  en ligne ne portait qu'un `report.md`, correct. Constaté une fois (instance en service). Cause
  supposée, non vérifiée : le client du poste applique le renommage du provisoire avant d'avoir
  retiré l'ancien `report.md` local, et règle ce doublon passager par un suffixe. **Conséquences** :
  une tâche dans le cloud ne voit rien, puisque le Drive est juste ; c'est la session suivante sur
  le poste qui trouve le fichier par son marqueur et lui rend son nom, aux conditions du NOYAU §5
  (« Un nom altéré »), puis le remplacement par le connecteur se vérifie aussi côté poste quand un
  poste est relié (NOYAU §5quater, étape 6 ; procédure ci-dessous, étape 10).
- **Un « (1) » peut disparaître seul** quand une session télécharge le fichier par le connecteur.
  Constaté une fois (Pilote, 27/09/2026). C'est une raison de plus pour ne rien renommer pendant
  que la synchronisation travaille (NOYAU §5, condition 6).
- **PC Windows** : pas d'erreur de ce type sur un fichier créé par le connecteur. **Constaté une
  fois** (test T16 à faire).
- **Écrire par le poste ou par le connecteur revient au même** une fois la synchronisation faite.
  **Non prouvé** dans les deux sens (test T17 à faire).

---

## Procédures à recopier dans `procedures.md`

Format : le schéma d'entrée de `procedures.md`. Remplacer `<ID DU DOSSIER>` et les autres
identifiants par ceux de l'instance.

```
## PR### : Lister un dossier Drive sans rien manquer
Déclencheur : lister, chercher un fichier, conclure qu'un fichier existe ou non.
Autonomie : N1, lecture seule.
Préconditions : l'identifiant du dossier (NOYAU, « Où vit le dossier »). Jamais une recherche par nom seul.
Étapes :
1. search_files, query parentId = '<ID DU DOSSIER>', pageSize 100, excludeContentSnippets true.
2. Tant qu'un nextPageToken revient, relancer avec pageToken.
3. Pour un fichier précis : parentId = '<ID>' and title contains '<motif>', et lire quand même la page suivante.
Vérification : le nombre d'éléments cumulé sur toutes les pages ; « absent » seulement après la dernière page.
Fragile : la première page peut être très courte malgré pageSize.
Dernière exécution vérifiée : <date>.
Périme le : <date + 3 mois>.
Origine : guide d'hôte compagnon google-drive.md.
```

```
## PR### : Lire intégralement un fichier texte du Drive
Déclencheur : toute lecture de mémoire par le connecteur, au rituel ou en cours de run (lire pour décider), et toute lecture qui précède une réécriture, un remplacement ou une rotation (lire pour réécrire).
Autonomie : N1, lecture seule.
Préconditions : l'ID du fichier et son fileSize, pris au listage (PR « Lister un dossier Drive »).
Étapes, pour LIRE ET DÉCIDER (dans l'ordre, chaque voie tentée avant de conclure) :
1. read_file_content(fileId). Si la sortie est enregistrée dans un fichier : jq -r .fileContent <chemin> > <copie>.txt, puis lire <copie>.txt.
2. Complet si la dernière ligne, \ retirés, est [fin de <nom>]. Ce texte sert à lire ; il ne sert jamais à réécrire.
3. Marqueur absent : download_file_content(fileId). Sortie enregistrée dans un fichier : passer à l'étape 5, c'est une lecture brute complète.
4. Base64 arrivé dans la conversation : contrôle de queue. Recopier seulement ses 128 derniers caractères, printf '%s' '<...>' | base64 -d. Complet si ces octets finissent par le marqueur ET recouvrent la fin du texte de l'étape 1 sur au moins 20 caractères (\ retirés, espaces réduits des deux côtés). Ne jamais recopier un base64 entier.
5. Rien de tout cela : lecture incomplète (NOYAU §5, « Une lecture incomplète ») ; noter chaque voie et ce qu'elle a rendu.
Étapes, pour LIRE ET RÉÉCRIRE :
1. download_file_content(fileId), sortie enregistrée dans un fichier ; python3 -c "import json,base64,sys; d=json.load(open(sys.argv[1])); open(sys.argv[2],'wb').write(base64.b64decode(d['content']))" <chemin> <copie>.md
2. Vérifier : wc -c <copie>.md = fileSize ; tail -n 1 <copie>.md = [fin de <nom>].
3. Base64 arrivé dans la conversation : pas de voie brute. Pas de réécriture : dépôt (NOYAU §5quater).
Vérification : le marqueur, et pour la voie brute la taille exacte.
Fragile : un emoji dans le fichier coupe read_file_content (NOYAU §5, « Aucun emoji ») ; le seuil d'enregistrement en fichier dépend de l'hôte et n'est pas mesuré ; jamais comparer deux lectures par read_file_content entre elles.
Dernière exécution vérifiée : <date>.
Périme le : <date + 3 mois>.
Origine : guide d'hôte compagnon google-drive.md (0.27.0, tests L1 à L7 du 08/10/2026).
```

```
## PR### : Créer un fichier texte dans le Drive depuis le cloud
Déclencheur : déposer un fichier via le connecteur.
Autonomie : selon capabilities.md (dépôt dans son propre dossier : niveau 1).
Étapes :
1. Heure : TZ=<fuseau> date '+%Y-%m-%d-%H%M' dans le shell cloud.
2. Relister le dossier cible (toutes les pages) : le nom ne doit pas exister ; sinon changer le nom.
3. create_file : title, parentId, textContent, contentMimeType text/markdown ou text/plain, disableConversionToGoogleType true.
Vérification : recherche parentId + title, puis téléchargement brut et comparaison de taille.
Fragile : sans disableConversionToGoogleType, le fichier devient un Google Doc.
Dernière exécution vérifiée : <date>.
Périme le : <date + 3 mois>.
Origine : guide d'hôte compagnon google-drive.md.
```

```
## PR### : Remplacer un fichier du Drive (nouvelle version, ancienne archivée)
Déclencheur : mettre à jour un fichier existant quand seul le connecteur est disponible, au plus une fois par point d'étape (une fois par run sans opérateur).
Autonomie : NOYAU §5quater. Opérateur présent : remplacement. Personne : « Remplacement sans opérateur » ouvert, sinon dépôt.
Préconditions : prise en charge tenue (NOYAU §5quinquies), en particulier le point 6 : un seul fichier de ce nom, aucun fichier <nom>.nouveau-*, pas modifié à l'instant par une autre session.
Étapes :
1. Relister (toutes les pages) ; noter l'ID de l'ancien. Deux fichiers du nom visé, ou un <nom>.nouveau-* présent : arrêt, dépôt.
2. download_file_content de l'ancien, sortie enregistrée dans un fichier, décodé au shell (PR « Lire intégralement », lire pour réécrire) ; garder cette copie intacte ; vérifier taille et marqueur. Base64 arrivé dans la conversation : arrêt, dépôt.
3. Éditer une copie par script (jamais retaper un fichier de mémoire de tête), avant le marqueur. Le marqueur garde le vrai nom.
4. Heure : TZ=<fuseau> date '+%Y-%m-%d-%H%M'. create_file sous le nom provisoire <nom>.nouveau-<AAAA-MM-JJ-HHMM>.<ext>, même parent, conversion désactivée.
5. Vérifier avant tout archivage : le provisoire est à la bonne taille ; téléchargement brut identique octet pour octet à la copie éditée ; diff avec l'ancien : seules les lignes voulues changent, le marqueur est la dernière ligne.
6. update_file de l'ancien : titre <nom>-avant-<AAAA-MM-JJ-HHMM>.<ext>, parent = _archive/ai-memory/<AAAA-MM>/ (dossier du mois créé s'il manque : create_file, mimeType dossier).
7. Relister : plus aucun fichier du vrai nom dans le dossier. Sinon : arrêt, dépôt, rien renommer.
8. update_file du provisoire : titre <nom>.<ext>.
9. Relister : exactement un fichier du vrai nom (l'ID du provisoire), aucun provisoire ; l'ancien est dans l'archive avec son marqueur.
10. Si un poste est relié (dossier connecté, synchronisé par Google Drive pour ordinateur) : côté poste, relever le dossier toutes les minutes, cinq minutes au plus, jusqu'à voir la version archivée dans _archive/ai-memory/<AAAA-MM>/ et plus aucun provisoire. Puis : un seul <nom>.<ext> sur le poste, empreinte (sha256sum) égale à celle de la copie éditée. Un <nom> (1).<ext> à sa place : procédure « Rétablir un nom altéré » ci-dessous. Pas rattrapé en cinq minutes : le noter, ne rien renommer.
Vérification : étapes 5, 7, 9 et 10. Un seul écart : pas de nouvel essai, dépôt, et l'état laissé se note (quel fichier porte quel nom, sur le Drive et sur le poste).
Fragile : l'ID change ; entre 6 et 8, aucun fichier ne porte le vrai nom (la mémoire est le provisoire, NOYAU §5quater, « remplacement interrompu ») ; le poste peut matérialiser <nom> (1).<ext> alors que le Drive est juste (constaté une fois, 06/10/2026).
Dernière exécution vérifiée : <date>.
Périme le : <date + 3 mois>.
Origine : guide d'hôte compagnon google-drive.md (Pilote PR008, ordre revu en 0.16.1, étape 10 en 0.26.0).
```

```
## PR### : Rétablir un nom altéré par la synchronisation (côté poste)
Déclencheur : au rituel ou après un remplacement, un fichier du périmètre porte en dernière ligne le marqueur d'un autre nom (<nom> (1).md, par exemple), ou un fichier attendu est introuvable sous son nom.
Autonomie : N1, « Mise à jour de la mémoire », avec ou sans opérateur, aux seules conditions du NOYAU §5 (« Un nom altéré »). Une condition manque : proposer (opérateur présent) ou noter dans le dépôt (sans lui).
Préconditions : session reliée au poste, dossier connecté ; connecteur Google Drive joignable (sans lui, la condition 7 du NOYAU ne tient pas : signaler, ne rien renommer).
Étapes :
1. Poste : lister le dossier où le vrai nom est attendu ; tail -n 1 de chaque fichier. Noter : aucun <nom>.<ext> ; un seul fichier porte [fin de <nom>.<ext>], provisoires et versions -avant- comprises ; aucun <nom>.nouveau-* ; dates de modification (stat), aucune à moins de 30 minutes, fichier altéré compris, hors remplacement fait par cette session.
2. Poste : sha256sum et taille du fichier altéré.
3. Drive : lister le dossier par son ID (toutes les pages) ; exactement un <nom>.<ext>, aucun titre au nom altéré ; noter son ID ; download_file_content, décoder, sha256sum : égale à celle de l'étape 2.
4. Poste : mv -n "<nom altéré>" "<nom>.<ext>".
5. Poste : relister ; un seul <nom>.<ext>, plus de nom altéré, tail -n 1 = marqueur, sha256sum et taille inchangées.
6. Drive, une à deux minutes plus tard : relister ; un seul <nom>.<ext>, même ID qu'à l'étape 3, aucun titre au nom altéré.
Vérification : étapes 5 et 6. Un écart : aucun nouvel essai ; noter quel fichier porte quel nom, sur le poste et sur le Drive, et le signaler.
Fragile : le report du renommage local sur le Drive sous le même ID n'est pas encore prouvé (à constater au premier passage, étape 6) ; Google Drive pour ordinateur peut encore traiter la synchronisation précédente (d'où les 30 minutes).
Dernière exécution vérifiée : <date>.
Périme le : <date + 3 mois>.
Origine : guide d'hôte compagnon google-drive.md (0.26.0, après le report (1).md du 06/10/2026).
```

```
## PR### : Constater l'état des connecteurs au démarrage d'un run
Déclencheur : un outil semble absent ou en panne.
Autonomie : N1.
Étapes :
1. Rechercher l'outil par le nom de son serveur.
2. S'il est en cours de connexion : attendre quelques secondes, rechercher de nouveau. Deux essais au plus.
3. Consigner le message d'erreur exact. Aucun contournement.
Vérification : l'outil répond, ou l'échec est déclaré par le système.
Fragile : délais de connexion au démarrage et à chaque réveil d'une session.
Dernière exécution vérifiée : <date>.
Périme le : <date + 3 mois>.
Origine : guide d'hôte compagnon google-drive.md (Pilote PR005, T6).
```

---

## Ce qui reste à établir

| Question | Test prévu chez Pilote |
|---|---|
| La suppression passe-t-elle vraiment par la corbeille, avec validation ? | T19 |
| Le PC lit-il toujours sans erreur un fichier créé par le connecteur ? | T16 |
| Écrire par le poste ou par le connecteur : même visibilité, en combien de temps ? | T17 |
| Un dossier rattaché à un projet claude.ai ne l'est-il qu'à un seul ordinateur à la fois ? | T15 |
| Avec le nom provisoire, le poste affiche-t-il toujours `<nom>.md` sans suffixe ? Oui une fois (Mac, 27/09), non une fois (06/10) : à quelles conditions le « (1) » revient-il ? | T20 |
| Renommer sur le poste `<nom> (1).md` en `<nom>.md` laisse-t-il le titre Drive et l'ID inchangés ? Le premier rétablissement par l'agent le constatera (procédure « Rétablir un nom altéré », étape 6) | T21 |
| En tâche programmée, une sortie longue du connecteur est-elle aussi enregistrée dans un fichier lisible au shell ? Le premier run après la 0.27.0 le constate | L8 |
| À partir de quelle taille la sortie part-elle dans un fichier ? Entre 16 et 87 Ko constaté | L9 |
| La perte de `read_file_content` est-elle exactement proportionnelle au nombre d'emojis, et seulement à ceux au-delà de U+FFFF ? Six fichiers vont dans ce sens | L10 |

### Tests de lecture du 08/10/2026 (L1 à L7)

Instance GESTION PLANNING, fichiers réels, lecture seule, session Cowork dans le cloud, hôte Claude.

| Test | Geste | Résultat |
|---|---|---|
| L1 | `read_file_content`, `objectives.md` (7,8 Ko, emojis du plan de base seulement) | Texte dans la conversation, retouché (`\#`, `\*`), marqueur présent : complet |
| L2 | `read_file_content`, `learned-rules.md` (144 Ko, 4 emojis au-delà de U+FFFF) | Sortie enregistrée en fichier JSON ; texte coupé à `[fin de learned-` ; 112 blocs différents du brut, `\` retirés |
| L3 | `read_file_content`, `operational-state.md` (88 Ko, 6) et `mistakes.md` (109 Ko, 0) | Le premier coupé à `[fin de operat` ; le second entier, marqueur présent |
| L4 | `read_file_content`, `capabilities.md` (14 Ko, 11) et `report.md` (7 Ko, 1) | Les deux dans la conversation, marqueur perdu, statuts en `ð` |
| L5 | `download_file_content`, `learned-rules.md`, `operational-state.md`, `mistakes.md` | Sorties enregistrées en fichier ; décodées au shell : 143 901, 87 711 et 109 033 octets, égaux au listage, marqueur présent |
| L6 | `download_file_content`, `objectives.md`, `capabilities.md`, `examples.md` (8, 14 et 16 Ko) | Base64 dans la conversation, non décodable sans recopie |
| L7 | Contrôle de queue sur `capabilities.md` : 64 derniers caractères du base64 recopiés et décodés | `0.9.0 → 0.22.1)._` puis `[fin de capabilities.md]` : marqueur présent, recouvrement avec la fin du texte de L4 |
