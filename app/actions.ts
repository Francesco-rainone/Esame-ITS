"use server";

import type { FieldConfig } from "@/utils/types";
import { cookies } from "next/dist/server/request/cookies";

export interface FormState {
  success: boolean;
  message: string;
}

const BACKEND_URL = process.env.SPRING_BOOT_API_URL || "http://localhost:8080";

export async function submitCandidatura(
  fields: FieldConfig[],
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // 1. Estrae i dati dal FormData
  const payload: Record<string, unknown> = {};
  fields.forEach(field => {
    const value = formData.get(field.name);
    payload[field.name] = field.type === 'checkbox' ? value === 'on' : value;
  });

  try {
    const response = await fetch(`${BACKEND_URL}/api/richieste`, {  
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Errore API (HTTP ${response.status}): ${errorText}`);
    }

    return {
      success: true,
      message: "🎉 Prenotazione inviata! Ti contatteremo entro 5 giorni lavorativi.",
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Errore sconosciuto durante l'invio.";
    return {
      success: false,
      message: `❌ Si è verificato un errore: ${errorMessage}`,
    };
  }
}

const requireAuth = async () => {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin-session")?.value;
  if (!session) throw new Error("Non autorizzato");
};

export async function updateCandidaturaStatus(id: number, newState: string) {
  await requireAuth();

  const url = `${BACKEND_URL}/api/richieste/${id}`; 

  const res = await fetch(url, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ stato: newState }),
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Errore sconosciuto" }));
    return { success: false, message: errorData.message || "Errore nell'aggiornamento" };
  }

  return { success: true, message: `Stato aggiornato a ${newState}` };
}

export async function deleteCandidatura(id: number) {
  await requireAuth();

  const url = `${BACKEND_URL}/api/richieste/${id}`; 

  const res = await fetch(url, {
    method: "DELETE",
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({ message: "Errore sconosciuto" }));
    return { success: false, message: errorData.message || "Errore nella cancellazione" };
  }

  return { success: true, message: "Prenotazione cancellata" };
}
