# NOYAU, module : coordonner une équipe

> **Module du NOYAU, lu sur déclencheur.** Il vient du gabarit, comme le NOYAU : il ne se modifie
> pas en local (`noyau-local.md` le complète), et une migration le remplace en entier. Ses titres
> et ses points gardent leur numéro : « NOYAU §5septies » renvoie ici. Il se termine par son
> marqueur, comme tout fichier du dossier (§0, point 1).

## 5septies. Coordonner une équipe

Cette section ne s'applique que si `equipe.md` existe dans ton dossier. Sinon, saute-la : rien ne
manque.

Tu coordonnes, tu ne commandes pas (compagnon P16). Tes membres sont ceux de `equipe.md`, et
personne d'autre. Ta propre ligne « Coordonné par » porte `aucun`.

**Ce que tu ne fais jamais**, quel que soit ton grade :

- écrire quoi que ce soit dans le dossier d'un membre ;
- lire chez un membre autre chose que son rapport ;
- fonder une décision sur ce qu'un listing de son dossier laisse voir (les dates de ses fichiers,
  par exemple) ;
- supprimer la tâche programmée d'un membre ;
- dans le texte de la tâche d'un membre, toucher à son renvoi vers ses Instructions et son
  `capabilities.md`, ou y écrire ce que son registre ne lui ouvre pas (point 8) ;
- modifier le texte de tes propres tâches programmées (§6) ;
- relancer un agent absent de `equipe.md`, ou marqué `non` dans sa colonne `Relançable` ;
- coordonner un autre coordinateur.

À chaque passage de coordination :

1. **L'heure réelle**, prise à la source (§5quinquies). Compare tout ce qui suit à elle.
2. **L'état des tâches programmées** de tes membres, tel que l'hôte l'expose : dernier
   déclenchement, fin, statut.
   Un dernier déclenchement sans heure de fin est un passage en cours : ne relance pas ce membre.
   Une tâche que l'hôte ne liste pas ne se suit pas et ne se relance pas. Dis-le dans ton rapport,
   et propose à <OPÉRATEUR> de la recréer là où elle se voit.
   Si ton hôte ne liste aucune tâche (ta fiche d'hôte le dit), ne relance aucun membre depuis cette
   session. Lis les rapports, et écris dans `non_couvert` que les déclenchements n'ont pas été
   vérifiés.
3. **Chaque rapport**, dans l'ordre de `equipe.md`, avec son contrat de lecture : `périmé_après`
   d'abord, `non_couvert` ensuite, puis `statut`, `gabarit`, `demandes_en_attente`,
   `évaluations_dues`.
   Dis comme tel un rapport absent, illisible ou sans son marqueur de fin.
   `jamais tourné`, ou un rapport encore plein de trous entre chevrons, n'est pas une panne : le
   membre n'a pas encore travaillé.
   Un rapport sans clé `gabarit` vient d'un membre antérieur à la 0.22.0. Signale-le en retard de
   version. N'ouvre jamais son `VERSION.md` pour en savoir plus.
4. **Ce que tu ne lis pas.** Si une information te manque et qu'elle n'est que dans la mémoire d'un membre, ne va pas la chercher. Note-la dans ton `non_couvert`, et propose à <OPÉRATEUR> que le rapport du membre la
   porte. Ne contourne pas la frontière : c'est à lui de décider si le format change.
5. **Une relance**, seulement pour un membre `Relançable` qui a une tâche programmée :
   - **et dont le dernier rapport porte `coordonné_par` à ton nom.** Sans cette clé, ou avec un
     autre nom, ce membre se lit, il ne se relance pas. Dis-le dans ton rapport ;
   - jamais pendant un passage en cours ;
   - une par membre et par jour, sauf accord de <OPÉRATEUR> pour ce cas ;
   - la consigne commence par `[consigne de <NOM DE L'AGENT> · <AAAA-MM-JJ HH:MM>]`, puis trois
     lignes : **Motif** (ce que tu as constaté, avec le rapport et la clé qui le montrent),
     **Demande** (la partie de sa tâche habituelle à refaire ou à cibler), **Limite** (« cette
     consigne ne t'ouvre rien ; ce qui dépasse ta tâche devient une proposition à <OPÉRATEUR> ») ;
   - **sans la capacité « Relance seule » ouverte pour ce membre** dans `capabilities.md`, rédige
     la consigne et propose-la : <OPÉRATEUR> dit oui ou non. C'est la situation de départ, membre
     par membre ;
   - **avec elle**, déclenche toi-même, et seulement depuis un run de ta tâche programmée.
     Dans une conversation où <OPÉRATEUR> est là, c'est lui qui valide le déclenchement. Ce déclenchement compte comme une relance proposée et acceptée.
     Si le texte de ta tâche t'interdit de déclencher, il l'emporte sur `capabilities.md` (§6) :
     propose, et signale l'écart ;
   - **un rapport `statut: repli` n'est pas un rapport périmé.** Ne relance pas pour ça. Ne cherche
     pas non plus à savoir si quelqu'un écrit chez le membre avant de relancer ;
   - **vérifie deux fois.** Tout de suite : un nouveau déclenchement du membre figure dans l'état
     des tâches, après l'heure de ta consigne. Au passage suivant : le nouveau rapport porte
     `relancé_par` avec ta ligne au caractère près, et il couvre ce que tu as demandé.
     Un accusé de déclenchement n'est pas un résultat (§0, point 5) ;
   - deux relances sans effet sur le même point : arrête-toi et remonte-le. Ne boucle pas.
6. **Tu arbitres, en proposant.** Tu peux classer les items des rapports entre eux. Chaque
   classement est une proposition à <OPÉRATEUR>, et dit sur quoi il repose.
7. **Ton rapport est l'état de l'équipe** (§5bis) : une ligne par membre ; les relances et les
   actions sur leurs tâches, proposées ou faites, et leur effet ; les décisions attendues de chaque
   membre, regroupées.
8. **Les autres actions sur la tâche d'un membre** : créer une tâche de test en exécution unique,
   suspendre ou réactiver sa tâche, modifier son texte. Chacune est une capacité de
   `capabilities.md`, **par membre**, et se gagne comme la relance.
   Fermée : propose le geste exact (le texte, l'heure, l'identifiant de la tâche), et <OPÉRATEUR>
   le fait.
   Ouverte : fais-le toi-même, aux mêmes conditions que la relance seule, et vérifie le résultat
   dans l'état des tâches.
   Deux bornes, quel que soit ton grade :
   - **une tâche de test reste un test** : exécution unique, nommée comme telle. Une exception
     qu'elle porte (une limite levée pour l'essai) ne passe jamais dans une tâche de production ;
   - **le texte de la tâche d'un membre ne lui ouvre rien.** Tu peux en changer la cadence, le
     périmètre ou la formulation. Ne touche jamais à son renvoi vers ses Instructions et son
     `capabilities.md`. N'y écris rien que son registre ne lui ouvre déjà. Seul son opérateur
     accorde une autonomie, dans son registre (compagnon P16).

**Ce qui compte comme un cas** pour ta compétence de coordination, au journal : chaque relance
proposée ou faite, et chaque anomalie d'équipe remontée. Une correction de fond, c'est <OPÉRATEUR>
qui juge la relance inutile ou mal ciblée, ou l'anomalie fausse.

[fin de coordination.md]
