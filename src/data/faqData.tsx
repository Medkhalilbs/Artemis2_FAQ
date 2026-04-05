export const basesItems = [
  {
    question: "C'est quoi exactement \"Artemis 2\" ?",
    answer: "C'est la première mission habitée du programme Artemis. Après le succès d'Artemis 1 (qui était un vol de test sans personne à bord en 2022), cette mission va envoyer quatre astronautes faire le tour de la Lune.",
  },
  {
    question: "Pourquoi l'appelle-t-on \"Artemis\" et quel est le lien avec les missions \"Apollo\" ?",
    answer: "Dans la mythologie grecque, Artémis est la sœur jumelle d'Apollon (Apollo) et la déesse de la Lune. Ce nom symbolise le retour de l'humanité vers la Lune avec une approche moderne et inclusive.",
  },
  {
    question: "Quel est le but principal de ce voyage ?",
    answer: "L'objectif est de tester tous les systèmes de survie de la capsule Orion avec des humains à bord. C'est une répétition générale pour s'assurer que tout fonctionne parfaitement avant de tenter un atterrissage lors de la mission suivante.",
  },
  {
    question: "Est-ce que les astronautes vont marcher sur la Lune cette fois-ci ?",
    answer: "Non. Ils vont survoler la face cachée de la Lune et revenir vers la Terre. L'alunissage est réservé à la mission Artemis 4, prévue quelques années plus tard. (sujet à changements, le programme est fortement remanié de mois en mois)",
  },
  {
    question: "Pourquoi font-ils simplement le tour de la Lune au lieu de s'y poser directement ?",
    answer: "C'est une question de sécurité. Avant de risquer un atterrissage complexe, la NASA veut vérifier que le vaisseau Orion est capable de maintenir un équipage en vie dans l'espace lointain et de revenir en toute sécurité.",
  },
  {
    question: "Que se passe-t-il s'il y a une panne moteur derrière la Lune ?",
    answer: "La trajectoire d'Artemis 2 est appelée \"trajectoire de retour libre\". Cela signifie que la gravité de la Lune ramènera naturellement la capsule vers la Terre, même si le moteur principal tombe en panne.",
  },
  {
    question: "Pourquoi la vitesse diminue sur le trajet vers la Lune ?",
    answer: "Le vaisseau est attiré par la gravité terrestre, et ralentit petit à petit, jusqu'à ce qu'il s'approche suffisamment de la Lune pour que celle-ci l'attire plus que la Terre : le vaisseau va alors accélérer à nouveau, passer derrière la Lune, et on aura ensuite le phénomène inverse sur le trajet retour.",
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
    answer: "La durée du trajet est déterminée par les lois de la mécanique céleste, pas par la technologie du vaisseau. Les temps de trajet sont sensiblement les mêmes. Cependant, Artemis 2 a commencé par faire une orbite de 24h autour de la Terre pour vérifier que tous les systèmes critiques soient opérationnels avant de se lancer vers la Lune.",
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
          <li>Après le décollage, la vanne principale d'eau ne s'est pas ouverte mais a été résolue par Houston en réinitialisant la vanne. Par précaution, les astronautes ont rempli des sacs d'eau.</li>
          <li>L'évacuation des toilettes n'a pas fonctionné de suite car la buse était bouchée par des éjectats cristallisés. La zone a été tournée vers le Soleil pour déboucher la buse.</li>
          <li>Une petite odeur de brûlé dans la capsule — un surplus d'hydrogène, sans danger.</li>
          <li>L'humidité intérieure n'était pas stabilisée : les astronautes ont utilisé des serviettes mouillées pour compenser.</li>
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
    answer: "Pour qu'on puisse les repérer facilement lorsqu'ils atterrissent dans l'eau. Ils possèdent également des petites bouées pour leur sécurité et peuvent activer leur petit radeau personnel. Nous avons pu les voir lors de leur entrée dans la capsule Orion avant le décollage.",
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
    answer: "Quand Orion passera derrière la Lune, la capsule sera coupée des communications avec Houston pour la raison suivante : il y aura la Lune entre elle et la Terre. Il y aura approximativement 40 min voire 1h de coupure.",
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
        <p>En raison de la position actuelle des astres, le début du voyage vers la Lune s'est déroulé dans l'ombre de la Terre. La face visible par l'équipage, et donc celle sur les photos, est le côté \"nuit\" de la Terre !</p>
        <p>Eh oui, c'est surprenant, mais il s'agit bien de photos prises de nuit, avec le Soleil derrière la Terre. Plusieurs éléments permettent de distinguer notre planète sur ces clichés : un temps d'exposition élevé, un réglage ISO très élevé (d'où les artefacts numériques), et surtout une source de lumière. Mais laquelle puisque le Soleil est derrière la Terre ? Eh bien... La Pleine Lune ! Elle reflète la lumière du Soleil et permet d'apporter une luminosité suffisante pour ces clichés.</p>
        <p>On peut ainsi distinguer sur cette photo les aurores boréales aux deux pôles, l'atmosphère éclairée par le Soleil sur le pourtour, les étoiles autour, et... les éclairages publics dans les zones habitées du globe, puisqu'il y fait nuit !</p>
      </div>
    ),
  },
];

export const diversItems: { question: string; answer: string | React.ReactNode }[] = [
  {
    question: "Quelle est la peluche que l'on voit de temps en temps ?",
    answer: "La peluche, Rise, est à la fois la mascotte de la mission mais aussi un témoin d'apesanteur lors des différentes phases de la mission.",
  },
  {
    question: "Est-ce que l'espace est politique ?",
    answer: "Oui et ce, depuis ses débuts. Il suffit de voir comment la conquête spatiale était un moyen de prouver sa puissance technologique pendant la guerre froide. Aujourd'hui, Artemis reste un enjeu très politique impliquant de nombreuses parties prenantes et des budgets astronomiques votés par les décideurs.",
  },
  {
    question: "Quelle montre est en dotation pour l'équipage d'Artemis 2 ?",
    answer: "Chaque membre de l'équipage d'Artemis 2 emporte avec lui une Omega Speedmaster X-33.",
  },
  {
    question: "Quel sera le prochain astronaute européen à voler sur Artemis ?",
    answer: "Le spatial fonctionne sur un système d'échange de services entre agences spatiales : en échange de matériel, les astronautes de l'agence peuvent voler sur les missions. L'ESA n'arriverait qu'en troisième position après les Canadiens et les Japonais. Le vol d'un astronaute européen n'aurait pas lieu avant Artemis IV (Thomas Pesquet étant en reconversion, il ne sera probablement plus astronaute au moment de cette mission).",
  },
];
