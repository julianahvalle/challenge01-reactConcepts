import { useState } from 'react'

import '../styles/tasklist.scss'

import { FiTrash, FiCheckSquare } from 'react-icons/fi'

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if(!newTaskTitle)return; //se estiver em branco, vai retornar (nada)
    //criando um estado temporário através de um objeto com o msmo formato da interface
    const newTask = { 
      id: Math.random(), //trocar isso dps pra uuid
      title: newTaskTitle, //que está dentro do input controlado
      isComplete: false, //precisa começar como falso 
    }
    //callback
    setTasks(oldState => [...oldState, newTask]); //passando tudo que tem no oldState e salvando + newTask 
    setNewTaskTitle(''); //reseta o input dps de salvar 
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    const taskCompleted = tasks.map(task => task.id === id ? {
      ...task, //pega todas as propriedades do objeto e altera somente is complete
      isComplete: !task.isComplete //pegando a taks antiga e sobrescrevendo o valor anterior dela, se for false será true, se for true será false 
    } : task ); // se o task id for diferente de id, retorna somente a task do jeito que já estava

    setTasks(taskCompleted);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    //procurando o id para retirar 
    const filtredTasks = tasks.filter(task => task.id !== id); //filtrando o array de tasks para retornar todos os outros itens, menos oq tiver sido selecionado 
    //pega cada task do filter, e verifica se o id da task é diferente do id selecionado 

    setTasks(filtredTasks); //passa para o setTasks o filtredTasks
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input //input controlado
            type="text" 
            placeholder="Adicionar novo todo" 
            onChange={(e) => setNewTaskTitle(e.target.value)} //salvando o valor do input em tempo real 
            value={newTaskTitle}
          />
          <button type="submit" data-testid="add-task-button" onClick={handleCreateNewTask}>
            <FiCheckSquare size={16} color="#fff"/>
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map(task => (
            <li key={task.id}>
              <div className={task.isComplete ? 'completed' : ''} data-testid="task" >
                <label className="checkbox-container">
                  <input 
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button type="button" data-testid="remove-task-button" onClick={() => handleRemoveTask(task.id)}>
                <FiTrash size={16}/>
              </button>
            </li>
          ))}
          
        </ul>
      </main>
    </section>
  )
}