import { publicProcedure, router } from '../trpc'

export const statsRouter = router({
  getAll: publicProcedure
    .query(async ({ ctx }) => {
      try {
        const data = await ctx.prisma.akses.findMany()

        // Get the unique methods
        const methods = [...new Set(data.flatMap(item => [item.metodeMasuk, item.metodeKeluar]))]

        // Get the last 6 months
        const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
          const date = new Date()
          date.setMonth(date.getMonth() - i)
          return date.toLocaleString('default', { month: 'long' })
        }).reverse()

        // Initialize the final result with methods as keys and arrays of zeros as values
        const result = Object.fromEntries(methods.map(method => [method, Array(6).fill(0)]))

        // Get the current year
        const currentYear = new Date().getFullYear()

        // Iterate over the data and increment the corresponding month for each method
        for (const item of data) {
          const dateMasuk = new Date(item.waktuMasuk)
          const dateKeluar = item.waktuKeluar ? new Date(item.waktuKeluar) : null

          // Only consider data from the current year
          if (dateMasuk.getFullYear() === currentYear) {
            const monthMasuk = dateMasuk.toLocaleString('default', { month: 'long' })

            if (lastSixMonths.includes(monthMasuk)) {
              result[item.metodeMasuk][lastSixMonths.indexOf(monthMasuk)]++
            }
          }

          if (dateKeluar && dateKeluar.getFullYear() === currentYear) {
            const monthKeluar = dateKeluar.toLocaleString('default', { month: 'long' })

            if (lastSixMonths.includes(monthKeluar)) {
              result[item.metodeKeluar][lastSixMonths.indexOf(monthKeluar)]++
            }
          }
        }

        delete result.null
        result.tapCard = result.TapCard
        result.fingerprint = result.fingerPrintId
        delete result.TapCard
        delete result.fingerPrintId

        return {
          user: await ctx.prisma.user.count(),
          jabatan: await ctx.prisma.jabatan.count(),
          totalIn: await ctx.prisma.akses.count(),
          totalOut: await ctx.prisma.akses.count({
            where: {
              waktuKeluar: {
                not: null
              }
            }
          }),
          charts: {
            currentYear,
            listMonthBefore: lastSixMonths,
            listData: Object.entries(result).map(([key, value]) => ({ label: key, data: value }))
          }
        }
      } catch (error) {
        console.error(error)
      }
    })
})
