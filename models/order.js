const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const orderSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for medicine"],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    address: {
      type: String,
    },
    medicines: {
      type: Array,
    },
    totalPrice: {
      type: Number,
    },
  },
  { versionKey: false, timestamps: true }
);

orderSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  phone: Joi.string().required(),
  address: Joi.string(),
  medicines: Joi.array().required(),
  totalPrice: Joi.number().required(),
});

const schemas = {
  addSchema,
};

const Order = model("order", orderSchema);

module.exports = {
  Order,
  schemas,
};
