import "./TabLecture.css";

export const SearchTab = () => {
  return (
    <>
      <div className="search-tab">
        <input
          type="text"
          name="input-lecture"
          placeholder="Enter lecture name"
        />
        <button className="btn btn-dark rounded-0">Search</button>
      </div>
      <h3 className="fw-bold text-center">Start a new search</h3>
    </>
  );
};

export const YourComment = () => {
  return (
    <>
      <div className="comment-tab">
        <input
          type="text"
          name="input-lecture"
          placeholder="Enter your comment"
        />
        <button className="btn btn-dark rounded-0">Post your comment</button>
      </div>
      <h3 className="fw-bold text-center">Start a new comment</h3>
    </>
  );
};

export const Reviews = () => {
  return (
    <>
      <div className="reviews-tab d-lg-flex">
        <div className="img-review">
          <img
            src="https://img-c.udemycdn.com/user/50x50/171026746_85fc_2.jpg"
            alt="avt-user-review"
          />
        </div>
        <div className="review-info">
          <h6 className="review-username">Trâm Lê</h6>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta nisi
            minus eos, dignissimos qui recusandae!
          </p>
        </div>
      </div>
    </>
  );
};
