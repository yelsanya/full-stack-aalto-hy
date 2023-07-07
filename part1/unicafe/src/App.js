import { useState } from 'react'

const Button = (props) => {
  return (
      <button onClick={() => props.option.setCounter(props.option.counter + 1)}>
        {props.option.name}
      </button>
  )
}

const Menu = (props) => {
  return (
      <>
        <h1>give feedback</h1>
        <Button option={props.feedback[0]}/>
        <Button option={props.feedback[1]}/>
        <Button option={props.feedback[2]}/>
      </>
  )
}

const StatisticLine = (props) => {
  return (
      <tr>
          <td>{props.name}</td>
          <td>{props.counter}</td>
      </tr>
  )
}

const Statistics = (props) => {
    const feedback_count = props.feedback[0].counter + props.feedback[1].counter + props.feedback[2].counter
    let average = 0
    let positive = 0
    if (feedback_count === 0) {
        return (
            <p>No feedback given</p>
        )
    }
    else {
        average = (props.feedback[0].counter - props.feedback[2].counter)/feedback_count
        positive = props.feedback[0].counter*100/feedback_count
    }
    let positive_str = positive + " %"
    return (
        <>
            <h1>statistics</h1>
            <table>
                <StatisticLine name={props.feedback[0].name} counter={props.feedback[0].counter}/>
                <StatisticLine name={props.feedback[1].name} counter={props.feedback[1].counter}/>
                <StatisticLine name={props.feedback[2].name} counter={props.feedback[2].counter}/>
                <StatisticLine name="all" counter={feedback_count}/>
                <StatisticLine name="average" counter={average}/>
                <StatisticLine name="positive" counter={positive_str}/>
            </table>

        </>
    )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const feedback = [
      {
        name: "good",
        counter: good,
        setCounter: setGood
      },
      {
        name: "neutral",
        counter: neutral,
        setCounter: setNeutral
      },
      {
        name: "bad",
        counter: bad,
        setCounter: setBad
      }
    ]
  return (
    <>
      <Menu feedback={feedback}/>
      <Statistics feedback={feedback}/>
    </>
  )
}

export default App