import { useState } from "react"

const CreatePost = () => {

  const [caption, setCaption] = useState()
  return (
    <>
    <div className="post-container">
        <form >
          <label htmlFor="media">+</label>
          <input type="file" id="media" />
          <label htmlFor="caption"></label>
        </form>
    </div>
    
    </>
  )
}

export default CreatePost
