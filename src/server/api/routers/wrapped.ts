import { TRPCError } from "@trpc/server";
import { loginSchema } from "~/lib/schema";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { generateReport, login } from "../bicing";

export const wrappedRouter = createTRPCRouter({
  create: publicProcedure.input(loginSchema).mutation(async ({ input }) => {
    const loginResponse = await login(input.email, input.password);
    if ("error" in loginResponse) {
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: loginResponse.error,
      });
    }
    const report = await generateReport(loginResponse.access_token);
    return report;
  }),
});
