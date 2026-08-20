export interface showReelI {
  title: string;
  vimeoId: string;
  thumbnail: string;
  stats: {
    views: number;
    likes: number;
    comments: number;
    repost: number;
  };
}

// Local inline mockups keep the Show Reel visual even before real project
// media is connected. Replace the thumbnail with a real project image later.
function mockupThumb(title: string, accent: string, number: string) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1000"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#080808"/><stop offset="1" stop-color="${accent}"/></linearGradient></defs><rect width="1600" height="1000" fill="#050505"/><rect x="70" y="70" width="1460" height="860" rx="34" fill="url(#g)" stroke="#ffffff" stroke-opacity=".14"/><rect x="115" y="115" width="1370" height="58" rx="12" fill="#ffffff" fill-opacity=".06"/><circle cx="150" cy="144" r="8" fill="#fff" fill-opacity=".5"/><circle cx="178" cy="144" r="8" fill="#fff" fill-opacity=".25"/><circle cx="206" cy="144" r="8" fill="#fff" fill-opacity=".15"/><text x="140" y="430" fill="#fff" font-family="Arial,sans-serif" font-size="116" font-weight="700">${title}</text><text x="145" y="505" fill="#fff" fill-opacity=".42" font-family="Arial,sans-serif" font-size="28" letter-spacing="7">VERITY / CONCEPT ${number}</text><rect x="145" y="590" width="430" height="2" fill="#fff" fill-opacity=".22"/><text x="145" y="650" fill="#fff" fill-opacity=".55" font-family="Arial,sans-serif" font-size="22">DIGITAL EXPERIENCE · WEB DESIGN · DEVELOPMENT</text></svg>`;
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

export const showRealData: showReelI[] = [
  {
    title: "Aurelia",
    vimeoId: "",
    thumbnail: mockupThumb("Aurelia", "#35211b", "01"),
    stats: { views: 12000, likes: 860, comments: 42, repost: 96 },
  },
  {
    title: "Northstar",
    vimeoId: "",
    thumbnail: mockupThumb("Northstar", "#172536", "02"),
    stats: { views: 18400, likes: 1120, comments: 58, repost: 141 },
  },
  {
    title: "Monument",
    vimeoId: "",
    thumbnail: mockupThumb("Monument", "#24201a", "03"),
    stats: { views: 9300, likes: 740, comments: 31, repost: 77 },
  },
  {
    title: "Kora",
    vimeoId: "",
    thumbnail: mockupThumb("Kora", "#17291f", "04"),
    stats: { views: 15600, likes: 980, comments: 47, repost: 118 },
  },
  {
    title: "Forma",
    vimeoId: "",
    thumbnail: mockupThumb("Forma", "#20212d", "05"),
    stats: { views: 21100, likes: 1340, comments: 69, repost: 162 },
  },
];
