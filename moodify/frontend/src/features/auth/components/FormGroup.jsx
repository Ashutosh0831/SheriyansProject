
const FormGroup = ({label, value, onChange, placeholder, type}) => {
  return (
    <>
    <div className="form-container">
        <label htmlFor={label}>{label}</label>
        <input type={type} 
        value = {value}
        onChange={onChange}
        id={label}
        name={label}
        placeholder={placeholder}/>
    </div>
    </>
  )
}

export default FormGroup
