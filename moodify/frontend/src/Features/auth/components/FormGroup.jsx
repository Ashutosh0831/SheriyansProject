// import "../Global/css/Form.css"
import "../shared/css/Form.css";

const FormGroup = ({ label, placeholder, value, type, onChange }) => {
  return (
    <>
          <div className="form-container">
          <label htmlFor={label}>{label}</label>
          <input
            type={type}
            value={value}
            onChange={onChange}
            name={label}
            id={label}
            placeholder={placeholder}
          />
        </div>
    </>
  );
};

export default FormGroup;
