import styles from './largebutton.module.css';

interface LargeButtonProps {
  text: string;
  onClick?: () => void;
  backgroundColor?: string;
  color?: string;
}

export const LargeButton = (props: LargeButtonProps) => {
  const { text, onClick, backgroundColor, color } = props;

  return (
    <div
      className={styles.btn}
      style={{
        backgroundColor: backgroundColor || '#5382E8',
        color: color || '#fff',
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
