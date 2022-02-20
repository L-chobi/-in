const makeComments = () => {
  const mainContent = document.querySelector(".comments__list");

  let contentList = [];
  const comment = "댓글 내용입니다.";
  const author = "작성자";
  const postLink = "#";
  const postTitle = "글 제목";
  for (let i = 0; i < 10; i++) {
    contentList.push(`
        <article class="content">
            <a href=${postLink}>
                <div class = "content__info">
                    <p class="content__info__comment">${comment}</p>
                    <p class="content__info__date">${author}</p>
                    <p class="content__info__post">${postTitle}</p>
                </div>
            </a>
            <button id = "deleteComment" class="btn">삭제</button>
        </article>
        <div class="content__seperator">
        <div class="content__seperator__line"></div>
        </div>
    `);
  }

  mainContent.innerHTML = contentList.join("");
};

makeComments();
