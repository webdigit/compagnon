# compagnon — Installation

> Lisez [`DOCTRINE.md`](DOCTRINE.md) avant celui-ci. Installer sans avoir compris la doctrine
> produit un dossier de fichiers que personne n'applique.

Comptez vingt minutes pour l'installation, et une semaine d'usage réel avant que le système
commence à valoir quelque chose.

---

## ⚠️ Le point qui fait échouer les installations

**Copier les fichiers ne suffit pas. Un dossier `ai-memory/` que l'agent ne lit pas au démarrage
est un dossier mort.**

C'est la seule vraie difficulté de l'installation, et elle n'est pas technique. Un agent démarre
avec ce que son hôte lui injecte. Si le NOYAU n'est pas dans cette injection, l'agent commence sa
session sans savoir que le dossier existe, ne l'ouvre jamais, travaille de mémoire, et vous aurez
l'impression que la méthode ne marche pas.

Elle marchait. Personne ne lui avait dit de lire.

**Cette étape ne peut pas être faite par l'agent lui-même.** Il peut écrire tous les fichiers du
dossier, il ne peut pas se donner ses propres instructions de démarrage. C'est votre geste, et il
prend trente secondes. L'étape 4 ci-dessous ne se saute pas.

---

## Étape 1 — Décider de la première compétence

Une seule. Pas « m'assister au quotidien », c'est trop vaste pour être prouvé.

Une bonne première compétence est **fréquente**, **corrigeable** et **à faible risque** : quelque
chose que vous faites plusieurs fois par semaine, où vous verrez tout de suite si la réponse est
bonne, et où une erreur ne coûte pas cher.

Écrivez en trois lignes : ce qui est dans le périmètre, ce qui n'y est pas, et à quoi ressemble un
travail bien fait.

## Étape 2 — Poser le dossier

Copiez `template/` dans votre projet, sous le nom `ai-memory/`, et remplissez ce qui est marqué à
remplir. Les fichiers arrivent vides de contenu métier, c'est voulu.

Trois fichiers vous appartiennent et ne s'auto-écrivent jamais : `principles.md`, les cibles
d'`objectives.md`, et le catalogue de `capabilities.md`. L'agent y *propose*, vous y *disposez*.

## Étape 3 — Fixer l'échelle d'autonomie

Dans `capabilities.md`. **Commencez en lecture seule intégrale.** Aucune écriture pré-autorisée,
dans aucun outil. C'est frustrant et c'est le bon départ : vous ouvrirez au fur et à mesure, sur
preuves, et chaque ouverture portera votre nom et sa date.

Listez aussi les **interdits absolus**, ceux qu'aucune montée de niveau ne débloquera jamais.

## Étape 4 — Allumer le système

**C'est l'étape critique.** Le NOYAU doit être lu par l'agent **au démarrage de chaque session**,
avant qu'il travaille. Le mécanisme dépend de votre hôte.

### ⚠️ D'abord : le bon fichier

Il existe **deux** fichiers du même nom, et c'est le piège numéro un.

| Fichier | À coller ? |
|---|---|
| `template/NOYAU-instructions-projet.md` | **NON.** C'est le gabarit, plein de trous entre chevrons |
| `<votre projet>/ai-memory/NOYAU-instructions-projet.md` | **OUI.** C'est le vôtre, rempli |

Si votre agent se présente comme `<NOM DE L'AGENT>`, vous avez collé le gabarit.

### Projet claude.ai

Ouvrez le projet, section **Instructions du projet**, et **collez-y le contenu intégral de
`ai-memory/NOYAU-instructions-projet.md` de votre instance**, celui que vous avez rempli.

Attention au piège : déposer le NOYAU comme *document* du projet ne suffit pas. Un document est
consultable, il n'est pas injecté au démarrage. Seul le champ **Instructions** l'est.

### Claude Code, Cowork, et hôtes lisant `CLAUDE.md`

Placez à la racine du projet un `CLAUDE.md` qui impose la lecture et importe les fichiers :

```markdown
# <Nom de l'agent>

**Lis `AGENTS.md` en premier, puis `ai-memory/` en entier, avant toute action.**

@AGENTS.md
@ai-memory/README.md
@ai-memory/NOYAU-instructions-projet.md

Le cerveau courant du projet est `ai-memory/`, et c'est la seule source normative.
```

### Autres hôtes

Cherchez le fichier ou le champ que votre hôte injecte au démarrage : `AGENTS.md`, un fichier de
règles, un prompt système de projet. Le principe est le même : **le NOYAU doit s'y trouver, ou y
être importé.**

---

## Étape 5 — Vérifier que ça a pris

**Une installation n'est pas finie quand les fichiers sont copiés. Elle est finie quand vous avez
prouvé que l'agent les lit.**

Ouvrez une session neuve et posez une question dont la réponse n'existe **que** dans le NOYAU :

> « Qui es-tu, quel est le rituel de session, et que dois-tu produire à la fin ? »

S'il répond `<NOM DE L'AGENT>`, vous avez collé le gabarit et pas votre instance. Reprenez.

Un agent qui a lu répond avec les étapes du rituel et cite le bloc de mise à jour mémoire de fin de
session. Un agent qui n'a pas lu improvise une réponse plausible et générique. La différence est
nette, ne vous contentez pas d'un « oui j'ai bien lu ».

Deuxième contrôle, une fois que le dossier contient quelque chose :

> « Quelles règles as-tu apprises, et laquelle n'est encore que provisoire ? »

S'il ne sait pas répondre, l'étape 4 a échoué. Reprenez-la.

---

## Étape 6 — La première semaine

Le dossier est posé, il est vide, et il ne vaut encore rien. Ce qui le remplit, c'est du travail
réel, pas de la configuration.

Faites passer de vrais cas. À chaque fois : l'agent propose, vous corrigez en disant **ce qui
cloche et pourquoi**, il consigne. Une correction expliquée vaut dix corrections silencieuses,
parce que seule la première produit une règle utilisable.

Et exigez le bloc de fin de session. C'est le maillon faible du dispositif : rien ne force l'agent
à le produire, et une session qui se termine sans lui n'a rien appris. Réclamez-le les premières
fois, il deviendra un réflexe.

Comptez trois occurrences par règle avant qu'elle soit mûre. C'est lent, c'est voulu, et c'est ce
qui vous évite un agent rigide qui applique partout ce qui valait une fois.

---

## Checklist

- [ ] La première compétence est écrite : périmètre, hors périmètre, définition du travail bien fait
- [ ] `ai-memory/` est en place, `principles.md` relu et amendé de votre main
- [ ] `capabilities.md` démarre en lecture seule, interdits absolus listés
- [ ] **Le NOYAU est dans le champ injecté au démarrage** (pas seulement dans un fichier du projet)
- [ ] **Le test de l'étape 5 est passé sur une session neuve**
- [ ] Un premier cas réel a été traité, corrigé et consigné
- [ ] Le bloc de fin de session a été produit au moins une fois

Tant que les deux lignes en gras ne sont pas cochées, l'installation n'est pas faite.

---

## Ce qu'il ne faut pas attendre

Le premier jour, l'agent ne sera pas meilleur. Il sera même un peu plus lent, parce qu'il lit un
dossier et qu'il écrit à la fin.

Le gain arrive quand vous cessez de réexpliquer la même chose. Selon la fréquence de la compétence
choisie, ça prend une à trois semaines. Si au bout d'un mois rien n'a changé, le problème est
presque toujours l'un de ces trois : le NOYAU n'est pas réellement injecté, les corrections ne sont
pas expliquées, ou le bloc de fin de session n'est jamais produit.
