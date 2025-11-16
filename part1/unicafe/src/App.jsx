import { useState } from 'react'

const Button = ({ onClick, txt }) => <button onClick={onClick}>{txt}</button>

const Stat = ({text, value}) =>
  <tr>
    <td>{text}</td>
    <td>{value}</td>
  </tr>

const Statistics = ({good, bad, neutral}) => {
  if (good + bad + neutral > 0){
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
          <Stat text="good" value={good} />
          <Stat text="neutral" value={neutral} />
          <Stat text="bad" value={bad} />
          <Stat text="total" value={good + bad + neutral} />
          <Stat text="average" value={(good - bad) / (good + bad + neutral)} />
          <Stat text="positive" value={((good / (good + bad + neutral)) * 100) + '%'} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={() => { setGood(good + 1)}} txt="good" />
      <Button onClick={() => { setNeutral(neutral + 1 )}} txt="neutral" />
      <Button onClick={() => { setBad(bad + 1)}} txt="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App