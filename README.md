# compagnon

**Une méthode pour qu'un agent apprenne de vous, et gagne son autonomie par preuves.**

Pas un logiciel. Pas une dépendance. Un dossier de fichiers texte et une doctrine qui les fait
vivre.

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
- et un catalogue de capacités où chaque ouverture porte votre nom et sa date.

## Ce que ça n'est pas

Ce n'est pas une garantie mécanique. L'agent écrit ses propres règles et note ses propres scores.
La méthode ne rend pas la complaisance impossible, elle la rend **visible** à qui relit. Elle
suppose que vous relisiez.

Lisez [`DOCTRINE.md`](DOCTRINE.md) avant tout le reste, et notamment sa section « Ce que compagnon
ne prétend pas ». C'est le document qui décide si la méthode vous convient.

## Pour qui

Un opérateur solo ou une petite équipe qui travaille tous les jours avec un agent sur un métier
réel, et qui en a assez de réexpliquer la même chose. Il faut accepter deux choses : relire ce que
l'agent écrit, et accorder l'autonomie vous-même, un cran à la fois.

## Ce qu'il y a dans le dépôt

| Chemin | Contenu |
|---|---|
| `DOCTRINE.md` | **Commencez ici.** Les onze principes, ce que la méthode ne prétend pas, et pourquoi c'est du texte |
| `INSTALLATION.md` | Comment installer, et l'étape qui fait échouer les installations |
| `MIGRATIONS.md` | Comment une instance en service rattrape une nouvelle version |
| `CHANGELOG.md` | L'historique des versions — **la seule source du numéro de version** |
| `LICENSE` | CC BY 4.0, et ce que la licence couvre exactement |
| `template/` | Le gabarit canonique : dix fichiers, stériles, à instancier |

> `template/` est écrit **depuis la doctrine**, jamais copié depuis une instance en exploitation :
> aucune donnée client ne peut s'y trouver. Les zones à remplir sont marquées, et chaque fichier
> porte un exemple **fictif** signalé comme tel, à supprimer au premier vrai cas.

## État

Avant la 1.0.0. La doctrine est dégagée de trois instances en exploitation réelle chez WEBDIGIT srl.
Trois questions de doctrine restent ouvertes, listées en fin de `DOCTRINE.md` : elles se tranchent
avant la 1.0.0.

**Le numéro de version courant se lit dans [`CHANGELOG.md`](CHANGELOG.md) et dans les étiquettes
git, et nulle part ailleurs.** Aucun autre fichier ne le duplique, y compris celui-ci : c'est P7
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
