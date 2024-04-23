export interface Vote {
  postId: number;
  voteOption: String;
}

export interface ResponseVote {
  count: number;
  voteOption: String;
}

export interface ResponseCheckVoteUser {
  voteOption: String;
  userVoted: boolean;
}
