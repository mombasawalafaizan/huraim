import { toast } from "sonner";
import * as z from "zod";

export function getErrorMessage(err: unknown): string {
  let message: string;
  if (err instanceof z.ZodError) {
    const errors = err.issues.map((issue) => {
      return issue.message;
    });
    message = errors.join("\n");
  } else if (err instanceof Error) message = err.message;
  else if (err && typeof err === "object" && "message" in err)
    message = String(err.message);
  else if (typeof err === "string") message = err;
  else message = "An unknown error occurred. Please try again later.";
  return message;
}

export function showErrorToast(err: unknown) {
  const errorMessage = getErrorMessage(err);
  return toast.error(errorMessage);
}
