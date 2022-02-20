const createBackBtn = () => {
  const btnContainer = document.querySelector(".lost-detail__btn-container");
  const btnTemplate = `
    <a href="/lostPets">
      <button class="btn back-to-list-btn">목록으로</button>
    </a>
  `;
  btnContainer.innerHTML = btnTemplate;
};

export { createBackBtn };
