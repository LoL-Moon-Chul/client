import styles from "./button.module.css";

interface ButtonProps {
  text: string;
  onClick?: () => void;
  backgroundColor?: string;
  color?: string;
}

export const Button = (props: ButtonProps) => {
  const { text, onClick, backgroundColor, color } = props;

  return (
    <div
      className={styles.btn}
      style={{
        backgroundColor: backgroundColor || "#5382E8",
        color: color || "#fff",
      }}
      onClick={onClick}
    >
      {text}
    </div>
  );
};
