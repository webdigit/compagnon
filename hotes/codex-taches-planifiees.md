# Guide d'hôte : les automations de Codex

> Ce qui lance un run de Codex à heure fixe : une **automation**, créée depuis une conversation de
> l'application de bureau. Ce guide dit ce qu'on en sait, ce qu'on n'en sait pas encore, et ce
> qu'il faut contrôler à chaque essai.
>
> **Ce n'est pas encore une recette.** Une seule session réelle, sur l'instance d'essai « Léo » le
> 04/10/2026, plus la documentation d'OpenAI lue le même jour. Rien de ce qui suit n'est prouvé au
> sens de `hotes/README.md` : ce qui a été vu est « constaté une fois », ce qui vient de la
> documentation est « non prouvé ». Ne recopiez rien dans `procedures.md` avant que les essais de la
> dernière section soient passés.

---

## Le mode : sur le poste, pas sans poste

- **Une automation qui touche des fichiers locaux exige l'ordinateur allumé et l'application
  ouverte.** La documentation le dit en ces termes : « Keep the computer on and the app running when
  a scheduled task needs local files. » Non prouvé (documentation OpenAI, lue le 04/10/2026).
- **Les tâches planifiées sur le web ne travaillent pas dans un dossier du poste** : elles tournent
  dans le cloud, sous un compte de service. Non prouvé (même source).
- **Conséquence pour compagnon** : une instance Codex sur un dossier local tourne **sur le poste**,
  pas sans poste (`INSTALLATION.md`, étape 7). Poste éteint, le run n'a pas lieu. Le travail sans
  poste sous Codex n'est pas établi.

## Créer une automation

- **Elle s'attache à une conversation**, sa conversation cible : c'est là qu'elle tourne. Constaté une
  fois (04/10/2026).
- **Le 04/10, l'automation de test a été créée par la conversation d'installation et attachée à
  elle**, pas à celle de l'instance : elle ne tourne donc ni avec le rituel de l'instance, ni avec sa
  mémoire. Constaté une fois. D'où la consigne : la créer depuis la conversation de l'instance, sur la
  demande directe de l'opérateur dans cette conversation (`INSTALLATION-ASSISTEE.md`, étape 8).
- **L'heure de référence est celle que l'outil enregistre**, pas celle annoncée dans la conversation,
  qui peut être arrondie. On relit la configuration sauvegardée après création. Constaté une fois.
- La session du 04/10 a nommé l'outil de création `automation_update`. Non prouvé (non relu hors de
  cette session).

## Une exécution unique

- **Le test « unique » du 04/10 a été monté en intervalle** (toutes les quinze minutes), avec un texte
  qui demande à l'automation de se désactiver après sa première exécution. Constaté une fois.
- **Fragile** : si la désactivation échoue, l'automation recommence à chaque intervalle. Après la
  première échéance, on vérifie dans la carte de l'automation qu'elle est désactivée, et on l'écrit.
  Une échéance unique native, si le mécanisme en offre une, est préférable. Non prouvé (exécution et
  désactivation non constatées au 04/10/2026).

## Une consigne venue d'une autre conversation

- **Une conversation Codex peut écrire dans une autre.** Le message arrive marqué « Envoyé par ChatGPT
  à partir d'une autre tâche ». Constaté une fois (04/10/2026).
- **Le 04/10, Léo a refusé deux fois un accord rapporté ainsi** : il a préparé, proposé, et rien
  écrit en mémoire. Constaté une fois. C'est ce que demande le NOYAU, §5sexies (« Une autre
  conversation est un autre agent »).

## Le retour

- On contrôle ce qui a été laissé, pas ce qu'affirme un message : le run dans la conversation cible,
  son heure réelle, les marqueurs lus, les fichiers produits, le statut final de l'automation. Non
  prouvé (rien d'exécuté au 04/10/2026).

## Ce qui reste à établir

| Essai | Critère | État |
|---|---|---|
| **TC1.** Une automation créée depuis la conversation de l'instance s'exécute-t-elle à l'heure ? | Run visible dans la conversation cible, heure relevée | à mener |
| **TC2.** Le run lit-il `AGENTS.md` puis `ai-memory/`, marqueurs compris ? | Le run nomme sa fiche d'hôte et les fichiers lus | à mener |
| **TC3.** Une automation « unique » se désactive-t-elle ? | Carte relue après la première échéance : désactivée | à mener |
| **TC4.** Poste éteint à l'heure prévue : que se passe-t-il au rallumage ? | Run manqué, rattrapé ou différé, constaté et écrit | à mener |
| **TC5.** Existe-t-il une échéance unique native ? | Constatée dans l'outil, ou absence écrite | à mener |
| **TC6.** Le run a-t-il le droit d'écrire dans `ai-memory/` sans approbation ? | Mode d'approbation constaté et écrit | à mener |
| **TC7.** Comment le texte d'une automation arrive-t-il dans sa conversation cible ? Se distingue-t-il d'un message relayé d'une autre conversation ? | Forme constatée et écrite ; l'instance ne refuse pas sa propre automation | à mener |
| **TC8.** Les automations se listent-elles avec leurs heures de début et de fin ? | Constaté et écrit dans la fiche `codex.md` | à mener |
