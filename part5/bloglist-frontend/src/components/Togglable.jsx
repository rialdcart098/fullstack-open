const Togglable = (props) => {
  const hideWhenVisible = { display: props.visible ? 'none' : '' }
  const showWhenVisible = { display: props.visible ? '' : 'none' }
  return (
    <div className={props.visible ? 'togglableVisible' : 'togglableHidden'}>
      <div style={hideWhenVisible}>
        <button onClick={props.toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={props.toggleVisibility}>close</button>
      </div>
    </div>
  )
}
export default Togglable