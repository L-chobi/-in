const mainTag = () => {
  const main = document.createElement("main");

  let mainTemplate = `
        <article class="mypet-datail__container">
            <section class="mypet-datail__content">
            </section>
        </article>
    `;

  main.innerHTML = mainTemplate;
  document.querySelector("#wrap").appendChild(main);
};

export { mainTag };
