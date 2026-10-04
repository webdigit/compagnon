# compagnon : les points d'entrée

> **À qui s'adresse ce dossier.** À qui installe ou met à jour une instance. Ces trois fichiers se
> posent **à la racine du projet**, à côté d'`ai-memory/`, jamais dedans : c'est là que chaque hôte
> les cherche au démarrage.

Un hôte ne lit pas un dossier : il charge **un** fichier au démarrage, toujours le même, à la racine.
Chaque hôte a le sien. Sans lui, `ai-memory/` est inerte (NOYAU, bandeau d'en-tête).

| Fichier | Hôte qui le charge | Statut |
|---|---|---|
| `CLAUDE.md` | Claude : Cowork sur un dossier, Claude Code | Prouvé sous Cowork ; non prouvé sous Claude Code |
| `AGENTS.md` | Codex | Constaté une fois (instance Vincent, 04/10/2026) |
| `GEMINI.md` | Gemini | Non prouvé : aucune instance n'y a encore tourné |

Un projet claude.ai sans dossier ne charge aucun de ces fichiers : il reçoit le NOYAU par les
Instructions du projet (`INSTALLATION.md`, étape 4), et le NOYAU lui désigne sa fiche d'hôte.

## Une seule règle : les trois disent la même chose

Les trois fichiers sont **identiques**, à deux exceptions près :

1. **la ligne `Hôte`** et le quatrième fichier de la liste, qui nomment la fiche de cet hôte ;
2. **les lignes `@`** de `CLAUDE.md` : Claude Code importe les fichiers par cette syntaxe. Ce n'est
   pas garanti partout (une session Cowork a reçu le texte sans les fichiers importés) : la liste
   reste la consigne, et chaque hôte lit lui-même les fichiers, dans son ordre.

Retirez les lignes `@`, la ligne `Hôte` et la ligne de la liste qui nomme la fiche : ce qui reste
doit être le même texte, au caractère près. C'est ce que
contrôle chaque migration (NOYAU §6bis, point 1ter). Un point d'entrée qui a divergé charge un autre
agent que celui que vous croyez avoir : c'est ce qu'a montré le premier essai sous Codex, dont
l'`AGENTS.md` datait d'un mois et ne nommait pas `noyau-local.md`.

**Rien de propre à l'instance ne va ici.** Seul le nom de l'agent, dans le titre, se remplit. Une
mission, une règle d'isolation, une liste de documents : tout cela va dans `ai-memory/noyau-local.md`,
lu par tous les hôtes. Ce qui serait écrit dans un seul point d'entrée n'atteindrait qu'un hôte.

**Posez les trois**, même si un seul hôte sert aujourd'hui : le jour où l'opérateur ouvre son projet
dans un autre outil, l'agent y trouve sa mémoire au lieu d'un dossier inerte.
