import { User } from './User';

export interface AddProject {
  title: string;
  image_url: string;
  description: string;
  github_link: string;
  website_link: string;
  image_file: File;
  category: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  description: string;
  github_link: string;
  website_link: string;
  is_favorite?: boolean;
  category: string;
  created_at: any;
  updated_at: any;
  user: User;
}

export type Field = 'my_projects' | 'all_projects';
