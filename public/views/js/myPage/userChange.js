const changeName = async () => {
  const name = document.querySelector(".userInfo__modify__input");
  const btn = document.querySelector("#userInfo__modify__btn");
  const deleteUserBtn = document.querySelector("#userInfo__exit");
  const nameRegex = /^([a-zA-Z0-9ㄱ-ㅎ|ㅏ-ㅣ|가-힣]).{1,10}$/;
  const nickname = document.querySelector(".myPage__profile__nickname");

  const res = await fetch("/api/get-user", {
    method: "GET",
  });
  const data = await res.json();
  const userId = data._id;

  const changer = async (val) => {
    if (!val.replace(/ /gi, "")) {
      alert("변경할 닉네임을 입력해주세요");
    } else if (!nameRegex.test(val)) {
      alert("닉네임은 한글, 영문, 숫자 2-10자리만 가능합니다.");
    } else if (val === data.nickname) {
      alert("현재 이름과 동일합니다.");
    } else {
      if (confirm("정말로 바꾸시겠어요?")) {
        const newNickname = val.replace(/ /gi, "");
        const changed = await fetch(`/api/users/${userId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            nickname: newNickname,
          }),
        });

        if (changed.status === 200) {
          nickname.innerHTML = newNickname;
          alert(`${newNickname}님 안녕하세요`);
        } else {
          alert("닉네임 변경에 실패했습니다.");
        }
      } else {
        alert("닉네임 변경을 취소했습니다.");
      }
    }
    name.value = "";
  };

  const deleteUser = async () => {
    const deleted = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    if (deleted.status === 204) {
      alert("회원탈퇴가 완료되었습니다.");
    } else {
      alert("탈퇴 실패했습니다😭");
    }
  };

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    changer(name.value);
  });

  deleteUserBtn.addEventListener("click", (e) => {
    e.preventDefault();
    if (confirm("정말로 탈퇴하시겠어요?")) {
      return deleteUser();
    }
  });
};

export { changeName };
