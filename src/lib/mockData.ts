export type UserRole = 'freelancer' | 'client' | 'admin';

export type MembershipLevel = 'New Seller' | 'Rising Talent' | 'Level 1' | 'Level 2' | 'Top Rated';

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
  subcategories: string[];
  gigCount: number;
}

export interface GigPackage {
  name: 'Basic' | 'Standard' | 'Premium';
  price: number;
  delivery: number;
  revisions: string;
  description: string;
  features: string[];
}

export interface Review {
  id: string;
  author: string;
  authorAvatar: string;
  rating: number;
  comment: string;
  date: string;
  helpful: number;
}

export interface Gig {
  id: string;
  title: string;
  freelancerId: string;
  freelancerName: string;
  freelancerAvatar: string;
  freelancerLevel: MembershipLevel;
  category: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  startingPrice: number;
  packages: GigPackage[];
  deliveryDays: number;
  responseTime: string;
  image: string;
  gallery: string[];
  description: string;
  faqs: { q: string; a: string }[];
  reviews: Review[];
  inQueue: number;
  featured: boolean;
}

export interface Job {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  clientAvatar: string;
  budget: { min: number; max: number };
  category: string;
  skills: string[];
  deadline: string;
  experienceLevel: 'Entry' | 'Intermediate' | 'Expert';
  proposalsCount: number;
  postedDate: string;
  location: string;
  verified: boolean;
}

export interface Freelancer {
  id: string;
  name: string;
  avatar: string;
  banner: string;
  title: string;
  level: MembershipLevel;
  rating: number;
  reviewCount: number;
  completedProjects: number;
  responseTime: string;
  location: string;
  bio: string;
  skills: string[];
  experience: { role: string; company: string; period: string; description: string }[];
  education: { degree: string; school: string; period: string }[];
  certifications: { name: string; issuer: string; date: string }[];
  portfolio: { title: string; image: string; url: string }[];
  hourlyRate: number;
  availability: 'Full-time' | 'Part-time' | 'Not Available';
  languages: { name: string; level: string }[];
  earnings: number;
}

export const categories: Category[] = [
  {
    id: 'graphics-design',
    name: 'Graphics & Design',
    icon: 'Palette',
    color: 'from-rose-500 to-orange-500',
    subcategories: ['Logo Design', 'Brand Identity', 'Web Design', 'Illustration', 'Packaging'],
    gigCount: 18420,
  },
  {
    id: 'programming-tech',
    name: 'Programming & Tech',
    icon: 'Code2',
    color: 'from-primary-500 to-accent-500',
    subcategories: ['Web Development', 'Mobile Apps', 'AI Services', 'DevOps', 'Cybersecurity'],
    gigCount: 24680,
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    icon: 'Megaphone',
    color: 'from-amber-500 to-yellow-500',
    subcategories: ['SEO', 'Social Media', 'Email Marketing', 'PPC', 'Content Marketing'],
    gigCount: 15320,
  },
  {
    id: 'video-animation',
    name: 'Video & Animation',
    icon: 'Video',
    color: 'from-violet-500 to-fuchsia-500',
    subcategories: ['Video Editing', 'Animation', 'Motion Graphics', '3D Modeling', 'Subtitles'],
    gigCount: 9870,
  },
  {
    id: 'writing-translation',
    name: 'Writing & Translation',
    icon: 'PenLine',
    color: 'from-emerald-500 to-teal-500',
    subcategories: ['Copywriting', 'Proofreading', 'Translation', 'Blog Writing', 'Ghostwriting'],
    gigCount: 12450,
  },
  {
    id: 'music-audio',
    name: 'Music & Audio',
    icon: 'Music',
    color: 'from-sky-500 to-blue-500',
    subcategories: ['Mixing & Mastering', 'Voice Over', 'Jingles', 'Podcast Editing', 'Sound Design'],
    gigCount: 6230,
  },
  {
    id: 'business',
    name: 'Business & Consulting',
    icon: 'Briefcase',
    color: 'from-slate-600 to-slate-400',
    subcategories: ['Business Plans', 'Market Research', 'Financial Consulting', 'Legal', 'Virtual Assistant'],
    gigCount: 8100,
  },
  {
    id: 'data-science',
    name: 'Data & AI',
    icon: 'BrainCircuit',
    color: 'from-indigo-500 to-primary-500',
    subcategories: ['Data Analysis', 'Machine Learning', 'Data Visualization', 'Web Scraping', 'NLP'],
    gigCount: 7420,
  },
];

const avatars = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1534528741775-53994a523a6f?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop',
  'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=200&h=200&fit=crop',
];

const banners = [
  'https://images.unsplash.com/photo-1557682250-33bd709cbe85?w=1200&h=300&fit=crop',
  'https://images.unsplash.com/photo-1451187580459-9546f893c31e?w=1200&h=300&fit=crop',
  'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=300&fit=crop',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f587?w=1200&h=300&fit=crop',
];

const portfolioImages = [
  'https://images.unsplash.com/photo-1559028012-481c04fa7829?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1620674156044-52b714665b62?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1558655146-9f403381d617?w=600&h=400&fit=crop',
  'https://images.unsplash.com/photo-1572044162444-ad60f0b9c623?w=600&h=400&fit=crop',
];

export const freelancers: Freelancer[] = [
  {
    id: 'f1',
    name: 'Sarah Chen',
    avatar: avatars[0],
    banner: banners[0],
    title: 'Senior Full-Stack Developer & UI Engineer',
    level: 'Top Rated',
    rating: 5.0,
    reviewCount: 248,
    completedProjects: 312,
    responseTime: '1 hour',
    location: 'San Francisco, USA',
    bio: 'Award-winning full-stack developer with 10+ years building scalable web applications for startups and Fortune 500 companies. Specialized in React, Node.js, and cloud architecture. I turn ideas into polished products.',
    skills: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'GraphQL', 'Docker', 'Next.js'],
    experience: [
      { role: 'Senior Software Engineer', company: 'TechFlow Inc', period: '2021 - Present', description: 'Leading a team of 6 engineers building enterprise SaaS products with React and Node.js.' },
      { role: 'Full-Stack Developer', company: 'StartHub', period: '2018 - 2021', description: 'Built and maintained multiple client web applications from scratch.' },
    ],
    education: [
      { degree: 'M.S. Computer Science', school: 'Stanford University', period: '2014 - 2016' },
      { degree: 'B.S. Software Engineering', school: 'UC Berkeley', period: '2010 - 2014' },
    ],
    certifications: [
      { name: 'AWS Solutions Architect', issuer: 'Amazon Web Services', date: '2023' },
      { name: 'Certified Kubernetes Developer', issuer: 'CNCF', date: '2022' },
    ],
    portfolio: [
      { title: 'FinTech Dashboard', image: portfolioImages[0], url: '#' },
      { title: 'AI Chat Interface', image: portfolioImages[1], url: '#' },
      { title: 'E-commerce Platform', image: portfolioImages[2], url: '#' },
      { title: 'Analytics Suite', image: portfolioImages[3], url: '#' },
    ],
    hourlyRate: 85,
    availability: 'Full-time',
    languages: [{ name: 'English', level: 'Native' }, { name: 'Mandarin', level: 'Fluent' }],
    earnings: 245000,
  },
  {
    id: 'f2',
    name: 'Marcus Rodriguez',
    avatar: avatars[1],
    banner: banners[1],
    title: 'Brand Identity & Logo Design Expert',
    level: 'Top Rated',
    rating: 4.9,
    reviewCount: 312,
    completedProjects: 450,
    responseTime: '30 min',
    location: 'Barcelona, Spain',
    bio: 'Creative designer with a passion for crafting memorable brand identities. 8+ years working with global brands. Every pixel matters.',
    skills: ['Logo Design', 'Brand Identity', 'Illustrator', 'Photoshop', 'Figma', 'Typography', 'Packaging'],
    experience: [
      { role: 'Creative Director', company: 'BrandLab Studio', period: '2020 - Present', description: 'Leading brand identity projects for clients worldwide.' },
      { role: 'Senior Designer', company: 'PixelForge', period: '2016 - 2020', description: 'Designed logos and brand systems for 200+ companies.' },
    ],
    education: [{ degree: 'B.A. Graphic Design', school: ' Elisava Barcelona', period: '2012 - 2016' }],
    certifications: [{ name: 'Adobe Certified Expert', issuer: 'Adobe', date: '2021' }],
    portfolio: [
      { title: 'Coffee Brand Identity', image: portfolioImages[4], url: '#' },
      { title: 'Tech Startup Logo', image: portfolioImages[5], url: '#' },
      { title: 'Restaurant Branding', image: portfolioImages[0], url: '#' },
    ],
    hourlyRate: 65,
    availability: 'Full-time',
    languages: [{ name: 'Spanish', level: 'Native' }, { name: 'English', level: 'Fluent' }],
    earnings: 189000,
  },
  {
    id: 'f3',
    name: 'Priya Sharma',
    avatar: avatars[2],
    banner: banners[2],
    title: 'Digital Marketing Strategist & SEO Specialist',
    level: 'Level 2',
    rating: 4.8,
    reviewCount: 178,
    completedProjects: 220,
    responseTime: '2 hours',
    location: 'Mumbai, India',
    bio: 'Data-driven marketer helping businesses grow their online presence. Specialized in SEO, content strategy, and paid advertising with proven ROI.',
    skills: ['SEO', 'Google Ads', 'Content Marketing', 'Social Media', 'Analytics', 'Email Marketing', 'Funnels'],
    experience: [
      { role: 'Marketing Manager', company: 'GrowthLab', period: '2019 - Present', description: 'Managing SEO and paid campaigns for 15+ clients simultaneously.' },
    ],
    education: [{ degree: 'MBA Marketing', school: 'IIM Bangalore', period: '2015 - 2017' }],
    certifications: [{ name: 'Google Analytics Certified', issuer: 'Google', date: '2023' }, { name: 'HubSpot Inbound', issuer: 'HubSpot', date: '2022' }],
    portfolio: [
      { title: 'SEO Campaign Results', image: portfolioImages[1], url: '#' },
      { title: 'Social Media Strategy', image: portfolioImages[3], url: '#' },
    ],
    hourlyRate: 45,
    availability: 'Part-time',
    languages: [{ name: 'English', level: 'Fluent' }, { name: 'Hindi', level: 'Native' }],
    earnings: 98000,
  },
  {
    id: 'f4',
    name: 'James Anderson',
    avatar: avatars[3],
    banner: banners[3],
    title: 'Mobile App Developer (iOS & Android)',
    level: 'Level 2',
    rating: 4.9,
    reviewCount: 156,
    completedProjects: 98,
    responseTime: '1 hour',
    location: 'London, UK',
    bio: 'Building beautiful, performant mobile apps with React Native and Flutter. From MVP to App Store. Let us bring your app idea to life.',
    skills: ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Firebase', 'App Store', 'UI/UX'],
    experience: [
      { role: 'Mobile Lead', company: 'AppWorks', period: '2020 - Present', description: 'Leading mobile development for fintech and health apps.' },
    ],
    education: [{ degree: 'B.S. Computer Science', school: 'Imperial College London', period: '2014 - 2018' }],
    certifications: [{ name: 'Flutter Certified Developer', issuer: 'Google', date: '2022' }],
    portfolio: [
      { title: 'Fitness App', image: portfolioImages[2], url: '#' },
      { title: 'Banking App', image: portfolioImages[5], url: '#' },
    ],
    hourlyRate: 70,
    availability: 'Full-time',
    languages: [{ name: 'English', level: 'Native' }],
    earnings: 156000,
  },
  {
    id: 'f5',
    name: 'Elena Volkov',
    avatar: avatars[4],
    banner: banners[0],
    title: 'Motion Graphics & Video Animation Artist',
    level: 'Rising Talent',
    rating: 5.0,
    reviewCount: 67,
    completedProjects: 89,
    responseTime: '3 hours',
    location: 'Berlin, Germany',
    bio: 'Bringing stories to life through motion. Specialized in 2D animation, explainer videos, and motion graphics for brands.',
    skills: ['After Effects', 'Motion Graphics', '2D Animation', 'Premiere Pro', 'Cinema 4D', 'Illustration'],
    experience: [{ role: 'Motion Designer', company: 'MotionLab', period: '2021 - Present', description: 'Creating animated content for brands and agencies.' }],
    education: [{ degree: 'B.A. Animation', school: 'Berlin University of the Arts', period: '2017 - 2021' }],
    certifications: [],
    portfolio: [
      { title: 'Product Explainer Video', image: portfolioImages[4], url: '#' },
      { title: 'Brand Animation', image: portfolioImages[1], url: '#' },
    ],
    hourlyRate: 55,
    availability: 'Part-time',
    languages: [{ name: 'German', level: 'Native' }, { name: 'English', level: 'Fluent' }],
    earnings: 67000,
  },
  {
    id: 'f6',
    name: 'David Kim',
    avatar: avatars[5],
    banner: banners[1],
    title: 'Data Scientist & Machine Learning Engineer',
    level: 'Top Rated',
    rating: 4.9,
    reviewCount: 142,
    completedProjects: 175,
    responseTime: '1 hour',
    location: 'Seoul, South Korea',
    bio: 'Turning data into decisions. Expert in ML pipelines, NLP, and predictive modeling. PhD in Computer Science.',
    skills: ['Python', 'TensorFlow', 'PyTorch', 'NLP', 'Computer Vision', 'Pandas', 'SQL', 'AWS SageMaker'],
    experience: [{ role: 'Lead Data Scientist', company: 'DataInsights', period: '2020 - Present', description: 'Building ML models for fraud detection and recommendation systems.' }],
    education: [{ degree: 'Ph.D. Computer Science', school: 'KAIST', period: '2016 - 2020' }],
    certifications: [{ name: 'TensorFlow Developer Certificate', issuer: 'Google', date: '2023' }],
    portfolio: [
      { title: 'Recommendation Engine', image: portfolioImages[3], url: '#' },
      { title: 'Data Visualization Dashboard', image: portfolioImages[0], url: '#' },
    ],
    hourlyRate: 95,
    availability: 'Full-time',
    languages: [{ name: 'Korean', level: 'Native' }, { name: 'English', level: 'Fluent' }],
    earnings: 210000,
  },
];

export const gigs: Gig[] = [
  {
    id: 'g1',
    title: 'I will build a modern full-stack web app with React and Node.js',
    freelancerId: 'f1',
    freelancerName: 'Sarah Chen',
    freelancerAvatar: avatars[0],
    freelancerLevel: 'Top Rated',
    category: 'programming-tech',
    tags: ['React', 'Node.js', 'TypeScript', 'Full-Stack'],
    rating: 5.0,
    reviewCount: 248,
    startingPrice: 250,
    packages: [
      { name: 'Basic', price: 250, delivery: 7, revisions: '1', description: 'Landing page with React', features: ['1 page', 'Responsive design', 'Source code', '1 revision'] },
      { name: 'Standard', price: 600, delivery: 14, revisions: '3', description: 'Multi-page app with backend', features: ['Up to 5 pages', 'Node.js API', 'Database setup', '3 revisions', 'Deployment'] },
      { name: 'Premium', price: 1500, delivery: 30, revisions: 'Unlimited', description: 'Full SaaS with auth & payments', features: ['Unlimited pages', 'Full backend', 'Auth & payments', 'Admin dashboard', 'Unlimited revisions', '30 days support'] },
    ],
    deliveryDays: 7,
    responseTime: '1 hour',
    image: 'https://images.unsplash.com/photo-1633356122544-f073ef97b077?w=800&h=500&fit=crop',
    gallery: [portfolioImages[0], portfolioImages[1], portfolioImages[3]],
    description: 'I will build a production-ready, scalable web application using the latest technologies. With 10+ years of experience and 300+ projects delivered, I ensure clean code, modern design, and pixel-perfect implementation. Every project includes responsive design, SEO optimization, and clean documentation.',
    faqs: [
      { q: 'Do you provide source code?', a: 'Yes, you get the full source code with documentation.' },
      { q: 'Which technologies do you use?', a: 'React, TypeScript, Node.js, PostgreSQL, and AWS.' },
      { q: 'Do you offer post-delivery support?', a: 'Yes, the Premium package includes 30 days of free support.' },
    ],
    reviews: [
      { id: 'r1', author: 'John D.', authorAvatar: avatars[3], rating: 5, comment: 'Outstanding work! Sarah delivered exactly what we needed and more. The code quality is excellent.', date: '2024-08-15', helpful: 12 },
      { id: 'r2', author: 'Lisa M.', authorAvatar: avatars[2], rating: 5, comment: 'Best developer I have worked with on this platform. Highly recommend!', date: '2024-07-20', helpful: 8 },
    ],
    inQueue: 4,
    featured: true,
  },
  {
    id: 'g2',
    title: 'I will design a premium brand identity and logo for your business',
    freelancerId: 'f2',
    freelancerName: 'Marcus Rodriguez',
    freelancerAvatar: avatars[1],
    freelancerLevel: 'Top Rated',
    category: 'graphics-design',
    tags: ['Logo Design', 'Brand Identity', 'Branding'],
    rating: 4.9,
    reviewCount: 312,
    startingPrice: 80,
    packages: [
      { name: 'Basic', price: 80, delivery: 3, revisions: '2', description: '1 logo concept', features: ['1 concept', '2 revisions', 'PNG + JPG', 'Transparent bg'] },
      { name: 'Standard', price: 200, delivery: 5, revisions: '5', description: '3 concepts + brand guide', features: ['3 concepts', '5 revisions', 'All formats', 'Brand guide', 'Social media kit'] },
      { name: 'Premium', price: 500, delivery: 10, revisions: 'Unlimited', description: 'Full brand identity', features: ['5 concepts', 'Unlimited revisions', 'Full brand guide', 'Stationery design', 'Social media kit', 'Copyright transfer'] },
    ],
    deliveryDays: 3,
    responseTime: '30 min',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&h=500&fit=crop',
    gallery: [portfolioImages[4], portfolioImages[5], portfolioImages[0]],
    description: 'A strong brand starts with a great logo. I create memorable brand identities that stand the test of time. With 450+ completed projects, I know what works. You get professional designs, quick delivery, and outstanding communication.',
    faqs: [
      { q: 'What files do I receive?', a: 'AI, EPS, PDF, PNG, JPG and SVG formats.' },
      { q: 'Do you offer copyright transfer?', a: 'Yes, full copyright transfer is included in the Premium package.' },
    ],
    reviews: [
      { id: 'r3', author: 'Anna K.', authorAvatar: avatars[4], rating: 5, comment: 'Marcus created a beautiful logo that perfectly captures our brand. Highly recommend!', date: '2024-09-01', helpful: 15 },
    ],
    inQueue: 8,
    featured: true,
  },
  {
    id: 'g3',
    title: 'I will optimize your website SEO and boost Google rankings',
    freelancerId: 'f3',
    freelancerName: 'Priya Sharma',
    freelancerAvatar: avatars[2],
    freelancerLevel: 'Level 2',
    category: 'digital-marketing',
    tags: ['SEO', 'Google Rankings', 'Organic Traffic'],
    rating: 4.8,
    reviewCount: 178,
    startingPrice: 100,
    packages: [
      { name: 'Basic', price: 100, delivery: 7, revisions: '1', description: 'SEO audit + 10 keywords', features: ['Full audit', '10 keywords', 'On-page SEO', 'Report'] },
      { name: 'Standard', price: 300, delivery: 14, revisions: '2', description: 'Full SEO strategy', features: ['30 keywords', 'Technical SEO', 'Content plan', 'Competitor analysis', 'Monthly report'] },
      { name: 'Premium', price: 700, delivery: 30, revisions: 'Unlimited', description: 'Complete SEO management', features: ['100 keywords', 'Full optimization', 'Backlink strategy', 'Monthly reports', '3 months support'] },
    ],
    deliveryDays: 7,
    responseTime: '2 hours',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    gallery: [portfolioImages[1], portfolioImages[3]],
    description: 'Get higher rankings and more organic traffic. I use proven white-hat SEO strategies that comply with Google guidelines. My data-driven approach has helped 200+ businesses increase their visibility.',
    faqs: [
      { q: 'How long until I see results?', a: 'SEO is a long-term strategy. Typically 3-6 months for noticeable results.' },
      { q: 'Do you guarantee rankings?', a: 'No one can guarantee #1, but I use proven strategies to maximize your chances.' },
    ],
    reviews: [
      { id: 'r4', author: 'Tom B.', authorAvatar: avatars[5], rating: 5, comment: 'Our traffic doubled in 4 months. Priya knows her stuff!', date: '2024-08-28', helpful: 7 },
    ],
    inQueue: 2,
    featured: true,
  },
  {
    id: 'g4',
    title: 'I will develop a cross-platform mobile app with React Native',
    freelancerId: 'f4',
    freelancerName: 'James Anderson',
    freelancerAvatar: avatars[3],
    freelancerLevel: 'Level 2',
    category: 'programming-tech',
    tags: ['React Native', 'Mobile App', 'iOS', 'Android'],
    rating: 4.9,
    reviewCount: 156,
    startingPrice: 400,
    packages: [
      { name: 'Basic', price: 400, delivery: 10, revisions: '2', description: 'Basic app with 5 screens', features: ['5 screens', 'iOS + Android', 'API integration', '2 revisions'] },
      { name: 'Standard', price: 900, delivery: 20, revisions: '4', description: 'Full app with backend', features: ['15 screens', 'Backend + API', 'Push notifications', '4 revisions', 'App Store submission'] },
      { name: 'Premium', price: 2200, delivery: 45, revisions: 'Unlimited', description: 'Complex app with all features', features: ['Unlimited screens', 'Full backend', 'Auth + payments', 'Real-time features', 'Unlimited revisions', '90 days support'] },
    ],
    deliveryDays: 10,
    responseTime: '1 hour',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=500&fit=crop',
    gallery: [portfolioImages[2], portfolioImages[5]],
    description: 'Native-quality mobile apps for iOS and Android from a single codebase. I handle everything from design to deployment, ensuring your app is ready for the App Store and Play Store.',
    faqs: [{ q: 'Do you handle App Store submission?', a: 'Yes, the Standard and Premium packages include app store submission.' }],
    reviews: [
      { id: 'r5', author: 'Sophie L.', authorAvatar: avatars[0], rating: 5, comment: 'James built our fitness app flawlessly. Could not be happier!', date: '2024-09-10', helpful: 5 },
    ],
    inQueue: 3,
    featured: false,
  },
  {
    id: 'g5',
    title: 'I will create stunning motion graphics and explainer videos',
    freelancerId: 'f5',
    freelancerName: 'Elena Volkov',
    freelancerAvatar: avatars[4],
    freelancerLevel: 'Rising Talent',
    category: 'video-animation',
    tags: ['Motion Graphics', 'Animation', 'Explainer Video'],
    rating: 5.0,
    reviewCount: 67,
    startingPrice: 120,
    packages: [
      { name: 'Basic', price: 120, delivery: 5, revisions: '2', description: '15s motion graphic', features: ['15 seconds', '2 revisions', '1080p', 'Music included'] },
      { name: 'Standard', price: 350, delivery: 10, revisions: '4', description: '60s explainer video', features: ['60 seconds', '4 revisions', '4K quality', 'Voice over', 'Custom illustrations'] },
      { name: 'Premium', price: 800, delivery: 20, revisions: 'Unlimited', description: 'Full animation package', features: ['2+ minutes', 'Unlimited revisions', '4K quality', 'Pro voice over', 'Storyboard', 'Sound design'] },
    ],
    deliveryDays: 5,
    responseTime: '3 hours',
    image: 'https://images.unsplash.com/photo-1492619375914-98005aa83132?w=800&h=500&fit=crop',
    gallery: [portfolioImages[4], portfolioImages[1]],
    description: 'Engaging motion graphics that tell your story. From product explainers to brand animations, I bring your vision to life with smooth, professional motion design.',
    faqs: [{ q: 'Do you provide voice over?', a: 'Yes, the Standard and Premium packages include professional voice over.' }],
    reviews: [
      { id: 'r6', author: 'Chris W.', authorAvatar: avatars[1], rating: 5, comment: 'The explainer video was beyond our expectations. Elena is incredibly talented!', date: '2024-09-15', helpful: 3 },
    ],
    inQueue: 5,
    featured: true,
  },
  {
    id: 'g6',
    title: 'I will build machine learning models and AI solutions',
    freelancerId: 'f6',
    freelancerName: 'David Kim',
    freelancerAvatar: avatars[5],
    freelancerLevel: 'Top Rated',
    category: 'data-science',
    tags: ['Machine Learning', 'AI', 'Python', 'Data Science'],
    rating: 4.9,
    reviewCount: 142,
    startingPrice: 300,
    packages: [
      { name: 'Basic', price: 300, delivery: 7, revisions: '2', description: 'Simple ML model', features: ['1 model', 'Data preprocessing', '2 revisions', 'Documentation'] },
      { name: 'Standard', price: 800, delivery: 15, revisions: '4', description: 'Custom ML pipeline', features: ['Custom model', 'Full pipeline', 'Deployment', '4 revisions', 'API integration'] },
      { name: 'Premium', price: 2000, delivery: 30, revisions: 'Unlimited', description: 'Enterprise AI solution', features: ['Multiple models', 'MLOps setup', 'Cloud deployment', 'Monitoring', 'Unlimited revisions', '60 days support'] },
    ],
    deliveryDays: 7,
    responseTime: '1 hour',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=500&fit=crop',
    gallery: [portfolioImages[3], portfolioImages[0]],
    description: 'From recommendation systems to NLP and computer vision, I build production-ready ML models that solve real business problems. PhD-level expertise at your service.',
    faqs: [{ q: 'What data do you need?', a: 'I can work with your existing data or help you collect it. Let us discuss your specific needs.' }],
    reviews: [
      { id: 'r7', author: 'Robert K.', authorAvatar: avatars[3], rating: 5, comment: 'David built an amazing recommendation engine. Our conversion rate went up 35%.', date: '2024-08-20', helpful: 11 },
    ],
    inQueue: 6,
    featured: false,
  },
];

export const jobs: Job[] = [
  {
    id: 'j1',
    title: 'Need a React developer for a SaaS dashboard',
    description: 'We are looking for an experienced React developer to build a comprehensive analytics dashboard for our SaaS product. The ideal candidate should have experience with data visualization libraries, state management, and building responsive UIs.',
    clientId: 'c1',
    clientName: 'TechFlow Inc',
    clientAvatar: avatars[3],
    budget: { min: 3000, max: 6000 },
    category: 'programming-tech',
    skills: ['React', 'TypeScript', 'Tailwind CSS', 'Data Visualization', 'REST API'],
    deadline: '30 days',
    experienceLevel: 'Expert',
    proposalsCount: 12,
    postedDate: '2024-09-20',
    location: 'Remote',
    verified: true,
  },
  {
    id: 'j2',
    title: 'Logo and brand identity for a coffee startup',
    description: 'Looking for a talented designer to create our brand identity from scratch. We need a logo, color palette, typography, and basic brand guidelines. This is for a specialty coffee company targeting millennials.',
    clientId: 'c2',
    clientName: 'BrewCraft Co',
    clientAvatar: avatars[0],
    budget: { min: 500, max: 1500 },
    category: 'graphics-design',
    skills: ['Logo Design', 'Brand Identity', 'Typography', 'Illustrator'],
    deadline: '14 days',
    experienceLevel: 'Intermediate',
    proposalsCount: 28,
    postedDate: '2024-09-22',
    location: 'Remote',
    verified: true,
  },
  {
    id: 'j3',
    title: 'SEO specialist needed for e-commerce store',
    description: 'We need an SEO expert to optimize our Shopify store. Currently getting minimal organic traffic. Looking for someone who can do a full audit, implement changes, and provide ongoing optimization.',
    clientId: 'c3',
    clientName: 'ShopWorld',
    clientAvatar: avatars[2],
    budget: { min: 800, max: 2500 },
    category: 'digital-marketing',
    skills: ['SEO', 'Shopify', 'Google Analytics', 'Keyword Research'],
    deadline: 'Ongoing',
    experienceLevel: 'Intermediate',
    proposalsCount: 19,
    postedDate: '2024-09-18',
    location: 'Remote',
    verified: false,
  },
  {
    id: 'j4',
    title: 'Mobile app for fitness tracking with social features',
    description: 'We want to build a fitness tracking app with social features like friend challenges, leaderboards, and activity feeds. Need both iOS and Android. React Native or Flutter preferred.',
    clientId: 'c1',
    clientName: 'TechFlow Inc',
    clientAvatar: avatars[3],
    budget: { min: 5000, max: 12000 },
    category: 'programming-tech',
    skills: ['React Native', 'Firebase', 'Social Features', 'Push Notifications', 'Maps'],
    deadline: '60 days',
    experienceLevel: 'Expert',
    proposalsCount: 7,
    postedDate: '2024-09-25',
    location: 'Remote',
    verified: true,
  },
  {
    id: 'j5',
    title: '30-second product explainer animation',
    description: 'Need a clean, professional 30-second animated explainer video for our B2B software product. We have the script ready. Looking for motion graphics style with a professional voice over.',
    clientId: 'c4',
    clientName: 'CloudScale',
    clientAvatar: avatars[5],
    budget: { min: 600, max: 2000 },
    category: 'video-animation',
    skills: ['Motion Graphics', 'After Effects', 'Voice Over', 'Storyboarding'],
    deadline: '20 days',
    experienceLevel: 'Intermediate',
    proposalsCount: 15,
    postedDate: '2024-09-23',
    location: 'Remote',
    verified: true,
  },
  {
    id: 'j6',
    title: 'Build a recommendation engine for our e-commerce platform',
    description: 'We need an ML engineer to build a product recommendation system. We have 2M+ products and 500K users. Experience with collaborative filtering and deep learning models required.',
    clientId: 'c5',
    clientName: 'MegaMart',
    clientAvatar: avatars[1],
    budget: { min: 4000, max: 10000 },
    category: 'data-science',
    skills: ['Python', 'Machine Learning', 'TensorFlow', 'Recommendation Systems', 'AWS'],
    deadline: '45 days',
    experienceLevel: 'Expert',
    proposalsCount: 5,
    postedDate: '2024-09-26',
    location: 'Remote',
    verified: true,
  },
];

export const testimonials = [
  {
    id: 't1',
    name: 'Emily Watson',
    role: 'CEO, TechFlow Inc',
    avatar: avatars[0],
    content: 'SkillBridge transformed how we hire freelancers. The quality of talent is exceptional, and the escrow system gives us peace of mind. We have completed 15+ projects through the platform.',
    rating: 5,
  },
  {
    id: 't2',
    name: 'Michael Brown',
    role: 'Founder, BrewCraft',
    avatar: avatars[3],
    content: 'As a small business owner, finding affordable talent was always a struggle. SkillBridge made it easy. We found an amazing designer who created our entire brand identity.',
    rating: 5,
  },
  {
    id: 't3',
    name: 'Sophia Garcia',
    role: 'Freelance Designer',
    avatar: avatars[2],
    content: 'I switched from another platform and my income doubled. The visibility, the tools, and the community here are unmatched. SkillBridge truly cares about freelancers.',
    rating: 5,
  },
];

export const stats = [
  { label: 'Active Freelancers', value: '1.2M+' },
  { label: 'Projects Completed', value: '8.5M+' },
  { label: 'Client Satisfaction', value: '96%' },
  { label: 'Paid to Freelancers', value: '$2.4B+' },
];

export const pricingPlans = [
  {
    name: 'Starter',
    price: 0,
    period: 'forever',
    description: 'Perfect for trying out the platform',
    features: ['Post up to 3 jobs', 'Browse all freelancers', 'Basic search filters', '1 active project', 'Community support'],
    cta: 'Get Started',
    highlighted: false,
  },
  {
    name: 'Professional',
    price: 29,
    period: 'month',
    description: 'For growing businesses hiring regularly',
    features: ['Unlimited job posts', 'Advanced filters & AI matching', 'Priority support', 'Unlimited projects', 'Team collaboration', 'Escrow protection', 'Analytics dashboard'],
    cta: 'Start Free Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 99,
    period: 'month',
    description: 'For large teams and agencies',
    features: ['Everything in Professional', 'Dedicated account manager', 'Custom contracts', 'API access', 'SSO & security controls', 'Priority vetting', 'Monthly invoicing'],
    cta: 'Contact Sales',
    highlighted: false,
  },
];

export function getGigById(id: string): Gig | undefined {
  return gigs.find((g) => g.id === id);
}

export function getFreelancerById(id: string): Freelancer | undefined {
  return freelancers.find((f) => f.id === id);
}

export function getJobById(id: string): Job | undefined {
  return jobs.find((j) => j.id === id);
}
