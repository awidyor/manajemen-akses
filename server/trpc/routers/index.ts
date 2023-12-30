import { router } from '../trpc'
import { jabatanRouter } from './jabatan'
import { userRouter } from './user'

export const appRouter = router({
  jabatan: jabatanRouter,
  user: userRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
