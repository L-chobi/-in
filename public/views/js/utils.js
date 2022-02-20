const getTime = (utc) => {
  const time = new Date(utc);

  const year = time.getFullYear();
  const month = time.getMonth() + 1;
  const date = time.getDate();
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return {
    year,
    month,
    date,
    hours,
    minutes,
  };
};

export { getTime };
