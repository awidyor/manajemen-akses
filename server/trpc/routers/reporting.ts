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
        tempatKeluar: z.string().optional(),
        metodeMasuk: z.enum(['fingerPrintId', 'TapCard', 'faceId']),
        metodeKeluar: z.enum(['fingerPrintId', 'TapCard', 'faceId']).optional(),
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
            tempatKeluar: input.tempatKeluar,
            metodeMasuk: input.metodeMasuk,
            metodeKeluar: input.metodeKeluar,
            waktuMasuk: input.waktuMasuk,
            waktuKeluar: input.waktuKeluar
          }
        })

        return akses
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    }),

  update: publicProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
        tempatMasuk: z.string().optional(),
        tempatKeluar: z.string(),
        metodeMasuk: z.enum(['fingerPrintId', 'TapCard', 'faceId']).optional(),
        metodeKeluar: z.enum(['fingerPrintId', 'TapCard', 'faceId']),
        waktuMasuk: z.string().optional(),
        waktuKeluar: z.string()
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const akses = await ctx.prisma.akses.update({
          where: {
            id: input.id
          },
          data: {
            user: {
              connect: {
                id: input.userId
              }
            },
            tempatMasuk: input.tempatMasuk,
            tempatKeluar: input.tempatKeluar,
            metodeMasuk: input.metodeMasuk,
            metodeKeluar: input.metodeKeluar,
            waktuMasuk: input.waktuMasuk,
            waktuKeluar: input.waktuKeluar
          }
        })

        return akses
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error)
      }
    })
})
