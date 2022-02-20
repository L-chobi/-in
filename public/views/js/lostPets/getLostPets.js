const searchParams = {
  pageNo: 1,
  numOfRows: 10,
  upkind: "",
  upr_cd: "",
  org_cd: "",
  state: "",
  bgnde: "",
  endde: "",
};

const getLostPetData = async ({
  pageNo,
  numOfRows,
  upkind,
  upr_cd,
  org_cd,
  state,
  bgnde,
  endde,
}) => {
  try {
    const response = await fetch(
      `/api/lost-pets?upr_cd=${upr_cd}&org_cd=${org_cd}&upkind=${upkind}&state=${state}&pageNo=${pageNo}&numOfRows=${numOfRows}&bgnde=${bgnde}&endde=${endde}`
    );
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getLostPetList = (data) => {
  const {
    items: { item: lostPetList },
    totalCount,
  } = data;
  return [lostPetList, totalCount];
};

const getLostPets = async (params) => {
  const lostPetData = await getLostPetData(params);
  const [lostPetList, totalCount] = getLostPetList(lostPetData);
  return [lostPetList, totalCount];
};

export { getLostPets, searchParams };
