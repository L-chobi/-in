// 페이지네이션
// 매개변수 :
// 처리할 data, 처리할 열 갯수, 화면 적용할 Tag,
// Tag 내부의 element, element의 class, element.innerHTML, pagination할 Tag

const pagination = (
	data,
	rows,
	displayTag,
	elementName,
	className,
	makeHTML,
	pageTag,
	pageCut
) => {
	let currentPage = 1;
	const totalPage = Math.ceil(data.length / rows);
	let pageGroup = Math.ceil(currentPage / pageCut);
	let last = pageGroup * pageCut;
	let first = last <= pageCut ? 1 : last - pageCut;
	last = last > totalPage ? totalPage : last;

	// 요청하는 페이지의 컨텐츠를 화면에 표시

	function displayList(items, wrapper, rows_per_page, page) {
		wrapper.innerHTML = "";
		page--;

		const start = rows_per_page * page;
		const end = start + rows_per_page;
		const paginatedItems = items.slice(start, end);

		paginatedItems.map((obj) => {
			const element = document.createElement(elementName);
			element.classList.add(className);
			element.innerHTML = makeHTML(obj);
			wrapper.appendChild(element);
		});
	}

	// 요청된 페이지 생성

	const prev = document.createElement("li");
	prev.classList.add("prev");
	prev.innerHTML = "&laquo";
	const next = document.createElement("li");
	prev.classList.add("next");
	next.innerHTML = "&raquo";

	function setupPagination(start, end, wrapper) {
		wrapper.innerHTML = "";
		wrapper.appendChild(prev);
		for (let i = start; i <= end; i++) {
			const btn = paginationButton(i);
			wrapper.appendChild(btn);
		}
		wrapper.appendChild(next);
	}

	// 버튼 생성

	function paginationButton(page) {
		const li = document.createElement("li");
		li.innerHTML = page;

		li.addEventListener("click", function (e) {
			if (currentPage === page) li.classList.add("active");
			currentPage = page;
			displayList(data, displayTag, rows, currentPage);
			const current_btn = document.querySelector(".pagination li.active");
			current_btn.classList.remove("active");
			li.classList.add("active");
		});
		return li;
	}

	prev.addEventListener("click", () => {
		first = first - pageCut < 1 ? 1 : first - pageCut;
		last =
			last - pageCut < 1
				? last
				: last % pageCut !== 0
				? first + pageCut
				: last - pageCut;
		currentPage = first;
		displayList(data, displayTag, rows, currentPage);
		setupPagination(first, last, pageTag);
		// }
	});

	next.addEventListener("click", () => {
		last = last + pageCut > totalPage ? totalPage : last + pageCut;
		first = first + pageCut > totalPage ? first : first + pageCut;
		currentPage = first;
		displayList(data, displayTag, rows, currentPage);
		setupPagination(first, last, pageTag);
	});

	displayList(data, displayTag, rows, currentPage);
	setupPagination(first, last, pageTag);
};

export { pagination };
