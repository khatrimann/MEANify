import { Comment } from './comment';
import { Song } from './song';

export class Playlist {
  id: string;
  name: string;
  nsongs: number;
  image: string;
  createddby: string;
  comments: Comment;
  songs: Song;
}
