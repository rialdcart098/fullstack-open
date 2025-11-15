const TextInput = ({ type, value, name, setValue }) => {
  return (
    <div>
      <label>
        {name}
        <input
          type={type}
          value={value}
          name={name}
          onChange={({ target }) => setValue(target.value)}
        />
      </label>
    </div>
  )
}
export default TextInput