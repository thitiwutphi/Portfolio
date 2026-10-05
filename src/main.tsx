import './index.css'

import { RouterProvider } from '@tanstack/react-router'
import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'

import { AppProviders } from './app-providers'
import { createAppRouter, createQueryClient } from './router'

const QueryDevtools = import.meta.env.DEV
  ? lazy(() =>
      import('@tanstack/react-query-devtools').then((module) => ({
        default: module.ReactQueryDevtools,
      })),
    )
  : () => null

const queryClient = createQueryClient()
const router = createAppRouter(queryClient)

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element #root not found')

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders queryClient={queryClient}>
      <RouterProvider router={router} />
      <Suspense>
        <QueryDevtools />
      </Suspense>
    </AppProviders>
  </StrictMode>,
)
