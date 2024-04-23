'use client';

import { Button } from './Button';

import { useCheckVoteUser } from '@/hooks/useCheckVoteUser';

import styles from './votebutton.module.css';
import { useUser } from '@/hooks/useUser';

interface VoteButtonProps {
  postId: number;
}

export const VoteButton = (props: VoteButtonProps) => {
  const { postId } = props;
  const { user } = useUser();
  const { data } = useCheckVoteUser(postId);
  console.log('data##', data);
  // TODO:: 로그인 안했을시 예외 처리

  return (
    <div className={styles.voteBox}>
      <Button color='#fff' backgroundColor='#28344e' text='투표A' />
      <Button text='투표B' />
    </div>
  );
};
