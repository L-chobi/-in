import { commentPagination } from "./commentPagination.js";

const myComments = async () => {
  const response = await fetch(`/api/user-detail`);
  const user = await response.json();
  commentsTemplate(user);
};

const commentsTemplate = (user) => {
  const data = user.comments.reverse();
  const displayTag = document.querySelector("#myComments > .contents");
  const pagesTag = document.querySelector(".myComment__pages ul");
  const elementName = "article";
  const elementClass = "content";
  const rows = 5;
  const pageCut = 10;
  const makeHTML = (data) => {
    const { parentPost, content, createdAt, _id } = data;
    const time = `${createdAt.split("-")[0]}년 ${
      createdAt.split("-")[1]
    }월 ${createdAt.split("-")[2].substr(0, 2)}일`;
    return `<form class = "content__info">
					<a href=/myPetBoard/${parentPost} class="content__info__link">
						<p class="content__info__content">${content}</p>
						<p class="content__info__regdate">작성일: ${time}</p>
					</a>
					<div class="deleteBox">
						<button class="btn" data-comment-id="${_id}">삭제</button>
					</div>
				</form>`;
  };

  commentPagination(
    data,
    rows,
    displayTag,
    elementName,
    elementClass,
    makeHTML,
    pagesTag,
    pageCut
  );
};

export { myComments };
