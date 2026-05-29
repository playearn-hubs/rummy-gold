/** SEO registry — one entry per indexable URL */
import { DOMAIN } from "./config.mjs";
export { DOMAIN };
export const BRAND_KW =
  "teen patti gold, teen patti gold app, teen patti gold download, teen patti gold apk, teen patti gold official, online teen patti india";

const teenPattiKw =
  "teen patti gold, teen patti gold download, teen patti gold apk, teen patti gold online, teen patti gold apk download, teen patti gold old version, teen patti gold all version, teen patti gold download apk, teen patti gold new version";

function kw(...parts) {
  return [...parts, BRAND_KW].filter(Boolean).join(", ");
}

function faq(items) {
  return items;
}

/** @type {Array<{path:string, file?:string, title:string, description:string, keywords:string, priority:number, changefreq:string, noindex?:boolean, skipSeoBlock?:boolean, tags:string[], faq:Array<{q:string,a:string}>}>} */
export const PAGES = [
  {
    path: "/",
    file: "index.html",
    title: "Teen Patti Gold — Official App Download | Play Teen Patti Online & Win Real Cash",
    description:
      "Download Teen Patti Gold APK — India's trusted Teen Patti app. Play Teen Patti online, rummy & more, win real cash, get ₹5,100 welcome bonus, instant UPI withdrawal & 24/7 support.",
    keywords: kw(
      "play teen patti online",
      "teen patti real cash",
      "teen patti app india",
      "3 patti game download",
      "best teen patti app",
      teenPattiKw
    ),
    priority: 1.0,
    changefreq: "daily",
    skipSeoBlock: true,
    tags: [
      "teen patti gold",
      "teen patti gold apk",
      "teen patti gold download",
      "teen patti online",
      "real cash teen patti",
      "teen patti app india",
    ],
    faq: [],
  },
  {
    path: "/download",
    title: "Download Teen Patti Gold APK — Official Android & iOS App | Free Install",
    description:
      "Download Teen Patti Gold APK free for Android & iOS. Official Teen Patti app with welcome bonus, secure install guide, and instant play — get the latest version here.",
    keywords: kw("teen patti gold apk download", "download teen patti app", "teen patti apk latest version", "android teen patti apk"),
    priority: 0.95,
    changefreq: "weekly",
    tags: ["teen patti gold apk", "teen patti gold download", "download teen patti app", "teen patti apk download"],
    faq: faq([
      {
        q: "Is the Teen Patti Gold APK download free?",
        a: "Yes. Download Teen Patti Gold APK free from this official page. No charges to install the app.",
      },
      {
        q: "How do I install Teen Patti Gold on Android?",
        a: "Tap Download APK, allow installs from your browser, open the file, and complete registration.",
      },
    ]),
  },
  {
    path: "/refer-and-earn",
    title: "Refer & Earn — Teen Patti Gold Referral Bonus Program",
    description:
      "Refer friends to Teen Patti Gold and earn cash rewards. Share your referral code, unlimited invites, and instant bonuses when friends play.",
    keywords: kw("teen patti gold refer", "refer and earn teen patti", "teen patti referral bonus"),
    priority: 0.85,
    changefreq: "weekly",
    tags: ["refer and earn teen patti", "teen patti referral bonus", "teen patti gold refer"],
    faq: faq([
      { q: "How does Teen Patti Gold referral work?", a: "Share your code from the app. When friends register and play, you earn referral rewards per program terms." },
    ]),
  },
  {
    path: "/blog",
    title: "Teen Patti Gold Blog — Tips, News & Card Game Guides",
    description:
      "Teen Patti Gold blog with Teen Patti tips, tournament news, bonus updates, and strategy guides for online card game players.",
    keywords: kw("teen patti blog", "teen patti tips", "online card games news"),
    priority: 0,
    changefreq: "weekly",
    noindex: true,
    tags: ["teen patti tips", "online card games blog", "teen patti gold news"],
    faq: faq([{ q: "Where can I learn Teen Patti strategy?", a: "Visit our How to Play section and the home page FAQ for guides and rules." }]),
  },
  {
    path: "/games",
    title: "All Games — Online Rummy, Teen Patti, Poker & More | Teen Patti Gold",
    description:
      "Play online rummy, Teen Patti, poker, fantasy cricket, casino games and slots on Teen Patti Gold. One app download — all real cash games.",
    keywords: kw("teen patti gold games", "online card games india", "teen patti online", "poker app india"),
    priority: 0.9,
    changefreq: "weekly",
    tags: ["online rummy", "teen patti", "poker india", "fantasy cricket app"],
    faq: faq([{ q: "What games are on Teen Patti Gold?", a: "Rummy, Teen Patti, poker, fantasy cricket, casino games, and slots — all in one app." }]),
  },
  {
    path: "/games/online-rummy",
    title: "Online Rummy — Play Real Cash 13-Card Rummy | Teen Patti Gold",
    description:
      "Play online rummy on Teen Patti Gold — points, pool & deals rummy with fast tables, fair RNG, welcome bonus up to ₹5,100, and quick UPI withdrawals.",
    keywords: kw("online rummy", "play rummy online", "real cash rummy india", "13 card rummy online"),
    priority: 0.88,
    changefreq: "weekly",
    tags: ["online rummy", "real cash rummy", "13 card rummy", "best rummy app"],
    faq: faq([
      { q: "Is online rummy legal in India?", a: "Rummy is a skill game in most states. Check local laws. Teen Patti Gold operates where permitted." },
      { q: "How fast are withdrawals?", a: "Verified players get quick UPI and bank payouts after KYC." },
    ]),
  },
  {
    path: "/games/teen-patti",
    title: "Teen Patti Online — Download & Play on Teen Patti Gold",
    description:
      "Play Teen Patti online on Teen Patti Gold. Live tables, real opponents, secure wallet, and Teen Patti download in the same app as rummy.",
    keywords: kw("teen patti online", "teen patti download", teenPattiKw),
    priority: 0.88,
    changefreq: "weekly",
    tags: ["teen patti gold", "teen patti online", "teen patti apk", "teen patti download"],
    faq: faq([{ q: "Can I play Teen Patti and rummy in one app?", a: "Yes. Teen Patti Gold includes Teen Patti and rummy in a single download." }]),
  },
  {
    path: "/games/poker",
    title: "Online Poker India — Play Poker on Teen Patti Gold App",
    description:
      "Play online poker on Teen Patti Gold — Texas Hold'em, cash tables, tournaments, fair dealing, and secure payouts for Indian players.",
    keywords: kw("online poker india", "poker app download", "play poker online"),
    priority: 0.85,
    changefreq: "weekly",
    tags: ["online poker india", "poker app", "poker tournaments"],
    faq: faq([{ q: "Does Teen Patti Gold have poker tournaments?", a: "Yes. Join cash games and tournaments from the app lobby." }]),
  },
  {
    path: "/games/fantasy-cricket",
    title: "Fantasy Cricket App — IPL Teams & Contests | Teen Patti Gold",
    description:
      "Play fantasy cricket on Teen Patti Gold. Create IPL teams, join contests, and win cash prizes on match days alongside card games.",
    keywords: kw("fantasy cricket", "fantasy cricket app", "ipl fantasy team"),
    priority: 0.82,
    changefreq: "weekly",
    tags: ["fantasy cricket app", "ipl fantasy", "fantasy cricket online"],
    faq: faq([{ q: "When can I play fantasy cricket?", a: "Contests run during IPL and major cricket series — check the app schedule." }]),
  },
  {
    path: "/games/casino-games",
    title: "Casino Games Online — Live Casino India | Teen Patti Gold",
    description:
      "Explore casino games online on Teen Patti Gold with secure play, verified payouts, and responsible gaming tools for 18+ players.",
    keywords: kw("casino games online", "live casino india", "online casino app"),
    priority: 0.82,
    changefreq: "weekly",
    tags: ["casino games online", "live casino india", "casino app"],
    faq: faq([{ q: "Are casino games on Teen Patti Gold secure?", a: "Yes. We use encryption, fair play systems, and verified KYC for cash play." }]),
  },
  {
    path: "/games/slots",
    title: "Online Slots — Spin & Win | Teen Patti Gold App",
    description:
      "Play online slots on Teen Patti Gold. Bonus rounds, daily spins, and real rewards — download one app for slots and rummy.",
    keywords: kw("online slots", "slots game download", "slot games india"),
    priority: 0.82,
    changefreq: "weekly",
    tags: ["online slots", "slots game", "slot app india"],
    faq: faq([{ q: "Are slots included in the Teen Patti Gold APK?", a: "Yes. Slots and rummy are available after one app download." }]),
  },
  {
    path: "/bonuses",
    title: "Teen Patti Gold Bonuses — Welcome, Referral & Cashback Offers",
    description:
      "All Teen Patti Gold bonuses: welcome bonus up to ₹5,100, referral rewards, daily cashback, and first deposit offers for new players.",
    keywords: kw("teen patti gold bonus", "teen patti welcome bonus", "teen patti cashback"),
    priority: 0.9,
    changefreq: "weekly",
    tags: ["teen patti bonus", "welcome bonus teen patti", "teen patti cashback"],
    faq: faq([{ q: "What is the Teen Patti Gold welcome bonus?", a: "New users can get up to ₹5,100 on first deposit — see terms in the app." }]),
  },
  {
    path: "/bonuses/welcome-bonus",
    title: "Welcome Bonus — Up to ₹5,100 | Teen Patti Gold New Player Offer",
    description:
      "Claim the Teen Patti Gold welcome bonus for new players. Download APK, register, deposit, and get bonus credits — terms apply.",
    keywords: kw("teen patti welcome bonus", "teen patti gold welcome offer", "first bonus teen patti"),
    priority: 0.86,
    changefreq: "weekly",
    tags: ["welcome bonus teen patti", "teen patti gold bonus", "new player bonus"],
    faq: faq([{ q: "How do I claim the welcome bonus?", a: "Download the app, complete registration, make your first deposit, and the bonus is credited per T&C." }]),
  },
  {
    path: "/bonuses/referral-bonus",
    title: "Referral Bonus — Refer Friends & Earn | Teen Patti Gold",
    description:
      "Earn Teen Patti Gold referral bonus when friends join and play. Unlimited invites and cash rewards for every qualified referral.",
    keywords: kw("teen patti referral bonus", "refer and earn", "teen patti gold refer code"),
    priority: 0.85,
    changefreq: "weekly",
    tags: ["referral bonus teen patti", "refer and earn", "teen patti refer code"],
    faq: faq([{ q: "Is there a limit on referrals?", a: "Our program allows unlimited invites — rewards depend on friend activity." }]),
  },
  {
    path: "/bonuses/daily-cashback",
    title: "Daily Cashback — Teen Patti Gold Player Rewards",
    description:
      "Get daily cashback on Teen Patti Gold. Active players earn a percentage back every day based on gameplay tiers.",
    keywords: kw("teen patti cashback", "daily cashback teen patti app"),
    priority: 0.83,
    changefreq: "weekly",
    tags: ["daily cashback", "teen patti cashback", "teen patti rewards"],
    faq: faq([{ q: "How is daily cashback calculated?", a: "Cashback tiers depend on your play volume — check the Promotions section in-app." }]),
  },
  {
    path: "/bonuses/first-deposit",
    title: "First Deposit Offer — Extra Bonus | Teen Patti Gold",
    description:
      "Maximize your first deposit on Teen Patti Gold with matched bonus credits and free tournament entries for new accounts.",
    keywords: kw("teen patti first deposit offer", "teen patti deposit bonus"),
    priority: 0.83,
    changefreq: "weekly",
    tags: ["first deposit bonus", "teen patti deposit offer"],
    faq: faq([{ q: "Can I combine first deposit and welcome bonus?", a: "Offers may stack per current terms — see in-app promotions." }]),
  },
  {
    path: "/how-to-play",
    title: "How to Play — Rummy, Teen Patti & Poker Guides | Teen Patti Gold",
    description:
      "Learn how to play rummy, Teen Patti, and poker on Teen Patti Gold. Beginner guides, rules, hand rankings, and winning tips.",
    keywords: kw("how to play rummy", "rummy rules", "teen patti rules", "poker hand rankings"),
    priority: 0.9,
    changefreq: "weekly",
    tags: ["how to play rummy", "rummy rules", "teen patti rules"],
    faq: faq([{ q: "Where do I start as a beginner?", a: "Read our How to Play Rummy guide, then try free practice tables in the app." }]),
  },
  {
    path: "/how-to-play/rummy",
    title: "How to Play Rummy — Beginner Guide | Teen Patti Gold",
    description:
      "Complete guide on how to play 13-card Indian rummy: objective, sequences, sets, declare rules, and tips for Teen Patti Gold.",
    keywords: kw("how to play rummy", "learn rummy online", "rummy tutorial"),
    priority: 0.85,
    changefreq: "monthly",
    tags: ["how to play rummy", "learn rummy", "rummy tutorial"],
    faq: faq([{ q: "What is a pure sequence in rummy?", a: "A sequence of 3+ consecutive cards of the same suit without a joker — mandatory to declare." }]),
  },
  {
    path: "/how-to-play/rummy-rules",
    title: "Rummy Rules — Official Indian Rummy Rules | Teen Patti Gold",
    description:
      "Full rummy rules for points, pool, and deals rummy. Valid sequences, sets, scoring, and declare rules on Teen Patti Gold.",
    keywords: kw("rummy rules", "indian rummy rules", "13 card rummy rules"),
    priority: 0.85,
    changefreq: "monthly",
    tags: ["rummy rules", "indian rummy rules", "13 card rummy"],
    faq: faq([{ q: "How do you win in points rummy?", a: "Declare first with valid sequences and sets — opponent unmatched cards add to their score." }]),
  },
  {
    path: "/how-to-play/teen-patti-rules",
    title: "Teen Patti Rules — How to Play Teen Patti | Teen Patti Gold",
    description:
      "Teen Patti rules explained: hand rankings, betting rounds, trail vs sequence, and tips for Teen Patti Gold players.",
    keywords: kw("teen patti rules", "teen patti how to play", teenPattiKw),
    priority: 0.83,
    changefreq: "monthly",
    tags: ["teen patti rules", "teen patti gold", "how to play teen patti"],
    faq: faq([{ q: "What beats a sequence in Teen Patti?", a: "Trail (three of a kind) beats pure sequence, then sequence, colour, pair, and high card." }]),
  },
  {
    path: "/how-to-play/poker-hand-rankings",
    title: "Poker Hand Rankings — Texas Hold'em Guide | Teen Patti Gold",
    description:
      "Poker hand rankings from high card to royal flush. Learn winning hands for online poker on Teen Patti Gold.",
    keywords: kw("poker hand rankings", "poker rules india", "texas holdem hands"),
    priority: 0.83,
    changefreq: "monthly",
    tags: ["poker hand rankings", "poker rules", "texas holdem"],
    faq: faq([{ q: "What is the best poker hand?", a: "Royal flush is highest, followed by straight flush, four of a kind, and full house." }]),
  },
  {
    path: "/contact-us",
    title: "Contact Teen Patti Gold — 24/7 Customer Support",
    description:
      "Contact Teen Patti Gold support for APK download, login, deposits, withdrawals, and gameplay help. Email support@teenpattigoldx.com — 24/7.",
    keywords: kw("teen patti gold contact", "teen patti gold support", "teen patti gold customer care"),
    priority: 0.7,
    changefreq: "monthly",
    tags: ["teen patti gold support", "teen patti gold contact", "customer care"],
    faq: faq([{ q: "How do I contact Teen Patti Gold?", a: "Email support@teenpattigoldx.com with your registered mobile number for faster help." }]),
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy — Teen Patti Gold | Data Protection",
    description:
      "Teen Patti Gold privacy policy — how we collect, use, store, and protect your personal data on our online gaming platform.",
    keywords: kw("teen patti gold privacy policy", "online gaming privacy", "data protection"),
    priority: 0.5,
    changefreq: "yearly",
    tags: ["privacy policy", "teen patti gold privacy", "data protection"],
    faq: faq([{ q: "Does Teen Patti Gold sell my data?", a: "We do not sell personal data. See this policy for how information is used and protected." }]),
  },
  {
    path: "/disclaimer",
    title: "Disclaimer & Terms — Teen Patti Gold User Agreement",
    description:
      "Teen Patti Gold disclaimer and terms of service. Eligibility, gameplay rules, bonuses, withdrawals, and responsible gaming policies.",
    keywords: kw("teen patti gold terms", "teen patti gold disclaimer", "user agreement"),
    priority: 0.5,
    changefreq: "yearly",
    tags: ["disclaimer", "terms of service", "teen patti gold rules"],
    faq: faq([{ q: "Who can play on Teen Patti Gold?", a: "Players must be 18+ and located where online skill gaming is legally permitted." }]),
  },
  {
    path: "/responsible-gaming",
    title: "Responsible Gaming — Teen Patti Gold Safe Play Policy",
    description:
      "Teen Patti Gold responsible gaming: age limits, self-exclusion, deposit limits, state restrictions, and help for problem gambling.",
    keywords: kw("responsible gaming teen patti", "safe play card games", "self exclusion"),
    priority: 0.65,
    changefreq: "monthly",
    tags: ["responsible gaming", "safe play", "18+ gaming"],
    faq: faq([{ q: "Can I set deposit limits?", a: "Yes. Use in-app responsible gaming tools to set limits and self-exclusion if needed." }]),
  },
  {
    path: "/404",
    file: "pages/404.html",
    title: "Page Not Found — Teen Patti Gold",
    description: "The page you requested was not found. Return to Teen Patti Gold home or download the official app.",
    keywords: "teen patti gold",
    priority: 0,
    changefreq: "never",
    noindex: true,
    tags: ["teen patti gold"],
    faq: [],
  },
];

/** Human-readable breadcrumb labels */
export const BREADCRUMB_LABELS = {
  "/download": "Download APK",
  "/contact-us": "Contact Us",
  "/privacy-policy": "Privacy Policy",
  "/disclaimer": "Disclaimer",
  "/refer-and-earn": "Refer & Earn",
  "/blog": "Blog",
  "/games": "Games",
  "/games/online-rummy": "Online Rummy",
  "/games/teen-patti": "Teen Patti",
  "/games/poker": "Poker",
  "/games/fantasy-cricket": "Fantasy Cricket",
  "/games/casino-games": "Casino Games",
  "/games/slots": "Slots",
  "/bonuses": "Bonuses",
  "/bonuses/welcome-bonus": "Welcome Bonus",
  "/bonuses/referral-bonus": "Referral Bonus",
  "/bonuses/daily-cashback": "Daily Cashback",
  "/bonuses/first-deposit": "First Deposit",
  "/how-to-play": "How to Play",
  "/how-to-play/rummy": "How to Play Rummy",
  "/how-to-play/rummy-rules": "Rummy Rules",
  "/how-to-play/teen-patti-rules": "Teen Patti Rules",
  "/how-to-play/poker-hand-rankings": "Poker Hand Rankings",
  "/responsible-gaming": "Responsible Gaming",
};

/** Internal links for topical authority */
export const RELATED_LINKS = {
  "/download": [
    { href: "/games/online-rummy", label: "Play Online Rummy" },
    { href: "/bonuses/welcome-bonus", label: "Welcome Bonus" },
    { href: "/how-to-play/rummy", label: "How to Play Rummy" },
    { href: "/#faq", label: "Download FAQ" },
  ],
  "/games": [
    { href: "/games/online-rummy", label: "Online Rummy" },
    { href: "/games/teen-patti", label: "Teen Patti" },
    { href: "/games/poker", label: "Poker" },
    { href: "/download", label: "Download App" },
  ],
  "/games/online-rummy": [
    { href: "/how-to-play/rummy-rules", label: "Rummy Rules" },
    { href: "/bonuses/welcome-bonus", label: "Welcome Bonus" },
    { href: "/download", label: "Download APK" },
  ],
  "/games/teen-patti": [
    { href: "/how-to-play/teen-patti-rules", label: "Teen Patti Rules" },
    { href: "/download", label: "Teen Patti Gold Download" },
  ],
  "/bonuses": [
    { href: "/bonuses/welcome-bonus", label: "Welcome Bonus" },
    { href: "/refer-and-earn", label: "Refer & Earn" },
    { href: "/download", label: "Download App" },
  ],
  "/how-to-play": [
    { href: "/how-to-play/rummy", label: "How to Play Rummy" },
    { href: "/how-to-play/rummy-rules", label: "Rummy Rules" },
    { href: "/games/online-rummy", label: "Play Online Rummy" },
  ],
  "/": [
    { href: "/download", label: "Download Teen Patti Gold APK" },
    { href: "/games", label: "All Games" },
    { href: "/bonuses", label: "Bonuses" },
  ],
};

export function getRelatedLinks(path) {
  if (RELATED_LINKS[path]) return RELATED_LINKS[path];
  const parent = path.replace(/\/[^/]+$/, "") || "/";
  if (RELATED_LINKS[parent]) return RELATED_LINKS[parent].filter((l) => l.href !== path).slice(0, 4);
  return [
    { href: "/download", label: "Download APK" },
    { href: "/games", label: "Games" },
    { href: "/bonuses", label: "Bonuses" },
    { href: "/how-to-play", label: "How to Play" },
  ];
}
