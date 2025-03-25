import {
  LOGIN_FIELDS_VALIDATION_MESSAGES as LOGIN_MESSAGES,
  REGULAR_EXPRESSIONS as REGEX,
} from "@/utilities/constants";
import * as yup from "yup";

const loginValidations = yup.object().shape({
  emailOrPhone: yup
    .string()
    .required(LOGIN_MESSAGES.EMAIL_OR_PHONE_REQUIRED)
    .test(
      "is-email-or-phone",
      LOGIN_MESSAGES.EMAIL_OR_PHONE_INVALID,
      (value) => {
        if (!value) return false;
        return REGEX.EMAIL.test(value) || REGEX.PHONE.test(value);
      }
    ),
  password: yup
    .string()
    .required(LOGIN_MESSAGES.PASSWORD_REQUIRED)
    .min(8, LOGIN_MESSAGES.PASSWORD_MIN_LENGTH),
});

export default loginValidations;
