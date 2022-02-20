import { getLostPets, searchParams } from "./getLostPets.js";
import { paintLostPets } from "./lostPets.js";
import { paintSearchForm } from "./searchForm.js";
import { setPagination } from "./lostPagination.js";

let [lostPetList, totalCount] = await getLostPets(searchParams);

if (location.pathname === "/lostPets") {
  paintSearchForm();
  paintLostPets(lostPetList);
  setPagination(totalCount, searchParams.numOfRows);

  const showSearchResult = async () => {
    searchParams.upr_cd = document.querySelector("#sido").value;
    searchParams.org_cd = document.querySelector("#sigungu").value;
    searchParams.upkind = document.querySelector("#upkind").value;
    searchParams.state = document.querySelector("#state").value;
    searchParams.bgnde = document.querySelector("#beginDate").value;
    searchParams.endde = document.querySelector("#endDate").value;

    let [lostPetList, totalCount] = await getLostPets(searchParams);
    if (lostPetList === undefined || totalCount === 0) {
      const lostContent = document.querySelector(".lost-content");
      lostContent.innerHTML = `<div class="no-result">검색 결과가 없습니다.</div>`;
      const pagination = document.querySelector(".lost .pagination");
      pagination.innerHTML = "";
    } else {
      paintLostPets(lostPetList);
      setPagination(totalCount, searchParams.numOfRows);
    }
  };

  const searchBtn = document.querySelector(".lost-search .search-btn");
  searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    showSearchResult();
  });
}

export { lostPetList };
