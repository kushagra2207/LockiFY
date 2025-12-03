import React from 'react'
import { useNavigate } from 'react-router-dom'

const NotFound = () => {
  const navigate = useNavigate()

  const handleGoHome = () => navigate('/')
  const handleGoBack = () => navigate(-1)

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="w-[90vw] max-w-md bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-white/70 px-8 py-10 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-sky-100">
          <span className="text-3xl font-bold text-sky-600">!</span>
        </div>

        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-sky-500">
          404 — Page not found
        </p>

        <h1 className="mt-3 text-3xl font-bold text-slate-900">
          Oops, this page doesn't exist
        </h1>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            type="button"
            onClick={handleGoBack}
            className="w-full sm:w-auto rounded-full border border-sky-200 px-5 py-2.5 text-sm font-medium text-sky-700 hover:bg-sky-50 transition"
          >
            Go back
          </button>
          <button
            type="button"
            onClick={handleGoHome}
            className="w-full sm:w-auto rounded-full bg-sky-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-sky-600 active:bg-sky-700 transition"
          >
            Go to homepage
          </button>
        </div>

        <p className="mt-6 text-[11px] text-slate-500">
          If you believe this is a mistake, check the URL or try again later.
        </p>
      </div>
    </div>
  )
}

export default NotFound
