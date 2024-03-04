const express = require("express");

const ctrl = require("../../controllers/orders");

const {validateBody, isValidOrderId} = require("../../middlewares");

const {schemas} = require("../../models/order");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/:orderId", isValidOrderId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:orderId", isValidOrderId, ctrl.deleteById);

router.put("/:orderId", isValidOrderId, validateBody(schemas.addSchema), ctrl.updateById);

module.exports = router;
