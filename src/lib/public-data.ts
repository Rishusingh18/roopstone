export type LeadSource = "estimator" | "contact_form" | "whatsapp" | "consultation" | "gallery";

export type CreationCategory = "Temple" | "Murti" | "Slab" | "Artifact" | "Architectural";

export interface Creation {
  id: string;
  name: string;
  category: CreationCategory;
  material: string;
  price: string;
  image: string;
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
    collection: "Sparsh",
    short: "A devotional centerpiece carved in luminous Makrana marble.",
    story: "Hand-carved pillars, lotus friezes, and fine jaali work bring a quiet temple presence into the home.",
    specs: ["Makrana Pure White", "Hand-carved floral jaali", "Custom scale available"],
  },
  {
    id: "p2",
    name: "Ganesha Murti — Carrara",
    category: "Murti",
    material: "Carrara",
    price: "₹1.8L onwards",
    image: "/images/products/2.jpg",
    collection: "Sparsh",
    short: "A calm, polished idol shaped for daily worship and heirloom keeping.",
    story: "Soft Italian marble gives the form a serene glow while the artisan's chisel preserves devotional detail.",
    specs: ["Carrara marble", "Hand-finished polish", "Indoor altar scale"],
  },
  {
    id: "p3",
    name: "Imperial Quartzite Slab",
    category: "Slab",
    material: "Quartzite",
    price: "On request",
    image: "/images/products/3.jpg",
    collection: "Atelier",
    short: "A dramatic stone surface for royal-scale interiors.",
    story: "Bold veining and deep mineral contrast make this slab a natural statement for counters, walls, and table forms.",
    specs: ["Quartzite", "Book-match selection", "Architectural applications"],
  },
  {
    id: "p4",
    name: "Jaali Panel — Floral",
    category: "Artifact",
    material: "Makrana White",
    price: "₹1.2L",
    image: "/images/products/4.jpg",
    collection: "Sparsh",
    short: "A floral jaali panel that filters light with devotional precision.",
    story: "Traditional motifs are cut and softened by hand, creating a luminous screen for temples and courtyards.",
    specs: ["Makrana White", "Floral jaali", "Made to size"],
  },
  {
    id: "p5",
    name: "Tuscan Travertine Console",
    category: "Architectural",
    material: "Travertine",
    price: "₹2.4L onwards",
    image: "/images/products/5.jpg",
    collection: "Atelier",
    short: "A grounded console with warm open pores and architectural restraint.",
    story: "Travertine's sedimentary rhythm brings a courtyard feeling into modern living spaces.",
    specs: ["Travertine", "Honed finish", "Custom joinery"],
  },
  {
    id: "p6",
    name: "The Tectonic Rift",
    category: "Artifact",
    material: "Statuario",
    price: "₹3.2L",
    image: "/images/products/6.jpg",
    collection: "IRA",
    short: "A sculptural form where white marble opens into a single force line.",
    story: "IRA transforms geological rupture into a meditative object, balancing raw mass with polished stillness.",
    specs: ["White Statuario", "Limited artwork", "Signed by atelier"],
  },
  {
    id: "p7",
    name: "Courtyard Basin",
    category: "Architectural",
    material: "Sandstone",
    price: "₹95K onwards",
    image: "/images/products/7.jpg",
    collection: "Atelier",
    short: "A hand-shaped basin for verandahs, spas, and garden courts.",
    story: "Low, generous proportions and tactile stone make water feel architectural and ancient.",
    specs: ["Natural sandstone", "Outdoor ready", "Custom drainage"],
  },
  {
    id: "p8",
    name: "Lotus Pedestal",
    category: "Artifact",
    material: "Makrana White",
    price: "₹78K",
    image: "/images/products/8.jpg",
    collection: "Sparsh",
    short: "A devotional plinth with carved lotus geometry.",
    story: "Designed for murtis, lamps, or sacred vessels, the pedestal gives ritual objects a permanent center.",
    specs: ["Makrana White", "Lotus relief", "Polished top"],
  },
  {
    id: "p9",
    name: "Pink Onyx Table",
    category: "Architectural",
    material: "Pink Onyx",
    price: "₹2.9L onwards",
    image: "/images/products/9.jpg",
    collection: "IRA",
    short: "Translucent onyx shaped into a soft yet commanding table.",
    story: "Warm blush tones and clouded mineral depth make each piece feel like carved light.",
    specs: ["Pink Onyx", "Optional backlight", "Bespoke base"],
  },
  {
    id: "p10",
    name: "Temple Threshold",
    category: "Temple",
    material: "Makrana White",
    price: "₹3.1L onwards",
    image: "/images/products/10.jpg",
    collection: "Sparsh",
    short: "A carved entry frame for pooja rooms and sanctums.",
    story: "The threshold frames the transition from home to shrine with proportion, pattern, and light.",
    specs: ["Entry surround", "Carved borders", "Site measured"],
  },
  {
    id: "p11",
    name: "Royal Border Inlay",
    category: "Architectural",
    material: "Makrana & Onyx",
    price: "₹1.6L onwards",
    image: "/images/products/11.jpg",
    collection: "Atelier",
    short: "A precise inlay band for floors, walls, and ceremonial rooms.",
    story: "Contrasting stones are set in measured rhythm, reviving palace craft for contemporary projects.",
    specs: ["Stone inlay", "Custom pattern", "Floor or wall use"],
  },
  {
    id: "p12",
    name: "Sculpted Stillness",
    category: "Artifact",
    material: "Marble",
    price: "₹4.8L",
    image: "/images/products/12.jpg",
    collection: "IRA",
    short: "A singular IRA artwork held between tectonic force and quiet pause.",
    story: "A monumental slab is pared down into a silent silhouette, keeping the memory of the quarry intact.",
    specs: ["Gallery sculpture", "Single edition", "Pedestal included"],
  },
  {
    id: "p13",
    name: "Aegean Marble Form",
    category: "Artifact",
    material: "Aegean Marble",
    price: "₹2.2L",
    image: "/images/products/13.jpg",
    collection: "IRA",
    short: "A sculptural stone object with coastal veining and soft mass.",
    story: "Pale veins ripple across a restrained form, giving modern rooms a quiet geological anchor.",
    specs: ["Aegean marble", "Honed surface", "Indoor sculpture"],
  },
  {
    id: "p14",
    name: "Carved Puja Wall",
    category: "Temple",
    material: "Makrana White",
    price: "₹5.6L onwards",
    image: "/images/products/14.jpg",
    collection: "Sparsh",
    short: "A complete devotional wall with shelves, niche work, and carved borders.",
    story: "Built for apartments and villas alike, the wall turns daily prayer into an architectural ritual.",
    specs: ["Full pooja wall", "Integrated niches", "Custom installation"],
  },
  {
    id: "p15",
    name: "Midnight Onyx",
    category: "Slab",
    material: "Onyx",
    price: "On request",
    image: "/images/products/15.jpg",
    collection: "Atelier",
    short: "A dark, luminous slab for bars, vanities, and contemplative rooms.",
    story: "Deep onyx absorbs light until its mineral clouds surface, giving interiors a ceremonial hush.",
    specs: ["Black onyx", "Backlight compatible", "Book-match options"],
  },
  {
    id: "p16",
    name: "Marble Lotus Murti",
    category: "Murti",
    material: "Makrana White",
    price: "₹2.1L",
    image: "/images/products/16.jpg",
    collection: "Sparsh",
    short: "A devotional murti poised on a lotus base.",
    story: "The piece combines figurative carving with a soft pedestal geometry for long daily use.",
    specs: ["Hand-carved murti", "Lotus base", "Temple-ready polish"],
  },
  {
    id: "p17",
    name: "Fluid Architecture",
    category: "Artifact",
    material: "Grey Travertine",
    price: "₹3.6L",
    image: "/images/products/17.jpg",
    collection: "IRA",
    short: "A flowing IRA object carved from grey travertine.",
    story: "The porous stone is shaped into a smooth architectural gesture, part furniture and part sculpture.",
    specs: ["Grey travertine", "IRA collection", "Limited commission"],
  },
  {
    id: "p18",
    name: "Heritage Step Mandir",
    category: "Temple",
    material: "Makrana White",
    price: "₹6.8L onwards",
    image: "/images/products/18.jpg",
    collection: "Sparsh",
    short: "A grand stepped mandir with carved columns and sanctum geometry.",
    story: "Designed for large homes, the temple carries the weight and proportion of classical Rajasthan shrines.",
    specs: ["Grand sanctum", "Stepped plinth", "Full-site install"],
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
