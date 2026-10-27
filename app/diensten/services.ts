import type { PackageTier } from '../lib/pakketten'

/*
 * Shared service data. Used by the homepage service cards and the diensten
 * panels (title, shortBody, image) and by the informational detail pages at
 * /diensten/[slug]. Diensten worden niet los verkocht: elke dienst is
 * onderdeel van één of meer pakketten (zie `packages`).
 * Keep shortBody in sync with the homepage card copy.
 */

export interface ServiceStep {
  title: string
  body: string
}

export interface Service {
  slug: string
  title: string
  shortBody: string
  image: string
  /* Detail page */
  /** Hero h1 split over two lines; the last line renders in bronze. */
  heroLines: string[]
  tagline: string
  /** Second photo, used beside "Wat houdt het in". */
  detailImage: string
  detailImageAlt: string
  headline: string[]
  intro: string
  paragraphs: string[]
  points: string[]
  steps: ServiceStep[]
  /** Pakketten waar deze dienst in zit. */
  packages: PackageTier[]
  packageNote: string
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
    heroLines: ['Persoonlijke', 'autoselectie'],
    tagline:
      'De juiste auto begint bij de juiste vragen. Zo vinden we de auto die bij jouw leven past, niet bij een aanbieding.',
    detailImage: '/images/kenmerken/advies.webp',
    detailImageAlt: 'Adviseur van Telesto Motors neemt met een klant de opties door naast een auto',
    headline: ['Een auto die', 'bij je leven past'],
    intro:
      'Een auto kopen draait niet om de mooiste advertentie, maar om een keuze die jaren later nog klopt. Daarom begint elk traject bij Telesto Motors met jouw situatie, niet met een merk, een model of een aanbieding.',
    paragraphs: [
      'We starten met een open gesprek over hoe je rijdt, wat je vervoert en waar je auto aan moet voldoen. Woon-werkverkeer vraagt om iets anders dan lange vakantieritten of een gezin met drie kinderstoelen. Pas als dat beeld helder is, gaan we zoeken.',
      'Omdat we geen voorraad hebben en aan geen enkel merk of dealer verbonden zijn, kijken we puur naar wat voor jou het verstandigst is: comfort, betrouwbaarheid, verbruik en restwaarde.',
    ],
    points: [
      'Onafhankelijk, zonder merkbinding',
      'Afgestemd op vandaag én over vijf jaar',
      'Werkelijke kosten, niet alleen de aanschafprijs',
      'Wij doen het zoekwerk, jij houdt de regie',
    ],
    steps: [
      {
        title: 'Kennismaking',
        body: 'We brengen jouw wensen, budget en rijgedrag in kaart tijdens een persoonlijk gesprek.',
      },
      {
        title: 'Marktanalyse',
        body: 'We doorzoeken het volledige aanbod, particulier en zakelijk, binnen en buiten Nederland.',
      },
      {
        title: 'Shortlist op maat',
        body: 'Je ziet een overzichtelijke selectie met de voor- en nadelen per auto helder naast elkaar.',
      },
      {
        title: 'Samen kiezen',
        body: 'We bespreken de shortlist samen, zodat je met een gerust hart de juiste keuze maakt.',
      },
    ],
    packages: ['Elite', 'Deluxe', 'Excellent'],
    packageNote:
      'Autoselectie is de basis van elk traject en zit daarom in alle drie de pakketten.',
    metaTitle: 'Persoonlijke autoselectie',
    metaDescription:
      'Zo vindt Telesto Motors objectief de auto die past bij jouw leven, wensen en budget. Onafhankelijk, zonder merkbinding, onderdeel van elk pakket.',
  },
  {
    slug: 'technische-keuring',
    title: 'Technische keuring',
    shortBody:
      'Elk voertuig wordt grondig gekeurd voor aankoop. Zo weet je precies wat je koopt en kom je nooit voor verrassingen te staan.',
    image: '/images/car-2.webp',
    heroLines: ['Technische', 'keuring'],
    tagline:
      'Weten wat je koopt, vóór je betaalt. Zo brengen we de werkelijke staat van een auto in kaart.',
    detailImage: '/images/kenmerken/aankoopkeuring.webp',
    detailImageAlt: 'Technicus leest met een tablet de motor van een auto uit tijdens een aankoopkeuring',
    headline: ['Wat de foto', 'niet laat zien'],
    intro:
      "Een occasion ziet er op foto's altijd perfect uit. Wat er echt speelt, zit onder de motorkap, in de boordcomputer en in de onderhoudshistorie. Met een grondige keuring brengen we dat in kaart, nog vóór er een handtekening onder de koop staat.",
    paragraphs: [
      'We controleren de auto van bumper tot bumper: motor, transmissie, remmen, ophanging, banden, elektronica en carrosserie. Foutcodes lezen we uit en de kilometerstand leggen we naast de onderhoudshistorie.',
      "Bij elektrische en hybride auto's kijken we extra naar het accupakket, vaak de duurste component van de auto. De uitkomst leggen we vast in een helder rapport met een eerlijk oordeel.",
    ],
    points: [
      'Geen verborgen gebreken achteraf',
      'Feiten op papier als basis voor de onderhandeling',
      'Extra accucheck bij elektrisch en hybride',
      'Een eerlijk go of no-go, zonder verkooppraat',
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
        title: 'Rapport & oordeel',
        body: 'Je krijgt een duidelijk overzicht met onze conclusie en een eerlijk koopadvies.',
      },
    ],
    packages: ['Excellent'],
    packageNote:
      'De technische keuring is onderdeel van Telesto Excellent, het pakket waarin we de aankoop volledig voor je regelen.',
    metaTitle: 'Technische keuring',
    metaDescription:
      'Hoe Telesto Motors een auto vóór aankoop keurt: motor, elektronica, historie en accugezondheid. Onderdeel van het pakket Telesto Excellent.',
  },
  {
    slug: 'prijsonderhandeling',
    title: 'Prijsonderhandeling',
    shortBody:
      'Wij onderhandelen namens jou de scherpste prijs en voorwaarden. Jij profiteert van onze kennis van de markt.',
    image: '/images/car-3.webp',
    heroLines: ['Prijs-', 'onderhandeling'],
    tagline:
      'Nooit meer betalen dan een auto waard is. Zo zetten we onze marktkennis in voor de scherpste deal.',
    detailImage: '/images/kenmerken/beste-deal.webp',
    detailImageAlt: 'De autosleutel wordt overhandigd boven de motorkap van een auto',
    headline: ['De vraagprijs is', 'zelden de echte prijs'],
    intro:
      'Wie de markt kent, de zwakke plekken van een auto ziet en weet hoe een verkoper denkt, betaalt structureel minder. Die kennis zetten we volledig in jouw belang in.',
    paragraphs: [
      'Eerst bepalen we wat de auto werkelijk waard is, op basis van actuele marktdata en vergelijkbare occasions. Elk minpunt, van een naderende onderhoudsbeurt tot gebruikssporen, is een argument.',
      'Daarna voeren wij het gesprek: zakelijk, zonder haast en zonder emotie. Niet alleen over de prijs, maar ook over garantie, een verse onderhoudsbeurt of nieuwe banden.',
    ],
    points: [
      'Een scherpere prijs dan je zelf zou bedingen',
      'Onderhandelen zonder stress of emotie',
      'Ook betere voorwaarden, niet alleen een lager bedrag',
      'Een professional die aan jouw kant staat',
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
    packages: ['Deluxe', 'Excellent'],
    packageNote:
      'Screening en onderhandeling zitten in Telesto Deluxe en Telesto Excellent. Bij Excellent onderhandelen we ook op basis van de uitkomst van de technische keuring.',
    metaTitle: 'Prijsonderhandeling',
    metaDescription:
      'Zo onderhandelt Telesto Motors namens jou de scherpste prijs én de beste voorwaarden. Onderdeel van de pakketten Deluxe en Excellent.',
  },
  {
    slug: 'aankoopbegeleiding',
    title: 'Flexibele begeleiding',
    shortBody:
      'Online of op locatie: wij begeleiden je door het hele aankooptraject, van de eerste vraag tot de proefrit en de overdracht van de sleutels.',
    image: '/images/over-ons.jpg',
    heroLines: ['Flexibele', 'begeleiding'],
    tagline:
      'Eén vast aanspreekpunt, het hele traject lang. Online wanneer het snel moet, in persoon wanneer het telt.',
    detailImage: '/images/diensten/intro.jpg',
    detailImageAlt: 'Adviseur van Telesto Motors bespreekt met een klant de opties op een tablet',
    headline: ['Online of op locatie,', 'in jouw tempo'],
    intro:
      'Een auto kopen is zelden één moment. Het is een reeks beslissingen, vragen en twijfels die zich over weken kan uitspreiden. Wij lopen dat traject met je mee, op de manier die bij jou past.',
    paragraphs: [
      'Je hebt één vast aanspreekpunt dat je zoektocht van begin tot eind kent. Geen wisselende contactpersonen en geen verhaal dat je telkens opnieuw moet vertellen.',
      'Hoe ver de begeleiding gaat, hangt af van je pakket. Bij volledige ontzorging lopen we ook de proefrit, de papieren en de koopovereenkomst met je na, tot de sleutels in jouw hand liggen.',
    ],
    points: [
      'Eén vast aanspreekpunt gedurende het traject',
      'Online of op locatie, wat jou het beste uitkomt',
      "Ook 's avonds bereikbaar, voor wie overdag werkt",
      'Altijd helder waar je staat en wat er volgt',
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
    packages: ['Elite', 'Deluxe', 'Excellent'],
    packageNote:
      'Begeleiding zit in elk pakket en groeit mee: van gericht advies bij Elite tot begeleiding tot en met de overdracht bij Excellent.',
    metaTitle: 'Flexibele begeleiding bij autoaankoop',
    metaDescription:
      'Zo begeleidt Telesto Motors je online of op locatie door het aankooptraject, met één vast aanspreekpunt. Onderdeel van elk pakket.',
  },
  {
    slug: 'technische-consultatie',
    title: 'Technische consultatie',
    shortBody:
      'Een inhoudelijke vraag over een model, motor of uitvoering? Je krijgt een onderbouwd antwoord op basis van ervaring en actuele marktkennis.',
    image: '/images/hero-bmw.jpg',
    heroLines: ['Technische', 'consultatie'],
    tagline:
      'Inhoudelijke vragen, een onderbouwd antwoord. Zo kijken we verder dan de folder.',
    detailImage: '/images/kenmerken/veelzijdig.webp',
    detailImageAlt: 'Telefoon met een auto op het scherm, autosleutel en een kop koffie op tafel',
    headline: ['Verder kijken', 'dan de folder'],
    intro:
      'Is deze motor betrouwbaar op termijn? Wat is een verstandige kilometerstand? Welke uitvoering houdt zijn waarde? Tijdens je traject kun je dit soort vragen altijd aan ons voorleggen.',
    paragraphs: [
      'We beantwoorden ze op basis van ervaring, bekende zwakke plekken en actuele marktinformatie. Zo weet je welke opties de moeite waard zijn en welke vooral mooi staan op papier.',
      'Handig als je twijfelt tussen twee modellen, of als je bij een specifieke auto wilt weten waar je écht op moet letten voordat je verdergaat.',
    ],
    points: [
      'Een deskundige blik op model, motor en uitvoering',
      'Antwoorden op basis van feiten, niet van verkooppraat',
      'Inzicht in zwakke plekken en slimme opties',
      'Snel duidelijkheid als je twijfelt tussen opties',
    ],
    steps: [
      {
        title: 'Je vraag',
        body: 'Je legt het model, de uitvoering en wat je precies wilt weten aan ons voor.',
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
        title: 'Verwerkt in je advies',
        body: 'Het antwoord nemen we mee in de selectie, zodat elke keuze op feiten rust.',
      },
    ],
    packages: ['Elite', 'Deluxe', 'Excellent'],
    packageNote:
      'Technische vragen beantwoorden we binnen elk pakket, als onderdeel van het onafhankelijke auto-advies.',
    metaTitle: 'Technische consultatie voor autokopers',
    metaDescription:
      'Vragen over een model, motor of uitvoering beantwoordt Telesto Motors onderbouwd, op basis van ervaring en marktdata. Onderdeel van elk pakket.',
  },
  {
    slug: 'ev-hybride-advies',
    title: 'EV & hybride advies',
    shortBody:
      'Twijfel je over elektrisch of hybride? Wij rekenen accugezondheid, actieradius, laadmogelijkheden en kosten per jaar eerlijk voor je door.',
    image: '/images/tesla-hero.webp',
    heroLines: ['EV & hybride', 'advies'],
    tagline:
      'Elektrisch rijden zonder dure verrassingen. Zo maken we de keuze inzichtelijk, met cijfers in plaats van beloftes.',
    detailImage: '/images/over-ons/band-ev.jpg',
    detailImageAlt: 'Een elektrische auto geparkeerd in de avond',
    headline: ['Elektrisch, hybride', 'of toch benzine?'],
    intro:
      'De actieradius op papier is zelden de actieradius op de snelweg in de winter, en het accupakket is de duurste component van de auto. Wij maken elektrisch en hybride rijden inzichtelijk.',
    paragraphs: [
      'We rekenen de werkelijke actieradius voor jouw situatie door en kijken of laden thuis en onderweg praktisch haalbaar is. Stadsritten, woon-werkverkeer en lange vakanties vragen elk om een andere afweging.',
      'Daarnaast zetten we de totale kosten per jaar op een rij: verbruik, laden, onderhoud, verzekering en restwaarde. Zo kies je op basis van feiten, niet van onderbuikgevoel.',
    ],
    points: [
      'Een eerlijke actieradius voor jouw dagelijkse ritten',
      'Laadmogelijkheden thuis en onderweg in kaart',
      'Totale kosten per jaar helder op een rij',
      'Gespecialiseerd in elektrisch en hybride sinds 2019',
    ],
    steps: [
      {
        title: 'Jouw rijprofiel',
        body: 'We brengen je ritten, laadmogelijkheden en wensen in kaart.',
      },
      {
        title: 'Actieradius & laden',
        body: 'We rekenen door wat de auto in jouw situatie werkelijk haalt en hoe je laadt.',
      },
      {
        title: 'Kostenplaatje',
        body: 'We zetten de totale kosten per jaar eerlijk naast elkaar.',
      },
      {
        title: 'Advies',
        body: 'Je krijgt een helder advies: elektrisch, hybride of toch benzine.',
      },
    ],
    packages: ['Elite', 'Deluxe', 'Excellent'],
    packageNote:
      'EV- en hybride-advies hoort bij het auto-advies in elk pakket. Een meting van de accugezondheid is onderdeel van de technische keuring in Telesto Excellent.',
    metaTitle: 'EV & hybride advies',
    metaDescription:
      'Zo helpt Telesto Motors je kiezen tussen elektrisch, hybride en benzine: werkelijke actieradius, laden en kosten per jaar. Onderdeel van elk pakket.',
  },
]

export function getService(slug: string): Service | undefined {
  return SERVICES.find((s) => s.slug === slug)
}
