

const PostData = ({media, caption}) => {
  return (
    <>
      <div className="post-box">
        <form>
          <label htmlFor="media">{media}</label>
          <input type="file" id="media" />
          <label htmlFor="caption">{caption}</label>
          <input type="text" id="caption" placeholder="caption" />
        </form>
      </div>
    </>
  );
};

export default PostData;
