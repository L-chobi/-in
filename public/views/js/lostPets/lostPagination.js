import { getLostPets, searchParams } from "./getLostPets.js";
import { paintLostPets } from "./lostPets.js";

const setPagination = (totalCount, perPage) => {
  let firstPage = 1;
  let selectedPage = firstPage;
  let lastPage = Math.ceil(totalCount / perPage);
  const pageContainer = document.querySelector(".lost .pagination");

  // 페이지 버튼 생성
  const createPageBtns = (container, firstPage) => {
    container.innerHTML = "";
    let pageBtns = `<div class="prev-btn page-btn"><</div>`;
    for (let i = firstPage; i < firstPage + perPage; i++) {
      if (i > lastPage) break;
      if (i === selectedPage) {
        pageBtns += `<div class="page-btn active">${i}</div>`;
      } else {
        pageBtns += `<div class="page-btn">${i}</div>`;
      }
    }
    pageBtns += `<div class="next-btn page-btn">></div>`;
    pageContainer.innerHTML += pageBtns;
  };

  createPageBtns(pageContainer, firstPage);

  // 페이지 보여주기
  const showPageResult = async (page) => {
    let [lostPetList, totalCount] = await getLostPets({
      ...searchParams,
      pageNo: page,
    });
    paintLostPets(lostPetList);
  };

  // 버튼에 이벤트 리스너 등록
  pageContainer.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.innerText === "<") {
      if (firstPage > 1) {
        firstPage -= perPage;
        selectedPage = firstPage;
        createPageBtns(pageContainer, selectedPage);
        showPageResult(selectedPage);
      }
    } else if (e.target.innerText === ">") {
      if (firstPage <= lastPage - perPage) {
        firstPage += perPage;
        selectedPage = firstPage;
        createPageBtns(pageContainer, selectedPage);
        showPageResult(selectedPage);
      }
    } else {
      const activeBtn = document.querySelector(".pagination .active");
      activeBtn.classList.remove("active");
      selectedPage = Number(e.target.innerText);
      e.target.classList.add("active");
      showPageResult(selectedPage);
    }
  });
};

export { setPagination };
