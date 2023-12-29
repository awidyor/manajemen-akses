import { router } from '../trpc'
import { jabatanRouter } from './jabatan'

export const appRouter = router({
  jabatan: jabatanRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
