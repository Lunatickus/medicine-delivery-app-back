const express = require("express");

const ctrl = require("../../controllers/medicines");

const {validateBody, isValidMedicineId } = require("../../middlewares");

const {schemas} = require("../../models/medicine");

const router = express.Router();

router.get("/", ctrl.getAll);

router.get("/search", ctrl.getByShop);

router.get("/:medicineId", isValidMedicineId, ctrl.getById);

router.post("/", validateBody(schemas.addSchema), ctrl.add);

router.delete("/:medicineId", isValidMedicineId, ctrl.deleteById);

router.put("/:medicineId", isValidMedicineId, validateBody(schemas.addSchema), ctrl.updateById);

router.patch("/:medicineId/favorite", isValidMedicineId, validateBody(schemas.updateFavoriteSchema), ctrl.updateStatusMedicine);

module.exports = router;