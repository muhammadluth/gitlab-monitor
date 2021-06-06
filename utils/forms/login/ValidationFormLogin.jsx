import * as Yup from "yup";

export const validationSchemaFormLogin = Yup.object().shape({
  private_access_token: Yup.string().required("This field is required"),
});
