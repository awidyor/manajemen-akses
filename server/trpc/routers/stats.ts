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
          date.setDate(1) // set the day to the 1st
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

          if (dateKeluar && item.metodeKeluar && dateKeluar.getFullYear() === currentYear) {
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

        // list minggu
        const listMinggu = ['Minggu 1', 'Minggu 2', 'Minggu 3', 'Minggu 4']

        const currentMonth = new Date().getMonth()
        const currentMonthName = new Date().toLocaleString('default', { month: 'long' })

        const resultWeekly = Array(4).fill(0)

        for (const item of data) {
          const dateMasuk = new Date(item.waktuMasuk)
          const dateKeluar = item.waktuKeluar ? new Date(item.waktuKeluar) : null

          // Only consider data from the current month
          if (dateMasuk.getMonth() === currentMonth) {
            const weekMasuk = dateMasuk.getDate() <= 7 ? listMinggu[0] : dateMasuk.getDate() <= 14 ? listMinggu[1] : dateMasuk.getDate() <= 21 ? listMinggu[2] : listMinggu[3]

            if (listMinggu.includes(weekMasuk)) {
              resultWeekly[listMinggu.indexOf(weekMasuk)]++
            }
          }

          if (dateKeluar && item.metodeKeluar && dateKeluar.getMonth() === currentMonth) {
            const weekKeluar = dateKeluar.getDate() <= 7 ? listMinggu[0] : dateKeluar.getDate() <= 14 ? listMinggu[1] : dateKeluar.getDate() <= 21 ? listMinggu[2] : listMinggu[3]

            if (listMinggu.includes(weekKeluar)) {
              resultWeekly[listMinggu.indexOf(weekKeluar)]++
            }
          }
        }

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
          chartsMonthly: {
            currentYear,
            listMonthBefore: lastSixMonths,
            listData: Object.entries(result).map(([key, value]) => ({ label: key, data: value }))
          },
          chartsWeekly: {
            currentMonth: currentMonthName,
            listWeekBefore: listMinggu,
            listData: resultWeekly
          }
        }
      } catch (error) {
        console.error(error)
      }
    })
})
