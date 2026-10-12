# NOYAU, module : la mise à jour par rapport au gabarit

> **Module du NOYAU, lu sur déclencheur.** Il vient du gabarit, comme le NOYAU : il ne se modifie
> pas en local (`noyau-local.md` le complète), et une migration le remplace en entier. Ses titres
> et ses points gardent leur numéro : « NOYAU §6bis » renvoie ici. Il se termine par son
> marqueur, comme tout fichier du dossier (§0, point 1).

## 6bis. Mise à jour par rapport au gabarit (suite)

Ta version est déclarée dans `VERSION.md`. À la demande :

1. **Lis `VERSION.md`** : c'est ton point de départ.
1bis. **Vérifie que ton NOYAU est pur**, avant de toucher à quoi que ce soit. Compare trois textes :
   le NOYAU du gabarit à l'étiquette sur laquelle tu es aligné, ton fichier NOYAU, et la copie que
   ton hôte t'a chargée. Hors trous remplis, ils doivent être identiques.
   Les modules de `noyau/` et `NOYAU-pourquoi.md` n'ont pas de trous : ils doivent être identiques
   à ceux du gabarit. Une différence s'y traite comme une différence du NOYAU.
   Toute différence est une spécificité hors de sa place. Déplace-la dans `noyau-local.md` selon la
   procédure d'extraction de `MIGRATIONS.md` (0.15.0 → 0.15.1), et liste-la. L'opérateur valide
   **avant** que tu migres.
   Si le fichier et la copie chargée divergent, arrête-toi et demande lequel fait foi.
   N'applique jamais une migration sur un NOYAU qui porte du local.
1ter. **Vérifie tes points d'entrée**, comme le NOYAU au point 1bis : **avant** de migrer.
   À la racine du projet, `CLAUDE.md`, `AGENTS.md` et `GEMINI.md` sont ceux du dossier `entrees/`
   du gabarit, à l'étiquette que tu vises, nom de l'agent rempli, rien d'autre.
   Retire les lignes `@`, la ligne `Hôte` et la ligne de la liste qui nomme la fiche : les trois
   doivent être identiques. Pour chacun :
   - **absent** : pose-le depuis `entrees/` ;
   - **conforme** : n'y touche pas ;
   - **divergent sans rien de propre** (un ancien modèle du gabarit) : archive-le, puis pose le
     modèle ;
   - **porteur de propre** (une mission, une règle, des interdits, une liste de documents) : liste
     ce propre et propose de le ranger dans `noyau-local.md`, dans le bloc de la section du NOYAU
     qu'il complète. Attends l'accord de l'opérateur, puis archive-le et pose le modèle.
   Avec l'extraction du point 1bis, ce sont les deux seules écritures dans `noyau-local.md` qu'une
   mise à jour connaisse. Elles attendent l'accord de l'opérateur.
   L'archive va dans `_archive/racine/<AAAA-MM>/<nom>-avant-<AAAA-MM-JJ-HHMM>.md`. Un point d'entrée
   ne porte pas de marqueur : vérifie la copie par son empreinte, identique à l'original, avant de
   le remplacer.
1quater. **Le clone est à côté du projet, jamais le projet lui-même.** Avant toute commande git,
   regarde la racine du projet. Si elle porte un `.git` dont le remote est `webdigit/compagnon`
   (lis `.git/config`, sans lancer git), le projet est un clone du gabarit.
   Arrête-toi alors, ne lance aucune commande git, et signale-le à l'opérateur. C'est à lui de
   retirer ce `.git` et les fichiers du gabarit (MIGRATIONS 0.24.0 → 0.25.0). Ne migre pas tant
   qu'ils sont là.
2. **Trouve la dernière version publiée.** Si un clone du dépôt est posé à côté du projet,
   `git tag -l`. Sinon, par le web : `https://api.github.com/repos/webdigit/compagnon/tags`.
3. **Lis le guide à cette étiquette**, jamais sur `main` :
   `https://raw.githubusercontent.com/webdigit/compagnon/refs/tags/<étiquette>/MIGRATIONS.md`
   (ou `git show <étiquette>:MIGRATIONS.md` si tu as le clone). Un fichier du gabarit se récupère de
   la même façon, sous `.../refs/tags/<étiquette>/template/<fichier>`, et un point d'entrée sous
   `.../refs/tags/<étiquette>/entrees/<fichier>`.
4. **Applique dans l'ordre** les migrations postérieures à ta version. Elles touchent la
   structure, jamais le contenu. Elles ne touchent jamais `noyau-local.md`.
   Si une section que tu remplaces est complétée dans `noyau-local.md`, relis le complément contre
   le nouveau texte. Signale-le s'il n'a plus de sens.
5. **Mets `VERSION.md` à jour**, étiquette comprise.
6. **Termine par un rapport en deux listes** : ce que tu as changé, et ce que l'opérateur doit faire
   lui-même. La seconde ne reste jamais implicite.
   Dès que le NOYAU ou `noyau-local.md` a bougé, le recollage y figure en tête : **NOYAU puis
   spécificités**, les deux, dans cet ordre.

Si tu ne peux ni lire le dépôt ni atteindre le web, dis-le et demande le `MIGRATIONS.md` de la
version visée. Ne prétends jamais avoir récupéré une version. Jamais de script (compagnon P11).

[fin de migration.md]
