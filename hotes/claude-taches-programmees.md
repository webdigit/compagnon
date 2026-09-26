# Guide d'hôte : les tâches programmées de Claude

> Ce qui lance un run de nuit : une **tâche programmée** créée depuis une conversation du projet
> claude.ai, qui tourne **dans le cloud**, sans ordinateur. Ce guide dit comment la créer pour qu'elle
> tourne vraiment ordinateurs éteints, ce qu'elle reçoit, et ce qu'on sait de son comportement.
>
> **Source** : l'instance Pilote, projet « TEST SYNCHRO DRIVE », essais du 24 au 26/09/2026. Statuts :
> voir `hotes/README.md`. **État des connaissances au 26/09/2026**, à compléter par les tests en cours.

---

## Créer une tâche qui tourne sans ordinateur

- **La créer depuis une conversation du projet**, en le demandant à Claude. Elle hérite alors des
  **Instructions du projet** (le NOYAU et `noyau-local.md`), et elle les reçoit **dans leur version
  à jour** à chaque exécution : modifier les Instructions suffit, pas besoin de recréer la tâche.
  Prouvé (tests 4, T1, T14 : les deux marqueurs de fin reçus).
- **Dire « dans le cloud »** quand la conversation est reliée à un ordinateur. Sans cette précision,
  la tâche peut être liée au poste, et elle exigera alors l'ordinateur allumé et l'app ouverte. Cette
  liaison ne se retire pas après coup depuis la conversation : il faut supprimer la tâche et la
  recréer. Prouvé (v4 de la synthèse Pilote). Une tâche créée depuis une session qui tourne déjà dans
  le cloud est cloud d'office. Prouvé.
- **Le texte de la tâche** : court, et renvoyant aux Instructions du projet pour le reste. Il dit ce
  qu'il faut produire, où, et ce qu'il ne faut surtout pas faire. Il n'a pas besoin de répéter
  l'identifiant du dossier si le NOYAU le porte. Prouvé (test 4).
- **Une tâche ne voit que son propre projet** : ses Instructions, ses documents, sa mémoire. Pas ceux
  d'un autre projet claude.ai. Les connecteurs, eux, sont ceux du compte. Prouvé (test 6).

## L'heure et le délai

- **Le planificateur travaille à la minute.** Les secondes d'une heure unique sont ignorées, et le
  déclenchement arrive 20 à 40 secondes après la minute prévue. Prouvé (T14, T2b-2).
- **Une minute entre la création et l'heure prévue suffit.** En dessous, non testé. Prouvé (T14,
  quatre tâches de 56 s à 6 min 13 s).
- **Éviter l'heure pile et la demie.** La plateforme étale d'office les tâches calées sur l'heure
  pile : une tâche prévue à 03:00 a été inscrite à 03:04:43. Une minute « libre » (02:53, 03:07) est
  gardée telle quelle. **Constaté** à la création ; le retard réel au démarrage est mesuré par T13
  (nuits du 27 au 29/09/2026).
- **Donner l'heure dans le fuseau de l'opérateur** (`CRON_TZ=Europe/Brussels 53 2 * * *`).
- **Une tâche récurrente limitée à quelques dates reste active ensuite** : elle ne tourne plus, mais
  elle existe. La désactiver au bilan. Constaté (T13).

## Ce qu'une tâche peut faire

- **Tenir longtemps** : 45 minutes dans une seule session, contexte conservé. Prouvé (T2b-1). La
  limite haute n'est pas connue.
- **Attendre** : une commande shell est tuée à 600 secondes. Découper en tranches de 590 s au plus.
  Prouvé (T2b-1).
- **Se réveiller seule** : un rappel programmé dans sa propre session (`send_later`) la relance avec
  tout son contexte. Les connecteurs se reconnectent à chaque réveil. Prouvé (T2b-2, trois réveils).
- **Programmer la tâche suivante** : possible, mais une session peut être **suspendue des heures
  sans avertissement** (quatre heures constatées). Une heure calculée au départ peut être passée au
  moment de créer la tâche, qui est alors refusée. Recalculer juste avant l'appel. Prouvé (T5).
- **Se désactiver elle-même** après sa dernière exécution. **Non prouvé** (T1, nuit 3 le 28/09).
- **Utiliser les skills du compte** : oui, mais une annexe de skill n'existe dans le cloud que si elle
  a été enregistrée avec le skill. Sinon, le skill échoue **en silence** sur ce point. Prouvé (T7,
  T8).

## L'approbation

- **Une tâche hérite du mode d'approbation de la conversation qui la crée** : en « automatique »,
  elle tourne sans rien demander. Prouvé.
- **Une tâche sans mode automatique** a pourtant créé ses fichiers Drive sans rien demander (fille de
  T5, T14). Ce qui déclenche une demande d'approbation dans un run sans personne n'est pas établi.
  **Constaté deux fois, non expliqué.** Ne pas s'appuyer dessus : une tâche dont la réussite dépend
  d'une approbation que personne ne donnera n'est pas une tâche de nuit.

## Le retour

- **La réponse finale d'une tâche arrive en notification** (téléphone, e-mail selon le réglage).
  C'est la seule chose que l'opérateur voit sans ouvrir de fichier. Prouvé.
- **Le déroulé d'une tâche n'est pas visible** : seul ce qu'elle a laissé l'est. D'où le compte rendu
  en tête du dépôt (NOYAU §5quinquies, « Le retour »). Prouvé.
- **La liste des tâches** (`list_triggers`, tâches terminées comprises) donne pour chacune l'heure de
  déclenchement, l'heure de fin, le statut et la raison d'un échec. C'est, avec le listing du dossier,
  la façon fiable de contrôler une nuit passée. Prouvé.
- **Une conversation lancée par une tâche peut être reprise** le lendemain, et elle relit alors les
  Instructions à jour. Prouvé (trois fois).

## Ce qui reste à établir

| Question | Test prévu chez Pilote |
|---|---|
| Une tâche calée sur l'heure pile démarre-t-elle plus tard qu'une tâche décalée ? | T13 (27-29/09) |
| Une tâche récurrente se désactive-t-elle elle-même à sa dernière exécution ? | T1 (28/09) |
| Une nuit avec Mac et PC réellement éteints (pas en veille) | T18 |
| Une tâche **locale** (app bureau) tourne-t-elle app fermée, en veille, éteint ? | T20 |
| Un skill modifié est-il pris en compte à la tâche suivante ? | T9 |
