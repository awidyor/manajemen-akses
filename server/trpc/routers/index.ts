import { router } from '../trpc'
import { jabatanRouter } from './jabatan'
import { reportingRouter } from './reporting'
import { userRouter } from './user'

export const appRouter = router({
  jabatan: jabatanRouter,
  user: userRouter,
  reporting: reportingRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
