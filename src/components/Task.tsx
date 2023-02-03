import { Trash } from 'phosphor-react';
import styles from './Task.module.css';

interface TaskProps {
  id: string,
  content: string,
  isComplete: boolean,
  changeStatus: (id:string)=>void,
  deleteTask: (id:string)=>void;
}

export function Task({ content, isComplete, id, changeStatus, deleteTask }: TaskProps) {


  return (
    <div className={styles.task}>
      <label
        className={styles.container}
      >

        <input 
          type="checkbox" 
          checked={isComplete} 
          onChange={()=>{changeStatus(id)}}
        />
        <span className={styles.checkMark}></span>
        <span>{content}</span>
      </label>
      <button onClick={()=>{deleteTask(id)}}>
        <Trash size={20} />
      </button>

    </div>
  );
}