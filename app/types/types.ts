export type Category = {
  id: string;
  name: string;
  description: string;
};

export type Story = {
  title: string;
  id: string;
  content: string;
  summary: string;
  borough: string;
  author: Author;
  categories: Category[];
  createdAt: Date;
  updatedAt?: Date;
  thumbnail: string;
  isPublished: boolean;
  isSaved: boolean;
  isRadar: boolean;
};

export type CompactStory = Omit<Story, 'content'>

type Author = {
  id: string;
  firstName: string;
  lastName: string;
};

export type Filters = {
  search: string;
  boroughs: string[];
  categories: string[];
};
