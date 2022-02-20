const apiPostComment = async (commentValue) => {
  const response = await fetch(
    `/api/${location.pathname.split("/")[2]}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({
        content: commentValue,
      }),
    }
  );

  if (response.status === 201) {
    return true;
  } else {
    alert("댓글 작성에 실패했습니다.");
    return false;
  }
};

const apiPostReComment = async (commentId, wroteReComment) => {
  const response = await fetch(`/api/${commentId}/recomments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      content: wroteReComment,
    }),
  });

  if (response.status === 201) {
    return true;
  } else {
    alert("댓글 작성에 실패했습니다.");
    return false;
  }
};

const apiUpdateComment = async (updateCommentValue, commentId) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      content: updateCommentValue,
    }),
  });

  if (response.status === 200) {
    return true;
  } else {
    alert("댓글 수정에 실패했습니다.");
    return false;
  }
};

const apiDeleteComment = async (commentId) => {
  const response = await fetch(`/api/comments/${commentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status === 204) {
    return true;
  } else {
    alert("댓글 삭제에 실패했습니다.");
    return false;
  }
};

const apiReCommentDeleteComment = async (recommentId) => {
  const response = await fetch(`/api/recomments/${recommentId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
  });

  if (response.status === 204) {
    return true;
  } else {
    alert("댓글 삭제에 실패했습니다.");
    return false;
  }
};

const apiReUpdateComment = async (updateReCommentValue, reCommentId) => {
  const response = await fetch(`/api/recomments/${reCommentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify({
      content: updateReCommentValue,
    }),
  });

  if (response.status === 200) {
    return true;
  } else {
    alert("댓글 수정에 실패했습니다.");
    return false;
  }
};

const handlePostComment = async () => {
  const submitCommentBtn = document.querySelector(".comment-feed__button");
  submitCommentBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const commentValue = document.querySelector(
      ".comment-feed__textarea"
    ).value;

    let success = apiPostComment(commentValue);
    if (success) {
      setTimeout(() => {
        location.reload();
      }, 500);
    }
  });
};

const clickCommentToolBox = () => {
  const commentUl = document.querySelector(".comment__list");

  commentUl.addEventListener("click", (e) => {
    document.querySelectorAll(".tool__box").forEach((el) => {
      el.classList.add("hidden");
    });

    if (e.target.classList.contains("tool")) {
      e.target.nextElementSibling.classList.toggle("hidden");
    }

    if (e.target.classList.contains("tool__update")) {
      e.preventDefault();
      document.querySelectorAll(".tool__box").forEach((el) => {
        el.classList.add("hidden");
      });
      let commentId = e.target.dataset.commentId;
      let copyParentHTML =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.children[0].innerHTML;
      let copyParentContent =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.children[0].children[1].innerText;
      let locationComment =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.children[0];
      let toolBox =
        e.target.parentElement.parentElement.parentElement.parentElement;
      toolBox.classList.add("hidden");

      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].classList.add(
        "display__hidden"
      );

      const div = document.createElement("div");
      div.classList.add("comment__box");
      div.innerHTML = `
        <div class="comment-feed__input">
          <div class="comment-feed__content">
            <textarea class="comment-feed__textarea" placeholder="댓글을 입력하세요">${copyParentContent}</textarea>
          </div>
          <div class="comment-feed__submit">
            <button class="comment-feed__button update__cancle" type="button">취소</button>
            <button class="comment-feed__button update__submit" type="button">등록</button>
          </div>
        </div>
      `;

      e.target.parentElement.parentElement.parentElement.parentElement.parentElement.prepend(
        div
      );

      document
        .querySelector(".update__submit")
        .addEventListener("click", (e) => {
          let updateCommentValue =
            e.target.parentElement.parentElement.children[0].children[0].value;
          let success = apiUpdateComment(updateCommentValue, commentId);
          if (success) {
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        });

      document
        .querySelector(".update__cancle")
        .addEventListener("click", (e) => {
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[1].classList.remove(
            "display__hidden"
          );
          e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].remove();
          toolBox.classList.remove("hidden");
        });
    }

    if (e.target.classList.contains("tool__delete")) {
      let commentId = e.target.dataset.commentId;

      if (confirm("댓글을 삭제하시겠습니까?")) {
        let success = apiDeleteComment(commentId);
        if (success) {
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      } else {
        document.querySelectorAll(".tool__box").forEach((el) => {
          el.classList.add("hidden");
        });
      }
    }

    if (e.target.classList.contains("tool__re--update")) {
      e.preventDefault();
      document.querySelectorAll(".tool__box").forEach((el) => {
        el.classList.add("hidden");
      });
      let reCommentId = e.target.dataset.commentId;
      let reCopyParentHTML =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.children[0].innerHTML;
      let reCopyParentContent =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.children[0].children[1].innerText;
      let reLocationComment =
        e.target.parentElement.parentElement.parentElement.parentElement
          .parentElement.children[0];
      let toolBox =
        e.target.parentElement.parentElement.parentElement.parentElement;

      toolBox.classList.add("hidden");
      reLocationComment.innerHTML = `
        <div class="comment-feed__input">
          <div class="comment-feed__content">
            <textarea class="comment-feed__textarea" placeholder="댓글을 입력하세요">${reCopyParentContent}</textarea>
          </div>
          <div class="comment-feed__submit">
            <button class="comment-feed__button update__cancle" type="button">취소</button>
            <button class="comment-feed__button update__submit" type="button">등록</button>
          </div>
        </div>
      `;

      document
        .querySelector(".update__submit")
        .addEventListener("click", (e) => {
          let updateReCommentValue =
            e.target.parentElement.parentElement.children[0].children[0].value;
          let success = apiReUpdateComment(updateReCommentValue, reCommentId);
          if (success) {
            setTimeout(() => {
              location.reload();
            }, 1000);
          }
        });

      document
        .querySelector(".update__cancle")
        .addEventListener("click", (e) => {
          reLocationComment.innerHTML = reCopyParentHTML;
          toolBox.classList.remove("hidden");
        });
    }

    if (e.target.classList.contains("tool__re-delete")) {
      let reCommentId = e.target.dataset.commentId;

      if (confirm("댓글을 삭제하시겠습니까?")) {
        let success = apiReCommentDeleteComment(reCommentId);
        if (success) {
          setTimeout(() => {
            location.reload();
          }, 1000);
        }
      } else {
        document.querySelectorAll(".tool__box").forEach((el) => {
          el.classList.add("hidden");
        });
      }
    }
  });
};

const handleRePostComment = () => {
  const reCommentLinks = document.querySelectorAll(".comment__link");

  reCommentLinks.forEach((reCommentLink) => {
    let flag = true;

    reCommentLink.addEventListener("click", (e) => {
      e.preventDefault();

      if (flag) {
        const li = document.createElement("li");
        li.classList.add("reComment__item");
        li.innerHTML = `
            <div class="comment-feed__input">
              <div class="comment-feed__content">
                <textarea class="comment-feed__textarea" placeholder="댓글을 입력하세요"></textarea>
              </div>
              <div class="comment-feed__submit">
                <button class="reComment-feed__button" type="button">등록</button>
              </div>
            </div>
          `;

        e.target.parentElement.parentElement.parentElement.children[1].children[0].append(
          li
        );
        flag = false;

        const submitReCommentBtn = document.querySelectorAll(
          ".reComment-feed__button"
        );
        submitReCommentBtn.forEach((submitReComment) => {
          submitReComment.addEventListener("click", async (e) => {
            let wroteReComment =
              e.target.parentElement.previousElementSibling.children[0].value;

            let success = apiPostReComment(
              reCommentLink.dataset.commentId,
              wroteReComment
            );

            if (success) {
              setTimeout(() => {
                location.reload();
              }, 1000);
            }
          });
        });
      }
    });
  });
};

const showHiddenBox = (loginInfo, isNotLogin) => {
  const commentTool = document.querySelectorAll(".comment__tool");
  commentTool.forEach((el) => {
    if (el.dataset.commentAuthorId === loginInfo._id) {
      el.classList.remove("hidden");
    }
  });

  const reCommentLink = document.querySelectorAll(".comment__link");
  if (!isNotLogin) {
    reCommentLink.forEach((el) => {
      el.classList.remove("hidden");
    });
  }

  const articleBottomBtn = document.querySelector(".detail-bottom__left");
  if (loginInfo._id === articleBottomBtn.dataset.authorId) {
    articleBottomBtn.classList.remove("hidden");
  }
};

export {
  handlePostComment,
  clickCommentToolBox,
  handleRePostComment,
  showHiddenBox,
};
