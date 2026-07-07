/*
 * Shared service data. Used both by the homepage service cards (title, shortBody,
 * image) and by the individual service detail pages at /diensten/[slug].
 * Keep shortBody in sync with the homepage card copy.
 */

export interface ServiceStep {
  title: string
  body: string
}

export interface ServiceSection {
  heading: string
  paragraphs: string[]
}

export interface Service {
  slug: string
  title: string
  shortBody: string
  image: string
  /* Detail page */
  tagline: string
  intro: string
  sections: ServiceSection[]
  steps: ServiceStep[]
  benefits: string[]
  /** Question that opens the closing CTA band, e.g. "Zeker weten wat je koopt?" */
  ctaTitle: string
  metaTitle: string
  metaDescription: string
}

export const SERVICES: Service[] = [
  {
    slug: 'persoonlijke-autoselectie',
    title: 'Persoonlijke autoselectie',
    shortBody:
      'We zoeken objectief de auto die echt bij jouw leven, wensen en budget past. Onafhankelijk en zonder voorkeur voor een merk.',
    image: '/images/car-1.webp',
    tagline: 'De juiste auto begint bij de juiste vragen',
    intro:
      'Een auto kopen draait niet om de mooiste advertentie, maar om de keuze die jaren later nog klopt. Bij persoonlijke autoselectie zetten we jouw leven centraal, niet een merk, een model of een aanbieding. We luisteren, analyseren en zoeken net zo lang tot we de auto vinden die écht bij je past.',
    sections: [
      {
        heading: 'Wat houdt het in?',
        paragraphs: [
          'We beginnen met een open gesprek over hoe je rijdt, wat je vervoert en waar je auto aan moet voldoen. Dagelijks woon-werkverkeer vraagt om iets anders dan lange vakantieritten of een gezin met drie kinderstoelen. Pas als dat beeld helder is, gaan we zoeken.',
          'Omdat we volledig onafhankelijk zijn, hebben we geen enkel belang bij een specifiek merk of dealer. Ons advies is puur gebaseerd op wat voor jou het verstandigst is: comfort, betrouwbaarheid, verbruik en restwaarde.',
          'Twijfel je tussen benzine, hybride of volledig elektrisch? We rekenen de werkelijke kosten per jaar voor je door, zodat je een keuze maakt op basis van feiten in plaats van onderbuikgevoel.',
        ],
      },
    ],
    steps: [
      {
        title: 'Kennismaking',
        body: 'We brengen jouw wensen, budget en rijgedrag in kaart tijdens een persoonlijk gesprek.',
      },
      {
        title: 'Marktanalyse',
        body: 'We doorzoeken het volledige aanbod, particulier en zakelijk, binnen en buiten Nederland, naar passende opties.',
      },
      {
        title: 'Shortlist op maat',
        body: 'Je ontvangt een overzichtelijke selectie met de voor- en nadelen per auto helder naast elkaar.',
      },
      {
        title: 'Onderbouwd advies',
        body: 'We bespreken de shortlist samen, zodat je met een gerust hart de juiste keuze maakt.',
      },
    ],
    benefits: [
      'Volledig onafhankelijk advies, zonder merkbinding',
      'Een keuze die past bij vandaag én over vijf jaar',
      'Inzicht in werkelijke kosten, niet alleen de aanschafprijs',
      'Geen eindeloos zoeken: wij doen het voorwerk',
    ],
    ctaTitle: 'Klaar om de juiste auto te vinden?',
    metaTitle: 'Persoonlijke autoselectie',
    metaDescription:
      'Onafhankelijk en objectief de auto vinden die écht bij jouw leven, wensen en budget past. Geen merkbinding, alleen advies dat voor jou klopt.',
  },
  {
    slug: 'technische-keuring',
    title: 'Technische keuring',
    shortBody:
      'Elk voertuig wordt grondig gekeurd voor aankoop. Zo weet je precies wat je koopt en kom je nooit voor verrassingen te staan.',
    image: '/images/car-2.webp',
    tagline: 'Weet precies wat je koopt, vóór je betaalt',
    intro:
      "Een occasion ziet er op foto's altijd perfect uit. De waarheid zit onder de motorkap, in de boordcomputer en in de onderhoudshistorie. Met een grondige technische keuring leggen we die waarheid bloot, nog vóórdat je handtekening onder de koop staat.",
    sections: [
      {
        heading: 'Wat houdt het in?',
        paragraphs: [
          'We controleren de auto van bumper tot bumper: motor, transmissie, remmen, ophanging, banden, elektronica en carrosserie. Foutcodes uit de boordcomputer lezen we uit en we vergelijken de kilometerstand met de onderhoudshistorie om manipulatie uit te sluiten.',
          "Bij elektrische en hybride auto's gaat extra aandacht naar de gezondheid van het accupakket, vaak de duurste component van de hele auto. We meten de werkelijke capaciteit, zodat je niet voor een dure verrassing komt te staan.",
          'Van de keuring ontvang je een helder rapport: wat is in orde, wat vraagt op termijn aandacht en wat is reden om te onderhandelen of zelfs af te zien van de koop.',
        ],
      },
    ],
    steps: [
      {
        title: 'Visuele inspectie',
        body: 'We beoordelen carrosserie, interieur en banden op schade, slijtage en sporen van eerdere ongelukken.',
      },
      {
        title: 'Technische controle',
        body: 'Motor, remmen, ophanging en elektronica worden grondig nagelopen en uitgelezen.',
      },
      {
        title: 'Historie & data',
        body: 'We verifiëren kilometerstand, onderhoudshistorie en eventueel schadeverleden.',
      },
      {
        title: 'Rapport & advies',
        body: 'Je krijgt een duidelijk overzicht met onze conclusie en een eerlijk koopadvies.',
      },
    ],
    benefits: [
      'Nooit meer verborgen gebreken na aankoop',
      'Sterke onderhandelingspositie dankzij feiten op papier',
      'Extra accucheck bij elektrisch en hybride',
      'Een eerlijk go of no-go, zonder verkooppraat',
    ],
    ctaTitle: 'Zeker weten wat je koopt?',
    metaTitle: 'Technische keuring',
    metaDescription:
      'Grondige technische keuring vóór aankoop: motor, elektronica, historie en accugezondheid. Weet precies wat je koopt en kom nooit voor verrassingen te staan.',
  },
  {
    slug: 'prijsonderhandeling',
    title: 'Prijsonderhandeling',
    shortBody:
      'Wij onderhandelen namens jou de scherpste prijs en voorwaarden. Jij profiteert van onze kennis van de markt.',
    image: '/images/car-3.webp',
    tagline: 'Betaal nooit meer dan een auto waard is',
    intro:
      'De vraagprijs is zelden de echte prijs. Wie de markt kent, de zwakke plekken van een auto kent en weet hoe een verkoper denkt, betaalt structureel minder. Die kennis zetten wij in, volledig namens jou.',
    sections: [
      {
        heading: 'Wat houdt het in?',
        paragraphs: [
          'We bepalen eerst wat de auto werkelijk waard is op basis van actuele marktdata, vergelijkbare occasions en de uitkomst van de technische keuring. Elk minpunt, van een naderende onderhoudsbeurt tot lichte gebruikssporen, is een argument om de prijs te verlagen.',
          "Vervolgens voeren wij de onderhandeling. Geen emotie, geen haast, geen 'ik ben er nu toch', maar een zakelijk gesprek vanuit een sterke positie. Verkopers merken meteen dat ze met een professional te maken hebben.",
          'We onderhandelen niet alleen over de prijs, maar ook over de voorwaarden: garantie, een verse onderhoudsbeurt, nieuwe banden of de afhandeling van openstaande punten uit de keuring.',
        ],
      },
    ],
    steps: [
      {
        title: 'Waardebepaling',
        body: 'We berekenen de reële marktwaarde en verzamelen alle argumenten voor een lagere prijs.',
      },
      {
        title: 'Strategie',
        body: 'We bepalen samen je maximumbudget en de ondergrens waarop we inzetten.',
      },
      {
        title: 'Onderhandeling',
        body: 'Wij voeren het gesprek met de verkoper, zakelijk en vanuit een sterke positie.',
      },
      {
        title: 'Afronding',
        body: 'We leggen de afspraken helder vast, inclusief prijs, garantie en voorwaarden.',
      },
    ],
    benefits: [
      'Gemiddeld een scherpere prijs dan je zelf zou bedingen',
      'Onderhandeling zonder stress of emotie',
      'Ook betere voorwaarden, niet alleen een lager bedrag',
      'Een professional die volledig aan jouw kant staat',
    ],
    ctaTitle: 'Klaar om de beste deal te sluiten?',
    metaTitle: 'Prijsonderhandeling',
    metaDescription:
      'Wij onderhandelen namens jou de scherpste prijs én de beste voorwaarden, op basis van marktkennis en de uitkomst van de keuring. Betaal nooit te veel.',
  },
  {
    slug: 'aankoopbegeleiding',
    title: 'Flexibele begeleiding',
    shortBody:
      'Online of op locatie: wij begeleiden je door het hele aankooptraject, van de eerste vraag tot de proefrit en de overdracht van de sleutels.',
    image: '/images/over-ons.jpg',
    tagline: 'Eén vast aanspreekpunt, het hele traject lang',
    intro:
      'Een auto kopen is zelden één moment. Het is een reeks beslissingen, vragen en twijfels die zich over weken kan uitspreiden. Wij lopen dat traject met je mee: snel online wanneer het moet, en in persoon op de momenten die ertoe doen.',
    sections: [
      {
        heading: 'Wat houdt het in?',
        paragraphs: [
          'Je hebt bij ons één vast aanspreekpunt dat jouw zoektocht van begin tot eind kent. Geen wisselende contactpersonen, geen verhaal dat je telkens opnieuw moet vertellen. Wij schakelen mee op jouw tempo en zijn bereikbaar wanneer jij een knoop wilt doorhakken.',
          'We helpen je met de praktische kant die vaak wordt onderschat: het beoordelen van een advertentie, het voorbereiden van een proefrit, het opvragen van de juiste documenten en het nalopen van de koopovereenkomst voordat je tekent.',
          'Heb je vragen over financiering, verzekering of inruil? We denken mee en wijzen je op de aandachtspunten, zodat je niet voor verrassingen komt te staan en een weloverwogen keuze maakt.',
        ],
      },
    ],
    steps: [
      {
        title: 'Intake',
        body: 'We brengen in kaart waar je staat in je zoektocht en waar je hulp bij nodig hebt.',
      },
      {
        title: 'Meedenken',
        body: 'Online of op locatie beoordelen we samen opties, advertenties en de staat van een auto.',
      },
      {
        title: 'Proefrit & check',
        body: 'We bereiden de proefrit voor en lopen samen de belangrijke aandachtspunten na.',
      },
      {
        title: 'Overdracht',
        body: 'We controleren de papieren en begeleiden je tot de sleutels in jouw hand liggen.',
      },
    ],
    benefits: [
      'Eén vast aanspreekpunt gedurende het hele traject',
      'Hulp bij proefrit, papieren en koopovereenkomst',
      'Meedenken over financiering, verzekering en inruil',
      'Online wanneer het snel moet, op locatie wanneer het telt',
    ],
    ctaTitle: 'Samen je volgende auto kopen?',
    metaTitle: 'Flexibele begeleiding bij autoaankoop',
    metaDescription:
      'Online of op locatie begeleiden wij je door het hele aankooptraject: van advertentie en proefrit tot papieren en overdracht. Eén vast aanspreekpunt.',
  },
  {
    slug: 'technische-consultatie',
    title: 'Technische consultatie',
    shortBody:
      'Een losse, inhoudelijke vraag over een model, motor of uitvoering? Leg hem aan ons voor en krijg een onderbouwd antwoord, ook zonder volledig traject.',
    image: '/images/hero-bmw.png',
    tagline: 'Inhoudelijke vragen, een onderbouwd antwoord',
    intro:
      'Soms zit je niet vast aan het hele traject, maar aan één concrete vraag. Is deze motor betrouwbaar op termijn? Wat is een verstandige kilometerstand? Welke uitvoering houdt zijn waarde? Voor precies dat soort vragen kun je ons los inschakelen.',
    sections: [
      {
        heading: 'Wat houdt het in?',
        paragraphs: [
          'Je legt je vraag voor over een specifiek model, een motorvariant of een uitvoering, en wij geven een onderbouwd antwoord op basis van ervaring, bekende zwakke plekken en actuele marktinformatie.',
          'We kijken verder dan de folder: welke opties zijn de moeite waard, welke staan vooral mooi op papier, en waar moet je bij dit model écht op letten voordat je verdergaat.',
          'Handig als je al een auto op het oog hebt en alleen een laatste, deskundige blik wilt, of als je twijfelt tussen twee modellen en een knoop wilt doorhakken op basis van feiten.',
        ],
      },
    ],
    steps: [
      {
        title: 'Je vraag',
        body: 'Je stuurt ons het model, de uitvoering en wat je precies wilt weten.',
      },
      {
        title: 'Onderzoek',
        body: 'We toetsen je vraag aan ervaring, bekende zwakke plekken en marktdata.',
      },
      {
        title: 'Antwoord',
        body: 'Je krijgt een helder, onderbouwd antwoord met de belangrijkste aandachtspunten.',
      },
      {
        title: 'Vervolg',
        body: 'Wil je verder? Dan loopt dit naadloos over in een volledig advies of keuring.',
      },
    ],
    benefits: [
      'Een deskundige blik zonder een volledig traject',
      'Antwoord op basis van feiten, niet van verkooppraat',
      'Inzicht in zwakke plekken en slimme opties per model',
      'Snel duidelijkheid wanneer je twijfelt tussen opties',
    ],
    ctaTitle: 'Zit je met een concrete autovraag?',
    metaTitle: 'Technische consultatie voor autokopers',
    metaDescription:
      'Een losse, inhoudelijke vraag over een model, motor of uitvoering? Wij geven een onderbouwd antwoord op basis van ervaring en marktdata, ook zonder volledig traject.',
  },
  {
    slug: 'ev-hybride-advies',
    title: 'EV & hybride advies',
    shortBody:
      'Twijfel je over elektrisch of hybride? Wij rekenen accugezondheid, actieradius, laadmogelijkheden en kosten per jaar eerlijk voor je door.',
    image: '/images/tesla-hero.webp',
    tagline: 'Elektrisch rijden zonder dure verrassingen',
    intro:
      'Elektrisch en hybride rijden klinkt eenvoudig, tot je in de cijfers duikt. De actieradius op papier is zelden de actieradius op de snelweg in de winter, en het accupakket is de duurste component van de hele auto. Wij maken die wereld voor je inzichtelijk.',
    sections: [
      {
        heading: 'Wat houdt het in?',
        paragraphs: [
          'We meten en beoordelen de gezondheid van het accupakket, zodat je weet hoeveel capaciteit er werkelijk over is en niet afgaat op de beloftes van de verkoper. Bij een occasion is dat het verschil tussen een koopje en een kostbare misser.',
          'We rekenen de werkelijke actieradius voor jouw situatie door en bekijken of laden thuis en onderweg praktisch haalbaar is. Stadsritten, woon-werkverkeer en lange vakanties vragen elk om een andere afweging.',
          'Tot slot zetten we de totale kosten per jaar op een rij: verbruik, laden, onderhoud, verzekering en restwaarde. Zo kies je tussen benzine, hybride en volledig elektrisch op basis van cijfers, niet van onderbuikgevoel.',
        ],
      },
    ],
    steps: [
      {
        title: 'Jouw rijprofiel',
        body: 'We brengen je ritten, laadmogelijkheden en wensen in kaart.',
      },
      {
        title: 'Accu & techniek',
        body: 'We meten de accugezondheid en beoordelen de werkelijke actieradius.',
      },
      {
        title: 'Kostenplaatje',
        body: 'We rekenen de totale kosten per jaar eerlijk voor je door.',
      },
      {
        title: 'Advies',
        body: 'Je krijgt een helder advies: elektrisch, hybride of toch benzine.',
      },
    ],
    benefits: [
      'Inzicht in de werkelijke accugezondheid en capaciteit',
      'Een eerlijke actieradius voor jouw dagelijkse ritten',
      'Totale kosten per jaar helder op een rij',
      'Vijf jaar ervaring met elektrisch en hybride',
    ],
    ctaTitle: 'Klaar voor de overstap naar elektrisch?',
    metaTitle: 'EV & hybride advies',
    metaDescription:
      'Onafhankelijk advies over elektrisch en hybride: accugezondheid, werkelijke actieradius, laadmogelijkheden en kosten per jaar. Rijd elektrisch zonder dure verrassingen.',
  },
]

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
