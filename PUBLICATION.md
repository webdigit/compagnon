# compagnon : règles de publication

> **À qui s'adresse ce fichier.** À qui écrit le gabarit, pas à qui s'en sert. Une instance ne le lit
> jamais, un agent en session non plus : les décisions dont il parle se prennent au moment de
> préparer une version, et personne d'autre ne les prend.
>
> `DOCTRINE.md` dit comment l'agent apprend. Celui-ci dit comment le gabarit s'écrit. Ce sont deux
> métiers, et les mélanger a déjà coûté : trois de ces règles vivaient dans `MIGRATIONS.md`, que
> seules les instances ouvrent.

Ces règles ne sont pas des idées de méthode. Chacune vient d'un défaut réel, daté, qui avait été
publié.

---

## R1. Toute consigne dit à quel moment elle est lue

Avant d'ajouter une consigne au gabarit, écrire à quel instant elle atteint son lecteur. Si la
réponse n'est pas **« au moment où la décision se prend »**, la consigne est décorative : elle sera
juste, et elle ne changera rien.

Le test tient en une question : *qui prend cette décision, et qu'a-t-il sous les yeux à cet
instant ?*

Trois défauts publiés relèvent de ce seul mécanisme, et aucun n'était visible en relisant :

- `_archive/` portait une interdiction et son contraire, dans deux fichiers que la même session lit
  (corrigé en 0.9.0) ;
- les « écarts assumés » vivent dans `VERSION.md`, ouvert seulement en migration, alors que l'écart
  se constate en session ordinaire (corrigé en 0.11.0) ;
- les procédures d'outil étaient renvoyées hors du dossier, donc hors du rituel de session, donc
  jamais relues (corrigé en 0.11.0).

**La nuance qui fait la différence** : « au bon moment » ne veut pas dire « au démarrage ». Charger
une consigne au §0 pour une décision qui se prendra quarante mille jetons plus loin, c'est la placer
au bon endroit et au mauvais instant. Une consigne qui gouverne un geste précis vit **près du
geste** : dans le schéma d'entrée du fichier qu'on écrit, pas dans un bandeau général.

_Posée le 09/09/2026, après le constat d'une instance qui n'avait aucun endroit relu où poser son
mode opératoire._

## R2. Un exemple fictif est une consigne déguisée

C'est le comportement qu'un exemple **montre** qui sera reproduit, pas la règle qu'il illustre. Tout
exemple du gabarit doit donc être exemplaire au sens propre : irréprochable sur ce qu'il fait, pas
seulement sur ce qu'il dit.

_Posée le 09/09/2026, après avoir vu une instance recopier fidèlement un exemple de `mistakes.md` qui
fermait une erreur trop tôt._

## R3. Un gabarit se corrige par ses instances, jamais par relecture de son auteur

Les défauts trouvés jusqu'ici n'étaient visibles ni en écrivant le gabarit ni en le relisant. Tous
sont apparus en le faisant tourner sur du travail réel, souvent chez un lecteur qui ne partageait ni
le contexte ni les intérêts de l'auteur.

Conséquence pratique : une version ne se prépare pas en relisant `template/`. Elle se prépare en
demandant aux instances en service ce qu'elles ont dû contourner.

_Posée le 07/09/2026 (leçon 0.9.0), formalisée le 09/09/2026._

## R4. Une adaptation déclarée par une instance est un signal de défaut, à remonter

Quand une instance note un écart dans ses « écarts assumés », elle ne signale pas son propre
bricolage : elle signale un manque du gabarit, **déjà corrigé et déjà éprouvé sur le terrain**. Il ne
reste qu'à le remonter en amont.

C'est la raison d'être de cette section de `VERSION.md`, et la raison pour laquelle le gabarit doit
rendre sa déclaration facile. Un écart non déclaré est un défaut qu'on ne saura jamais.

_Posée le 07/09/2026 (le préfixe « compagnon P7 » de la 0.8.1 vient d'une instance en migration qui
l'avait inventé elle-même), formalisée le 09/09/2026._

## R5. Format d'une ligne de migration : quatre blocs, dans cet ordre

**Ce qui change** · **ce que l'agent fait seul** · **ce que l'opérateur doit faire lui-même** (avec
« rien » écrit noir sur blanc quand c'est rien) · **comment vérifier que c'est fait**.

Le troisième bloc est celui qu'on oublie, et c'est celui qui décide si la migration prend effet : un
NOYAU modifié mais non recollé ne change rien aux sessions. Un agent qui lit une ligne sans ce bloc
n'a aucun moyen de deviner ce qui reste à faire hors du disque.

_Posée le 07/09/2026._

## R6. Le diff de `template/` commande la publication

Avant de publier, comparer le gabarit stérile entre l'ancienne étiquette et la nouvelle :

```
git diff v0.10.0..v0.11.0 -- template/
```

Si `template/` a bougé et que la version n'a pas de ligne de migration qui en rend compte, elle
n'est pas publiable. La prose dit ce que l'auteur a pensé à écrire ; le diff dit ce qui a réellement
changé. Les quatre premières versions publiées sans ligne de migration auraient été arrêtées par ce
contrôle.

_Posée le 27/08/2026._

## R7. Aucun nombre ne se recopie, y compris dans le dépôt

Le numéro de version vit dans `CHANGELOG.md` et dans les étiquettes git. Le nombre de fichiers du
gabarit ne s'écrit nulle part. Un compteur recopié diverge toujours, et le jour où il diverge, plus
personne ne sait lequel croire.

C'est compagnon P7 appliqué au dépôt lui-même. Il a déjà fallu retirer des compteurs de
`operational-state.md` (0.9.0), puis de `learned-rules.md` et `mistakes.md` (0.10.0), puis le
« onze fichiers » du README (0.11.0). Trois fois la même correction : la règle est ici pour qu'il n'y
en ait pas de quatrième.

_Posée le 09/09/2026._

---

## Avant de publier : la liste

1. `git diff <étiquette précédente>..HEAD -- template/` (R6).
2. Chaque changement de `template/` a sa ligne de migration, en quatre blocs (R5).
3. Chaque consigne ajoutée a son moment de lecture, et il coïncide avec sa décision (R1).
4. Chaque exemple fictif touché est exemplaire dans son comportement (R2).
5. Aucun nombre recopié n'est entré dans le dépôt (R7).
6. Le `CHANGELOG.md` porte l'entrée, sa leçon, et le numéro n'est écrit que là.
