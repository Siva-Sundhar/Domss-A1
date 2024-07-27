const InputField = ({name, label, onChange, onKeyDown}) => {
  return (
    <div>
        <label htmlFor={name}>{label}</label>
        <input type="text" name={name} onChange={onChange} onKeyDown={onKeyDown}
        />
    </div>
  )
}
export default InputField