const createLostPetPreview = (item) => {
  const {
    desertionNo, popfile, kindCd, sexCd,
  } = item;

  const lostPetPreviewTemplate = `
        <div class="board__content">
          <a href="/lostPets/${desertionNo}">
            <img
                class="board__img"
                src="${popfile}"
                alt=""
            />
            <h4 class="content__title">${kindCd} / ${sexCd}</h4>
          </a>
        </div>
  `;

  return lostPetPreviewTemplate;
};

const createMyPetBoardPreview = (item) => {
  const { _id, title, thumbnail } = item;

  const lostPetPreviewTemplate = `
        <div class="board__content">
          <a href="/myPetBoard/${_id}">
            <img
                class="board__img"
                src="${thumbnail || 'https://via.placeholder.com/200x250/B2B2B2/FFFFFF/?text=NO%20Image'}"
                alt=""
            />
            <h4 class="content__title">${title}</h4>
          </a>
        </div>
  `;

  return lostPetPreviewTemplate;
};

const paintLostPetPreview = (lostPetList) => {
  const lostPetItems = lostPetList.map(createLostPetPreview);
  const lostBoardContent = document.querySelector(
    '.board__save .board__contentsBox',
  );
  lostBoardContent.innerHTML = lostPetItems.join('');
};

const paintMyPetBoardPreview = (previewAry) => {
  const petBoardItems = previewAry.map(createMyPetBoardPreview);
  const myPetBoardContent = document.querySelector(
    '.board__story .board__contentsBox',
  );
  myPetBoardContent.innerHTML = petBoardItems.join('');
};

export { paintLostPetPreview, paintMyPetBoardPreview };
