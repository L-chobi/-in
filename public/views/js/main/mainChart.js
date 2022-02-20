import { getLostPets, searchParams } from "../lostPets/getLostPets.js";

const formatDate = (date) => {
  const yy = date.getFullYear();
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  const dd = String(date.getDate()).padStart(2, "0");
  return `${yy}-${mm}-${dd}`;
};

const setTwoDates = () => {
  let yesterday = new Date();
  let today = new Date();
  yesterday.setDate(today.getDate() - 1);

  today = formatDate(today);
  yesterday = formatDate(yesterday);
  return [today, yesterday];
};

const [today, yesterday] = setTwoDates();
searchParams.bgnde = yesterday;
searchParams.endde = today;

let [lostPetList, totalCount] = await getLostPets(searchParams);

let [dogList, dogCount] = await getLostPets({
  ...searchParams,
  upkind: "417000",
});

let [catList, catCount] = await getLostPets({
  ...searchParams,
  upkind: "422400",
});

let [othersList, othersCount] = await getLostPets({
  ...searchParams,
  upkind: "429900",
});

const news__description = document.querySelector(".news__description");
const ctx = document.getElementById("myChart");
const data = [dogCount, catCount, othersCount];

news__description.innerHTML = `오늘은<br><span style="color: var(--main-color-orange)">${totalCount}</span>마리의 반려동물이<br>가족을 기다리고 있습니다.<br>새로운 가족이 되어주세요!<br>
`;

const myChart = new Chart(ctx, {
  type: "doughnut",
  options: {
    responsive: false,
    plugins: {
      title: {
        display: true,
        text: "오늘 접수된 유기동물 현황",
      },
    },
  },
  data: {
    labels: ["강아지", "고양이", "기타"],
    datasets: [
      {
        label: "Lost Pets Dataset",
        data,
        backgroundColor: ["#ecbb7f", "#a48772", "#a47272"],
        hoverOffset: 4,
      },
    ],
  },
});

export { myChart };
