export interface ThemeConfig {
  id: string;
  name: string;
  startDate: string | null; // ISO Date or null if default
  endDate: string | null;
  heroImage: string;
  overlayTextHeading: string;
  overlayTextSubheading: string;
  ctaText: string;
  ctaLink: string;
  priority: number;
}

export const activeThemes: ThemeConfig[] = [
  {
    id: "diwali_2026",
    name: "Diwali Special",
    startDate: "2026-10-15T00:00:00Z",
    endDate: "2026-11-10T00:00:00Z",
    heroImage: "/images/products/16.jpg",
    overlayTextHeading: "Illuminate Your Devotion",
    overlayTextSubheading: "Exclusive Diwali Collections by Roop Stone Arts",
    ctaText: "Explore Diwali Collection",
    ctaLink: "/sparsh",
    priority: 10
  },
  {
    id: "default_theme",
    name: "Standard Heritage Theme",
    startDate: null,
    endDate: null,
    heroImage: "/images/products/11.jpg", 
    overlayTextHeading: "Your Spiritual Connection, Made Simple",
    overlayTextSubheading: "A premium marble brand offering exquisite handcrafted temples for every home and budget.",
    ctaText: "Explore Our Collections",
    ctaLink: "/collections",
    priority: 1
  }
];

// Helper to determine the active theme by current date
export function getActiveTheme(): ThemeConfig {
  const now = new Date().getTime();
  
  // Filter valid themes
  const validThemes = activeThemes.filter(theme => {
    if (!theme.startDate || !theme.endDate) return false;
    const start = new Date(theme.startDate).getTime();
    const end = new Date(theme.endDate).getTime();
    return now >= start && now <= end;
  });

  if (validThemes.length > 0) {
    // Sort by priority (highest first)
    validThemes.sort((a, b) => b.priority - a.priority);
    return validThemes[0];
  }

  // Fallback
  return activeThemes.find(t => t.id === "default_theme") || activeThemes[0];
}
