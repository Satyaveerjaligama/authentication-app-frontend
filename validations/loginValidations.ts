import {
  VALIDATION_MESSAGES,
  REGULAR_EXPRESSIONS as REGEX,
} from "@/utilities/constants";
import * as yup from "yup";

const loginValidations = yup.object().shape({
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
});

export default loginValidations;
