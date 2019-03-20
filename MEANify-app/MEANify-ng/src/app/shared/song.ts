import { Comment } from './comment';


export class Song {
  id: string;
  name: string;
  artist: string;
  year: number;
  genre: string;
  uploadedby: string;
  location: string;
  comments: Comment;
}
