import joi from "joi";

const bookFormSchema = joi
  .object({
    Id: joi.string(),
    Name: joi.string().required().label("Name"),
    Price: joi.number().required().label("Price"),
    Author: joi.string().required().label("Author"),
    Category: joi.object().keys({
      Id: joi.string().required().label("Category"),
    }),
  })
  .options({ allowUnknown: true });

export default bookFormSchema;
