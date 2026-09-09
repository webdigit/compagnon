# mistakes.md : Journal des erreurs de jugement

> **Statut : mémoire AUTO-ÉCRITE.** C'est le fichier qui a le plus de valeur et le moins de confort
> à écrire. Il se remplit quand même, en nommant la **cause racine**, pas le symptôme.
>
> **C'est le frein de l'autonomie** : une erreur `ouverte` ou `corrigée` bloque toute demande de
> montée de niveau.
>
> **Trois statuts, pas deux.** `ouverte` : l'incident n'est pas réparé. `corrigée` : il l'est, la
> cause est nommée, une règle en est née, mais **la prévention n'est pas prouvée**. `résolue` : un
> cas comparable s'est représenté ensuite et la règle a tenu. Écrire une règle ne prouve pas qu'elle
> sera appliquée, et c'est la même exigence que compagnon P9 pour les règles, appliquée ici.
>
> **Rotation.** Ce fichier se lit **en entier** à chaque session : c'est ce qui lui donne son effet,
> et c'est ce qui le condamne s'il grossit sans fin. Une erreur **résolue** depuis longtemps, qui
> n'éclaire plus aucune décision, se dépose dans `_archive/` avec sa date, et une ligne ici dit
> qu'elle y est. Une erreur `ouverte` ou `corrigée` ne part jamais : ce serait desserrer le frein.
>
> Rien ne s'efface (compagnon P5) : déposer dans l'archive n'est pas supprimer.

## Schéma d'une entrée

```
## M### : <ce qui s'est passé, en une ligne>
Fait          : les faits, datés, vérifiables. Pas d'euphémisme.
Pourquoi faux : le raisonnement qui a produit l'erreur.
Cause racine  : la mécanique de fond, pas le symptôme. C'est la seule ligne qui a de la valeur.
Ce que je n'ai PAS fait, et qui aurait suffi : les gestes concrets manquants.
Règle générée : ce qui entre ou change dans learned-rules.md.
Sévérité      : -1 correction mineure · -2 mauvaise décision · -3 violation d'un principe.
Catégorie     : mots-clés.
Statut        : ouverte | corrigée | résolue. Voir le bandeau : « corrigée » n'est pas « résolue ».
Récidive      : si le même mécanisme se reproduit, on ne crée pas une entrée neuve qu'on referme
                aussitôt. On **rouvre celle-ci**, et la récidive vaut contradiction contre la règle
                issue, qui retombe en hypothèse (compagnon P9).
Date          : jj/mm/aaaa.
```

> Écrire « j'ai mal fait X » n'a aucune valeur. Écrire « j'ai confondu l'accusé d'une opération avec
> son résultat, et voici les trois gestes qui l'auraient évité » en a.

---

> _Exemple fictif, à supprimer à la première vraie erreur._

## M001 : Délai annoncé depuis une fiche périmée *(exemple fictif)*

Fait          : le `<jj/mm/aaaa>`, j'ai annoncé un délai de deux jours à un client en reprenant la
                mention portée sur la fiche produit. Le fournisseur était en rupture depuis trois
                semaines. L'opérateur a dû rappeler le client pour se rétracter.

Pourquoi faux : j'ai traité une fiche comme une source de vérité alors que c'est un cache. Elle dit
                ce qui était vrai la dernière fois que quelqu'un l'a mise à jour, pas ce qui est vrai
                maintenant.

Cause racine  : confusion entre **une représentation** et **l'état réel**. Le même schéma se rejoue
                partout : un statut affiché, un code de retour, une date en cache. Aucun n'est une
                observation.

Ce que je n'ai PAS fait, et qui aurait suffi : ouvrir l'état fournisseur avant de citer un délai, et
                à défaut, dire que je vérifiais plutôt que d'annoncer un chiffre.

Règle générée : **R001**, vérifier la disponibilité réelle avant d'annoncer un délai.

Sévérité      : **-2** (engagement pris auprès d'un tiers, rétractation nécessaire).

Catégorie     : engagement ; vérification ; sources périmées.

Statut        : **corrigée**. Résolue seulement si la règle tient au prochain cas du même type.

Date          : `<jj/mm/aaaa>`.

---

## Incidents importés : non commis par l'agent

> Repris d'ailleurs parce qu'ils fondent des hypothèses actives. Pas de sévérité attribuée à l'agent,
> ils ne bloquent pas ses montées de niveau.

- `<date>` : `<incident>`. Fonde **H-0X**.

---

_Aucun compte écrit à la main : ce fichier est sa propre source, il se compte en se lisant._
_Dernière mise à jour : `<jj/mm/aaaa>`._
