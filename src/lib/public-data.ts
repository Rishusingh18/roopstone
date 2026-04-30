export type LeadSource = "estimator" | "contact_form" | "whatsapp" | "consultation" | "gallery";

export type CreationCategory = "Temple" | "Murti" | "Slab" | "Artifact" | "Architectural";

export interface Creation {
  id: string;
  name: string;
  category: CreationCategory;
  material: string;
  price: string;
  image: string;
  images?: string[];
  collection: "Sparsh" | "IRA" | "Atelier";
  short: string;
  story: string;
  specs: string[];
}

export const navItems = [
  { name: "About", href: "/about-us" },
  { name: "Contact", href: "/contact" },
];

export const creations: Creation[] = [
  {
    id: "p1",
    name: "Makrana Pure White Mandir",
    category: "Temple",
    material: "Makrana White",
    price: "₹4.5L onwards",
    image: "/images/products/1.jpg",
    images: ["/images/products/1.jpg", "/images/products/2.jpg"],
    collection: "Sparsh",
    short: "A devotional centerpiece carved in luminous Makrana marble.",
    story: "Hand-carved pillars, lotus friezes, and fine jaali work bring a quiet temple presence into the home.",
    specs: ["Makrana Pure White", "Hand-carved floral jaali", "Custom scale available"],
  },
  {
    id: "p3",
    name: "Classic Peacock Mandir",
    category: "Temple",
    material: "Makrana White",
    price: "₹3.8L onwards",
    image: "/images/products/3.jpg",
    images: ["/images/products/3.jpg", "/images/products/4.jpg"],
    collection: "Sparsh",
    short: "A beautiful white marble mandir with delicate painted peacock accents.",
    story: "Hand-crafted by artisans, this temple features subtle painted details to enhance the pure white marble.",
    specs: ["Makrana White", "Hand-painted peacocks", "Custom sizing"],
  },
  {
    id: "p5",
    name: "Pure White Carved Mandir",
    category: "Temple",
    material: "Makrana White",
    price: "₹3.2L onwards",
    image: "/images/products/5.jpg",
    images: ["/images/products/5.jpg", "/images/products/6.jpg"],
    collection: "Sparsh",
    short: "An intricately carved temple in pure, unpainted white marble.",
    story: "Focusing entirely on form and shadow, this piece showcases the natural beauty of Makrana marble without adornment.",
    specs: ["Makrana White", "Deep relief carving", "Unpainted finish"],
  },
  {
    id: "p7",
    name: "Courtyard Lotus Basin",
    category: "Architectural",
    material: "Sandstone",
    price: "₹95K onwards",
    image: "/images/products/7.jpg",
    images: ["/images/products/7.jpg", "/images/products/8.jpg"],
    collection: "Atelier",
    short: "A hand-shaped basin with lotus motifs for verandahs, spas, and garden courts.",
    story: "Low, generous proportions and tactile stone make water feel architectural and ancient.",
    specs: ["Natural sandstone", "Outdoor ready", "Custom drainage", "Lotus carving"],
  },
  {
    id: "p9",
    name: "Pink Onyx Table",
    category: "Architectural",
    material: "Pink Onyx",
    price: "₹2.9L onwards",
    image: "/images/products/9.jpg",
    images: ["/images/products/9.jpg", "/images/products/10.jpg"],
    collection: "IRA",
    short: "Translucent onyx shaped into a soft yet commanding table.",
    story: "Warm blush tones and clouded mineral depth make each piece feel like carved light.",
    specs: ["Pink Onyx", "Optional backlight", "Bespoke base"],
  },
  {
    id: "p11",
    name: "Royal Border Inlay",
    category: "Architectural",
    material: "Makrana & Onyx",
    price: "₹1.6L onwards",
    image: "/images/products/11.jpg",
    images: ["/images/products/11.jpg", "/images/products/12.jpg"],
    collection: "Atelier",
    short: "A precise inlay band for floors, walls, and ceremonial rooms.",
    story: "Contrasting stones are set in measured rhythm, reviving palace craft for contemporary projects.",
    specs: ["Stone inlay", "Custom pattern", "Floor or wall use"],
  },
  {
    id: "p13",
    name: "Aegean Marble Form",
    category: "Artifact",
    material: "Aegean Marble",
    price: "₹2.2L",
    image: "/images/products/13.jpg",
    images: ["/images/products/13.jpg", "/images/products/14.jpg"],
    collection: "IRA",
    short: "A sculptural stone object with coastal veining and soft mass.",
    story: "Pale veins ripple across a restrained form, giving modern rooms a quiet geological anchor.",
    specs: ["Aegean marble", "Honed surface", "Indoor sculpture"],
  },
  {
    id: "p15",
    name: "Midnight Onyx",
    category: "Slab",
    material: "Onyx",
    price: "On request",
    image: "/images/products/15.jpg",
    images: ["/images/products/15.jpg", "/images/products/16.jpg"],
    collection: "Atelier",
    short: "A dark, luminous slab for bars, vanities, and contemplative rooms.",
    story: "Deep onyx absorbs light until its mineral clouds surface, giving interiors a ceremonial hush.",
    specs: ["Black onyx", "Backlight compatible", "Book-match options"],
  },
  {
    id: "p17",
    name: "Fluid Architecture",
    category: "Artifact",
    material: "Grey Travertine",
    price: "₹3.6L",
    image: "/images/products/17.jpg",
    images: ["/images/products/17.jpg", "/images/products/18.jpg"],
    collection: "IRA",
    short: "A flowing IRA object carved from grey travertine.",
    story: "The porous stone is shaped into a smooth architectural gesture, part furniture and part sculpture.",
    specs: ["Grey travertine", "IRA collection", "Limited commission"],
  },
];

export const archiveSeries = [
  { roman: "I", realm: "Royal Palaces", title: "Imperial Quartzite", image: "/images/products/1.jpg" },
  { roman: "II", realm: "Modern Sanctuaries", title: "Midnight Onyx", image: "/images/products/15.jpg" },
  { roman: "III", realm: "Garden Courtyards", title: "Tuscan Travertine", image: "/images/products/5.jpg" },
  { roman: "IV", realm: "Sculptural Forms", title: "Aegean Marble", image: "/images/products/13.jpg" },
  { roman: "V", realm: "Feminine Strength", title: "Pink Onyx", image: "/images/products/9.jpg" },
];

export const journalPosts = [
  {
    title: "Makrana White and the memory of Indian temples",
    date: "Atelier Notes",
    excerpt: "Why the stone of the Taj still carries an unmatched devotional presence in contemporary homes.",
    image: "/images/products/4.jpg",
  },
  {
    title: "Choosing marble for a pooja room",
    date: "Guide",
    excerpt: "A practical reading of veining, carving depth, upkeep, light, and the dimensions that make worship feel calm.",
    image: "/images/products/10.jpg",
  },
  {
    title: "The rise of sculptural stone furniture",
    date: "IRA Journal",
    excerpt: "How raw geological drama can become a modern object without losing the silence of the quarry.",
    image: "/images/products/12.jpg",
  },
];

export const legacyProjects = [
  { title: "Private Temple, Ajmer", place: "Ajmer, Rajasthan", year: "2025", image: "/images/products/4.jpg" },
  { title: "Royal Courtyard Villa", place: "Dubai, UAE", year: "2024", image: "/images/products/5.jpg" },
  { title: "IRA Collector Residence", place: "Mumbai, India", year: "2024", image: "/images/products/12.jpg" },
  { title: "Mandir Room Restoration", place: "Jaipur, Rajasthan", year: "2023", image: "/images/products/18.jpg" },
];

export const testimonials = [
  {
    quote: "The mandir feels like it has always belonged to our home. Every visitor pauses before speaking.",
    name: "Agarwal Residence",
    place: "Delhi",
  },
  {
    quote: "Their team treated the stone like architecture, not decoration. The result is quiet and monumental.",
    name: "S. Mehta",
    place: "Mumbai",
  },
  {
    quote: "The IRA sculpture changed the entire room. It has presence without shouting.",
    name: "Private Collector",
    place: "Bengaluru",
  },
];

export const faqs = [
  {
    q: "How long does a custom marble mandir take?",
    a: "Most residential commissions take 8 to 14 weeks after design approval, depending on carving depth, size, and installation location.",
  },
  {
    q: "Can Roop Stone Arts ship outside India?",
    a: "Yes. The atelier handles crating, documentation, and installation coordination for domestic and international projects.",
  },
  {
    q: "Is the estimator a final quote?",
    a: "No. It gives an indicative band so the first design conversation is more useful. Final pricing follows drawings, material selection, and site details.",
  },
  {
    q: "Do you restore older marble pieces?",
    a: "Yes, restoration is handled case by case after reviewing stone condition, carving loss, and structural stability.",
  },
];

export function getCreation(id: string) {
  return creations.find((creation) => creation.id === id);
}
