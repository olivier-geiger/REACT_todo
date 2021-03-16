import React, { useState } from 'react';
import classes from './App.module.css'
import Task from '../../Components/Task/Task'

function App() {
  //----------- STATES -----------
  // les taches en dures avec les hooks en utilisant useState
  const [tasks, setTasks] = useState([
    // on défini done à true ou false pour dire si une tache est faite on pas
    {content: 'Continuer React', done: false},
    {content: 'Voir Redux', done: false},
    {content: 'Voir Next', done: false},
    {content: 'Voir Node', done: false},
    {content: 'Apprendre JS', done: true},
  ])
  // la valeur de l'input avec les hooks en utilisant useState
  const [input, setInput] = useState('')

  //----------- FONCTIONS -----------
  // suppression d'une tache par son index
  const removeClickedHandler = index => {
    // on fait une copie de la tache en destructuring
    const newTasks = [...tasks]
    // on utilise splice pour dire quelle tache on supprime à quel index est le chiffre 1 pour dire une tache
    newTasks.splice(index, 1)
    // on met à jour la tache
    setTasks(newTasks)
  }

  // pour dé-checker si un tache est faite
  const doneClikedHandler = index => {
    // on fait une copie de la tache en destructuring
    const newTasks = [...tasks]
    // on cherche la tache done par index et on lui donne le contraire en valeur
    newTasks[index].done = !tasks[index].done
    // on met à jour la tache
    setTasks(newTasks)
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
