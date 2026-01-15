import fs from "fs/promises";
import { FetchRequestFreepik } from "../services/api.js";

const SIZE_LIMIT = 100;
const FREEPIK_API_KEY_1 = "FPSX50582b10f0b2353db67d5572b29e5a69";
const FREEPIK_API_KEY_2 = "FPSX3937ab15386e4fb4d57515ef0536bb77";
const FREEPIK_API_KEY_3 = "FPSX8a9aeb9ee5926d173cb114ae216bbd51";
const FREEPIK_API_KEY_4 = "FPSXc906a439e3c83847f18adf8f9828dc28";
const FREEPIK_API_KEY_5 = "FPSXd14d1b433153286ce85451857499540f";

export const keywordsByTopic = {
    // "Back to School": [
    //     "back to school",
    //     "school supplies",
    //     "backpack",
    //     "pencil",
    //     "pen",
    //     "notebook",
    //     "ruler",
    //     "eraser",
    //     "highlighter",
    //     "binder",
    //     "textbook",
    //     "classroom",
    //     "teacher",
    //     "student",
    //     "school bus",
    //     "locker",
    //     "schedule",
    //     "timetable",
    //     "desk",
    //     "chalkboard",
    //     "whiteboard",
    //     "recess",
    //     "lunchbox",
    //     "cafeteria",
    //     "uniform",
    //     "subjects",
    //     "pencil case",
    //     "paper clips",
    //     "sticky notes",
    //     "glue stick",
    //     "scissors",
    //     "markers",
    //     "crayons",
    //     "school bell",
    //     "geometry set",
    //     "compass",
    //     "protractor",
    //     "flashcards",
    //     "chalk",
    //     "ink bottle",
    //     "school hall",
    //     "bulletin board",
    // ],
    // "Labor Day": [
    //     "labor day",
    //     "workers",
    //     "jobs",
    //     "community helpers",
    //     "construction worker",
    //     "doctor",
    //     "nurse",
    //     "teacher",
    //     "firefighter",
    //     "police officer",
    //     "chef",
    //     "farmer",
    //     "mechanic",
    //     "electrician",
    //     "plumber",
    //     "carpenter",
    //     "tools",
    //     "hard hat",
    //     "safety gloves",
    //     "teamwork",
    //     "labor",
    //     "factory",
    //     "occupation",
    //     "toolbox",
    //     "hammer",
    //     "wrench",
    //     "pliers",
    //     "screwdriver",
    //     "safety vest",
    //     "work boots",
    //     "gear icon",
    //     "construction cones",
    //     "blueprints",
    //     "factory smoke stack",
    //     "assembly line",
    //     "workshop",
    //     "protective goggles",
    // ],
    // "Spirit Week": [
    //     "spirit week",
    //     "school spirit",
    //     "theme days",
    //     "pajama day",
    //     "twin day",
    //     "crazy hair day",
    //     "sports day",
    //     "color day",
    //     "costumes",
    //     "school pride",
    //     "cheer team",
    //     "mascot",
    //     "pep rally",
    //     "banners",
    //     "decorations",
    //     "face paint",
    //     "team colors",
    //     "cheer megaphone",
    //     "spirit beads",
    //     "foam fingers",
    //     "school flag",
    //     "confetti",
    //     "spirit stickers",
    //     "theme outfit",
    //     "fan signs",
    //     "mascot paw print",
    //     "glitter makeup",
    // ],
    // Homecoming: [
    //     "homecoming",
    //     "parade",
    //     "football game",
    //     "homecoming dance",
    //     "cheerleaders",
    //     "spirit wear",
    //     "queen",
    //     "king",
    //     "crown",
    //     "alumni",
    //     "banner",
    //     "decorations",
    //     "school pride",
    //     "corsage",
    //     "boutonniere",
    //     "music",
    //     "float",
    //     "pep rally",
    //     "red carpet",
    //     "photo booth",
    //     "stage lights",
    //     "dance tickets",
    //     "ribbons",
    //     "confetti",
    //     "balloon arch",
    //     "fireworks show",
    //     "football helmet",
    //     "parade drum",
    // ],
    // Halloween: [
    //     "halloween",
    //     "pumpkin",
    //     "jack-o-lantern",
    //     "ghost",
    //     "witch",
    //     "spider",
    //     "bat",
    //     "black cat",
    //     "haunted house",
    //     "skeleton",
    //     "zombie",
    //     "vampire",
    //     "monster",
    //     "trick-or-treat",
    //     "candy",
    //     "costume",
    //     "broomstick",
    //     "spooky",
    //     "cobweb",
    //     "cauldron",
    //     "moonlight",
    //     "tombstone",
    //     "scarecrow",
    //     "werewolf",
    //     "mummy",
    //     "witch hat",
    //     "potion bottle",
    //     "lantern",
    //     "candy bucket",
    //     "eyeball",
    //     "haunted tree",
    //     "graveyard",
    // ],
    // "Veterans Day": [
    //     "veterans day",
    //     "soldiers",
    //     "military",
    //     "army",
    //     "navy",
    //     "air force",
    //     "marines",
    //     "coast guard",
    //     "veteran",
    //     "service",
    //     "bravery",
    //     "honor",
    //     "medal",
    //     "flag",
    //     "uniform",
    //     "ceremony",
    //     "salute",
    //     "patriotism",
    //     "military badge",
    //     "ribbon",
    //     "eagle emblem",
    //     "stars",
    //     "memorial",
    //     "parade",
    //     "trumpet bugle",
    //     "folded flag",
    //     "camouflage pattern",
    //     "dog tags",
    // ],
    // "Thanksgiving Break": [
    //     "thanksgiving",
    //     "turkey",
    //     "pumpkin pie",
    //     "feast",
    //     "harvest",
    //     "autumn leaves",
    //     "family dinner",
    //     "cranberries",
    //     "corn",
    //     "stuffing",
    //     "gravy",
    //     "gratitude",
    //     "fall season",
    //     "sweater",
    //     "maple leaf",
    //     "scarecrow",
    //     "cornucopia",
    //     "apple pie",
    //     "mashed potatoes",
    //     "fall wreath",
    //     "hay bale",
    //     "acorns",
    //     "pumpkin spice",
    //     "table setting",
    //     "autumn basket",
    //     "casserole",
    //     "wheat bundle",
    //     "roasted vegetables",
    // ],
    // "Winter Concert Play": [
    //     "winter concert",
    //     "winter play",
    //     "stage",
    //     "rehearsal",
    //     "performance",
    //     "script",
    //     "costume",
    //     "choir",
    //     "orchestra",
    //     "musical instruments",
    //     "spotlight",
    //     "curtain",
    //     "audience",
    //     "tickets",
    //     "microphone",
    //     "props",
    //     "scenes",
    //     "sheet music",
    //     "piano",
    //     "violin",
    //     "stage lights",
    //     "director",
    //     "backdrop",
    //     "stage decorations",
    //     "program booklet",
    //     "snowy background",
    //     "snowflake decor",
    //     "musical notes",
    // ],
    // "Winter Break (Christmas & New Year)": [
    //     "christmas",
    //     "Christmas tree",
    //     "ornaments",
    //     "Santa Claus",
    //     "reindeer",
    //     "snowman",
    //     "gift wrapping",
    //     "gingerbread",
    //     "fireplace",
    //     "snowflakes",
    //     "holiday lights",
    //     "sleigh",
    //     "elves",
    //     "New Year countdown",
    //     "fireworks",
    //     "celebration",
    //     "family gathering",
    //     "hot chocolate",
    //     "stockings",
    //     "candy canes",
    //     "holly",
    //     "jingle bells",
    //     "snowy village",
    //     "Christmas cookies",
    //     "winter scarf",
    //     "cozy sweater",
    //     "chimney",
    //     "gift bags",
    //     "party hats",
    //     "champagne glasses",
    // ],
    // "New Year’s Day": [
    //     "new year",
    //     "fireworks",
    //     "countdown",
    //     "calendar",
    //     "new beginnings",
    //     "resolutions",
    //     "balloons",
    //     "confetti",
    //     "party",
    //     "celebration",
    //     "new goals",
    //     "sparkler",
    //     "clock strike",
    //     "champagne",
    //     "2025 numbers",
    //     "party horn",
    //     "streamers",
    //     "midnight",
    //     "new year’s banner",
    //     "toast",
    //     "wish list",
    // ],
    // "Martin Luther King Jr. Day": [
    //     "equality",
    //     "peace",
    //     "freedom",
    //     "civil rights",
    //     "unity",
    //     "justice",
    //     "march",
    //     "dream",
    //     "speech",
    //     "diversity",
    //     "leadership",
    //     "community",
    //     "holding hands",
    //     "peace dove",
    //     "microphone",
    //     "dream clouds",
    //     "books",
    //     "activism signs",
    //     "solidarity",
    //     "scales of justice",
    // ],
    // "Valentine’s Day": [
    //     "valentines",
    //     "heart",
    //     "roses",
    //     "chocolate",
    //     "valentine card",
    //     "love",
    //     "friendship",
    //     "cupid",
    //     "arrows",
    //     "gift",
    //     "pink",
    //     "embrace",
    //     "flowers",
    //     "balloons",
    //     "heart envelope",
    //     "love letter",
    //     "couple silhouette",
    //     "heart key",
    //     "rings",
    //     "teddy bear",
    //     "heart sparkles",
    //     "romantic ribbon",
    // ],
    // "Presidents’ Day": [
    //     "president",
    //     "White House",
    //     "Abraham Lincoln",
    //     "George Washington",
    //     "leadership",
    //     "history",
    //     "American flag",
    //     "government",
    //     "election",
    //     "patriotism",
    //     "monument",
    //     "statue",
    //     "eagle emblem",
    //     "gavel",
    //     "constitution",
    //     "Mount Rushmore",
    //     "top hat",
    //     "presidential seal",
    //     "quill pen",
    //     "historic building",
    // ],
    // "Spring Break / Easter": [
    //     "spring",
    //     "spring break",
    //     "easter",
    //     "flowers",
    //     "blossoms",
    //     "sunshine",
    //     "vacation",
    //     "travel",
    //     "Easter eggs",
    //     "bunny",
    //     "basket",
    //     "egg hunt",
    //     "chicks",
    //     "pastel colors",
    //     "butterflies",
    //     "spring rain",
    //     "flower field",
    //     "rain boots",
    //     "umbrellas",
    //     "bird nests",
    //     "rainbow",
    //     "baby animals",
    //     "Spring meadow",
    // ],
    // Prom: [
    //     "prom",
    //     "formal dress",
    //     "tuxedo",
    //     "corsage",
    //     "boutonniere",
    //     "dance floor",
    //     "decorations",
    //     "balloons",
    //     "photobooth",
    //     "music",
    //     "DJ",
    //     "limo",
    //     "spotlight",
    //     "stage",
    //     "lights",
    //     "mirror ball",
    //     "high heels",
    //     "prom tickets",
    //     "glitter",
    //     "ribbon decor",
    //     "red carpet",
    //     "stage curtains",
    //     "rose petals",
    // ],
    // "Field Day": [
    //     "relay race",
    //     "jump rope",
    //     "soccer",
    //     "tug-of-war",
    //     "obstacle course",
    //     "cones",
    //     "whistle",
    //     "team colors",
    //     "sportsmanship",
    //     "water games",
    //     "track",
    //     "scoreboard",
    //     "running",
    //     "outdoor fun",
    //     "stopwatch",
    //     "hurdles",
    //     "banners",
    //     "team flags",
    //     "trophy",
    //     "medals",
    //     "hydration station",
    // ],
    // "Memorial Day": [
    //     "memorial day",
    //     "remembrance",
    //     "flag",
    //     "ceremony",
    //     "soldiers",
    //     "honor",
    //     "wreath",
    //     "cemetery",
    //     "service",
    //     "patriotism",
    //     "parade",
    //     "moment of silence",
    //     "poppy flower",
    //     "memorial statue",
    //     "flagpole",
    //     "eternal flame",
    //     "military badge",
    //     "tribute ribbon",
    //     "folded flag",
    //     "cross markers",
    // ],
    Graduation: [
        "graduation",
        "cap",
        "gown",
        "diploma",
        "stage",
        "tassel",
        "achievement",
        "speech",
        "class of ___",
        "balloons",
        "celebration",
        "certificate",
        "medal",
        "honor roll",
        "graduation cap toss",
        "laurel wreath",
        "podium",
        "award ribbon",
        "photo backdrop",
        "graduation banner",
        "honor cords",
        "confetti",
    ],
    "End of School Year": [
        "end of school year",
        "summer plans",
        "report card",
        "awards",
        "certificates",
        "classroom cleanup",
        "memories",
        "yearbook",
        "autograph book",
        "fun day",
        "celebration",
        "last day of school",
        "class photo",
        "student reflections",
        "farewell notes",
        "balloon release",
        "school bus goodbye",
        "summer wish list",
        "holiday vibes",
        "cleanup supplies",
    ],
    "Independence Day": [
        "independence day",
        "fireworks",
        "flag",
        "celebration",
        "barbecue",
        "parade",
        "stars and stripes",
        "liberty",
        "picnic",
        "red white blue",
        "balloons",
        "sparklers",
        "freedom",
        "eagle symbol",
        "statue of liberty",
        "flag bunting",
        "bbq grill",
        "patriotic hat",
        "patriotic banner",
        "star confetti",
        "4th of July badge",
    ],
    "Summer Break": [
        "summer",
        "beach",
        "sunshine",
        "swimming",
        "ice cream",
        "vacation",
        "camping",
        "travel",
        "surfboard",
        "sunglasses",
        "flip flops",
        "sandcastle",
        "ocean waves",
        "cycling",
        "water park",
        "summer sports",
        "palm trees",
        "beach umbrella",
        "snorkeling",
        "lemonade",
        "beach towel",
        "sun hat",
        "coconut drink",
        "seashells",
    ],
};

export function ensureDir(dir) {
    fs.mkdirSync(dir);
}

export function getAPIKey(i){
    switch(i){
        case 1:
            return FREEPIK_API_KEY_1;
        case 2: 
            return FREEPIK_API_KEY_2;
        case 3: 
            return FREEPIK_API_KEY_3;
        case 4: 
            return FREEPIK_API_KEY_4;
        case 5: 
            return FREEPIK_API_KEY_5;
        default:
            return "FPSX6c7ba1ba766397fb0915628e4caf4179";
    }
}

export function normalizeKey(key) {
  return key
    .toLowerCase()
    .replace(/[’']/g, "")        // bỏ dấu '
    .replace(/[()/]/g, "")       // bỏ (, ), /
    .replace(/\s+/g, "_")        // space -> _
    .replace(/[^a-z0-9_-]/g, "") // bỏ ký tự lạ
    .replace(/_+/g, "_")         // gộp __
    .replace(/^_|_$/g, "");      // bỏ _ đầu/cuối
}

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));


export async function getBackgroudByKeyWord(keyword) {
  const MAX_RETRY = 5;
  const MAX_KEY = 6;

  let lastPage = Infinity;
  let page = 1;
  let keyIndex = 5;
  let retry = 0;

  const result = [];

  let fetchRequestFreepik = new FetchRequestFreepik(getAPIKey(keyIndex));

  while (page <= lastPage) {
    try {
      const sourceBackgrouds = await fetchRequestFreepik.get({
        order: "relevance",
        term: normalizeKey(keyword),
        page,
        limit: SIZE_LIMIT,
      });

      retry = 0; // reset retry nếu thành công

      if (!sourceBackgrouds?.data?.length) break;

      if (sourceBackgrouds.meta?.last_page) {
        lastPage = sourceBackgrouds.meta.last_page;
      }

      result.push(
        ...sourceBackgrouds.data.map(e => ({
          id: e.id,
          title: e.title,
          image: {
            ...e.image.source,
            type: e.image.type,
          },
          filename: e.filename,
        }))
      );

      page++;

    } catch (error) {
      const status = error.status;

      // ⛔ keyword không tồn tại
      if (status === 404) {
        console.warn(`⚠️ No result for keyword: "${keyword}" → skip`);
        break;
      }

      // 💥 server Freepik
      if (status === 500) {
        console.warn(`💥 Freepik 500 for "${keyword}" → skip`);
        break;
      }

      // ⏳ rate limit
      if (status === 429 && retry < MAX_RETRY) {
        const delay = Math.pow(2, retry) * 2000;
        retry++;
        console.warn(`⏳ 429 → retry ${retry}/${MAX_RETRY}, sleep ${delay}ms`);
        await sleep(delay);
        continue;
      }

      // 🔑 key invalid / quota
      if ((status === 401 || status === 403 || status === 429) && retry >= MAX_RETRY) {
        keyIndex++;
        if (keyIndex > MAX_KEY) {
          throw new Error("All Freepik API keys exhausted");
        }

        console.warn(`🔑 Switch API key → #${keyIndex}`);
        fetchRequestFreepik = new FetchRequestFreepik(getAPIKey(keyIndex));
        retry = 0;
        continue;
      }

      throw error; // lỗi không mong đợi
    }
  }

  return { data: result };
}

export async function downloadFile(url, outputPath) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    const buffer = Buffer.from(await res.arrayBuffer());
    await fs.writeFile(outputPath, buffer);
  } catch (err) {
    console.error(`❌ Download fail: ${url}`, err.message);
  }
}