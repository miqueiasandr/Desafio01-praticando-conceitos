import { Header } from './components/Header';
import styles from './App.module.css';
import { ClipboardText, PlusCircle } from 'phosphor-react';
import './global.css';
import { Task } from './components/Task';
import { ChangeEvent, FormEvent, useState } from 'react';
import uuid from 'react-uuid';

interface Task {
  id: string,
  content: string,
  isComplete: boolean,
}

export function App() {

  const [newTextTask, setNewTextTask] = useState('');
  const [tasks, setTasks] = useState([
    {
      id: uuid(),
      content: 'Beber Água',
      isComplete: false,
    },
    {
      id: uuid(),
      content: 'Estudar React',
      isComplete: false,
    },
    {
      id: uuid(),
      content: 'Completar Desafio',
      isComplete: false,
    }
  ]);

  function newTaskChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewTextTask(event.target.value);
  }

  function createNewTask(event: FormEvent) {
    event.preventDefault();

    const taskToAdd = {
      id: uuid(),
      content: newTextTask,
      isComplete: false,
    }

    setTasks([...tasks, taskToAdd])
    setNewTextTask('');
  }

  function deleteTask(id: string) {
    const listWithoutDeletedOne = tasks.filter(task => {
      if (task.id !== id) {
        changeStatus(id)
        return task;
      }
    });

    setTasks(listWithoutDeletedOne);
  }

  function changeStatus(id: string) {
    const modifiedList = tasks.map(task => {
      if (task.id === id) {
        if (task.isComplete === false) {
          task.isComplete = true;
        } else {
          task.isComplete = false;
        }
      }
      return task;
    })

    setTasks(modifiedList);
    checkConcludedTasks();

  }

  function checkConcludedTasks() {
    let completedTasks = 0;
    tasks.forEach(task => {
      if (task.isComplete === true) {
        completedTasks++;
      }
    })
    return completedTasks;

  }

  const isNewTextTaskEmpty = newTextTask.length === 0;
  const concludedTasksNumber = checkConcludedTasks();

  return (
    <>
      <Header />

      <div className={styles.main}>
        <div className={styles.newTask}>
          <textarea
            name='task'
            placeholder='Adicione uma nova tarefa'
            onChange={newTaskChange}
            value={newTextTask}
          />
          <button
            onClick={createNewTask}
            type='submit'
            disabled={isNewTextTaskEmpty}
          >
            Criar
            <PlusCircle size={20} />
          </button>
        </div>

        <div className={styles.taskList}>
          <header>
            <div className={styles.amountTasks}>
              <p>Tarefas criadas</p>
              <span>{tasks.length}</span>
            </div>

            <div className={styles.concludedTasks}>
              <p>Concluídas</p>
              <span>{`${concludedTasksNumber} de ${tasks.length}`}</span>
            </div>
          </header>
          {tasks.map(task => {
            return (
              <Task
                key={task.id}
                id={task.id}
                content={task.content}
                isComplete={task.isComplete}
                changeStatus={changeStatus}
                deleteTask={deleteTask}
              />
            );
          })}
          <div className={tasks.length !== 0 ? styles.createdTasksInvisible : styles.createdTasks}>
            <ClipboardText size={56} />
            <p>Você ainda não tem tarefas cadastradas</p>
            <p>Crie tarefas e organize seus itens a fazer</p>
          </div>
        </div>
      </div>


    </>
  )
}
