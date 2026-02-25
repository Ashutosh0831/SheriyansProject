import "../style/form.scss"
import { Link } from "react-router";

const loginForm = () => {
  function handleForm(e) {
    e.PreventDefault();
  }
  return (
    <>
      <main>
        <div className="form-content">
          <h1>Login</h1>
          <form onSubmit={handleForm} className="form">
            <label htmlFor="username">Username/Email</label>
            <input type="text" className="username" />
            <label htmlFor="password"></label>
            <input type="password" className="password" />
            <button>Login</button>
            <p>Register yourself ? <Link className="togle-btn" to="/register">Register</Link> </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default loginForm;
