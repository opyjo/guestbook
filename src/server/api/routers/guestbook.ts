/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";

//guestbookRouter is used to create a new router for the guestbook API. The router is used to define the mutations that are available in the API. The mutations are used to access the database and perform CRUD operations. The mutations are defined using the mutation decorator.

// zod is a great library for validating input and output data types in TypeScript projects and is used in this example to validate the input data for the postMessage mutation.

// The public procedure decorator is used to mark the mutation as public, meaning that it can be called by anyone without authentication.

// The createTRPCRouter function is used to create a new router and the postMessage mutation is added to it. The mutation is called postMessage because it is used to post a new message to the guestbook.

//ctx is the context object that is passed to the mutation. The context object is used to access the Prisma client and the database.

//the prisma client is used to access the database and perform CRUD operations. The prisma client is created in the context.ts file and is passed to the mutation using the ctx parameter.

//The input parameter is used to access the input data that is passed to the mutation. The input data is validated using the zod library.

export const guestbookRouter = createTRPCRouter({
  // The getall mutation is used to retrieve all the messages from the guestbook database. The getAll mutation is marked as public, meaning that it can be called by anyone without authentication. The getAll mutation is called by the useGuestbook hook in the client side code.
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call
      return await ctx.prisma.guestbook.findMany({
        select: {
          name: true,
          message: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } catch (error) {
      console.log("error", error);
    }
  }),

  // The postMessage mutation is used to post a new message to the guestbook database. The postMessage mutation is marked as protected, meaning that it can only be called by authenticated users. The postMessage mutation is called by the useGuestbook hook in the client side code.
  postMessage: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        message: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      try {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
        await ctx.prisma.guestbook.create({
          data: {
            name: input.name,
            message: input.message,
          },
        });
      } catch (error) {
        console.log(error);
      }
    }),
});
