export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  photo_url?: string | null;
}
