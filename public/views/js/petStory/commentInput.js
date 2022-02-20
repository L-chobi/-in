const commentInput = (isNotLogin) => {
  const commentInputForm = document.createElement("form");

  if (isNotLogin)
    commentInputForm.classList.add("comment-feed__form", "display__hidden");
  else commentInputForm.classList.add("comment-feed__form");

  let commentInputTemplate = `
      <div class="comment-feed__input">
          <div class="comment-feed__content">
              <textarea class="comment-feed__textarea" placeholder="댓글을 입력하세요"></textarea>
          </div>
          <div class="comment-feed__submit">
              <button class="comment-feed__button" type="submit">등록</button>
          </div>
      </div>
  `;
  commentInputForm.innerHTML = commentInputTemplate;
  document.querySelector(".comment-feed").appendChild(commentInputForm);
};

export { commentInput };
