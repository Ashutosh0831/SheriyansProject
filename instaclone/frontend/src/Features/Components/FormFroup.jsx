const FormFroup = ({ label, type, value, onChange, placeholder }) => {
  return (
    <>
      <div className="form-group">
        <label htmlFor={label}>{label}</label>
        <input
          type={type}
          id={label}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default FormFroup;
