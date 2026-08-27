# learned-rules.md — Le playbook de décision

> **Statut : mémoire AUTO-ÉCRITE.** L'agent crée et met à jour les règles ici, selon le NOYAU. Toute
> écriture est listée en fin de session et relue par l'opérateur.

Ce fichier accumule les **règles de jugement**. Les **procédures d'outil** vont ailleurs (P7).

---

## Schéma d'une règle

```
## R### — <titre court et actionnable>
Domaine      : <vos domaines : qualification | rédaction | vérification | engagement | transverse>
Contexte     : quand cette règle s'applique.
Règle        : quoi faire, formulé de façon générique et non au cas particulier.
Origine      : d'où elle vient (correction / validation, date) + liens ← [O###, E###, M###]
Statut       : hypothèse | provisoire | actif | en-consolidation | archivé
Score cumul  : somme brute des rewards.
Score récent : moyenne des ≤10 derniers usages.
Confiance    : **non établie** sous 3 occurrences. Au-delà : clamp01((score_récent + 3) / 5).
               Jamais saisie à la main. Ce n'est pas une probabilité.
Occurrences  : confirmations / corrections.
Dernière conf: date.
```

**Barème** : `+2` validée explicitement · `+1` utilisée sans correction · `0` aucune info ·
`-1` correction mineure · `-2` mauvaise décision · `-3` violation d'un principe.

**Seuils** (P9) : `hypothèse → provisoire` sur 1 validation explicite. `provisoire → active` sur
2 usages de plus sans contradiction. `provisoire → hypothèse` sur une contradiction.
`active → en-consolidation` si confiance < 0,35, ou 2 des 3 derniers usages ≤ -1, ou un exemple la
contredit. `en-consolidation → archivé` : remplacée, avec lien, date et motif.

> ⚠️ **Une règle provisoire s'applique, mais ne prouve rien.** Elle ne peut pas être citée à l'appui
> d'une demande de montée d'autonomie.

---

# A. Règles apprises

> _Exemple fictif, à supprimer à la première vraie règle. Il montre la forme attendue._

## R001 — Vérifier la disponibilité réelle avant d'annoncer un délai *(exemple fictif)*
Domaine      : engagement
Contexte     : un client demande sous quel délai un article peut être obtenu.
Règle        : ouvrir l'état réel du stock et le délai fournisseur **avant** d'annoncer quoi que ce
               soit. Ne jamais reprendre le délai affiché sur une fiche : il est souvent périmé. En
               l'absence d'information fiable, annoncer qu'on vérifie et sous quel délai on
               répondra, plutôt qu'un délai inventé.
Origine      : correction explicite de l'opérateur le `<jj/mm/aaaa>` : un délai de deux jours avait
               été annoncé depuis une fiche produit, alors que le fournisseur était en rupture.
               ← [E001]
Statut       : **provisoire** (1 validation explicite)
Score cumul  : +2 · Score récent : +2 · Confiance : **non établie** (1 occurrence sur 3) ·
               Occurrences : 1 conf / 0 corr · Dernière conf : `<jj/mm/aaaa>`

---

# B. Hypothèses — non validées

> Ce qui pointe vers un motif sans avoir encore la preuve. Une hypothèse oriente, elle n'autorise
> rien. Elle sort d'ici sur cas réels, jamais par conviction.

| ID | Hypothèse | Origine | Occurrences |
|---|---|---|---|
| H-01 | `<votre hypothèse>` | `<d'où elle vient>` | 0 |

---

# C. Acquis importés — non appris ici, non scorés

> Éléments repris d'une documentation qui fait autorité ailleurs. **Ce ne sont pas des
> apprentissages de l'agent** : pas de reward, pas de maturation. En cas de divergence, la source
> fait foi. Ne recopiez pas la source, **référencez-la**.

- `<élément>` — source : `<document qui fait autorité>`

---

# D. Contradictions ouvertes — à trancher par l'opérateur

| ID | Objet | État |
|---|---|---|
| C-01 | `<les deux sources qui se contredisent>` | **Ouverte** |

---

_`<n>` règles. Aucune archivée à ce jour. Gabarit : compagnon `<version>`._
_Dernière mise à jour : `<jj/mm/aaaa>`._
