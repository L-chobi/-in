function renderLostPetContent() {
  const lostContent = document.querySelector(".lost-content");
  // 밑에 보시면 <a href="./lostPets/1"> 이렇게 되어있는데, 1은 임시 id값입니다. 빈 페이지로 넘겨드릴 예정이라
  // 해당 게시물의 id 값은 데이터를 받아오셔서 1 대신 넣으시면 라우터에서 /:id로 이동해서 마찬가지로 빈 페이지를 넘겨드릴 겁니다.
  for (let i = 0; i < 10; i++) {
    const content = `
      <article class="lost-content__item">
        <a href="./lostPets/1"> 
          <img
            class="lost-content__img"
            src="https://img.animalplanet.co.kr/news/2021/03/24/700/9919ots6h81rwz2u6609.jpg"
          />
          <div class="lost-content__info">
            <div class="lost-content__kind-sex">
              <span>[개] 믹스견 / 여</span>
            </div>
            <div class="lost-content__age-weight">
              <span>2020(년생) (살) / 4.5(Kg)</span>
            </div>
            <div class="lost-content__date">
              <span>2021년 12월 16일</span>
            </div>
            <div class="lost-content__place">
              <span>경상남도 남해군</span>
            </div>
            <div class="lost-content__special">
              <span>경계심이 있음. 온순함</span>
            </div>
            <div class="lost-content__state"><span>보호중</span></div>
          </div>
        </a>
      </article>
  `;
    lostContent.innerHTML += content;
  }
}

renderLostPetContent();
