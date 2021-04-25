import { User } from "./User";

export interface Paste {
  id: string;
  title: string;
  text: string;
  syntax: string;
  created_by: User;

  /**
   * Created at in ms
   */
  created_at: number;

  /**
   * Last updated at in ms
   */
  updated_at: number;
}
