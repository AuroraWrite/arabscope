export const articles = [
  {
    id: 1,
    slug: "uae-dirham-symbol-joins-unicode-clearing-path-to-phone-keyboards",
    title: "UAE dirham symbol joins Unicode, clearing path to phone keyboards",
    category: "BANKING & FINANCE",
    date: "October 13, 2026 | 16:45",
    author: "Staff Reporter, Gulf News",
    img: "/images/dirham-symbol.jpg",
    url: "https://gulfnews.com/business/banking/uae-dirham-symbol-joins-unicode-clearing-path-to-phone-keyboards-1.500684903",
    lead: "The UAE Dirham symbol has officially received approval for inclusion in the Unicode Standard, clearing the final obstacle for its integration across smartphones, computers, and operating systems globally.",
    paragraphs: [
      "The Unicode Consortium approved the distinct character design representing the UAE Dirham (AED), marking a major milestone for the nation's financial sovereignty and digital identity. Tech giants including Apple, Google, and Microsoft are now expected to include the symbol in their upcoming system keyboard updates.",
      "Financial institutions, payment gateways, and retail apps across the Middle East will soon be able to render the Dirham currency symbol directly in digital transactions without resorting to three-letter text abbreviations.",
      "The Central Bank of the UAE emphasized that standardized digital currency symbols streamline cross-border fintech trade, digital banking receipts, and seamless consumer payments in the evolving digital economy."
    ]
  },
  {
    id: 2,
    slug: "uae-is-cutting-salt-and-sugar-in-everyday-foods-what-will-change-for-you",
    title: "UAE is cutting salt and sugar in everyday foods – what will change for you?",
    category: "HEALTH & LIVING",
    date: "October 13, 2026 | 14:20",
    author: "Suchitra Bajpai Chaudhary, Senior Reporter",
    img: "/images/salt-sugar-reduction.jpg",
    url: "https://gulfnews.com/living-in-uae/health/uae-is-cutting-salt-and-sugar-in-everyday-foods-what-will-change-for-you-1.500701524",
    lead: "The UAE has launched nationwide dietary reformulation targets aimed at drastically reducing sodium and added sugar in commonly consumed packaged foods and bakery products.",
    paragraphs: [
      "Under the new health directives, food manufacturers and industrial bakeries across the Emirates must gradually reduce the sodium content in sliced bread, burger buns, sauces, and ready-to-eat meals by up to 20 per cent over the next 18 months.",
      "Health authorities noted that excessive salt and sugar intake remains a major driver of hypertension, cardiovascular illnesses, and childhood obesity across the GCC region. The initiative works collaboratively with local distributors to reformulate recipes without compromising safety or flavor.",
      "Supermarkets and grocery chains will also enhance nutritional traffic-light labeling, allowing consumers to make healthier choices and identify products that meet the revised health benchmarks."
    ]
  },
  {
    id: 3,
    slug: "uae-iphone-18-pro-physical-sim-to-esim",
    title: "The iPhone 18 Pro has no SIM slot in the UAE — here’s what happens to your number",
    category: "TELEPHONE & TECH",
    date: "October 13, 2026 | 11:30",
    author: "Web Report, Gulf News",
    img: "/images/iphone-esim.jpg",
    url: "https://gulfnews.com/living-in-uae/telephone-internet/uae-iphone-18-pro-physical-sim-to-esim-1.500673913",
    lead: "With Apple discontinuing physical SIM trays on the newly released flagship devices in the UAE market, telecom subscribers are rapidly transitioning their existing mobile plans to digital eSIM profiles.",
    paragraphs: [
      "Local telecom operators e& (Etisalat) and du have streamlined the digital SIM swap procedure, allowing customers to scan a QR code via their banking or carrier app to transfer mobile numbers in less than two minutes.",
      "Travelers and residents who frequently interchange SIM cards between devices can now store up to eight virtual eSIM profiles on a single device, activating two numbers simultaneously for business and personal communications.",
      "Customer support centers have set up dedicated digital kiosks across major shopping malls in Dubai and Abu Dhabi to assist users who require physical verification or help migrating corporate numbers."
    ]
  },
  {
    id: 4,
    slug: "dubai-outdoor-attractions-reopening-dates-2026",
    title: "Dubai outdoor attractions reopen this October – here are the dates",
    category: "LEISURE & TOURISM",
    date: "October 12, 2026 | 17:15",
    author: "Dhanusha Gokulan, Senior Reporter",
    img: "/images/dubai-outdoor-attractions.jpg",
    url: "https://gulfnews.com/living-in-uae/ask-us/dubai-outdoor-attractions-reopening-dates-2026-1.500563282",
    lead: "As cooler autumn temperatures return across the Emirates, Dubai’s premier seasonal outdoor destinations—including Global Village, Dubai Miracle Garden, and Dubai Safari Park—have announced their official opening dates.",
    paragraphs: [
      "Global Village kicks off its landmark season this week with enhanced cultural pavilions, world-class street culinary options, and expanded family carnival rides, expecting millions of visitors over the winter months.",
      "Dubai Miracle Garden is putting the finishing touches on elaborate new floral installations featuring millions of blooming blossoms, while Dubai Safari Park welcomes back wildlife enthusiasts with upgraded safari drive-through experiences.",
      "Visitors are advised to book tickets online in advance to take advantage of off-peak discounts and contactless gate entry across all participating outdoor venues."
    ]
  },
  {
    id: 5,
    slug: "halloween-in-abu-dhabi-2026-barbeque-costumes",
    title: "Halloween in Abu Dhabi 2026: barbeque, costumes and more",
    category: "LIFESTYLE & EVENTS",
    date: "October 12, 2026 | 15:40",
    author: "Faye Brown, Features Writer",
    img: "/images/halloween-abu-dhabi.jpg",
    url: "https://gulfnews.com/lifestyle/halloween-in-abu-dhabi-2026-barbeque-costumes-1.500707587",
    lead: "From spooky-themed barbecue evenings along Saadiyat Island to family-friendly costume parades on Yas Island, the capital is gearing up for a vibrant calendar of Halloween festivities this month.",
    paragraphs: [
      "Top hotels and waterfront dining hubs across Abu Dhabi have unveiled festive dining menus, featuring live carving stations, pumpkin-inspired desserts, and costume contests offering weekend staycation prizes.",
      "Theme parks on Yas Island are introducing special trick-or-treat zones and interactive spooky mazes for younger children, ensuring a safe, family-oriented celebration with live entertainment.",
      "Retailers and costume rental boutiques across the city have seen record demand for superhero and retro-themed outfits, with many stores extending hours to accommodate early holiday shoppers."
    ]
  }
];

export function getArticleBySlug(slug) {
  if (!slug) return null;
  const decoded = decodeURIComponent(slug);
  return articles.find(
    (a) => a.slug === decoded || String(a.id) === String(decoded)
  );
}

export function getOtherArticles(currentSlug) {
  const decoded = currentSlug ? decodeURIComponent(currentSlug) : "";
  return articles.filter(
    (a) => a.slug !== decoded && String(a.id) !== String(decoded)
  );
}
