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
    })
})
