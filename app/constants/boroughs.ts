type Borough = {
  fileName: string;
  boroughName: string;
  description: string;
  quote: {
    text: string;
    author: string;
  };
}

export const BoroughSummaries: Record<string, Borough> = {
  bronx: {
    fileName: "bronx",
    boroughName: "The Bronx",
    description:
      "The birthplace of hip-hop. The Bronx pulses with unmatched energy and pride. A borough where creativity and community come together to shape a distinct identity. Its streets echo stories of resilience, strength, and unwavering spirit. The Bronx stands as a living testament to the power of culture and perseverance.",
    quote: {
      text: "The Bronx is the birthplace of hip-hop, a culture that changed the world.",
      author: "Unknown",
    },
  },
  manhattan: {
    fileName: "manhattan",
    boroughName: "Manhattan",
    description:
      "The pulse of the world beats strongest in Manhattan. A global stage where history and innovation meet, shaping culture that echoes worldwide. Each street holds stories of ambition, resilience, and reinvention. This borough is a testament to New York’s enduring spirit and influence. Manhattan is NYC’s relentless heart, always evolving, always iconic.",

    quote: {
      text: "Manhattan is the capital of the world, a skyline of endless ambition.",
      author: "Wallace Stevens",
    },
  },
  queens: {
    fileName: "queens",
    boroughName: "Queens",
    description:
      "A borough defined by resilience, diversity, and ambition. Home to The Not Project, and countless voices that shape NYC’s culture. Queens bridges legacies and dreams, where every street corner holds a promise. It’s where the world comes together, a story waiting to be told.",

    quote: {
      text: "Queens is the future of New York, a global tapestry in every corner.",
      author: "Andrew Cuomo",
    },
  },
  brooklyn: {
    fileName: "brooklyn",
    boroughName: "Brooklyn",
    description:
      "A borough that moves with grit, ambition, and an unshakable sense of identity. From the pulse of its streets to the soul of its art, Brooklyn defines culture instead of chasing it. Where legacy meets evolution. Brooklyn is NYC’s boldest statement. Timeless, unapologetic, and always ahead of the curve.",
    quote: {
      text: "Brooklyn is not a neighborhood, it’s a way of life.",
      author: "Unknown",
    },
  },
  statenisland: {
    fileName: "statenisland",
    boroughName: "Staten Island",
    description:
      "The city’s quietest borough, but its spirit is anything but subdued. Known affectionately as “Shaolin,” Staten Island blends old-school values with modern energy. Here, strength comes from unity and a deep love for the place called home. NYC’s underdog that is loyal, resilient, and full of heart.",
    quote: {
      text: "Staten Island is the borough of parks and pride.",
      author: "Unknown",
    },
  },
  nyc: {
    fileName: "nyc",
    boroughName: "New York",
    description:
      "NYC is more than just five boroughs—it’s an idea, a heartbeat, a movement. It’s where cultures collide, resilience thrives, and history is made every single day. This is New York, the greatest city in the world.",
    quote: {
      text: "New York is not a city, it’s a world.",
      author: "Iman",
    },
  },
};
