const getLostPets = async (req, res) => {
  res.render('lostPets.html', { isLogined: req.isLoggedIn });
};

const getLostPetDetail = async (req, res) => {
  res.render('lostPetsDetail.html', { isLogined: req.isLoggedIn });
};

module.exports = {
  getLostPets,
  getLostPetDetail,
};
