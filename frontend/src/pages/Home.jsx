import React from 'react'
import { useAuth } from '../context/authContext'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useNavigate } from 'react-router-dom'

const Icon = ({ name }) => {
  switch (name) {
    case 'lock':
      return (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 11c.9 0 1.7.5 2.1 1.3M5 11h14v8a2 2 0 01-2 2H7a2 2 0 01-2-2v-8z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 11V8a4 4 0 118 0v3" />
        </svg>
      )
    case 'google':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" width="100px" height="100px" viewBox="-3 0 262 262" preserveAspectRatio="xMidYMid"><path d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027" fill="#4285F4" /><path d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1" fill="#34A853" /><path d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782" fill="#FBBC05" /><path d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251" fill="#EB4335" /></svg>
      )
    case 'shield':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 2l8 4v6c0 5-3.5 9.7-8 11-4.5-1.3-8-6-8-11V6l8-4z" />
        </svg>
      )
    case 'bolt':
      return (
        <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      )
    default:
      return null
  }
}

const Home = () => {
  const { user, loading, serverOnline, handleLogin } = useAuth()
  const navigate = useNavigate()

  const safeLogin = async () => {
    try {
      await handleLogin()
    } catch (err) {
      toast.error("Login service unavailable. Please try again later.")
      console.error("Login failed:", err)
    }
  }

  const handleGetStarted = () => {
    if (loading) return

    if (user) {
      navigate('/passwords')
    } else {
      safeLogin()
    }
  }

  return (
    <div className="relative py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/40 via-transparent to-sky-100" />
      <div className="absolute left-1/2 top-16 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-300/40 blur-[100px]" />
      <div className="absolute right-10 bottom-10 -z-10 h-64 w-64 rounded-full bg-blue-200/40 blur-[90px]" />

      {(loading || !serverOnline) && (
        <div className="fixed bottom-4 right-4 z-50">
          {loading && serverOnline && (
            <div className="rounded-full bg-slate-900/90 text-slate-50 text-xs px-3 py-1.5 shadow-lg flex items-center gap-2" title='First load may take a bit longer due to server cold start'>
              <span className="h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
              <span>Waking up server…</span>
            </div>
          )}

          {!loading && !serverOnline && (
            <div className="rounded-full bg-red-600 text-white text-xs px-3 py-1.5 shadow-lg flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-white/80" />
              <span>Server unreachable</span>
            </div>
          )}
        </div>
      )}

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-10 sm:gap-12 lg:gap-16">
        <div className="text-center space-y-6 sm:space-y-8">
          <h1 className='font-bold text-5xl sm:text-6xl lg:text-7xl tracking-tight'>
            <span className='text-sky-600'>&lt;</span>
            <span>Locki</span>
            <span className='text-sky-600'>FY/&gt;</span>
          </h1>
          <p className='text-sky-900 text-xl sm:text-2xl lg:text-3xl font-medium'>Your own password manager</p>

          <p className="mx-auto max-w-2xl text-base sm:text-lg lg:text-xl text-sky-950/75 leading-relaxed px-4">
            LockiFY keeps every password secure, searchable, and ready when you are. A calm interface, Google OAuth, and
            encrypted storage make managing credentials feel effortless.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              className="group relative rounded-full bg-sky-600 px-8 py-3.5 text-base font-semibold text-white shadow-lg shadow-sky-600/30 hover:bg-sky-700 hover:shadow-xl hover:shadow-sky-600/40 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
              onClick={handleGetStarted}
              disabled={loading}
              aria-label="Get started with LockiFY">
              {loading ? 'Loading...' : 'Get Started'}
            </button>
            <button
              className="rounded-full border-2 border-sky-600/20 bg-white/80 backdrop-blur-sm px-8 py-3.5 text-base font-semibold text-sky-700 hover:border-sky-600/40 hover:bg-white transition-all duration-200 active:scale-95"
              onClick={() => {
                document.getElementById('features-section')?.scrollIntoView({ behavior: 'smooth' })
              }}
              aria-label="Learn more about features">
              Learn More
            </button>
          </div>
        </div>

        <section id="features-section" className="mt-8 sm:mt-12 w-full space-y-8 sm:space-y-10 px-1 sm:px-0">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Why Choose LockiFY</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">Built with security, simplicity, and your peace of mind in focus</p>
          </div>

          <div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-5 sm:gap-6 md:grid-cols-2">
            <article className="group cursor-default flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-sky-100/80 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-sky-200 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-sky-100 to-sky-200 text-sky-700 group-hover:scale-110 transition-transform duration-300">
                <Icon name="lock" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">End-to-end encryption</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Passwords are encrypted locally before leaving your device — only you can decrypt them.
                </p>
              </div>
            </article>

            <article className="group cursor-default flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-sky-100/80 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-sky-200 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Icon name="google" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Google sign-in</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Quick, familiar authentication — with secure session handling and least-privilege tokens.
                </p>
              </div>
            </article>

            <article className="group cursor-default flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-indigo-100/80 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-indigo-200 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-700 group-hover:scale-110 transition-transform duration-300">
                <Icon name="shield" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">Strength insights</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Real-time strength feedback helps you avoid weak or reused passwords, with suggestions when needed.
                </p>
              </div>
            </article>

            <article className="group cursor-default flex flex-col sm:flex-row items-start gap-4 rounded-2xl border border-emerald-100/80 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-emerald-200 hover:-translate-y-1 transition-all duration-300">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-green-100 to-emerald-100 text-emerald-700 group-hover:scale-110 transition-transform duration-300">
                <Icon name="bolt" />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg sm:text-xl font-semibold text-slate-900">One-click actions</h3>
                <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                  Copy usernames, passwords, or URLs instantly and manage entries without breaking your flow.
                </p>
              </div>
            </article>
          </div>
        </section>

        <section className="mt-8 sm:mt-12 w-full space-y-8 sm:space-y-10 px-1 sm:px-0 pb-8">
          <div className="text-center space-y-3">
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">Get Started in Three Steps</h2>
            <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto">Simple, secure, and straightforward password management</p>
          </div>

          <div className="flex w-full flex-col gap-6 lg:flex-row max-w-5xl mx-auto">
            {[
              {
                num: '1',
                title: 'Sign in securely',
                desc: 'Use Google OAuth and secure cookies to access your private vault safely from any device.'
              },
              {
                num: '2',
                title: 'Store credentials',
                desc: 'Add sites, usernames, and passwords that are encrypted before being saved to the database.'
              },
              {
                num: '3',
                title: 'Stay organized',
                desc: 'Edit, update, and copy passwords from a clean, focused table designed for everyday use.'
              }
            ].map((s) => (
              <div
                key={s.num}
                className="group cursor-default flex flex-1 flex-col items-start gap-4 rounded-2xl border border-sky-100/80 bg-white/70 backdrop-blur-sm p-6 shadow-sm hover:shadow-lg hover:border-sky-200 hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-sky-600 text-white font-bold text-2xl shadow-md group-hover:scale-110 group-hover:shadow-lg transition-all duration-300">
                  {s.num}
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{s.title}</h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </section>
    </div>
  )
}

export default Home