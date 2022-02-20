import { getTime } from "../utils.js";

const myPage = async () => {
  const response = await fetch("/api/user-detail");
  const user = await response.json();
  myPageTemplate(user);
};

function myPageTemplate(user) {
  const tabList = document.querySelectorAll(".myPage__select .list a");
  const contents = document.querySelectorAll(".myPage__select__content");
  const email = document.querySelector(".myPage__profile__email");
  const nickname = document.querySelector(".myPage__profile__nickname");
  const createdAt = document.querySelector(".myPage__profile__createdAt");

  email.innerHTML = user.email;
  nickname.innerHTML = user.nickname;

  const parsedTime = getTime(user.createdAt);

  const { year, month, date } = parsedTime;

  createdAt.innerHTML = `가입일 ${year}년 ${month}월 ${date}일`;

  let activeContent = "";

  for (let i = 0; i < tabList.length; i++) {
    tabList[i].addEventListener("click", (e) => {
      e.preventDefault();
      for (let j = 0; j < tabList.length; j++) {
        tabList[j].classList.remove("is__on");
        contents[j].style.display = "none";
      }
      e.target.classList.add("is__on");
      activeContent = e.target.getAttribute("href");
      document.querySelector(activeContent).style.display = "flex";
    });
  }
}

export { myPage };
