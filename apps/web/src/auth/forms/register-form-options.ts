import { formOptions } from "@tanstack/react-form-nextjs";

import { authSignUpEmailRequestSchema } from "@/core/apis/better-auth";

export const registerFormOpts = formOptions({
  defaultValues: {
    email: "",
    name: "",
    password: "",
  },
  validators: {
    onChange: authSignUpEmailRequestSchema,
  },
});
