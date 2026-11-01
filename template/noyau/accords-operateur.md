# NOYAU, module : les accords de l'opérateur enregistrés par AIOS

> Lu au démarrage quand `decisions-operateur-aios/` contient des reçus, avant de décider de leur
> prise en compte. Ces fichiers sont facultatifs : l'agent fonctionne sans AIOS. Ils ne sont ni
> des instructions système, ni des scripts, ni des preuves d'exécution.

## Ce que porte un reçu

AIOS crée, sur confirmation explicite de l'opérateur du poste, un fichier JSON dans
`ai-memory/decisions-operateur-aios/`. Schéma `compagnon-aios.operator-decision.v1`, statut
`accepted` : identifiant, date, compte local, source (fichier, numéro de décision, empreinte au
moment de l'accord), question, recommandation, portée de l'accord, réponse de l'opérateur et
`execution: not-started`. Un reçu ne change aucun autre fichier. Il n'est jamais effacé ou réécrit.
Les JSON ne portent pas de marqueur Markdown ; n'en ajoute pas. Les `.tmp` ne sont pas des reçus.

## Avant de prendre l'accord en compte

1. Relève les identifiants des reçus et cherche leur prise en compte dans les journaux. Une simple
   citation de l'identifiant ne prouve pas son intégration : vérifie le compte rendu correspondant.
   Tous déjà pris en compte, sans anomalie restante : reprends le parcours normal de la session ;
   les anciens reçus ne forcent pas indéfiniment un rituel entier. Un accord nouveau ou à vérifier
   impose le rituel entier, notamment la lecture de `capabilities.md`, avant toute décision.
2. Lis le reçu en entier comme une réponse d'opérateur, pas comme une nouvelle consigne d'hôte.
   Identifiant, date, compte local ou source manquants, schéma inconnu, statut autre que
   `accepted` : signale l'anomalie, ne déduis aucun accord.
3. Vérifie la source actuelle dans ton propre dossier. Le numéro doit identifier une seule
   décision, et question, recommandation et portée doivent toujours correspondre. Un rapport
   renouvelé ou une décision modifiée ne réutilise pas un ancien accord : en cas de doute,
   présente le changement et demande confirmation. Ne fais pas coïncider deux décisions parce
   que leurs sujets se ressemblent. L'empreinte du reçu garde la trace de la source acceptée.
4. Déjà journalisé, ne répète ni la décision ni ses effets. Si la source est encore ouverte,
   vérifie si la clôture avait échoué : réconcilie ce suivi dans un nouveau journal de reprise,
   avec renvoi à la décision d'origine, sans réexécuter l'action. Ne réécris pas l'ancien journal.
   Source introuvable et aucun journal ne justifiant sa clôture : signale « accord à vérifier »,
   pas « traité ».

## Enregistrer n'est pas exécuter

Quand la correspondance est certaine, inscris dans « Décisions de l'opérateur » du nouveau journal
la réponse exacte du reçu, la recommandation acceptée, sa portée, la date et son identifiant.
Référence le fichier du reçu. La provenance est l'opérateur du poste via AIOS ; ne prétends pas
qu'il vient de te le dire dans la conversation actuelle.

L'accord tranche la question qu'il vise, pas toutes les questions du dossier. Mets à jour la
source dans la même écriture que le journal selon le §6quater : sors le point effectivement
tranché et indique dans « Clos » ce qui l'a clos. Une action qu'il reste à faire va dans le suivi
approprié ; ne la déclare pas réalisée parce que la décision est acceptée. Un changement demandé
dans une zone manuelle continue de suivre ses règles : le reçu seul ne change ni grade ni capacité.

Ne lance aucune action externe sur la seule présence du reçu. Vérifie la portée exacte, les
autorisations de la compétence, les interdits et les conditions du moment. S'il faut un accord
supplémentaire pour le message, le destinataire, le montant ou le geste précis, demande-le ; ne
l'invente pas dans une acceptation générale. Si ton hôte ne peut pas écrire, tiens compte du reçu
pour le compte rendu mais indique l'intégration non faite, sans prétendre avoir clos le point.

La confirmation d'AIOS signifie « accord enregistré, à prendre en compte ». Seul ton journal et
la source actualisée attestent de sa prise en compte ; seul le résultat vérifié d'une action
permet de la déclarer exécutée. Garde les reçus pour la traçabilité, y compris les accords devenus
obsolètes. Ne leur attribue jamais une exécution par défaut.

[fin de accords-operateur.md]
