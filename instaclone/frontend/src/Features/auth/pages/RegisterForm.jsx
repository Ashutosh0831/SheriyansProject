import "../style/form.scss"
import { Link } from "react-router";

const registerForm = () => {

  function handleForm(e) {
    e.PreventDefault();
  }

  return (
    <>
      <main>
        <div className="form-content">
          <h1>Register</h1>
          <form onSubmit={handleForm} className="form">
            <input type="text" className="name" placeholder="Full Name"/>
            <input type="text" className="username" placeholder="username" required/>
            <input type="email" className="email" placeholder="abcd@gmail.com"/>
            <input type="password" className="password" required/>
            <button>Register</button>
            <p>Already account ?<Link className="togle-btn" to ="/login">Login</Link></p>
          </form>
        </div>
      </main>
    </>
  );
};

export default registerForm;
