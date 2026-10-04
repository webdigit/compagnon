# hotes/codex.md : Ce que Codex sait faire ici

> **Statut : mémoire AUTO-ÉCRITE**, lue d'office à chaque session sous Codex (NOYAU, « Ta fiche
> d'hôte »). Ce qu'elle contient est un constat d'outil, jamais une règle de jugement : elle complète
> le NOYAU, elle ne le desserre jamais. Chaque ligne porte un statut : **Prouvé** (constaté en
> service, avec la date et la source), **Constaté une fois**, ou **Non prouvé** (cru ou lu, jamais vu).
>
> **Deux parties, deux propriétaires.** « Du gabarit » vient du dépôt compagnon : une migration la
> remplace, l'agent n'y écrit pas. « Constaté ici » appartient à l'instance : l'agent y ajoute ce
> qu'il constate, une ligne et un statut chacun, et aucune migration n'y touche. Une ligne d'ici qui
> contredit une ligne du gabarit ne la remplace pas : les deux restent, et l'écart se signale à
> l'opérateur pour remonter au dépôt (ligne `ÉCART` du bloc de fin de session).

## Du gabarit

> Source : une seule session réelle, sur une instance en service, le 04/10/2026, relue sous Claude le
> même jour. Tout ce qui suit est donc au mieux « constaté une fois ».

### Comment je suis chargé

- **`AGENTS.md` à la racine du projet**, lu au démarrage. Il désigne les fichiers, dans l'ordre, et
  je les lis moi-même. Constaté une fois.
- **Pas d'import de fichiers** connu depuis `AGENTS.md` : rien n'est chargé tant que je ne l'ai pas
  ouvert. Non prouvé (non testé).

### Lire un fichier en entier

- **Le shell du poste**, directement : pas de deuxième système de fichiers. Sur Windows, PowerShell.
  Constaté une fois.
- **Les sorties longues sont tronquées.** Un gros fichier se lit en morceaux (`Get-Content
  -LiteralPath`), et sa fin se contrôle par une seconde voie, brute (`[IO.File]::ReadAllText`).
  Constaté une fois.
- **Le chemin réel d'un dossier** a dû être résolu avant la lecture (`Test-Path -LiteralPath`). La
  session l'a attribué à une espace insécable dans le nom `Mon Drive`. Non prouvé (cause non
  vérifiée).

### Écrire

- **Modification localisée par `apply_patch`**, puis relecture brute du passage changé et de la
  dernière ligne. Constaté une fois.

### Ce que cet hôte expose

- **Les automations**, attachées chacune à une conversation, sa conversation cible. Constaté une fois.
  Elles tournent **sur le poste** : ordinateur allumé et application ouverte dès qu'elles touchent des
  fichiers locaux. Non prouvé (documentation OpenAI, lue le 04/10/2026). Ce qu'on en sait et les
  essais à mener : guide `hotes/codex-taches-planifiees.md` du dépôt.
- **Une conversation peut écrire dans une autre.** Le message arrive marqué « Envoyé par ChatGPT à
  partir d'une autre tâche ». Constaté une fois.
- **Les connecteurs** que l'opérateur a configurés dans Codex. Ce ne sont pas ceux de son compte
  Claude. Constaté une fois.
- **Le web** : l'API GitHub a répondu là où une première lecture de `raw.githubusercontent` avait
  échoué. Constaté une fois.

### Ce que cet hôte n'expose pas

- **Les tâches programmées de Claude** : ni liste, ni heures de début et de fin, ni relance. Un
  déclenchement ne se vérifie pas depuis cet hôte. Constaté une fois.
- **La liste des automations avec leurs heures de début et de fin** : non établie. Non prouvé.
- **Les skills de Claude** : une procédure qui renvoie à une skill ne donne pas son contenu sous
  Codex. Constaté une fois.
- **La mémoire de compte de Claude.** Constaté une fois.
- **Le travail sans poste** sur un dossier local : non établi. Une tâche web de Codex tourne dans le
  cloud et ne travaille pas dans un dossier du poste. Non prouvé (documentation OpenAI, lue le
  04/10/2026).

## Constaté ici

_Rien encore._

[fin de codex.md]
