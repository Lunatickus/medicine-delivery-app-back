const { Medicine } = require("../models/medicine");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Medicine.find();
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const getById = async (req, res) => {
  const { medicineId } = req.params;
  const result = await Medicine.findById(medicineId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const add = async (req, res) => {
  const result = await Medicine.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

const deleteById = async (req, res) => {
  const { medicineId } = req.params;
  const result = await Medicine.findByIdAndDelete(medicineId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(204).json();
};

const updateById = async (req, res) => {
  const { medicineId } = req.params;
  const result = await Medicine.findByIdAndUpdate(medicineId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const updateStatusMedicine = async (req, res) => {
  const { medicineId } = req.params;
  if (!req.body.favorite) {
    throw HttpError(400, "missing field favorite");
  }
  const result = await Medicine.findByIdAndUpdate(medicineId, req.body, {
    new: true,
  });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const getByShop = async (req, res) => {
  const { shop, sortByPrice, sortByDate } = req.query;
  const query = {};
  if (shop) {
    query.shop = shop;
  }
  const sortCriteria = {};
  if (sortByPrice) {
    sortCriteria.price = sortByPrice === "asc" ? 1 : -1;
  }
  if (sortByDate) {
    sortCriteria.createdAt = sortByDate === "asc" ? 1 : -1;
  }
  const result = await Medicine.find(query).sort(sortCriteria);
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
  updateStatusMedicine: ctrlWrapper(updateStatusMedicine),
  getByShop: ctrlWrapper(getByShop),
};
