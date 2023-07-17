const logout = (req, res) => {
  res.clearCookie("jwt");
  console.log("Cookie clear");
  return res.status(200).send({ message: "Вы вышли" });
};

module.exports = {
  logout,
};
