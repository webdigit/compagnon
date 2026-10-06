# Guide d'hôte : Google Drive

> Le dossier de l'instance vit dans Google Drive. Un poste peut le voir en local (Google Drive pour
> ordinateur), mais un run de nuit n'a que le **connecteur Google Drive** de Claude. Ce guide dit ce
> que ce connecteur sait faire, ce qu'il ne sait pas faire, et les gestes qui marchent.
>
> **Source** : l'instance Pilote, projet « TEST SYNCHRO DRIVE », essais du 24 au 26/09/2026 (tests T1
> à T14). Statuts : voir `hotes/README.md`. **État des connaissances au 26/09/2026**, à compléter par
> les tests en cours ; noms altérés côté poste, au 06/10/2026.

---

## Ce que le connecteur sait faire, et ce qu'il ne sait pas faire

| Geste | Possible ? | Statut |
|---|---|---|
| Lister un dossier par son identifiant | Oui, en plusieurs pages | Prouvé (T1, T2a, T10) |
| Lire un fichier `.md` ou `.txt` | Oui, deux outils, dont un qui peut couper la fin | Prouvé (T2a) |
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
2. **La lecture qui coupe.** L'outil de lecture texte (`read_file_content`) rend parfois un `.md` sans
   sa dernière ligne, et les emojis illisibles. Le fichier est sain : le téléchargement brut
   (`download_file_content`, base64 à décoder) rend tout. **Toute lecture qui fonde une décision ou
   une réécriture passe par le téléchargement brut**, et se vérifie par le marqueur de fin. Prouvé
   (T2a, quatre fichiers touchés).
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
Déclencheur : lire un fichier de mémoire ou de travail via le connecteur.
Autonomie : N1, lecture seule.
Étapes :
1. download_file_content(fileId) ; décoder le base64 dans le shell (base64 -d).
2. Vérifier : taille décodée = fileSize du Drive, et dernière ligne = [fin de <nom>] pour un fichier de mémoire.
3. read_file_content n'est acceptable que pour survoler un fichier dont la fin ne compte pas.
Vérification : taille et marqueur.
Fragile : read_file_content peut couper la dernière ligne et abîmer les emojis.
Dernière exécution vérifiée : <date>.
Périme le : <date + 3 mois>.
Origine : guide d'hôte compagnon google-drive.md.
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
2. download_file_content de l'ancien, décodé ; garder cette copie intacte ; vérifier taille et marqueur.
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
