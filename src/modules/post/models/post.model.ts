export interface WritePost {
  title: string;
  content: string;
  point: string;
  lolName: string;
  lineA: string;
  lineB: string;
}

export interface ResponsePost {
  memberId: number;
  memberName: string;
  memberImageUrl: string;
  postId: number;
  title: string;
  point: string;
  lineA: string;
  lineB: string;
  voteA: number;
  voteB: number;
  content: string;
  createdAt: string;
}
