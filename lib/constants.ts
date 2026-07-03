export const PERSONAL_INFO = {
  name: "Afrin Sultana Akhi",
  nameBn: "আফরিন সুলতানা আঁখি",
  username: "SnoOpWo0t",
  title: "Competitive Programmer & Software Developer",
  location: "Dhaka, Bangladesh",
  email: "afrinsultanaakhi138@gmail.com",
  phone: "+880 1757499561",
  university: "University of Asia Pacific",
  degree: "BSc (Eng.) in Computer Science and Engineering",
  cgpa: "3.51 / 4.00",
  graduation: "Expected 2026",
  codeforcesHandle: "SnoOpWo0t",
  leetcodeHandle: "SnoOpWo0t",
  codechefHandle: "SnoOpWo0t",
  githubUrl: "https://github.com/SnoOpWo0t",
  linkedinUrl: "https://www.linkedin.com/in/afrin-sultana-akhi-7b371b192/",
  twitterUrl: "https://x.com/AfrinSultanaAkh",
  facebookUrl: "https://www.facebook.com/afrinsultana.akhi.75",
  instagramUrl: "https://instagram.com/afrinsultana.akhi_",
  discordUrl: "https://discord.com/",
  codeforcesUrl: "https://codeforces.com/profile/",
  leetcodeUrl: "https://leetcode.com/",
  codechefUrl: "https://www.codechef.com/",
};

export type AboutCardIconKey =
  "code" | "education" | "competitive" | "location" | "current" | "interests";

export type AboutCardToneKey =
  "blue" | "green" | "yellow" | "pink" | "mauve" | "red";

export type AboutCardLayoutKey = "default" | "feature";

export type AboutCardContent =
  | {
    kind: "paragraph";
    text: string;
  }
  | {
    kind: "list";
    items: string[];
  };

export interface AboutCard {
  id: string;
  eyebrow: string;
  label: string;
  icon: AboutCardIconKey;
  tone: AboutCardToneKey;
  layout: AboutCardLayoutKey;
  content: AboutCardContent;
}

export const ABOUT_CARDS: AboutCard[] = [
  {
    id: "bio",
    eyebrow: "Profile",
    label: "Bio",
    icon: "code",
    tone: "blue",
    layout: "feature",
    content: {
      kind: "paragraph",
      text: "A full-stack developer and competitive programmer from Bangladesh, focused on building clean, efficient products and writing robust algorithms for competitive programming.",
    },
  },
  {
    id: "education",
    eyebrow: "Academic",
    label: "Education",
    icon: "education",
    tone: "green",
    layout: "default",
    content: {
      kind: "list",
      items: [
        PERSONAL_INFO.degree,
        PERSONAL_INFO.university,
        `CGPA ${PERSONAL_INFO.cgpa} - 7th Semester`,
      ],
    },
  },
  {
    id: "competitive",
    eyebrow: "Performance",
    label: "Competitive Programming",
    icon: "competitive",
    tone: "yellow",
    layout: "default",
    content: {
      kind: "list",
      items: [
        "Competitive Programmer at UAP",
        "Max rating on Codeforces and CodeChef",
        "Solved 1000+ CP problems",
        "BeeCrowd active participant",
      ],
    },
  },
  {
    id: "location",
    eyebrow: "Availability",
    label: "Location",
    icon: "location",
    tone: "pink",
    layout: "default",
    content: {
      kind: "list",
      items: [
        PERSONAL_INFO.location,
        "Open to opportunities worldwide",
        "Open to opportunities in Bangladesh",
      ],
    },
  },
  {
    id: "current",
    eyebrow: "Now",
    label: "Currently",
    icon: "current",
    tone: "mauve",
    layout: "feature",
    content: {
      kind: "paragraph",
      text: "Fourth-year Computer Science and Engineering student at University of Asia Pacific, building projects like Horizon and RootReach.",
    },
  },
  {
    id: "interests",
    eyebrow: "Focus",
    label: "Interests",
    icon: "interests",
    tone: "red",
    layout: "default",
    content: {
      kind: "list",
      items: [
        "Full-stack Web Development",
        "Competitive Programming",
        "Machine Learning",
        "Problem solving and algorithms",
      ],
    },
  },
];

export const SKILLS = {
  languages: [
    { name: "C", level: "Advanced", category: "Programming Language" },
    { name: "C++", level: "Advanced", category: "Programming Language" },
    { name: "Python", level: "Intermediate", category: "Programming Language" },
    { name: "JavaScript", level: "Beginner", category: "Programming Language" },
    { name: "TypeScript", level: "Beginner", category: "Programming Language" },
  ],
  frameworks: [
    { name: "Next.js", level: "Intermediate", category: "Framework" },
    { name: "React", level: "Intermediate", category: "Framework" },
    { name: "Django", level: "Intermediate", category: "Framework" },
    { name: "Tailwind CSS", level: "Advanced", category: "Framework" },
  ],
  tools: [
    { name: "SQLite", level: "Intermediate", category: "Database" },
    { name: "MySQL", level: "Intermediate", category: "Database" },
    { name: "Git", level: "Advanced", category: "Tool" },
    { name: "Linux", level: "Intermediate", category: "Tool" },
    { name: "Markdown", level: "Advanced", category: "Tool" },
  ],
  fundamentals: [
    { name: "OOP", level: "Advanced", category: "Fundamental" },
    { name: "Data Structures", level: "Advanced", category: "Fundamental" },
    { name: "Algorithms", level: "Advanced", category: "Fundamental" },
    { name: "Basic System Design", level: "Beginner", category: "Fundamental" },
  ],
};

export interface SkillLogo {
  name: string;
  path?: string;
  darkPath?: string;
  lightPath?: string;
}

export type ProjectStatusKey = "active" | "stable" | "prototype" | "research";

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  githubUrl: string;
  githubRepo: string;
  liveUrl: string | null;
  featured: boolean;
  wide?: boolean;
  image: string;
  category: string;
  extensionId?: string;
  status?: ProjectStatusKey;
  tags?: string[];
  highlight?: string;
}

export const SKILL_LOGOS: SkillLogo[] = [
  { name: "C", path: "/tech-logos/c.svg" },
  { name: "C++", path: "/tech-logos/cpp.svg" },
  { name: "Python", path: "/tech-logos/python.svg" },
  { name: "JavaScript", path: "/tech-logos/javascript.svg" },
  { name: "TypeScript", path: "/tech-logos/typescript.svg" },
  { name: "C#", path: "/tech-logos/csharp.svg" },
  { name: "Java", path: "/tech-logos/java.svg" },
  { name: "Next.js", path: "/tech-logos/nextjs.svg" },
  {
    name: "React",
    darkPath: "/tech-logos/react-d.svg",
    lightPath: "/tech-logos/react-l.svg",
  },
  { name: "Django", path: "/tech-logos/django.svg" },
  { name: ".NET", path: "/tech-logos/dotnet.svg" },
  { name: "Angular", path: "/tech-logos/angular.svg" },
  { name: "Tailwind CSS", path: "/tech-logos/tailwindcss.svg" },
  { name: "Bootstrap", path: "/tech-logos/bootstrap.svg" },
  { name: "SQLite", path: "/tech-logos/sqlite.svg" },
  {
    name: "MySQL",
    darkPath: "/tech-logos/mysql-d.svg",
    lightPath: "/tech-logos/mysql-l.svg",
  },
  { name: "PostgreSQL", path: "/tech-logos/postgresql.svg" },
  { name: "Convex", path: "/tech-logos/convex.svg" },
  { name: "Supabase", path: "/tech-logos/supabase.svg" },
  { name: "Git", path: "/tech-logos/git.svg" },
  { name: "Linux", path: "/tech-logos/linux.svg" },
  {
    name: "Markdown",
    darkPath: "/tech-logos/markdown-d.svg",
    lightPath: "/tech-logos/markdown-l.svg",
  },
];

export const PROJECTS: Project[] = [
  {
    title: "Horizon",
    description:
      "Django-based event management website designed to organize, showcase, and book events efficiently. It allows organizers to create and manage events such as conferences, concerts, workshops, and weddings, while users can easily explore and book events online.",
    techStack: ["Django", "Python", "HTML", "CSS", "SQL"],
    githubUrl: "https://github.com/SnoOpWo0t/Horizon-Planners",
    githubRepo: "SnoOpWo0t/Horizon-Planners",
    liveUrl: "https://horizon-planners.vercel.app/",
    featured: true,
    wide: true,
    image: "/projects/horizon.png",
    category: "Web Development",
    status: "active",
    tags: ["Event Management", "Django"],
    highlight: "Comprehensive event booking system",
  },
  {
    title: "RootReach",
    description:
      "PC-component e-commerce platform featuring a product catalog, CRUD operations, cart functionality, and an admin panel.",
    techStack: ["Django", "Python", "Tailwind CSS", "SQLite"],
    githubUrl:
      "https://github.com/SnoOpWo0t/RootReach-Rural-E-Commerce-Platform",
    githubRepo: "SnoOpWo0t/RootReach-Rural-E-Commerce-Platform",
    liveUrl: "https://root-reach.vercel.app/",
    featured: true,
    image: "/projects/rootreach.png",
    category: "Web Development",
    status: "stable",
    tags: ["E-commerce", "Admin"],
    highlight: "Full-featured online store",
  },
  {
    title: "Different-Programming-Platform",
    description:
      "GitHub repository of 1000+ solutions for problems from Codeforces, LeetCode, and 25+ other online judges. Maintained regularly.",
    techStack: ["C", "C++", "Python", "Algorithms", "Data Structures"],
    githubUrl: "https://github.com/SnoOpWo0t/Different-Programming-Platform",
    githubRepo: "SnoOpWo0t/Different-Programming-Platform",
    liveUrl: null,
    featured: true,
    image: "/projects/DifferentCodeplatform.png",
    category: "Competitive Programming",
    status: "active",
    tags: ["1000+ Solutions", "Competitive", "Algorithms"],
    highlight: "Large indexed competitive programming archive",
  },
  {
    title: "Dx-Ball (OpenGL)",
    description: "A classic Dx-Ball game clone developed using OpenGL in C++.",
    techStack: ["C++", "OpenGL", "Computer Graphics"],
    githubUrl: "https://github.com/SnoOpWo0t/Dx-Ball--OpenGl",
    githubRepo: "SnoOpWo0t/Dx-Ball--OpenGl",
    liveUrl: null,
    featured: false,
    image: "/projects/DxBall.png",
    category: "Game Development",
    status: "stable",
    tags: ["Game Dev", "OpenGL"],
    highlight: "Classic arcade game clone",
  },
  {
    title: "Mini-Compiler",
    description:
      "A small-scale compiler implementation demonstrating lexical analysis and parsing techniques.",
    techStack: ["C++", "Compiler Design", "Flex", "Bison"],
    githubUrl: "https://github.com/SnoOpWo0t/Mini-Compiler",
    githubRepo: "SnoOpWo0t/Mini-Compiler",
    liveUrl: null,
    featured: false,
    image: "",
    category: "Systems Programming",
    status: "prototype",
    tags: ["Compiler", "Lexical Analysis"],
    highlight: "Custom compiler implementation",
  },
  {
    title: "BeeCrowd URI Solutions",
    description:
      "A collection of solutions for BeeCrowd (formerly URI Online Judge) programming problems.",
    techStack: ["C", "C++", "Problem Solving"],
    githubUrl: "https://github.com/SnoOpWo0t/BeeCrowd-uri-problem-solution",
    githubRepo: "SnoOpWo0t/BeeCrowd-uri-problem-solution",
    liveUrl: null,
    featured: false,
    image: "",
    category: "Competitive Programming",
    status: "active",
    tags: ["BeeCrowd", "Algorithms"],
    highlight: "Extensive problem-solving archive",
  },
  {
    title: "Computer Science Notes",
    description:
      "A curated repository containing various notes and study materials related to Computer Science.",
    techStack: ["Markdown", "Documentation", "Computer Science"],
    githubUrl: "https://github.com/SnoOpWo0t/Computer-Science-Notes-Materials",
    githubRepo: "SnoOpWo0t/Computer-Science-Notes-Materials",
    liveUrl: null,
    featured: false,
    image: "",
    category: "Documentation",
    status: "active",
    tags: ["CS Notes", "Study Materials"],
    highlight: "Comprehensive CS resources",
  },
];

export type AchievementType =
  | "competition"
  | "scholarship"
  | "academic"
  | "rating"
  | "certification"
  | "training"
  | "volunteer";

export type AchievementViewType = "link" | "image";

export interface Achievement {
  title: string;
  organization: string;
  date: string;
  description: string;
  link: string | null;
  certificateImage: string | null;
  certificateImages?: string[];
  type: AchievementType;
  viewType: AchievementViewType;
  featured?: boolean;
}

export const ACHIEVEMENTS: Achievement[] = [
  /* 
  {
    title: "ICPC Dhaka Regionalist 2024",
    organization: "ICPC",
    date: "November 2024",
    description:
      "Competed in the prestigious ICPC Asia West Continent Dhaka Regional Contest",
    link: null,
    certificateImage: "/certificates/icpc-dhaka-2024.jpg",
    type: "competition",
    viewType: "image",
    featured: true,
  },

 */
  {
    title: "KUET BITFEST 2025",
    organization: "Khulna University of Engineering & Technology",
    date: "January 4, 2024",
    description: "Participated in KUET BITFEST programming contest",
    link: null,
    certificateImage: "/certificates/kuet-bitfest-2025.jpg",
    type: "competition",
    viewType: "image",
  },
  {
    title: "BUBT IUCPC 2025",
    organization: "Bangladesh University of Business & Technology",
    date: "2025",
    description:
      "Participated in BUBT Inter University Collaborative Programming Contest 2025",
    link: null,
    certificateImage: "/certificates/bubt-biucpc-2025.jpg",
    type: "competition",
    viewType: "image",
  },
  {
    title: "UAP Inter University Collaborative Programming Contest 1.0",
    organization: "University of Asia Pacific",
    date: "January 27, 2024",
    description:
      "Participated in the first Inter University Collaborative Programming Contest at UAP",
    link: null,
    certificateImage: "",
    type: "competition",
    viewType: "image",
  },
  /*
  {
    title: "ICPC Jamilur Reza Chowdhury Scholarship",
    organization: "ICPC Foundation",
    date: "3 Semesters",
    description:
      "Received scholarship for 3 semesters (Spring 2023, Fall 2023, Spring 2024) for Competitive Programming excellence",
    link: null,
    certificateImage: "/certificates/jrc-scholarship.jpg",
    type: "scholarship",
    viewType: "image",
    featured: true,
  },

  */
  {
    title: "Dean's Awards (2x) & Vice Chancellor Award (1x)",
    organization: "University of Asia Pacific",
    date: "2022-2025",
    description:
      "Received academic excellence awards for maintaining high CGPA across multiple semesters",
    link: null,
    certificateImage: "/certificates/Vc Award.jpg",
    certificateImages: [
      "/certificates/Vc Award.jpg",
      "/certificates/dean Awards (1).jpg",
      "/certificates/dean Awards (2).jpg",
    ],
    type: "academic",
    viewType: "image",
    featured: true,
  },
  /* 
  {
    title: "Champion, Ekushey Intra Department Programming Contest 2023",
    organization: "University of Asia Pacific",
    date: "February 2023",
    description: "Won first place in the Intra Department Programming Contest",
    link: null,
    certificateImage: "/certificates/ekushey-2023.jpg",
    type: "competition",
    viewType: "image",
    featured: true,
  },
  */
  {
    title: "Codeforces Specialist (Max Rating: 1438)",
    organization: "Codeforces",
    date: "Ongoing",
    description:
      "Achieved Specialist rank on Codeforces competitive programming platform",
    link: "https://codeforces.com/profile/SnoOpWo0t",
    certificateImage: null,
    type: "rating",
    viewType: "link",
    featured: true,
  },
  {
    title: "CodeChef 3 Stars (Max Rating: 1635)",
    organization: "CodeChef",
    date: "Ongoing",
    description:
      "Achieved 3-star rating on CodeChef competitive programming platform",
    link: "https://www.codechef.com/users/SnoOpWo0t",
    certificateImage: null,
    type: "rating",
    viewType: "link",
  },
  {
    title: "HackerRank Problem Solving (Basic)",
    organization: "HackerRank",
    date: "August 2, 2024",
    description:
      "Completed HackerRank Problem Solving certification at Basic level",
    link: "https://www.hackerrank.com/certificates/0e0b3a6b156d",
    certificateImage: null,
    type: "certification",
    viewType: "link",
  },
  {
    title: "HackerRank Python (Basic)",
    organization: "HackerRank",
    date: "September 25, 2024",
    description: "Completed HackerRank Python certification at Basic level",
    link: "https://www.hackerrank.com/certificates/e69d1f3ead28",
    certificateImage: null,
    type: "certification",
    viewType: "link",
  },

  {
    title: "Master Git and Github - Beginner to Expert",
    organization: "Udemy",
    date: "2026",
    description:
      "Completed the Master Git and Github - Beginner to Expert",
    link: "https://www.udemy.com/certificate/UC-8e847161-8019-4b28-8b4d-73e80c7ab2bc/",
    certificateImage: "/certificates/udemy git & github.jpg",
    type: "certification",
    viewType: "link",
  },

  {
    title: "Machine Learning Training Program",
    organization: "Department of CSE, University of Asia Pacific",
    date: "June 4 - July 2, 2023",
    description: "Completed comprehensive machine learning training program",
    link: null,
    certificateImage: "",
    type: "training",
    viewType: "image",
  },
  {
    title: "EEE TECH FEST 2.0 Programming Contest",
    organization: "University of Asia Pacific",
    date: "June 3, 2024",
    description:
      "Participated in EEE TECH FEST 2.0 Intra University Programming Contest",
    link: null,
    certificateImage: "",
    type: "competition",
    viewType: "image",
  },
  {
    title: "EEE TECH FEST 2023 Intra University Programming Contest",
    organization: "University of Asia Pacific",
    date: "March 29, 2023",
    description:
      "Participated in EEE TECH FEST 2023 Intra University Programming Contest",
    link: null,
    certificateImage: "",
    type: "competition",
    viewType: "image",
  },
  /*
  {
    title: "5th Place, Inter Department Math Olympiad 3.0 & 4.0",
    organization: "University of Asia Pacific",
    date: "2023, 2024",
    description:
      "Secured 5th position in university math olympiad for two consecutive years",
    link: null,
    certificateImage: "/certificates/math-olympiad.jpg",
    type: "competition",
    viewType: "image",
  },
  */
  {
    title: "Volunteer - 11th Convocation of University of Asia Pacific",
    organization: "University of Asia Pacific",
    date: "July 26, 2025",
    description:
      "Volunteered in organizing and coordinating the university's convocation ceremony",
    link: null,
    certificateImage: "",
    type: "volunteer",
    viewType: "image",
  },
  {
    title:
      "Volunteer - National IT Competition for Youth with Disabilities 2025",
    organization: "Government of Bangladesh",
    date: "May 31, 2025",
    description:
      "Supported participants and technical arrangements for inclusive technology competition",
    link: null,
    certificateImage: "",
    type: "volunteer",
    viewType: "image",
  },
  /*
  {
    title: "Volunteer - Prize Giving Ceremony for WMTC Winners",
    organization: "World Mathematics Team Championship",
    date: "February 8, 2025",
    description:
      "Coordinated prize distribution for World Mathematics Team Championship winners",
    link: null,
    certificateImage: "/certificates/wmtc-volunteer-2025.jpg",
    type: "volunteer",
    viewType: "image",
  },
  */
];

export const EXPERIENCE = [
  {
    title: "BSc (Eng.) in Computer Science and Engineering",
    organization: "University of Asia Pacific",
    location: "Dhaka, Bangladesh",
    startDate: "July 2022",
    endDate: "July 2026 (Expected)",
    description: [
      "CGPA: 3.51 / 4.00 (after 7 semesters)",
      "Received 1 Vice Chancellor Award and 2 Dean's Awards",
      "Focus areas: Software Engineering, Web Development, AI/ML, Data Structures & Algorithms",
    ],
    type: "education",
  },
  {
    title: "Trainee Software Engineer (Intern)",
    organization: "Eutropia It Solutions Ltd",
    location: "Dhaka, Bangladesh",
    startDate: "February 2026",
    endDate: "Present",
    description: [
      "Working on SQA Projects",
      "Learning industry-standard software engineering practices from experienced mentors",
      "Collaborating with cross-functional teams on international client projects",
    ],
    type: "work",
  },
  {
    title: "Competitive Programming Trainer & Mentor",
    organization: "University of Asia Pacific",
    location: "Dhaka, Bangladesh",
    startDate: "July 2024",
    endDate: "Present",
    description: [
      "Training and mentoring students in competitive programming and problem-solving",
      "Conducting multiple weekly training and practice sessions",
      "Helping students prepare for national and international programming contests",
      "Building a strong competitive programming community at UAP",
    ],
    type: "teaching",
  },
];

export const ORGANIZING_VOLUNTEERING = [
  {
    title:
      "Organizer at the UAP Inter University Collaborative Programming Contest 1.0",
    date: "January 26 & 27, 2024",
    organization: "University of Asia Pacific",
    description:
      "Organized Inter University programming contest bringing together students from multiple private universities",
    category: "organizer",
  },
  {
    title: "Organizer at the Intra University Math Fest 3.0",
    date: "May 6, 2025",
    organization: "University of Asia Pacific",
    description:
      "Organized third edition of math olympiad fostering problem-solving culture",
    category: "organizer",
  },
  {
    title: "Organizer at the Intra University Math Fest 2.0",
    date: "October 28, 2024",
    organization: "University of Asia Pacific",
    description:
      "Organized second edition of university math olympiad with increased participation",
    category: "organizer",
  },
  {
    title: "Organizer at the JRC Memorial 1st Intra University Math Fest 2023",
    date: "March 28, 2023",
    organization: "University of Asia Pacific",
    description:
      "Organized inaugural math olympiad in memory of Professor Jamilur Reza Chowdhury",
    category: "organizer",
  },
  {
    title: "Volunteer at the Prize Giving Ceremony for WMTC Winners",
    date: "February 8, 2025",
    organization: "World Mathematics Team Championship",
    description:
      "Coordinated prize distribution for World Mathematics Team Championship winners",
    category: "volunteer",
  },
  {
    title: "Volunteer at the 11th Convocation of University of Asia Pacific",
    date: "July 26, 2025",
    organization: "University of Asia Pacific",
    description:
      "Assisted in organizing and coordinating the university's convocation ceremony",
    category: "volunteer",
  },
  {
    title:
      "Volunteer at the National IT Competition for Youth with Disabilities 2025",
    date: "May 31, 2025",
    organization: "National Initiative",
    description:
      "Supported participants and technical arrangements for inclusive technology competition",
    category: "volunteer",
  },
];

export const BENGALI_TERM_OVERRIDES: ReadonlyArray<readonly [string, string]> =
  [
    ["Agent Assisted Development", "এজেন্ট অ্যাসিস্টেড ডেভেলপমেন্ট"],
    ["Competitive Programming", "কম্পিটিটিভ প্রোগ্রামিং"],
    ["problem-solving", "প্রবলেম সলভিং"],
    ["problem solving", "প্রবলেম সলভিং"],
    ["Open-source", "ওপেন-সোর্স"],
    ["opportunities", "অপরচুনিটিজ"],
    ["opportunity", "অপরচুনিটি"],
    ["featured", "ফিচার্ড"],
    ["Featured", "ফিচার্ড"],
    ["technologies", "টেকনোলজিস"],
    ["Technologies", "টেকনোলজিস"],
    ["skills", "স্কিলস"],
    ["Skills", "স্কিলস"],
    ["teaching", "টিচিং"],
    ["Teaching", "টিচিং"],
    ["training", "ট্রেনিং"],
    ["Training", "ট্রেনিং"],
    ["modern", "মডার্ন"],
    ["Modern", "মডার্ন"],
    ["real", "রিয়েল"],
    ["Real", "রিয়েল"],
    ["clean", "ক্লিন"],
    ["Clean", "ক্লিন"],
    ["efficient", "এফিশিয়েন্ট"],
    ["Efficient", "এফিশিয়েন্ট"],
    ["reliable", "রিলায়েবল"],
    ["Reliable", "রিলায়েবল"],
    ["complex", "কমপ্লেক্স"],
    ["Complex", "কমপ্লেক্স"],
    ["idea", "আইডিয়া"],
    ["Idea", "আইডিয়া"],
    ["development", "ডেভেলপমেন্ট"],
    ["Development", "ডেভেলপমেন্ট"],
    ["assisted", "অ্যাসিস্টেড"],
    ["Assisted", "অ্যাসিস্টেড"],
    ["resume", "রেজুমে"],
    ["Resume", "রেজুমে"],
    ["competitive", "কম্পিটিটিভ"],
    ["Competitive", "কম্পিটিটিভ"],
    ["open", "অপেন"],
    ["Open", "অপেন"],
    ["hidden", "হিডেন"],
    ["Hidden", "হিডেন"],
    ["experience", "এক্সপেরিয়েন্স"],
    ["Experience", "এক্সপেরিয়েন্স"],
    ["AI/ML", "এআই/এমএল"],
    ["AI", "এআই"],
    ["CGPA", "সিজিপিএ"],
    ["cgpa", "সিজিপিএ"],
    ["7th", "৭ম"],
    ["Semester", "সেমিস্টার"],
    ["semester", "সেমিস্টার"],
    ["Dhaka", "ঢাকা"],
    ["Bangladesh", "বাংলাদেশ"],
    ["University of Asia Pacific", "ইউনিভার্সিটি অব এশিয়া প্যাসিফিক"],
    [
      "World Mathematics Team Championship",
      "ওয়ার্ল্ড ম্যাথেমেটিক্স টিম চ্যাম্পিয়নশিপ",
    ],
    ["National Initiative", "জাতীয় ইনিশিয়েটিভ"],
    ["January", "জানুয়ারি"],
    ["February", "ফেব্রুয়ারি"],
    ["March", "মার্চ"],
    ["April", "এপ্রিল"],
    ["May", "মে"],
    ["June", "জুন"],
    ["July", "জুলাই"],
    ["August", "আগস্ট"],
    ["September", "সেপ্টেম্বর"],
    ["October", "অক্টোবর"],
    ["November", "নভেম্বর"],
    ["December", "ডিসেম্বর"],
    ["Present", "বর্তমান"],
    ["Expected", "প্রত্যাশিত"],
  ];

export const BENGALI_DIGIT_MAP: Readonly<Record<string, string>> = {
  "0": "০",
  "1": "১",
  "2": "২",
  "3": "৩",
  "4": "৪",
  "5": "৫",
  "6": "৬",
  "7": "৭",
  "8": "৮",
  "9": "৯",
};
