import {
  VALIDATION_MESSAGES,
  REGULAR_EXPRESSIONS as REGEX,
} from "@/utilities/constants";
import * as yup from "yup";

const registerValidations = yup.object().shape({
  emailOrPhone: yup
    .string()
    .test(
      "is-email-or-phone",
      VALIDATION_MESSAGES.EMAIL_OR_PHONE_INVALID,
      (value) => {
        if (!value) return false;
        return REGEX.EMAIL.test(value) || REGEX.PHONE.test(value);
      }
    )
    .required(VALIDATION_MESSAGES.EMAIL_OR_PHONE_REQUIRED),
  password: yup
    .string()
    .min(8, VALIDATION_MESSAGES.PASSWORD_MIN_LENGTH)
    .required(VALIDATION_MESSAGES.PASSWORD_REQUIRED),
  retypePassword: yup
    .string()
    .oneOf([yup.ref("password")], VALIDATION_MESSAGES.PASSWORDS_MUST_MATCH)
    .required(VALIDATION_MESSAGES.RETYPE_PASSWORD_REQUIRED),
  name: yup.string().required(VALIDATION_MESSAGES.NAME_REQUIRED),
});

export default registerValidations;
