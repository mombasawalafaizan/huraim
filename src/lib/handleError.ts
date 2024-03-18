import { toast } from "sonner";
import * as z from "zod";

export function getErrorMessage(err: unknown) {
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    return errors.join("\n");
  } else if (err instanceof Error) return err.message;
  else if (typeof err === "string") return err;
  else return "An unknown error occurred. Please try again later.";
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}
