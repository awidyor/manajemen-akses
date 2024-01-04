import { z } from 'zod'
import { publicProcedure, router } from '../trpc'

export const reportingRouter = router({
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.akses.findMany({
        include: {
          user: {
            include: {
              jabatan: true
            }
          }
        }
      })
    }),

  create: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        tempatMasuk: z.string(),
        metodeMasuk: z.string(),
        metodeKeluar: z.string().optional(),
        waktuMasuk: z.string(),
        waktuKeluar: z.string().optional()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const akses = await ctx.prisma.akses.create({
          data: {
            user: {
              connect: {
                id: input.userId
              }
            },
            tempatMasuk: input.tempatMasuk,
            metodeMasuk: input.metodeMasuk,
            metodeKeluar: input.metodeKeluar,
            waktuMasuk: input.waktuMasuk,
            waktuKeluar: input.waktuKeluar
          }
        })

        return akses
      } catch (error) {
        console.log(error)
      }
    }),

  hello: publicProcedure
    .query(async ({ ctx }) => {
      return 'Hello World'
    })
})
