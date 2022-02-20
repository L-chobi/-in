const createLostPetItem = (item) => {
  const {
    age,
    desertionNo,
    happenDt,
    kindCd,
    orgNm,
    popfile,
    processState,
    sexCd,
    specialMark,
    weight,
  } = item;

  const lostPetTemplate = `
    <article class="lost-content__item">
      <a href="/lostPets/${desertionNo}">
        <div class="lost-content__img-container">
          <img
            class="lost-content__img"
            src="${popfile}"
          />
        </div>
        <div class="lost-content__info">
          <div class="lost-content__kind-sex">
            <span>${kindCd} / ${sexCd}</span>
          </div>
          <div class="lost-content__age-weight">
            <span>${age} / ${weight}</span>
          </div>
          <div class="lost-content__date">
            <span>${happenDt} 접수</span>
          </div>
          <div class="lost-content__place">
            <span>${orgNm}</span>
          </div>
          <div class="lost-content__special">
            <span>${specialMark}</span>
          </div>
          <div class="lost-content__state"><span>${processState}</span></div>
        </div>
      </a>
    </article>
`;

  return lostPetTemplate;
};

const paintLostPets = (lostPetList) => {
  if (lostPetList === undefined) return;
  const lostPetItems = lostPetList.map(createLostPetItem);
  document.querySelector(".lost-content").innerHTML = lostPetItems.join("");
};

export { paintLostPets };
