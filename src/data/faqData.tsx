import React from "react";

export const basesItems = [
  {
    question: "C'est quoi exactement \"Artemis 2\" ?",
    answer: "C'est la première mission habitée du programme Artemis. Après le succès d'Artemis 1 (qui était un vol de test sans personne à bord en 2022), cette mission va envoyer quatre astronautes faire le tour de la Lune.",
  },
  {
    question: "Est-ce que Artémis I et Artémis II ont exactement la même trajectoire mais avec des humains dedans ?",
    answer: "Les trajectoires sont différentes vu que lors d'Artémis I la capsule a fait une orbite autour de la lune avant de revenir sur Terre alors que lors de cette mission (Artémis II), il y a un simple survol de la lune puis un retour sur Terre.",
  },
  {
    question: "Pourquoi l'appelle-t-on \"Artemis\" et quel est le lien avec les missions \"Apollo\" ?",
    answer: "Dans la mythologie grecque, Artémis est la sœur jumelle d'Apollon (Apollo) et la déesse de la Lune. Ce nom symbolise le retour de l'humanité vers la Lune avec une approche moderne et inclusive.",
  },
  {
    question: "C'est quoi Artemis, Orion et Integrity ?",
    answer: "Artemis est le nom du programme, et Artemis II est le nom de cette mission. Orion est le nom du modèle de vaisseau (comme un modèle de bateau par exemple), et Integrity est le nom donné par l'équipage à leur vaisseau.",
  },
  {
    question: "Quel est le but principal de ce voyage ?",
    answer: "L'objectif est de tester tous les systèmes de survie de la capsule Orion avec des humains à bord. C'est une répétition générale pour s'assurer que tout fonctionne parfaitement avant de tenter un atterrissage lors de la mission suivante.",
  },
  {
    question: "Est-ce que les astronautes vont marcher sur la Lune cette fois-ci ?",
    answer: "Non. Ils vont survoler la face cachée de la Lune et revenir vers la Terre. L'atterrissage (marcher sur le sol lunaire) est pour l’instant planifié pour la mission Artemis 4, prévue quelques années plus tard. (sujet à changements, le programme est fortement remanié de mois en mois)",
  },
  {
    question: "Pourquoi font-ils simplement le tour de la Lune au lieu de s'y poser directement ?",
    answer: "C'est une question de sécurité. Avant de risquer un atterrissage complexe, la NASA veut vérifier que le vaisseau Orion est capable de maintenir un équipage en vie dans l'espace lointain et de revenir en toute sécurité.",
  },
  {
    question: "Combien coûte le programme Artemis ?",
    answer: "Pour répondre à cette question il faut distinguer le coût du matériel (la fusée, les combinaisons, le carburant) des coûts connexes comme le personnel. Pour simplifier, le NASA Office of Inspector General - un organe américain officiel - évalue actuellement le coût total du programme comme étant un peu supérieur à 90 milliards de dollars fin 2025. Pour donner une idée de ce que couvre cette somme, une fusée (capsule + lanceur) demande à elle seule 2 à 2,5 milliards de dollars pour être fabriquée, auxquels il faut ajouter environ 1,5 milliards de dollars supplémentaires pour conduire la mission en elle-même, soit un coût total de plus ou moins 4 milliards de dollars par lancement. Il convient de rappeler que c’est un projet de longue haleine et la NASA n’est pas bénéficiaire d’une aussi grosse partie du budget américain (moins de 1%) comparé à la NASA du temps d’Apollo (plus de 1%), même si le budget américain à évoluer entre-temps.",
  },
  {
    question: "Que se passe-t-il s'il y a une panne moteur derrière la Lune ?",
    answer: "La trajectoire d'Artemis 2 est appelée \"trajectoire de retour libre\". Cela signifie que la gravité de la Lune ramènera naturellement la capsule vers la Terre, même si le moteur principal tombe en panne.",
  },
  {
    question: "Pourquoi la vitesse diminue sur le trajet vers la Lune ?",
    answer: "Le vaisseau est attiré par la gravité terrestre, et ralentit petit à petit, jusqu'à ce qu'il s'approche suffisamment de la Lune pour que celle-ci l'attire plus que la Terre : le vaisseau va alors accélérer à nouveau, passer derrière la lune, et on aura ensuite le phénomène inverse sur le trajet retour. Attention cependant : la télémétrie transmise par la NASA donne la vitesse par rapport à la Terre, et non pas par rapport à la Lune, qui se déplace elle aussi avec une vitesse. On ne verra donc pas nécessairement la vitesse augmenter sur la télémétrie, même si par rapport à la Lune, le vaisseau accélère.",
  },
  {
    question: "Artemis 2 va-t-il battre le record de l'humain le plus loin de la Terre établi par Apollo 13 ? De combien ?",
    answer: "Oui ! Le record sera de toute façon battu, mais on ne sait pas exactement de combien. Ce sera établi avec certitude après la troisième et dernière manœuvre de correction de trajectoire avant d'atteindre la Lune.",
  },
  {
    question: "Pourquoi ils ne remettent pas un coup de moteur pour y arriver plus vite ?",
    answer: "Même si un voyage plus rapide serait possible, il consommerait plus de carburant et nécessiterait de freiner à l'arrivée, ce qui serait dangereux en cas de problème moteur. Dans tous les cas, même si le choix avait été fait d'aller plus vite, ils auraient seulement fait une poussée initiale plus forte. Des poussées subséquentes seraient inhérentement moins efficientes.",
  },
  {
    question: "Quels sont les plus grands risques de la mission ? Est-il possible que ça se passe mal ?",
    answer: "Le plus grand risque était le décollage, et celui-ci s'est déroulé parfaitement ! Concernant les problèmes qu'ils pourraient rencontrer, tous les systèmes du vaisseau sont redondants (en double voire en triple), ce qui permet de pallier toute défaillance technique. C'est d'ailleurs grâce à cela que l'équipage d'Apollo 13 a pu rentrer sain et sauf ! En plus de la redondance, le vaisseau est sur une trajectoire de retour libre : même si tous les moteurs tombent en panne, il reviendra sur Terre. Enfin, il reste une dernière phase critique : la rentrée atmosphérique. Le vaisseau sera protégé par un bouclier thermique, puis la descente se fera sous parachutes, pour amerrir dans l'océan Pacifique.",
  },
  {
    question: "Les missions Apollo avaient mis un jour de moins à atteindre la Lune. Pourquoi cette capsule plus moderne est \"plus lente\" ?",
    answer: "La durée du trajet (optimisé pour une consommation minimale de carburant) est déterminée par les lois de la mécanique céleste. Les temps de trajet entre les missions Apollo et Artemis 2 sont sensiblement les mêmes. Cependant, Artemis 2 a commencé sa mission par faire une orbite de 24h autour de la Terre pour (entre autres) vérifier que tout les systèmes critiques soient opérationnels avant de se lancer dans 10 jours d'aller-retour vers la lune.",
  },
  {
    question: "Dangereux la ceinture de Van Allen pour les astronautes ?",
    answer: "Si on la traverse, on risque des irradiations. Mais pas de risque pour les astronautes de l'ISS qui vole bien plus bas. Et pas de danger pour les astronautes d'Artemis car on la contourne vu que c'est une ceinture et pas une sphère.",
  },
  {
    question: "Est-ce qu'ils vont ramener des cailloux lunaires ?",
    answer: "Non, car ils n'atterrissent pas. Cependant, ils prendront des milliers de photos et de vidéos haute résolution pour aider les scientifiques à étudier la surface lunaire.",
  },
  {
    question: "Quels sont les problèmes rencontrés depuis le début de la mission ?",
    answer: (
      <div className="space-y-2">
        <p>Aucun problème majeur ne s'est produit depuis le début de la mission. Globalement, le module de service (européen) est de très bonne qualité selon la NASA (mieux qu'espéré). Quelques petits soucis ont été constatés :</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Après le décollage le 02 avril, au moment d'ouvrir les cylindres d'eau, la vanne principale ne s'est pas ouverte. Ce problème a été résolu à distance par Houston en réinitialisant la vanne d'ouverture. Au cas où, les astronautes ont rempli des poches d'eau.</li>
          <li>L'évacuation des toilettes n'a pas fonctionné de suite car la buse d'évacuation était bouchée par les éjectats qui se cristallisaient. La zone d'évacuation a été tournée vers le soleil, ce qui a permis de déboucher la buse.</li>
          <li>Il y a eu une petite odeur de brûlé dans la capsule, qui n’était due qu’à un surplus d'hydrogène dans la capsule.</li>
          <li>L'humidité à l'intérieur de la capsule n'était pas stabilisée, les astronautes ont utilisé des serviettes mouillés pour compenser le manque d'humidité.</li>
        </ul>
      </div>
    ),
  },
  {
    question: "Quelles agences sont impliquées dans la mission ?",
    answer: (
      <div className="space-y-2">
        <p>Les astronautes sont de la NASA (USA) et de la CSA (Canada). Bien que le programme soit administré par la NASA, d'autres agences sont impliquées telles que la CSA et l'ESA. Divers prestataires externes ont développé des parties du vaisseau : Lockheed Martin (capsule), Airbus (module de service), Boeing (premier étage).</p>
        <p>Blue Origin et SpaceX sont mandatés pour un atterrisseur lunaire (encore à l'étape de conception, avec 5 ans de retard) pour une future mission, mais n'ont pas d'équipement sur Artemis 2.</p>
      </div>
    ),
  },
  {
    question: "Est-ce qu'on peut voir Artemis depuis la Terre ?",
    answer: "Non, même avec un télescope.",
  },
  {
    question: "Pourquoi leur tenue est-elle orange ?",
    answer: "Pour qu'on puisse les repérer facilement lorsqu'ils atterrissent dans l'eau. Ils possèdent également des petites bouées pour leur sécurité et peuvent activer leur petit radeau personnel. Nous avons pu les voir lors de leur entrée dans la capsule Orion avant le décollage.\nCette tenue n'est utilisée que pour des moments critique.",
  },
  {
    question: "Pourquoi la capsule n'a pas visé la lune dès le départ ?",
    answer: (
      <div className="space-y-2">
        <p>Il y a plusieurs raisons. Comme il s'agit d'une mission de test, la première étape fut de faire deux orbites autour de la Terre : une première à \"basse\" altitude, puis une seconde en montant jusqu'à 70 000 km après avoir réalisé une première poussée. Celle-ci a permis d'une part de prendre de la vitesse, et d'autre part d'avoir une journée pour réaliser différents tests et s'assurer que tout fonctionne correctement avant de partir vers la Lune. L'injection translunaire a ensuite eu lieu lorsque le vaisseau s'est retrouvé au point le plus bas de cette seconde orbite, point où l'accélération est la plus efficace (effet Oberth).</p>
        <p>Mais même au moment de cette poussée, le vaisseau ne pointait pas droit vers la Lune ! Pourquoi ? Et bien pour deux raisons principalement : en mécanique orbitale, quand on accélère, on modifie la trajectoire de l'autre côté de l'orbite ; il faut que l'on s'assure que le point d'arrivée de la trajectoire soit non pas là où la lune se trouve, mais là où elle sera lorsqu'on y arrivera ! Et oui, la Lune aussi est en orbite autour de la Terre et se déplace !</p>
      </div>
    ),
  },
  {
    question: "Comment la capsule se localise ?",
    answer: (
      <ul className="list-disc list-inside space-y-1 text-muted-foreground">
        <li>Elle est équipée d'une centrale inertielle. Il s'agit d'un ensemble de capteurs qui mesurent les accélérations dans toutes les directions (comme sur un smartphone, mais en beaucoup plus précis), et qui, en connaissant son point de départ, est capable de dire où la capsule se trouve.</li>
        <li>Par GPS : à nouveau comme sur un smartphone, mais à cette distance la précision n'est pas très bonne. Mais il n'est pas nécessaire d'avoir la même précision que sur Terre pour un vol spatial de ce type.</li>
        <li>Par... les maths ! Et oui, la mécanique orbitale est quelque chose de très bien maîtrisé, et on est capable de calculer avec précision la position de la capsule à un instant donné, juste en connaissant sa vitesse à un autre endroit et un autre instant.</li>
      </ul>
    ),
  },
  {
    question: "Comment va se passer la coupure de communication avec Orion ?",
    answer: "Quand Orion passera derrière la Lune, la capsule sera coupée des communications avec Houston pour la raison suivante : il y aura la Lune entre elle et la Terre. Les communications se faisant par ondes radios, il est en effet nécessaire d’avoir une ligne de vue. Il y aura donc approximativement 40 minutes, voire 1h, de coupure.",
  },
  {
    question: "Pourquoi les panneaux solaires sont-ils mobiles ?",
    answer: (
      <div className="space-y-2">
        <p>Les panneaux sont mobiles sur la capsule pour 2 raisons principales :</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>S'orienter au mieux pour capter un maximum de soleil et créer plus d'énergie électrique pour maintenir l'énergie de la capsule.</li>
          <li>Permettre le repliement des panneaux contre le module de service lors des poussées, afin de réduire les contraintes mécaniques qu’ils doivent supporter.</li>
        </ul>
        <p>Cette mobilité a aussi permis de faire un selfie des astronautes en orientant les caméras fixées sur le bout des panneaux vers la capsule.</p>
      </div>
    ),
  },
  {
    question: "Les astronautes ressentent-ils les changements de vitesse ?",
    answer: "Uniquement lors des poussées. Le reste du temps, le vaisseau et les astronautes sont en chute libre exactement de la même manière. Ils sont donc tout le temps en apesanteur et ne ressentent aucune force, même lorsque la trajectoire est courbée. Lors des poussées, une force s'applique et le vaisseau n'est donc plus en chute libre : les astronautes peuvent donc ressentir cette force. En dehors du décollage et de la rentrée atmosphérique (où la capsule est fortement freinée par l'atmosphère), les forces ne sont pas très intenses. Les astronautes ne sont donc pas écrasés dans leur siège lors des manœuvres dans l'espace.",
  },
  {
    question: "Comment la capsule fait-elle pour s'orienter dans l'espace sans support d'air ?",
    answer: "La capsule s'oriente, accélère et décélère grâce à ses moteurs. Pour créer une 'poussée' il n'y a pas besoin d'air, il s'agit d'une idée reçue propagée par les médias non spécialisés. Les jets de gaz effectués par les moteurs créent, sous l'effet de l'action d'expulsion du gaz, une réaction de la capsule qui part alors dans le sens opposé à celui de l'expulsion des gaz. Il s'agit simplement du principe d'Action/Réaction (autrement dit, la 3ème loi de Newton).",
  },
  {
    question: "Y a-t-il un risque que le vaisseau Orion soit endommagé par des météorites ?",
    answer: (
      <div className="space-y-2">
        <p>Oui, il existe un risque, mais il est faible et bien maîtrisé.</p>
        <p>Le vaisseau Orion est conçu avec des boucliers de protection multicouches capables d'absorber ou de disperser l'énergie de ces impacts. Les grosses météorites, elles, sont extrêmement rares, et les agences comme la NASA surveillent en permanence l'environnement spatial pour éviter les trajectoires dangereuses.</p>
      </div>
    ),
  },
  {
    question: "Comment la température de la capsule est-elle gérée par rapport aux missions Apollo ? Y a-t-il un « mode barbecue » pour la mission Artemis II ?",
    answer: "Lors des missions Apollo, les astronautes utilisaient une manœuvre appelée « Barbecue Roll » (ou Passive Thermal Control). Le vaisseau spatial tournait lentement sur lui-même afin de répartir uniformément la chaleur du Soleil sur toute sa surface, évitant ainsi qu'un côté surchauffe tandis que l'autre gèle. Pour la mission Artemis II, la capsule Orion n'utilise pas ce mode de rotation continue. Elle dispose d'un système de contrôle thermique beaucoup plus moderne, combinant isolation avancée, circulation de fluide thermique et radiateurs. Cependant, Orion peut toujours effectuer des ajustements d'orientation si nécessaire pour optimiser l'exposition au Soleil et maintenir une température stable à bord.",
  },
];

export const vieABordItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Comment font-ils pour manger, dormir et se laver ?",
    answer: "Ils mangent des aliments lyophilisés ou sous vide. Pour dormir, ils s'attachent dans des sacs de couchage pour ne pas flotter. Pour l'hygiène, ils utilisent des lingettes humides et du shampoing sans rinçage, car l'eau ne s'écoule pas en apesanteur.",
  },
  {
    question: "Quelle est la taille de la capsule ?",
    answer: (
      <div className="space-y-2">
        <p>Il faut distinguer deux mesures :</p>
        <p>Le <strong className="text-foreground/80">volume intérieur pressurisé total</strong> est d'environ 20 m³, mais il est en grande partie rempli par les sièges, les écrans et les équipements.</p>
        <p>Le <strong className="text-foreground/80">volume habitable</strong> (l'espace libre pour bouger) n'est que de 9 m³. C'est l'équivalent d'une petite salle de bain pour quatre adultes qui doivent y vivre 24h/24 pendant 10 jours. Les astronautes étant en apesanteur, c'est un volume confortable étant données les contraintes du voyage spatial.</p>
        <p>En comparaison, pour les missions Apollo, le volume total pressurisé était de 10.4 m³, pour 5.9 m³ habitables. Soit pour Artemis un volume total deux fois plus grand, et 12.5% d'espace en plus par astronaute !</p>
      </div>
    ),
  },
  {
    question: "Quelle température fait-il à bord ?",
    answer: "La température est réglable, l'équipage aime la température de 24/25°C actuellement.",
  },
  {
    question: "Comment font-ils leurs besoins ?",
    answer: "Ils utilisent un WC spécial spécialement conçu pour l'espace. Les différents « déchets » sont collectés : les liquides sont éjectés régulièrement dans l'espace (visible sur le live !), tandis que les déchets solides sont stockés afin d'être évacués une fois rentré sur Terre.",
  },
  {
    question: "Ils dorment tous en même temps ?",
    answer: "Oui, c'est normal. Jamais dans l'Histoire on ne s'est « relayé » à bord. Les contrôleurs de Houston veillent sur eux et la capsule 24h/24 et peuvent eux-mêmes la piloter à distance si besoin.",
  },
  {
    question: "Sur quel cycle les astronautes dorment ?",
    answer: (
      <div className="space-y-2">
        <p>La mission étant dirigée par la NASA, les astronautes sont calés sur le rythme américain. Ils dorment tous en même temps, pendant que Houston surveille que tout va bien : en cas d'urgence, ils peuvent déclencher les alarmes et réveiller en sursaut les quatre astronautes.</p>
        <p>Quand il est l'heure de se réveiller, la tradition veut que Houston passe une musique à la radio, choisie selon l'occasion par les équipes au sol ou les familles des astronautes. Pour leur premier réveil sur cette mission, la musique était <em>"Green Light"</em> par John Legend — choix de circonstance sachant que ce jour-là a eu lieu la poussée pour partir vers la Lune.</p>
      </div>
    ),
  },
  {
    question: "Comment les astronautes bougent/se dégourdissent ?",
    answer: "Pour Artemis, il y a une sorte de rameur que les astronautes utilisent pour faire 30 min de sport par jour. Pour ce qui est de l'ISS, c'est 2h30 de sport par jour en guise de comparaison.",
  },
  {
    question: "Pourquoi les sièges ne sont-ils pas visibles ?",
    answer: "Les sièges des astronautes dans la capsule sont repliables tout comme les écrans de commande afin de laisser plus de place aux astronautes pour se déplacer lorsqu'ils ne doivent pas être assis ou s'attacher.",
  },
  {
    question: "Pourquoi fait-il sombre dans la capsule ?",
    answer: "Lorsque les astronautes doivent faire des observations scientifiques, il est prévu que les lumière dans la capsule soient éteintes avant les observations c'est pour laisser le temps à leurs yeux de s'habituer et pendant les observations c'est pour éviter que des reflets viennent polluer les observations. Pour se repérer un minimum ils peuvent allumer des lumières vertes/rouges comme pour les engins militaires.",
  },
  {
    question: "Pourquoi les combinaisons sont oranges ? Pourquoi elles ne sont pas portées tout le temps ?",
    answer: "Les combinaisons servent à protéger temporairement les astronautes d'une potentielle décompression pendant le décollage et l'amerrissage. Elle n'est donc normalement pas portée en orbite. La couleur orange permet de faciliter le repérage des astronautes par les équipes chargées de les retrouver en mer à la fin de la mission ou dans le cas d'une interruption de mission d'urgence au décollage.",
  },
  {
    question: "Comment les astronautes font-ils leurs besoins dans les combinaisons ?",
    answer: "Pendant qu'ils sont dans leur combinaisons, les astronautes portent des couches.",
  },
];

export const imagesItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Pourquoi il ne se passe rien actuellement en regardant le live ?",
    answer: "Le spatial demande beaucoup de temps et les distances sont énormes entre les astres. Le principal de la mission est de dérouler les checklists et d'effectuer les objectifs scientifiques puis de se reposer. Les productions cinématographiques donnent l'impression que tout se fait instantanément alors que le réel est bien plus lent pour des raisons de sécurité. Profitez de ces temps de transfert pour admirer les images et prendre du temps.",
  },
  {
    question: "Pourquoi je ne vois pas d'étoiles ?",
    answer: "Le Soleil illumine ce que filme la caméra. Tout comme il est impossible de filmer les étoiles la nuit sous un lampadaire, la caméra d'Orion ne \"perçoit\" pas les étoiles.",
  },
  {
    question: "Pourquoi parfois on ne voit ni la Terre, ni la Lune ?",
    answer: "L'espace est immense et totalement noir. Si la caméra n'est pas pointée exactement vers la Terre ou la Lune, on ne voit que le vide. C'est comme être en mer la nuit : si vous ne pointez pas votre lampe vers un bateau ou la côte, vous ne voyez que du noir.",
  },
  {
    question: "Pourquoi l'image tremble ?",
    answer: "La caméra est fixée à l'extrémité d'un panneau solaire (amovible) sensible aux mouvements résiduels des astronautes dans la capsule.",
  },
  {
    question: "Pourquoi la capsule ne pointe pas toujours vers l'avant ?",
    answer: "Vu que le trajet est fait moteur éteint et qu'il n'y a pas d'air, une fois lancée sur sa trajectoire la capsule peut être dans n'importe quelle orientation. Elle est régulièrement réorientée pour filmer différentes choses ou choisir quelle partie du vaisseau est exposée au Soleil.",
  },
  {
    question: "Pourquoi on dirait qu'on n'avance pas ?",
    answer: "Car la capsule est très loin de tout ! Comme sur un paquebot loin des côtes, en regardant uniquement l'horizon on n'a pas l'impression d'avancer. Sans mer, nuage ou vent, on ne perçoit pas de mouvement.",
  },
  {
    question: "Est-ce une image ou un live ?",
    answer: "C'est un live en direct diffusé par la NASA. Néanmoins des coupures ou pertes de communications peuvent avoir lieu.",
  },
  {
    question: "Pourquoi n'y a-t-il pas de belles images de la Terre/Lune ?",
    answer: "C'est la NASA qui choisit toutes les images qu'elle veut bien diffuser. Toutes les images et vidéos prises pendant la mission sont enregistrées en 4K dans la capsule et seront certainement rendues publiques après la fin de la mission.",
  },
  {
    question: "Pourquoi les images mettent-elles du temps à nous arriver ?",
    answer: "La capsule se trouve loin de la Terre. Même à la vitesse de la lumière, les signaux mettent un peu plus d'une seconde pour arriver. La priorité sur la bande passante est réservée aux données les plus importantes : les communications et les valeurs des milliers de capteurs qui équipent la capsule et le module de service.",
  },
  {
    question: "Qui filme la capsule de l'extérieur ?",
    answer: "C'est une caméra placée au bout d'un panneau solaire à l'arrière du module de service européen. C'est une caméra grand angle donc l'image est déformée sur les bords.",
  },
  {
    question: "Pourquoi l'image est bleue ?",
    answer: "Cela signifie qu'il y a une perte de communication vidéo (pas audio ni données). C'est tout à fait normal. La priorité sur la bande passante est réservée aux données les plus importantes.",
  },
  {
    question: "Combien y a-t-il de caméras au total ?",
    answer: "32 caméras et dispositifs optiques au total, dont 15 fixées sur le vaisseau et 17 caméras portatives utilisées par l'équipage (en comptant celles de la fusée, larguées depuis le décollage).",
  },
  {
    question: "Quelles sont les caméras portatives utilisées par l'équipage ?",
    answer: (
      <div className="space-y-2">
        <p>Deux <strong className="text-foreground/80">Nikon D5</strong> (reflex numérique professionnel) équipés d'objectifs grand-angle et longue portée. Choisi pour sa haute plage dynamique, sa résistance aux radiations et sa plage ISO jusqu'à 3 280 000.</p>
        <p>Un <strong className="text-foreground/80">Nikon Z9</strong> (hybride) — une première pour ce modèle dans l'espace.</p>
        <p>Des <strong className="text-foreground/80">GoPro portatives</strong> pour un documentaire National Geographic intitulé <em>Return to the Moon</em>. Leur contenu ne sera pas transmis en direct mais ramené après l'amerrissage.</p>
      </div>
    ),
  },
  {
    question: "Quelles sont les caméras fixes extérieures ?",
    answer: "Des GoPros modifiées sont fixées à l'extérieur du vaisseau, notamment sur les panneaux solaires, pour filmer le vaisseau, la Terre et la Lune. D'autres caméras fixes intérieures et extérieures assurent la surveillance de l'équipage et le suivi des phases critiques comme le déploiement des panneaux solaires, la séparation des modules et les inspections du vaisseau.",
  },
  {
    question: "Comment les images sont-elles transmises sur Terre ?",
    answer: "Le système de communication laser O2O transmet des vidéos 4K depuis les caméras d'Orion à un débit pouvant atteindre 260 mégabits par seconde.",
  },
  {
    question: "Pourquoi est-ce qu'on entend un bruit blanc pendant que personne ne parle ?",
    answer: "Le bruit blanc vient de la non-communication entre les astronautes et le mission control de Houston. On ne les entend pas quand ils parlent entre eux.",
  },
  {
    question: "Qui parle à la radio ?",
    answer: "On entend les communications entre les astronautes et CAPCOM (à Houston). En général, c'est Jenni Gibbons (également astronaute, et elle aurait remplacé Jeremy Hansen en cas de problème) qui parle aux astronautes depuis le sol. On peut parfois la voir sur le live, derrière le panneau CAPCOM.",
  },
  {
    question: "Pourquoi on entend \"Copy\" dans les transmissions ?",
    answer: "\"Copy\" veut tout simplement dire \"bien reçu\".",
  },
  {
    question: "Pourquoi les distances sont-elles en miles ?",
    answer: (
      <div className="space-y-2">
        <p>Comme les données proviennent de la NASA (agence américaine), elles sont communiquées au public en utilisant le système impérial. On entend aussi parfois des valeurs en psi.</p>
        <p className="font-mono text-xs bg-secondary/50 p-2 rounded">1 mile = 1.609 km · 1 bar = 14.5 psi = pression au niveau du sol terrestre</p>
      </div>
    ),
  },
  {
    question: "Pourquoi on dit \"Houston\" ?",
    answer: "Parce que c'est ici à Houston (Texas) que se trouve le centre de commande de mission spatial, le \"Lyndon B. Johnson Space Center\". On y retrouve notamment le CAPCOM et d'autres techniciens/ingénieurs qui surveillent le bon déroulement de la mission.",
  },
  {
    question: "Pourquoi certaines photos de la Terre sont-elles beaucoup plus sombres que celles d'Apollo ?",
    answer: (
      <div className="space-y-2">
        <p>Dû à la position des astres actuelle, le début du voyage vers la Lune s'est déroulé dans l'ombre de la Terre. La face visible par l'équipage, et donc celle sur les photos, est le côté \"nuit\" de la Terre !</p>
        <p>Et oui, c'est surprenant, mais il s'agit bien de photos prises de nuit, avec le Soleil derrière la Terre. Plusieurs éléments permettent de distinguer notre planète sur ces clichés : un temps d'exposition élevé, un réglage ISO très élevé (d'où les artefacts numériques), et surtout une source de lumière. Mais laquelle puisque le Soleil est derrière la Terre ? Et bien... La Pleine Lune ! Qui reflète la lumière du Soleil et permet d'apporter une luminosité suffisante pour ces clichés.</p>
        <p>On peut ainsi distinguer sur cette photo les aurores boréales aux deux pôles, l'atmosphère éclairée par le Soleil sur le pourtour, les étoiles autour, et... les éclairages publics dans les zones habitées du globe, puisqu'il y fait nuit !</p>
      </div>
    ),
  },
  {
    question: "Comment s'appelle la frontière jour/nuit sur un astre ? Qu'est-ce que le terminateur ?",
    answer: "Le terminateur est la frontière jour/nuit sur un astre. Hélas rien à voir avec le cinéma. On peut le voir sur la Terre en regardant du côté nuit et voir l'ombre de la nuit progresser.",
  },
  {
    question: "C'est quoi ce soleil fantômatique ?",
    answer: "Une source de lumière comme le soleil ou la lune provoque sur le capteur photo, un reflet sous la forme d'un halo ou d'un cercle lumineux.",
  },
  {
    question: "Pourquoi la Lune paraît plus petite dans l’espace que sur Terre ?",
    answer: "C’est une illusion d’optique. La Lune nous paraît plus grande sur Terre si on la voit 'proche' de points de références comme des arbres, des maisons, etc. Ou alors ce sont des effets de zoom photo-vidéo.",
  },
  {
    question: "L'équipage pourra-t-il photographier les drapeaux et modules américains ?",
    answer: (
      <div className="space-y-2">
        <p>Non, et pour plusieurs raisons. La première étant qu'ils ne passeront pas au-dessus : toutes les missions Apollo se sont posées sur la face visible de la Lune, et le survol se fera du côté de la face cachée.</p>
        <p>Même s'ils passaient au-dessus, ils seraient trop loin et les équipements laissés par Apollo sont trop petits.</p>
        <p>Le Lunar Reconnaissance Orbiter a cependant réalisé une cartographie détaillée de la Lune, et même si on ne peut pas voir les détails, en zoomant sur les sites d'atterrissage des missions Apollo, on peut distinguer la portion du LEM laissée derrière lors du départ et son ombre !</p>
      </div>
    ),
  },
];

export const diversItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Quelle est la peluche que l'on voit de temps en temps ?",
    answer: "Cette peluche se nomme Rise, et est la mascotte de la mission. Elle sert également de témoin d'apesanteur. Elle représente la célèbre photo du lever de terre prise lors de la mission Apollo 8 : la Lune portant une casquette qui représente la Terre. De plus, elle a en son sein une carte SD qui contient les noms de plus de 5 millions de personnes qui se sont inscrites suite à une initiative de la NASA. Vincent et Kibo ont leur nom à bord ! On peut également apercevoir une autre peluche derrière Jenni Gibbons, l'astronaute qui communique avec l'équipage depuis CAPCOM. Il s'agit d'Artemis, un personnage de la série animée Sailor Moon !",
  },
  {
    question: "Est-ce que l'espace est politique ?",
    answer: "Oui et ce, depuis ses débuts. Il suffit de voir comment la conquête spatiale était un moyen de montrer qui a la plus grosse notamment pendant la guerre froide, car si je peux atteindre l'espace, je peux aussi t'envoyer des missiles sur toi. Artemis en particulier est 100% politique. On rappelle qu'il y a quelques jours, Trump a dit vouloir enlever quasiment un quart du financement de la NASA pour financer ses panpans. De plus, le président actuel de la NASA, Jared Isaacman, a été nommé non pas pour ses compétences mais car Elon Musk a demandé à Trump de le nommer.",
  },
  {
    question: "Quelle montre est en dotation pour l'équipage d'Artemis 2 ?",
    answer: "Chaque membre de l'équipage d'Artemis 2 emporte avec lui une Omega Speedmaster X-33.",
  },
  {
    question: "Quel sera le prochain astronaute européen à voler sur Artemis ?",
    answer: (
      <div className="space-y-2">
        <p>Le spatial fonctionne sur un système d'échange de service entre agences spatiales : En échange de matériel, les astronautes de l'agence peuvent voler sur les missions. L'ESA n'arriverait qu'en troisième position après les canadiens et les japonais. Au sein de l’ESA, les allemands seront sûrement prioritaires car ce sont les plus gros contributeurs.</p>
        <p>Le vol d'un astronaute Européen n'aurait pas lieu avant Artemis IV. Thomas Pesquet est en "reconversion", donc il ne sera sûrement plus astronaute au moment de ces missions. Concernant Sophie Adenot, même problème.</p>
        <p>Vous pouvez cependant vous réjouir tout autant si un·e européen·ne non français·e est sélectionné·e car vos impôts paient les salaires de tou·te·s les astronautes européen·ne·s, et iels vous représentent tou·te·s.</p>
      </div>
    )
  },
  {
    question: "Les fusées polluent énormément, non ?",
    answer: "La SLS utilise un premier étage avec un carburant hydrogène+oxygène qui relâche principalement de la vapeur d'eau (des nuages). Une fois retombés dans l'océan, les boosters et étages sont inertes et forment de bonnes bases pour le développement de récifs, comme les épaves de bateaux. Le Kennedy Space Center est également très attentif à perturber le moins possible l'écosystème local. Ce n'est cependant pas le cas de toutes les fusées, certaines utilisant du kérosène (p.ex la Falcon 9 de SpaceX). L'énergie et la pollution due à la production de la fusée elle-même et de son carburant reste un point critiquable.",
  },
];
export const bouclierItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Pourquoi un bouclier anti-radiations ?",
    answer: (
      <div className="space-y-2">
        <p>Dans l'espace dit lointain (dès qu'on s'éloigne un peu de notre planète), il n'y a plus ni l'atmosphère ni le champ magnétique de la Terre pour nous protéger. Les astronautes sont exposés à des radiations (rayonnement, particules chargées) en provenance principalement du soleil, mais aussi du reste de l'espace. Plus on s'éloigne de la Terre, plus le risque d'exposition est élevé.</p>
        <p>Les conséquences de ces radiations sont :</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Pour les humains : une exposition prolongée à des doses élevées endommage le corps, et notamment l'ADN, ce qui peut causer des maladies graves, dont des cancers.</li>
          <li>Pour l'électronique : un rayonnement qui tombe au mauvais endroit peut causer des bugs, voire des pannes. Dans les cas les plus sévères, les composants sensibles peuvent même griller.</li>
        </ul>
        <p>Pour la mission Artemis II, le vaisseau Orion est déjà partiellement protégé, et le plan de vol évite les zones les plus denses en particules chargées (ceinture de Van Allen). Sans éruption solaire dans la direction de la Terre, le bouclier anti-radiations n'est pas nécessaire. Le programme a cependant pour objectif de mener à de l'exploration spatiale plus poussée, d'où le test du bouclier anti-radiations réalisé par l'équipage.</p>
      </div>
    ),
  },
];

export const survolItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Pourquoi font-ils une description détaillée des cratères alors qu’on connaît bien la Lune ?",
    answer: "Au contraire, on ne connaît pas très bien la lune. Par exemple, en début de soirée, Reid Wiseman a nommé deux cratères de la Lune (Integrity et Carroll). Aussi, l'œil humain distingue des choses imperceptibles à la caméra/photo comme les couleurs ou la profondeur. Pour finir, les caméras utilisées pour l'observation aujourd'hui sont de meilleure qualité par rapport à Apollo.",
  },
  {
    question: "Pourquoi c'est eux qui sont allés le plus loin alors qu'ils ne sont même pas allés sur la lune ?",
    answer: "Ils ont battu le record parce qu'ils sont sur une orbite autour de la lune bien plus éloignée que les trajectoires permettant aux missions Apollos d'atterrir sur la Lune.",
  },
  {
    question: "C’est quoi les cratères sur la Lune ?",
    answer: "Les cratères lunaires sont des trous formés par des impacts de météorites, astéroïdes ou comètes. Comme la Lune n’a ni atmosphère (donc rien pour brûler les objets) ni vent ou pluie, les impacts restent visibles pendant des millions, voire des milliards d’années.",
  },
  {
    question: "Quel est le type de sol présent sur la Lune ? Peut-on le comparer à de l’argile ?",
    answer: "Le sol lunaire, appelé régolithe, n’est pas de l’argile. Il s’agit d’une fine poussière formée par des milliards d’années d’impacts de météorites qui ont broyé la roche. Contrairement à l’argile terrestre, il ne contient pas d’eau et ses particules sont très abrasives et irrégulières. En résumé, c’est une sorte de poudre minérale sèche, bien différente des sols que l’on trouve sur Terre.",
  },
  {
    question: "De combien la capsule va-t-elle passer au plus proche de la Lune et quelle sera la distance maximale avec la Terre ?",
    answer: (
      <div className="space-y-2">
        <p>La capsule a passé au plus proche de la Lune avec une altitude d'environ <strong className="text-foreground/80">6 500 km</strong> (atteint à MET 5j 0h 25min 34s — 1h02min34 heure française), pour une moyenne lors du survol d'environ 8 000 km.</p>
        <p>La distance maximale avec la Terre a été franchie à MET 5j 0h 27min 39s (1h04min39 heure française) pour un total de <strong className="text-foreground/80">406 771 km</strong> — soit 252 756 miles, un nouveau record humain.</p>
      </div>
    ),
  },
  {
    question: "Pourquoi dit-on \"mer\" pour nommer certains endroits de la lune ?",
    answer: "Parce qu'avant, on les a confondus avec des mers car ces zones paraissent plus sombres.",
  },
];

export const retourItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Quels problèmes ont été constatés sur le bouclier thermique d'Orion ?",
    answer: (
      <div className="space-y-2">
        <p>Lors de la mission de test sans équipage (Artémis 1, 2022), les ingénieurs ont inspecté au retour l'état du bouclier thermique et ont constaté :</p>
        <ul className="list-disc list-inside space-y-1 text-muted-foreground">
          <li>Plus d'une centaine de morceaux du bouclier ont été arrachés lors de la rentrée atmosphérique, ce qui pourrait percer les parachutes de freinage.</li>
          <li>La corrosion des boulons de séparation entre la capsule et le module de service sur le bouclier thermique pourrait créer des interstices atteignant l'extérieur de la capsule.</li>
        </ul>
        <p>Afin de régler ces problèmes, la trajectoire a été modifiée par rapport à Artémis 1 : la rentrée atmosphérique se fera à un angle et une vitesse moins forte.</p>
      </div>
    ),
  },
  {
    question: "Que deviendra le module de service après sa séparation avec la capsule ?",
    answer: "Comme pour le premier et le second étage de la fusée, le module de service sera séparé de la capsule proche de la Terre et brûlera en partie dans l'atmosphère. Les débris qui survivront à la rentrée atmosphérique tomberont simplement dans l'océan. La séparation aura lieu 20 minutes avant la rentrée.",
  },
  {
    question: "Où les astronautes amerriront-ils ? Comment seront-ils récupérés ?",
    answer: "Les astronautes devraient amerrir dans l'océan Pacifique au large de San Diego un peu après 02h00 (heure France métropolitaine) le 11 Avril. Ils seront récupérés par hélicoptère pour être amenés sur un porte-hélicoptère militaire des USA.",
  },
];

export const lexiqueItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Terminateur",
    answer: "Le terminateur est la frontière jour/nuit sur un astre. Hélas rien à voir avec le cinéma. On peut le voir sur la Terre en regardant du côté nuit et voir l'ombre de la nuit progresser.",
  },
  {
    question: "Albédo",
    answer: "L'albédo est une mesure comprise entre 1 et 0 et sans unité permettant de mesurer la réflectivité d'un objet par rapport à la lumière qu'elle reçoit. Par exemple, une surface blanche a un plus grand albédo qu'une surface noire.",
  },
];

export const planningEvents = [
  {
    date: "4 AVRIL 2026", events: [
      { time: "00:32", desc: "OTC-1 BURN" },
      { time: "02:44", desc: "NASA Conférence depuis la capsule (SAW CAMERA \"SELFIE\")" },
      { time: "05:00", desc: "LUNAR FLYBY CABIN CONFIGURATION" },
      { time: "06:59", desc: "CSA Conférence depuis la capsule" },
      { time: "09:54", desc: "Fin de journée des astronautes" },
      { time: "18:24", desc: "Réveil des astronautes" },
      { time: "20:49", desc: "NASA Conférence depuis la capsule" },
      { time: "22:34", desc: "NASA Conférence depuis la capsule" },
      { time: "23:15", desc: "Conférence depuis Houston" }
    ]
  },
  {
    date: "5 AVRIL 2026", events: [
      { time: "01:32", desc: "OTC-2 BURN" },
      { time: "02:59", desc: "MANUAL PILOTING DETAILED FLIGHT TEST OBJECTIVE" },
      { time: "03:29", desc: "LUNAR IMAGING REVIEW FOR FLYBY OPERATIONS" },
      { time: "06:14", desc: "CSA VIP Call" },
      { time: "09:09", desc: "Fin de journée des astronautes" },
      { time: "17:39", desc: "Réveil des astronautes" },
      { time: "20:09", desc: "OBJECTIFS DÉTAILLÉS DES TESTS EN VOL DE LA COMBINAISON OCSS" },
      { time: "21:30", desc: "Conférence depuis Houston" }
    ]
  },
  {
    date: "6 AVRIL 2026", events: [
      { time: "04:34", desc: "Correction de trajectoire 3" },
      { time: "06:30", desc: "INTEGRITY ENTRE DANS LA SPHÈRE D'INFLUENCE LUNAIRE" },
      { time: "08:09", desc: "Fin de journée des astronautes" },
      { time: "16:39", desc: "Réveil des astronautes" },
      { time: "19:45", desc: "INTEGRITY DÉPASSE LE RECORD DE DISTANCE D'APOLLO 13" },
      { time: "19:59", desc: "L'ÉQUIPAGE RECONNAÎT LE RECORD DE DISTANCE D'APOLLO 13 (AUDIO SEULEMENT)" },
      { time: "20:04", desc: "L'ÉQUIPAGE CONFIGURE LA CABINE D'INTEGRITY POUR LES OPÉRATIONS DE SURVOL" },
      { time: "20:34", desc: "PÉRIODE D'OBSERVATION LUNAIRE (SURVOL) COMMENCE" }
    ]
  },
  {
    date: "7 AVRIL 2026", events: [
      { time: "00:36", desc: "PERTE DE COMMUNICATION PRÉVUE (DERRIÈRE LA LUNE)" },
      { time: "01:02", desc: "INTEGRITY EFFECTUE SON APPROCHE LA PLUS PROCHE DE LA LUNE — 6 500 km / 4 067 miles" },
      { time: "01:04", desc: "INTEGRITY ATTEINT SA DISTANCE MAXIMALE DE LA TERRE — 406 771 km / 252 756 miles" },
      { time: "01:16", desc: "ACQUISITION DE SIGNAL PRÉVUE AVEC INTEGRITY" },
      { time: "01:24", desc: "VUES INTÉRIEURES DE L'ÉQUIPAGE PENDANT LE SURVOL LUNAIRE" },
      { time: "03:30", desc: "PÉRIODE D'OBSERVATION LUNAIRE (SURVOL) SE TERMINE" },
      { time: "07:54", desc: "Fin de journée des astronautes" },
      { time: "17:24", desc: "Réveil des astronautes" },
      { time: "19:17", desc: "INTEGRITY QUITTE LA SPHÈRE D'INFLUENCE LUNAIRE ET SE DIRIGE VERS LA TERRE" },
      { time: "20:29", desc: "ÉVÉNEMENT DU BUREAU DES AFFAIRES PUBLIQUES DE LA NASA - APPEL DE VÉHICULE À VÉHICULE ENTRE L'INTÉGRITÉ ET L'ISS (AUDIO SEULEMENT)" },
      { time: "20:49", desc: "DÉBRIEFING DE L'ÉQUIPAGE APRÈS LE SURVOL AVEC DES RESPONSABLES SCIENTIFIQUES" },
      { time: "21:19", desc: "L'ÉQUIPAGE COMMENCE SA PÉRIODE DE REPOS" }
    ]
  },
  {
    date: "8 AVRIL 2026", events: [
      { time: "04:39", desc: "NASA Conférence depuis la capsule" },
      { time: "08:54", desc: "Fin de journée des astronautes" },
      { time: "17:24", desc: "Réveil des astronautes" },
      { time: "21:30", desc: "Conférence depuis Houston" },
      { time: "23:09", desc: "CSA Conférence depuis la capsule" }
    ]
  },
  {
    date: "9 AVRIL 2026", events: [
      { time: "00:04", desc: "DÉMONSTRATION DU DÉPLOIEMENT DU BLINDAGE ANTI-RADIATION" },
      { time: "02:44", desc: "OBJECTIF DÉTAILLÉ DU TEST EN VOL DE PILOTAGE MANUEL" },
      { time: "08:54", desc: "Fin de journée des astronautes" },
      { time: "17:24", desc: "Réveil des astronautes" },
      { time: "21:30", desc: "Conférence depuis Houston" },
      { time: "23:59", desc: "Conférence depuis la capsule" }
    ]
  },
  {
    date: "10 AVRIL 2026", events: [
      { time: "01:54", desc: "NASA Conférence depuis la capsule" },
      { time: "04:53", desc: "Correction de trajectoire RTC-2 BURN" },
      { time: "08:54", desc: "Fin de journée des astronautes" },
      { time: "17:24", desc: "Réveil des astronautes" },
      { time: "19:39", desc: "CONFIGURATION DE LA CABINE POUR L'ENTRÉE COMMENCE" },
      { time: "20:53", desc: "Correction de trajectoire RTC-3 BURN" },
      { time: "21:09", desc: "L'ÉQUIPAGE CONTINUE DE CONFIGURER LA CABINE D'INTEGRITY EN VUE DE L'ENTRÉE" },
      { time: "22:54", desc: "L'ÉQUIPAGE PASSE À SA CHECKLIST D'ENTRÉE" }
    ]
  },
  {
    date: "11 AVRIL 2026", events: [
      { time: "01:33", desc: "SÉPARATION DU MODULE DE COMMANDE ET DU MODULE DE SERVICE" },
      { time: "01:36", desc: "MANŒUVRE D'ÉLÉVATION DU MODULE DE COMMANDE (CREW MODULE RAISE BURN)" },
      { time: "01:53", desc: "INTERFACE D'ENTRÉE ATMOSPHÉRIQUE" },
      { time: "02:06", desc: "AMERRISSAGE" },
      { time: "02:21", desc: "COUPURE DE L'ALIMENTATION" },
      { time: "03:05", desc: "HEURE CIBLÉE POUR L'EXTRACTION DE L'ÉQUIPAGE" },
      { time: "03:35", desc: "ARRIVÉE DE L'ÉQUIPAGE SUR LE NAVIRE DE RÉCUPÉRATION" },
      { time: "04:35", desc: "CONFÉRENCE DE PRESSE POST-AMERRISSAGE (JSC)" }
    ]
  }
];
