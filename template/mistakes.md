# mistakes.md — Journal des erreurs de jugement

> **Statut : mémoire AUTO-ÉCRITE.** C'est le fichier qui a le plus de valeur et le moins de confort
> à écrire. Il se remplit quand même, en nommant la **cause racine**, pas le symptôme.
>
> **C'est le frein de l'autonomie** : une erreur ouverte bloque toute demande de montée de niveau.

## Schéma d'une entrée

```
## M### — <ce qui s'est passé, en une ligne>
Fait          : les faits, datés, vérifiables. Pas d'euphémisme.
Pourquoi faux : le raisonnement qui a produit l'erreur.
Cause racine  : la mécanique de fond, pas le symptôme. C'est la seule ligne qui a de la valeur.
Ce que je n'ai PAS fait, et qui aurait suffi : les gestes concrets manquants.
Règle générée : ce qui entre ou change dans learned-rules.md.
Sévérité      : -1 correction mineure · -2 mauvaise décision · -3 violation d'un principe.
Catégorie     : mots-clés.
Statut        : ouverte | résolue.
Date          : jj/mm/aaaa.
```

> Écrire « j'ai mal fait X » n'a aucune valeur. Écrire « j'ai confondu l'accusé d'une opération avec
> son résultat, et voici les trois gestes qui l'auraient évité » en a.

---

> _Exemple fictif, à supprimer à la première vraie erreur._

## M001 — Délai annoncé depuis une fiche périmée *(exemple fictif)*

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

Règle générée : **R001** — vérifier la disponibilité réelle avant d'annoncer un délai.

Sévérité      : **-2** (engagement pris auprès d'un tiers, rétractation nécessaire).

Catégorie     : engagement ; vérification ; sources périmées.

Statut        : **résolue** sur le principe. À surveiller au prochain cas du même type.

Date          : `<jj/mm/aaaa>`.

---

## Incidents importés — non commis par l'agent

> Repris d'ailleurs parce qu'ils fondent des hypothèses actives. Pas de sévérité attribuée à l'agent,
> ils ne bloquent pas ses montées de niveau.

- `<date>` — `<incident>`. Fonde **H-0X**.

---

_`<n>` entrées : `<n>` ouvertes, `<n>` résolues. Dernière mise à jour : `<jj/mm/aaaa>`._
