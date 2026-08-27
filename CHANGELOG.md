# Changelog

Toutes les évolutions notables de **compagnon** sont consignées ici.
Format inspiré de Keep a Changelog. Versionnement sémantique.

Ce que versionne ce numéro : **tout ce dépôt** — doctrine, gabarit, documentation, licence. Pas les
instances : chacune déclare dans son `VERSION.md` la version dont elle est née, et ne la change
qu'en migrant explicitement.

**Ce fichier et les étiquettes git sont la seule source du numéro de version.** Aucun autre document
ne le duplique, pour qu'il ne puisse pas diverger (P7).

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

- **P11 — Aucune écriture automatique dans la mémoire.** La mémoire ne se transforme jamais par un
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

- **P9 — Une règle naît provisoire, jamais mûre.** L'échelle de statut devient
  `hypothèse → provisoire → active → en consolidation → archivée`. Une validation explicite unique
  crée une règle **provisoire**, qui s'applique mais qui ne peut pas être citée à l'appui d'une
  demande d'autonomie. Deux usages supplémentaires sans contradiction la rendent active ; une
  contradiction la renvoie à l'état d'hypothèse.
- **P10 — La confiance ne s'établit pas sous trois occurrences.** Sous ce seuil, la confiance n'est
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
