import React, { useState, useRef, useEffect } from 'react';
import classes from './App.module.css'
import Task from '../../Components/Task/Task'
import axios from '../../axios-firebase';

function App() {
  //----------- STATES -----------
  // les taches en dures avec les hooks en utilisant useState
  const [tasks, setTasks] = useState([])
  // la valeur de l'input avec les hooks en utilisant useState
  const [input, setInput] = useState('')
  
  // Ref
  const inputRef = useRef('')

  // Cycle de vie
  useEffect(() => {
    inputRef.current.focus()

    // Axios
    axios.get('/taches.json')
      .then(response => {
        const newTask = [];

        for (let key in response.data) {
            newTask.push({
              ...response.data[key],
              id: key
            });
        }
        setTasks(newTask);
      })
      .catch(error => {
        console.log(error);
      });

  }, [])

  //----------- FONCTIONS -----------
  // suppression d'une tache par son index
  const removeClickedHandler = index => {
    // on fait une copie de la tache en destructuring
    const newTasks = [...tasks]
    // on utilise splice pour dire quelle tache on supprime à quel index est le chiffre 1 pour dire une tache
    newTasks.splice(index, 1)
    // on met à jour la tache
    setTasks(newTasks)

    axios.delete('taches/' + tasks[index].id + '.json', newTasks[index])
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // pour dé-checker si un tache est faite
  const doneClikedHandler = index => {
    // on fait une copie de la tache en destructuring
    const newTasks = [...tasks]
    // on cherche la tache done par index et on lui donne le contraire en valeur
    newTasks[index].done = !tasks[index].done
    // on met à jour la tache
    setTasks(newTasks)

    // Axios
    axios.put('taches/' + tasks[index].id + '.json', newTasks[index])
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  }

  // on change une todo s'il y a une erreur de frappe
  const changeClikedHandler = index => {
  }

  // on récupère le formulaire
  const submitFormHandler = e => {
    // on arrête l'envoi du formulaire
    e.preventDefault()

    // on crée une nouvelle tache qui sera un objet
    const newTask = {
      // content est égal à input
      content: input,
      // done on lui passe false vu que c'est une nouvelle tache
      done: false
    }
    // on utilise le spread operator pour récupérer toutes les taches et lui rajouter la nouvelle
    setTasks([...tasks, newTask])
    // on vide le formulaire
    setInput('')

    // Axios
    axios.post('/taches.json', newTask)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });

  } 

  // on récupère la valeur du formulaire
  const changedFormHandler = e => {
    // on récupère la valeur dans le formulaire
    setInput(e.target.value)
  }

  //----------- VARIABLES -----------
  // on parcours la tache qui est un objet avec map pour avec toutes les valeurs 
  let tasksDisplayed = tasks.map((task, index) => (
    <Task 
      key={index}
      done={task.done}
      content={task.content}
      removeClicked={() => removeClickedHandler(index)}
      doneClicked={() => doneClikedHandler(index)}
      //pencilClicked={() => changeClikedHandler(index)}
    />
  ))

  // permet de trier les taches qui sont finies
  let donedTasksDisplayed = tasks.filter(task => task.done)
    .map((doneTask, index) => (
      <Task 
        key={index}
        done={doneTask.done}
        content={doneTask.content}
        removeClicked={() => removeClickedHandler(index)}
        doneClicked={() => doneClikedHandler(index)}
        //pencilClicked={() => changeClikedHandler(index)}
      />
    ))

  return (
    <div className={classes.App}>
      <header>
        <span>Todo list</span>
        <h1>by Olivier</h1>
      </header>

      <div className={classes.add}>
        <form onSubmit={(e) => submitFormHandler(e)}>
          <input 
            type="text" 
            value={input}
            ref={inputRef}
            onChange={(e) => changedFormHandler(e)}
            placeholder="Que souhaitez-vous ajouter ?" />
          <button type="submit">
            Ajouter
          </button>
        </form>
      </div>

      {tasksDisplayed}

    </div>
  );
}

export default App;
