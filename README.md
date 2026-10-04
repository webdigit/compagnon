# compagnon

**Une méthode pour qu'un agent apprenne de vous, et gagne son autonomie par preuves.**

Pas un logiciel. Pas une dépendance. Un dossier de fichiers texte et une doctrine qui les fait
vivre.

---

## Installer

Deux méthodes. La première ne demande ni git ni manipulation de fichiers : c'est votre agent qui
installe. Il lui faut pour cela le droit d'écrire dans un dossier de votre ordinateur : le mode
**Cowork** de l'application Claude de bureau, ou Claude Code. Une conversation sur claude.ai, dans le
navigateur, ne le peut pas : prenez alors la méthode 2.

### Méthode 1 : laisser l'IA installer (recommandée)

1. **Créez un dossier vide** sur votre ordinateur, par exemple `Documents/mon-agent`.
2. **Ouvrez l'application Claude de bureau en mode Cowork**, créez un projet, et choisissez ce
   dossier comme dossier du projet.
3. **Ouvrez une conversation** dans ce projet et collez-y cette consigne :

   ```
   Installe compagnon dans ce dossier.
   Suis pas à pas la procédure de ce fichier, sans sauter d'étape :
   https://raw.githubusercontent.com/webdigit/compagnon/main/INSTALLATION-ASSISTEE.md
   Si tu ne peux pas lire cette adresse, dis-le-moi : je téléchargerai le dépôt dans ce dossier.
   ```

4. **Répondez à ses questions**, une à la fois : qui vous êtes, ce que l'agent doit apprendre en
   premier, ce qu'il ne doit jamais faire. Il écrit le dossier `ai-memory/` à partir de vos réponses.
5. **Faites l'étape qu'il ne peut pas faire à votre place.** À la fin, il vous demande de coller un
   texte dans les **Instructions du projet**. C'est ce qui fait que l'agent relit sa mémoire à chaque
   nouvelle conversation. Sans ce geste, le dossier existe mais personne ne le lit.
6. **Vérifiez**, dans une **nouvelle** conversation du même projet : « Qui es-tu, quel est le rituel
   de session, et que dois-tu produire à la fin ? ». L'agent doit répondre sous le nom choisi et
   décrire son rituel. S'il reste vague, l'étape 5 n'a pas pris.

### Méthode 2 : à la main

1. **Téléchargez le dépôt** : bouton vert **Code** en haut de cette page, puis **Download ZIP**, et
   décompressez-le.
2. **Copiez `template/`** dans le dossier de votre projet, sous le nom `ai-memory/`, et remplissez ce
   qui est marqué à remplir.
3. **Copiez les trois fichiers d'`entrees/`** (`CLAUDE.md`, `AGENTS.md`, `GEMINI.md`) à la racine du
   projet, nom de l'agent rempli. Sur un projet claude.ai, **collez aussi le NOYAU rempli**, puis
   `noyau-local.md` à sa suite, dans les Instructions du projet.
4. **Vérifiez** avec la même question, dans une conversation neuve.

Le détail de chaque étape, les autres outils et les pièges connus sont dans
[`INSTALLATION.md`](INSTALLATION.md). Comptez vingt minutes pour installer, et une semaine d'usage
réel avant que le système commence à valoir quelque chose.

---

## Bien s'en servir

- **Clôturez chaque conversation.** Avant de la quitter, dites « clôture ». L'agent produit son bloc
  `🧠 MISE À JOUR MÉMOIRE` : ce qu'il a appris, ce qu'il a écrit, ce qui attend votre décision. Une
  conversation fermée sans ce bloc n'a rien appris. Relisez-le : c'est là que la complaisance se
  voit.
- **Clôturez avant que la conversation déborde.** Quand une conversation s'allonge, l'outil résume
  les anciens échanges pour faire de la place, et ce qui n'a pas été écrit se perd. Clôturez, puis
  ouvrez une conversation neuve dans le même projet.
- **Pour reprendre, ouvrez une nouvelle conversation, pas l'ancienne.** Inutile de recoller
  l'historique : l'agent relit sa mémoire à l'ouverture et repart de ce qui est écrit, pas de ce qui
  a été dit. Un travail resté en plan, redites-le-lui en une phrase.
- **Un sujet par conversation.** Deux sujets mêlés donnent un bloc de fin confus et des règles mal
  rangées.
- **Corrigez en disant pourquoi.** « Non » ne produit rien. « Non, parce que… » produit une règle.
- **Tranchez ce qui attend.** L'agent rappelle les décisions en attente à chaque ouverture. Tant que
  vous ne répondez pas, rien ne monte, mais rien n'est refusé non plus.
- **Pour mettre à jour, dites « Mets-toi à jour. »** dans une conversation neuve. L'agent rattrape la
  dernière version publiée et vous dit ce qui reste à faire de votre côté.

---

## Le problème

Votre agent est compétent et amnésique. Vous le corrigez, il comprend, et à la session suivante il
recommence. Le travail que vous investissez dans la correction ne s'accumule nulle part.

Les mémoires existantes retiennent des **faits** : votre prénom, votre pile technique, vos
préférences. Ce qu'il vous faut, ce sont des **jugements** : quoi vérifier avant d'affirmer, quel
délai est tenable, ce qu'il ne faut jamais promettre à un client.

Et il manque une seconde chose : rien ne borne ce que l'agent a le droit de faire. Il a vos accès,
donc il peut écrire, envoyer, supprimer. La seule chose qui l'en empêche est votre vigilance, à
chaque fois.

## Ce que fait compagnon

Il donne à l'agent un **cerveau de décision** relu à chaque session, et une **échelle d'autonomie**
qui ne monte que sur décision datée de votre part.

Concrètement, après quelques semaines d'usage réel :

- un playbook de règles apprises, chacune avec son origine, son score et sa maturité ;
- un journal d'erreurs qui nomme les causes racines et qui **bloque** les montées de niveau tant
  qu'une erreur reste ouverte ;
- des cas concrets réutilisables par analogie ;
- un tableau de bord de l'état courant ;
- un catalogue de capacités où chaque ouverture porte votre nom et sa date ;
- des **évaluations périodiques**, compétence par compétence, de stagiaire à expert : l'agent les
  fait revenir à échéance et prépare son dossier, vous accordez le grade. Le point se fait même si
  vous n'y pensez pas ;
- des **modes opératoires** pour les chaînes techniques que personne d'autre ne documente, avec leur
  niveau d'autonomie et leur date de péremption ;
- et, si vous en avez l'usage, un **rapport de sortie** : le seul fichier lisible de l'extérieur,
  par vous en trente secondes ou par un agent qui coordonne plusieurs de vos instances ;
- si vous avez plusieurs agents, un **module équipe** facultatif : l'un d'eux lit les rapports des
  autres, vous signale qui n'a pas tourné ou attend votre décision, et propose de les relancer. Il
  ne lit jamais leur mémoire, et relancer seul est une autonomie qu'il gagne, agent par agent.

Et si les fichiers texte vous lassent, un **écran de lecture** facultatif : une page qu'on ouvre
d'un double-clic, sans rien installer, qui montre en tête ce qui attend votre décision. Il ne
remplace rien et n'écrit rien. Une instance sans lui fonctionne à l'identique.

## Ce que ça n'est pas

Ce n'est pas une garantie mécanique. L'agent écrit ses propres règles et note ses propres scores.
La méthode ne rend pas la complaisance impossible, elle la rend **visible** à qui relit. Elle
suppose que vous relisiez.

Lisez [`DOCTRINE.md`](DOCTRINE.md) avant de confier un vrai travail à votre agent, et notamment sa
section « Ce que compagnon ne prétend pas ». C'est le document qui décide si la méthode vous
convient.

## Pour qui

Un opérateur solo ou une petite équipe qui travaille tous les jours avec un agent sur un métier
réel, et qui en a assez de réexpliquer la même chose. Il faut accepter deux choses : relire ce que
l'agent écrit, et accorder l'autonomie vous-même, un cran à la fois.

## Ce qu'il y a dans le dépôt

| Chemin | Contenu |
|---|---|
| `DOCTRINE.md` | **La méthode.** Les principes, ce qu'elle ne prétend pas, et pourquoi c'est du texte |
| `INSTALLATION.md` | Comment installer à la main, et l'étape qui fait échouer les installations |
| `INSTALLATION-ASSISTEE.md` | La procédure que suit l'agent quand on lui demande d'installer (méthode 1). Écrite pour lui, pas pour vous |
| `MIGRATIONS.md` | Comment une instance en service rattrape une nouvelle version, avec ou sans dépôt local |
| `CHANGELOG.md` | L'historique des versions, **la seule source du numéro de version** |
| `LICENSE` | CC BY 4.0, et ce que la licence couvre exactement |
| `PUBLICATION.md` | Les règles d'écriture du gabarit, pour qui le fait évoluer |
| `FORMAT.md` | La part du format que l'écran de lecture interprète, donc ce qu'on ne casse pas sans le savoir |
| `template/` | Le gabarit canonique : les fichiers stériles, à instancier, dont `template/hotes/`, une fiche courte par outil où l'agent tourne (Claude, Codex, Gemini) |
| `entrees/` | Les points d'entrée `CLAUDE.md`, `AGENTS.md`, `GEMINI.md`, à poser à la racine du projet : le fichier que chaque outil charge au démarrage |
| `hotes/` | Les guides de service : comment travailler sans poste allumé, service par service (Google Drive, tâches programmées de Claude). Recopiés dans `procedures.md` à l'installation du mode sans poste |
| `ecran/` | L'écran de lecture, **facultatif** : un fichier à ouvrir d'un double-clic, qui affiche l'instance |

> `template/` est écrit **depuis la doctrine**, jamais copié depuis une instance en exploitation :
> aucune donnée client ne peut s'y trouver. Seule la partie « Du gabarit » des fiches de
> `template/hotes/` rapporte ce que des instances ont constaté sur un outil, sans nom ni donnée,
> avec la date. Les zones à remplir sont marquées, et chaque fichier
> porte un exemple **fictif** signalé comme tel, à supprimer au premier vrai cas.

## État

Avant la 1.0.0. La doctrine est dégagée de trois instances en exploitation réelle chez WEBDIGIT srl.
Trois questions de doctrine restent ouvertes, listées en fin de `DOCTRINE.md` : elles se tranchent
avant la 1.0.0.

**Le numéro de version courant se lit dans [`CHANGELOG.md`](CHANGELOG.md) et dans les étiquettes
git, et nulle part ailleurs.** Aucun autre fichier ne le duplique, y compris celui-ci : c'est compagnon P7
appliqué au dépôt lui-même, après l'avoir vu diverger en une seule journée.

## Licence

**Creative Commons Attribution 4.0 International (CC BY 4.0).** Voir [`LICENSE`](LICENSE).

Vous pouvez lire, copier, adapter et redistribuer cette méthode, **y compris commercialement**, à
condition de créditer WEBDIGIT srl et de fournir un lien vers la licence.

**Ce que vous écrivez dans votre instance vous appartient.** Les règles que votre agent apprend, vos
erreurs consignées, vos cas et vos décisions d'autonomie ne sont pas couverts par cette licence.
Instancier le gabarit ne vous oblige à rien publier, et ne place aucune obligation sur votre travail
quotidien. L'attribution ne concerne que la redistribution ou l'adaptation de la **méthode
elle-même**.
