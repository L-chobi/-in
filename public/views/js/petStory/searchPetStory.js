const searchPetStory = () => {
  const searchBtn = document.querySelector(".search__button");
  const selectBox = document.querySelector(".main__select");

  searchBtn.addEventListener("click", (e) => {
    let selected = selectBox.options[selectBox.selectedIndex].value;
    let inputValue = document.querySelector(".search__input").value;
    const url =
      window.location.protocol +
      "//" +
      window.location.host +
      window.location.pathname +
      `?${selected}=${inputValue}`;

    location.href = url;
    document.querySelector(".main__search-form").reset();
  });
};

searchPetStory();
