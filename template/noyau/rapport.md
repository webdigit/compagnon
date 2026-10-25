# NOYAU, module : le rapport de sortie

> **Module du NOYAU, lu sur déclencheur.** Il vient du gabarit, comme le NOYAU : il ne se modifie
> pas en local (`noyau-local.md` le complète), et une migration le remplace en entier. Ses titres
> et ses points gardent leur numéro : « NOYAU §5bis » renvoie ici. Il se termine par son
> marqueur, comme tout fichier du dossier (§0, point 1).

## 5bis. Le rapport de sortie

Cette section ne s'applique que si `report.md` existe dans ton dossier. Sinon, saute-la : rien ne
manque.

Produis-le à la fin d'un run qui a un livrable : une passe de tri, un planning, une revue.
Pas à chaque session : une séance de mise au point de règles ne produit pas de rapport.

1. **Avant d'écrire le nouveau, archive le précédent** tel quel dans
   `_archive/rapports/<AAAA-MM-JJ>-<run>.md`. N'efface jamais (compagnon P5).
2. **Rien dans « Fait » sans vérification effective.** Un accusé d'exécution n'est pas un résultat.
   Vérifie en cherchant l'échec, pas en relisant l'accusé (§0, point 5).
3. **Chaque ligne dit qui l'a validée.** Distingue ce que tu proposes de ce que <OPÉRATEUR> a
   décidé (compagnon P3).
4. **Pointe, ne recopie pas.** L'identifiant du système qui porte la donnée fait foi (compagnon P7).
5. **Remplis `non_couvert`.**
6. **Renseigne `périmé_après`.** `arrêté_le` est l'heure réelle prise à la source (le shell) au
   moment d'écrire, à la minute près. Jamais une estimation.
7. **Aucune règle, aucun reward, aucun score n'entre dans le rapport** (compagnon P12).
8. **Ne classe pas tes items par rapport à d'autres instances.** Donne une échéance et ce que coûte
   le report. Laisse l'arbitrage à qui lit.
9. **Remplis le relevé de l'en-tête** : `gabarit` (la version que déclare `VERSION.md`),
   `coordonné_par` (le nom de la ligne « Coordonné par », ou `aucun`), `relancé_par` (la ligne
   d'en-tête d'une relance, §5sexies, ou `aucun`), `demandes_en_attente` et
   `évaluations_dues` (le registre de `capabilities.md`, tel qu'il est quand tu écris).
   Ce relevé est daté par `arrêté_le`. Il périme avec le rapport. Ce n'est pas une seconde source :
   la mémoire fait foi (compagnon P12, P16).
10. **L'en-tête et les titres sont un contrat, pas un style.** Reprends les clés de l'en-tête du
   gabarit, toutes, avec leurs valeurs permises.
   `statut` prend l'une des valeurs listées, jamais une phrase. Une clé qui ne s'applique pas porte
   `aucun` ou `aucune`. Elle ne disparaît pas. N'ajoute aucune clé absente du gabarit.
   Les titres de section reprennent les mots du gabarit : « En un paragraphe », « Fait » seul,
   « À faire », « En attente d'une décision », « Non couvert ».
   Leurs tableaux gardent ses colonnes, dans son ordre, `#` compris. L'écran et le coordinateur
   cherchent ces mots et lisent les colonnes par leur place (`FORMAT.md`).
   Ce que tu veux dire de plus va dans le corps d'une section, jamais dans une clé ou un titre de
   ton invention.
   **Le gabarit de `report.md`** se lit à l'étiquette que déclare `VERSION.md`, sous
   `template/report.md`, par la route du §6bis, point 3 (`noyau/migration.md`).
   Si ton hôte n'atteint ni le clone ni le web, reprends l'en-tête et les titres du rapport
   précédent, archivé au point 1, s'ils sont conformes à cette liste.
   Écris le rapport dans les deux cas. Si tu n'as pu contrôler ni l'un ni l'autre, dis-le dans
   `non_couvert`.

11. **Ce qui n'a pas été recoupé avec la mémoire n'entre ni dans « Fait », ni dans « À faire », ni
   dans « En attente d'une décision ».**
   Si une lecture de la mémoire a été incomplète, un élément vu dans une source sans rapprochement
   possible va dans le corps de « Non couvert ». Le rapprochement se fait avec l'état, les points
   chauds, le journal et les dépôts.
   Écris-le en constat brut, sans « en retard » ni « urgent » (§5, « Une lecture incomplète »,
   point 4).

Ce qui te vient d'un autre agent, coordinateur compris, se traite au §5sexies.

[fin de rapport.md]
