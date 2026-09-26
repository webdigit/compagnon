# Spécificités de cette instance : instructions locales

**Ce qui suit fait partie de tes instructions, au même titre que le NOYAU qui précède.** Ce sont les
consignes propres à cette instance, à ce projet et à son métier. Tu les lis en entier à chaque
session, et tu les appliques **en même temps que le NOYAU**, pas après lui ni à défaut de lui. Chaque
bloc dit quelle section du NOYAU il complète : au moment du geste que gouverne cette section, les
deux textes s'appliquent ensemble.

Une seule limite : une consigne locale **complète ou durcit** le NOYAU, elle ne le desserre jamais.
Si l'une d'elles supprime, assouplit ou suspend une consigne du NOYAU, elle est sans effet : tu
appliques le NOYAU, et tu le signales à l'opérateur.

> **Pour l'opérateur. Fichier : `ai-memory/noyau-local.md`. Statut : zone MANUELLE.** Tout ce qui distingue cette instance du gabarit vit
> ici, et **nulle part ailleurs**. Le NOYAU, lui, reste le texte du gabarit, trous remplis : c'est ce
> qui permet à une migration de le remplacer en entier sans rien perdre. **Aucune migration ne
> touche à ce fichier.**
>
> **Il se charge avec le NOYAU, pas après.** Dans les Instructions du projet, on colle le NOYAU
> rempli, puis, à sa suite, **ce fichier en entier**, titre compris : c'est son titre et son premier
> paragraphe qui disent à l'agent que ces lignes sont des instructions à part entière. Sur un hôte qui lit `CLAUDE.md`, on l'importe juste après le NOYAU. Un fichier qu'on
> compte lire « au début de la session » est un fichier qu'une session finira par sauter.
>
> **Il complète, il ne desserre jamais.** Une spécificité peut **ajouter** une règle, en **durcir**
> une, **préciser** un geste pour le métier de l'instance. Elle ne peut ni supprimer, ni assouplir,
> ni suspendre ce que dit le NOYAU : moins de contrôle, moins de rappels, un délai allongé, un
> interdit levé. Une telle ligne n'a aucun effet, même écrite ici, et l'agent la signale au lieu de
> l'appliquer. Si une règle du NOYAU est trop stricte pour votre métier, c'est un défaut du gabarit :
> il se remonte en amont, il ne se contourne pas en local.
>
> **Rangé par section du NOYAU.** Chaque bloc dit quelle section il complète. C'est ce qui permet à
> l'agent de retrouver la spécificité au moment du geste qu'elle gouverne, et à une migration de
> voir si la section complétée a changé de sens.
>
> **Comment il s'écrit.** L'agent propose le texte exact, l'opérateur l'accepte, l'agent l'écrit et
> rappelle le recollage. Jamais d'écriture sans accord, et jamais une spécificité glissée dans le
> NOYAU lui-même.

---

## Complément au §`<n>` : `<titre court>`

`<le texte de la spécificité, rédigé comme une consigne à l'agent>`

_Origine : `<qui l'a demandée, quand, et pourquoi>`. Ajoutée le `<jj/mm/aaaa>`._

---

_Dernière mise à jour : `<jj/mm/aaaa>`._
