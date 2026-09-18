import { useAuth } from "../../auth/hooks/useAuth";
import { useNavigate } from "react-router";
import "../style/extra.scss";

const Header = () => {
  const navigate = useNavigate();
  const { user, handleLogout } = useAuth();

  const displayName = user?.name || user?.username || "Guest";

  const isName = user?.name

  let btn = ""
  let btn1 = "Login"

  if(isName){
    btn = "Logout"
    btn1 = ""
  }

  async function loginPage(){
    navigate("/login")
  }

  async function nextPage() {
    await handleLogout();
    navigate("/logout");
  }

  return (
    <>
      <div className="header">
        <h3>Moodify Player</h3>
        <div className="user-container">
          <div className="user">
            <img
              src="https://cdn-icons-png.flaticon.com/512/32/32382.png"
              alt="user"
            />
            <h5>{displayName}</h5>
          </div>
          <div className="log">
            <button onClick={nextPage}>{btn}</button>
            <button onClick={loginPage}>{btn1}</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
