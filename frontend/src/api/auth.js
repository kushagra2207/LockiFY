const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getCurrentUser() {
    const res = await fetch(`${API_URL}/auth/me`, {
        method: 'GET',
        credentials: "include"
    })

    if (!res.ok) return null

    const data = await res.json()
    return data.user || null
}

export async function logoutUser() {
    const res = await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
    })

    if (!res.ok) throw new Error("Logout failed")

    return res.json()
}

export function loginWithGoogle() {
    window.location.href = `${API_URL}/auth/google`
}