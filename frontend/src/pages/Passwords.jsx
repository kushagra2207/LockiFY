import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast, Bounce } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import { getPasswords, addPassword, updatePassword, deletePassword } from '../api/passwords'

const Passwords = () => {
  const ref = useRef()
  const passwordRef = useRef()
  const isEdit = useRef(false)
  const [form, setForm] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setPasswordArray] = useState([])

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

  const showPassword = () => {
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    } else {
      ref.current.src = "icons/eyecross.png"
      passwordRef.current.type = "text"
    }
  }

  const savePassword = async () => {
    try {
      if (!isEdit.current) {
        const newPassword = await addPassword(form)
        setPasswordArray([...passwordArray, newPassword.data])
        toast.success('Password Saved Successfully!')
      } else {
        const updated = await updatePassword(form.id, form)
        setPasswordArray(passwordArray.map(item => item.id === updated.data.id ? updated.data : item))
        toast.success('Password Updated Successfully!')
        isEdit.current = false
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

        <div className='flex flex-col items-center w-full sm:w-4/5 mx-auto gap-8 p-4'>
          <input value={form.site} onChange={handleChange} placeholder='Enter Website URL'
            className='border border-sky-600 rounded-full px-4 py-1 w-full' type="text" name='site' />

          <div className="flex flex-col sm:flex-row justify-between gap-8 w-full">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username'
              className='border border-sky-600 rounded-full px-4 py-1 w-full' type="text" name='username' />
            <div className='w-full relative'>
              <input ref={passwordRef} value={form.password} onChange={handleChange}
                placeholder='Enter Password' className='border border-sky-600 rounded-full px-4 py-1 w-full'
                type="password" name='password' />
              <span className='absolute right-2 top-1.75 cursor-pointer' onClick={showPassword}>
                <img ref={ref} width={20} src="icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={savePassword} disabled={!isFormValid}
            className='flex justify-center items-center bg-sky-500 hover:bg-sky-600 active:bg-sky-700 disabled:cursor-not-allowed disabled:hover:bg-sky-500 rounded-full w-fit px-6 py-2 gap-2 border-sky-900 border'>
            <lord-icon src="https://cdn.lordicon.com/efxgwrkc.json" trigger="hover"></lord-icon>
            <span className='text-lg'>Save</span>
          </button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>
          {passwordArray.length === 0 && <div>No passwords to show</div>}
          {passwordArray.length > 0 && (
            <table className="table-auto w-full rounded-lg overflow-hidden">
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
                        <div className='cursor-pointer p-1 rounded-full hover:bg-gray-300/30 active:bg-gray-400/50'
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
                        <div className='cursor-pointer p-1 rounded-full hover:bg-gray-300/30 active:bg-gray-400/50'
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
                        <div className='cursor-pointer p-1 rounded-full hover:bg-gray-300/30 active:bg-gray-400/50'
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
                        <div className='cursor-pointer p-1 rounded-full hover:bg-gray-300/30 active:bg-gray-400/50'
                          onClick={() => handleEdit(item.id)}>
                          <img
                            src="/icons/edit.svg"
                            alt="Copy Icon"
                            height="25"
                            width="25"
                          />
                        </div>
                        <div className='cursor-pointer p-1 rounded-full hover:bg-gray-300/30 active:bg-gray-400/50'
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
          )}
        </div>
      </div>
    </>
  )
}

export default Passwords