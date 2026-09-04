import { formOptions } from "@tanstack/react-form-nextjs";

import { authSignInEmailRequestSchema } from "@/core/apis/better-auth";

export const loginFormOpts = formOptions({
  defaultValues: {
    email: "",
    password: "",
  },
  validators: {
    onChange: authSignInEmailRequestSchema,
  },
});
