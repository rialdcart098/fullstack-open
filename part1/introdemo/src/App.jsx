import { useState } from 'react'

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>


const App = () => {
  const [value, setValue] = useState(10)

  const handleClick = (what) => {
    setValue(what)
  }

  return (
    <div>
      {value}
      <Button onClick={() => handleClick(1000)} text='thousand' />
      <Button onClick={() => handleClick(0)} text='zero' />
      <Button onClick={() => handleClick(value + 1)} text='plus' />
    </div>
  )
}

export default App