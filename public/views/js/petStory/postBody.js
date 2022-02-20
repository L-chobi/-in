import { getTime } from "../utils.js";

const postBody = (result) => {
  const parsedTime = getTime(result.createdAt);
  const { year, month, date } = parsedTime;
  const time = `${year}년 ${month}월 ${date}일`;

  const postHeader = document.createElement("header");
  const postSection = document.createElement("section");

  postHeader.classList.add("mypet-datail__header");
  postSection.classList.add("mypet-datail__body");
  const postHeaderTemplate = `
        <div class="mypet-datail__title">
            <h1>${result.title}</h1>
        </div>
        <div class="mypet-datail__profile">
            <div class="profile__info">
                <span>작성자: <span>${result.author.nickname}</span></span>
                <span>${time}</span>
            </div>
            <div>
                <span>조회수 : <span>${result.views}</span></span>
            </div>
        </div>
    `;

  const postSectionTemplate = `${result.content}`;

  postHeader.innerHTML = postHeaderTemplate;
  postSection.innerHTML = postSectionTemplate;

  document.querySelector(".mypet-datail__content").appendChild(postHeader);
  document.querySelector(".mypet-datail__content").appendChild(postSection);
};

export { postBody };
