const TextInput = (props) => {
  return (
    <div>
      <label>
        <input {...props} placeholder={props.name} />
      </label>
    </div>
  );
};
export default TextInput;
