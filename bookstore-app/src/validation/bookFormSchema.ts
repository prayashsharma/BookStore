import joi from "joi";

const bookFormSchema = joi
  .object({
    Id: joi.string(),
    Name: joi.string().required().label("Name"),
    Price: joi.number().required().label("Price"),
    Author: joi.string().required().label("Author"),
    CategoryId: joi.string().required().label("Category"),
    // Category: joi.object().keys({
    //   Id: joi.string().required().label("Category"),
    // }),
  })
  .options({ allowUnknown: true, abortEarly: false });

export default bookFormSchema;
