import { Story } from "../types/types";
import seoKeywords from "./seoKeywords";

const projectMetadata = {
  title: "The Not Project",
  description:
    "Unbridled Stories, Untamed Voices. Human-centered stories from NYC: blogs, interviews, films, and more.",
  authors: [{ name: "Tariq El Ghayate" }],
  creator: "The Not Project",
  metadataBase: new URL("https://www.thenotproject.com"),
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: "The Not Project",
    description:
      "Explore meaningful stories from New York City, told without constraint or agenda.",
    url: "https://www.thenotprojnot Lorenzoect.com",
    siteName: "The Not Project",
    images: [
      {
        url: "/media/preview-card.jpeg",
        width: 1200,
        height: 630,
        alt: "The Not Project Cover Image",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "The Not Project",
    description: "NYC stories with soul. Told raw and unfiltered.",
    images: ["/media/preview-card.jpeg"],
  },
  keywords: seoKeywords.home,
};

const aboutPageMetadata = {
  title: "About | The Not Project",
  description:
    "Learn more about the people and purpose behind The Not Project.",
  openGraph: {
    title: "About | The Not Project",
    description:
      "Learn more about the people and purpose behind The Not Project.",
    url: "https://www.thenotproject.com/about",
    type: "website",
    images: [
      {
        url: "/media/LoAndDavid.png",
        width: 1200,
        height: 630,
        alt: "The Not Project About",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About | The Not Project",
    description:
      "Learn more about the people and purpose behind The Not Project.",
    images: ["/media/LoAndDavid.png"],
  },
  keywords: seoKeywords.about,
};

const contactPageMetadata = {
  title: "Contact | The Not Project",
  description:
    "Get in touch with The Not Project team for collaborations, feedback, or inquiries.",
  openGraph: {
    title: "Contact | The Not Project",
    description:
      "Get in touch with The Not Project team for collaborations, feedback, or inquiries.",
    url: "https://www.thenotproject.com/contact",
    type: "website",
    images: [
      {
        url: "/media/LoAndDavid.png",
        width: 1200,
        height: 630,
        alt: "The Not Project Contact",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact | The Not Project",
    description:
      "Get in touch with The Not Project team for collaborations, feedback, or inquiries.",
    images: ["/media/LoAndDavid.png"],
  },
  keywords: seoKeywords.contact,
};

const donatePageMetadata = {
  title: "Donate | The Not Project",
  description:
    "Support The Not Project by making a donation. Your contribution helps us continue our mission of sharing stories and fostering community.",
  keywords: seoKeywords.donate,
};

const profilePageMetadata = {
  title: "Profile | The Not Project",
  description:
    "Manage your personal information and saved stories on The Not Project.",
  openGraph: {
    title: "Profile | The Not Project",
    description:
      "Manage your personal information and saved stories on The Not Project.",
    url: "https://www.thenotproject.com/profile",
    type: "website",
    images: [
      {
        url: "/media/LoAndDavid.png",
        width: 1200,
        height: 630,
        alt: "The Not Project Profile",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Profile | The Not Project",
    description:
      "Manage your personal information and saved stories on The Not Project.",
    images: ["/media/LoAndDavid.png"],
  },
  keywords: seoKeywords.profile,
};

const storiesPageMetadata = {
  title: "Stories | The Not Project",
  description:
    "Discover inspiring stories from diverse communities on The Not Project.",
  openGraph: {
    title: "Stories | The Not Project",
    description:
      "Discover inspiring stories from diverse communities on The Not Project.",
    url: "https://www.thenotproject.com/stories",
    type: "website",
    images: [
      {
        url: "/media/preview-card.jpeg",
        width: 1200,
        height: 630,
        alt: "The Not Project Stories",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Stories | The Not Project",
    description:
      "Discover inspiring stories from diverse communities on The Not Project.",
    images: ["/media/preview-card.jpeg"],
  },
  keywords: seoKeywords.stories,
};

function getBoroughMetadata(borough: string) {
  const formatBoroughName = (slug: string) => {
    switch (slug) {
      case "bronx":
        return "The Bronx";
      case "statenisland":
        return "Staten Island";
      default:
        return slug.charAt(0).toUpperCase() + slug.slice(1);
    }
  };

  const properBorough = formatBoroughName(borough);
  const title = `${properBorough} Stories | The Not Project`;
  const description = `Explore stories from ${properBorough} on The Not Project.`;
  const url = `https://www.thenotproject.com/stories/${borough}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "website",
      images: [
        {
          url: `/media/boroughBackdrops/${borough}.jpg`,
          width: 1200,
          height: 630,
          alt: `Stories from ${properBorough}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`/media/boroughBackdrops/${borough}.jpg`],
    },
    keywords: [...seoKeywords.stories, properBorough],
  };
}

const getCleanDescription = (text?: string) => 
  text?.slice(0, 160).replace(/\n/g, " ") || "A story shared on The Not Project.";

function getStoryMetadata(story: Story | null) { 
  if (!story) {
    return {
      title: "Story Not Found | The Not Project",
      description: "The story you are looking for does not exist.",
    };
  }

  const title = `${story.title} | The Not Project`;
  const description = getCleanDescription(story.summary);
  const url = `https://www.thenotproject.com/story/${story.id}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url,
      type: "article",
      images: [
        {
          url: story.thumbnail,
          width: 1200,
          height: 630,
          alt: story.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [story.thumbnail],
    },
    keywords: seoKeywords.story,
  };
}

export {
  aboutPageMetadata,
  contactPageMetadata,
  donatePageMetadata,
  profilePageMetadata,
  storiesPageMetadata,
  getBoroughMetadata,
  getStoryMetadata
};

export default projectMetadata;
