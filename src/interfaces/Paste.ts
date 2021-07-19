import { User } from "./User";

export interface Paste {
  id: string;
  title: string;
  text: string;
  syntax: string;
  created_by: User | null;

  /**
   * created at in ms
   */
  created_at: number;

  /**
   * last updated at in ms
   */
  updated_at: number;
}
