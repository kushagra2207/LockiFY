import React from 'react'

const Home = () => {

  return (
    <div className="relative min-h-[calc(100vh-64px)] overflow-hidden py-16 px-4 sm:px-6 lg:px-8">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-sky-50/40 via-transparent to-sky-100" />
      <div className="absolute left-1/2 top-16 -z-10 h-80 w-80 -translate-x-1/2 rounded-full bg-sky-300/40 blur-[100px]" />
      <div className="absolute right-10 bottom-10 -z-10 h-64 w-64 rounded-full bg-blue-200/40 blur-[90px]" />

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center gap-12">
        <div className="text-center">
          <h1 className='font-bold text-5xl sm:text-6xl tracking-tight'>
            <span className='text-sky-600'>&lt;</span>
            <span>Locki</span>
            <span className='text-sky-600'>FY/&gt;</span>
          </h1>
          <p className='mt-3 text-sky-900 text-xl sm:text-2xl'>Your own password manager</p>
        </div>

        <div className="mx-auto max-w-3xl text-center text-lg text-sky-950/80">
          LockiFY keeps every password secure, searchable, and ready when you are. A calm interface, Google OAuth, and
          encrypted storage make managing credentials feel effortless.
        </div>

        <section className="mt-4 w-full space-y-5 px-1 sm:px-0">
          <h2 className="text-3xl font-semibold text-slate-900 text-center">Why LockiFY</h2>
          <div className="flex w-full flex-col gap-5 md:grid md:grid-cols-2">
            <div className="rounded-3xl border border-sky-50 bg-sky-50/80 hover:bg-sky-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-100 hover:shadow-md">
              <p className="text-lg font-semibold text-slate-900">End-to-end encryption</p>
              <p className="mt-1 text-sm md:text-base text-slate-600">
                Passwords are encrypted before they touch the database, staying unreadable to anyone but you.
              </p>
            </div>
            <div className="rounded-3xl border border-sky-50 bg-sky-50/80 hover:bg-sky-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-100 hover:shadow-md">
              <p className="text-lg font-semibold text-slate-900">Google sign-in</p>
              <p className="mt-1 text-sm md:text-base text-slate-600">
                Skip extra accounts and authenticate quickly with Google OAuth while keeping sessions secure.
              </p>
            </div>
            <div className="rounded-3xl border border-sky-50 bg-sky-50/80 hover:bg-sky-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-100 hover:shadow-md">
              <p className="text-lg font-semibold text-slate-900">Strength insights</p>
              <p className="mt-1 text-sm md:text-base text-slate-600">
                Real-time strength feedback powered by zxcvbn helps you build resilient, unique passwords.
              </p>
            </div>
            <div className="rounded-3xl border border-sky-50 bg-sky-50/80 hover:bg-sky-50 p-5 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-sky-100 hover:shadow-md">
              <p className="text-lg font-semibold text-slate-900">One-click actions</p>
              <p className="mt-1 text-sm md:text-base text-slate-600">
                Copy usernames, passwords, or URLs instantly and manage entries without breaking your flow.
              </p>
            </div>
          </div>
        </section>

        <section className="mt-10 w-full space-y-5 px-1 sm:px-0">
          <h2 className="text-3xl font-semibold text-slate-900 text-center">Three steps</h2>
          <div className="flex flex-col gap-5 lg:flex-row">
            <div className="flex flex-1 items-start gap-4 rounded-3xl border border-slate-100 bg-sky-50/80 hover:bg-sky-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-base font-semibold text-sky-700">
                01
              </span>
              <div>
                <p className="text-lg font-semibold text-slate-900">Sign in securely</p>
                <p className="mt-1 text-sm md:text-base text-slate-600">
                  Use Google OAuth and secure cookies to access your private vault safely from any device.
                </p>
              </div>
            </div>
            <div className="flex flex-1 items-start gap-4 rounded-3xl border border-slate-100 bg-sky-50/80 hover:bg-sky-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-base font-semibold text-sky-700">
                02
              </span>
              <div>
                <p className="text-lg font-semibold text-slate-900">Store credentials</p>
                <p className="mt-1 text-sm md:text-base text-slate-600">
                  Add sites, usernames, and passwords that are encrypted before being saved to the database.
                </p>
              </div>
            </div>
            <div className="flex flex-1 items-start gap-4 rounded-3xl border border-slate-100 bg-sky-50/80 hover:bg-sky-50 p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-sky-100 text-base font-semibold text-sky-700">
                03
              </span>
              <div>
                <p className="text-lg font-semibold text-slate-900">Stay organized</p>
                <p className="mt-1 text-sm md:text-base text-slate-600">
                  Edit, update, and copy passwords from a clean, focused table designed for everyday use.
                </p>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  )
}

export default Home