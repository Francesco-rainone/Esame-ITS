"use server";

import { cookies } from "next/headers";

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || "http://localhost:8080";

export async function login(formData: FormData) {
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  console.log("[login] Tentativo login per:", username);

  try {
    const url = `${BACKEND_URL}/api/auth/login`;
    console.log("[login] Chiamata POST a:", url);

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    console.log("[login] Risposta ricevuta, status:", res.status);

    if (!res.ok) {
      const errorBody = await res.text().catch(() => "Errore sconosciuto");
      console.error("[login] Backend ha risposto con errore:", res.status, errorBody);
      return { success: false, message: "Credenziali errate." };
    }

    // Impostazione cookie di sessione (httpOnly)
    const cookieStore = await cookies();
    cookieStore.set("admin-session", "true", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 8, 
    });

    return { success: true };
  } catch (error) {
    console.error("[login] Errore di rete:", error);
    return { success: false, message: "Errore di rete. Riprova." };
  }
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("admin-session");
}