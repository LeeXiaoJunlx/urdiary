const badWords = [
    "anjing",
    "babi",
    "bangsat",
    "goblok",
    "tolol",
    "bajingan",
    "kampret",
    "brengsek",
    "tai",
    "bodoh",
    "kontol",
    "memek",
    "jancuk",
    "asu",
    "laknat",
    "bejad",
    "perek",
    "lonte",
    "bangke",
    "ngentot",
    "tetek",
    "pantek",
    "pepek",
    "jembut",
    "jembud",
    "coli",
    "bego",
    "puki",
    "pukimak",
    "kimak",
    "pantat",
    "ngewe",
    "dongo",
    "jancok",
    "tempek",
    "peler",
    "peju",
    "pejuh",
    "silit",
    "porn",
    "jav",
    "onlyfans",
    "tocil",
    "tobrut",
  ];

export function filterBadWords(text: string): string {
  let filteredText = text;
  badWords.forEach((word) => {
    const regex = new RegExp(`\\b${word}\\b`, 'gi');
    filteredText = filteredText.replace(regex, '*'.repeat(word.length));
  });
  return filteredText;
}