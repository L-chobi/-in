// import "../style/index.css";
// import "../style/reset.css";
import { getLostPets, searchParams } from "../lostPets/getLostPets.js";
import { getMyPetBoard } from "../petStory/getPreview.js";
import { paintLostPetPreview, paintMyPetBoardPreview } from "./mainPreview.js";
import { myChart } from "./mainChart.js";

// 이미지 슬라이더
const SHOWING__CLASS = "showing";
const firstSlide = document.querySelector(".slider__item:first-child");
function slide() {
  const currentSilde = document.querySelector(`.${SHOWING__CLASS}`);
  if (currentSilde) {
    currentSilde.classList.remove(SHOWING__CLASS);
    const nextSlide = currentSilde.nextElementSibling;
    if (nextSlide) {
      nextSlide.classList.add(SHOWING__CLASS);
    } else {
      firstSlide.classList.add(SHOWING__CLASS);
    }
  } else {
    firstSlide.classList.add(SHOWING__CLASS);
  }
}

slide();
setInterval(slide, 2000);

// 통계
myChart;

// 보호 게시판 미리보기
let [lostPetList, totalCount] = await getLostPets({
  ...searchParams,
  numOfRows: 6,
});
let myPetBoardList = await getMyPetBoard();

paintLostPetPreview(lostPetList);
paintMyPetBoardPreview(myPetBoardList);
