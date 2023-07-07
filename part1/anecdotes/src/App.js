import { useState } from 'react'

const random_anecdote = function (size, selected, setSelected) {
  while (true) {
    let anecdote = Math.floor(Math.random() * size)
    if (selected !== anecdote) {
      setSelected(anecdote)
      break
    }
  }
}

const Best = (props) => {
    let max = 0
    let max_index = 0
    for (let i=0; i < props.anecdotes.length; i++){
        if (props.votes_array[i] > max){
            max = props.votes_array[i]
            max_index = i
        }
    }
    return (
        <>
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[max_index]}</p>
            <p>has {props.votes_array[max_index]} votes</p>
        </>
    )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  const [selected, setSelected] = useState(0)
  const [votes_array, setVotes] = useState(Array(anecdotes.length).fill(0))

  return (
    <>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes_array[selected]} votes</p>
      <button onClick={() => {
          setVotes(votes_array.map((votes, index) => {
              if (index === selected) return votes + 1
              else return votes
          }))
      }}>
        vote
      </button>
      <button onClick={() => random_anecdote(anecdotes.length, selected, setSelected)}>
        next anecdote
      </button>
      <Best anecdotes={anecdotes} votes_array={votes_array}/>
    </>
  )
}

export default App