export const VALIDATION_MESSAGES = {
  EMAIL_OR_PHONE_REQUIRED: "Please enter Email or Phone number",
  EMAIL_OR_PHONE_INVALID: "Please enter valid Email or Phone number",
  PASSWORD_REQUIRED: "Please enter Password",
  PASSWORD_MIN_LENGTH: "Password should be of minimum 8 characters",
  RETYPE_PASSWORD_REQUIRED: "Please re-enter Password",
  PASSWORDS_MUST_MATCH: "Passwords must match",
  NAME_REQUIRED: "Please enter Name",
};

export const REGULAR_EXPRESSIONS = {
  EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PHONE: /^[0-9]{10}$/,
};
