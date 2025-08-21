import styles from './PFTag.module.css'

export type PFTagProps = {
    title: string; 
    className?: string;
    onClick?: () => void;
  };


  export default function PFTag( { title, onClick, className }: PFTagProps) {
    return (
      <div className={className} onClick={onClick}>
        <span className={styles.tagSpan}>{title}</span>
      </div>
    );
  }