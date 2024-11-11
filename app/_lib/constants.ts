export interface Experience {
  id: number;
  company: string;
  logo: string;
  position: string;
  dates: string;
  description: string[];
  tags?: string[];
}

export interface Education {
  id: number;
  institution: string;
  logo: string;
  degree: string;
  dates: string;
  description: string[];
  tags?: string[];
}

export interface TechCardItem {
  id: number; // 1: Backend, 2: Frontend & Design, 3: Cloud & DevOps, 4: Other
  name: string;
  imageUrl: string;
  darkModeInvert: boolean;
}

export interface PortfolioProject {
  id: string;
  heading: string;
  subheading: string;
  description: string;
  imageUrl: string;
  techStack: string[];
  liveDemoUrl: string;
  sourceCodeUrl: string;
}

export interface ResearchPaper {
  id: string;
  title: string;
  description?: string;
  authors: string;
  publicationDate: string;
  conference: string;
  imageUrl: string;
  link: string;
}

export interface Testimonial {
  id: number;
  name: string;
  profession: string;
  description: string;
  image: string;
}

export const experienceData: Experience[] = [
  {
    id: 1,
    company: "Cal State Long Beach",
    logo: "/imgs/logos/csulb-logo.svg",
    position: "Teaching Assistant",
    dates: "Jul 2023 - Present",
    description: [
      "Developed and deployed machine learning models for side-channel analysis, achieving a 98% accuracy rate in detecting Hardware Trojan attacks.",
      "Analyzed Large Language Models (LLMs) such as ChatGPT and Google Gemini for applications in Computer Science and Cybersecurity education, leading to a conference publication.",
      "Assisted in data collection, analysis, and software development to support ongoing research projects.",
    ],
  },
  {
    id: 2,
    company: "Office of Research Development at CSULB",
    logo: "/imgs/logos/csulb-logo.svg",
    position: "Research Assistant",
    dates: "Nov 2023 - Aug 2024",
    description: [
      "Conducted in-depth literature reviews and comparative analysis for Large Language Models.",
      "Published paper about comparative analysis of ChatGPT for Education in Computer Science.",
      "Worked collaboratively with team members to achieve research objectives and project milestones.",
    ],
  },
  {
    id: 3,
    company: "Team Disney Anaheim",
    logo: "/imgs/logos/disneyland-logo.svg",
    position: "Media Event Technical Intern",
    dates: "May 2019 - September 2019",
    description: [
      "Assisted in coordinating media reporters, guests, and celebrities for Star Wars: Galaxy's Edge 2019 grand opening.",
      "Conducted research on potential media contacts and celebrities, assisting in maintaining a comprehensive database.",
      "Developed and maintained spreadsheets to track media guest appearances and their schedules.",
    ],
  },
  {
    id: 4,
    company: "Au Lac Plant Base Cuisine",
    logo: "/imgs/logos/aulac-logo.svg",
    position: "Manager",
    dates: "September 2020 - July 2024",
    description: [
      "Improved performance of floor staff by supporting front and back team communication, allowing the kitchen team to halves ticket reading time.",
      "Developed a new program for writing and calculating cash reports, payroll and tip distribution.",
      "Ensure customer and employee satisfaction daily through food quality control and maintaining cleanliness standards.",
      "Contact and support with customer online review, order and questions.",
    ],
  },
];

export const educationData: Education[] = [
  {
    id: 1,
    institution: "California State University, Long Beach",
    logo: "/imgs/logos/csulb-logo.svg",
    degree: "Bachelor of Science in Computer Science",
    dates: "Aug 2022 - Dec 2024",
    description: [
      "GPA: 4.0",
      "Developed a senior design project: an end-to-end encrypted (E2EE) chat application",
      "4-time President's List honoree",
      "Published 2 research papers on large language models (LLMs) and educational technology",
      "2024 CSULB Student Summer Research Award recipient, selected for an 8-week full-time research grant",
      "2nd Place, 36th Annual CSULB Student Research Competition",
    ],
    tags: [""],
  },
  {
    id: 2,
    institution: "Cypress college",
    logo: "/imgs/logos/cypress-logo.svg",
    degree: "Associate of Science in Computer Science",
    dates: "Aug 2020 - May 2022",
    description: [
      "Graduated with honors",
      "Completed a blockchain project under the mentorship of Dr. Penn Wu, focusing on decentralized applications.",
    ],
    tags: [""],
  },
];

export const techCardsItems: TechCardItem[] = [
  // Dictionary of IDs:
  // id 1: Backend
  // id 2: Frontend & Design
  // id 3: Cloud & DevOps
  // id 4: Other
  // https://www.vectorlogo.zone/

  // Backend
  {
    id: 1,
    name: "Python",
    imageUrl: "/imgs/logos/python.svg",
    darkModeInvert: false,
  },
  {
    id: 1,
    name: "C++",
    imageUrl: "/imgs/logos/cpp.svg",
    darkModeInvert: false,
  },
  {
    id: 1,
    name: "Java",
    imageUrl: "/imgs/logos/java.svg",
    darkModeInvert: false,
  },
  {
    id: 1,
    name: "PostgreSQL",
    imageUrl: "/imgs/logos/postgresql.svg",
    darkModeInvert: false,
  },
  {
    id: 1,
    name: "MongoDB",
    imageUrl: "/imgs/logos/mongodb.svg",
    darkModeInvert: false,
  },

  // Frontend & Design
  {
    id: 2,
    name: "React",
    imageUrl: "/imgs/logos/react.svg",
    darkModeInvert: false,
  },
  {
    id: 2,
    name: "TypeScript",
    imageUrl: "/imgs/logos/typescript.svg",
    darkModeInvert: false,
  },
  {
    id: 2,
    name: "Next.js",
    imageUrl: "/imgs/logos/nextjs.svg",
    darkModeInvert: true, // Invert in dark mode
  },
  {
    id: 2,
    name: "JavaScript",
    imageUrl: "/imgs/logos/javascript.svg",
    darkModeInvert: false,
  },
  {
    id: 2,
    name: "HTML",
    imageUrl: "/imgs/logos/html.svg",
    darkModeInvert: false,
  },
  {
    id: 2,
    name: "CSS",
    imageUrl: "/imgs/logos/css.svg",
    darkModeInvert: false,
  },
  {
    id: 2,
    name: "Tailwind",
    imageUrl: "/imgs/logos/tailwind.svg",
    darkModeInvert: false,
  },
  {
    id: 2,
    name: "Figma",
    imageUrl: "/imgs/logos/figma-logo.svg",
    darkModeInvert: false,
  },
  {
    id: 2,
    name: "Ionic",
    imageUrl: "/imgs/logos/ionic.svg",
    darkModeInvert: false,
  },

  // Cloud & DevOps
  {
    id: 3,
    name: "Docker",
    imageUrl: "/imgs/logos/docker.svg",
    darkModeInvert: false,
  },
  {
    id: 3,
    name: "Google Cloud",
    imageUrl: "/imgs/logos/googlecloud.svg",
    darkModeInvert: false,
  },
  {
    id: 3,
    name: "Vercel",
    imageUrl: "/imgs/logos/vercel.svg",
    darkModeInvert: true, // Invert in dark mode
  },

  // Other
  {
    id: 4,
    name: "Jira",
    imageUrl: "/imgs/logos/jira.svg",
    darkModeInvert: false,
  },
  {
    id: 4,
    name: "Linux",
    imageUrl: "/imgs/logos/linux.svg",
    darkModeInvert: false,
  },
  {
    id: 4,
    name: "ChatGPT",
    imageUrl: "/imgs/logos/chatgpt.svg",
    darkModeInvert: true, // Invert in dark mode
  },
];

export const portfolioProjects: PortfolioProject[] = [
  {
    id: "wraith",
    heading: "Project Wraith",
    subheading: "a snap-chat clone + E2EE",
    description:
      "A responsive, high-performance web application built with a modern tech stack. The frontend, developed using React, Vite, and styled with SCSS, provides an interactive and visually appealing user experience. The backend is powered by Golang, MongoDB, and Redis, ensuring efficient data management and fast server-side processing. With Ionic and Capacitor, the app offers seamless functionality across web and mobile platforms.",
    imageUrl: "/imgs/projects/portfolio-wraith.png",
    techStack: [
      "React",
      "Golang",
      "Vite",
      "Ionic",
      "Capacitor",
      "MongoDB",
      "Redis",
      "SCSS",
      "Zustand",
    ],
    liveDemoUrl: "not-found",
    sourceCodeUrl: "not-found",
  },
  {
    id: "personal-website",
    heading: "Personal Website",
    subheading: "A showcase of my projects and skills",
    description:
      "This personal website was built using modern web technologies to create a responsive, clean, and efficient user experience. Developed with Next.js and React, styled using Tailwind CSS, and enhanced with TypeScript for type safety, this site demonstrates my skills in building functional and visually appealing web applications.",
    imageUrl: "/imgs/projects/portfolio-personal-website.png",
    techStack: ["Next.js", "React", "Tailwind CSS", "TypeScript", "Vercel"],
    liveDemoUrl: "not-found",
    sourceCodeUrl: "not-found",
  },
];

export const researchPapers: ResearchPaper[] = [
  {
    id: "1",
    title:
      "ChatGPT vs. Gemini: Comparative Evaluation in Cybersecurity Education with Prompt Engineering Impact",
    authors: "Thomas Nguyen, Hossein Sayadi",
    publicationDate: "2024",
    conference: "IEEE Frontiers in Education Conference",
    imageUrl: "/imgs/projects/chatgpt-gemini-research-paper.png",
    link: "https://example.com/paper1",
  },
  {
    id: "2",
    title:
      "The AI Companion in Education: Analyzing the Pedagogical Potential of ChatGPT in Computer Science and Engineering",
    authors:
      "Zhangying He, Thomas Nguyen, Tahereh Miari, Mehrdad Aliasgari, Setareh Rafatirad, Hossein Sayadi",
    publicationDate: "2024",
    conference: "IEEE Global Engineering Education Conference",
    imageUrl: "/imgs/projects/ai-companion-research-paper.png",
    link: "https://ieeexplore.ieee.org/stamp/stamp.jsp?arnumber=10578820",
  },
  // {
  //   id: "3",
  //   title: "Bayesian Networks for Predictive Analysis in Healthcare",
  //   description:
  //     "This paper presents the application of Bayesian networks to predict patient outcomes, focusing on probabilistic modeling in health informatics to assist in clinical decision-making.",
  //   authors: "Thomas Nguyen, Emily Zhang",
  //   publicationDate: "2024",
  //   imageUrl: "/images/bayesian-healthcare.jpg",
  //   link: "https://example.com/paper3",
  // },
];

export const testimonialItems = [
  {
    id: 2,
    name: "Dr. Hossein Sayadi",
    proffesion: "Professor at Cal State Long Beach",
    description:
      "“Lorem ipsum odor amet, consectetuer adipiscing elit. Habitasse nullam nullam mauris hendrerit viverra donec parturient fames? Habitasse neque nec viverra lobortis tincidunt morbi. Pulvinar ligula euismod tempus lacinia habitasse ligula platea etiam. Tempor imperdiet bibendum inceptos pellentesque luctus per mi blandit. Congue potenti fusce praesent, erat a habitant erat eget. Tempor pretium malesuada nibh habitant finibus sollicitudin primis. Luctus litora accumsan venenatis nisi et egestas.”",
    image: "/imgs/avatars/default-avatar.jpg",
  },
  {
    id: 1,
    name: "Michael Glider",
    proffesion:
      "Manufacturing/Operations Software Engineer @ Collins Aerospace",
    description:
      'Collaborating with Thomas on our project has been a rewarding experience. Their ability to quickly adapt to new challenges and technologies kept everything moving forward seamlessly. Thomas approaches each task with a diligent focus, ensuring every piece of code meets high standards of quality and reliability. Their commitment to excellence and quick learning make them an invaluable asset to any team."',
    image: "/imgs/avatars/Michael-Glider-avatar.jpeg",
  },
  {
    id: 1,
    name: "William Tran",
    proffesion: "Bussiness Analyst @ The Lab Consulting",
    description:
      "Thomas is the type of person that all managers dream of hiring. He’s scrupulously reliable and shows great pride in anything he does; it’s simply not within his nature to do things half-heartedly. Additionally, to our organization’s delight, he went above and beyond his regular responsibilities to improve some of our inefficient processes through the clever use of technology. Do yourself a favor and find a way to work with Thomas!",
    image: "/imgs/avatars/Will-Tran-avatar.jpg",
  },
];
