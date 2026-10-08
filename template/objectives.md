# objectives.md : Les cibles de qualité

> **Gouvernance :** les **cibles sont fixées par l'opérateur** (zone MANUELLE). L'agent met à jour la
> **progression** et peut *proposer* une cible ; il n'en fixe aucune.
>
> **À REMPLIR.** Les candidats ci-dessous sont un point de départ. G001, G002 et G004 s'appliquent
> à peu près partout. G003 est à réécrire pour votre métier.

Rappel de la règle d'or : l'agent optimise **ces objectifs**, jamais son score de reward interne.

> **Plafond : 12 Ko**, lu en entier à chaque session (NOYAU §5, « La lecture de run et son budget »).
> Une progression **remplace** la précédente sur la même ligne, elle ne s'y ajoute pas : l'historique
> des valeurs se lit au journal. À la rotation, sortent les progressions antérieures à la dernière
> de chaque objectif, et les objectifs atteints, manqués ou abandonnés.

---

## G001 : Zéro affirmation fausse transmise à un tiers

Ce qu'on mesure : nombre de productions contenant une affirmation factuelle démentie ensuite.
Cible : **0**, sans tolérance. Une incertitude signalée ne compte pas comme une erreur, c'est le
comportement attendu.
Valeur courante : `<à mesurer>`.

## G002 : Zéro engagement pris sans accord

Ce qu'on mesure : délais, prix, périmètres, dates annoncés sans accord explicite.
Cible : **0**, sans tolérance. C'est un principe dur, donc un manquement vaut -3.
Valeur courante : `<à mesurer>`.

## G003 : Faire baisser les corrections de fond

Ce qu'on mesure : corrections par cas, séparées en **fond** (contenu, contexte, décision) et
**forme** (tournure, ton, longueur). **Seul le fond compte pour la maturité.**
Cible : `<à fixer>`. Cette mesure est celle que la grille des grades de `capabilities.md` utilise,
compétence par compétence : c'est là que se fixent les seuils qui font monter, pas ici.
Valeur courante : `<à mesurer>`.

## G004 : Aucune erreur ouverte qui traîne

Ce qu'on mesure : entrées `mistakes.md` en statut ouverte, et leur ancienneté.
Cible : **0 erreur ouverte de plus de 30 jours.** Une erreur ouverte bloque toute montée sur sa
compétence.
Valeur courante : `<à mesurer>`.

---

## Candidats à ne pas retenir

- **« Nombre de cas traités »** : compteur d'activité, pas de qualité. Accumuler des cas ne prouve
  rien et pousse au mauvais comportement.
- **« Score de confiance moyen »** : dérivé du reward, donc interdit comme cible. Le score est une
  comptabilité, pas un objectif.

---

## Rotations

> Une ligne par rotation : `<jj/mm/aaaa> : <ce qui est sorti> → <chemin du fichier de rotation>`
> (NOYAU §5, « La lecture de run et son budget »). Un renvoi vers une entrée sortie reste valable
> par cette ligne.

_Aucune._

---

_Zone manuelle pour les cibles. Progression auto. Dernière mise à jour : `<jj/mm/aaaa>`._

[fin de objectives.md]
