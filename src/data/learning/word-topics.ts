// These are browsing categories for English glosses, not linguistic claims.
export const wordTopics = [
  "Food & drink",
  "People & body",
  "Nature",
  "Around town",
  "Numbers",
  "Actions & qualities",
  "More words",
] as const;
export type WordTopic = (typeof wordTopics)[number];
const patterns: [WordTopic, RegExp][] = [
  [
    "Numbers",
    /^(one|two|three|four|five|six|seven|eight|nine|ten|hundred|thousand)(\b|;)/i,
  ],
  [
    "Food & drink",
    /\b(tea|water|rice|meal|eat|drink|food|fish|noodles?|wine|salt|sugar|oil|meat|egg|soup|milk|bread|fruit|tomato|vegetables?|cakes?)\b/i,
  ],
  [
    "People & body",
    /\b(person|people|mother|father|child|son|daughter|man|woman|hand|foot|eye|ear|mouth|nose|heart|head|hair|tooth|teeth|tongue|bone|blood|skin|friend|wife|husband|elder|sister|brother)\b/i,
  ],
  [
    "Nature",
    /\b(sky|sun|moon|day|rain|wind|cloud|snow|mountain|river|sea|earth|soil|fire|wood|tree|flower|grass|leaf|stone|gold|dog|cat|pig|horse|sheep|cow|ox|bird|chicken|dragon|tiger|insect)\b/i,
  ],
  [
    "Around town",
    /\b(door|gate|house|home|room|road|street|bridge|market|shop|boat|ship|car|train|money|book|paper|school|clothes|cloth|shoe|soap|lamp|chair|table|bed|sidewalk|quilt|cups?|switch|colander|shovel)\b/i,
  ],
  [
    "Actions & qualities",
    /\b(big|small|large|black|white|red|new|old|cold|hot|warm|good|bad|many|much|few|little|come|go|buy|sell|walk|run|sit|stand|lie|speak|say|cry|laugh|sleep|turn|open|close|give|take|reach|relaxed|skinny|bland|careful|cautious|late)\b/i,
  ],
];
export function wordTopic(english: string): WordTopic {
  return (
    patterns.find(([, pattern]) => pattern.test(english))?.[0] ?? "More words"
  );
}
