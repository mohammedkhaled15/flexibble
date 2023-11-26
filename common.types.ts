import { User, Session } from "next-auth";

export type FormState = {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
};

export interface ProjectInterface {
  id: string;
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
  views: number;
  likedBy?: Like[];
  createdBy?: {
    id: string;
    name: string | null;
    email: string;
    githubUrl: string | null;
    avatarUrl: string | null;
    image: string | null;
    linkedinUrl: string | null;
  };
}

export interface UserProfile {
  id: string;
  name: string | null;
  email: string;
  description: string | null;
  avatarUrl: string | null;
  githubUrl: string | null;
  linkedinUrl: string | null;
  image: string|null;
  projects:ProjectInterface [];
  
}

export interface SessionInterface extends Session {
  user: User & {
    id: string;
    name: string;
    email: string;
    avatarUrl: string;
  };
}

export interface ProjectForm {
  title: string;
  description: string;
  image: string;
  liveSiteUrl: string;
  githubUrl: string;
  category: string;
}

export interface Like {
  id: string;
  userId: string;
  projectId: string;
}
