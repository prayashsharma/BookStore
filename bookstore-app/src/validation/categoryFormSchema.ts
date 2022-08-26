import joi from "joi";

const categoryFormSchema = joi
  .object({
    Id: joi.string(),
    Name: joi.string().required().label("Name"),
  })
  .options({ allowUnknown: true, abortEarly: false });

export default categoryFormSchema;
