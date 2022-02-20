const checkLoginUser = async () => {
  let response = await fetch("/api/get-user");
  let result = await response.json();
  return result;
};

export { checkLoginUser };
