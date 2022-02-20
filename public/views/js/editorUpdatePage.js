const postBtn = document.querySelector(".editor__content__submit");
const title = document.querySelector(".editor__options__title-input");

const imageUrls = []; // 나중에 이미지를 삭제할 때 비교할 비교용 배열
let deleteFileNames; // 다른 함수에서도 접근 가능하도록 전역 선언

const getImageUrl = async (formData) => {
  try {
    const response = await axios.post("/api/return-imageUrl", formData, {
      headers: {
        "Content-Type":
          "application/json; application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
    });

    return response;
  } catch (error) {
    console.log("이미지 URL을 가져오는데 실패했습니다");
  }
};

const imageHandler = () => {
  const input = document.createElement("input");

  input.setAttribute("type", "file");
  input.setAttribute("accept", "image/*");
  input.click();

  input.addEventListener("change", async () => {
    const file = input.files[0];

    // multer에 맞는 형식으로 데이터 생성
    const formData = new FormData();

    formData.append("img", file);

    // 이미지 url 요청
    const response = await getImageUrl(formData);

    const { url } = response.data;

    imageUrls.push(url); // 비교용 배열에 url 추가

    const range = quill.getSelection();

    quill.insertEmbed(range, "image", url);
  });
};

const editorOption = {
  placeholder: "내용을 입력해주세요.",
  theme: "snow",
  modules: {
    toolbar: {
      container: [
        [{ header: "1" }, { header: "2" }],
        [{ size: ["small", false, "large", "huge"] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }, { font: [] }, { align: [] }],
        ["image"],
      ],
      handlers: {
        image: imageHandler,
      },
    },
  },
};

const deleteTempFiles = async (deleteFileNames) => {
  const response = await axios({
    url: "/api/clear-images",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      deleteFileNames,
    },
  });
  return response;
};

const updatePost = async ({ titleText, content, thumbnail }) => {
  const postId = window.location.href.split("/writePage/")[1];
  const response = await axios({
    method: "PUT",
    url: `/api/posts/${postId}`,
    headers: {
      "Content-Type": "application/json",
    },
    data: {
      title: titleText,
      content,
      thumbnail,
    },
  });
  return response;
};

const quill = new Quill("#quill", editorOption);

const setDeleteFiles = (matches, flag) => {
  if (!flag) {
    // 삭제 대상 추출
    const notMatches = imageUrls.filter((url) => !matches.includes(url));

    // img 하위 경로 추출
    const deleteFiles = notMatches.map((url) => url.split("/ch/")[1]);

    return deleteFiles;
  }

  // flat === ture ? 전체 이미지 삭제
  const deleteFiles = imageUrls.map((url) => url.split("/ch/")[1]);

  return deleteFiles;
};

const getMathes = (content) => {
  // img 경로만 추출
  const pattern = /<img[^>]*src=[\"']?([^>\"']+)[\"']?[^>]*>/g;

  const matches = [];

  let temp = "";

  while ((temp = pattern.exec(content))) {
    matches.push(temp[1]);
  }

  return matches;
};

async function sendPost(e) {
  e.preventDefault();

  const content = quill.root.innerHTML; // 전체 글 내용/태그
  const contentValidate = "<p><br></p>"; // content 초기값

  const matches = getMathes(content);

  deleteFileNames = setDeleteFiles(matches);

  // 등록취소된 파일 삭제 요청
  const deleteResponse = await deleteTempFiles(deleteFileNames);

  // 파일 삭제에 실패하면 리턴
  if (deleteResponse.status !== 200) {
    console.log("임시 파일 삭제에 실패했습니다");
    return;
  }

  // 내용이나 제목입력안되면 리턴
  if (content === contentValidate || !title.value) {
    return alert("제목과 내용을 모두 입력해주세요");
  }

  const contents = {
    titleText: title.value,
    content,
    thumbnail: matches.length > 0 ? matches[0] : "",
  };

  // 게시글 업데이트 API 요청
  const updateResponse = await updatePost(contents);

  if (updateResponse.status === 200) {
    // redirect되기 전에 beforeunload 이벤트 제거
    window.removeEventListener("beforeunload", handleBeforeUnload);
    window.location.assign("/myPetBoard");
  } else {
    alert("업데이트에 실패했습니다😭");
  }
}

// 작성 중 페이지 이탈하면 서버 이미지 파일 삭제 요청
const handleBeforeUnload = async (e) => {
  e.preventDefault();

  const content = quill.root.innerHTML;

  const matches = getMathes(content);

  // 전체 사진 삭제하도록 flag => true
  deleteFileNames = setDeleteFiles(matches, true);

  const response = await deleteTempFiles(deleteFileNames);

  console.log(response.status);

  e.returnValue = "";
};

const getPostContent = async () => {
  const postId = window.location.href.split("/writePage/")[1];
  const response = await axios({
    url: `/api/posts/${postId}`,
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

const renderPost = async () => {
  const post = await getPostContent();

  const {
    data: { title: postTitle, content },
  } = post;

  quill.root.innerHTML = content;
  title.value = postTitle;
};

window.addEventListener("DOMContentLoaded", (e) => {
  renderPost();
  postBtn.addEventListener("click", sendPost);
  window.addEventListener("beforeunload", handleBeforeUnload);
});
