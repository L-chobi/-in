const createLostPetDetail = (item) => {
  const lostPetDetailTemplate = `
  <div class="lost-detail__img-container">
    <img
      class="lost-detail__img"
      src="${item.popfile}"
    />
  </div>

  <div class="lost-detail__info">
    <div class="lost-detail__animal-info">
      <div class="lost-detail__title">보호 동물 정보</div>
      <table>
        <tbody>
          <tr>
            <th>공고번호</th>
            <td colspan="3">${item.noticeNo}</td>
          </tr>
          <tr>
            <th>공고기간</th>
            <td>${item.noticeSdt} ~ ${item.noticeEdt}</td>
            <th>상태</th>
            <td>${item.processState}</td>
          </tr>
          <tr>
            <th>품종</th>
            <td>${item.kindCd}</td>
            <th>색상</th>
            <td>${item.colorCd}</td>
          </tr>
          <tr>
            <th>나이</th>
            <td>${item.age}</td>
            <th>체중</th>
            <td>${item.weight}</td>
          </tr>
          <tr>
            <th>성별</th>
            <td>${item.sexCd}</td>
            <th>중성화여부</th>
            <td>${item.neuterYn}</td>
          </tr>
          <tr>
            <th>접수일</th>
            <td>${item.happenDt}</td>
          </tr>
          <tr>
            <th>발견장소</th>
            <td colspan="3">${item.happenPlace}</td>
          </tr>
          <tr>
            <th>특징</th>
            <td colspan="3">${item.specialMark}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="lost-detail__shelter-info">
      <div class="lost-detail__title">보호소 정보</div>
      <table>
        <tbody>
          <tr>
            <th>보호소명</th>
            <td>${item.careNm}</td>
            <th>전화번호</th>
            <td>${item.careTel}</td>
          </tr>
          <tr>
            <th>보호장소</th>
            <td colspan="3">${item.careAddr}</td>
          </tr>
          <tr>
            <th>관할기관</th>
            <td colspan="3">${item.orgNm}</td>
          </tr>
          <tr>
            <th>담당자</th>
            <td>${item.chargeNm}</td>
            <th>연락처</th>
            <td>${item.officetel}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
`;

  return lostPetDetailTemplate;
};

const paintLostPetDetail = (lostPetList) => {
  const pathName = location.pathname.split("/")[2];
  const currentPet = lostPetList.find(
    (item) => String(item.desertionNo) === pathName
  );
  const lostPetDetail = createLostPetDetail(currentPet);
  document.querySelector(".lost-detail-container").innerHTML = lostPetDetail;
};

export { paintLostPetDetail };
