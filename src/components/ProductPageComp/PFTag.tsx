import styles from './PFTag.module.css'

export type PFTagProps = {
    title: string; 
  };


  export default function PFTag( { title }: PFTagProps) {
    return (
      <div className={styles.tag}>
        <span className={styles.tagSpan}>{title}</span>
      </div>
    );
  }