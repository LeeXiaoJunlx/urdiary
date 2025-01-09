export interface Comment {
  id: string;
  from: string;
  text: string;
  timestamp: string;
}

export interface MenfessPost {
  id: string;
  from: string;
  to: string;
  message: string;
  timestamp: string;
  loveCount: number;
  comments: Comment[];
}
