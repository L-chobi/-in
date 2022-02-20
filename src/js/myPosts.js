const makeMyPosts = () => {
  const mainContent = document.querySelector(".main-content__section");

  let contentList = [];

  for (let i = 0; i < 12; i++) {
    contentList.push(`
        <article class="main-content__article">
            <a href="./myPage.html">
                <div class="main-content__wrap">
                    <div class="main-content__img">
                        <img src="https://via.placeholder.com/200x250/B2B2B2/FFFFFF/?text=NO%20Image"
                            alt="">
                    </div>
                    <div class="main-content__info">
                        <p class="main-content__title">산책하고 와서 개기절</p>
                        <span class="main-content__author">작성자</span>
                        <div class="main-content__cnt">
                            <span>조회수</span>
                            <span>10</span>
                        </div>
                    </div>
                </div>
            </a>
        </article>
    `);
  }

  mainContent.innerHTML = contentList.join("");
};

makeMyPosts();
