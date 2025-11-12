const TextInput = (props) => {
  return (
    <div>
      <label>
        {props.name}
        <input
          {...props}
        />
      </label>
    </div>
  );
};
export default TextInput;
