# procedures.md : Les modes opératoires

> **Statut : mémoire AUTO-ÉCRITE.** L'agent crée et met à jour ses procédures ici. Toute écriture est
> listée en fin de session et relue par l'opérateur.
>
> **Ce fichier n'est pas de l'apprentissage.** Aucun reward, aucune maturation, aucune confiance.
> Une procédure n'est pas un jugement, c'est un mode opératoire : elle est juste ou périmée, jamais
> mûre ou provisoire.
>
> **Ce fichier est facultatif.** Une instance qui n'exécute aucune chaîne technique n'en a pas
> besoin, et son absence n'est pas un manquement.

---

## Ce qui vit ici, et ce qui n'y vit pas

Le critère tient en une question, et il se tranche sans réfléchir :

> **Cette connaissance change quand l'outil change, ou quand l'opérateur change d'avis ?**
>
> L'outil → c'est une **procédure**, elle vit ici.
> L'opérateur → c'est une **règle de jugement**, elle vit dans `learned-rules.md`.

« Le champ à interroger s'appelle `date_creation` » change si l'outil change : procédure. « On ne
relance pas un client deux fois la même semaine » change si l'opérateur change d'avis : règle.

**Quand la procédure existe déjà ailleurs, on la référence, on ne la recopie pas** (compagnon P7).
Une entrée peut donc tenir en trois lignes qui pointent vers une documentation d'outil, une skill ou
un manuel. Ce qui est interdit, c'est d'en faire une seconde copie qui divergera.

## Comment ce fichier se lit

L'**index** ci-dessous est lu au démarrage de chaque session, avec le reste du dossier. Les
**corps** ne se lisent pas d'office : on ouvre une procédure quand son déclencheur se présente.

C'est tout l'intérêt de l'index : savoir qu'une procédure existe coûte deux lignes, et c'est ce qui
évite d'improviser une chaîne technique déjà documentée.

## Index

| ID | Procédure | Déclencheur | Autonomie requise | Dernière exécution vérifiée |
|---|---|---|---|---|
| PR001 | `<titre>` | `<ce qui la déclenche>` | `<niveau ou capacité>` | `<jj/mm/aaaa>` |

## Schéma d'une entrée

```
## PR### : <ce que la procédure produit, pas l'outil qu'elle utilise>
Déclencheur  : ce qui fait ouvrir cette procédure. Doit correspondre mot pour mot à l'index.
Autonomie    : le niveau ou la capacité de `capabilities.md` que son exécution demande.
               Écrire la procédure est toujours permis ; l'exécuter suit le tableau des capacités.
Préconditions: ce qui doit être vrai avant de commencer, et comment le constater.
Étapes       : numérotées, dans l'ordre. Une étape par geste vérifiable.
Vérification : ce qu'on observe pour savoir que c'est fait. La source, jamais l'accusé (P005).
Fragile      : ce qui casse cette procédure si l'outil bouge. C'est la ligne qui la fait vivre.
Référence    : le document qui fait autorité, s'il en existe un. Alors les étapes se réduisent au
               strict nécessaire pour s'y raccrocher.
Dernière exécution vérifiée : jj/mm/aaaa, et le résultat observé.
Périme le    : jj/mm/aaaa. Passé cette date, elle se relit avant d'être suivie, pas après.
Origine      : ← [E###, M###] les cas qui l'ont façonnée.
```

**La péremption n'est pas un détail.** Une règle fausse produit un mauvais conseil, une procédure
fausse **s'exécute**. Une procédure dont la dernière exécution vérifiée est trop ancienne, ou dont
l'outil a bougé depuis, se relit intégralement **avant** d'être suivie. Trois mois est un défaut
raisonnable ; c'est à l'opérateur de le régler pour son métier.

**Quand une procédure casse**, ce n'est pas une erreur de jugement. Un tiers a changé son API, une
requête ne passe plus : ça met à jour cette entrée et sa ligne `Fragile`, ça n'entre pas dans
`mistakes.md`. Ce qui y entre, c'est **d'avoir suivi une procédure périmée sans la relire**, ou
d'avoir annoncé « fait » sur un accusé. La distinction protège le journal des erreurs, qui ne vaut
que s'il ne contient que des fautes réelles.

## Rotation

Ce fichier grossit plus vite que les autres : une chaîne technique se documente en dizaines de
lignes. Quand une entrée devient longue, elle **sort** en `procedures/<nom>.md` et ne laisse ici
qu'une ligne d'index et un renvoi. L'index, lui, reste court par construction, et c'est lui qui est
lu à chaque session.

Une procédure abandonnée ne se supprime pas : elle se dépose dans `_archive/` avec sa date et son
motif, et une ligne ici dit qu'elle y est (compagnon P5).

---

> _Exemple fictif, à supprimer à la première vraie procédure._

## PR001 : Extraire les mentions de la semaine depuis le portail de veille *(exemple fictif)*

Déclencheur  : une revue de presse hebdomadaire est demandée pour un client suivi.

Autonomie    : **N1**, lecture seule. La production du fichier de sortie relève de la capacité
               « Production de brouillons » ; son dépôt dans un espace partagé relève du niveau 2 et
               n'est **pas** couvert par cette procédure.

Préconditions: le client a un profil actif sur le portail. Se constate en ouvrant la liste des
               profils, pas en se fiant à la dernière revue produite.

Étapes :
1. Ouvrir le portail, section « profils », relever l'identifiant du profil du client.
2. Filtrer sur la période, du lundi au dimanche inclus, en dates de parution et non de collecte.
3. Exporter la liste au format tableur. L'export silencieux est plafonné : au-delà de la limite
   d'export, la page n'affiche aucun avertissement et l'export est tronqué. Vérifier le nombre de
   lignes obtenu contre le compteur affiché à l'écran avant de continuer.
4. Écarter les doublons de reprise de dépêche en comparant les titres, pas les URL.

Vérification : rouvrir le fichier produit et compter ses lignes. Le compteur du portail fait foi, pas
               le message de fin d'export.

Fragile      : la limite d'export et le libellé du filtre de période. Les deux ont déjà bougé sans
               préavis. Si le nombre de lignes ne correspond plus, c'est là qu'il faut regarder
               d'abord.

Référence    : aucune documentation publique. Cette entrée fait autorité, c'est pourquoi elle est
               détaillée.

Dernière exécution vérifiée : `<jj/mm/aaaa>`, 47 lignes exportées contre 47 annoncées.

Périme le    : `<jj/mm/aaaa + 3 mois>`.

Origine      : ← [E00X]

---

_Dernière mise à jour : `<jj/mm/aaaa>`._
