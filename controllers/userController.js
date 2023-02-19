// GEt ALL User Handel By Super Admin- or other permisions users
exports.getAllUser = async (req, res, next) => {
  res.status(200).json({
    status: "Success",
    requesteAt: req.requestTime,
  });
};
