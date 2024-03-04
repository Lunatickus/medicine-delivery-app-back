const { Schema, model } = require("mongoose");
const Joi = require("joi");

const { handleMongooseError } = require("../helpers");

const medicineSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Set name for medicine"],
    },
    image: {
      type: String,
    },
    price: {
      type: Number,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    shop: {
        type: String,
    }
  },
  { versionKey: false, timestamps: true }
);

medicineSchema.post("save", handleMongooseError);

const addSchema = Joi.object({
  name: Joi.string().required(),
  image: Joi.string().required(),
  price: Joi.number().required(),
  favorite: Joi.boolean(),
  shop: Joi.string().required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};

const Medicine = model("medicine", medicineSchema);

module.exports = {
  Medicine,
  schemas,
};
