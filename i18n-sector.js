// SECTOR PAGE INTERNATIONALIZATION
// Translations for vastgoed.html, verzekeringen.html, autodealers.html

const TRANSLATIONS = {
  nl: {
    // Navigation
    "nav.services": "Services",
    "nav.industries": "Sectoren",
    "nav.contact": "Contact",

    // Sector Switcher
    "switcher.realestate": "Vastgoed",
    "switcher.insurance": "Verzekeringen",
    "switcher.automotive": "Autohandelaars",

    // Mobile CTA
    "mobile.cta": "Plan een gratis gesprek",

    // === REAL ESTATE ===
    "realestate.hero.title": "Gebouwd voor vastgoedkantoren.",
    "realestate.hero.subtitle": "Automatisering bovenop uw bestaande CRM. Directe reactie op leads van Immoweb en Zimmo, automatische opvolging van bezichtigingen. Geen nieuwe tools. Geen handmatig werk.",
    "realestate.hero.cta": "Plan een gratis gesprek",

    "realestate.mockup.title": "Leads vandaag",
    "realestate.mockup.new": "Nieuw",
    "realestate.mockup.answered": "Beantwoord",
    "realestate.mockup.viewings": "Bezichtigingen",
    "realestate.mockup.followup": "Opvolging",

    "realestate.trust": "Werkt naast Whise, Omnicasa, Zabun. U hoeft niet te switchen.",

    "realestate.problems.title": "Herkenbare problemen voor vastgoedkantoren",
    "realestate.problems.item1": "Leads pilen zich op tijdens bezichtigingen",
    "realestate.problems.item2": "Te trage reactie = gemiste kansen",
    "realestate.problems.item3": "Follow-ups worden vergeten",
    "realestate.problems.item4": "Data handmatig overnemen uit mails",

    "realestate.solution.title": "Wat wij bouwen voor u",
    "realestate.solution.intro": "Automatisering die werkt bovenop uw CRM. Geen nieuwe tool om te leren.",
    "realestate.solution.card1.title": "Directe reactie op leads",
    "realestate.solution.card1.desc": "Immoweb, Zimmo, website: elke lead krijgt binnen 2 minuten een automatisch antwoord.",
    "realestate.solution.card2.title": "Automatische opvolging",
    "realestate.solution.card2.desc": "Herinneringen, bevestigingen, follow-ups: alles automatisch op de juiste momenten.",
    "realestate.solution.card3.title": "Verbonden met uw CRM",
    "realestate.solution.card3.desc": "Leads en afspraken automatisch in Whise, Omnicasa of Zabun. Niets handmatig overnemen.",

    "realestate.workflow.title": "Hoe het werkt",
    "realestate.workflow.step1": "Lead van Immoweb/Zimmo",
    "realestate.workflow.step2": "Direct automatisch antwoord",
    "realestate.workflow.step3": "Opvolging & herinnering",
    "realestate.workflow.step4": "Bezichtiging gepland",
    "realestate.workflow.step5": "Automatisch in uw CRM",

    "realestate.video.title": "Bekijk hoe het werkt",
    "realestate.video.intro": "Een kort overzicht van automatisering voor vastgoedkantoren.",

    // === INSURANCE ===
    "insurance.hero.title": "Gebouwd voor verzekeringskantoren.",
    "insurance.hero.subtitle": "Directe reactie op offerteaanvragen, automatische opvolging van polissen en tijdige herinneringen voor verlengingen. Geen handmatig werk.",
    "insurance.hero.cta": "Plan een gratis gesprek",

    "insurance.mockup.title": "Offertes vandaag",
    "insurance.mockup.new": "Offertes",
    "insurance.mockup.answered": "Beantwoord",
    "insurance.mockup.policies": "Polissen",
    "insurance.mockup.followup": "Follow-up",

    "insurance.trust": "Werkt naast uw bestaande verzekeringsplatform. U hoeft niet te switchen.",

    "insurance.problems.title": "Herkenbare problemen voor verzekeringskantoren",
    "insurance.problems.item1": "Offerteaanvragen blijven liggen tijdens het seizoen",
    "insurance.problems.item2": "Te trage reactie = klant gaat naar concurrent",
    "insurance.problems.item3": "Verlengingen worden vergeten tot het te laat is",
    "insurance.problems.item4": "Klantgegevens handmatig overnemen uit mails",

    "insurance.solution.title": "Wat wij bouwen voor u",
    "insurance.solution.intro": "Automatisering die werkt naast uw bestaande systeem. Geen nieuwe tool om te leren.",
    "insurance.solution.card1.title": "Directe reactie op aanvragen",
    "insurance.solution.card1.desc": "Elke offerteaanvraag krijgt binnen 2 minuten een automatisch antwoord met eerste informatie.",
    "insurance.solution.card2.title": "Automatische verlengingen",
    "insurance.solution.card2.desc": "Herinneringen voor polissen die verlopen, automatisch naar klant én kantoor op tijd.",
    "insurance.solution.card3.title": "Opvolging van offertes",
    "insurance.solution.card3.desc": "Automatische follow-up zodat geen enkele offerte wordt vergeten. Alles op het juiste moment.",

    "insurance.workflow.title": "Hoe het werkt",
    "insurance.workflow.step1": "Offerteaanvraag binnenkomst",
    "insurance.workflow.step2": "Direct automatisch antwoord",
    "insurance.workflow.step3": "Opvolging & herinnering",
    "insurance.workflow.step4": "Polis afgesloten",
    "insurance.workflow.step5": "Automatische verlenging",

    // === AUTOMOTIVE ===
    "automotive.hero.title": "Gebouwd voor autodealers.",
    "automotive.hero.subtitle": "Directe reactie op testritaanvragen van AutoScout24 en 2dehands, automatische planning en opvolging van inruilwagens. Geen handmatig werk.",
    "automotive.hero.cta": "Plan een gratis gesprek",

    "automotive.mockup.title": "Testritten vandaag",
    "automotive.mockup.new": "Testritten",
    "automotive.mockup.answered": "Beantwoord",
    "automotive.mockup.scheduled": "Ingepland",
    "automotive.mockup.followup": "Inruil",

    "automotive.trust": "Werkt met leads van AutoScout24, 2dehands en uw website. Direct verwerkt.",

    "automotive.problems.title": "Herkenbare problemen voor autodealers",
    "automotive.problems.item1": "Testritaanvragen blijven liggen buiten kantooruren",
    "automotive.problems.item2": "Te trage reactie = klant rijdt bij concurrent",
    "automotive.problems.item3": "Inruilwagens worden niet opgevolgd",
    "automotive.problems.item4": "Klantgegevens handmatig overnemen uit platformen",

    "automotive.solution.title": "Wat wij bouwen voor u",
    "automotive.solution.intro": "Automatisering die werkt met AutoScout24 en 2dehands. Direct verwerkt in uw systeem.",
    "automotive.solution.card1.title": "Directe reactie op aanvragen",
    "automotive.solution.card1.desc": "Elke testritaanvraag krijgt binnen 2 minuten een automatisch antwoord met beschikbaarheid.",
    "automotive.solution.card2.title": "Automatische planning",
    "automotive.solution.card2.desc": "Testritten automatisch ingepland, bevestigingen en herinneringen naar klant gestuurd.",
    "automotive.solution.card3.title": "Opvolging inruilwagens",
    "automotive.solution.card3.desc": "Automatische herinneringen en waardering voor klanten met een inruilwagen. Geen gemiste kansen.",

    "automotive.workflow.title": "Hoe het werkt",
    "automotive.workflow.step1": "Aanvraag van AutoScout24/2dehands",
    "automotive.workflow.step2": "Direct automatisch antwoord",
    "automotive.workflow.step3": "Testrit ingepland",
    "automotive.workflow.step4": "Klant komt proefrijden",
    "automotive.workflow.step5": "Automatische follow-up",

    // === SHARED PROCESS SECTION ===
    "process.title": "Van gesprek tot werkende oplossing",
    "process.step1.title": "Begrijpen",
    "process.step1.description": "We leren hoe uw kantoor momenteel werkt en waar tijd verloren gaat.",
    "process.step2.title": "Ontwerpen",
    "process.step2.description": "We brengen de workflow in kaart en ontwerpen de automatisering.",
    "process.step3.title": "Bouwen",
    "process.step3.description": "We ontwikkelen de software en verbinden met uw bestaande tools.",
    "process.step4.title": "Lanceren",
    "process.step4.description": "We implementeren alles en helpen u op weg.",

    // === SHARED CTA SECTION ===
    "cta.title": "Klaar om leads sneller te beantwoorden?",
    "cta.text": "Vertel ons hoe uw kantoor werkt. We tonen waar automatisering tijd bespaart.",
    "cta.button": "Plan een gratis gesprek",

    // === SHARED CONTACT SECTION ===
    "contact.title": "Laten we praten over uw kantoor",
    "contact.intro": "Vertel ons wat te veel tijd kost, en wij tonen hoe automatisering kan helpen.",
    "contact.email.title": "E-mail",
    "contact.linkedin.title": "LinkedIn",
    "contact.form.name": "Naam *",
    "contact.form.company": "Bedrijf *",
    "contact.form.email": "E-mail *",
    "contact.form.phone": "Telefoon",
    "contact.form.message": "Wat kost u het meeste tijd? *",
    "contact.form.submit": "Bericht versturen",

    // === SHARED FOOTER ===
    "footer.tagline": "Software op maat. Slimmere workflows.",
    "footer.sectors": "Sectoren",
    "footer.company": "Bedrijf",
    "footer.home": "Home",
    "footer.services": "Diensten",
    "footer.contact": "Contact"
  },

  en: {
    // Navigation
    "nav.services": "Services",
    "nav.industries": "Industries",
    "nav.contact": "Contact",

    // Sector Switcher
    "switcher.realestate": "Real Estate",
    "switcher.insurance": "Insurance",
    "switcher.automotive": "Car Dealerships",

    // Mobile CTA
    "mobile.cta": "Schedule a free call",

    // === REAL ESTATE ===
    "realestate.hero.title": "Built for real estate agencies.",
    "realestate.hero.subtitle": "Automation on top of your existing CRM. Instant response to leads from Immoweb and Zimmo, automatic follow-up of viewings. No new tools. No manual work.",
    "realestate.hero.cta": "Schedule a free call",

    "realestate.mockup.title": "Leads today",
    "realestate.mockup.new": "New",
    "realestate.mockup.answered": "Answered",
    "realestate.mockup.viewings": "Viewings",
    "realestate.mockup.followup": "Follow-up",

    "realestate.trust": "Works alongside Whise, Omnicasa, Zabun. You don't need to switch.",

    "realestate.problems.title": "Common challenges for real estate agencies",
    "realestate.problems.item1": "Leads pile up during viewings",
    "realestate.problems.item2": "Slow response = missed opportunities",
    "realestate.problems.item3": "Follow-ups get forgotten",
    "realestate.problems.item4": "Manually copying data from emails",

    "realestate.solution.title": "What we build for you",
    "realestate.solution.intro": "Automation that works on top of your CRM. No new tool to learn.",
    "realestate.solution.card1.title": "Instant lead response",
    "realestate.solution.card1.desc": "Immoweb, Zimmo, website: every lead gets an automatic response within 2 minutes.",
    "realestate.solution.card2.title": "Automatic follow-up",
    "realestate.solution.card2.desc": "Reminders, confirmations, follow-ups: everything automatic at the right moments.",
    "realestate.solution.card3.title": "Connected to your CRM",
    "realestate.solution.card3.desc": "Leads and appointments automatically in Whise, Omnicasa or Zabun. Nothing manual.",

    "realestate.workflow.title": "How it works",
    "realestate.workflow.step1": "Lead from Immoweb/Zimmo",
    "realestate.workflow.step2": "Instant automatic response",
    "realestate.workflow.step3": "Follow-up & reminder",
    "realestate.workflow.step4": "Viewing scheduled",
    "realestate.workflow.step5": "Automatically in your CRM",

    "realestate.video.title": "See how it works",
    "realestate.video.intro": "A quick overview of automation for real estate offices.",

    // === INSURANCE ===
    "insurance.hero.title": "Built for insurance agencies.",
    "insurance.hero.subtitle": "Instant response to quote requests, automatic policy follow-up and timely renewal reminders. No manual work.",
    "insurance.hero.cta": "Schedule a free call",

    "insurance.mockup.title": "Quotes today",
    "insurance.mockup.new": "Quotes",
    "insurance.mockup.answered": "Answered",
    "insurance.mockup.policies": "Policies",
    "insurance.mockup.followup": "Follow-up",

    "insurance.trust": "Works alongside your existing insurance platform. You don't need to switch.",

    "insurance.problems.title": "Common challenges for insurance agencies",
    "insurance.problems.item1": "Quote requests pile up during busy season",
    "insurance.problems.item2": "Slow response = client goes to competitor",
    "insurance.problems.item3": "Renewals forgotten until it's too late",
    "insurance.problems.item4": "Manually copying client data from emails",

    "insurance.solution.title": "What we build for you",
    "insurance.solution.intro": "Automation that works alongside your existing system. No new tool to learn.",
    "insurance.solution.card1.title": "Instant response to requests",
    "insurance.solution.card1.desc": "Every quote request gets an automatic response within 2 minutes with initial information.",
    "insurance.solution.card2.title": "Automatic renewals",
    "insurance.solution.card2.desc": "Reminders for expiring policies, automatically to both client and agency on time.",
    "insurance.solution.card3.title": "Quote follow-up",
    "insurance.solution.card3.desc": "Automatic follow-up so no quote is forgotten. Everything at the right moment.",

    "insurance.workflow.title": "How it works",
    "insurance.workflow.step1": "Quote request received",
    "insurance.workflow.step2": "Instant automatic response",
    "insurance.workflow.step3": "Follow-up & reminder",
    "insurance.workflow.step4": "Policy closed",
    "insurance.workflow.step5": "Automatic renewal",

    // === AUTOMOTIVE ===
    "automotive.hero.title": "Built for car dealerships.",
    "automotive.hero.subtitle": "Instant response to test drive requests from AutoScout24 and 2dehands, automatic scheduling and trade-in follow-up. No manual work.",
    "automotive.hero.cta": "Schedule a free call",

    "automotive.mockup.title": "Test drives today",
    "automotive.mockup.new": "Test drives",
    "automotive.mockup.answered": "Answered",
    "automotive.mockup.scheduled": "Scheduled",
    "automotive.mockup.followup": "Trade-in",

    "automotive.trust": "Works with leads from AutoScout24, 2dehands and your website. Processed instantly.",

    "automotive.problems.title": "Common challenges for car dealerships",
    "automotive.problems.item1": "Test drive requests pile up after hours",
    "automotive.problems.item2": "Slow response = client goes to competitor",
    "automotive.problems.item3": "Trade-ins not followed up",
    "automotive.problems.item4": "Manually copying client data from platforms",

    "automotive.solution.title": "What we build for you",
    "automotive.solution.intro": "Automation that works with AutoScout24 and 2dehands. Processed directly into your system.",
    "automotive.solution.card1.title": "Instant response to requests",
    "automotive.solution.card1.desc": "Every test drive request gets an automatic response within 2 minutes with availability.",
    "automotive.solution.card2.title": "Automatic scheduling",
    "automotive.solution.card2.desc": "Test drives automatically scheduled, confirmations and reminders sent to client.",
    "automotive.solution.card3.title": "Trade-in follow-up",
    "automotive.solution.card3.desc": "Automatic reminders and valuation for clients with a trade-in. No missed opportunities.",

    "automotive.workflow.title": "How it works",
    "automotive.workflow.step1": "Request from AutoScout24/2dehands",
    "automotive.workflow.step2": "Instant automatic response",
    "automotive.workflow.step3": "Test drive scheduled",
    "automotive.workflow.step4": "Client comes for test drive",
    "automotive.workflow.step5": "Automatic follow-up",

    // === SHARED PROCESS SECTION ===
    "process.title": "From conversation to working solution",
    "process.step1.title": "Understand",
    "process.step1.description": "We learn how your agency currently works and where time is wasted.",
    "process.step2.title": "Design",
    "process.step2.description": "We map out the workflow and design the automation.",
    "process.step3.title": "Build",
    "process.step3.description": "We develop the software and connect with your existing tools.",
    "process.step4.title": "Launch",
    "process.step4.description": "We implement everything and help you get started.",

    // === SHARED CTA SECTION ===
    "cta.title": "Ready to respond to leads faster?",
    "cta.text": "Tell us how your agency works. We'll show you where automation saves time.",
    "cta.button": "Schedule a free call",

    // === SHARED CONTACT SECTION ===
    "contact.title": "Let's talk about your agency",
    "contact.intro": "Tell us what takes too much time, and we'll show you how automation can help.",
    "contact.email.title": "Email",
    "contact.linkedin.title": "LinkedIn",
    "contact.form.name": "Name *",
    "contact.form.company": "Company *",
    "contact.form.email": "Email *",
    "contact.form.phone": "Phone",
    "contact.form.message": "What takes most of your time? *",
    "contact.form.submit": "Send message",

    // === SHARED FOOTER ===
    "footer.tagline": "Custom software. Smarter workflows.",
    "footer.sectors": "Sectors",
    "footer.company": "Company",
    "footer.home": "Home",
    "footer.services": "Services",
    "footer.contact": "Contact"
  },

  fr: {
    // Navigation
    "nav.services": "Services",
    "nav.industries": "Secteurs",
    "nav.contact": "Contact",

    // Sector Switcher
    "switcher.realestate": "Immobilier",
    "switcher.insurance": "Assurances",
    "switcher.automotive": "Concessionnaires",

    // Mobile CTA
    "mobile.cta": "Planifier un appel gratuit",

    // === REAL ESTATE ===
    "realestate.hero.title": "Conçu pour les agences immobilières.",
    "realestate.hero.subtitle": "Automatisation au-dessus de votre CRM existant. Réponse immédiate aux leads d'Immoweb et Zimmo, suivi automatique des visites. Aucun nouvel outil. Aucun travail manuel.",
    "realestate.hero.cta": "Planifier un appel gratuit",

    "realestate.mockup.title": "Leads aujourd'hui",
    "realestate.mockup.new": "Nouveaux",
    "realestate.mockup.answered": "Répondus",
    "realestate.mockup.viewings": "Visites",
    "realestate.mockup.followup": "Suivi",

    "realestate.trust": "Fonctionne avec Whise, Omnicasa, Zabun. Vous n'avez pas besoin de changer.",

    "realestate.problems.title": "Défis courants pour les agences immobilières",
    "realestate.problems.item1": "Les leads s'accumulent pendant les visites",
    "realestate.problems.item2": "Réponse lente = opportunités manquées",
    "realestate.problems.item3": "Les suivis sont oubliés",
    "realestate.problems.item4": "Copie manuelle des données depuis les e-mails",

    "realestate.solution.title": "Ce que nous construisons pour vous",
    "realestate.solution.intro": "Automatisation qui fonctionne au-dessus de votre CRM. Aucun nouvel outil à apprendre.",
    "realestate.solution.card1.title": "Réponse immédiate aux leads",
    "realestate.solution.card1.desc": "Immoweb, Zimmo, site web : chaque lead reçoit une réponse automatique en 2 minutes.",
    "realestate.solution.card2.title": "Suivi automatique",
    "realestate.solution.card2.desc": "Rappels, confirmations, suivis : tout automatique aux bons moments.",
    "realestate.solution.card3.title": "Connecté à votre CRM",
    "realestate.solution.card3.desc": "Leads et rendez-vous automatiquement dans Whise, Omnicasa ou Zabun. Rien de manuel.",

    "realestate.workflow.title": "Comment ça fonctionne",
    "realestate.workflow.step1": "Lead d'Immoweb/Zimmo",
    "realestate.workflow.step2": "Réponse automatique immédiate",
    "realestate.workflow.step3": "Suivi et rappel",
    "realestate.workflow.step4": "Visite planifiée",
    "realestate.workflow.step5": "Automatiquement dans votre CRM",

    "realestate.video.title": "Découvrez comment ça fonctionne",
    "realestate.video.intro": "Un aperçu rapide de l'automatisation pour les agences immobilières.",

    // === INSURANCE ===
    "insurance.hero.title": "Conçu pour les courtiers en assurances.",
    "insurance.hero.subtitle": "Réponse immédiate aux demandes de devis, suivi automatique des polices et rappels opportuns pour les renouvellements. Aucun travail manuel.",
    "insurance.hero.cta": "Planifier un appel gratuit",

    "insurance.mockup.title": "Offres aujourd'hui",
    "insurance.mockup.new": "Offres",
    "insurance.mockup.answered": "Répondues",
    "insurance.mockup.policies": "Polices",
    "insurance.mockup.followup": "Suivi",

    "insurance.trust": "Fonctionne avec votre plateforme d'assurance existante. Vous n'avez pas besoin de changer.",

    "insurance.problems.title": "Défis courants pour les courtiers en assurances",
    "insurance.problems.item1": "Les demandes de devis s'accumulent en haute saison",
    "insurance.problems.item2": "Réponse lente = le client va chez le concurrent",
    "insurance.problems.item3": "Renouvellements oubliés jusqu'à ce qu'il soit trop tard",
    "insurance.problems.item4": "Copie manuelle des données client depuis les e-mails",

    "insurance.solution.title": "Ce que nous construisons pour vous",
    "insurance.solution.intro": "Automatisation qui fonctionne avec votre système existant. Aucun nouvel outil à apprendre.",
    "insurance.solution.card1.title": "Réponse immédiate aux demandes",
    "insurance.solution.card1.desc": "Chaque demande de devis reçoit une réponse automatique en 2 minutes avec informations initiales.",
    "insurance.solution.card2.title": "Renouvellements automatiques",
    "insurance.solution.card2.desc": "Rappels pour polices qui expirent, automatiquement au client et au bureau à temps.",
    "insurance.solution.card3.title": "Suivi des offres",
    "insurance.solution.card3.desc": "Suivi automatique pour qu'aucune offre ne soit oubliée. Tout au bon moment.",

    "insurance.workflow.title": "Comment ça fonctionne",
    "insurance.workflow.step1": "Demande d'offre reçue",
    "insurance.workflow.step2": "Réponse automatique immédiate",
    "insurance.workflow.step3": "Suivi et rappel",
    "insurance.workflow.step4": "Police souscrite",
    "insurance.workflow.step5": "Renouvellement automatique",

    // === AUTOMOTIVE ===
    "automotive.hero.title": "Conçu pour les concessionnaires automobiles.",
    "automotive.hero.subtitle": "Réponse immédiate aux demandes d'essai d'AutoScout24 et 2dehands, planification automatique et suivi des reprises. Aucun travail manuel.",
    "automotive.hero.cta": "Planifier un appel gratuit",

    "automotive.mockup.title": "Essais aujourd'hui",
    "automotive.mockup.new": "Essais",
    "automotive.mockup.answered": "Répondus",
    "automotive.mockup.scheduled": "Planifiés",
    "automotive.mockup.followup": "Reprises",

    "automotive.trust": "Fonctionne avec les leads d'AutoScout24, 2dehands et votre site web. Traité instantanément.",

    "automotive.problems.title": "Défis courants pour les concessionnaires",
    "automotive.problems.item1": "Demandes d'essai s'accumulent hors heures d'ouverture",
    "automotive.problems.item2": "Réponse lente = le client va chez le concurrent",
    "automotive.problems.item3": "Reprises pas suivies",
    "automotive.problems.item4": "Copie manuelle des données depuis les plateformes",

    "automotive.solution.title": "Ce que nous construisons pour vous",
    "automotive.solution.intro": "Automatisation qui fonctionne avec AutoScout24 et 2dehands. Traité directement dans votre système.",
    "automotive.solution.card1.title": "Réponse immédiate aux demandes",
    "automotive.solution.card1.desc": "Chaque demande d'essai reçoit une réponse automatique en 2 minutes avec disponibilité.",
    "automotive.solution.card2.title": "Planification automatique",
    "automotive.solution.card2.desc": "Essais automatiquement planifiés, confirmations et rappels envoyés au client.",
    "automotive.solution.card3.title": "Suivi des reprises",
    "automotive.solution.card3.desc": "Rappels automatiques et évaluation pour clients avec une reprise. Aucune opportunité manquée.",

    "automotive.workflow.title": "Comment ça fonctionne",
    "automotive.workflow.step1": "Demande d'AutoScout24/2dehands",
    "automotive.workflow.step2": "Réponse automatique immédiate",
    "automotive.workflow.step3": "Essai planifié",
    "automotive.workflow.step4": "Client vient pour l'essai",
    "automotive.workflow.step5": "Suivi automatique",

    // === SHARED PROCESS SECTION ===
    "process.title": "De la conversation à la solution opérationnelle",
    "process.step1.title": "Comprendre",
    "process.step1.description": "Nous apprenons comment votre bureau fonctionne actuellement et où le temps est perdu.",
    "process.step2.title": "Concevoir",
    "process.step2.description": "Nous cartographions le flux de travail et concevons l'automatisation.",
    "process.step3.title": "Construire",
    "process.step3.description": "Nous développons le logiciel et le connectons avec vos outils existants.",
    "process.step4.title": "Lancer",
    "process.step4.description": "Nous mettons tout en place et vous aidons à démarrer.",

    // === SHARED CTA SECTION ===
    "cta.title": "Prêt à répondre plus vite aux leads ?",
    "cta.text": "Dites-nous comment votre bureau fonctionne. Nous vous montrerons où l'automatisation économise du temps.",
    "cta.button": "Planifier un appel gratuit",

    // === SHARED CONTACT SECTION ===
    "contact.title": "Parlons de votre bureau",
    "contact.intro": "Dites-nous ce qui prend trop de temps, et nous vous montrerons comment l'automatisation peut aider.",
    "contact.email.title": "E-mail",
    "contact.linkedin.title": "LinkedIn",
    "contact.form.name": "Nom *",
    "contact.form.company": "Entreprise *",
    "contact.form.email": "E-mail *",
    "contact.form.phone": "Téléphone",
    "contact.form.message": "Qu'est-ce qui vous prend le plus de temps ? *",
    "contact.form.submit": "Envoyer le message",

    // === SHARED FOOTER ===
    "footer.tagline": "Logiciels sur mesure. Flux de travail plus intelligents.",
    "footer.sectors": "Secteurs",
    "footer.company": "Entreprise",
    "footer.home": "Accueil",
    "footer.services": "Services",
    "footer.contact": "Contact"
  }
};

// Initialize i18n
let currentLanguage = 'nl';

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) {
    console.warn(`Language ${lang} not found, defaulting to nl`);
    lang = 'nl';
  }
  
  currentLanguage = lang;
  
  // Update all elements with data-i18n-sector attribute
  document.querySelectorAll('[data-i18n-sector]').forEach(element => {
    const key = element.getAttribute('data-i18n-sector');
    const translation = TRANSLATIONS[lang][key];
    
    if (translation) {
      // Handle different element types
      if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
        if (element.placeholder) {
          element.placeholder = translation;
        }
      } else {
        element.textContent = translation;
      }
    } else {
      console.warn(`Translation missing for key: ${key} in language: ${lang}`);
    }
  });
  
  // Update active language button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    const btnLang = btn.getAttribute('data-lang');
    if (btnLang === lang) {
      btn.classList.add('active');
      btn.setAttribute('aria-pressed', 'true');
    } else {
      btn.classList.remove('active');
      btn.setAttribute('aria-pressed', 'false');
    }
  });
  
  // Save preference
  localStorage.setItem('preferred-language', lang);
  
  // Update HTML lang attribute
  document.documentElement.lang = lang;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
  // Check for saved preference
  const savedLang = localStorage.getItem('preferred-language') || 'nl';
  setLanguage(savedLang);
  
  // Add click handlers to language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.getAttribute('data-lang');
      setLanguage(lang);
    });
  });
});
