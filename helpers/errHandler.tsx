import * as z from "zod";

export default function errHandler(err: unknown) {
  let error = err as { message: string; status: number };

  if (err instanceof z.ZodError) {
    error = {
      message: err.issues.map((issue) => issue.message).join(", "),
      status: 400,
    };
  }

  return Response.json(
    {
      message: error.message,
    },
    {
      status: error.status,
    }
  );
}
