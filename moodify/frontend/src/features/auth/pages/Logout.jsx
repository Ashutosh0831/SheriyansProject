import { useNavigate } from "react-router"
import "../css/Extra.scss"
import "../../shared/style/button.scss"


const Logout = () => {

    const navigate = useNavigate()

    function nextPage(){
      navigate("/")
    }
  return (
    <>
    <div className="logout-container">
        <h3>HEY THANK YOU FOR VISITING HERE I HOPE YOU LIKED THE SONGS MAY VISIT AGAIN!</h3>
        <button onClick={nextPage}>BACK TO HOME</button>
    </div>
    </>
  )
}

export default Logout
