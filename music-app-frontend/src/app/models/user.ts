import { Album }                from './album';
import { Post }                from './post';

export class User {
  id: number;
  name: string;
  thumbnail: string;
  website: string;
  albums:Album[];
  albumIds:Array<number>;
  posts:Post[];
}
