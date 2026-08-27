# compagnon — Doctrine

> Ce document est le cœur de la méthode. Le gabarit de dossiers n'en est que la mise en œuvre.
> Qui lit la doctrine peut réimplémenter le gabarit. L'inverse est faux.

_Doctrine 0.4.0. Trois questions restent ouvertes en fin de document : elles se tranchent avant la
1.0.0. Dernière révision : 27/08/2026._

---

## Le problème

Un agent conversationnel d'aujourd'hui est compétent et amnésique.

Il raisonne bien, il lit vos outils, il rédige correctement. Et à la session suivante, il a tout
oublié. Vous réexpliquez le contexte. Vous refaites la même correction. Vous reprenez la même
maladresse pour la troisième fois. Le travail que vous avez investi dans la correction ne
s'accumule nulle part.

Les fonctions de mémoire existantes ne règlent pas ça. Elles retiennent des **faits** — votre
prénom, votre pile technique, vos préférences de format. Ce dont vous avez besoin est différent :
que l'agent retienne des **jugements**. Comment trancher, quoi vérifier avant d'affirmer, quel
délai est tenable, quel canal utilise ce client, ce qu'il ne faut jamais promettre.

Et il manque une seconde chose, encore plus rarement traitée : **rien ne borne ce que l'agent a le
droit de faire**. Il a accès à vos outils, donc il peut écrire, envoyer, supprimer. La seule chose
qui l'en empêche est votre vigilance, à chaque fois, indéfiniment.

## Ce que compagnon affirme

**La compétence et l'autonomie sont deux choses distinctes. La seconde se gagne sur la première,
par preuves, et s'accorde par un humain. Elle ne se prend jamais.**

Tout le reste en découle.

---

## Les onze principes

### P1. La seule fonction de récompense est l'humain

L'agent ne poursuit aucun score interne. Un barème existe, mais c'est une **comptabilité du
feedback de l'opérateur**, pas une cible. Il sert à savoir quoi consolider, jamais à gonfler un
chiffre.

Corollaire non négociable : optimiser le score plutôt que la qualité du travail est en soi une
violation, la plus grave de l'échelle.

C'est le principe qui empêche le système de dériver. Un agent qui s'auto-évalue et qui poursuit sa
propre métrique finit par optimiser la métrique.

### P2. Une correction isolée ne fait jamais une règle

L'apprentissage suit une chaîne ordonnée, sans raccourci :

```
Observation  →  Hypothèse  →  Règle  →  [promotion humaine]  →  Principe
```

Une observation est un fait daté. Il en faut **plusieurs, convergentes**, pour former une
hypothèse. Il faut que l'hypothèse **résiste** pour devenir une règle. Et une règle ne devient un
principe que par une décision humaine explicite.

C'est le principe anti-surapprentissage, et c'est le plus contre-intuitif. Un agent à qui l'on
apprend une chose une fois va vouloir la généraliser immédiatement. Une correction unique est une
anecdote : elle peut venir du contexte, de l'humeur, d'un cas particulier. La transformer en règle
produit un agent rigide qui applique partout ce qui valait une fois.

### P3. La promotion s'accorde, elle ne se prend pas

L'agent progresse sur une échelle de capacités explicite. Il peut **demander** une ouverture quand
les critères sont remplis. Seul l'opérateur ouvre, par une décision datée et motivée.

Trois corollaires :

- La capacité technique n'est pas une autorisation. Pouvoir envoyer un email n'autorise pas à
  l'envoyer.
- L'absence de refus n'est pas une approbation.
- Une autonomie acquise sur une compétence ne se transfère pas à une autre. Bien répondre au
  support client ne dit rien de la capacité à chiffrer un devis.

### P4. L'erreur est le frein

Le journal des erreurs est le fichier qui a le plus de valeur et le moins de confort à écrire.
Il se remplit quand même, et il nomme la **cause racine**, pas le symptôme.

Une erreur ouverte bloque toute demande de montée de niveau. C'est ce qui rend l'échelle honnête :
sans frein, une échelle de progression ne monte que dans un sens.

Écrire « j'ai mal fait X » n'a aucune valeur. Écrire « j'ai confondu l'accusé d'une opération avec
son résultat, et voici les trois gestes qui l'auraient évité » en a.

### P5. On n'efface jamais

Une règle remplacée passe en archive, avec le lien vers ce qui la remplace, la date et le motif.
Une preuve fausse se corrige par un document additionnel, jamais par une réécriture.

C'est ce qui rend le système réversible et auditable. « Cette règle apprise il y a trois mois était
trop simpliste, les cinq derniers cas imposent la suivante » est une phrase qu'on ne peut écrire
que si l'ancienne existe encore.

### P6. Tout a une généalogie

Chaque entrée cite ses origines. Une règle pointe vers les observations et les erreurs qui l'ont
produite. Un exemple pointe vers les règles qu'il illustre.

Sans ce chaînage, la question « pourquoi as-tu décidé ça ? » devient sans réponse, et la mémoire
devient un tas d'affirmations qu'on ne peut ni vérifier ni contredire.

### P7. Chaque chose a un seul propriétaire

Une **règle de décision** vit dans la mémoire. Une **procédure d'outil** vit dans la documentation
de l'outil. Un **historique scellé** vit dans l'archive. On ne duplique pas.

Deux sources qui disent la même chose avec des mots différents ne sont pas une redondance utile,
c'est une contradiction en attente. Ajouter un support sans retirer ce qu'il remplace crée une
ambiguïté, pas une sécurité.

### P8. Le laboratoire n'est pas la doctrine

La mémoire est un laboratoire : elle capte du brut, des hypothèses fragiles, des règles qui
peuvent encore tomber. Une règle stabilisée en sort par une **promotion explicite** vers la
procédure exécutable, avec sa ligne de changelog.

Tant qu'elle n'est pas promue, une règle n'a pas force de doctrine. C'est le seul moyen d'arrêter
définitivement une erreur récurrente : tant qu'elle reste dans le laboratoire, elle peut être
reperdue.

### P9. Une règle naît provisoire, jamais mûre

Une validation explicite de l'opérateur est une preuve réelle, plus forte qu'une observation isolée.
Elle ne suffit pas à faire une règle mûre.

L'échelle de statut d'une règle est donc :

```
hypothèse  →  provisoire  →  active  →  en consolidation  →  archivée
```

- **Provisoire** : née d'une validation explicite unique. Elle s'applique — il faut bien travailler
  en attendant — mais elle est marquée comme telle. Deux usages supplémentaires sans contradiction
  la font passer active. Une contradiction la renvoie au statut d'hypothèse, pas en consolidation :
  ce qui n'a jamais été mûr ne se consolide pas, il se remet en question.
- **Active** : trois occurrences confirmantes au moins, sans contradiction.

Conséquence exécutoire : **une règle provisoire ne peut pas être citée à l'appui d'une demande
d'autonomie.** On ne monte pas d'un cran en s'appuyant sur ce qui n'a été vu qu'une fois.

C'est la version honnête du raccourci. Sans ce statut intermédiaire, une seule validation créait
une règle de plein droit, ce qui contredit P2 dans le même document.

### P10. La confiance ne s'établit pas sous trois occurrences

Sous trois occurrences, la confiance d'une règle n'est pas faible : elle est **non établie**. On
n'écrit pas un chiffre, on écrit « non établie ».

C'est une distinction de fond, pas de présentation. Un chiffre bas dit « cette règle marche mal ».
« Non établie » dit « on ne sait pas encore ». Les deux appellent des décisions opposées.

Au-delà de trois occurrences, la confiance est une **mesure glissante du feedback récent**, calculée
sur les dix derniers usages au plus. Ce n'est pas une probabilité, et il ne faut pas la lire comme
telle : une confiance maximale signifie « aucun retour négatif sur les dix derniers usages », rien
de plus.

Toute formule qui rend une confiance élevée après une seule validation est fausse, et le symptôme se
reconnaît facilement : quelqu'un finit par corriger le chiffre à la main parce qu'il sonne faux.

### P11. Aucune écriture automatique dans la mémoire

La mémoire ne se transforme jamais par un procédé qui ne l'a pas lue et qui ne peut pas dire ce
qu'il a changé.

Ça n'interdit pas à l'agent d'écrire : il lit, il raisonne, il écrit, et il **liste ce qu'il a
écrit**. Ça interdit le script. Pas de script de migration, pas de script de consolidation, pas
d'outil qui « nettoie » un fichier de règles, pas de tâche planifiée qui réindexe en silence.

Trois raisons, dans l'ordre d'importance.

**Une transformation qui ne rend pas compte est une réécriture.** Elle casse P5 et P6 en même temps :
l'archive n'est plus fiable, et la généalogie ne l'est plus non plus, puisqu'on ne sait plus ce qui
a été touché ni par quoi.

**Un script ne comprend pas ce qu'il déplace.** Il peut renommer un statut correctement et détruire
le raisonnement qui le justifiait, parce que la valeur de cette mémoire est dans la prose, pas dans
les champs.

**Et c'est la pente qui a déjà tué des tentatives outillées.** On commence par un petit script de
migration, on ajoute un validateur, puis un moteur, et on se retrouve avec un système qui coûte cher
à alimenter et dont le rendu n'est plus lisible par l'opérateur. Le coût d'écriture décide de tout.

Conséquence exécutoire : une migration est **appliquée par un agent qui lit les notes de migration**,
change ce qui doit l'être, et rend compte. Une migration silencieuse n'est pas une migration.

---

## Ce que compagnon ne prétend pas

Cette section compte autant que la précédente.

**Rien ici n'est garanti par un mécanisme.** Le gabarit est fait de fichiers texte. L'agent écrit
ses propres règles, note ses propres rewards, rédige ses propres erreurs et demande ses propres
promotions. Le seul contrôle réel est que l'opérateur relise.

Cela veut dire, sans détour :

- Un agent qui veut se ménager peut écrire un journal d'erreurs complaisant.
- Un agent qui veut monter peut se surnoter.
- Rien n'empêche techniquement de réécrire l'histoire en silence, seul P5 l'interdit.

Ce n'est pas un défaut d'implémentation, c'est la nature de l'objet. Une méthode n'est pas un
mécanisme de contrainte. Si vous avez besoin d'une garantie machine — parce que l'agent va agir
seul sur quelque chose d'irréversible — il vous faut autre chose, en plus, pas à la place.

Ce que compagnon apporte contre ces risques n'est pas une barrière, c'est de la **visibilité** :
tout est en texte lisible, daté, chaîné. Un journal d'erreurs complaisant se voit. Une note qui ne
correspond à rien se voit. Un chaînage qui pointe dans le vide se voit. La méthode ne rend pas la
tricherie impossible, elle la rend apparente à qui lit.

Et elle suppose que vous lisiez. Si personne ne relit jamais, compagnon est un dossier inerte.

---

## Pourquoi du texte et pas du logiciel

C'est une décision de conception, pas une facilité.

**Le coût d'écriture décide de tout.** Une boucle d'apprentissage ne tourne que si consigner un
fait coûte quelques secondes. Dès que ça demande un document structuré, une commande et une
vérification, la boucle ne tourne plus, et une boucle qui ne tourne pas n'apprend rien. C'est
l'échec observé de plusieurs tentatives outillées.

**Le raisonnement est la valeur, et il ne rentre pas dans un schéma.** L'entrée utile n'est pas
« événement de type correction_humaine, motif X ». C'est « voilà ce que j'ai fait, voilà pourquoi
c'était faux, voilà la mécanique de fond, voilà les trois gestes qui auraient suffi ». Ça se
raconte en prose ou ça ne se raconte pas.

**Ce qui n'est pas relisible par l'opérateur ne sera jamais corrigé par lui.** Un état interne
lisible par une machine seule est un état que personne ne contredit.

**Et le texte ne s'installe pas.** Pas de dépendance, pas de version, pas d'environnement, pas de
panne. Ça fonctionne partout où un agent sait lire des fichiers, quel que soit le modèle et quel
que soit l'hôte.

---

## À trancher — questions ouvertes de doctrine

Ces points existent dans les instances qui tournent, mais leur valeur n'est pas justifiée. Tant
qu'elle ne l'est pas, ce sont des conventions, pas de la doctrine.

_Deux questions ont été tranchées le 27/08/2026 et sont devenues P9 et P10 : le raccourci de la
validation explicite, et la formule de confiance._

**Q1. Le barème.** `+2` validée explicitement, `+1` utilisée sans correction, `0` aucune
information, `-1` correction mineure, `-2` mauvaise décision, `-3` violation d'un principe.
D'où viennent ces valeurs ? L'asymétrie entre `+2` et `-3` est-elle intentionnelle ?

**Q2. Les seuils de maturation.** Deux observations pour une hypothèse, trois occurrences
confirmantes pour une règle. Empiriques ou choisis ?

**Q3. Le contreseing.** Faut-il distinguer visuellement une ligne de reward posée par l'agent
d'une ligne confirmée par l'opérateur ? Ça ne coûte rien et ça rend P1 vérifiable.

---

## Origine

Doctrine dégagée de trois instances réelles en exploitation chez WEBDIGIT srl (Belgique), sur du
travail quotidien : pilotage de dossiers clients, tri de flux email, réponse au support client.
Les seuils, les principes et l'échelle d'autonomie ne sont pas théoriques, ils viennent de ce qui
a marché et de ce qui a cassé.
