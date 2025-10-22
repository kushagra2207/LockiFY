const API_URL = import.meta.env.VITE_API_BASE_URL

export async function getPasswords() {
    const res = await fetch(`${API_URL}/api/passwords`, {
        method: "GET",
        credentials: "include",
    })

    if (!res.ok) throw new Error("Failed to fetch passwords")

    return res.json()
}

export async function addPassword(entry) {
    const res = await fetch(`${API_URL}/api/passwords`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(entry),
    })

    if (!res.ok) throw new Error("Failed to add password")

    return res.json()
}

export async function updatePassword(id, updatedEntry) {
  const res = await fetch(`${API_URL}/api/passwords/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(updatedEntry),
  })

  if (!res.ok) throw new Error("Failed to update password")
  return res.json()
}

export async function deletePassword(id) {
    const res = await fetch(`${API_URL}/api/passwords/${id}`, {
        method: "DELETE",
        credentials: "include",
    })

    if (!res.ok) throw new Error("Failed to delete password")

    return res.json()
}