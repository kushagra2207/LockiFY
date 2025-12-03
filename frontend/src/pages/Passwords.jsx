import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import zxcvbn from 'zxcvbn'

import { getPasswords, addPassword, updatePassword, deletePassword } from '../api/passwords'

const Passwords = () => {
  const formRef = useRef(null)
  const tableRef = useRef(null)
  const isEdit = useRef(false)
  const scrollToTable = useRef(false)
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])
  const [showPwd, setShowPwd] = useState(false)
  const passStrength = zxcvbn(form.password)
  const strengthScore = passStrength.score

  useEffect(() => {
    if (scrollToTable.current) {
      requestAnimationFrame(() => {
        tableRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
        scrollToTable.current = false
      })
    }
  }, [passwordArray])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getPasswords()
        setPasswordArray(data)
      } catch (error) {
        toast.error("Failed to fetch passwords")
      }
    }
    fetchData()
  }, [])

  const toggleShowPassword = () => {
    setShowPwd(s => !s)
  }

  const savePassword = async () => {
    try {
      if (!isEdit.current) {
        const newPassword = await addPassword(form)

        const entry = { ...newPassword.data, password: form.password }
        setPasswordArray((prev) => [...prev, entry])

        toast.success('Password Saved Successfully!')
        scrollToTable.current = true
      } else {
        const updated = await updatePassword(form.id, form)

        const updatedEntry = { ...updated.data, password: form.password }
        setPasswordArray((prev) => prev.map(item => item.id === updatedEntry.id ? updatedEntry : item))

        toast.success('Password Updated Successfully!')
        isEdit.current = false
        scrollToTable.current = true
      }
      setForm({ site: "", username: "", password: "" })
    } catch (err) {
      toast.error("Error saving password")
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = confirm("Do you really want to delete this password?")
    if (!confirmDelete) return

    try {
      await deletePassword(id)
      setPasswordArray(passwordArray.filter(item => item.id !== id))
      toast.success('Password Deleted Successfully!')
    } catch {
      toast.error("Failed to delete password")
    }
  }

  const handleEdit = (id) => {
    const entry = passwordArray.find(item => item.id === id)
    if (entry) {
      setForm(entry)
      isEdit.current = true

      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
    toast('Copied To Clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      theme: "dark",
      transition: Bounce,
    })
  }

  const isFormValid = Object.entries(form).every(([key, v]) => {
    if (key === 'id') return true
    if (typeof v === 'string') return v.trim().length > 0
    return v !== null && v !== undefined && v !== ''
  })

  const shuffle = (str) => {
    const arr = str.split('');
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr.join('');
  }

  const generateStrongPassword = () => {
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const lowercase = 'abcdefghijklmnopqrstuvwxyz'
    const numbers = '0123456789'
    const special = '!@#$%^&*'

    const getRandomChars = (chars, count) =>
      Array.from({ length: count }, () => chars[Math.floor(Math.random() * chars.length)]).join('')

    const upperCount = 2 + Math.floor(Math.random() * 2)
    const numCount = 2 + Math.floor(Math.random() * 2)
    const specialCount = 2 + Math.floor(Math.random() * 2)

    const upperPart = getRandomChars(uppercase, upperCount)
    const numPart = getRandomChars(numbers, numCount)
    const specialPart = getRandomChars(special, specialCount)

    const totalLength = 12 + Math.floor(Math.random() * 5)
    const remainingCount = totalLength - (upperCount + numCount + specialCount)
    const lowerPart = getRandomChars(lowercase, remainingCount)

    let password = shuffle(upperPart + numPart + lowerPart + specialPart)

    setForm(prev => ({ ...prev, password }))
  }

  return (
    <>
      <ToastContainer theme="dark" transition={Bounce} />
      <div className="absolute inset-0 -z-10 h-full w-full bg-blue-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-size-[14px_24px]">
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>
      </div>

      <div className="flex flex-col w-[95vw] sm:w-[90vw] md:w-[80vw] mx-auto py-10">
        <h1 className='font-bold text-4xl text-center'>
          <span className='text-sky-600'>&lt;</span>
          <span>Locki</span>
          <span className='text-sky-600'>FY/&gt;</span>
        </h1>
        <p className='text-sky-900 text-lg text-center'>Your own password manager</p>

        <div ref={formRef} className="mt-8 w-full max-w-3xl mx-auto rounded-3xl border border-white/70 bg-white/80 p-6 sm:p-8 shadow-xl backdrop-blur flex flex-col gap-6">
          <div className="space-y-2">
            <label htmlFor="site" className="text-sm font-medium text-sky-900">Website URL</label>
            <input
              id="site"
              value={form.site}
              onChange={handleChange}
              placeholder='https://example.com'
              className='w-full rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-400'
              type="text"
              name='site'
            />
          </div>

          <div className="flex flex-col sm:flex-row justify-between gap-6 w-full">
            <div className="flex-1 space-y-2">
              <label htmlFor="username" className="text-sm font-medium text-sky-900">Username</label>
              <input
                id="username"
                value={form.username}
                onChange={handleChange}
                placeholder='Enter username'
                className='w-full rounded-2xl border border-sky-100 bg-white px-4 py-3 text-sm shadow-sm outline-none transition focus:border-sky-400'
                type="text"
                name='username'
              />
            </div>
            <div className='flex-1 space-y-2'>
              <label htmlFor="password" className="text-sm font-medium text-sky-900">Password</label>
              <div className="relative">
                <input
                  id="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder='Enter password'
                  className='w-full rounded-2xl border border-sky-100 bg-white px-4 py-3 pr-10 text-sm shadow-sm outline-none transition focus:border-sky-400'
                  type={showPwd ? "text" : "password"}
                  name='password'
                />
                <span
                  className='absolute inset-y-0 right-3 flex items-center cursor-pointer rounded-full p-1'
                  onClick={toggleShowPassword}
                >
                  <img width={20} src={showPwd ? "/icons/eyecross.png" : "/icons/eye.png"} alt="eye" />
                </span>
              </div>
              <div className='mt-3'>
                <div className='h-2 bg-gray-200 rounded-full'>
                  <div
                    className={`h-2 rounded-full transition-all duration-300 ${
                      !form.password
                        ? 'w-0 bg-transparent'
                        : strengthScore === 0
                          ? 'bg-red-500 w-1/5'
                          : strengthScore === 1
                            ? 'bg-orange-500 w-2/5'
                            : strengthScore === 2
                              ? 'bg-yellow-500 w-3/5'
                              : strengthScore === 3
                                ? 'bg-green-400 w-4/5'
                                : 'bg-green-600 w-full'
                    }`}
                  ></div>
                </div>
                {form.password && (
                  <p className='text-xs mt-1 text-gray-700'>
                    Strength: {['Very Weak', 'Weak', 'Fair', 'Good', 'Strong'][strengthScore]}
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <button
              onClick={generateStrongPassword}
              className="text-sm font-medium text-sky-700 underline underline-offset-4 hover:text-sky-900 transition cursor-pointer"
            >
              Generate a strong password
            </button>

            <button
              onClick={savePassword}
              disabled={!isFormValid}
              className='flex justify-center items-center rounded-full w-full sm:w-auto px-6 py-3 gap-2 border border-transparent bg-sky-500 text-white text-base font-semibold shadow-md transition hover:bg-sky-600 active:bg-sky-700 disabled:cursor-not-allowed disabled:bg-sky-200 disabled:text-slate-500'
            >
              <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover"></lord-icon>
              <span>{!isEdit.current ? "Save" : "Update"}</span>
            </button>
          </div>
        </div>

        <div className="passwords mt-4" ref={tableRef}>
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length > 0 && (
            <>
              {/* Mobile: 2-column table */}
              <table className="table-auto w-full rounded-lg overflow-hidden md:hidden">
                <thead className='bg-sky-800 text-white'>
                  <tr>
                    <th className='py-2 text-center text-sm'>Data</th>
                    <th className='py-2 text-center text-sm'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-sky-200'>
                  {passwordArray.map(item => (
                    <tr key={item.id} className="border-t border-white">
                      <td className='align-middle px-3 py-3'>
                        <div className="space-y-2 text-sm">
                          <div>
                            <div className="mt-0.5 flex items-center gap-1">
                              <a
                                href={item.site}
                                target='_blank'
                                className='break-all text-sky-700 underline-offset-2 hover:underline'
                              >
                                {item.site}
                              </a>
                              <button
                                className='cursor-pointer p-1 rounded-full hover:bg-gray-300/40 active:bg-gray-400/50 transition-colors'
                                onClick={() => copyText(item.site)}
                              >
                                <img
                                  src="/icons/copy.svg"
                                  alt="Copy Icon"
                                  height="18"
                                  width="18"
                                />
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="mt-0.5 flex items-center gap-1">
                              <span className='break-all'>{item.username}</span>
                              <button
                                className='cursor-pointer p-1 rounded-full hover:bg-gray-300/40 active:bg-gray-400/50 transition-colors'
                                onClick={() => copyText(item.username)}
                              >
                                <img
                                  src="/icons/copy.svg"
                                  alt="Copy Icon"
                                  height="18"
                                  width="18"
                                />
                              </button>
                            </div>
                          </div>
                          <div>
                            <div className="mt-0.5 flex items-center gap-1">
                              <span className='break-all'>{'*'.repeat(item.password?.length)}</span>
                              <button
                                className='cursor-pointer p-1 rounded-full hover:bg-gray-300/40 active:bg-gray-400/50 transition-colors'
                                onClick={() => copyText(item.password)}
                              >
                                <img
                                  src="/icons/copy.svg"
                                  alt="Copy Icon"
                                  height="18"
                                  width="18"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className='align-middle px-3 py-3'>
                        <div className="flex flex-col items-center justify-center gap-2">
                          <button
                            className='cursor-pointer p-1 rounded-full hover:bg-gray-300/40 active:bg-gray-400/50 transition-colors'
                            onClick={() => handleEdit(item.id)}
                          >
                            <img
                              src="/icons/edit.svg"
                              alt="Edit Icon"
                              height="22"
                              width="22"
                            />
                          </button>
                          <button
                            className='cursor-pointer p-1 rounded-full hover:bg-gray-300/40 active:bg-gray-400/50 transition-colors'
                            onClick={() => handleDelete(item.id)}
                          >
                            <img
                              src="/icons/delete.svg"
                              alt="Delete Icon"
                              height="22"
                              width="22"
                            />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Desktop: 4-column table */}
              <table className="table-auto w-full rounded-lg overflow-hidden hidden md:table">
                <thead className='bg-sky-800 text-white'>
                  <tr>
                    <th className='py-2'>Site</th>
                    <th className='py-2'>Username</th>
                    <th className='py-2'>Password</th>
                    <th className='py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody className='bg-sky-200'>
                  {passwordArray.map(item => (
                    <tr key={item.id}>
                      <td className='w-[28%] py-2 border border-white'>
                        <div className='flex justify-center items-center gap-1'>
                          <a href={item.site} target='_blank' className='break-all'>{item.site}</a>
                          <div className='cursor-pointer p-1 rounded-full hover:bg-gray-400/30 active:bg-gray-400/50 transition-colors'
                            onClick={() => copyText(item.site)}>
                            <img
                              src="/icons/copy.svg"
                              alt="Copy Icon"
                              height="25"
                              width="25"
                            />
                          </div>
                        </div>
                      </td>
                      <td className='w-[28%] py-2 border border-white'>
                        <div className='flex justify-center items-center gap-1'>
                          <span className='break-all'>{item.username}</span>
                          <div className='cursor-pointer p-1 rounded-full hover:bg-gray-400/30 active:bg-gray-400/50 transition-colors'
                            onClick={() => copyText(item.username)}>
                            <img
                              src="/icons/copy.svg"
                              alt="Copy Icon"
                              height="25"
                              width="25"
                            />
                          </div>
                        </div>
                      </td>
                      <td className='w-[28%] py-2 border border-white'>
                        <div className='flex justify-center items-center gap-1'>
                          <span className='break-all'>{'*'.repeat(item.password?.length)}</span>
                          <div className='cursor-pointer p-1 rounded-full hover:bg-gray-400/30 active:bg-gray-400/50 transition-colors'
                            onClick={() => copyText(item.password)}>
                            <img
                              src="/icons/copy.svg"
                              alt="Copy Icon"
                              height="25"
                              width="25"
                            />
                          </div>
                        </div>
                      </td>
                      <td className='w-[15%] py-2 border border-white'>
                        <div className='flex justify-center items-center'>
                          <div className='cursor-pointer p-1 rounded-full hover:bg-gray-400/30 active:bg-gray-400/50 transition-colors'
                            onClick={() => handleEdit(item.id)}>
                            <img
                              src="/icons/edit.svg"
                              alt="Copy Icon"
                              height="25"
                              width="25"
                            />
                          </div>
                          <div className='cursor-pointer p-1 rounded-full hover:bg-gray-400/30 active:bg-gray-400/50 transition-colors'
                            onClick={() => handleDelete(item.id)}>
                            <img
                              src="/icons/delete.svg"
                              alt="Copy Icon"
                              height="25"
                              width="25"
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default Passwords
