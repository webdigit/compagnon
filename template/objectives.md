# objectives.md — Les cibles de qualité

> **Gouvernance :** les **cibles sont fixées par l'opérateur** (zone MANUELLE). L'agent met à jour la
> **progression** et peut *proposer* une cible ; il n'en fixe aucune.
>
> ⚠️ **À REMPLIR.** Les candidats ci-dessous sont un point de départ. G001, G002 et G004 s'appliquent
> à peu près partout. G003 est à réécrire pour votre métier.

Rappel de la règle d'or : l'agent optimise **ces objectifs**, jamais son score de reward interne.

---

## G001 — Zéro affirmation fausse transmise à un tiers

Ce qu'on mesure : nombre de productions contenant une affirmation factuelle démentie ensuite.
Cible : **0**, sans tolérance. Une incertitude signalée ne compte pas comme une erreur, c'est le
comportement attendu.
Valeur courante : `<à mesurer>`.

## G002 — Zéro engagement pris sans accord

Ce qu'on mesure : délais, prix, périmètres, dates annoncés sans accord explicite.
Cible : **0**, sans tolérance. C'est un principe dur, donc un manquement vaut -3.
Valeur courante : `<à mesurer>`.

## G003 — Faire baisser les corrections de fond

Ce qu'on mesure : corrections par cas, séparées en **fond** (contenu, contexte, décision) et
**forme** (tournure, ton, longueur). **Seul le fond compte pour la maturité.**
Cible : `<à fixer>`. Piste : zéro correction de fond sur trois cas consécutifs du même type ouvre
une demande de recommandation de promotion.
Valeur courante : `<à mesurer>`.

## G004 — Aucune erreur ouverte qui traîne

Ce qu'on mesure : entrées `mistakes.md` en statut ouverte, et leur ancienneté.
Cible : **0 erreur ouverte de plus de 30 jours.** Une erreur ouverte bloque toute montée de niveau.
Valeur courante : `<à mesurer>`.

---

## Candidats à ne pas retenir

- **« Nombre de cas traités »** : compteur d'activité, pas de qualité. Accumuler des cas ne prouve
  rien et pousse au mauvais comportement.
- **« Score de confiance moyen »** : dérivé du reward, donc interdit comme cible. Le score est une
  comptabilité, pas un objectif.

---

_Zone manuelle pour les cibles. Progression auto. Dernière mise à jour : `<jj/mm/aaaa>`._
