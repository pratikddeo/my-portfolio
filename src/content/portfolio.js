const base = import.meta.env.BASE_URL;

export const profile = {
  name: "HIT ME UP! If you find my work impressive (I know you will)",
  title: "Pratik D Deo",
  location: "Consulting / Strategy / Marketing - Portfolio",
  blurb:
    "I build strategy + storytelling backed by research. Here are a few projects, decks, and videos to understand me better!",
  links: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/pratikddeo/" }
  ],
};

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
    summary: "The unique scent of connection, that you cant buy.",
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

export const experiences = [
  {
    id: "exp-1",
    company: "Roquette",
    logo: `${base}media/images/logo-roquette.webp`,
    role: "Student Consultant",
    location: "Lille, France",
    start: "Nov 2025",
    end: "May 2026",
    description: "Roquette is a B2B pharma,health,beauty ingredient supplier. They wanted to implement AI in several parts of their workflows so that their processes are streamlined, faster and better. Deliverables included AI in client identification and targetting, marketing and content creation usecases, Ml based inventory, supply chain and manufacturing enhancements.",
  },
  {
    id: "exp-2",
    company: "Appviewx",
    logo: `${base}media/images/appviewx-companyupdate-1747133054374.webp`,
    role: "Product Analyst",
    location: "India",
    start: "Jan 2023",
    end: "June 2025",
    description: "Built PowerBI dashboards to track delivery progress and operational KPIs (throughput, cycle time, readiness), highlighting risks and corrective actions for leadership. Owned a product workstream (3 of 9 products), managing roadmap, prioritizing backlog, and aligning Engineering, Customer Success, and Design teams. Translated client pain points and product metrics into clear requirements, user stories, and acceptance criteria; managed iterative agile releases. Prepared executive status reports and facilitated recurring stakeholder meetings to ensure alignment and transparency. Proactively identified technical risks in complex web projects, partnering with developers on feasibility, dependencies, and mitigation strategies. Supported board activities including meeting coordination, materials preparation, and action tracking. Led customer-centric redesign initiatives, creating improved user journeys and Figma prototypes with UI/UX teams. Delivered a solution for DEXCOM that resolved SSL certificate inventory scaling challenges, improving process efficiency by 60%.",
  },
  {
    id: "exp-3",
    company: "HCL Tech",
    logo: `${base}media/images/2022-10-05-095621950-HCL-Technologies-rebrands-as-HCLTech-and-adopts-new-purpose.webp`,
    role: "Research Intern",
    location: "India",
    start: "Aug 2021",
    end: "Sep 2022",
    description: "Published an international research paper as the Primary Author on Video Quality Algorithms at WASET, GREECE and won the best paper award. Developed wastage reduction AI solutions and sustainability roadmaps for an automobile parts manufacturer, increased supplier quality and reduced inventory wastage by 45%. Implemented AI based Bio-Medical image processing surgery device for Johnsons&Johnsons to enable safer surgeries.  ",
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
    logo: `${base}media/images/Header image 1600x .jpg`,
    role: "Content Team Lead",
    location: "India",
    start: "Jan 2021",
    end: "Feb 2023",
    description: "Head of content team for the cultural association of college. Created social media, blog, advertisement,email materials for the annual college festival.",
  }
  // add more...
];
