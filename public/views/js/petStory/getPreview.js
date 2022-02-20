const getPreviewData = async () => {
  try {
    const response = await fetch(`/api/getMyPetBoardPreview`);
    const data = response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};

const getmyPetBoardList = (data) => {
  const { data: myPetBoardList } = data;
  return myPetBoardList;
};

const getMyPetBoard = async () => {
  const myPetBoardData = await getPreviewData();
  const myPetBoards = getmyPetBoardList(myPetBoardData);
  return myPetBoards;
};

export { getMyPetBoard };
