// Curated editorial profiles, not verified market research or client projects.
// Each profile owns a stable public slug and a fictional concept derived from a design family.
export const professions = [
 {slug:'dentists',name:'Dental practices',group:'Health & wellbeing',family:'dental',brand:'Forma',descriptor:'DENTAL STUDIO',image:'dental',title:'A welcoming first visit starts online.',intro:'Help prospective patients understand your care, meet the practice and find a clear way to request their first appointment.',headline:'Your next visit.\nA little more comfort.',action:'Plan a first visit',services:['General dentistry','Preventive care','Smile consultations'],needs:[['A calmer first impression','Introduce the practice, the people and what a first visit involves.'],['Care that is easy to explore','Give treatments their own explanations, with clear next steps and no promises of outcomes.'],['A clear appointment path','Distinguish appointment requests from confirmed bookings and urgent enquiries.']],checks:['Can a new patient find your address and appointment information on a phone?','Are treatment descriptions understandable without specialist vocabulary?','Are practitioner details and patient information current?'],faq:['Can we keep our existing booking system?','Yes, the proposed scope can link to or integrate an existing provider where supported. The demo does not connect it.'],related:['medical-spas','medical-practices','chiropractors']},
 {slug:'medical-spas',name:'Medical spas',group:'Health & wellbeing',family:'spa',brand:'Aurelia',descriptor:'SKIN & WELLNESS',image:'spa',title:'A considered experience, before the consultation.',intro:'Let your environment, treatment information and practitioner introductions work together so visitors can make an informed next step.',headline:'Thoughtful care.\nSpace to feel yourself.',action:'Explore treatments',services:['Skin consultations','Treatment information','Aftercare guidance'],needs:[['Treatments with context','Explain who a consultation is for and what visitors should discuss with the practitioner.'],['An atmosphere people can feel','Use permissioned photography of your space, with a restrained palette and generous layouts.'],['Consultation before commitment','Give booking and enquiry options clear labels and set expectations for the next conversation.']],checks:['Does each treatment page explain the consultation step?','Are images permissioned and clearly described?','Can someone find the practitioner and contact details without opening a menu?'],faq:['Can the design feel more editorial?','Yes. Photography, typography and section order can create a calm editorial direction while keeping treatment and consultation information easy to find.'],related:['dentists','salons','medical-practices']},
 {slug:'plumbers',name:'Plumbers',group:'Home & trade services',family:'home',brand:'Evergreen',descriptor:'PLUMBING SERVICES',image:'home',title:'Be easy to find when the job cannot wait.',intro:'Make repairs, planned installations and service coverage clear. Help customers understand whether to call, request a visit or ask for a project estimate.',headline:'Good hands.\nA home that works.',action:'Request a service',services:['Plumbing repairs','Fixture installations','Planned maintenance'],needs:[['Urgent and planned work','Separate immediate enquiries from projects that need a scoped quote.'],['Coverage without guesswork','Publish the areas you actually serve and the hours your team can respond.'],['A useful request','Ask for the details needed to route a job, with a clear explanation of what happens next.']],checks:['Is the phone action easy to use on mobile?','Are service areas and response hours accurate?','Can someone distinguish repairs from installation work?'],faq:['Should we advertise emergency service?','Only if your business actually offers it. Hours, coverage and response expectations should reflect the service you can deliver.'],related:['hvac','electricians','landscapers']},
 {slug:'hvac',name:'Heating & cooling',group:'Home & trade services',family:'home',brand:'Northair',descriptor:'HEATING & COOLING',image:'home',title:'Comfort begins with a clearer next step.',intro:'Organize repair, replacement and maintenance around the questions homeowners have before they contact an HVAC company.',headline:'Comfort,\nin every season.',action:'Request a visit',services:['System repairs','Replacement planning','Maintenance visits'],needs:[['Find the right service','Separate breakdowns, new systems and routine maintenance.'],['Explain the process','Show what an assessment includes before discussing replacement options.'],['Keep practical details visible','Make coverage, contact hours and available appointment channels clear.']],checks:['Are repair and replacement requests distinct?','Can visitors find the systems you service?','Are maintenance inclusions explained in plain language?'],faq:['Can maintenance plans be shown separately?','Yes. A dedicated section can explain the allowance, exclusions and enquiry route once the actual plan terms are approved.'],related:['plumbers','electricians','landscapers']},
 {slug:'electricians',name:'Electricians',group:'Home & trade services',family:'home',brand:'Brightline',descriptor:'ELECTRICAL SERVICES',image:'home',title:'Clear expertise. A confident first call.',intro:'Help customers understand your residential or commercial services and share enough project information to start the right conversation.',headline:'Thoughtful work.\nBrighter spaces.',action:'Discuss a project',services:['Electrical repairs','Lighting projects','Installation enquiries'],needs:[['Work organized by need','Group repairs, upgrades and planned installations around customer tasks.'],['Credentials with evidence','Present only verified qualifications and applicable service information.'],['Better project enquiries','Give customers a simple way to describe the work and location before a follow-up.']],checks:['Are residential and commercial services easy to distinguish?','Are credentials accurate and current?','Does the enquiry form explain the next step?'],faq:['Can customers upload project photos?','That can be a separately scoped production feature. File storage, access and retention would need to be designed; this demo accepts no uploads.'],related:['plumbers','hvac','landscapers']},
 {slug:'salons',name:'Hair & beauty salons',group:'Beauty & personal care',family:'spa',brand:'Atelier',descriptor:'HAIR & BEAUTY',image:'spa',title:'Let your style make the introduction.',intro:'Bring your services, stylists and salon atmosphere together, with a straightforward path to the booking tool you already use.',headline:'Your style.\nA fresh perspective.',action:'Explore the salon',services:['Cuts & styling','Colour consultations','Salon appointments'],needs:[['A useful service menu','Explain service options, consultation requirements and approved starting prices.'],['People behind the work','Introduce stylists and display permissioned portfolio photography.'],['Booking that feels connected','Guide visitors to the correct service or existing booking provider.']],checks:['Is your service menu usable on a phone?','Can a new customer understand how to choose a stylist?','Are booking links current and clearly labeled?'],faq:['Would we have to replace our booking provider?','Not necessarily. The first choice should be to preserve a provider that works and improve how customers reach it.'],related:['barbers','medical-spas','retailers']},
 {slug:'barbers',name:'Barbershops',group:'Beauty & personal care',family:'professional',brand:'Common',descriptor:'BARBER STUDIO',image:'planning-desk',title:'A strong identity. An easy next appointment.',intro:'Give your shop a distinctive presence while making services, barbers, opening hours and walk-in information effortless to find.',headline:'A fresh cut.\nA familiar welcome.',action:'Plan your visit',services:['Cuts & styling','Beard care','Shop information'],needs:[['Show the character of the shop','Use original photography and a confident visual identity.'],['Make the visit predictable','State appointment and walk-in arrangements accurately.'],['Keep the essentials close','Put the service menu, location and booking link where mobile visitors expect them.']],checks:['Are walk-in and booking rules easy to find?','Does the menu distinguish service durations or options?','Is the address linked to accurate directions?'],faq:['Can each barber have a profile?','Yes. Profiles can introduce the team and link to individual booking options where your provider supports them.'],related:['salons','retailers','cafes']},
 {slug:'auto-repair',name:'Auto repair & detailing',group:'Automotive',family:'professional',brand:'Westlane',descriptor:'AUTO CARE',image:'planning-desk',title:'Make the next service easier to arrange.',intro:'Help drivers find the work you handle, understand the enquiry process and request an appointment without navigating a crowded service list.',headline:'Care for the drive\nahead.',action:'Request a service',services:['Repair enquiries','Routine servicing','Detailing appointments'],needs:[['Services with clear boundaries','Explain the work and vehicle types you actually support.'],['Useful booking context','Collect the vehicle and concern details needed for a follow-up.'],['Expectations before arrival','Explain assessments, estimates and appointment confirmation.']],checks:['Are supported vehicle types and services clear?','Can a customer distinguish an estimate from a confirmed price?','Are hours, directions and contact options up to date?'],faq:['Should the site calculate a repair price?','Only where your approved pricing and diagnostic process support it. Many repair requests are better served by a clearly explained assessment and estimate.'],related:['electricians','computer-repair','retailers']},
 {slug:'restaurants',name:'Restaurants & catering',group:'Food & hospitality',family:'spa',brand:'Gather',descriptor:'KITCHEN & TABLE',image:'business-welcome',title:'Give the experience a place at the table.',intro:'Let guests discover your food and atmosphere, read a mobile-friendly menu and reach the right reservation, ordering or catering enquiry.',headline:'Good food.\nBetter company.',action:'Explore the menu',services:['Menus','Reservations','Catering enquiries'],needs:[['A menu people can read','Use accessible page content rather than relying only on a large menu image.'],['Different visits, clear paths','Separate dining reservations, takeaway and private-event requests.'],['Practical details first','Keep location, hours and booking arrangements easy to find.']],checks:['Can the menu be read without pinching to zoom?','Are dine-in, takeaway and catering actions distinct?','Do holiday hours and external booking links stay current?'],faq:['Can ordering stay with our current provider?','Yes. A clear link or supported integration can preserve your existing operations. Provider fees and integration scope would be confirmed separately.'],related:['cafes','retailers','salons']},
 {slug:'cafes',name:'Cafés & bakeries',group:'Food & hospitality',family:'spa',brand:'Sunday',descriptor:'COFFEE & BAKES',image:'business-welcome',title:'Your everyday welcome, beautifully online.',intro:'Show the atmosphere, the menu and the little details that help someone decide when to visit, what to try or how to order ahead.',headline:'A good day\nstarts here.',action:'Plan a visit',services:['Coffee & menus','Opening hours','Order-ahead information'],needs:[['A sense of place','Use photography that reflects your actual space and products.'],['Everyday essentials','Keep hours, location, accessibility information and menu links visible.'],['Special orders, organized','Give catering or celebration orders their own enquiry route.']],checks:['Are today’s hours easy to find?','Does the menu work well on mobile?','Can customers find the lead time for special orders?'],faq:['Can seasonal menus be updated easily?','Yes. The production content setup should make menu updates straightforward, with someone clearly responsible for keeping them current.'],related:['restaurants','retailers','barbers']},
 {slug:'chiropractors',name:'Chiropractic practices',group:'Health & wellbeing',family:'health',brand:'Align',descriptor:'CHIROPRACTIC CARE',image:'health',title:'Make the first conversation feel approachable.',intro:'Explain your practice’s approach, introduce practitioners and help visitors understand the first appointment without promising treatment outcomes.',headline:'A thoughtful start\nto your next visit.',action:'Explore a first visit',services:['Practice approach','First-visit guidance','Appointment enquiries'],needs:[['Explain the first visit','Describe the consultation process and practical preparation.'],['Care with context','Use clear service descriptions reviewed by the practice.'],['Accessible contact choices','Make appointment enquiries and location details straightforward.']],checks:['Does the site explain what happens at a first visit?','Are practitioner biographies current?','Are service claims reviewed and appropriately supported?'],faq:['Can patient forms be included?','The public site can explain preparation and link to an approved intake system. Sensitive intake collection requires a separately designed production workflow.'],related:['medical-practices','dentists','medical-spas']},
 {slug:'medical-practices',name:'Medical practices',group:'Health & wellbeing',family:'health',brand:'Oakwell',descriptor:'FAMILY CARE',image:'health',title:'Help people find the right care information.',intro:'Make services, practitioner information, locations and appointment guidance clear before someone needs to call the practice.',headline:'Care that starts\nwith listening.',action:'Find appointment information',services:['Care information','Practitioner profiles','Visit planning'],needs:[['Services people can understand','Organize information around the care offered by the practice.'],['Find the right location','Keep hours, addresses and contact channels accurate.'],['Separate public information from intake','Route sensitive workflows to the practice’s approved systems.']],checks:['Are services and appointment eligibility clear?','Can people find current practice contact details?','Are medical descriptions reviewed by the practice?'],faq:['Will this replace our patient portal?','No. Website improvement should preserve appropriate existing systems. Portal changes require their own scope and technical review.'],related:['dentists','chiropractors','medical-spas']},
 {slug:'accountants',name:'Accountants & business advisers',group:'Financial & accounting services',family:'professional',brand:'Northline',descriptor:'ACCOUNTING & ADVISORY',image:'office',title:'Turn expertise into a clearer conversation.',intro:'Explain who you help, what an engagement includes and how a prospective client can discuss their needs without sending sensitive documents through a general form.',headline:'Clear thinking.\nConfident next steps.',action:'Explore our services',services:['Business accounting','Tax-service enquiries','Advisory conversations'],needs:[['A clear audience','Distinguish individual, small-business and specialist services.'],['Explain the engagement','Set expectations for the introductory conversation and scope.'],['Respect document workflows','Keep public enquiries separate from approved client document systems.']],checks:['Can visitors tell whether you serve their type of business?','Is the introductory process explained?','Are qualifications and service descriptions accurate?'],faq:['Can a client portal be connected?','A public site can link to an existing portal. Building or changing a document portal is a separate application project, not an assumed website feature.'],related:['cpa-firms','bookkeepers','financial-advisors']},
 {slug:'pet-services',name:'Pet grooming & care',group:'Pet services',family:'spa',brand:'Good Company',descriptor:'PET CARE',image:'home',title:'A little reassurance for their best friend.',intro:'Help owners understand the care offered, preparation requirements and booking process, with warm photography and clear service information.',headline:'Good care.\nHappy company.',action:'Explore a visit',services:['Grooming services','Visit preparation','Booking enquiries'],needs:[['Care explained simply','Describe services, suitability and any preparation requirements.'],['Introduce the experience','Show real facilities and permissioned photography when available.'],['Make booking practical','Explain the information needed before an appointment can be confirmed.']],checks:['Are preparation requirements easy to find?','Do service descriptions explain what is included?','Is the booking-confirmation process clear?'],faq:['Can different pet sizes have different service options?','Yes. Approved service options and pricing can be organized clearly; final suitability and appointment confirmation remain with the business.'],related:['salons','retailers','cafes']},
 {slug:'retailers',name:'Independent retailers',group:'Retail & specialist services',family:'spa',brand:'Neighbour',descriptor:'EVERYDAY FINDS',image:'business-welcome',title:'Bring the character of your shop online.',intro:'Help customers discover your range, find your store and understand how to buy, collect or ask about availability.',headline:'Thoughtful finds.\nClose to home.',action:'Explore the collection',services:['Product discovery','Store information','Collection enquiries'],needs:[['Curate the range','Organize products or categories around how customers browse.'],['Choose the right selling model','Distinguish a catalogue, enquiry site and full online shop.'],['Connect online and in-store','Explain collection, stock enquiries and visiting information.']],checks:['Is it clear whether customers can buy online?','Are collection arrangements and store hours current?','Can someone ask about availability without searching for contact details?'],faq:['Do we need full ecommerce?','Not always. A useful catalogue and clear contact route may fit the business better. Checkout, inventory and payments need a separate scope decision.'],related:['tailors','cafes','computer-repair']},
 {slug:'computer-repair',name:'Computer repair & IT support',group:'Retail & specialist services',family:'professional',brand:'Clearbyte',descriptor:'COMPUTER CARE',image:'planning-desk',title:'Make technical help easier to understand.',intro:'Explain supported devices, repair assessments and business-support options in language customers can act on.',headline:'Less confusion.\nA clearer next step.',action:'Describe the problem',services:['Device assessments','Repair enquiries','Business IT support'],needs:[['Plain-language services','Group help by the problem a customer recognizes.'],['A clear assessment process','Explain diagnosis, estimates and authorization before repair.'],['Appropriate information requests','Ask for useful issue details without requesting passwords on a public form.']],checks:['Are supported devices and service limits clear?','Is the assessment process explained before a booking?','Does the enquiry avoid asking for account credentials?'],faq:['Can customers track a repair?','A repair-status portal could be scoped separately. The starting website can explain how status updates are provided through existing business processes.'],related:['auto-repair','accountants','retailers']},
 {slug:'tailors',name:'Tailors & alterations',group:'Retail & specialist services',family:'spa',brand:'The Fold',descriptor:'TAILORING & ALTERATIONS',image:'planning-desk',title:'Care in every detail, from the first enquiry.',intro:'Show the work you specialize in and explain fittings, lead times and how customers can bring a garment in for assessment.',headline:'A thoughtful fit.\nMade for you.',action:'Arrange a fitting',services:['Everyday alterations','Occasionwear fittings','Garment assessments'],needs:[['Show the kinds of work','Use permissioned examples and clear service descriptions.'],['Set fitting expectations','Explain what to bring and when a fitting is needed.'],['Discuss timing honestly','Distinguish general lead-time guidance from confirmed delivery dates.']],checks:['Can visitors tell which garments you work with?','Are fittings and walk-ins explained?','Does pricing distinguish estimates from assessed work?'],faq:['Can customers get an instant alteration quote?','Only for work with an approved fixed price. More complex garments are better served by a fitting or assessment before a final quote.'],related:['retailers','salons','barbers']},
 {slug:'landscapers',name:'Landscapers & garden care',group:'Home & trade services',family:'home',brand:'Fieldwork',descriptor:'GARDEN & LANDSCAPE',image:'home',title:'Show the possibilities beyond the front door.',intro:'Separate ongoing garden care from larger landscape projects and help customers understand how an enquiry becomes a scoped plan.',headline:'Room to grow.\nSpace to enjoy.',action:'Discuss your garden',services:['Garden maintenance','Landscape projects','Site-visit enquiries'],needs:[['Two clear paths','Distinguish routine maintenance from design and installation projects.'],['Work shown with context','Use actual project photography with permission and explain the work performed.'],['A considered estimate','Explain site visits, service coverage and the information needed to discuss scope.']],checks:['Are maintenance and project enquiries separated?','Does the portfolio describe actual work accurately?','Can visitors find your service area and site-visit process?'],faq:['Can we show before-and-after projects?','Yes, with permissioned photographs and accurate project descriptions. The fictional comparisons in this demo are clearly labeled and are not client work.'],related:['plumbers','hvac','electricians']},
{
  "slug": "financial-advisors",
  "name": "Financial advisers & planners",
  "group": "Financial & accounting services",
  "family": "professional",
  "brand": "Meridian",
  "descriptor": "FINANCIAL PLANNING",
  "image": "office",
  "keywords": [
    "financials",
    "advisor",
    "advisors",
    "adviser",
    "wealth management",
    "retirement planner",
    "CFP"
  ],
  "title": "Make expertise easier to understand.",
  "intro": "A referral is only the beginning. Help prospective clients understand who you work with, how an introductory meeting works and where to find clear information about your approach.",
  "headline": "Your questions.\nA clearer conversation.",
  "action": "Explore our approach",
  "services": [
    "Planning approach",
    "Who we work with",
    "Introductory meetings"
  ],
  "needs": [
    [
      "Help the right clients recognize themselves",
      "Explain the situations and client groups your practice serves without promising investment outcomes."
    ],
    [
      "Make the relationship understandable",
      "Present your process, approved fee information and relevant professional background in plain language."
    ],
    [
      "Separate introductions from account access",
      "Offer a simple first-contact route and a clearly labeled link to an existing client portal."
    ]
  ],
  "checks": [
    "Can a referred visitor tell whether your practice fits their needs?",
    "Are your approach, professional details and fee information easy to find?",
    "Are introductory enquiries separate from account access and document exchange?"
  ],
  "faq": [
    "Can the website keep our existing client portal?",
    "Yes. The proposed website can guide clients to an existing approved portal. Account access, document handling and financial tools would remain separate from this public-site demo."
  ],
  "related": [
    "cpa-firms",
    "insurance-agencies",
    "mortgage-brokers"
  ]
},
{
  "slug": "cpa-firms",
  "name": "CPA firms",
  "group": "Financial & accounting services",
  "family": "professional",
  "brand": "Ledgerstone",
  "descriptor": "CPA PRACTICE CONCEPT",
  "image": "planning-desk",
  "keywords": [
    "CPA",
    "CPAs",
    "certified public accountant",
    "audit",
    "assurance",
    "accounting firm"
  ],
  "title": "Give your expertise a clearer introduction.",
  "intro": "Make it easier for business owners to distinguish your accounting, tax and assurance services, understand the engagement process and find the right person to contact.",
  "headline": "Clarity in the details.\nConfidence in the conversation.",
  "action": "Explore our services",
  "services": [
    "Accounting services",
    "Tax-service enquiries",
    "Engagement process"
  ],
  "needs": [
    [
      "Distinct services, clear scope",
      "Explain the services your firm actually provides, rather than placing every accounting need under one broad label."
    ],
    [
      "Professional details with context",
      "Present verified designations, team responsibilities and the client types you serve."
    ],
    [
      "A practical onboarding path",
      "Explain an introductory discussion and direct document exchange to the firm’s approved system."
    ]
  ],
  "checks": [
    "Can visitors distinguish accounting, tax and assurance services you offer?",
    "Are practitioner credentials and firm contact details current?",
    "Can new clients learn the onboarding steps without sending tax documents?"
  ],
  "faq": [
    "How is this different from a general accountant page?",
    "The CPA direction emphasizes verified professional designations, defined engagements and service distinctions. The general accountant direction focuses on broader ongoing business support. Both remain fictional design studies."
  ],
  "related": [
    "accountants",
    "bookkeepers",
    "tax-preparers"
  ]
},
{
  "slug": "bookkeepers",
  "name": "Bookkeepers & payroll services",
  "group": "Financial & accounting services",
  "family": "professional",
  "brand": "Daybook",
  "descriptor": "BOOKKEEPING & PAYROLL",
  "image": "planning-desk",
  "keywords": [
    "bookkeeping",
    "payroll",
    "accounts payable",
    "QuickBooks",
    "Xero"
  ],
  "title": "Make ongoing support feel straightforward.",
  "intro": "Help owners understand what you take care of each month, which systems you work with and how a handover begins. Clear scope can make the first enquiry more useful.",
  "headline": "Less admin.\nA clearer working rhythm.",
  "action": "Explore monthly support",
  "services": [
    "Monthly bookkeeping",
    "Payroll-service enquiries",
    "Getting started"
  ],
  "needs": [
    [
      "Show the working rhythm",
      "Describe recurring tasks, reporting and what clients need to supply."
    ],
    [
      "Separate cleanup from ongoing work",
      "Give a backlog or migration enquiry a different path from routine monthly support."
    ],
    [
      "Explain the handover",
      "Introduce supported software and next steps without asking for login credentials on a public form."
    ]
  ],
  "checks": [
    "Can owners see what recurring support includes and excludes?",
    "Is one-time cleanup distinct from ongoing bookkeeping?",
    "Does your enquiry route avoid requesting software passwords?"
  ],
  "faq": [
    "Can we show packages without quoting every business instantly?",
    "Yes. Explain the scope and the factors that affect an engagement, then offer an introductory enquiry. A fixed quote should follow your actual pricing and review process."
  ],
  "related": [
    "cpa-firms",
    "accountants",
    "tax-preparers"
  ]
},
{
  "slug": "tax-preparers",
  "name": "Tax preparation practices",
  "group": "Financial & accounting services",
  "family": "professional",
  "brand": "Clearseason",
  "descriptor": "TAX PREPARATION",
  "image": "office",
  "keywords": [
    "tax preparer",
    "tax preparation",
    "enrolled agent",
    "EA",
    "tax filing"
  ],
  "title": "A smoother start to a busy season.",
  "intro": "Help clients understand the returns you handle, how appointments work and what to prepare before they contact you. Keep sensitive document exchange in your existing approved process.",
  "headline": "A prepared start.\nA clearer next step.",
  "action": "Plan an appointment",
  "services": [
    "Service information",
    "Appointment guidance",
    "Preparation checklist"
  ],
  "needs": [
    [
      "Tell clients what you handle",
      "Describe individual, business and specialist services only where offered."
    ],
    [
      "Reduce preparation guesswork",
      "Publish a reviewed checklist and explain how documents should be supplied through approved channels."
    ],
    [
      "Keep seasonal information current",
      "Make availability, appointment arrangements and your own service cutoffs easy to update."
    ]
  ],
  "checks": [
    "Can visitors tell whether you handle their type of return?",
    "Is the preparation checklist current and easy to read on a phone?",
    "Are tax documents kept out of a general enquiry form?"
  ],
  "faq": [
    "Can customers upload tax records here?",
    "No. This demo accepts no documents. A production site could link to your existing approved document system after the workflow is reviewed."
  ],
  "related": [
    "cpa-firms",
    "bookkeepers",
    "financial-advisors"
  ]
},
{
  "slug": "insurance-agencies",
  "name": "Independent insurance agencies",
  "group": "Financial & accounting services",
  "family": "professional",
  "brand": "Harborline",
  "descriptor": "INSURANCE SERVICES",
  "image": "office",
  "keywords": [
    "insurance agent",
    "insurance broker",
    "coverage",
    "policy",
    "financials"
  ],
  "title": "Help people find the right conversation.",
  "intro": "Separate new coverage enquiries from policy service and claims guidance. Give visitors a clear picture of the insurance categories you handle before they get in touch.",
  "headline": "Clear choices.\nA helpful first conversation.",
  "action": "Explore coverage categories",
  "services": [
    "Coverage enquiries",
    "Policy-service guidance",
    "Contact the agency"
  ],
  "needs": [
    [
      "Organize around the customer’s need",
      "Distinguish personal, business and specialist coverage categories actually offered."
    ],
    [
      "Give existing clients their own path",
      "Make policy changes, carrier contacts and claims instructions easy to locate."
    ],
    [
      "Explain what a quote request means",
      "Set expectations for follow-up without presenting an enquiry as coverage confirmation."
    ]
  ],
  "checks": [
    "Are new enquiries separate from existing policy service?",
    "Can a customer find the appropriate claims contact?",
    "Does every quote request explain what happens next?"
  ],
  "faq": [
    "Can the site provide instant insurance quotes?",
    "Only through a separately scoped, supported provider workflow. This demo illustrates service information and enquiry paths; it does not price or bind coverage."
  ],
  "related": [
    "financial-advisors",
    "mortgage-brokers",
    "accountants"
  ]
},
{
  "slug": "mortgage-brokers",
  "name": "Mortgage brokers & loan officers",
  "group": "Financial & accounting services",
  "family": "professional",
  "brand": "Hearthway",
  "descriptor": "HOME FINANCE GUIDANCE",
  "image": "home",
  "keywords": [
    "mortgage",
    "loan officer",
    "lending",
    "home loan",
    "financials"
  ],
  "title": "Make the process easier to approach.",
  "intro": "Help prospective borrowers understand your role, the stages of an enquiry and how to reach your approved application process without confusing a conversation with a lending decision.",
  "headline": "Your next home.\nA clearer conversation.",
  "action": "Explore the process",
  "services": [
    "Process overview",
    "Introductory enquiries",
    "Application guidance"
  ],
  "needs": [
    [
      "Explain the stages",
      "Distinguish an introductory conversation, application and lender decision."
    ],
    [
      "Keep published details reviewed",
      "Use current, approved service descriptions and professional information."
    ],
    [
      "Guide sensitive work to the right place",
      "Keep applications and financial documents in the approved provider workflow."
    ]
  ],
  "checks": [
    "Can someone understand the steps before starting an application?",
    "Are professional details and service information current?",
    "Is an enquiry clearly different from a lending approval?"
  ],
  "faq": [
    "Should we add a mortgage calculator?",
    "It could be scoped as an educational tool with clear assumptions and limitations. It should not imply eligibility, approval or a personalized offer. No lending calculator or application is connected here."
  ],
  "related": [
    "real-estate-agents",
    "financial-advisors",
    "insurance-agencies"
  ]
},
{
  "slug": "attorneys",
  "name": "Law firms & attorneys",
  "group": "Professional services",
  "family": "professional",
  "brand": "Westbridge",
  "descriptor": "LEGAL PRACTICE CONCEPT",
  "image": "office",
  "keywords": [
    "lawyer",
    "lawyers",
    "attorney",
    "solicitor",
    "legal services"
  ],
  "title": "Make the first enquiry less uncertain.",
  "intro": "Explain the matters your practice handles, where you work and how a prospective client can request an introductory conversation without sending detailed case material.",
  "headline": "Clear information.\nA considered first step.",
  "action": "Explore practice areas",
  "services": [
    "Practice areas",
    "Meet the team",
    "Consultation enquiries"
  ],
  "needs": [
    [
      "Practice areas in plain language",
      "Help visitors identify the type of matter without implying a promised outcome."
    ],
    [
      "A clear introduction to the firm",
      "Present verified professional biographies and service locations."
    ],
    [
      "Explain the initial enquiry",
      "State what information is useful and how the firm decides the next step."
    ]
  ],
  "checks": [
    "Can a visitor identify whether you handle their type of matter?",
    "Are attorney biographies and office details accurate?",
    "Does the first-contact form avoid unnecessary confidential case details?"
  ],
  "faq": [
    "Can the website replace our case-management system?",
    "That is a separate application decision. The public site can explain services and direct existing clients to an approved system without replacing it."
  ],
  "related": [
    "accountants",
    "financial-advisors",
    "real-estate-agents"
  ]
},
{
  "slug": "real-estate-agents",
  "name": "Real estate agents & brokers",
  "group": "Property & design",
  "family": "professional",
  "brand": "Terrace",
  "descriptor": "PROPERTY & PLACE",
  "image": "home",
  "keywords": [
    "realtor",
    "real estate broker",
    "property sales",
    "buyer agent",
    "seller agent"
  ],
  "title": "Make local knowledge easy to discover.",
  "intro": "Help buyers and sellers understand the areas you serve, your process and how to begin a conversation. Keep listings and property information connected to reliable sources.",
  "headline": "A sense of place.\nA clearer way forward.",
  "action": "Explore our approach",
  "services": [
    "Buying guidance",
    "Selling enquiries",
    "Local service areas"
  ],
  "needs": [
    [
      "Two distinct journeys",
      "Give buyers and sellers clear entry points with relevant next steps."
    ],
    [
      "Evidence behind the presentation",
      "Use permissioned property photographs and accurate descriptions of your role."
    ],
    [
      "Keep property information current",
      "Explain where listings come from and how availability is maintained."
    ]
  ],
  "checks": [
    "Can buyers and sellers find their own next steps?",
    "Are displayed properties current and accurately attributed?",
    "Can a visitor find the areas you actually serve?"
  ],
  "faq": [
    "Can live listings appear on the site?",
    "Potentially, through an approved listing provider and separately agreed scope. This demo has no live listing feed or property availability data."
  ],
  "related": [
    "mortgage-brokers",
    "property-managers",
    "interior-designers"
  ]
},
{
  "slug": "property-managers",
  "name": "Property management firms",
  "group": "Property & design",
  "family": "professional",
  "brand": "Wellkept",
  "descriptor": "PROPERTY MANAGEMENT",
  "image": "home",
  "keywords": [
    "property manager",
    "rental management",
    "landlord",
    "tenant",
    "HOA"
  ],
  "title": "One website. Clear paths for different people.",
  "intro": "Owners, residents and prospective tenants arrive with different needs. Help each group reach useful information without navigating the same generic contact form.",
  "headline": "Well-run places.\nClearer connections.",
  "action": "Find your next step",
  "services": [
    "Owner enquiries",
    "Resident resources",
    "Rental information"
  ],
  "needs": [
    [
      "Separate owners and residents",
      "Distinguish new management enquiries from day-to-day resident support."
    ],
    [
      "Explain the management service",
      "Show property types, coverage and the responsibilities included in your actual scope."
    ],
    [
      "Connect existing workflows",
      "Link clearly to approved resident portals and maintenance instructions."
    ]
  ],
  "checks": [
    "Can residents find the right maintenance route?",
    "Can owners understand the properties and areas you manage?",
    "Are rental enquiries separate from management-service enquiries?"
  ],
  "faq": [
    "Will this create a tenant portal?",
    "No. A public website can guide people to an existing portal. Rent payments, applications and resident records require a separate system and scope."
  ],
  "related": [
    "real-estate-agents",
    "cleaning-services",
    "landscapers"
  ]
},
{
  "slug": "architects",
  "name": "Architectural practices",
  "group": "Property & design",
  "family": "professional",
  "brand": "Formstead",
  "descriptor": "ARCHITECTURE STUDIO",
  "image": "office",
  "keywords": [
    "architect",
    "architecture",
    "building design"
  ],
  "title": "Give the thinking behind the work a place.",
  "intro": "Show more than finished photographs. Explain project types, your role and the stages of working together so a prospective client can recognize the right fit.",
  "headline": "Considered spaces.\nThoughtful beginnings.",
  "action": "Explore our work",
  "services": [
    "Project portfolio",
    "Studio approach",
    "Project enquiries"
  ],
  "needs": [
    [
      "Projects with useful context",
      "Describe the brief, scope and contribution accurately alongside permissioned imagery."
    ],
    [
      "A process clients can follow",
      "Explain the stages from an initial discussion to the services actually offered."
    ],
    [
      "A better first brief",
      "Invite location, project type and broad goals before a detailed follow-up."
    ]
  ],
  "checks": [
    "Does each portfolio entry explain your role?",
    "Can prospective clients understand your project process?",
    "Does the enquiry collect useful scope without requiring a finished brief?"
  ],
  "faq": [
    "Can the portfolio include unbuilt work?",
    "Yes, if it is clearly identified as a proposal, visualization or concept, with appropriate image permissions. Do not present it as a completed project."
  ],
  "related": [
    "interior-designers",
    "real-estate-agents",
    "landscapers"
  ]
},
{
  "slug": "interior-designers",
  "name": "Interior designers",
  "group": "Property & design",
  "family": "spa",
  "brand": "Roomwell",
  "descriptor": "INTERIOR DESIGN",
  "image": "spa",
  "keywords": [
    "interior design",
    "decorator",
    "interior decorator",
    "home styling"
  ],
  "title": "Let the spaces speak. Make the process clear.",
  "intro": "Pair an expressive portfolio with practical information about consultations, room projects and full-service work. Help enquiries start with a shared understanding of scope.",
  "headline": "Room for living.\nDesigned with care.",
  "action": "Explore the studio",
  "services": [
    "Selected interiors",
    "Design services",
    "Consultation enquiries"
  ],
  "needs": [
    [
      "Curate the portfolio",
      "Show permissioned work with a clear description of the project and your contribution."
    ],
    [
      "Distinguish service levels",
      "Explain the difference between advice, a room plan and a larger engagement."
    ],
    [
      "Prepare for the conversation",
      "Ask about the space, location and goals without demanding a complete design brief."
    ]
  ],
  "checks": [
    "Can visitors distinguish your service options?",
    "Do project captions explain what you designed?",
    "Is the consultation process and any approved fee information clear?"
  ],
  "faq": [
    "Can clients send moodboards or room photos?",
    "That can be part of a separately scoped enquiry workflow with appropriate storage and permissions. This frontend demo does not upload files."
  ],
  "related": [
    "architects",
    "real-estate-agents",
    "retailers"
  ]
},
{
  "slug": "roofers",
  "name": "Roofing contractors",
  "group": "Home & trade services",
  "family": "home",
  "brand": "Ridgeline",
  "descriptor": "ROOFING SERVICES",
  "image": "home",
  "keywords": [
    "roofer",
    "roof repair",
    "roof replacement",
    "roof inspection"
  ],
  "title": "Make the next step clear from the ground up.",
  "intro": "Help homeowners distinguish a repair enquiry from replacement planning, understand your service area and arrange the right assessment.",
  "headline": "A sound roof.\nA considered plan.",
  "action": "Request an assessment",
  "services": [
    "Repair enquiries",
    "Replacement planning",
    "Assessment visits"
  ],
  "needs": [
    [
      "Different jobs, different paths",
      "Separate leaks, planned replacements and other work you actually handle."
    ],
    [
      "Show the assessment process",
      "Explain how a visit leads to a scope and estimate."
    ],
    [
      "Proof with clear context",
      "Use accurate credentials and permissioned project photographs rather than unsupported claims."
    ]
  ],
  "checks": [
    "Are repair and replacement requests easy to distinguish?",
    "Are coverage and assessment arrangements visible?",
    "Do project images describe actual work your team performed?"
  ],
  "faq": [
    "Can the site quote a replacement immediately?",
    "Only where your approved process supports it. Many projects need an assessment; the site should explain that rather than promise an instant final price."
  ],
  "related": [
    "plumbers",
    "electricians",
    "landscapers"
  ]
},
{
  "slug": "cleaning-services",
  "name": "Cleaning companies",
  "group": "Home & trade services",
  "family": "home",
  "brand": "Brightday",
  "descriptor": "CLEANING SERVICES",
  "image": "home",
  "keywords": [
    "cleaner",
    "house cleaning",
    "commercial cleaning",
    "janitorial",
    "maid"
  ],
  "title": "Make a clean start easy to arrange.",
  "intro": "Show what each service includes and help customers choose between a regular clean, a one-time visit or a commercial enquiry.",
  "headline": "Fresh spaces.\nA simpler routine.",
  "action": "Explore cleaning options",
  "services": [
    "Recurring cleaning",
    "One-time visits",
    "Commercial enquiries"
  ],
  "needs": [
    [
      "Clear inclusions",
      "Explain room or task coverage and any separately priced work."
    ],
    [
      "Choose the right visit",
      "Distinguish recurring service, deep cleaning and move-related requests."
    ],
    [
      "Practical scheduling expectations",
      "Show coverage, access arrangements and how appointments are confirmed."
    ]
  ],
  "checks": [
    "Can customers understand what each service includes?",
    "Are residential and commercial enquiries separated?",
    "Does a booking request explain when the visit is confirmed?"
  ],
  "faq": [
    "Can recurring visits be booked online?",
    "That can be scoped around your existing scheduling tool and actual availability. The demo shows a design direction without creating appointments."
  ],
  "related": [
    "property-managers",
    "pest-control",
    "landscapers"
  ]
},
{
  "slug": "pest-control",
  "name": "Pest control companies",
  "group": "Home & trade services",
  "family": "home",
  "brand": "Clearhaven",
  "descriptor": "PEST SERVICES",
  "image": "home",
  "keywords": [
    "exterminator",
    "pest management",
    "termite",
    "rodent"
  ],
  "title": "Turn uncertainty into a useful first enquiry.",
  "intro": "Help customers describe the issue, understand the inspection process and find the services you actually provide, without relying on alarming claims.",
  "headline": "Clear information.\nA practical next step.",
  "action": "Request an inspection",
  "services": [
    "Inspection enquiries",
    "Service information",
    "Follow-up guidance"
  ],
  "needs": [
    [
      "Start with recognizable concerns",
      "Organize service information around common customer questions."
    ],
    [
      "Explain assessment before treatment",
      "Set expectations for inspection, recommendations and follow-up."
    ],
    [
      "Keep claims accurate",
      "Use reviewed descriptions of services, methods and any actual service terms."
    ]
  ],
  "checks": [
    "Can customers identify the relevant service without technical vocabulary?",
    "Does the site explain what an inspection involves?",
    "Are service claims and follow-up terms specific and supportable?"
  ],
  "faq": [
    "Should we promise a guaranteed result?",
    "Only publish service terms the business has actually approved and can explain. A design concept should never invent effectiveness claims or guarantees."
  ],
  "related": [
    "cleaning-services",
    "property-managers",
    "landscapers"
  ]
},
{
  "slug": "physical-therapists",
  "name": "Physical therapy practices",
  "group": "Health & wellbeing",
  "family": "health",
  "brand": "Stridewell",
  "descriptor": "PHYSICAL THERAPY",
  "image": "health",
  "keywords": [
    "physical therapist",
    "physiotherapist",
    "physiotherapy",
    "PT",
    "rehabilitation"
  ],
  "title": "Make the first visit easier to navigate.",
  "intro": "Introduce your team, explain the services offered and help prospective patients find practical appointment information without promising a particular recovery.",
  "headline": "A thoughtful start.\nOne visit at a time.",
  "action": "Plan a first visit",
  "services": [
    "Practice services",
    "First-visit information",
    "Appointment enquiries"
  ],
  "needs": [
    [
      "Care explained by the practice",
      "Use reviewed descriptions that help people understand the services offered."
    ],
    [
      "Practical preparation",
      "Make location, appointment arrangements and what to bring easy to find."
    ],
    [
      "A clear patient pathway",
      "Separate general questions from approved intake and existing patient systems."
    ]
  ],
  "checks": [
    "Can someone learn what to expect at a first visit?",
    "Are clinician details and service descriptions current?",
    "Is sensitive intake kept separate from a general enquiry?"
  ],
  "faq": [
    "Can intake forms be added?",
    "The public website can guide patients to the practice’s approved intake process. Collecting sensitive information requires a separately designed production workflow."
  ],
  "related": [
    "chiropractors",
    "medical-practices",
    "therapists"
  ]
},
{
  "slug": "therapists",
  "name": "Therapists & counseling practices",
  "group": "Health & wellbeing",
  "family": "health",
  "brand": "Stillwater",
  "descriptor": "COUNSELING PRACTICE",
  "image": "office",
  "keywords": [
    "therapist",
    "counselor",
    "counsellor",
    "counselling",
    "mental health",
    "psychotherapist"
  ],
  "title": "A calm introduction to a personal decision.",
  "intro": "Help visitors understand your approach, who you work with and how an initial conversation is arranged. Keep information easy to read and the first enquiry proportionate.",
  "headline": "Space to ask.\nA considered first step.",
  "action": "Explore the practice",
  "services": [
    "Practice approach",
    "Practitioner profiles",
    "Initial enquiries"
  ],
  "needs": [
    [
      "Help people assess fit",
      "Describe the populations and services you actually support in clear, reviewed language."
    ],
    [
      "Make practical details visible",
      "Explain appointment formats, locations, availability guidance and approved fee information."
    ],
    [
      "Respect the first contact",
      "Keep a public enquiry brief and distinguish it from clinical intake or urgent support."
    ]
  ],
  "checks": [
    "Can visitors understand your approach and who you work with?",
    "Are appointment formats and practical details easy to find?",
    "Does the enquiry explain its purpose without requesting a detailed personal history?"
  ],
  "faq": [
    "Can people book a session through the website?",
    "A production site can link to a suitable existing scheduling system. Intake, availability and any sensitive workflows need separate review; this demo makes no appointments."
  ],
  "related": [
    "physical-therapists",
    "medical-practices",
    "financial-advisors"
  ]
},
{
  "slug": "veterinarians",
  "name": "Veterinary practices",
  "group": "Pet services",
  "family": "health",
  "brand": "Companion",
  "descriptor": "VETERINARY CARE",
  "image": "office",
  "keywords": [
    "veterinarian",
    "vet",
    "veterinary clinic",
    "animal hospital"
  ],
  "title": "Help owners find the right information quickly.",
  "intro": "Explain the animals and services your practice supports, make visit preparation clear and distinguish routine appointments from urgent-care instructions.",
  "headline": "Care for companions.\nClarity for their people.",
  "action": "Plan a visit",
  "services": [
    "Practice services",
    "Visit preparation",
    "Appointment information"
  ],
  "needs": [
    [
      "Services and suitability",
      "State the animals and appointment types your practice handles."
    ],
    [
      "Clear routes for different needs",
      "Separate routine enquiries from the practice’s approved urgent-care guidance."
    ],
    [
      "Useful preparation",
      "Explain what owners should bring and where existing clients can find resources."
    ]
  ],
  "checks": [
    "Can an owner tell whether you care for their type of animal?",
    "Are routine contact and urgent-care instructions easy to distinguish?",
    "Is first-visit preparation available without filling in a form?"
  ],
  "faq": [
    "Can our current booking provider stay?",
    "Yes. The starting point can preserve an effective provider and improve the path to it. Replacing practice software is a separate project."
  ],
  "related": [
    "pet-services",
    "medical-practices",
    "retailers"
  ]
},
{
  "slug": "tutors",
  "name": "Tutors & learning centers",
  "group": "Education & learning",
  "family": "professional",
  "brand": "Nextchapter",
  "descriptor": "LEARNING SUPPORT",
  "image": "planning-desk",
  "keywords": [
    "tutor",
    "tutoring",
    "tuition",
    "learning centre",
    "test prep",
    "education"
  ],
  "title": "Help families find a thoughtful starting point.",
  "intro": "Explain subjects, learner groups and session formats so families can judge fit before making an enquiry. Show the teaching approach without promising grades or admissions outcomes.",
  "headline": "Room to learn.\nA thoughtful next step.",
  "action": "Explore learning support",
  "services": [
    "Subjects & levels",
    "Learning approach",
    "Introductory enquiries"
  ],
  "needs": [
    [
      "Match the learning need",
      "Organize subjects and age or study levels clearly."
    ],
    [
      "Explain the session experience",
      "Describe formats, teaching approach and how an initial assessment works where offered."
    ],
    [
      "Keep enquiries proportionate",
      "Let an adult begin a conversation without collecting unnecessary student information."
    ]
  ],
  "checks": [
    "Can families find the subjects and levels you support?",
    "Are online and in-person options explained?",
    "Does the first enquiry avoid unnecessary student records?"
  ],
  "faq": [
    "Can families book and pay for lessons online?",
    "That may be scoped around your scheduling and payment providers. This demo shows an enquiry journey; it does not create bookings, collect payments or store student records."
  ],
  "related": [
    "therapists",
    "computer-repair",
    "accountants"
  ]
}
];
export const professionBySlug=slug=>professions.find(p=>p.slug===slug);
export const professionPath=slug=>`/industries/${slug}`;
export const groups=[...new Set(professions.map(p=>p.group))];
export const featuredSlugs=['dentists','medical-spas','plumbers'];
