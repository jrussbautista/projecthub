export type Labels = string[];

export interface AddProject {
  title: string;
  image_url: string;
  description: string;
  github_link: string;
  website_link: string;
  image: string;
  labels: string[];
}

export interface Project {
  id?: string;
  title: string;
  image_url: string;
  description: string;
  github_link: string;
  website_link: string;
  is_favorite?: boolean;
  labels: Labels;
  created_at: any;
  updated_at: any;
}

export type Field = "my_projects" | "all_projects";
