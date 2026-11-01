# NOYAU, module : recoller les Instructions

> **Module du NOYAU, lu sur déclencheur.** Il vient du gabarit, comme le NOYAU : il ne se modifie
> pas en local (`noyau-local.md` le complète), et une migration le remplace en entier. Il se
> termine par son marqueur, comme tout fichier du dossier (§0, point 1).
>
> **Déclencheur.** Le recollage est incomplet (spécificités absentes, un des deux marqueurs
> manquant), ou une migration vient de préparer une nouvelle copie. AIOS est facultatif : sans
> lui, <OPÉRATEUR> colle comme avant.

## Ce qu'est le recollage

Le NOYAU rempli de l'instance, puis `noyau-local.md` intégral, titre compris, dans cet ordre. Deux
objets : le fichier dans le dossier, et la copie que l'hôte injecte (Instructions du projet, ou le
point d'entrée). Modifier le fichier ne change rien aux sessions tant que la copie n'est pas
refaite.

## Qui le pose

Ni toi, ni un autre agent. Le §6 l'interdit. Deux voies, une suffit :

1. **AIOS**, s'il est là : il reconstruit la copie depuis les deux fichiers du dossier, la pose
   dans le champ que l'hôte injecte, et contrôle.
2. **<OPÉRATEUR>**, à la main : il colle le même texte, dans le même ordre
   (`INSTALLATION.md`, étape 4).

## Ce qu'AIOS contrôle, les trois, toutes

1. La copie commence par le NOYAU rempli et se poursuit par `noyau-local.md`.
2. Les deux marqueurs sont là, dans cet ordre : `[fin de NOYAU-instructions-projet.md]` avant les
   spécificités, `[fin de noyau-local.md]` tout à la fin, rien après.
3. Le dernier paragraphe modifié du fichier source figure dans la copie, au mot près.

Un contrôle qui manque : AIOS ne déclare pas le recollage fait. Il le dit, et la copie reste
l'ancienne.

## Ce que tu fais

Tu prépares le texte (migration, §6bis). Tu ne le poses pas. À la session suivante, tu relis la
copie reçue : les deux marqueurs, et le dernier paragraphe modifié. Manque : dis-le en ouverture,
session en proposition seule (§0, point 1), jusqu'au recollage.

[fin de recollage.md]
