// 내 댓글 조회하기

function makeComments() {
	// 각 컨텐츠 칸을 이루는 HTML 구조

	const data = user.comments;
	const displayTag = document.querySelector(".myComments__list");
	const pagesTag = document.querySelector("#myComments > .pagination");
	const elementName = "article";
	const elementClass = "content";
	const rows = 5;
	const makeHTML = (data) => {
		const { parentPost, content, timestamps } = data;
		return `<form class = "content__info">
					<a href=${parentPost} class="content__info__link">
						<p class="content__info__comment">${content}</p>
						<p class="content__info__post">${timestamps}</p>
					</a>
					<div class="deleteBox">
						<button class="btn">삭제</button>
					</div>
				</form>
				<div class="content__seperator">
					<div class="content__seperator__line">
				</div>`;
	};

	pagination(
		data,
		rows,
		displayTag,
		elementName,
		elementClass,
		makeHTML,
		pagesTag
	);

	// 댓글을 지울 시, 거기에 달린 대댓글은
	// 1. 같이 지운다. 2. 대댓글은 남기고, 지워진 댓글은 "지워진 댓글입니다" 표시 ?

	const deleteBtns = document.querySelectorAll(".deleteBox > .btn");
	deleteBtns.forEach((btn) => {
		btn.addEventListener("click", function (e) {
			e.preventDefault();
			// const ele = this.parentElement.parentElement;
			// const id = ele.querySelector(".content__info__post");
			// console.log(user.comments.indexOf(id.innerText));
			const ele = this.parentElement.parentElement.parentElement;
			if (confirm("댓글을 지우시겠어요?")) displayTag.removeChild(ele);
		});
	});
}

makeComments();
