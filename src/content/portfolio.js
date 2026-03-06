const base = import.meta.env.BASE_URL;

export const profile = {
  name: "This is me!",
  title: "Pratik D Deo",
  location: "Consulting / Strategy / Marketing - Portfolio",
  blurb:
    "I build strategy + storytelling backed by research. Here are a few projects, decks, and videos to understand me better! Contact me if you find me or my work impressive(I know you will).",
    schoolLogo: `${base}media/images/edhec.webp`,
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pratikddeo/" }
  ],
};

export const whoAmI = [
  {
    id: "about-1",
    title: "A strategist, analyst, manager, a wizard in human form (kinda literally) ",
    image: `${base}media/images/moi.jpeg`,
    content:
      "I enjoy turning messy information into clear strategic narratives. That is why I like consulting, marketing strategy, and research-heavy problem solving."
  },
  {
    id: "about-2",
    title: "What I do outside work",
    image: `${base}media/images/rm.jpg`,
    content:
      "Outside projects and internships, I enjoy exploring brands, following retail trends, and understanding how people connect emotionally with products and experiences."
  },
  {
    id: "about-3",
    title: "Sports and competition",
    image: `${base}media/images/mg.jpg`,
    content:
      "I like sports because they combine discipline, performance, and momentum. They remind me a lot of consulting projects: preparation matters, but execution matters more."
  },
  {
    id: "about-4",
    title: "Cars, design, and aspiration",
    image: `${base}media/images/mg.jpg`,
    content:
      "I am drawn to cars for the same reason I like strong brands: design, personality, and precision. Great products always tell a story before anyone explains them."
  }
];


export const projects = [
  {
    id: "Skechers: Active running rebranding",
    type: "pdf",
    title: "Skechers: Active running rebranding",
    year: "2026",
    thumbnail: `${base}media/images/Screenshot 2026-03-04 230825.png`,
    summary:
      "Rebranding Skechers to place it alongside the leaders of active running footwear!",
    description: "When we hear Skechers, we think comfort and comfortable running. But when active runners hears Skechers, they think of a lazy afternoon run, not their everyday track running. Why? Check out my analysis on this!",
    pdf: `${base}media/pdf/SKECHERS_ANALYSIS.pdf`,
  },
  {
    id: "vid-1",
    type: "video",
    title: "Alchime by YSL",
    year: "2025",
    thumbnail: `${base}media/images/alchime.png`,
    summary: "The unique scent of connection by YSL. A secret which you cant buy.",
    description: "What if you, your partner, your friend can create something that only both of you know the secret to? We introduce you Alchime by Yves Saint Laurent, a series of perfumes which is engineered specifically in a way that lets you combine any 2 perfumes together, and the result will produce a registered-named 3rd perfume which isnt available in any of the other bottles. Its unique. Its something that only both of you know the secret to!",
    video: {
      youtube:
        "https://www.youtube.com/watch?v=oaZb9m_RgBc",
      // OR: src: `${base}media/video/demo-reel.mp4`,
    },
  },
  {
    id: "vid-2",
    type: "video",
    title: "Nespresso - Thankyou Mom.",
    year: "2026",
    thumbnail: `${base}media/images/nestle.png`,
    summary: "Nespresso thanks each and every mother for all their untold and unrewarded efforts.",
    description: "Nestle's Nespresso never had a specific emotional connection with its customers. Just plain old random adrenaline videos surrounding coffee. But what if a cup of coffee meant something much more?",
    video: {
      youtube:
        "https://www.youtube.com/watch?v=TvGvWOVwrOk",
      // OR: src: `${base}media/video/demo-reel.mp4`,
    },
  },
];

export const awards = [
  {
    id: "award-1",
    title: "Best Paper Award",
    issuer: "WASET Conference",
    year: "2022",
    thumbnail: `${base}media/images/bestpaper.png`,
    summary:
      "Received the best paper award for research on video quality algorithms presented at an international conference in Greece.",
    description:
      "Awarded for primary-author research work on video quality algorithms, recognized for innovation and application relevance.",
    pdf: `${base}media/pdf/best_presentation_certificate.pdf`,
  },
  {
    id: "award-2",
    title: "Most valuable Player Quater - 1",
    issuer: "Appviewx",
    year: "2024",
    thumbnail: `${base}media/images/Screenshot 2026-03-05 233142.png`,
    summary:
      "Recognized for product ownership, dashboard development, and cross-functional execution.",
    description:
      "Acknowledgement for contributions to product operations, stakeholder alignment, and analytics-led delivery improvement.",
    pdf: `${base}media/pdf/mvp award .pdf`,
  },
  {
    id: "award-3",
    title: "WASET International research paper presentation",
    issuer: "WASET Conference",
    year: "2022",
    thumbnail: `${base}media/images/presentation.png`,
    summary:
      "Primary author of a research paper on assessment of video quality algorithms.",
    description:
      "Presented a research paper in an international research conference at Athens,Greece",
    pdf: `${base}media/pdf/presentation_certificate.pdf`,
  },
  {
    id: "award-4",
    title: "Session co-chair panel",
    issuer: "WASET Greece, Athens",
    year: "2024",
    thumbnail: `${base}media/images/chair.png`,
    summary:
      "Selected as session co-chair",
    description:
      "Co-chair for day 2. Assisted in selecting and grading participants' research papers",
    pdf: `${base}media/pdf/chair_certificate.pdf`,
  },
  {
    id: "award-5",
    title: "Financial Markets",
    issuer: "Yale university-Coursera",
    year: "2022",
    thumbnail: `${base}media/images/yale.png`,
    summary:
      "Finacial markets",
    description:
      "Macro and Micro economics, flow of market, trading and valuation.",
    pdf: `${base}media/pdf/Coursera Y4EMPA8RKAQ2.pdf`,
  },
  {
    id: "award-6",
    title: "International Business",
    issuer: "University of Mexico-Coursera",
    year: "2024",
    thumbnail: `${base}media/images/mexico.png`,
    summary:
      "Business Modelling",
    description:
      "Strategy, Business and management",
    pdf: `${base}media/pdf/Coursera 7JQHXU8Y837T.pdf`,
  }
];

export const experiences = [
  {
    id: "exp-1",
    company: "Roquette",
    logo: `${base}media/images/logo-roquette.webp`,
    role: "Student Consultant",
    location: "France",
    start: "Nov 2025",
    end: "May 2026",
    description: "Roquette is a B2B pharma,health,beauty ingredient supplier. They wanted to implement AI in several parts of their workflows so that their processes are streamlined, faster and better. Deliverables included AI in client identification and targetting, marketing and content creation usecases, Ml based inventory, supply chain and manufacturing enhancements.",
  },
  {
    id: "bcg",
    company: "Inverto",
    logo: `${base}media/images/inverto.jpg`,
    role: "Consulting Project",
    location: "France",
    start: "Dec 2025",
    end: "Dec 2025",
    description: "Our client, Harvest, an agricultural cooperative based in northern France, is considering a merger with another local cooperative, Bloom, following Bloom’s recent offer. The potential merger aims to strengthen their local market position and counteract both companies’ ongoing decline. Harvest & Bloom have mandated BCG INVERTO in clean team to : 1. Assess the relevance of a merger with Bloom. 2. Identify standalone cost-reduction opportunities that can be implemented quickly, as well as potential cost synergies from the merger. The objective was to frame the client’s issue, design a suitable approach, identify key EBITDA optimization levers, assess the impact of each lever, and ultimately develop a recommendation for Harvest. Thank you all for your commitment.",
  },
  {
    id: "sia",
    company: "Sia Partners",
    logo: `${base}media/images/sia.jpg`,
    role: "Consulting Project",
    location: "France",
    start: "Dec 2025",
    end: "Dec 2025",
    description: "Our client Metallica had come up with a really robust greener replacement for the traditional blast furnace, which produces a significantly high amount carbon di oxide as opposed to their newer replacement (Electric Arc Furnace) which produces water vapour instead of CO2. So, now the question is, is the world ready for Green steel? When? How? Is the ROI good enough to invest and replace all the traditional furnaces??",
  },
  {
    id: "exp-2",
    company: "Appviewx",
    logo: `${base}media/images/appviewx-companyupdate-1747133054374.webp`,
    role: "Product Analyst",
    location: "India",
    start: "Jan 2023",
    end: "June 2025",
    description: "I Built PowerBI dashboards to track delivery progress and operational KPIs (throughput, cycle time, readiness), highlighting risks and corrective actions for leadership. Owned a product workstream (3 of 9 products), managing roadmap, prioritizing backlog, and aligning Engineering, Customer Success, and Design teams. Translated client pain points and product metrics into clear requirements, user stories, and acceptance criteria; managed iterative agile releases. Prepared executive status reports and facilitated recurring stakeholder meetings to ensure alignment and transparency. Proactively identified technical risks in complex web projects, partnering with developers on feasibility, dependencies, and mitigation strategies. Supported board activities including meeting coordination, materials preparation, and action tracking. Led customer-centric redesign initiatives, creating improved user journeys and Figma prototypes with UI/UX teams. Delivered a solution for DEXCOM that resolved SSL certificate inventory scaling challenges, improving process efficiency by 60%.",
  },
  {
    id: "exp-3",
    company: "HCL Tech",
    logo: `${base}media/images/2022-10-05-095621950-HCL-Technologies-rebrands-as-HCLTech-and-adopts-new-purpose.webp`,
    role: "Research Intern",
    location: "India",
    start: "Aug 2021",
    end: "Sep 2022",
    description: "I Published an international research paper as the Primary Author on Video Quality Algorithms at WASET, GREECE and won the best paper award. Developed wastage reduction AI solutions and sustainability roadmaps for an automobile parts manufacturer, increased supplier quality and reduced inventory wastage by 45%. Implemented AI based Bio-Medical image processing surgery device for Johnsons&Johnsons to enable safer surgeries.  ",
  },
  {
    id: "exp-4",
    company: "Google Developers student club",
    logo: `${base}media/images/Header image 1600x .jpg`,
    role: "Brand Production Lead",
    location: "India",
    start: "Jan 2020",
    end: "June 2023",
    description: "Created content and creative assets for College Dev community. Organized events, hackathons and developer meetups.",
  },
  {
    id: "exp-5",
    company: "Chennai Institute of Technology",
    logo: `${base}media/images/cit.jpg`,
    role: "Content Team Lead",
    location: "India",
    start: "Jan 2021",
    end: "Feb 2023",
    description: "Head of content team for the cultural association of college. Created social media, blog, advertisement,email materials for the annual college festival.",
  }
  // add more...
];
