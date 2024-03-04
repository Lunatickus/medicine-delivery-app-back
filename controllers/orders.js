const { Order} = require("../models/order");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const result = await Order.find();
  res.json({
    status: "success",
    code: 200,
    data: result,
  });
};

const getById = async (req, res) => {
  const { orderId } = req.params;
  const result = await Order.findById(orderId);
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
  const result = await Order.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: result,
  });
};

const deleteById = async (req, res) => {
  const { orderId } = req.params;
  const result = await Order.findByIdAndDelete(orderId);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(204).json();
};

const updateById = async (req, res) => {
  const { orderId } = req.params;
  const result = await Order.findByIdAndUpdate(orderId, req.body, {
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

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  deleteById: ctrlWrapper(deleteById),
  updateById: ctrlWrapper(updateById),
};
