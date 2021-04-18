import { User } from './User';

export interface Comment {
  id: string;
  comment: string;
  created_at: string;
  updated_at: string;
  user: User;
}
