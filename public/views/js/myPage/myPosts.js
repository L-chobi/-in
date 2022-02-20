import { postPagination } from "./postPagination.js";

const myPosts = async () => {
	const response = await fetch(`/api/user-detail`);
	const user = await response.json();
	commentsTemplate(user);
};

const commentsTemplate = (user) => {
	const data = user.posts.reverse();
	const displayTag = document.querySelector("#myPosts > .contents");
	const pagesTag = document.querySelector(".myPosts__pages ul");
	const elementName = "article";
	const elementClass = "content";
	const rows = 5;
	const pageCut = 10;
	const makeHTML = (data) => {
		const { title, content, createdAt, _id } = data;
		const text = content.slice(3, content.length - 4);
		const time = `${createdAt.split("-")[0]}년 ${
			createdAt.split("-")[1]
		}월 ${createdAt.split("-")[2].substr(0, 2)}일`;

		return `<form class = "content__info">
					<a href=/myPetBoard/${_id} class="content__info__link">
            <p class="content__info__title"> ${title} </p>
						<p class="content__info__content"> ${text} </p>
						<p class="content__info__regdate">작성일: ${time}</p>
					</a>
				</form>`;
	};

	postPagination(
		data,
		rows,
		displayTag,
		elementName,
		elementClass,
		makeHTML,
		pagesTag,
		pageCut
	);
};

export { myPosts };
