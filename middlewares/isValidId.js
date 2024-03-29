const { isValidObjectId } = require("mongoose");

const { HttpError } = require("../helpers");

const isValidOrderId = (req, res, next) => {
  const { orderId } = req.params;
  if (!isValidObjectId(orderId)) {
    next(HttpError(400, `${orderId} is not valid id`));
  }
  next();
};

const isValidMedicineId = (req, res, next) => {
  const { medicineId } = req.params;
  if (!isValidObjectId(medicineId)) {
    next(HttpError(400, `${medicineId} is not valid id`));
  }
  next();
};

module.exports = { isValidOrderId, isValidMedicineId };
