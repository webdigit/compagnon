# <NOM DE L'AGENT> — Cerveau de l'agent (index du dossier)

> **Commence ici.** Toute session lit **d'abord** ce README, **puis**
> `NOYAU-instructions-projet.md`, **puis** les quatre mémoires d'apprentissage et
> `operational-state.md`, **puis** `report.md` s'il existe. Sans cette lecture, ce dossier est
> inerte.
>
> ⚠️ **À REMPLIR** : remplacez `<NOM DE L'AGENT>`, `<OPÉRATEUR>` et `<COMPÉTENCE 01>` partout dans
> ce dossier. Les exemples fictifs sont signalés, ils sont à remplacer par vos vrais cas.

## Ce que c'est

Un système de mémoire qui permet à <NOM DE L'AGENT> de **<COMPÉTENCE 01, en une phrase>** et
**d'apprendre** de session en session : il observe le feedback de <OPÉRATEUR>, met à jour sa
mémoire, et fait mieux la fois suivante. Il gagne en autonomie à mesure qu'il fait ses preuves.

⚠️ Les objectifs sont de la **qualité opérationnelle**, pas des indicateurs d'activité. Voir
`objectives.md`.

## 🗺️ Carte des supports — où vit quoi

Règle d'or anti-silo (P7) : chaque chose a **un seul** propriétaire.

| Support | Rôle unique | Écriture |
|---|---|---|
| **`ai-memory/` (ce dossier)** | Le **cerveau de décision** : comment l'agent qualifie, décide, rédige, vérifie | Auto (agent) + zones manuelles |
| **`<vos procédures d'outil>`** | Le **comment** technique : requêtes, chemins, identifiants | Manuelle |
| **`<vos documents de référence>`** | Le contexte métier stable, daté | Manuelle |
| **`_archive/`** | L'**historique scellé** | **Ne se modifie jamais** |

> Frontière nette : une **règle de décision** vit ici. Une **procédure d'outil** vit dans votre
> documentation d'outil. On ne mélange pas.

## Carte des fichiers

**Couche APPRENTISSAGE**

| Fichier | Rôle | Écriture |
|---|---|---|
| `principles.md` | La constitution : mission, garde-fous durs, échelle d'autonomie | **Manuelle (opérateur)** |
| `learned-rules.md` | Le playbook : règles apprises, statut, score, maturation | Auto (agent) |
| `examples.md` | Cas concrets réutilisables par analogie | Auto (agent) |
| `mistakes.md` | Journal des erreurs de jugement — le frein de l'autonomie | Auto (agent) |

**Couche PILOTAGE**

| Fichier | Rôle | Écriture |
|---|---|---|
| `operational-state.md` | Tableau de bord vivant : état, points chauds | Auto (agent) |
| `objectives.md` | Les cibles de qualité | Cibles = **opérateur** · Progression = auto |
| `capabilities.md` | Les actions autorisées par niveau | Catalogue = **opérateur** · Demandes = auto |

**Couche INTERFACE**

| Fichier | Rôle | Écriture |
|---|---|---|
| `report.md` | La **seule sortie publique** : ce que le travail donne, pour l'opérateur pressé ou un agent chapeau | Auto (agent) · **facultatif** |

> `report.md` n'est pas une mémoire et n'est pas un journal : il ne porte que le dernier rapport, il
> est daté, il périme, et il pointe vers les systèmes qui portent la donnée au lieu de la recopier.
> Une instance dont personne ne lit la sortie n'a pas besoin de ce fichier.

**Couche NOYAU**

| Fichier | Rôle | Écriture |
|---|---|---|
| `NOYAU-instructions-projet.md` | Rituel de session, barème, maturation, migration | **Manuelle** — à charger au démarrage |
| `VERSION.md` | La version du gabarit et l'historique des migrations | Auto, sur migration |

## La boucle

```
Lire README → NOYAU → 4 mémoires + operational-state + objectives + capabilities + report
      ↓
Faire le travail dans la limite du niveau d'autonomie · proposer le reste
      ↓
L'opérateur valide ou corrige, en disant POURQUOI  →  reward (+2 … -3)
      ↓
Mettre à jour la mémoire (observation → hypothèse → règle provisoire → règle active)
      ↓
Publier le rapport de sortie, si l'instance en produit un
      ↓
Consolider périodiquement, sans jamais effacer
      ↓
                    ... session suivante, en mieux
```

## Règles d'or

1. **La seule fonction de récompense, c'est l'opérateur.** Le score est une comptabilité, pas une
   cible.
2. **L'agent propose, l'opérateur valide.** Aucune écriture externe sans accord pour ce cas précis.
3. **Jamais « fait » sans vérification effective.** Observer la source, pas sa représentation.
4. **Anti-silo** : un seul propriétaire par information.
5. **Auditabilité** : rien réécrit en silence, tout a une généalogie.
6. **Les zones manuelles ne s'auto-écrivent pas** : l'agent propose, l'opérateur dispose.
7. **`_archive/` ne s'édite jamais.**
8. **La mémoire ne se lit pas de l'extérieur.** Ce qui sort d'ici est `report.md`, et rien d'autre.
   Personne d'autre que cet agent n'écrit dans ce dossier.

_Gabarit : **compagnon** (voir `VERSION.md`). Doctrine complète : `DOCTRINE.md` du dépôt._
