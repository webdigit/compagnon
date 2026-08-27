# Changelog

Toutes les évolutions notables de **compagnon** sont consignées ici.
Format inspiré de Keep a Changelog. Versionnement sémantique.

Ce que versionne ce numéro : **le gabarit et la doctrine**, pas les instances. Une instance
déclare la version du gabarit dont elle est née, et ne la change qu'en migrant explicitement.

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
