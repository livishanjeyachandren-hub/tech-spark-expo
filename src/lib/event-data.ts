/**
 * Single source of truth for all TECH TALENT EXPO 2026 content.
 * Sourced from the official event proposal and institution circular.
 */

export const EVENT = {
  name: "Tech Talent Expo 2026",
  tagline: "Igniting Innovation, Empowering Futures",
  subtitle: "Project Pitching • Project Showcasing • Hands-on Workshops",
  venue: "University of Vavuniya",
  city: "Vavuniya, Sri Lanka",
  dates: "20 & 21 August 2026",
  datesShort: "20–21 Aug 2026",
  startsAt: "2026-08-20T08:00:00+05:30",
  registrationDeadline: "15 August 2026",
  demoDay: "16 August 2026",
  organisers: [
    "Students' Union – Faculty of Technological Studies, University of Vavuniya",
    "IEEE Student Branch, University of Vavuniya",
  ],
  emails: ["studentsunion.fts@vau.ac.lk", "ieeesbuov@vau.ac.lk"],
  phones: ["+94 75 711 9785", "+94 76 534 4378"],
  address: "University of Vavuniya, Vavuniya, Sri Lanka",
  socials: [
    { label: "Student's Union FOTS", href: "https://www.facebook.com/" },
    { label: "IEEE SB UOV", href: "https://www.facebook.com/" },
  ],
  googleForm:
    "https://docs.google.com/forms/d/e/1FAIpQLScC5_gnnCp7ntaJrcNU1eVMmrP6YloNbUKsc3AjlSy_8VMSvw/viewform",
} as const;

export const STATS = [
  { value: "2", label: "Days of innovation" },
  { value: "10", label: "Project domains" },
  { value: "4", label: "Participant categories" },
  { value: "Rs. 30K", label: "Total cash prizes" },
] as const;

export const PRIZES = [
  { place: "1st Place", amount: "Rs. 15,000" },
  { place: "2nd Place", amount: "Rs. 10,000" },
  { place: "3rd Place", amount: "Rs. 5,000" },
] as const;

export const TRACKS = [
  {
    id: "web-mobile",
    name: "Web & Mobile Application Development",
    short: "Web & Mobile",
    blurb:
      "Software solutions built for web browsers and mobile devices. Projects should demonstrate innovation, user experience design and practical problem-solving.",
    domains: [
      {
        name: "Agriculture",
        detail:
          "Smart farming apps, crop monitoring, agri supply-chain platforms, farmer marketplaces, weather advisory and precision agriculture tools.",
      },
      {
        name: "Education",
        detail:
          "E-learning platforms, student management systems, virtual classrooms, skill assessment tools and interactive learning apps.",
      },
      {
        name: "Medical",
        detail:
          "Telemedicine platforms, health monitoring apps, patient management, diagnostic tools and appointment scheduling.",
      },
      {
        name: "Industrial",
        detail:
          "Factory automation dashboards, inventory management, quality control, logistics tracking and predictive maintenance.",
      },
      {
        name: "Others",
        detail:
          "Social impact apps, fintech, environmental monitoring, disaster management or any innovative web/mobile solution.",
      },
    ],
  },
  {
    id: "iot-robotics",
    name: "Internet of Things (IoT) & Robotics",
    short: "IoT & Robotics",
    blurb:
      "Hardware-integrated solutions using sensors, embedded systems, automation and robotics. Projects should demonstrate technical implementation and applicability.",
    domains: [
      {
        name: "Agriculture",
        detail:
          "Automated irrigation, drone crop monitoring, soil sensors, greenhouse automation, livestock monitoring and farming robotics.",
      },
      {
        name: "Education",
        detail:
          "Educational robots, STEM kits, automated lab equipment, programming teaching tools and assistive learning devices.",
      },
      {
        name: "Medical",
        detail:
          "Surgical assistance robots, prosthetics, health wearables, medication dispensers and remote patient monitoring.",
      },
      {
        name: "Industrial",
        detail:
          "Assembly line robots, quality inspection, warehouse automation, predictive maintenance sensors and safety monitoring.",
      },
      {
        name: "Others",
        detail:
          "Home automation, smart city solutions, environmental stations, waste management robots and security surveillance.",
      },
    ],
  },
] as const;

export const CATEGORIES = [
  {
    id: "school",
    name: "School Students",
    eligibility:
      "Secondary school students (Grades 6–13) from any school in Sri Lanka.",
    requirement:
      "Individual or team, maximum 4 members. Early prototypes or conceptual projects with clear implementation plans are accepted.",
    maxMembers: 4,
  },
  {
    id: "undergraduate",
    name: "Undergraduates",
    eligibility:
      "Currently enrolled university students from any faculty or discipline.",
    requirement:
      "Individual or team, maximum 5 members. Working prototypes or fully functional applications preferred.",
    maxMembers: 5,
  },
  {
    id: "industrial",
    name: "Industrial Professionals",
    eligibility:
      "Professionals, startups and companies showcasing commercial or R&D solutions.",
    requirement:
      "Team, maximum 6 members. Must demonstrate market potential or industrial applicability.",
    maxMembers: 6,
  },
  {
    id: "open",
    name: "Open Category",
    eligibility:
      "Anyone with a passion for innovation and technology, including graduates and hobbyists.",
    requirement:
      "Individual or team, maximum 4 members. No academic affiliation required.",
    maxMembers: 4,
  },
] as const;

export const OBJECTIVES = [
  "Provide a platform for students and innovators to pitch and showcase projects to industry experts and potential investors.",
  "Bridge academic learning with real-world industrial applications across technology domains.",
  "Encourage research, innovation and entrepreneurship in emerging technologies.",
  "Promote awareness of Web Development, Mobile Applications, IoT and Robotics.",
  "Foster continuous technical learning and professional development.",
  "Strengthen networking among students, academics and industry professionals across Northern Sri Lanka.",
  "Identify promising projects with potential for commercialisation or research publication.",
] as const;

export const OUTCOMES = [
  "Increased awareness of emerging technologies among participants from diverse backgrounds.",
  "Enhanced knowledge of real-world industrial applications through expert-led workshops.",
  "Improved motivation to explore research, innovation and entrepreneurship.",
  "Greater engagement in Student's Union and IEEE Student Branch technical activities.",
  "Stronger interaction between students, academics and industry across Northern Sri Lanka.",
  "Identification of promising projects for commercialisation, publication or incubation.",
  "A lasting project repository and alumni network for future collaboration.",
] as const;

export type AgendaItem = { time: string; title: string; detail: string };

export const AGENDA: { day: string; date: string; theme: string; items: AgendaItem[] }[] = [
  {
    day: "Day 1",
    date: "20 August 2026",
    theme: "Project Pitching & Showcasing",
    items: [
      {
        time: "08:00 – 09:00",
        title: "Registration & Check-in",
        detail: "Participant verification, kit distribution and booth setup.",
      },
      {
        time: "09:00 – 09:30",
        title: "Opening Ceremony",
        detail: "Welcome address, lighting of the lamp, keynote by dignitaries.",
      },
      {
        time: "09:30 – 10:00",
        title: "Keynote Speech",
        detail: "Industry leader on 'Future of Innovation in Sri Lanka'.",
      },
      {
        time: "10:00 – 12:30",
        title: "Project Showcasing — Session 1",
        detail: "Web & Mobile App track: Agriculture, Education, Medical domains.",
      },
      {
        time: "12:30 – 13:30",
        title: "Lunch Break",
        detail: "Networking lunch with industry professionals and mentors.",
      },
      {
        time: "13:30 – 15:30",
        title: "Project Showcasing — Session 2",
        detail: "IoT & Robotics track: Industrial, Others and Open categories.",
      },
      {
        time: "15:30 – 16:00",
        title: "Tea Break",
        detail: "Refreshments and informal networking.",
      },
      {
        time: "16:00 – 18:00",
        title: "Pitching Competition — Round 1",
        detail: "Selected teams present 5-minute pitches to the judging panel.",
      },
      {
        time: "18:00 – 18:30",
        title: "Day 1 Wrap-up",
        detail: "Summary of Day 1 and announcement of finalists for Day 2.",
      },
    ],
  },
  {
    day: "Day 2",
    date: "21 August 2026",
    theme: "Finals, Workshops & Awards",
    items: [
      {
        time: "08:30 – 09:00",
        title: "Day 2 Opening",
        detail: "Recap of Day 1 highlights and introduction to the Day 2 schedule.",
      },
      {
        time: "09:00 – 10:30",
        title: "Workshop Session 1",
        detail: "Parallel tracks: Web Dev, Mobile Dev, IoT, Robotics (choose one).",
      },
      { time: "10:30 – 10:45", title: "Tea Break", detail: "Short refreshment break." },
      {
        time: "10:45 – 12:15",
        title: "Workshop Session 2",
        detail: "Continuation of the hands-on workshop with project building.",
      },
      {
        time: "12:15 – 13:15",
        title: "Lunch Break",
        detail: "Lunch and networking session.",
      },
      {
        time: "13:15 – 14:45",
        title: "Final Pitching Competition & Evaluation",
        detail: "Top 10 teams present enhanced pitches with Q&A from judges.",
      },
      {
        time: "14:45 – 15:15",
        title: "Panel Discussion",
        detail: "'From Campus to Career: Navigating the Tech Industry'.",
      },
      {
        time: "15:15 – 16:00",
        title: "Awards Ceremony",
        detail: "Prize distribution, certificates and special recognitions.",
      },
      {
        time: "16:00 – 16:30",
        title: "Closing Ceremony",
        detail: "Vote of thanks, group photo and farewell.",
      },
    ],
  },
];

export const KEY_DATES = [
  { label: "Registration deadline", value: "15 August 2026" },
  { label: "Demo day", value: "16 August 2026" },
  { label: "Exhibition", value: "20 & 21 August 2026" },
  { label: "Venue", value: "University of Vavuniya" },
] as const;

export const COMMITTEE = [
  {
    role: "Project Chair",
    team: "Appointed from Student's Union or IEEE Student Branch",
    duty: "Overall event coordination, decision-making and liaison with university administration.",
  },
  {
    role: "Co-Chair",
    team: "Representative from collaborating organisation",
    duty: "Supporting the Chair in all activities and managing cross-organisation coordination.",
  },
  {
    role: "Secretary Team",
    team: "Team Lead + 3 Members",
    duty: "Documentation, communication, participant registration and post-event reporting.",
  },
  {
    role: "Technical Team",
    team: "Team Lead + 4 Members",
    duty: "Event website, online registration system, AV setup, live streaming and troubleshooting.",
  },
  {
    role: "Design & Media Team",
    team: "Team Lead + 3 Members",
    duty: "Poster and banner design, social media, photography, videography and event coverage.",
  },
  {
    role: "Finance Team",
    team: "Team Lead + 3 Members",
    duty: "Budget management, procurement, accounting and financial reporting.",
  },
  {
    role: "Logistics Team",
    team: "Team Lead + 4 Members",
    duty: "Venue setup and decoration, refreshments, transport and material management.",
  },
  {
    role: "Promotion Team",
    team: "Team Lead + 3 Members",
    duty: "Marketing campaigns, outreach to schools and universities, and media relations.",
  },
] as const;

export const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/schedule", label: "Schedule" },
  { to: "/categories", label: "Categories" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;
