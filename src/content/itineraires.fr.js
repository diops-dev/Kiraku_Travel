// Itineraires : cartes, page d'index, fiches Kunisaki et Alpes japonaises.
// Version francaise, reference des traductions.
export default {
  circuitsLong: {
    'CL-01': { title: 'Du Néon au Silence', duree: '14 j / 13 n', ribbon: 'Culturel' },
    'CL-02': { title: 'Mille Marches vers le Nord', duree: '14 j / 13 n', ribbon: 'Spirituel' },
    'CL-03': { title: 'Des Temples aux Coraux', duree: '14 j / 13 n', ribbon: 'Bien Être' },
    'CL-04': { title: 'Le Premier Souffle', duree: '7 j / 6 n', ribbon: 'Culturel' },
    'CL-05': { title: 'Au Cœur du Vieux Japon', duree: '7 j / 6 n', ribbon: 'Arts Martiaux' },
    'CL-06': { title: 'La Traversée sans Hâte', duree: '21 j / 20 n', ribbon: 'Gastronomie' },
    'CL-07': { title: 'Des Tours aux Toits de Chaume', duree: '21 j / 20 n', ribbon: 'Anime & Manga' },
    'CL-08': { title: "Jusqu'aux Cèdres Millénaires", duree: '22 j / 21 n', ribbon: 'Miyazaki' },
    'CL-09': { title: 'Tokyo, Kyoto et traversée méridionale des Alpes japonaises', duree: '12 j / 11 n', ribbon: 'Randonnée', privateNote: '4 à 8 en petit groupe' },
  },

  circuitsCourts: {
    'CT-01': { title: 'Le Tokyo des Néons', zone: 'Shinjuku, Harajuku, Shibuya', intensite: 'Soutenue' },
    'CT-02': { title: "Le Tokyo d'Edo", zone: 'Asakusa, Ueno, Akihabara', intensite: 'Modérée' },
    'CT-03': { title: 'Le Tokyo des Hauteurs et de la Baie', zone: 'Asakusa, Skytree, Odaiba', intensite: 'Modérée' },
    'CT-04': { title: 'Le Tokyo Lettré', zone: 'Ueno, Akihabara, Kanda, Jimbocho', intensite: 'Modérée' },
    'CT-05': { title: 'Le Tokyo des Panoramas', zone: 'Shinjuku, Roppongi, Daimon', intensite: 'Modérée' },
    'CT-06': { title: "Le Tokyo de l'Imaginaire", zone: 'Ghibli, Kichijoji, Koenji, Nakano', intensite: 'Douce' },
    'CT-07': { title: 'Yokohama, la Porte du Large', zone: 'Kanagawa', intensite: 'Douce' },
    'CT-08': { title: 'Enoshima et Kamakura', zone: 'Kanagawa', intensite: 'Soutenue' },
    'CT-09': { title: 'Takaosan, la Montagne des Tengu', zone: 'Tokyo ouest', intensite: 'Sportive' },
    'CT-10': { title: 'Nikko, le Sanctuaire dans les Cèdres', zone: 'Tochigi', intensite: 'Modérée à sportive' },
    'CT-11': { title: 'Kyoto Centre', zone: 'Palais impérial, Nishiki, Gion', intensite: 'Douce' },
    'CT-12': { title: 'Kyoto Est, le Chemin des Philosophes', zone: 'Higashiyama nord', intensite: 'Soutenue' },
    'CT-13': { title: 'Kyoto Nord', zone: 'Arashiyama, Hozugawa, Kinkakuji', intensite: 'Modérée' },
    'CT-14': { title: 'Kyoto, les Dix Mille Torii', zone: 'Fushimi Inari, Higashiyama sud', intensite: 'Sportive' },
    'CT-15': { title: 'Osaka, la Ville qui Mange', zone: "Umeda, château d'Osaka", intensite: 'Douce' },
    'CT-16': { title: 'Osaka Populaire', zone: 'Shinsekai, Shitennoji, Namba, Dotonbori', intensite: 'Modérée' },
    'EX-01': { title: "L'Été des Ryukyu", zone: 'Extension', intensite: '5 j / 4 n' },
  },

  index: {
    eyebrow: 'NOS ITINÉRAIRES LONGS',
    titre: 'Neuf circuits, de sept à vingt-deux jours.',
    kicker: '· chacun retissé autour de vous.',
    droite: "Pas de date imposée en voyage privé : vous partez quand vous voulez, pour la durée que vous voulez. De un à huit voyageurs en privé, de quatre à huit en petit groupe.",
    courtsEyebrow: 'ITINÉRAIRES COURTS',
    courtsTitre: "Seize modules d'une journée.",
    courtsKicker: '· sans hébergement ni transport longue distance.',
    courtsDroite: "Des extensions, des escales, ou des briques pour composer un circuit sur mesure. Plus une extension de cinq jours.",
    thRef: 'Réf',
    thNom: 'Nom',
    thZone: 'Zone',
    thIntensite: 'Intensité',
    bouton: 'Réserver un appel de trente minutes',
    note: "Vous nous racontez ce qui vous tente. On vous dit si c'est la bonne saison.",
  },

  carrousels: {
    'CL-09': ['Tokyo et le Fuji, au départ', 'La crête, au-delà de 2 500 mètres', 'La montée en forêt vers Enzanso', "Kyoto, à l'arrivée"],
    KUNISAKI: ['Le sentier de Futagoji', 'Teinture aizome avec Tanaka-san', 'Un onsen de quartier à Beppu', 'Le marché de poissons de Saiki'],
  },

  kunisaki: {
    fil: 'Kunisaki, sept jours',
    eyebrow: 'UNE EXPÉRIENCE · KYUSHU',
    titre: 'Sept jours sur le sentier de Kunisaki.',
    ledeAvant: "La péninsule oubliée du Kyushu, ses temples Tendai cachés dans la forêt, une journée entière de teinture ",
    ledeItalique: 'aizome',
    ledeApres: " avec Tanaka-san, et un onsen secret à Beppu, celui où on paye 200 yens à une dame.",
    detailTitre: 'Sept matinées, sept dîners.',
    prix: '3 980 €',
    prixSub: 'par voyageur, base chambre double · vols non inclus',
    recap: "Oita · sentier de Futagoji · atelier aizome chez Tanaka-san · onsen de quartier à Beppu · marché de Saiki · mont Tsurumi · Fukuoka",
    note: "Les vols internationaux ne sont pas inclus, nous vous aidons à les réserver au meilleur horaire. La saison va d'avril à juin, la péninsule est plus belle avant les pluies. Un voyage lent, dans une péninsule que les circuits classiques ignorent. Vous dormez en minshuku et en ryokan, vous mangez ce qui a été pêché le matin, et vous marchez sur des sentiers de temples que peu de voyageurs empruntent.",
    plus: [
      "Une péninsule que les circuits classiques ignorent, sans autre groupe sur les sentiers",
      "Six nuits en minshuku et en ryokan, tous les dîners inclus",
      "Une journée entière de teinture aizome avec Tanaka-san, vous repartez avec votre tissu",
      "Le marché de poissons de Saiki au petit matin, déjeuner choisi et préparé sur place",
      "Un onsen de quartier à Beppu, celui où on paye 200 yens à la dame de l'entrée",
      "De un à huit voyageurs, à la date de votre choix, sans date imposée",
    ],
    facts: [
      { lbl: 'Départs', val: 'À la date de votre choix' },
      { lbl: 'Durée', val: '7 jours / 6 nuits' },
      { lbl: 'Niveau', val: 'Marche douce' },
      { lbl: 'Voyageurs', val: '1 à 8 personnes' },
      { lbl: 'Pension', val: 'Pension complète, sauf après-midi libres' },
      { lbl: 'Hébergement', val: 'Minshuku et ryokan' },
    ],
    jours: [
      { n: 1, title: 'Arrivée à Oita, dîner chez Mariko-san', body: "Vol direct Paris → Tokyo, puis Shinkansen jusqu'à Kokura, puis ligne locale. On vous attend à la gare avec un thermos. Dîner familial au minshuku, du poisson grillé, du riz local, et un long bain.", tags: ['Train local', 'Minshuku', 'Cuisine maison'] },
      { n: 2, title: 'Premier sentier : Futagoji', body: "Trente kilomètres à pied à travers les temples Tendai cachés dans la forêt. On marche lentement. Pause de midi chez un moine qui prépare son propre nattō.", tags: ['Randonnée', 'Temple', 'Déjeuner au temple'] },
      { n: 3, title: 'Atelier de teinture aizome avec Tanaka-san', body: "Journée entière à apprendre la teinture à l'indigo. Tanaka-san a 78 ans, n'a pas internet, et vous laissera repartir avec votre propre tissu, séché au vent.", tags: ['Artisanat', 'Une journée entière'] },
      { n: 4, title: 'Onsen secret à Beppu, version locale', body: "Pas les onsens du guide. Un petit bain de quartier où on paye 200 yens à une dame qui vous donne une serviette. Sieste l'après-midi, dîner d'izakaya le soir.", tags: ['Onsen', 'Izakaya'] },
      { n: 5, title: 'Le marché de poissons de Saiki', body: "Lever 5 h. On y croise les pêcheurs qui rentrent, on choisit le déjeuner sur place, et un cuisinier nous le prépare en sashimi à 10 h du matin. Après-midi libre.", tags: ['Marché', 'Repas'] },
      { n: 6, title: 'Bain de forêt au mont Tsurumi', body: "Marche douce, six heures, pause méditation dans une clairière. Repas du soir au ryokan, kaiseki saisonnier, neuf petits plats préparés par la patronne.", tags: ['Marche douce', 'Kaiseki'] },
      { n: 7, title: 'Retour à Fukuoka, dernier kissaten', body: "On rentre tranquillement à Fukuoka. Un dernier café dans un kissaten d'avant-guerre tenu par le même monsieur depuis 47 ans, et c'est terminé.", tags: ['Kissaten', 'Retour'] },
    ],
  },

  alpes: {
    fil: 'Alpes japonaises, douze jours',
    eyebrow: 'ITINÉRAIRE LONG · CL-09 · RANDONNÉE',
    titre: 'Tokyo, Kyoto et traversée méridionale des Alpes japonaises',
    lede: "Une traversée méridionale des Alpes du nord, en cinq étapes sur la voie Omote Ginza, avec l'ascension d'un sommet à plus de 3 000 mètres. Cinq jours de haute montagne au-delà de 2 500 mètres, encadrés par Tokyo au départ et Kyoto à l'arrivée.",
    detailTitre: 'Douze jours, dont six en montagne.',
    detailKicker: '· le trek occupe les jours 5 à 10.',
    prix: '3 990 €',
    prixSub: 'par personne, base chambre twin · vols et transfert non inclus',
    recap: "Tokyo, 3 jours · Matsumoto · Nakabusa onsen · refuges Enzanso, Tsubakuro, Jōnen · voie Omote Ginza · sommet à 3 000 m · ryokan Yarimikan · Kamikōchi · Kyoto, 2 jours",
    note: "Les vols internationaux ne sont pas inclus, nous vous aidons à les réserver au meilleur horaire. Le circuit ne part qu'en août et en septembre, les sentiers d'altitude n'étant praticables qu'en été. Le trek se déroule cinq jours durant au-delà de 2 500 mètres, en autonomie de portage léger : vos bagages voyagent de Tokyo à Kyoto pendant que vous marchez. Une bonne condition physique et une expérience de la moyenne montagne sont nécessaires.",
    plus: [
      "Cinq jours de haute montagne au-delà de 2 500 mètres, sur la voie Omote Ginza",
      "L'ascension d'un sommet à plus de 3 000 mètres, sac allégé, départ au petit jour",
      "Petit groupe de 4 à 8 personnes, encadré par un guide francophone de haute montagne",
      "Vos bagages voyagent de Tokyo à Kyoto pendant que vous marchez, vous ne portez que le nécessaire",
      "Une nuit au ryokan Yarimikan et ses onsen, après la descente vers la vallée",
      "Tokyo au départ et Kyoto à l'arrivée, avec un guide sur chacune des deux villes",
    ],
    facts: [
      { lbl: 'Prochain départ', val: '27 sept. 2026' },
      { lbl: 'Durée', val: '12 jours / 11 nuits' },
      { lbl: 'Niveau', val: 'Confirmé · 5 à 7 h de marche' },
      { lbl: 'Groupe', val: '4 à 8 personnes' },
      { lbl: 'Pension', val: 'Pension complète, jours 3 à 11' },
      { lbl: 'Hébergement', val: 'Hôtels 3★ et refuges' },
    ],
    departs: [
      { du: '27 septembre 2026', au: '8 octobre 2026', prix: '3 990,00 €' },
      { du: '1 août 2027', au: '12 août 2027', prix: '4 250,00 €' },
      { du: '26 septembre 2027', au: '7 octobre 2027', prix: '4 250,00 €' },
    ],
    jours: [
      { n: 1, title: 'Vol pour Tokyo', body: "Départ de France. Vol pour Tokyo, repas et nuit à bord selon l'horaire de votre compagnie.", tags: ['Vol'] },
      { n: 2, title: 'Arrivée à Tokyo', body: "Accueil à l'aéroport, transfert et installation à l'hôtel. Le reste de la journée est libre, le temps de laisser le décalage se poser.", tags: ['Transfert', 'Hôtel'] },
      { n: 3, title: 'Tokyo avec votre guide', body: "Journée dans la capitale avec votre guide tokyoïte, des grands sanctuaires aux quartiers qui ne dorment jamais. Petit-déjeuner, déjeuner et dîner inclus.", tags: ['Ville', 'Guide francophone'] },
      { n: 4, title: 'Tokyo, Matsumoto et Nakabusa onsen', body: "Vous confiez vos bagages à l'hôtel et ne gardez que vos affaires de trek pour les jours 5 à 10 : vous les retrouverez à Kyoto. Train jusqu'à Matsumoto (2 h 30), visite du château, puis route vers Nakabusa onsen (1 h), point de départ du trek. Nuit au refuge Ariake.", tags: ['Train', 'Château de Matsumoto', 'Refuge'] },
      { n: 5, title: 'Montée au refuge Enzanso et mont Tsubakuro', body: "L'itinérance débute par une montée régulière en forêt jusqu'au refuge Enzanso. Les premiers panoramas ouvrent sur les chaînes alpines. Après une halte au refuge, vous poursuivez jusqu'au mont Tsubakuro et ses roches granitiques aux formes étranges.", tags: ['Montée en forêt', 'Panorama', 'Refuge'] },
      { n: 6, title: 'Sur la crête, vers le mont Jōnen', body: "Journée de crête à plus de 2 500 mètres. Une colonie de macaques est installée au pied du mont Jōnen : avec un peu de patience, vous les croiserez. Pour celles et ceux qui veulent prolonger, une variante ajoute un sommet à l'étape.", tags: ['Crête', 'Faune', 'Refuge'] },
      { n: 7, title: 'La voie Omote Ginza', body: "Le cœur de la traversée, sur la voie Omote Ginza. Le sentier suit la ligne de partage des eaux, entre pierriers et pentes d'herbe rase, avec les Alpes du nord de part et d'autre.", tags: ['Haute montagne', 'Refuge'] },
      { n: 8, title: "Ascension d'un sommet à plus de 3 000 mètres", body: "L'étape la plus haute du séjour, avec l'ascension d'un sommet à plus de 3 000 mètres. Départ tôt, sac allégé, et une vue qui porte jusqu'au Fuji par temps clair.", tags: ['Sommet', '3 000 m', 'Refuge'] },
      { n: 9, title: 'Descente vers la vallée et onsen', body: "Après cinq jours passés à randonner au-delà de 2 500 mètres, vous retrouvez la vallée. La descente traverse une végétation alpine, ses lacs et ses rivières. Retour en douceur, et longue soirée aux bains du ryokan Yarimikan. D+ 150 m, D- 1 550 m, 6 h 30 à 7 h de marche.", tags: ['Descente', 'Onsen', 'Ryokan'] },
      { n: 10, title: 'Kamikōchi, puis Kyoto', body: "Transfert en car jusqu'au village de Kamikōchi, la capitale des Alpes japonaises, et découverte de la vallée. Route vers Kyoto dans l'après-midi, retrouvailles avec vos bagages et installation à l'hôtel.", tags: ['Kamikōchi', 'Car', 'Hôtel'] },
      { n: 11, title: 'Kyoto', body: "Journée à Kyoto. Temples, jardins et ruelles de l'ancienne capitale, à pied et à votre rythme.", tags: ['Ville', 'Temples'] },
      { n: 12, title: 'Vol de retour', body: "Transfert vers l'aéroport et vol de retour vers la France.", tags: ['Vol'] },
    ],
  },

  signatures: {
  "CL-01": {
    "fil": "Du Néon au Silence, 14 jours",
    "eyebrow": "ITINÉRAIRE LONG · CL-01 · CULTUREL",
    "titre": "Du Néon au Silence",
    "lede": "Tokyo, le mont Fuji, cinq nuits à Kyoto qui ne se ressemblent jamais, puis Osaka et le mont Shigi. Le circuit d'entrée dans l'archipel, dans sa version la plus complète.",
    "detailTitre": "Quatorze jours, treize nuits.",
    "detailKicker": "· trois villes, un ryokan au pied du Fuji, et cinq visages de Kyoto",
    "recap": "Tokyo (3 nuits) · Kawaguchiko (1) · Kyoto (5) · Osaka (2) · Tokyo (2)",
    "note": "Le circuit signature de découverte du Japon. Trois jours de Tokyo opposent la ville populaire d'Edo à la ville contemporaine, puis le mont Fuji et une nuit en ryokan à Kawaguchiko ouvrent sur cinq nuits à Kyoto : cinq expériences différentes, du sud de la ville au Kyoto impérial, jusqu'à une excursion régionale hors des sentiers classiques. Osaka apporte la rupture gastronomique et populaire, doublée d'une excursion spirituelle au mont Shigi.",
    "plus": [
      "Cinq nuits à Kyoto, jamais deux fois le même Kyoto : sud de la ville, Higashiyama, Ryoanji et Arashiyama, palais impérial, puis Kurama et Kibune",
      "Une nuit en ryokan avec onsen au pied du mont Fuji, à Kawaguchiko",
      "Une excursion spirituelle au mont Shigi depuis Osaka, sans changer d'hôtel",
      "Une carte Suica remise à l'arrivée, et les bagages envoyés d'une ville à l'autre par takkyubin",
      "Un atelier de calligraphie et une cérémonie du thé à Kyoto",
      "Une journée entièrement libre à Tokyo, avant le retour"
    ],
    "facts": [
      {
        "lbl": "Durée",
        "val": "14 jours / 13 nuits"
      },
      {
        "lbl": "Rythme",
        "val": "Dense, avec deux journées de respiration"
      },
      {
        "lbl": "Zones traversées",
        "val": "Kanto, Chubu, Kansai"
      },
      {
        "lbl": "Voyageurs",
        "val": "1 à 8 personnes en privé"
      }
    ],
    "photos": [
      "tokyo-night",
      "chureito-fuji",
      "kiyomizu-street",
      "osaka-castle"
    ],
    "jours": [
      {
        "n": 1,
        "title": "Arrivée à Tokyo",
        "body": "Transfert vers le centre, installation à l'hôtel et remise de la carte Suica. Premier dîner à Shinjuku, puis une heure de découverte nocturne : Kabukicho, Golden Gai, Omoide Yokocho.",
        "tags": [
          "Arrivée",
          "Shinjuku de nuit"
        ]
      },
      {
        "n": 2,
        "title": "Tokyo, le visage d'Edo",
        "body": "Asakusa et le temple Sensoji, Ameyoko, le parc de Ueno et son musée national ou le quartier de Yanesen, puis Akihabara et sa culture populaire.",
        "tags": [
          "Asakusa",
          "Ueno",
          "Akihabara"
        ]
      },
      {
        "n": 3,
        "title": "Tokyo, le visage contemporain",
        "body": "Le sanctuaire Meiji, Takeshita dori et Harajuku, Omotesando, puis Shibuya : Miyashita Park, Hachiko et le célèbre carrefour.",
        "tags": [
          "Harajuku",
          "Shibuya"
        ]
      },
      {
        "n": 4,
        "title": "Vers le mont Fuji et Kawaguchiko",
        "body": "Départ en train direct pour Kawaguchiko, au pied du Fuji. Promenade autour du lac, montée au mont Tenjo en téléphérique, puis onsen et dîner japonais au ryokan.",
        "tags": [
          "Mont Fuji",
          "Ryokan",
          "Onsen"
        ]
      },
      {
        "n": 5,
        "title": "De Kawaguchiko à Kyoto",
        "body": "Bus puis Shinkansen jusqu'à Kyoto, déjeuner bento à bord. L'après-midi commence déjà fort : Tofukuji, puis Fushimi Inari Taisha et son tunnel de torii.",
        "tags": [
          "Shinkansen",
          "Fushimi Inari"
        ]
      },
      {
        "n": 6,
        "title": "Kyoto, Higashiyama et Gion",
        "body": "Ginkakuji et le chemin de la Philosophie, puis Higashiyama : Entokuin, la statue de Ryozen Kannon, le musée du céramiste Kawai Kanjiro et le temple Kenninji, en marchant entre chaque lieu par les ruelles de Gion.",
        "tags": [
          "Higashiyama",
          "Gion"
        ]
      },
      {
        "n": 7,
        "title": "Kyoto, Ryoanji et Arashiyama",
        "body": "Le jardin zen de Ryoanji, le temple impérial de Ninnaji, puis l'après-midi à Arashiyama : bambouseraie, Okochi Sanso, Tenryuji et le pont Togetsukyo.",
        "tags": [
          "Ryoanji",
          "Arashiyama"
        ]
      },
      {
        "n": 8,
        "title": "Kyoto, palais impérial",
        "body": "Une journée plus lente : les jardins du palais impérial, une cérémonie du thé et une initiation à la calligraphie, puis la visite guidée du palais impérial Sento l'après-midi.",
        "tags": [
          "Palais impérial",
          "Cérémonie du thé"
        ]
      },
      {
        "n": 9,
        "title": "Kyoto, excursion à Kurama et Kibune",
        "body": "Une journée hors des circuits classiques dans les montagnes au nord de Kyoto : le temple Kurama dera, la forêt, puis la marche jusqu'à Kibune et son sanctuaire au bord de la rivière.",
        "tags": [
          "Randonnée",
          "Kurama"
        ]
      },
      {
        "n": 10,
        "title": "Vers Osaka",
        "body": "Château d'Osaka, marché de Kuromon pour le déjeuner, puis Shinsekai et sa tour Tsutenkaku, et enfin Dotonbori pour le dîner sous les enseignes lumineuses.",
        "tags": [
          "Château d'Osaka",
          "Dotonbori"
        ]
      },
      {
        "n": 11,
        "title": "Excursion au mont Shigi",
        "body": "Journée au temple Chogosonshiji, connu pour son immense tigre et son tunnel de torii, puis marche sur les chemins du mont Shigi, entre forêts et petits sanctuaires.",
        "tags": [
          "Mont Shigi",
          "Randonnée douce"
        ]
      },
      {
        "n": 12,
        "title": "Retour à Tokyo",
        "body": "Shinkansen retour vers Tokyo, installation à l'hôtel puis fin d'après-midi libre dans un quartier encore inexploré, selon l'envie du moment.",
        "tags": [
          "Shinkansen"
        ]
      },
      {
        "n": 13,
        "title": "Tokyo, journée libre",
        "body": "Une journée volontairement laissée libre après un circuit dense : musées, Yanaka, Daikanyama, shopping à Ginza ou Shibuya. Dîner d'adieu le soir.",
        "tags": [
          "Journée libre",
          "Dîner d'adieu"
        ]
      },
      {
        "n": 14,
        "title": "Départ",
        "body": "Transfert vers l'aéroport, Haneda ou Narita selon le vol. Fin du circuit.",
        "tags": [
          "Départ"
        ]
      }
    ]
  },
  "CL-02": {
    "fil": "Mille Marches vers le Nord, 14 jours",
    "eyebrow": "ITINÉRAIRE LONG · CL-02 · SPIRITUEL",
    "titre": "Mille Marches vers le Nord",
    "lede": "Tokyo, puis la remontée de l'archipel par le Tohoku et Hokkaido : Yamadera et ses mille marches, Hirosaki, Hakodate et sa baie, Sapporo. Le Japon loin du triangle classique.",
    "detailTitre": "Quatorze jours, treize nuits.",
    "detailKicker": "· six nuits à Tokyo, puis une remontée continue vers le nord",
    "recap": "Tokyo (6 nuits) · Sendai (1) · Aomori (1) · Hirosaki (1) · Hakodate (1) · Sapporo (2) · Tokyo (1)",
    "note": "Le circuit qui remonte l'archipel. Six jours à Tokyo et sa périphérie, puis une progression vers le nord par le Tohoku et Hokkaido, jusqu'à Sapporo. Un vrai argument de saisonnalité : le Yuki Matsuri de Sapporo en février, l'évitement de la chaleur humide du sud en été, la floraison tardive des cerisiers au printemps, et le koyo qui démarre ici dès fin octobre.",
    "plus": [
      "Le temple de montagne de Yamadera et ses plus de mille marches, fondé en 860",
      "Hirosaki et son château, l'un des trois plus beaux sites de floraison du Japon",
      "La vue nocturne du mont Hakodate, considérée comme l'une des trois plus belles du Japon",
      "Le parc Goryokaku, unique forteresse en étoile du Japon",
      "Sapporo, son marché aux poissons et le parc Moerenuma, œuvre du sculpteur Isamu Noguchi",
      "Un Japon différent du triangle Tokyo, Kyoto, Osaka, pertinent toute l'année"
    ],
    "facts": [
      {
        "lbl": "Durée",
        "val": "14 jours / 13 nuits"
      },
      {
        "lbl": "Rythme",
        "val": "Soutenu sur la seconde moitié"
      },
      {
        "lbl": "Zones traversées",
        "val": "Kanto, Tohoku, Hokkaido"
      },
      {
        "lbl": "Voyageurs",
        "val": "1 à 8 personnes en privé"
      }
    ],
    "photos": [
      "tokyo-night",
      "chidorigafuchi",
      "youtei-snow",
      "alley"
    ],
    "jours": [
      {
        "n": 1,
        "title": "Arrivée à Tokyo",
        "body": "Transfert depuis l'aéroport et installation. L'après-midi se passe dans le quartier de l'hôtel, en douceur.",
        "tags": [
          "Arrivée"
        ]
      },
      {
        "n": "2-6",
        "title": "Tokyo et sa périphérie",
        "body": "Cinq journées à Tokyo composées selon vos envies : le Tokyo contemporain, celui d'Edo, la baie, et une excursion au choix en périphérie, Kamakura, Takaosan ou Nikko.",
        "tags": [
          "Tokyo",
          "Excursion au choix"
        ]
      },
      {
        "n": 7,
        "title": "Vers Sendai et le temple de Yamadera",
        "body": "Train jusqu'à Sendai, puis direction le temple Yamadera, à flanc de montagne, fondé en 860. Plus de mille marches pour l'atteindre, l'un des plus beaux paysages sacrés du Tohoku.",
        "tags": [
          "Yamadera",
          "Mille marches"
        ]
      },
      {
        "n": 8,
        "title": "Vers Aomori",
        "body": "Train vers Aomori, à l'extrémité nord de Honshu. Le reste de la journée est consacré à la découverte de la ville.",
        "tags": [
          "Aomori"
        ]
      },
      {
        "n": 9,
        "title": "Hirosaki",
        "body": "Une petite demi-heure de train jusqu'à Hirosaki : son château et son parc, l'un des trois plus beaux sites de floraison des cerisiers du Japon.",
        "tags": [
          "Château de Hirosaki"
        ]
      },
      {
        "n": 10,
        "title": "Vers Hakodate",
        "body": "Train par le tunnel du Seikan, sous le détroit de Tsugaru. La baie et ses entrepôts de brique, le parc Goryokaku, unique forteresse en étoile du Japon, puis la montée au mont Hakodate pour l'une des plus belles vues nocturnes du pays.",
        "tags": [
          "Goryokaku",
          "Vue nocturne"
        ]
      },
      {
        "n": 11,
        "title": "Vers Sapporo",
        "body": "Train vers la capitale de Hokkaido. Installation et première découverte du centre-ville.",
        "tags": [
          "Sapporo"
        ]
      },
      {
        "n": 12,
        "title": "Sapporo",
        "body": "Le parc Moerenuma, œuvre totale du sculpteur Isamu Noguchi, le marché aux poissons Jogai Ichiba, puis la montée au mont Moiwa pour le panorama sur la ville.",
        "tags": [
          "Parc Moerenuma",
          "Marché aux poissons"
        ]
      },
      {
        "n": 13,
        "title": "Retour à Tokyo",
        "body": "Retour vers Tokyo, en train ou en avion selon le montage choisi.",
        "tags": [
          "Retour"
        ]
      },
      {
        "n": 14,
        "title": "Départ",
        "body": "Transfert vers l'aéroport. Fin du circuit.",
        "tags": [
          "Départ"
        ]
      }
    ]
  },
  "CL-03": {
    "fil": "Des Temples aux Coraux, 14 jours",
    "eyebrow": "ITINÉRAIRE LONG · CL-03 · BIEN ÊTRE",
    "titre": "Des Temples aux Coraux",
    "lede": "Tokyo, Kyoto, puis la rupture totale : Naha et les îles Kerama, leurs plages et leur mer turquoise. Le Japon des mégapoles et des temples, suivi de l'archipel subtropical.",
    "detailTitre": "Quatorze jours, treize nuits.",
    "detailKicker": "· huit jours de culture, cinq jours d'îles",
    "recap": "Tokyo (4 nuits) · Kyoto (4) · Naha (1) · Îles Kerama (3) · Naha, Osaka ou Tokyo (1)",
    "note": "Quatre jours à Tokyo, quatre jours à Kyoto, puis cinq jours à Okinawa : le contraste est total. Après le Japon des mégapoles et des temples, l'archipel subtropical, sa culture ryukyu, ses plages et sa mer turquoise. Un circuit qui répond très bien à une envie de voyage de noces ou de séjour combinant culture et détente.",
    "plus": [
      "Les îles Kerama, à moins d'une heure de bateau de Naha, et leur mer turquoise dite Kerama Blue",
      "Snorkeling et plongée accessibles directement depuis la plage",
      "Quatre jours à Kyoto pour prendre le temps des temples",
      "Naha et ses rues commerçantes couvertes, la culture ryukyu",
      "Un vrai contraste de rythme entre la première et la seconde moitié du voyage",
      "Adapté à un voyage de noces comme à un séjour en famille"
    ],
    "facts": [
      {
        "lbl": "Durée",
        "val": "14 jours / 13 nuits"
      },
      {
        "lbl": "Rythme",
        "val": "Dense puis balnéaire"
      },
      {
        "lbl": "Zones traversées",
        "val": "Kanto, Kansai, Okinawa"
      },
      {
        "lbl": "Voyageurs",
        "val": "1 à 8 personnes en privé"
      }
    ],
    "photos": [
      "tokyo-night",
      "fushimi-inari",
      "kinkakuji",
      "torii-walkway"
    ],
    "jours": [
      {
        "n": 1,
        "title": "Arrivée à Tokyo",
        "body": "Transfert et installation. L'après-midi se passe dans le quartier de l'hôtel.",
        "tags": [
          "Arrivée"
        ]
      },
      {
        "n": "2-4",
        "title": "Tokyo",
        "body": "Trois journées dans la capitale : le Tokyo contemporain, celui d'Edo, et la baie.",
        "tags": [
          "Tokyo"
        ]
      },
      {
        "n": 5,
        "title": "Vers Kyoto",
        "body": "Shinkansen jusqu'à Kyoto en matinée. L'après-midi, une première approche de la ville autour de la gare et de l'hôtel.",
        "tags": [
          "Shinkansen"
        ]
      },
      {
        "n": "6-8",
        "title": "Kyoto",
        "body": "Trois journées à Kyoto : Higashiyama nord, Arashiyama, et le sanctuaire de Fushimi Inari.",
        "tags": [
          "Higashiyama",
          "Fushimi Inari",
          "Arashiyama"
        ]
      },
      {
        "n": 9,
        "title": "Vers Naha, Okinawa",
        "body": "Vol vers Naha depuis Tokyo ou Osaka selon le montage. En fin de journée, une première approche des rues commerçantes couvertes du centre-ville.",
        "tags": [
          "Vol",
          "Naha"
        ]
      },
      {
        "n": "10-12",
        "title": "Les îles Kerama",
        "body": "À moins d'une heure de bateau de Naha, Zamami et Tokashiki : plages, snorkeling, plongée, et la mer turquoise dite Kerama Blue.",
        "tags": [
          "Kerama",
          "Plage",
          "Snorkeling"
        ]
      },
      {
        "n": 13,
        "title": "Retour vers le continent",
        "body": "Bateau retour vers Naha, puis vol vers Osaka ou Tokyo selon le vol international de retour.",
        "tags": [
          "Retour"
        ]
      },
      {
        "n": 14,
        "title": "Départ",
        "body": "Transfert vers l'aéroport. Fin du circuit.",
        "tags": [
          "Départ"
        ]
      }
    ]
  },
  "CL-04": {
    "fil": "Le Premier Souffle, 7 jours",
    "eyebrow": "ITINÉRAIRE LONG · CL-04 · CULTUREL",
    "titre": "Le Premier Souffle",
    "lede": "Tokyo puis Kyoto, en une semaine. Le format découverte pour un premier contact avec le Japon, concentré sur deux villes pour ne rien précipiter.",
    "detailTitre": "Sept jours, six nuits.",
    "detailKicker": "· deux villes, sans jamais se presser",
    "recap": "Tokyo (3 nuits) · Kyoto (3)",
    "note": "Le format découverte pour un client qui ne dispose que d'une semaine, concentré sur deux villes au maximum. Arriver à Tokyo et repartir par l'aéroport du Kansai fait gagner une demi-journée en évitant un retour en train sur Tokyo. Le dernier jour se choisit sur place : une troisième journée à Kyoto, une incursion à Osaka, ou Nara et son parc aux daims.",
    "plus": [
      "Un montage aérien pensé pour gagner une demi-journée sur une semaine",
      "Deux villes seulement, pour ne rien précipiter",
      "Le dernier jour à composer sur place, entre Kyoto, Osaka et Nara",
      "Le format le plus accessible du catalogue, idéal pour un premier voyage"
    ],
    "facts": [
      {
        "lbl": "Durée",
        "val": "7 jours / 6 nuits"
      },
      {
        "lbl": "Rythme",
        "val": "Soutenu, format court"
      },
      {
        "lbl": "Zones traversées",
        "val": "Kanto, Kansai"
      },
      {
        "lbl": "Voyageurs",
        "val": "1 à 8 personnes en privé"
      }
    ],
    "photos": [
      "tokyo-night",
      "kiyomizu-street",
      "yasaka-kimono"
    ],
    "jours": [
      {
        "n": 1,
        "title": "Arrivée à Tokyo",
        "body": "Transfert et installation. L'après-midi se passe dans le quartier de l'hôtel.",
        "tags": [
          "Arrivée"
        ]
      },
      {
        "n": "2-3",
        "title": "Tokyo",
        "body": "Deux journées dans la capitale : le Tokyo contemporain et le Tokyo d'Edo, Asakusa et Akihabara.",
        "tags": [
          "Tokyo",
          "Asakusa"
        ]
      },
      {
        "n": 4,
        "title": "Vers Kyoto",
        "body": "Shinkansen jusqu'à Kyoto en matinée. Première approche de la ville l'après-midi, autour de la gare et de l'hôtel.",
        "tags": [
          "Shinkansen"
        ]
      },
      {
        "n": 5,
        "title": "Kyoto",
        "body": "Une journée complète, Fushimi Inari et Higashiyama sud, ou un parcours plus sportif selon l'envie du moment.",
        "tags": [
          "Fushimi Inari"
        ]
      },
      {
        "n": 6,
        "title": "Kyoto, Nara ou Osaka",
        "body": "Le dernier jour se choisit sur place : une troisième journée à Kyoto, Arashiyama et Kinkakuji, Osaka à trente minutes de train, ou Nara et son parc aux daims en liberté.",
        "tags": [
          "Au choix",
          "Nara"
        ]
      },
      {
        "n": 7,
        "title": "Départ par le Kansai",
        "body": "Depuis Kyoto, direction l'aéroport du Kansai, environ une heure vingt. Fin du circuit.",
        "tags": [
          "Départ"
        ]
      }
    ]
  },
  "CL-05": {
    "fil": "Au Cœur du Vieux Japon, 7 jours",
    "eyebrow": "ITINÉRAIRE LONG · CL-05 · ARTS MARTIAUX",
    "titre": "Au Cœur du Vieux Japon",
    "lede": "Une semaine en base unique à Kyoto ou à Osaka, avec Nara et Kobe en excursions. Le circuit le plus reposant du catalogue, sans jamais refaire ses valises.",
    "detailTitre": "Sept jours, six nuits.",
    "detailKicker": "· une seule chambre pour tout le séjour",
    "recap": "Kyoto ou Osaka en base unique (6 nuits)",
    "note": "Une semaine concentrée sur la région du Kansai, sans transfert de bagages : le client garde la même chambre pendant six nuits, et toutes les destinations sont à moins d'une heure de train. Une variante permet de pousser jusqu'à Hiroshima et Miyajima sur les deux derniers jours.",
    "plus": [
      "Une seule chambre pour tout le séjour, aucun transfert de bagages",
      "Toutes les destinations à moins d'une heure de train",
      "Nara et son parc aux daims en liberté, Kobe et son quartier occidental de Kitano",
      "Une variante possible jusqu'à Hiroshima et Miyajima",
      "Le circuit le plus simple et le plus reposant du catalogue"
    ],
    "facts": [
      {
        "lbl": "Durée",
        "val": "7 jours / 6 nuits"
      },
      {
        "lbl": "Rythme",
        "val": "Doux, base fixe"
      },
      {
        "lbl": "Zones traversées",
        "val": "Kansai"
      },
      {
        "lbl": "Voyageurs",
        "val": "1 à 8 personnes en privé"
      }
    ],
    "photos": [
      "kiyomizu-street",
      "fushimi-inari",
      "osaka-castle",
      "kinkakuji"
    ],
    "jours": [
      {
        "n": 1,
        "title": "Arrivée, installation en base unique",
        "body": "Transfert depuis l'aéroport du Kansai vers Kyoto ou Osaka, hébergement conservé pour tout le séjour.",
        "tags": [
          "Arrivée",
          "Base unique"
        ]
      },
      {
        "n": "2-3",
        "title": "Kyoto",
        "body": "Deux journées à Kyoto : Fushimi Inari et Higashiyama sud, puis Arashiyama et Kinkakuji.",
        "tags": [
          "Fushimi Inari",
          "Arashiyama"
        ]
      },
      {
        "n": 4,
        "title": "Osaka",
        "body": "Une journée à Osaka, à trente minutes de Kyoto : château, marché de Kuromon, Dotonbori.",
        "tags": [
          "Osaka"
        ]
      },
      {
        "n": 5,
        "title": "Nara",
        "body": "À une heure de train : Todaiji et son grand bouddha de bronze, le parc aux daims en liberté, le sanctuaire Kasuga Taisha et ses trois mille lanternes.",
        "tags": [
          "Nara",
          "Daims"
        ]
      },
      {
        "n": 6,
        "title": "Kobe, ou poursuite au choix",
        "body": "Selon la ville qui a le plus plu : Kobe, son port, le quartier occidental de Kitano, ou une poursuite de la découverte d'Osaka ou de Kyoto.",
        "tags": [
          "Kobe"
        ]
      },
      {
        "n": 7,
        "title": "Départ par le Kansai",
        "body": "Direction l'aéroport du Kansai, environ une heure vingt. Fin du circuit.",
        "tags": [
          "Départ"
        ]
      }
    ]
  },
  "CL-06": {
    "fil": "La Traversée sans Hâte, 21 jours",
    "eyebrow": "ITINÉRAIRE LONG · CL-06 · GASTRONOMIE",
    "titre": "La Traversée sans Hâte",
    "lede": "Le grand circuit classique dans sa version la plus confortable : six nuits à Tokyo, huit nuits à Kyoto, puis Kurashiki, Hiroshima, Miyajima et Himeji. Sans jamais changer d'hôtel tous les deux jours.",
    "detailTitre": "Vingt-et-un jours, vingt nuits.",
    "detailKicker": "· deux longs blocs à base fixe, puis la descente vers l'ouest",
    "recap": "Tokyo (6 nuits) · Kyoto (8) · Kurashiki (2) · Hiroshima (2) · Himeji (1) · Tokyo ou Osaka (1)",
    "note": "Le grand circuit classique, dans sa version la plus confortable. Sa force tient à ses deux blocs sédentaires, six nuits à Tokyo et huit nuits à Kyoto, d'où l'on rayonne sur Nara, Osaka et Kobe sans jamais refaire ses valises. La descente vers l'ouest ne commence qu'au quinzième jour, avec Kurashiki, Hiroshima, Miyajima et Himeji.",
    "plus": [
      "Deux blocs à base fixe, six nuits à Tokyo et huit nuits à Kyoto",
      "Nara, Osaka et Kobe visités depuis Kyoto, sans changer d'hôtel",
      "Le château de Himeji, le mieux conservé du Japon, classé au patrimoine mondial",
      "Une nuit possible sur l'île de Miyajima, qui se vide de ses visiteurs après 17 heures",
      "Le quartier des canaux de Kurashiki et son musée d'art Ohara",
      "Idéal pour une clientèle qui préfère ne pas changer d'hôtel tous les deux jours"
    ],
    "facts": [
      {
        "lbl": "Durée",
        "val": "21 jours / 20 nuits"
      },
      {
        "lbl": "Rythme",
        "val": "Modéré, deux blocs à base fixe"
      },
      {
        "lbl": "Zones traversées",
        "val": "Kanto, Kansai, Chugoku"
      },
      {
        "lbl": "Voyageurs",
        "val": "1 à 8 personnes en privé"
      }
    ],
    "photos": [
      "tokyo-night",
      "kiyomizu-street",
      "miyajima-torii",
      "osaka-castle"
    ],
    "jours": [
      {
        "n": 1,
        "title": "Arrivée à Tokyo",
        "body": "Transfert et installation. L'après-midi se passe dans le quartier de l'hôtel.",
        "tags": [
          "Arrivée"
        ]
      },
      {
        "n": "2-6",
        "title": "Tokyo et sa périphérie",
        "body": "Cinq journées à Tokyo, dont une excursion au choix en périphérie : Kamakura, Takaosan ou Nikko.",
        "tags": [
          "Tokyo"
        ]
      },
      {
        "n": 7,
        "title": "Vers Kyoto",
        "body": "Shinkansen jusqu'à Kyoto en matinée. Première approche de la ville l'après-midi.",
        "tags": [
          "Shinkansen"
        ]
      },
      {
        "n": "8-10",
        "title": "Kyoto",
        "body": "Trois journées à Kyoto : Higashiyama nord, Arashiyama, Fushimi Inari.",
        "tags": [
          "Kyoto"
        ]
      },
      {
        "n": 11,
        "title": "Nara",
        "body": "Depuis Kyoto, une heure de train : Todaiji, le parc aux daims, Kasuga Taisha.",
        "tags": [
          "Nara"
        ]
      },
      {
        "n": "12-13",
        "title": "Osaka",
        "body": "Deux journées à Osaka, à trente minutes de Kyoto, sans changer d'hôtel : château, Shinsekai, Dotonbori.",
        "tags": [
          "Osaka"
        ]
      },
      {
        "n": 14,
        "title": "Kobe",
        "body": "À quarante-cinq minutes de Kyoto : le port, le quartier occidental de Kitano, le quartier chinois de Nankinmachi.",
        "tags": [
          "Kobe"
        ]
      },
      {
        "n": "15-16",
        "title": "Kurashiki",
        "body": "Le quartier historique de Bikan, ses canaux bordés de saules, ses entrepôts blancs et le musée d'art Ohara.",
        "tags": [
          "Kurashiki",
          "Bikan"
        ]
      },
      {
        "n": 17,
        "title": "Hiroshima",
        "body": "Le centre-ville, le château, le parc du mémorial de la paix. Dîner d'okonomiyaki, la spécialité locale.",
        "tags": [
          "Mémorial de la paix"
        ]
      },
      {
        "n": 18,
        "title": "Miyajima",
        "body": "L'île et son sanctuaire d'Itsukushima, le torii les pieds dans l'eau à marée haute.",
        "tags": [
          "Miyajima",
          "Torii"
        ]
      },
      {
        "n": 19,
        "title": "Himeji",
        "body": "À moins d'une heure de Hiroshima : le château de Himeji, classé au patrimoine mondial, le mieux conservé du Japon.",
        "tags": [
          "Château de Himeji"
        ]
      },
      {
        "n": 20,
        "title": "Retour",
        "body": "Retour vers Tokyo ou Osaka en train, selon l'aéroport de départ choisi.",
        "tags": [
          "Retour"
        ]
      },
      {
        "n": 21,
        "title": "Départ",
        "body": "Transfert vers l'aéroport. Fin du circuit.",
        "tags": [
          "Départ"
        ]
      }
    ]
  },
  "CL-07": {
    "fil": "Des Tours aux Toits de Chaume, 21 jours",
    "eyebrow": "ITINÉRAIRE LONG · CL-07 · ANIME & MANGA",
    "titre": "Des Tours aux Toits de Chaume",
    "lede": "La grande boucle : Tokyo, puis tout l'ouest jusqu'à Hiroshima, remontée par Kyoto, et bascule vers les Alpes japonaises, Kanazawa, les toits de chaume de Shirakawa-go et Takayama.",
    "detailTitre": "Vingt-et-un jours, vingt nuits.",
    "detailKicker": "· le tracé le plus complet du catalogue",
    "recap": "Tokyo (6 nuits) · Hiroshima (3) · Kurashiki (2) · Kyoto (3) · Kanazawa (3) · Takayama (2) · Tokyo (1)",
    "note": "Le tracé le plus complet du catalogue. Il descend d'abord tout l'ouest jusqu'à Hiroshima, remonte par Kurashiki et Kyoto, puis bifurque vers le nord dans les Alpes japonaises : Kanazawa et son jardin Kenrokuen, les villages aux toits de chaume de Shirakawa-go, et la vieille ville d'Hida Takayama. Le Japon des villes, celui de la mémoire, celui des temples, et celui des montagnes.",
    "plus": [
      "Les villages aux toits de chaume gassho zukuri de Shirakawa-go, classés au patrimoine mondial",
      "Le jardin Kenrokuen à Kanazawa, l'un des trois plus beaux jardins du Japon",
      "La vieille ville d'Hida Takayama et ses maisons de marchands en bois sombre",
      "Le mémorial de la paix d'Hiroshima et l'île de Miyajima",
      "Le tracé le plus complet du catalogue, entre villes, montagnes et mémoire",
      "Une excursion à Shirakawa-go pensée pour rester léger, sans changer d'hôtel le jour même"
    ],
    "facts": [
      {
        "lbl": "Durée",
        "val": "21 jours / 20 nuits"
      },
      {
        "lbl": "Rythme",
        "val": "Soutenu, boucle complète"
      },
      {
        "lbl": "Zones traversées",
        "val": "Kanto, Chugoku, Kansai, Hokuriku, Chubu"
      },
      {
        "lbl": "Voyageurs",
        "val": "1 à 8 personnes en privé"
      }
    ],
    "photos": [
      "tokyo-night",
      "miyajima-torii",
      "alley",
      "kiyomizu-street"
    ],
    "jours": [
      {
        "n": 1,
        "title": "Arrivée à Tokyo",
        "body": "Transfert et installation. L'après-midi se passe dans le quartier de l'hôtel.",
        "tags": [
          "Arrivée"
        ]
      },
      {
        "n": "2-6",
        "title": "Tokyo et sa périphérie",
        "body": "Cinq journées à Tokyo, dont une excursion au choix en périphérie.",
        "tags": [
          "Tokyo"
        ]
      },
      {
        "n": 7,
        "title": "Vers Hiroshima",
        "body": "Train jusqu'à Hiroshima. Premier dîner d'okonomiyaki, la spécialité locale montée en couches avec des nouilles.",
        "tags": [
          "Shinkansen"
        ]
      },
      {
        "n": 8,
        "title": "Hiroshima",
        "body": "Le centre-ville, le château et le parc du mémorial de la paix : dôme de Genbaku, musée mémorial, cénotaphe.",
        "tags": [
          "Mémorial de la paix"
        ]
      },
      {
        "n": 9,
        "title": "Miyajima",
        "body": "L'île, à trente minutes d'Hiroshima : le sanctuaire d'Itsukushima et son torii dans l'eau, puis le mont Misen.",
        "tags": [
          "Miyajima"
        ]
      },
      {
        "n": "10-11",
        "title": "Kurashiki",
        "body": "Le quartier historique de Bikan, ses canaux, ses entrepôts blancs et le musée d'art Ohara.",
        "tags": [
          "Kurashiki"
        ]
      },
      {
        "n": "12-14",
        "title": "Kyoto",
        "body": "Trois journées à Kyoto : Fushimi Inari, Higashiyama nord, Arashiyama.",
        "tags": [
          "Kyoto"
        ]
      },
      {
        "n": "15-16",
        "title": "Kanazawa",
        "body": "Le château, le jardin Kenrokuen, l'un des trois plus beaux jardins du Japon, et les quartiers traditionnels de Higashi Chaya et Nagamachi.",
        "tags": [
          "Kenrokuen"
        ]
      },
      {
        "n": 17,
        "title": "Shirakawa-go",
        "body": "Excursion à la journée depuis Kanazawa, en bus : les villages aux toits de chaume gassho zukuri, classés au patrimoine mondial. Retour le soir, sans changer d'hôtel.",
        "tags": [
          "Shirakawa-go",
          "Excursion"
        ]
      },
      {
        "n": "18-19",
        "title": "Takayama",
        "body": "La vieille ville d'Hida Takayama : rues Sanmachi Suji, maisons de marchands en bois sombre, brasseries de saké.",
        "tags": [
          "Takayama"
        ]
      },
      {
        "n": 20,
        "title": "Retour à Tokyo",
        "body": "Retour en train vers Tokyo. Dernière après-midi libre pour un dernier quartier, ou les derniers achats.",
        "tags": [
          "Retour"
        ]
      },
      {
        "n": 21,
        "title": "Départ",
        "body": "Transfert vers l'aéroport. Fin du circuit.",
        "tags": [
          "Départ"
        ]
      }
    ]
  },
  "CL-08": {
    "fil": "Jusqu'aux Cèdres Millénaires, 22 jours",
    "eyebrow": "ITINÉRAIRE LONG · CL-08 · MIYAZAKI",
    "titre": "Jusqu'aux Cèdres Millénaires",
    "lede": "Le circuit le plus aventureux du catalogue : Kyoto, Hiroshima, les onsen du Kyushu, les bains de sable d'Ibusuki, puis trois nuits de randonnée dans la forêt primaire de Yakushima.",
    "detailTitre": "Vingt-deux jours, vingt-et-une nuits.",
    "detailKicker": "· jusqu'à la forêt qui a inspiré Princesse Mononoké",
    "recap": "Kyoto (6 nuits) · Kurashiki (1) · Hiroshima (3) · Beppu (1) · Yufuin (1) · Kumamoto (1) · Ibusuki (2) · Yakushima (3) · Osaka (3)",
    "note": "Le circuit le plus aventureux du catalogue. Il ignore Tokyo pour descendre du Kansai vers l'extrême sud : Hiroshima, puis le Kyushu et ses onsen de Beppu et Yufuin, les bains de sable chaud d'Ibusuki, et enfin l'île de Yakushima, forêt primaire classée au patrimoine mondial, mère des paysages de Princesse Mononoké. À réserver à un client sportif, amateur de nature, qui a déjà vu le Japon des villes.",
    "plus": [
      "Trois nuits de randonnée à Yakushima, forêt primaire classée au patrimoine mondial",
      "Le Jomon Sugi, cèdre millénaire dont l'âge est estimé entre deux mille et sept mille ans",
      "Les bains de sable chaud d'Ibusuki, enterré jusqu'au cou dans le sable volcanique",
      "Les onsen de Beppu et la station thermale de Yufuin, au pied du mont Yufu",
      "Une journée libre à Kumamoto pour souffler avant Ibusuki et Yakushima",
      "Le circuit à réserver à une clientèle sportive et amatrice de nature"
    ],
    "facts": [
      {
        "lbl": "Durée",
        "val": "22 jours / 21 nuits"
      },
      {
        "lbl": "Rythme",
        "val": "Soutenu, partie randonnée exigeante"
      },
      {
        "lbl": "Zones traversées",
        "val": "Kansai, Chugoku, Kyushu, îles du sud"
      },
      {
        "lbl": "Voyageurs",
        "val": "1 à 8 personnes en privé"
      }
    ],
    "photos": [
      "kiyomizu-street",
      "miyajima-torii",
      "takachiho",
      "osaka-castle"
    ],
    "jours": [
      {
        "n": 1,
        "title": "Arrivée à Kyoto",
        "body": "Liaison depuis l'aéroport du Kansai par l'express Haruka. Installation, après-midi dans le quartier de l'hôtel.",
        "tags": [
          "Arrivée"
        ]
      },
      {
        "n": "2-6",
        "title": "Kyoto et sa périphérie",
        "body": "Cinq journées à Kyoto, avec la possibilité de visiter aussi Osaka, Nara et Kobe, tous à moins d'une heure, sans changer d'hôtel.",
        "tags": [
          "Kyoto"
        ]
      },
      {
        "n": 7,
        "title": "Vers Kurashiki",
        "body": "Shinkansen puis train régional jusqu'à Kurashiki : le quartier de Bikan, ses canaux, ses entrepôts blancs, le musée d'art Ohara.",
        "tags": [
          "Kurashiki"
        ]
      },
      {
        "n": 8,
        "title": "Vers Hiroshima",
        "body": "Poursuite de la visite de Kurashiki, puis départ pour Hiroshima en fin d'après-midi. Premier dîner d'okonomiyaki.",
        "tags": [
          "Hiroshima"
        ]
      },
      {
        "n": 9,
        "title": "Hiroshima",
        "body": "Le centre-ville, le château, le parc du mémorial de la paix.",
        "tags": [
          "Mémorial de la paix"
        ]
      },
      {
        "n": 10,
        "title": "Miyajima",
        "body": "Le sanctuaire d'Itsukushima et son torii les pieds dans l'eau à marée haute.",
        "tags": [
          "Miyajima"
        ]
      },
      {
        "n": 11,
        "title": "Vers Beppu",
        "body": "Train jusqu'à Beppu, capitale japonaise des onsen. Découverte des huit enfers, sources bouillonnantes aux couleurs surprenantes.",
        "tags": [
          "Beppu",
          "Onsen"
        ]
      },
      {
        "n": 12,
        "title": "Vers Yufuin",
        "body": "Bus ou train touristique jusqu'à Yufuin, station thermale au pied du mont Yufu, ruelles d'artisanat et lac Kinrin.",
        "tags": [
          "Yufuin"
        ]
      },
      {
        "n": 13,
        "title": "Vers Kumamoto",
        "body": "Train ou bus vers Kumamoto. L'après-midi, le château de Kumamoto, l'un des trois grands châteaux du Japon.",
        "tags": [
          "Château de Kumamoto"
        ]
      },
      {
        "n": 14,
        "title": "Kumamoto, journée libre",
        "body": "Une journée volontairement libre pour souffler avant la descente vers le sud : jardin Suizenji, quartiers de Kamitori et Shimotori, cuisine locale.",
        "tags": [
          "Journée libre"
        ]
      },
      {
        "n": 15,
        "title": "Ibusuki",
        "body": "Les bains de sable chaud de l'onsen Saraku, enterré jusqu'au cou dans le sable volcanique. À marée basse, l'île de Chiringashima, reliée au continent par un banc de sable éphémère.",
        "tags": [
          "Bains de sable"
        ]
      },
      {
        "n": "16-19",
        "title": "Yakushima",
        "body": "Bateau depuis Ibusuki vers l'île, forêt primaire classée au patrimoine mondial. Randonnées à Shiratani Unsuikyo, la forêt de mousses qui a inspiré Princesse Mononoké, et jusqu'au Jomon Sugi, cèdre millénaire.",
        "tags": [
          "Yakushima",
          "Randonnée",
          "Forêt primaire"
        ]
      },
      {
        "n": "20-21",
        "title": "Osaka",
        "body": "Retour vers Osaka en train ou en avion. Deux journées dans la ville : château, Shinsekai, Dotonbori.",
        "tags": [
          "Osaka"
        ]
      },
      {
        "n": 22,
        "title": "Départ par le Kansai",
        "body": "Direction l'aéroport du Kansai. Fin du circuit.",
        "tags": [
          "Départ"
        ]
      }
    ]
  }
},
  modules: {
  "CT-01": {
    "titre": "Le Tokyo des Néons",
    "fil": "Shinjuku · Harajuku · Shibuya",
    "zone": "Tokyo ouest",
    "duree": "1 jour",
    "rythme": "Soutenue, environ 8 à 9 km de marche",
    "lede": "Une journée qui condense trois visages du Tokyo contemporain : la respiration du jardin Shinjuku Gyoen, la forêt sacrée du Meiji Jingu et l'effervescence de Takeshita dori, puis le carrefour de Shibuya.",
    "programme": "La journée commence au jardin Shinjuku Gyoen, ancien jardin impérial qui réunit un jardin japonais, un jardin français et un jardin anglais, avant une traversée de jour du Golden Gai et de Kabukicho. Le milieu de journée bascule au sanctuaire Meiji Jingu et à son allée de torii en bois de cyprès, puis à Takeshita dori et à l'avenue Omotesando. La fin de journée se joue au carrefour de Shibuya, avec vue depuis le Shibuya Hikarie, avant un temps de shopping libre.",
    "plus": [
      "Le panorama gratuit depuis l'observatoire de la mairie de Tokyo",
      "L'allée de torii du sanctuaire Meiji Jingu",
      "Le carrefour de Shibuya vu depuis les hauteurs",
      "Complément naturel : Shibuya Sky au coucher du soleil"
    ],
    "photo": "alley"
  },
  "CT-02": {
    "titre": "Le Tokyo d'Edo",
    "fil": "Asakusa · Ueno · Akihabara",
    "zone": "Tokyo est, quartiers du Shitamachi",
    "duree": "1 jour",
    "rythme": "Modérée, environ 7 km de marche",
    "lede": "La journée remonte le temps : le Tokyo populaire d'Edo autour du temple Sensoji, le grand parc de Ueno, puis le Tokyo électronique d'Akihabara. Le contraste le plus parlant que Tokyo puisse offrir en une journée.",
    "programme": "Le matin se passe à Asakusa, au temple Sensoji, le plus ancien de Tokyo, puis le long de la rivière Sumida et dans la rue Kappabashi, celle des ustensiles de cuisine. Le parc de Ueno occupe le milieu de journée, avec ses musées et le sanctuaire Yushima Tenjin, puis la rue commerçante Ameyoko. La fin de journée se joue à Akihabara, entre magasins d'électronique et culture manga, avec une pause au petit temple Yanagimori, dédié aux tanuki.",
    "plus": [
      "Le temple Sensoji, le plus ancien de Tokyo",
      "La rue Kappabashi et ses ustensiles de cuisine",
      "Ameyoko, ancien marché noir devenu marché populaire",
      "Extension possible : atelier de cuisine ou achat d'un couteau japonais"
    ],
    "photo": "torii-walkway"
  },
  "CT-03": {
    "titre": "Le Tokyo des Hauteurs et de la Baie",
    "fil": "Asakusa · Tokyo Skytree · Odaiba",
    "zone": "Tokyo est et front de mer",
    "duree": "1 jour",
    "rythme": "Modérée, forte part de transport, croisière incluse",
    "lede": "Une journée verticale puis horizontale : la Tokyo Skytree pour une lecture d'ensemble de la mégapole, puis une descente de la rivière Sumida en bateau jusqu'à l'île artificielle d'Odaiba.",
    "programme": "Après une matinée à Asakusa, la montée à la Tokyo Skytree, 634 mètres et deux niveaux d'observatoire, offre par temps clair une vue jusqu'au mont Fuji. L'après-midi se poursuit par la croisière sur la Sumida jusqu'à la baie de Tokyo, avec arrivée à Odaiba : plage face au Rainbow Bridge, statue Gundam grandeur nature à DiverCity, ou observatoire suspendu du bâtiment Fuji TV. Possible arrêt retour à Shiodome pour l'horloge animée conçue par Hayao Miyazaki.",
    "plus": [
      "Les deux niveaux d'observatoire de la Tokyo Skytree, 350 et 450 mètres",
      "La croisière sur la Sumida jusqu'à la baie",
      "La statue Gundam grandeur nature de DiverCity",
      "Le module qui plaît le plus aux familles"
    ],
    "photo": "tokyo-night"
  },
  "CT-04": {
    "titre": "Le Tokyo Lettré",
    "fil": "Ueno · Akihabara · Kanda · Jimbocho",
    "zone": "Tokyo centre est",
    "duree": "1 jour",
    "rythme": "Modérée, environ 6 km de marche",
    "lede": "Variante savante du Tokyo d'Edo : Ueno et Akihabara le matin, puis le Tokyo des étudiants, des luthiers et des libraires, jusqu'au quartier des bouquinistes de Jimbocho.",
    "programme": "Après la séquence Ueno puis Akihabara, la marche se poursuit jusqu'au sanctuaire Kanda Myojin, protecteur des affaires et de la technologie, dont les plaquettes votives sont souvent illustrées de personnages de manga. La rue des magasins de musique d'Ochanomizu, l'une des plus fortes concentrations de luthiers du Japon, mène au quartier de Jimbocho, capitale japonaise du livre ancien. En fin de journée, une marche calme jusqu'au sanctuaire Yasukuni et aux douves du palais impérial.",
    "plus": [
      "Le sanctuaire Kanda Myojin, lié à la culture d'Akihabara",
      "La rue des luthiers d'Ochanomizu",
      "Jimbocho, capitale japonaise du livre ancien",
      "Module recommandé pour un client curieux de littérature ou de musique"
    ],
    "photo": "alley"
  },
  "CT-05": {
    "titre": "Le Tokyo des Panoramas",
    "fil": "Shinjuku · Roppongi · Daimon",
    "zone": "Tokyo centre ouest et sud",
    "duree": "1 jour",
    "rythme": "Modérée, alternance de marche et de métro",
    "lede": "Le Tokyo de l'architecture contemporaine et des points de vue : Shinjuku, Roppongi et ses institutions culturelles, puis la tour de Tokyo au pied du temple Zojoji.",
    "programme": "Après la séquence Shinjuku du matin, l'après-midi monte à la Mori Tower de Roppongi pour la vue sur la ville depuis la Tokyo City View, avec le Mori Art Museum au même niveau. La fin de journée se joue à Daimon et Shiba : vue depuis la tour de Tokyo, puis le temple Zojoji, temple funéraire des shoguns Tokugawa, et la montée au sanctuaire Atago Jinja par son escalier de la réussite, 86 marches sur la plus haute colline naturelle du centre de Tokyo.",
    "plus": [
      "La vue sur Tokyo depuis la Mori Tower et son musée d'art contemporain",
      "Le temple Zojoji avec la tour de Tokyo en arrière-plan",
      "L'escalier de la réussite du sanctuaire Atago Jinja",
      "Module recommandé pour un client sensible au design et à l'architecture"
    ],
    "photo": "tokyo-night"
  },
  "CT-06": {
    "titre": "Le Tokyo de l'Imaginaire",
    "fil": "Musée Ghibli · Kichijoji · Koenji · Nakano",
    "zone": "Tokyo ouest, ligne JR Chuo",
    "duree": "1 jour",
    "rythme": "Douce, ambiance de quartier",
    "lede": "Le Tokyo des Tokyoïtes : le parc Inokashira et le musée Ghibli, les rues commerçantes de Kichijoji, puis Koenji et ses friperies, et Nakano Broadway, cathédrale de la culture otaku d'occasion.",
    "programme": "La matinée se passe au parc Inokashira et au musée Ghibli à Mitaka, dont les billets horodatés et nominatifs doivent être réservés longtemps à l'avance. Kichijoji, régulièrement classé quartier où les Tokyoïtes préfèrent vivre, occupe le milieu de journée avec ses rues commerçantes et Harmonica Yokocho. L'après-midi remonte la ligne JR Chuo vers Koenji, quartier des friperies et de la scène musicale indépendante, puis Nakano Broadway et son concentré de figurines et d'objets de collection.",
    "plus": [
      "Le musée Ghibli, réservation obligatoire très en amont",
      "Le parc Inokashira, l'un des plus beaux sites de cerisiers de l'ouest de Tokyo",
      "Nakano Broadway, temple du manga d'occasion",
      "Module de choix pour un client fan d'animation ou de vintage"
    ],
    "photo": "alley"
  },
  "CT-07": {
    "titre": "Yokohama, la Porte du Large",
    "fil": "Tokyo · Yokohama",
    "zone": "Préfecture de Kanagawa, front de mer",
    "duree": "1 jour",
    "rythme": "Douce, promenade urbaine et bord de mer",
    "lede": "La ville par laquelle le Japon s'est rouvert au monde en 1859 : la modernité du quartier Minato Mirai, la mémoire portuaire des entrepôts de brique rouge, et le plus grand quartier chinois du Japon.",
    "programme": "Depuis Tokyo, environ 35 minutes suffisent pour rejoindre la Landmark Tower et son observatoire Sky Garden, avec le musée Cup Noodles où l'on compose sa propre boîte de nouilles instantanées. Le port et les entrepôts de brique rouge, anciens bâtiments douaniers de la fin du XIXe siècle transformés en galeries, précèdent une promenade jusqu'au parc Yamashita, face à la baie. La journée se termine dans le quartier chinois, le plus grand du Japon, ses portes cérémonielles et ses centaines de restaurants.",
    "plus": [
      "La vue sur la baie depuis l'observatoire de la Landmark Tower",
      "Les entrepôts de brique rouge, anciens bâtiments douaniers",
      "Le plus grand quartier chinois du Japon",
      "Excursion sûre, adaptée à une journée moins dense"
    ],
    "photo": "tokyo-night"
  },
  "CT-08": {
    "titre": "Enoshima et Kamakura, la Mer et les Bouddhas",
    "fil": "Tokyo · Enoshima · Kamakura",
    "zone": "Préfecture de Kanagawa, littoral du Shonan",
    "duree": "1 jour",
    "rythme": "Soutenue, marche et escaliers",
    "lede": "Deux visages du Japon côtier reliés par un petit train qui longe la mer : l'île sacrée d'Enoshima le matin, la capitale shogunale de Kamakura et son grand bouddha de bronze l'après-midi.",
    "programme": "La matinée se passe sur l'île d'Enoshima, reliée par un pont, avec ses sanctuaires accrochés à la pente et sa tour d'observation Sea Candle, vue sur la baie de Sagami et, par temps clair, sur le mont Fuji. La ligne Enoden, séquence mémorable en elle-même, mène ensuite à Kamakura : le grand bouddha du Kotokuin, bronze de 1252 en plein air depuis qu'un tsunami a emporté son pavillon au XVe siècle, puis le temple Hasedera et ses jardins en terrasses, et enfin le sanctuaire Tsurugaoka Hachimangu, cœur du shogunat de Kamakura.",
    "plus": [
      "Le grand bouddha du Kotokuin, bronze de plus de 11 mètres",
      "La traversée en petit train Enoden le long de la côte",
      "Le temple Hasedera et sa vue sur la mer",
      "Journée physique, à adapter pour une mobilité réduite"
    ],
    "photo": "kamakura"
  },
  "CT-09": {
    "titre": "Takaosan, la Montagne des Tengu",
    "fil": "Tokyo · Takaosan",
    "zone": "Ouest de la préfecture de Tokyo",
    "duree": "1 jour",
    "rythme": "Sportive à pied, douce en télésiège",
    "lede": "La montagne la plus accessible depuis Tokyo, à 50 minutes de Shinjuku : le temple Yakuoin, haut lieu du shugendo, et par temps clair une vue qui porte jusqu'au mont Fuji.",
    "programme": "Le Takaosan culmine à 599 mètres et se monte à pied, en funiculaire ou en télésiège selon le profil du client. Le temple Yakuoin, fondé au VIIIe siècle, est jalonné de statues de tengu, ces créatures ailées gardiennes de la montagne. Au sommet, la vue porte sur la mégapole de Tokyo et, en décembre, sur le diamond Fuji, coucher de soleil dans l'axe exact du mont Fuji. Une auberge de montagne sert les spécialités locales, tororo soba et dango.",
    "plus": [
      "La vue sur le mont Fuji depuis le sommet, par temps clair",
      "Le temple Yakuoin et ses statues de tengu",
      "La cérémonie de marche sur les braises, mi-mars",
      "Une vraie respiration naturelle dans un séjour urbain"
    ],
    "photo": "fuji-city"
  },
  "CT-10": {
    "titre": "Nikko, le Sanctuaire dans les Cèdres",
    "fil": "Tokyo · Nikko",
    "zone": "Préfecture de Tochigi, parc national de Nikko",
    "duree": "1 à 2 jours",
    "rythme": "Modérée en version courte, sportive avec la randonnée",
    "lede": "Le sommet de l'art décoratif japonais et une nature de haute montagne réunis en un lieu : le mausolée du shogun Tokugawa Ieyasu, classé au patrimoine mondial, et le lac Chuzenji à trente minutes de bus.",
    "programme": "Le sanctuaire Toshogu, mausolée de Tokugawa Ieyasu au milieu d'une cryptomeraie séculaire, réunit la porte Yomeimon, les trois singes de la sagesse et le chat endormi. Le chemin des 70 bouddhas de Kanmangafuchi longe ensuite la gorge. En version deux jours, la route en lacets d'Irohazaka mène au lac Chuzenji et à la chute de Kegon, 97 mètres, puis une randonnée de 9 kilomètres jusqu'à Yumoto Onsen et ses eaux sulfureuses conclut le séjour.",
    "plus": [
      "Le sanctuaire Toshogu, classé au patrimoine mondial",
      "La chute de Kegon, 97 mètres",
      "La randonnée du lac Chuzenji à Yumoto Onsen, en version deux jours",
      "Saturé en octobre et novembre pour les érables"
    ],
    "photo": "torii-walkway"
  },
  "CT-11": {
    "titre": "Kyoto Centre, la Ville des Marchands et des Geiko",
    "fil": "Gare de Kyoto · Palais impérial · Nishiki · Gion · Pontocho",
    "zone": "Centre de Kyoto",
    "duree": "1 jour",
    "rythme": "Douce, essentiellement à pied et à plat",
    "lede": "Le circuit d'entrée dans Kyoto, qui privilégie la ville habitée : le palais impérial, le marché Nishiki que les Kyotoïtes appellent la cuisine de Kyoto, et les ruelles de Gion et de Pontocho à la tombée du jour.",
    "programme": "La matinée commence au palais impérial de Kyoto et à son vaste parc, puis descend le long de la rivière Kamogawa vers le marché Nishiki, environ 400 mètres de galerie couverte et plus d'une centaine d'échoppes. L'après-midi traverse le quartier traditionnel de Gion, ses maisons de thé et la ruelle de Hanamikoji, avant de rejoindre Pontocho à la tombée du jour, quand la lumière des lanternes en fait le meilleur moment de la journée.",
    "plus": [
      "Le marché Nishiki, la cuisine de Kyoto",
      "Les ruelles de Gion et de Pontocho à la tombée du jour",
      "Module conçu pour fonctionner aussi en simple escale d'une journée",
      "Terrasses sur la rivière à Pontocho de mai à septembre"
    ],
    "photo": "kiyomizu-street"
  },
  "CT-12": {
    "titre": "Kyoto Est, le Chemin des Philosophes",
    "fil": "Ginkakuji · Chemin des philosophes · Heian Jingu · Nanzenji · Gion · Kiyomizudera",
    "zone": "Higashiyama, flanc est de Kyoto",
    "duree": "1 jour",
    "rythme": "Soutenue, environ 9 km de marche",
    "lede": "Le grand axe nord-sud des collines de l'est, le module le plus riche en patrimoine du catalogue : du pavillon d'argent au chemin des philosophes, jusqu'à la terrasse de Kiyomizudera.",
    "programme": "Le pavillon d'argent, Ginkakuji, construit en 1482, ouvre la journée avec son jardin de mousses et sa mer de sable argenté. Le chemin des philosophes, deux kilomètres le long du canal, mène au sanctuaire Heian Jingu et à son torii de 24 mètres, puis au temple Nanzenji et à son aqueduc de brique. La descente vers le sud se termine au temple Kiyomizudera, dont la terrasse sur pilotis domine la ville, accessible par les ruelles préservées de Sannenzaka et Ninenzaka.",
    "plus": [
      "Le jardin de mousses du Ginkakuji, un des jardins fondateurs du wabi-sabi",
      "Le chemin des philosophes le long du canal",
      "La terrasse de Kiyomizudera en fin d'après-midi, hors de la foule de midi",
      "À réserver aux clients bons marcheurs"
    ],
    "photo": "kiyomizu-street"
  },
  "CT-13": {
    "titre": "Kyoto Nord, Bambous, Rivière et Pavillon d'Or",
    "fil": "Arashiyama · Hozugawa · Kinkakuji",
    "zone": "Nord-ouest de Kyoto, vallée de la Hozugawa",
    "duree": "1 jour",
    "rythme": "Modérée, montée raide au parc à singes",
    "lede": "La journée la plus paysagère de Kyoto : la bambouseraie d'Arashiyama, une descente de rivière en barque ou en petit train panoramique, puis le pavillon d'or.",
    "programme": "L'arrivée matinale à Arashiyama, condition impérative pour profiter de la forêt de bambous avec peu de monde, précède la visite du temple Tenryuji, classé au patrimoine mondial, et la montée au parc à singes d'Iwatayama pour le panorama sur Kyoto. L'après-midi, la descente de la rivière Hozugawa en barque à fond plat, ou le petit train Sagano aux wagons ouverts, traverse les gorges. La journée se termine au Kinkakuji, le pavillon d'or recouvert de feuille d'or.",
    "plus": [
      "La forêt de bambous d'Arashiyama, à voir tôt le matin",
      "La descente de la Hozugawa en barque à travers les gorges",
      "Le pavillon d'or, reconstruit en 1955",
      "Module à très forte valeur photographique"
    ],
    "photo": "kinkakuji"
  },
  "CT-14": {
    "titre": "Kyoto, les Dix Mille Torii",
    "fil": "Fushimi Inari Taisha · Kiyomizudera · Gion · Yasaka · Heian · Nanzenji",
    "zone": "Sud-est puis est de Kyoto",
    "duree": "1 jour",
    "rythme": "Sportive le matin, soutenue ensuite",
    "lede": "La variante sud du circuit est, construite autour du sanctuaire le plus photographié du Japon : des milliers de torii vermillon du Fushimi Inari, puis la remontée vers le nord à travers Higashiyama.",
    "programme": "Arriver au Fushimi Inari Taisha dès le lever du soleil est le seul moyen d'en avoir une expérience paisible : les torii, offerts par des entreprises et des particuliers, montent jusqu'au sommet du mont Inari, une marche de trois heures aller-retour ou une version courte jusqu'au belvédère de Yotsutsuji. Le reste de la journée remonte vers le nord, au temple Kiyomizudera par les ruelles de Sannenzaka et Ninenzaka, puis à Gion et au sanctuaire Yasaka, jusqu'au Heian Jingu et au temple Nanzenji.",
    "plus": [
      "Les milliers de torii du Fushimi Inari, à vivre au lever du soleil",
      "L'ascension du mont Inari, entre trois heures et une heure trente selon la version",
      "La terrasse de Kiyomizudera",
      "Complémentaire du module Kyoto Est, à ne jamais vendre les deux ensemble"
    ],
    "photo": "fushimi-inari"
  },
  "CT-15": {
    "titre": "Osaka, la Ville qui Mange",
    "fil": "Umeda Sky Building · Gare d'Osaka et Grand Front · Château d'Osaka · NHK BK Plaza",
    "zone": "Nord d'Osaka, quartier de Kita",
    "duree": "1 jour",
    "rythme": "Douce, dominante urbaine et commerçante",
    "lede": "Osaka par sa moitié nord : le panorama à ciel ouvert de l'Umeda Sky Building, les rues marchandes couvertes qui gardent le tempérament populaire de la ville, puis le château d'Osaka.",
    "programme": "La montée à l'Umeda Sky Building, deux tours reliées par un observatoire flottant suspendu dans le vide, ouvre la journée sur une vue à 360 degrés. Les rues commerçantes couvertes de Tenjinbashisuji, la plus longue galerie marchande du Japon, sont l'endroit où goûter takoyaki et kushikatsu. L'après-midi se termine au château d'Osaka et à son parc, puis au NHK BK Plaza, où l'on découvre les coulisses de la télévision publique japonaise.",
    "plus": [
      "L'observatoire flottant de l'Umeda Sky Building",
      "Tenjinbashisuji, la plus longue galerie marchande du Japon",
      "Le château d'Osaka et son parc",
      "Module conçu aussi pour une escale d'une journée, consigne à bagages en gare"
    ],
    "photo": "osaka-castle"
  },
  "CT-16": {
    "titre": "Osaka Populaire, du Shitamachi aux Néons",
    "fil": "Shinsekai · Shitennoji · Abeno Harukas · Namba · Dotonbori",
    "zone": "Sud d'Osaka, quartiers de Shinsekai, Tennoji et Minami",
    "duree": "1 jour",
    "rythme": "Modérée, journée qui se prolonge en soirée",
    "lede": "Le pendant sud du circuit précédent, celui qui donne son caractère à Osaka : Shinsekai et son quartier figé dans les années 1950, le plus ancien temple bouddhique du Japon, puis Namba et Dotonbori jusque tard dans la soirée.",
    "programme": "Shinsekai, bâti en 1912 en s'inspirant de Paris et de Coney Island, se découvre autour de la tour Tsutenkaku et de ses brochettes de kushikatsu. Le temple Shitennoji, fondé en 593, considéré comme le plus ancien temple bouddhique officiel du Japon, précède la montée à l'Abeno Harukas, le plus haut gratte-ciel du Japon. La soirée se joue à Namba et Dotonbori, au bord du canal, sous les enseignes lumineuses et le coureur Glico.",
    "plus": [
      "La tour Tsutenkaku et l'ambiance rétro de Shinsekai",
      "Le temple Shitennoji, le plus ancien temple bouddhique du Japon",
      "L'observatoire Harukas 300, le plus haut gratte-ciel du Japon",
      "Se complète naturellement avec le module Osaka nord, à vendre en deux jours"
    ],
    "photo": "osaka-castle"
  },
  "EX-01": {
    "titre": "L'Été des Ryukyu",
    "fil": "Naha · Îles Kerama",
    "zone": "Archipel d'Okinawa, mer de Chine orientale",
    "duree": "5 jours / 4 nuits",
    "rythme": "Douce, dominante balnéaire et nautique",
    "lede": "L'extension mer du catalogue, à ajouter à la fin d'un circuit principal : un archipel subtropical à la culture ryukyu, et la mer la plus claire du Japon.",
    "programme": "Après un vol vers Naha et une première approche des rues commerçantes couvertes du centre-ville, trois nuits sur les îles Kerama, à trente-cinq minutes en bateau rapide, ouvrent sur Zamami et Tokashiki et leur mer turquoise dite Kerama Blue. Baignade, snorkeling et plongée se pratiquent directement depuis la plage. Cette extension se greffe à la suite de la plupart des circuits signatures se terminant à Tokyo ou dans le Kansai, à l'exception de Des Temples aux Coraux, qui contient déjà cette séquence.",
    "plus": [
      "La mer turquoise des îles Kerama, dite Kerama Blue",
      "Snorkeling accessible directement depuis la plage",
      "Compatible avec la plupart des circuits signatures",
      "La plus exposée aux typhons de juin à octobre, prévoir un plan de repli"
    ],
    "photo": null
  }
},
  finalisation: {
    lede: 'Un itinéraire sur mesure, construit avec vous avant le départ.',
    prixSub: 'Tarif personnalisé selon vos dates et le nombre de voyageurs.',
    factDureeLbl: 'Durée',
    factVoyageursLbl: 'Voyageurs',
    factVoyageursVal: 'De un à huit voyageurs en privé, de quatre à huit en petit groupe',
    factDepartsLbl: 'Départs',
    factDepartsVal: 'À la date de votre choix, ou aux dates de groupe proposées',
    joursTitre: 'Le jour par jour',
    joursMessage: "Le déroulé jour par jour de cet itinéraire est en cours de mise en ligne. Nous vous l'envoyons en détail dès le premier échange, et le construisons avec vous selon vos dates et vos envies.",
    joursCta: 'Demander le déroulé complet',
  },
};
