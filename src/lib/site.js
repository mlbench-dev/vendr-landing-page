import { MEDIA } from "@/lib/media";

export const SITE_URL = "https://streetvendr.org";
export const CONTACT_EMAIL = "streetvendrapp@gmail.com";
export const APP_STORE = "https://apps.apple.com/us/app/street-vendr/id6756771949";
export const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.streetvendr.app";

export const CITIES = ["Riverside", "San Bernardino", "Ontario", "Redlands", "Corona"];
// The application form also accepts these, matching the form on streetvendr.org.
export const APPLY_CITIES = [...CITIES, "Rancho Cucamonga", "Other Inland Empire area"];
// Choosing this in the application form asks for a free-text city and state instead.
export const CITY_ELSEWHERE = "elsewhere";

export const CATEGORY_KEYS = ["food_drink", "makers_goods", "services", "wellness"];
export const APPLY_CATEGORY_KEYS = [...CATEGORY_KEYS, "other"];
export const MODE_KEYS = ["storefront", "mobile", "pop_up", "service_area", "online_home"];

// English labels, kept for components that aren't localized.
export const CATEGORIES = [
  { value: "food_drink", label: "Food & drink" },
  { value: "makers_goods", label: "Makers & goods" },
  { value: "services", label: "Services" },
  { value: "wellness", label: "Wellness" },
];
export const MODES = { storefront: "Storefront", pop_up: "Pop-up", mobile: "Mobile", service_area: "Service area" };
export const categoryLabel = (v) => CATEGORIES.find((c) => c.value === v)?.label || v;

// Illustrative vendor types shown across the site. Not real listings.
// `loc` is the map location mode that type would typically use.
export const VENDOR_EXAMPLES = [
  { key: "truck", img: MEDIA.cardFoodTruck, loc: "live" },
  { key: "barber", img: MEDIA.barber, loc: "pin" },
  { key: "mechanic", img: MEDIA.cardMechanic, loc: "radius" },
  { key: "market", img: MEDIA.marketSellers, loc: "pin" },
  { key: "beauty", img: MEDIA.stylist, loc: "radius" },
  { key: "popup", img: MEDIA.streetCart, loc: "pin" },
  { key: "maker", img: MEDIA.cardMaker, loc: "radius" },
  { key: "wellness", img: MEDIA.cardWellness, loc: "pin" },
];
