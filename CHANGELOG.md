# Changelog

Toutes les évolutions notables de **compagnon** sont consignées ici.
Format inspiré de Keep a Changelog. Versionnement sémantique.

Ce que versionne ce numéro : **tout ce dépôt**, soit la doctrine, le gabarit, la documentation et la
licence. Pas les instances : chacune déclare dans son `VERSION.md` la version dont elle est née, et
ne la change qu'en migrant explicitement.

**Ce fichier et les étiquettes git sont la seule source du numéro de version.** Aucun autre document
ne le duplique, pour qu'il ne puisse pas diverger (P7).

## [0.18.0] - 2026-09-26

### Changé

- **Le récit va au journal, l'état garde une ligne** (NOYAU §5). Le fichier de journal d'une
  session gagne trois sections facultatives : « Décisions de l'opérateur » (ses mots, tels quels,
  numérotés D1, D2… dans leur fichier), « Clos » (ce qui sort de l'état) et « Détails » (le récit
  qu'une ligne ne porte pas). Une session sans cas mais avec une décision ou un point clos crée
  donc son fichier.
- **Un point chaud tranché sort d'`operational-state.md` dans l'écriture qui le clôt**, avec une
  ligne dans « Clos ». Plus de ligne barrée « à retirer au prochain passage ».
- **Les observations ont une place** : section « Observations » d'`operational-state.md`, une ligne
  chacune avec son renvoi (NOYAU §3). Elles en sortent quand elles deviennent une hypothèse.
- **Le registre de `capabilities.md` ne porte plus que la décision** : une phrase par cellule et un
  renvoi vers les mots de l'opérateur au journal. Les conditions d'une capacité vivent dans sa
  colonne `Condition`, au catalogue, et le registre ne les recopie pas.
- **L'évaluation** renvoie aussi aux mots de l'opérateur (NOYAU §6ter point 4).

### Corrigé

- **Écran : les cas de `journal/` n'étaient pas comptés.** Un fichier de journal s'ouvre sur un
  titre « Journal des cas : <date> » sans tableau ; l'écran s'arrêtait à ce titre et ne voyait pas
  le tableau de la section suivante, donc aucun cas, et des échéances d'évaluation fausses. Il prend
  désormais la première section de ce nom qui porte un tableau. Contrat inchangé (4).

### La leçon

Sur Pilote, au bout de deux jours, 12 points chauds sur 22 étaient barrés en attendant un passage
qui ne vient jamais. Une seule décision du registre pesait 1,5 Ko, et 14 observations racontaient
leur histoire dans « Motifs ouverts », faute d'autre place. Rien n'y était faux : le récit était
simplement rangé là où l'on relit à chaque session, au lieu de là où l'on ne va que quand on le
cherche. Alléger une mémoire, ce n'est pas la résumer (compagnon P11) : c'est ranger chaque chose à
l'endroit où elle sera relue au moment où elle servira.

---

## [0.17.0] - 2026-09-26

### Changé

- **Le journal des cas quitte `operational-state.md`** pour `ai-memory/journal/`, un fichier par
  session qui a traité des cas, créé en fin de session et jamais réécrit (NOYAU §5, « Le journal des
  cas »). Les numéros se suivent d'un fichier à l'autre ; un cas passé se corrige dans les
  « Rectifications » de la session qui le constate. `operational-state.md` redevient un état court :
  à sa place, la section « Cas traités » ne garde que le dernier numéro inscrit.
- **L'évaluation compte les cas dans `journal/`** (NOYAU §0 point 3, `capabilities.md`,
  `mistakes.md`). Un fichier qui ne compte plus pour aucune évaluation peut partir dans
  `_archive/journal/<AAAA-MM>/` par simple déplacement.
- **L'archive se range par mois** : tout nouveau dépôt va dans le sous-dossier `<AAAA-MM>` de sa
  rubrique. Ce qui y est déjà reste où il est.
- **Écran, contrat 4** : `etat.js` transporte tous les fichiers de `journal/`, et l'écran y compte
  les cas en plus de ceux qu'`operational-state.md` porterait encore. Les contrats 1 à 3 restent
  lus.
- **Intégrer un dépôt** : ses cas entrent dans le journal de la session qui intègre (§5quater).

### La leçon

L'archive enflait parce que l'état portait son historique. Un fichier qui ne fait que s'allonger
n'a rien à faire dans un fichier qu'on remplace : chaque remplacement recopiait tout le passé. Sur
un stockage en création seule, la forme naturelle d'un historique est une suite de fichiers créés
une fois.

---

## [0.16.1] - 2026-09-26

### Corrigé

- **Le remplacement ne crée plus jamais deux fichiers du même nom.** L'ordre de 0.15.0 créait la
  nouvelle version sous le nom de l'ancienne, puis archivait l'ancienne. Sur Google Drive, le
  doublon passager suffit : Google Drive pour ordinateur affiche la nouvelle version en local sous
  `<nom> (1).md` et ne retire plus le suffixe. Le titre sur le Drive est juste, mais une session
  locale ne trouve plus `mistakes.md`, et l'écran ne charge plus `_ecran/etat.js`. Constaté chez
  Pilote sur six fichiers le 26/09/2026. La nouvelle version naît désormais sous un **nom
  provisoire** (`<nom>.nouveau-<AAAA-MM-JJ-HHMM>.<ext>`) et ne prend le vrai nom qu'après
  l'archivage de l'ancienne (NOYAU §5quater). L'ordre vaut pour tout fichier remplacé, écran et
  rapport compris.
- **Un remplacement interrompu se reconnaît et ne se répare pas seul** : un fichier provisoire
  resté dans `ai-memory/` dit où l'arrêt a eu lieu et quelle version est la mémoire. La prise en
  charge le détecte (§5quinquies, point 6), le repli a sa ligne.

### Ajouté

- **Le marqueur dit quel fichier c'est** (NOYAU §5). Un fichier de mémoire introuvable sous son nom
  se cherche par son marqueur avant d'être déclaré absent. Un fichier de mémoire introuvable ne se
  recrée jamais : un fichier neuf sous le bon nom cacherait le vrai.
- **Le remplacement se fait par lot** (NOYAU §5quater) : une fois par point d'étape, une fois par
  run au plus sans opérateur. Chaque remplacement archive une copie entière de l'ancienne version ;
  chez Pilote, 19 versions d'`operational-state` en une journée avaient fait de l'archive le premier
  poste de stockage.
- **`hotes/google-drive.md`** : procédure de remplacement réécrite dans le nouvel ordre, piège 7
  (l'archive qui enfle), cause du suffixe « (1) » expliquée, tests T20 et T21 à faire.

### La leçon

Le suffixe « (1) » était déjà noté en 0.16.0, comme une curiosité d'affichage : « en local, se fier
au contenu ». C'était une conséquence de notre propre ordre d'écriture, et elle cassait la seule
chose qui compte, retrouver sa mémoire par son nom. Un défaut rangé dans « fragile » au lieu d'être
corrigé reste un défaut.

---

## [0.16.0] - 2026-09-26

### Ajouté

- **NOYAU §5quinquies : travailler sans poste.** Quatre temps. La **prise en charge** (heure réelle,
  accès par identifiant, connecteurs revérifiés avant d'être déclarés en panne, dossier lu jusqu'à la
  dernière page, mémoire lue en entier, et personne d'autre en train d'écrire). Le **travail** (fichiers
  neufs seulement, vérification à la source, jalons, heure calculée juste avant l'appel, aucune
  décision hors autonomie la nuit). Le **repli** (faire moins, jamais faire autrement, avec une table
  incident par incident). Le **retour** (compte rendu en tête du dépôt, notification, et la session
  suivante qui commence par lui).
- **`hotes/`** : les guides d'hôte, hors gabarit. `google-drive.md` et `claude-taches-programmees.md`,
  écrits à partir des essais de l'instance Pilote, chaque affirmation avec son statut.
- **« Où vit le dossier »** gagne la ligne « Stockage partagé ».
- **`INSTALLATION.md`, étape 7** : le mode sans poste, et sa recette en quatre essais.

### La leçon

Tout ce qui est ici a été trouvé en deux nuits par une instance dont le métier était de le chercher.
Pilote a tourné en cloud, ordinateurs éteints, avec pour compétence de consigner ses propres essais :
tâches longues, pauses, réveils, connecteurs en panne, tâches qui en programment d'autres, écritures
simultanées. La plupart des règles de ce §5quinquies sont des incidents réels, pas des précautions
imaginées. Ce qui n'a pas encore été vu est marqué comme tel dans les guides, et se complétera de la
même façon.

---

## [0.15.2] - 2026-09-26

### Ajouté

- **Le marqueur de fin.** Chaque fichier d'une instance se termine par `[fin de <son nom>]`, seul
  sur sa dernière ligne : le NOYAU, les spécificités, chaque mémoire, chaque dépôt. Du texte, pas
  une balise. C'est la preuve qu'un fichier a été lu en entier et écrit en entier.
- **NOYAU §0, point 1 : une lecture incomplète ne fonde rien.** Un fichier reçu sans son marqueur se
  relit par une autre voie ; s'il en manque encore, l'agent n'y écrit pas, ne réécrit rien à partir
  de lui, et passe la session en proposition seule. `capabilities.md` illisible : tout est fermé.
- **NOYAU §5, « Le marqueur de fin »** : on écrit avant lui, jamais après. Une réécriture complète
  part d'une lecture complète faite juste avant, met l'ancienne à l'abri avant de la perdre, se
  relit par la voie brute et retrouve chaque ligne de l'ancienne. Une ligne qui disparaît sans
  figurer au bloc de fin de session est une perte.
- **Le recollage se vérifie** : le texte chargé doit porter les deux marqueurs, NOYAU et
  spécificités. Un champ d'instructions qui coupe se voit à l'installation (troisième contrôle de
  l'étape 5), et l'agent le dit en ouverture.
- **§4bis, point 9** : la passe de contrôle vérifie les marqueurs.
- **Corollaire de compagnon P5** : une lecture incomplète ne fonde rien.

### Corrigé

- **Le contrôle du remplacement (§5quater, étape 2) validait la perte qu'il devait empêcher.** Il
  comparait la nouvelle version à l'ancienne, mais relue par la même voie : si cette voie coupait la
  dernière ligne, elle la coupait des deux côtés, et la comparaison concluait « identique ». Il
  compare désormais des lectures brutes, marqueur compris, et une étape 0 interdit de remplacer un
  fichier qu'on n'a pas lu en entier.

### La leçon

Un fichier intact et un fichier lu en entier sont deux choses différentes, et rien ne les
distinguait. Une instance de nuit a constaté que son outil de lecture rendait `capabilities.md` et
son NOYAU sans leur dernière ligne, alors que le téléchargement brut les donnait complets. Aucun
fichier n'était abîmé ; mais la première réécriture fondée sur cette lecture l'aurait été, et le
contrôle prévu pour l'empêcher l'aurait approuvée.

On ne peut pas empêcher un outil de couper. On peut rendre la coupure visible à coup sûr, et
interdire qu'elle serve de base à quoi que ce soit. C'est ce que fait une ligne de texte à la fin
de chaque fichier. C'est encore R3 et R4 de `PUBLICATION.md` : trouvé en service, déclaré, remonté.

---

## [0.15.1] - 2026-09-26

### Ajouté

- **`noyau-local.md`**, dans le gabarit : les spécificités d'une instance, rangées par section du
  NOYAU. Il se colle à la suite du NOYAU, titre compris, et son en-tête dit à l'agent que ce sont
  ses instructions au même titre que le NOYAU. **Aucune migration n'y touche jamais.**
- **« Complète, ne desserre jamais. »** Une spécificité peut ajouter, durcir, préciser. Elle ne peut
  ni supprimer, ni assouplir, ni suspendre : une telle ligne est sans effet, et l'agent la signale.
  Une règle trop stricte pour un métier se remonte au gabarit, elle ne se contourne pas en local.
- **NOYAU §6bis, point 1bis** : avant toute migration, l'agent vérifie que son NOYAU est le texte du
  gabarit, en comparant la base, le fichier et la copie chargée. Une migration ne s'applique plus
  jamais sur un NOYAU qui porte du local.
- **L'extraction**, décrite dans `MIGRATIONS.md` : une seule fois, chaque différence entre le NOYAU
  en place et le gabarit est classée (trou rempli, retard, ajout ou durcissement, assouplissement,
  incertain), présentée à l'opérateur, et seulement ensuite déplacée. Elle passe avant toutes les
  autres migrations pour une instance qui n'a pas encore de `noyau-local.md`.

### Corrigé

- **Une migration pouvait écraser une adaptation locale sans que personne le voie.** Les migrations
  « reprennent depuis l'étiquette » des sections entières du NOYAU. Une retouche non déclarée dans
  une de ces sections disparaissait, et une retouche faite directement dans les Instructions du
  projet n'existait même pas dans le fichier que la migration lisait.

### La leçon

C'est compagnon P7 appliqué au NOYAU lui-même : deux propriétaires dans un seul texte. Le gabarit
écrivait le NOYAU, l'instance aussi, et rien ne disait quelle ligne était à qui. Tant que les deux
se mélangent, une mise à jour ne peut être que prudente ou destructrice. Une fois séparés, elle
peut être les deux choses à la fois qu'on attend d'elle : complète et sans risque.

La question est venue de l'opérateur, pas d'une instance, au moment de lancer deux migrations
lourdes sur six instances : « est-ce que tu lis d'abord le noyau en place ? ». La réponse honnête
était non. Il fallait la poser avant, pas après.

---

## [0.15.0] - 2026-09-26

### Ajouté

- **NOYAU §5quater : quand tu ne peux pas réécrire tes fichiers.** Deux techniques. Le **dépôt à
  intégrer**, un fichier neuf dans `_a-integrer/` qui dit ce qui a été lu, ce qui a déjà été écrit et
  ce qui reste à intégrer. Le **remplacement**, une nouvelle version sous le même nom et l'ancienne
  archivée, dans un ordre qui ne se réorganise pas : créer, relire, archiver, vérifier.
- **Une règle pour choisir.** Opérateur présent : remplacement. Personne : dépôt, sauf capacité
  accordée. « Remplacement sans opérateur » est une capacité du niveau 2, qui se mérite sur des dépôts
  intégrés sans correction. Même accordée, elle n'écrit jamais un jugement.
- **Corollaire de compagnon P1 : un run sans opérateur ne produit pas de reward.** Personne n'a
  relu : un cas de nuit est `non relu`, pas « sans correction ».
- **NOYAU §0 point 0** : la file se lit avec la mémoire, et s'intègre avec l'opérateur avant toute
  décision.
- **Le témoin d'attente de l'écran** (contrat de format 3) : `_ecran/attente.js`, créé par un run
  qui n'a pas pu régénérer l'état. L'écran dit alors qu'il n'est pas à jour.

### La leçon

Le défaut n'était pas visible depuis le poste de l'auteur, et il ne pouvait pas l'être. Toutes les
instances jusqu'ici tournaient avec un opérateur devant l'écran et un disque qui se réécrit. La
première à tourner la nuit, sur un stockage en création seule, a perdu en une semaine ce qu'elle
apprenait, l'a vu, et l'a déclaré comme écart. C'est R3 et R4 de `PUBLICATION.md`, dans l'ordre.

L'autre leçon est dans le choix. L'instance proposait trois options ; l'opérateur en a retenu une
quatrième, qui n'était sur aucune liste : **écrire seul est une capacité comme une autre.** Au début
tout passe par le dépôt ; une fois la confiance faite, l'écriture directe s'accorde ; au moindre
doute, on revient au dépôt. Ce n'était pas un problème de stockage à résoudre, c'était un cran de
plus sur l'échelle, et la méthode avait déjà tout ce qu'il fallait pour le gérer.

---

## [0.14.0] - 2026-09-24

### Ajouté

- **compagnon P13 : le point revient à échéance.** Chaque compétence est évaluée à intervalles
  réguliers, comme quelqu'un qu'on forme. L'agent fait revenir l'évaluation et prépare le dossier ;
  l'opérateur accorde, maintient ou retire un grade. Cinq grades : stagiaire, junior, medior,
  senior, expert.
- **Le grade se porte par compétence, jamais par agent.** Un grade global serait une moyenne sans
  usage. C'est le dernier corollaire de P3, qui existait depuis le début et que `capabilities.md` ne
  permettait pas de tenir : une autonomie acquise sur une compétence ne se transfère pas à une autre.
- **La grille**, dans `capabilities.md` : pour chaque grade, ce qu'il faut pour y accéder, le niveau
  de capacités qu'il permet de demander, et la cadence de l'évaluation suivante, en durée **ou** en
  nombre de cas, la première des deux. Valeurs par défaut, zone manuelle.
- **NOYAU §6ter**, l'évaluation : quand elle est due, le dossier, qui décide, et trois interdits.
  L'agent ne la lance pas seul, ne s'accorde jamais un grade, et ne saute pas de cran.
- **Une récidive rend l'évaluation due sur-le-champ.** Sans rétrogradation possible, une échelle ne
  monte que dans un sens.
- **Colonne `Compétence`** en fin des tableaux de niveau et du journal des cas.
- **L'écran lit les grades** (contrat de format 2) : une septième file, « Évaluations dues », en tête
  de tout ; les grades dans le cartouche ; la prochaine échéance de chaque compétence.

### Changé

- **Le frein porte sur la compétence de l'erreur.** Une erreur `ouverte` ou `corrigée` bloque les
  montées sur la compétence où elle a été commise. Une violation de principe les bloque toutes.
  C'est un assouplissement : en 0.13.0, toute erreur bloquait toute montée.
- **`L1, non prouvée` et `Autonomie : N1` disparaissent d'`operational-state.md`.** Deux niveaux
  écrits, dont aucun ne disait comment on en changeait. Le grade vit dans `capabilities.md`, et
  seulement là.

### La leçon

La méthode supposait un lecteur, et elle le disait : « si personne ne relit jamais, compagnon est un
dossier inerte ». C'était honnête, et c'était une démission. Tout ce qui fait mûrir un agent attendait
un geste humain, et P3 garantissait que personne ne le ferait à la place de l'opérateur. Rien ne
garantissait qu'il le fasse.

Ce que la 0.14.0 ajoute n'est pas un contrôle de plus, c'est un **rendez-vous**. La même idée qu'en
0.12.0 pour les demandes, prise un cran plus haut : ce qui attend une décision ne se tait pas, et ce
qui ne se tait pas finit par être décidé. Un agent qui prépare son évaluation et la rappelle à chaque
session ne force rien. Il rend seulement l'absence de décision visible, jour après jour, jusqu'à ce
qu'elle coûte plus que la décision.

L'autre leçon est venue en relisant le gabarit : le grade par compétence **existait déjà**. P3 le
posait, `operational-state.md` portait « Compétence 01 : L1 ». Mais rien ne disait ce qu'est un L2,
qui le décide, ni quand. Une étiquette sans règle de passage n'est pas un niveau, c'est une
décoration, et elle était là depuis la première version.

---

## [0.13.0] - 2026-09-15

### Ajouté

- **Un écran de lecture, facultatif** (`ecran/`). Une page à ouvrir d'un double-clic, sans rien
  installer, qui affiche une instance en mettant en tête ce qui attend une décision : capacités
  demandées, erreurs qui freinent, règles à confirmer, contradictions, points chauds, arbitrages
  métier. Elle lit la mémoire, elle n'écrit rien, par aucun chemin, et elle ne sort pas du dossier.
  **Une instance sans écran fonctionne à l'identique** : accessoire de lecture, pas organe.
- **`FORMAT.md`**, à la racine. La part du format que l'écran interprète, donc ce qu'on ne peut plus
  changer sans le savoir. Tout le reste demeure libre, et le contrat existe pour que l'accessoire ne
  devienne jamais une raison de ne pas faire évoluer le gabarit.
- **P12 gagne sa frontière.** « L'opérateur n'est pas l'extérieur. » Le principe interdisait que la
  mémoire devienne une interface ; il ne disait pas où l'extérieur commence. Un écran local qui
  montre la mémoire à celui dont elle porte les décisions ne crée pas un lecteur de plus. Trois
  conditions l'y tiennent : il ne sort pas de l'instance, il n'écrit rien, il ne fait pas autorité.
- **La date suit le statut** (NOYAU §3). `Statut : **provisoire** depuis le 27/08/2026`, dans
  `learned-rules.md` comme dans `mistakes.md`. Elle ne se valide pas : elle ne fait que constater le
  changement que l'agent vient d'inscrire.
- **NOYAU §5ter**, l'écran : ce que l'agent régénère en fin de session, et les six règles qui
  l'encadrent. La première est la seule qui compte : il recopie, il ne résume pas.
- **`VERSION.md` gagne une ligne `Écran`.** Sans elle, la migration suivante ne sait pas s'il y a un
  écran à mettre à jour, et une migration qui devine est une réécriture.

### Corrigé

- **Le gabarit demandait trois décisions fondées sur la durée sans écrire la durée.** Une règle qui
  mûrit contre une règle qui stagne, une erreur assez ancienne pour partir à l'archive, une demande
  qui attend depuis trop longtemps : trois jugements sur le temps, dont aucun n'avait de date à
  comparer. Ils se refaisaient de mémoire à chaque lecture, ce qui revient à ne pas les faire.
- **La colonne `Rappelé le` ne disait pas si elle gardait un rappel ou tous.** Elle devient
  `Rappels` et s'allonge : chaque rappel ajoute sa date, aucune ne s'efface. Le nombre de rappels
  sans réponse est ce qui mesure l'attente d'une demande, et c'est la seule trace de ce qu'elle a
  coûté. Aucune colonne ne les compte : le compte se lit en les comptant (P7).

### La leçon

Le gabarit a été corrigé par un lecteur mécanique, et c'est nouveau.

R3 de `PUBLICATION.md` dit qu'un gabarit se corrige par ses instances, jamais par relecture de son
auteur. Trois défauts sont pourtant sortis en une journée, sans qu'aucune instance ne trébuche :
il a suffi d'écrire un programme qui lit le format sans rien deviner. Un lecteur humain reconstruit
une date depuis le contexte de la phrase d'origine sans même s'apercevoir qu'il la reconstruit. Une
machine, non : elle bute, et là où elle bute il manquait quelque chose.

C'est donc un second mode de correction, complémentaire du terrain : **faire lire le gabarit par
quelque chose qui n'a pas de bon sens.** Ce qu'on ne peut pas lui faire lire est ce que le gabarit
demande à ses lecteurs de deviner.

L'autre leçon est un risque assumé. compagnon se définit par l'absence de code, et cette version en
introduit. La frontière qui le tient n'est ni un principe ni une intention : elle est dans
l'arborescence. Le code vit dans `ecran/`, séparé de `template/`, et l'agent n'y écrit jamais que
des données. Le jour où l'écran devient nécessaire au fonctionnement, ou le jour où quelque chose y
écrit, la frontière est franchie et il faut le voir tout de suite.

---

## [0.12.0] - 2026-09-14

### Ajouté

- **compagnon P3 gagne un quatrième corollaire.** « Une demande sans réponse reste ouverte. Elle ne
  s'éteint ni par le temps, ni parce que d'autres attendent déjà. Un agent qui cesse de demander pour
  ne pas insister vide P3 de son contenu aussi sûrement qu'un agent qui se sert tout seul. » Le
  principe disait déjà que l'absence de refus n'est pas une approbation ; il ne disait rien du versant
  symétrique, l'absence de réponse prise pour un classement.
- **Le rappel des demandes en attente passe au rituel de session** (NOYAU §0, point 3). Toute
  capacité `🔓 DEMANDÉ` dont le dernier rappel remonte à plus de quinze jours se remonte en une ligne
  à l'ouverture, avec sa date de dépôt.
- **Le registre de `capabilities.md` accueille les demandes**, avec une colonne `Rappelé le`. Sans
  cette date, le §0 n'a rien pour décider s'il doit remonter la demande, et le rappel se refait ou ne
  se fait plus.

### Corrigé

- **La règle des quinze jours était rangée dans la passe de contrôle** (§4bis, point 5), qui tourne
  une fois par mois ou sur demande. Une demande pouvait donc dormir cinq semaines sans que rien ne la
  remonte, alors que la décision de la rappeler se prend à chaque ouverture de session, au moment
  précis où `capabilities.md` est sous les yeux. Le §4bis ne porte plus le rappel : il vérifie que le
  mécanisme tient, dates comprises. Un seul propriétaire par règle (compagnon P7).
- **Rien n'interdisait à l'agent de se taire.** Le gabarit décrivait comment demander et quand
  rappeler, jamais le réflexe qui annule les deux : ne pas déposer une demande parce que plusieurs
  attendent déjà. C'est écrit, au §5, là où la ligne `🔓 DEMANDÉ` se pose.

### La leçon

Une échelle d'autonomie qui ne se parcourt que vers le haut n'a besoin de personne pour se gripper :
il suffit que la file de demandes devienne assez longue pour que demander paraisse indélicat. Le
frein documenté était l'erreur ouverte (P4). Le frein réel était la politesse de l'agent, et il ne
figurait nulle part.

Deuxième application de la R1 de `PUBLICATION.md`, sur une consigne pourtant écrite et juste : les
quinze jours vivaient dans une passe mensuelle, donc arrivaient au mieux avec trois semaines de
retard sur le moment où ils servaient. C'est le motif exact des trois défauts corrigés en 0.11.0,
trouvé cette fois en relisant, et c'est la première fois que ce contrôle attrape quelque chose avant
le terrain.

## [0.11.0] - 2026-09-09

### Ajouté

- **Une couche EXÉCUTION : `procedures.md`.** Le gabarit renvoyait le comment technique vers « votre
  documentation d'outil », hors du dossier et hors du rituel de session. Quand personne ne tient
  cette documentation, l'instance n'avait aucun endroit relu où poser son mode opératoire. Son index
  est lu à chaque session, ses corps seulement quand un déclencheur se présente.
- **compagnon P7 traite le cas du propriétaire inexistant.** Quand personne d'autre ne documente
  l'outil, l'instance en est propriétaire et l'écrit chez elle. Ce qui est documenté ailleurs se
  référence, jamais ne se recopie. Le principe n'est pas affaibli, il est complété.
- **Trois garde-fous sur les procédures**, parce qu'une procédure fausse ne conseille pas, elle
  s'exécute : chaque entrée porte le niveau d'autonomie que son exécution demande, une entrée périmée
  se relit **avant** d'être suivie, et une panne d'outil ne compte pas comme une erreur de jugement.
  Ce qui entre dans `mistakes.md`, c'est d'avoir suivi une procédure périmée sans la relire.
- **Une passe de contrôle : NOYAU §4bis.** Le §4 relisait les règles une par une, rien ne regardait
  le dossier dans son ensemble. Sept vérifications, dont l'erreur `corrigée` qui maintient le frein
  sans que personne ne l'ait décidé, et la demande d'ouverture oubliée depuis des semaines. Lancée
  par l'agent, jamais par un script (compagnon P11), et terminée par un compte rendu daté.
- **`PUBLICATION.md`**, les règles d'écriture du gabarit. Trois d'entre elles vivaient dans
  `MIGRATIONS.md`, que seules les instances ouvrent, et deux autres n'existaient que dans les
  sections « La leçon » de ce changelog.
- **Une règle de rangement, côté agent** (NOYAU §5) : écrire la chose là où elle sera relue au moment
  où elle servira, pas à l'endroit qui la décrit le mieux.

### Corrigé

- **Les « écarts assumés » n'étaient jamais atteints au bon moment.** Ils vivent dans `VERSION.md`,
  ouvert seulement en migration, alors qu'un écart se constate en session ordinaire. Le bloc de fin
  de session porte désormais une ligne `ÉCART`. C'est précisément ce qui vient d'arriver : l'instance
  qui a trouvé le manque de procédures l'a noté dans son `operational-state.md`.
- **La section « Acquis importés » de `learned-rules.md` disparaît**, rapatriée dans
  `procedures.md`. C'était le même objet sous un autre nom, dans un fichier dont le bandeau interdit
  pourtant les procédures d'outil.
- **Le README du dépôt annonçait « onze fichiers ».** Compteur recopié, faux dès l'ajout d'un
  douzième. Troisième correction du même motif après `operational-state.md` en 0.9.0 et les pieds de
  fichiers en 0.10.0 : la règle est maintenant écrite dans `PUBLICATION.md` pour qu'il n'y ait pas de
  quatrième.

### La leçon

Les trois derniers défauts publiés n'en font qu'un. `_archive/` portait une interdiction et son
contraire dans deux fichiers lus par la même session. Les écarts assumés attendaient dans un fichier
ouvert une fois par trimestre. Les procédures étaient renvoyées hors du rituel. Chaque fois, la
consigne était juste et arrivait au mauvais instant.

Une consigne ne réduit les erreurs que si elle est présente **au moment où la décision se prend**.
C'est devenu la première règle de `PUBLICATION.md`, avec sa nuance : « au bon moment » ne veut pas
dire « au démarrage ». Une consigne chargée au §0 pour un geste qui viendra quarante mille jetons
plus loin est au bon endroit et au mauvais instant.

Ce défaut-ci a été trouvé par une instance qui a préféré signaler le manque plutôt que de le
contourner en silence. C'est le comportement que compagnon P3 et la section « écarts assumés »
existent pour produire, et c'est la deuxième fois qu'il paie.

## [0.10.0] - 2026-09-09

### Ajouté

- **Un troisième statut d'erreur : `corrigée`.** Entre `ouverte` et `résolue`. L'incident est réparé
  et une règle en est née, mais la prévention n'est pas prouvée. Une erreur ne devient `résolue`
  qu'au cas comparable suivant, si la règle tient.
- **Le frein de l'autonomie porte sur `ouverte` et sur `corrigée`.** C'est là qu'était le trou : avec
  deux statuts, le seul geste disponible après une correction était de fermer, et le frein se
  desserrait tout seul, sans que personne ne l'ait décidé. Un système qui ne laisse qu'une sortie n'a
  pas à s'étonner qu'on la prenne.
- **Une récidive rouvre l'entrée d'origine** au lieu d'ouvrir une entrée neuve refermée dans la
  foulée, et vaut contradiction contre la règle issue, qui retombe en hypothèse (compagnon P9).

### Corrigé

- **L'exemple fictif de `mistakes.md` fermait trop tôt.** Il écrivait « résolue sur le principe, à
  surveiller au prochain cas », c'est-à-dire exactement le geste que la doctrine voulait empêcher. Il
  écrit maintenant `corrigée`. Nouvelle règle de publication : un exemple fictif est une consigne
  déguisée, c'est le comportement qu'il montre qui sera reproduit.
- **Les derniers compteurs écrits à la main**, en pied de `learned-rules.md` et de `mistakes.md`,
  sont retirés. Ce sont eux qui annonçaient sept règles là où il y en avait huit. Un fichier est sa
  propre source, il se compte en se lisant. Le numéro de version qui traînait dans le même pied part
  aussi : il ne vit que dans `VERSION.md`.

### La leçon

La doctrine exigeait trois occurrences avant de croire une règle, et acceptait qu'une erreur soit
close sur la seule promesse d'une règle. La même prudence d'un côté, aucune de l'autre. Une
incohérence de ce genre ne se voit pas en relisant : elle se voit quand une instance produit trois
récidives du même mécanisme dans la journée et les déclare résolues, sans rien enfreindre.

## [0.9.0] - 2026-09-07

### Corrigé

- **`_archive/` est en dépôt seul.** Le gabarit portait une interdiction et son contraire : « ne
  jamais écrire dans `_archive/` » d'un côté, « archivez dans `_archive/` » de l'autre, dans deux
  fichiers que la même session lit. La bonne frontière n'est pas écrire ou ne pas écrire, c'est
  **modifier ou déposer**. Une pièce déposée est scellée dès qu'elle entre.
- **La formulation courte était intenable, donc dangereuse.** Archiver, c'est écrire. Une règle
  qu'on ne peut pas tenir se contourne, et un agent qui a pris l'habitude de contourner une
  interdiction dure ne s'arrête pas à la bonne. Précisé dans compagnon P5.
- **`operational-state.md` ne recopie plus de compteurs.** Son tableau dupliquait des nombres tenus
  ailleurs, ce que compagnon P7 interdit et que le terrain a confirmé en quelques jours : 11
  hypothèses annoncées contre 12 réelles, 7 erreurs résolues contre 6. Le tableau renvoie désormais
  aux fichiers qui font foi. Même correction dans « Motifs ouverts ».
- **`mistakes.md` reçoit une règle de rotation**, qu'il n'avait pas. Une erreur résolue de longue
  date se dépose dans l'archive, une erreur ouverte n'en part jamais : ce serait desserrer le frein
  de l'autonomie.

### La leçon

Les trois défauts viennent du même endroit : une instance réelle, relue par deux lecteurs qui ne
partageaient ni le contexte ni les intérêts. Aucun n'était visible en écrivant le gabarit, tous
l'étaient en le faisant tourner. Un gabarit se corrige par ses instances, pas par relecture de son
auteur.

Le plus instructif est le premier. Un compteur qui diverge se voit et se répare. Une interdiction
qui contredit une consigne, elle, ne produit rien de visible : l'agent tranche seul, en silence, et
personne ne sait dans quel sens.

## [0.8.1] - 2026-09-07

### Corrigé

- **Deux jeux de numéros partageaient la lettre P.** La doctrine numérote ses principes `P1` à `P12`,
  une instance numérote ses interdits durs `P001` et suivants. Un renvoi « (P7) » dans le gabarit
  était donc ambigu pour qui lisait depuis une instance. Le gabarit et les notes de migration citent
  désormais **« compagnon P7 »**, et `DOCTRINE.md` porte la convention en tête de ses principes.
- **Le côté changé est celui de la doctrine, pas celui des instances.** Renuméroter les interdits
  d'une instance reviendrait à réécrire du contenu, ce que compagnon P5 interdit. Le gabarit se
  préfixe, les mémoires ne bougent pas.

### La leçon

Le défaut a été trouvé par une instance en migration réelle, qui avait dû inventer le préfixe
elle-même et l'avait déclaré comme adaptation. Une adaptation déclarée sur une instance est le
meilleur signal de défaut qu'un gabarit puisse recevoir : c'est une correction déjà faite et déjà
éprouvée, il ne reste qu'à la remonter. Encore faut-il que le gabarit oblige à les déclarer, ce que
fait la section « Écarts assumés » de `VERSION.md`.

## [0.8.0] - 2026-09-07

### Ajouté

- **« Mets-toi à jour » suffit.** Le §6bis du NOYAU nomme son déclencheur et tranche l'ambiguïté qui
  restait : dans ce système, « mise à jour » désignait déjà le bloc `🧠 MISE À JOUR MÉMOIRE` de fin
  de session. Un agent qui recevait la formule courte pouvait raisonnablement comprendre l'autre, et
  répondre à côté sans que personne ne voie le malentendu. La consigne est maintenant explicite, et
  l'agent a interdiction de demander laquelle des deux on voulait dire.
- **L'agent signale les nouvelles versions de lui-même.** Au balayage mensuel du §4, si son hôte
  atteint le web, il regarde s'il existe une version plus récente que la sienne et la signale. Il ne
  migre jamais de son propre chef : il propose, l'opérateur décide (P3).

### La leçon

Une procédure qui suppose que l'opérateur retienne la bonne formulation est une procédure qui échoue
au deuxième mois. Le vocabulaire interne d'un système est ce qui rend ses propres consignes
ambiguës, et c'est au système de lever l'ambiguïté, pas à celui qui s'en sert.

## [0.7.0] - 2026-09-07

### Ajouté

- **La mise à jour ne demande plus de dépôt cloné.** Nouvelle section « Sans dépôt local : la route
  web » dans `MIGRATIONS.md` : trouver la dernière étiquette publiée, lire le guide **à cette
  étiquette** par `raw.githubusercontent.com`, et récupérer un fichier du gabarit de la même façon.
  Le dépôt est public, aucune authentification n'est nécessaire.
- **C'est le point qui manquait pour que la méthode soit distribuable.** Le clone est la situation de
  celui qui développe le gabarit, pas celle des instances. Une instance qui vit dans un projet de
  chat ne clonera jamais rien, et jusqu'ici la doctrine lui répondait « demande à ton opérateur de te
  coller le fichier ». Une méthode qui s'arrête à la première mise à jour ne se distribue pas.
- **Un repli sur `main`, pour le numéro et rien d'autre.** Si les étiquettes ne sont pas
  interrogeables, le premier titre du `CHANGELOG.md` de `main` donne le numéro de la dernière
  version. Le **texte**, lui, se lit toujours à l'étiquette. Et une version annoncée dont l'étiquette
  ne répond pas n'est pas publiée : on prend la précédente.
- **Format d'une ligne de migration : quatre blocs.** Ce qui change, ce que l'agent fait seul, ce que
  l'opérateur doit faire lui-même, comment vérifier que c'est fait. Le troisième bloc est celui qu'on
  oublie, et c'est celui qui décide si la migration prend effet : un NOYAU modifié mais non recollé
  ne change rien aux sessions.
- **NOYAU §6bis réécrit** : les adresses en dur, les trois routes, et un rapport de migration final
  en deux listes dont celle de ce qui reste à faire à la main.
- Les lignes 0.5.6 → 0.6.0 et 0.6.0 → 0.6.1 reçoivent rétroactivement les deux blocs manquants, dont
  une vérification concrète : ouvrir une session neuve et demander à l'agent ce qu'il fait en fin de
  run. S'il ne cite pas le rapport, la copie injectée est encore l'ancienne.

### La leçon

Le bon test d'une méthode n'est pas « est-ce que je sais migrer mon instance ». C'est « est-ce qu'un
inconnu, dans un projet de chat, peut migrer la sienne sans rien installer et sans me le demander ».
Tant que la réponse est non, ce qui est distribué est un dossier, pas une méthode.

## [0.6.1] - 2026-09-07

### Modifié

- **Passe typographique : plus un seul tiret cadratin dans le dépôt.** Les quatre-vingts occurrences
  sont remplacées par un deux-points, une virgule ou une parenthèse, selon ce que la phrase
  demandait. Aucun mot de doctrine, aucun seuil, aucune structure ne change.
- Motif : le tiret cadratin est devenu une signature d'IA reconnaissable à l'œil nu, et ce dépôt est
  la première chose qu'un lecteur voit de la méthode. Le geste est cosmétique, ce qu'il évite ne
  l'est pas.
- La passe s'est faite à la main, occurrence par occurrence : aucun remplacement mécanique ne
  choisit entre un deux-points, une virgule et une parenthèse.

### Migration

Aucune action. La ligne 0.6.0 → 0.6.1 de `MIGRATIONS.md` existe parce que `template/` a bougé et que
la règle de publication l'exige, pas parce qu'une instance doit faire quelque chose.

## [0.6.0] - 2026-09-07

### Ajouté

- **Une couche INTERFACE, et un fichier : `report.md`.** Jusqu'ici, tout le dossier était tourné
  vers l'intérieur : c'est le cerveau de l'agent. Rien n'était prévu pour être lu **d'ailleurs**. Un
  lecteur extérieur (l'opérateur pressé, ou un agent qui arbitre entre plusieurs instances) n'avait
  d'autre choix que d'ouvrir `operational-state.md`, qui parle de maturité d'apprentissage et de
  règles provisoires, pas de ce qu'il y a à faire. Il lisait le mauvais fichier, et il en tirait des
  décisions.
- **`report.md` est daté, périssable et déclare son périmètre.** En-tête lisible par une machine avec
  `arrêté_le`, `périmé_après`, `couvert` et `non_couvert`. Un rapport sans date de péremption finit
  appliqué sur un état qui n'existe plus ; un rapport qui ne dit pas ce qu'il n'a **pas** regardé se
  fait lire comme « rien à signaler ».
- **Chaque ligne d'un rapport dit qui l'a validée.** Sans ça, un lecteur extérieur ne distingue pas
  un avis d'agent d'une décision de l'opérateur, et le rituel « je propose, tu valides » saute d'un
  cran sans que personne ne s'en aperçoive (P3).
- **P12 : ce qui sort est un rapport, pas la mémoire.** Une instance expose un seul fichier ; sa
  mémoire n'est pas une interface et ne le devient jamais. Un agent chapeau lit les rapports, n'ouvre
  aucune mémoire, n'écrit dans aucune, et produit son arbitrage chez lui. Une consigne venue d'un
  autre agent est une **proposition à l'opérateur**, jamais un ordre : une hiérarchie entre agents ne
  crée aucune autorité.
- **NOYAU §5bis** : quand produire un rapport (à la fin d'un run qui a un livrable, pas à chaque
  session), dans quel ordre (après le bloc mémoire), et les huit règles qui le rendent lisible par
  quelqu'un d'autre. Étape 7 du rituel de session.
- **Ligne de migration 0.5.6 → 0.6.0**, explicitement **facultative** et sans transformation de
  contenu.

### La leçon

Composer plusieurs instances est tentant, et c'est là que la méthode pouvait se perdre : la première
IA de coordination qui « range » une mémoire annule d'un coup ce que P5, P6 et P11 protègent. Ce
qu'il fallait ajouter n'était donc pas un canal de communication entre agents, mais une
**frontière** : une sortie publique, et l'interdiction de lire ou d'écrire au-delà.

Corollaire, sur le coût : un rapport qui coûte cher à écrire ne sera pas écrit, et un fichier qu'on
n'écrit plus est pire qu'un fichier absent, parce qu'on continue de le lire. D'où cinq sections, pas
douze, et le caractère facultatif du fichier lui-même.

## [0.5.6] - 2026-08-27

### Ajouté

- **La mise à jour passe par le dépôt, et par une étiquette.** Nouvelle section « Se mettre à jour
  depuis le dépôt » dans `MIGRATIONS.md` : où vit le clone (à côté de l'instance, jamais dedans, et
  pourquoi c'est précisément ça qui rend `git fetch` inoffensif), l'alignement sur une **étiquette**
  et non sur `main` par `git show <tag>:MIGRATIONS.md`, et la contrainte d'hôte. `main` est
  l'atelier : il porte du travail non commité qui ne correspond à aucune version publiée. Une
  instance qui s'y aligne lit une version qui n'existe pas.
- **La procédure demande un shell, et ça se dit.** Elle appartient à une session outillée (Claude
  Code, Cowork). Depuis un projet de chat, l'agent ne peut pas récupérer une version, et il ne doit
  pas prétendre l'avoir fait. Sans cette phrase, quelqu'un essaie depuis le chat et conclut que la
  méthode ne marche pas.
- **Règle de publication : le diff de `template/` fait foi.** Une version dont
  `git diff <ancienne>..<nouvelle> -- template/` n'est pas vide doit avoir une ligne de migration qui
  en rend compte, sinon elle n'est pas publiable. Contrôle mécanique de ce que la règle du document
  demandait jusqu'ici à la seule vigilance de l'auteur.
- **Ligne de migration 0.5.5 → 0.5.6** : retrait de la troisième copie du NOYAU, et retrait de tout
  numéro de version vivant ailleurs que dans `VERSION.md`.

### Corrigé

- **`INSTALLATION.md` étape 4 : la troisième copie.** Le guide disait déjà que déposer le NOYAU
  comme *document* du projet ne suffit pas. Il ne disait pas qu'il ne faut pas non plus **l'y
  laisser**. Une copie périmée dans la base de connaissances n'est pas inerte : elle est retrouvée
  par recherche, elle contredit la bonne version sur les seuils de maturation, et l'agent n'a aucun
  moyen de savoir laquelle fait foi.
- Trouvé sur l'instance de référence : une copie du NOYAU datant de l'installation y décrivait
  encore `Observation → Hypothèse → Règle` sans l'état `provisoire`, et le seuil « 3 occurrences OU
  1 validation explicite ». Exactement ce que P9 et P10 avaient supprimé le jour même.
- **Le NOYAU vit à deux endroits, le fichier et le champ injecté. Pas trois.**

### La leçon

La prose dit ce que l'auteur a pensé à écrire. Le diff dit ce qui a changé. Tant que la seule
garantie qu'une version soit migrable était l'attention de celui qui la publie, quatre versions ont
pu sortir sans ligne de migration. Le contrôle qui ferme ça ne peut pas être une résolution, il faut
qu'il soit une commande.

Corollaire, sur la distribution : ce que lit une instance doit être **nommable**. Un fichier lu dans
un arbre de travail n'a pas de nom, donc pas de version, donc pas de migration vérifiable. Une
étiquette en a un.

## [0.5.5] - 2026-08-27

### Ajouté

- **Avertissement « le fichier et la copie collée sont deux objets distincts »** en tête du NOYAU du
  gabarit. Modifier le NOYAU ne change rien aux sessions tant que la copie chargée par l'hôte n'a
  pas été refaite. C'est l'oubli le plus courant **après** l'installation, et il ne se voit pas :
  l'agent continue de tourner correctement, avec l'ancienne version.

### La leçon

Le piège de la 0.5.2 était de coller le mauvais fichier. Celui-ci est de croire qu'éditer le bon
suffit. Les deux viennent de la même racine : **le NOYAU vit à deux endroits, et un seul est lu.**
Le gabarit le dit maintenant lui-même, aux deux moments où ça compte.

## [0.5.4] - 2026-08-27

Trouvé par le premier test de session neuve, sur l'instance de référence.

### Ajouté

- **Section « Où vit le dossier » en tête du NOYAU du gabarit**, avec le chemin complet du projet.
  Le NOYAU est la seule chose qu'une session neuve reçoit. S'il ne dit pas où est le dossier, une
  session qui démarre sans dossier connecté ne peut pas le lire : elle improvise, ou elle va
  chercher l'information dans une mémoire extérieure au projet, ce qui **contredit la règle
  d'isolation** que la méthode impose par ailleurs.
- **`INSTALLATION.md` étape 4** : un avertissement dédié à ce chemin, juste après celui sur les
  fichiers homonymes. C'est le trou le plus facile à oublier, parce qu'il paraît évident à celui
  qui installe et qu'il ne manque qu'à quelqu'un d'autre.

### La leçon

Le test de l'étape 5 ne sert pas qu'à vérifier une installation : il **produit des correctifs**.
Celui-ci a été trouvé en une seule session neuve, sur une instance dont l'installateur était
convaincu qu'elle était complète. Trois occurrences du même défaut d'isolation avaient été mises au
compte de la discipline de l'agent ; la cause était structurelle, et elle tenait en une ligne
manquante.

### Corrigé, dans la même livraison

- **`MIGRATIONS.md` : l'intervalle 0.3.0 → 0.5.2 était muet.** Quatre versions publiées sans ligne
  de migration, alors que la procédure demande à l'agent d'appliquer « toutes les migrations
  postérieures à sa version ». Il n'en trouvait aucune et ne pouvait pas savoir si c'était parce
  qu'il n'y avait rien à faire ou parce que rien n'avait été écrit.
- **Règle ajoutée au document** : toute version publiée a sa ligne, **y compris quand elle ne
  demande rien**. Un « rien à faire » explicite est une information ; un silence n'en est pas une.

## [0.5.2] - 2026-08-27

Le piège des deux NOYAU homonymes, trouvé à la première installation réelle.

### Corrigé

- **Bandeau d'avertissement en tête de `template/NOYAU-instructions-projet.md`.** Le gabarit dit
  désormais lui-même qu'il n'est pas prêt à être collé, et rappelle les trois gestes à faire avant.
- **`INSTALLATION.md` étape 4** : un tableau qui oppose le fichier du gabarit et celui de l'instance,
  avant toute autre instruction de l'étape.
- **`INSTALLATION.md` étape 5** : la question de vérification devient « **Qui es-tu**, quel est le
  rituel de session, et que dois-tu produire à la fin ? ». Un agent qui répond `<NOM DE L'AGENT>`
  signale immédiatement le mauvais collage.

### La leçon

Un avertissement placé dans un fichier voisin ne protège pas un fichier qu'on copie seul. **Il doit
voyager avec lui.** `INSTALLATION.md` disait déjà quel fichier coller ; ça n'a pas suffi, parce que
le geste réel est « ouvrir le fichier, tout sélectionner, coller », et qu'à ce moment-là on ne lit
plus le guide.

Trouvé sur une installation faite par l'auteur de la méthode, sur sa propre instance. Un client
l'aurait raté sans jamais savoir pourquoi son agent restait générique.

## [0.5.1] - 2026-08-27

### Décidé

- **Le nom `compagnon` est conservé**, en minuscule, sans dépôt de marque. Il décrit la relation que
  la méthode installe : quelqu'un qui accompagne et qui apprend de vous, pas un outil qu'on
  configure. Le risque d'homonymie est réel et assumé, la valeur n'est pas dans le nom.

## [0.5.0] - 2026-08-27

Le dépôt devient publiable.

### Ajouté

- **`LICENSE` : Creative Commons Attribution 4.0 International.** Lecture, copie, adaptation et
  redistribution libres, **y compris commercialement**, à condition de créditer.
  Le raisonnement : ce qui se vend ici est l'accompagnement, pas le texte. Restreindre le texte
  coûterait de l'adoption sans rien protéger, puisqu'une licence protège l'expression et jamais les
  idées : n'importe qui peut reformuler une doctrine et la vendre, sous n'importe quelle licence.
  L'attribution est le seul verrou qui serve : chaque copie renvoie à l'origine.
- **Une clause de portée explicite.** Le contenu produit dans une instance appartient à celui qui
  l'a écrit. Sans cette précision, un utilisateur peut craindre que son propre `learned-rules.md`
  soit contaminé par la licence, et ne pas essayer.

### Corrigé

- **Le numéro de version n'est plus dupliqué.** `DOCTRINE.md` et le `README` portaient chacun le
  leur, et ils avaient déjà divergé (0.4.0 contre 0.3.0) en une seule journée. Le `CHANGELOG` et les
  étiquettes git sont désormais la seule source. C'est P7 appliqué au dépôt lui-même : chaque chose
  a un seul propriétaire.

### Écarté

- **Pas de clause non commerciale.** « Commercial » est trop flou : un indépendant qui instancie la
  méthode pour son propre travail facturé tomberait dans la zone grise, et c'est précisément le
  public visé.
- **Pas d'absence de licence.** Sans licence, personne n'a le droit de copier le gabarit, ce qui
  interdit le geste même qu'on veut provoquer.

### Tranché

**Le nom reste `compagnon`, sans ambition de marque.** La question a été posée : « compagnon » est un
terme courant du français, donc faible à déposer, et un dépôt de marque ne l'aurait pas beaucoup
protégé. Décision de WEBDIGIT srl le 27/08/2026 : on garde le nom et on ne cherche pas à le protéger.

Ce qui relie les copies à l'origine n'est donc pas le nom, c'est **l'attribution exigée par la
licence**. C'est cohérent avec le reste : ici, ce qui se défend est la réputation et l'antériorité,
pas un monopole.

## [0.4.0] - 2026-08-27

Le gabarit existe. C'était la dernière pièce manquante du dépôt.

### Ajouté

- **`template/`** : dix fichiers, écrits depuis la doctrine et non copiés d'une instance en
  exploitation. Zones à remplir marquées, gouvernance rappelée en tête de chaque fichier, et un
  exemple **fictif** par fichier de mémoire pour montrer la forme attendue sans induire de contenu.
  Les seuils P9 et P10 y sont intégrés d'origine : une règle y naît `provisoire`, une confiance sous
  trois occurrences s'y écrit « non établie ».
- Chaque fichier porte **où il se situe dans la gouvernance** : auto-écrit par l'agent, ou zone
  manuelle où l'agent propose et l'opérateur dispose. C'est ce qui empêche un agent de s'accorder
  ses propres capacités.
- `operational-state.md` porte sa **règle de rotation** : un état qu'on ne lit plus en entier n'est
  plus un état, c'est un journal.

### Vérifié

Stérilité du gabarit contrôlée : aucun nom de client, d'outil ou de personne réelle. La seule
occurrence de « webdigit » est l'URL du dépôt lui-même dans `VERSION.md`.

## [0.3.0] - 2026-08-27

De la doctrine vers l'installable, plus un principe validé par JC en cours de route.

### Ajouté

- **P11 : Aucune écriture automatique dans la mémoire.** La mémoire ne se transforme jamais par un
  procédé qui ne l'a pas lue et qui ne peut pas dire ce qu'il a changé. L'agent écrit, un script
  jamais. Pas de script de migration, pas de script de consolidation, pas d'outil qui « nettoie ».
  Décision de JC du 27/08/2026, prise en tranchant la conception des migrations.

- **`INSTALLATION.md`** : le guide public. Il met en tête l'étape qui fait échouer les installations,
  celle que l'agent ne peut pas faire lui-même : charger le NOYAU dans le champ que l'hôte injecte
  au démarrage. Copier les fichiers ne suffit pas, et un test de vérification est fourni pour ne pas
  se contenter d'un « oui j'ai bien lu ».
- **`MIGRATIONS.md`** : comment une instance déjà en service rattrape une nouvelle version. La
  migration touche la structure, jamais le contenu, et elle est appliquée par l'agent qui lit le
  document. Il n'y aura pas de script : un script qui réécrit une mémoire est ce que P5 interdit.
- **`ai-memory/VERSION.md`** dans les instances : déclare la version d'origine, l'historique des
  migrations et les écarts assumés. Une instance sans ce fichier est antérieure à la 0.3.0.
- **Étiquettes de version sur le dépôt** : `v0.2.0`, `v0.3.0`. Une instance peut désormais désigner
  précisément ce dont elle est née.

### Non publié

Le protocole d'intervention reste hors du dépôt, sous `_prive/`. C'est ce qui se vend : l'ordre des
blocs, les questions à poser pour choisir la première compétence et l'échelle d'autonomie, et ce
qu'il faut refuser. Rendre le dépôt public ne coûte donc rien.

## [0.2.0] - 2026-08-27

Deux questions de doctrine tranchées par JC, toutes deux au motif de la prudence.

### Ajouté

- **P9 : Une règle naît provisoire, jamais mûre.** L'échelle de statut devient
  `hypothèse → provisoire → active → en consolidation → archivée`. Une validation explicite unique
  crée une règle **provisoire**, qui s'applique mais qui ne peut pas être citée à l'appui d'une
  demande d'autonomie. Deux usages supplémentaires sans contradiction la rendent active ; une
  contradiction la renvoie à l'état d'hypothèse.
- **P10 : La confiance ne s'établit pas sous trois occurrences.** Sous ce seuil, la confiance n'est
  pas basse, elle est **non établie**, et ne s'écrit pas comme un chiffre. Au-delà, c'est une mesure
  glissante du feedback récent, pas une probabilité.

### Motif

L'ancienne règle laissait une seule validation `+2` créer une règle de plein droit, en contradiction
directe avec P2 dans le même document. Et la formule `clamp01((score_récent + 3) / 5)` rendait 1,00
après une seule validation, au point qu'une valeur avait été corrigée à la main dans une instance en
exploitation. Une formule qu'on corrige à la main est une formule fausse.

### Conséquence sur les instances

Toute règle née d'une validation unique passe de `active` à `provisoire`, et sa confiance chiffrée
est remplacée par « non établie ». Migration à appliquer instance par instance ; elle a été faite
le jour même sur l'instance de référence.

## [Non publié]

### En cours

- Gabarit canonique `template/` en v1.0.0, écrit depuis la doctrine et stérile de toute donnée
  client.
- Six correctifs identifiés sur les instances en exploitation, à intégrer au gabarit :
  versionnement, formule de confiance, contreseing des rewards, règle de rotation de l'état,
  tenue du rituel de fin de session, grammaire de promotion livrée plutôt que réinventée.

### À trancher avant la v1.0.0

Les trois questions de doctrine restantes, listées en fin de `DOCTRINE.md` : le barème, les seuils
de maturation, le contreseing des rewards.

## [0.1.0] - 2026-08-27

Première pose du dépôt. La doctrine avant l'outil.

### Ajouté

- `DOCTRINE.md` : les huit principes, la section « ce que compagnon ne prétend pas », la
  justification du choix du texte contre le logiciel, et cinq questions de doctrine ouvertes.
- `README.md` : le problème, ce que fait la méthode, pour qui, et ce qu'elle n'est pas.
- `CHANGELOG.md` : ce fichier.

### Origine

Doctrine dégagée de trois instances en exploitation réelle chez WEBDIGIT srl : pilotage de
dossiers clients, tri de flux email, réponse au support client. Les principes et les seuils
viennent de ce qui a marché et de ce qui a cassé, pas d'une conception a priori.
