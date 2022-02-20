const commentPagination = () => {
  const commentPaginationUl = document.createElement("ul");
  commentPaginationUl.classList.add("list-paginator");

  let commentPaginationTemplate = `
    <li>
        <button type="button" class="list-paginator__pageBtn selected">1</button>
    </li>
    <li>
        <button type="button" class="list-paginator__pageBtn">2</button>
    </li>
  `;
  commentPaginationUl.innerHTML = commentPaginationTemplate;
  document.querySelector(".comment-feed").appendChild(commentPaginationUl);
};

export { commentPagination };
