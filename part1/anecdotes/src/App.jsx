import { useState } from 'react'

const Button = ({text, onClick}) => <button onClick={onClick}>{text}</button>

let votes = new Array(7).fill(0)

const App = () => {
    const anecdotes = [
        'If it hurts, do it more often.',
        'Adding manpower to a late software project makes it later!',
        'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
        'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
        'Premature optimization is the root of all evil.',
        'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
        'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
        'The only way to go fast, is to go well.'
    ]
    const [selected, setSelected] = useState(0)
    const copy = [...votes]
    const maxIndex = copy.indexOf(Math.max(...copy))
    
    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{anecdotes[selected]}</p>
            <p>has {copy[selected]} votes</p>
            <Button onClick={() => {setSelected(Math.floor(Math.random() * 7))}} text='next anecdote' />
            <Button onClick={() => votes[selected]++} text='vote' />

            <h1>Anecdote with most votes</h1>
            <p>{anecdotes[maxIndex]}</p>
            <p>has {copy[maxIndex]} votes</p>

        </div>
    )
}

export default App