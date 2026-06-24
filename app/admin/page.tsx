"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import DataTable from "@/components/organisms/DataTable"; 
import type { ColumnDef, StatusMap } from "@/utils/types";
import { logout } from "@/app/auth/actions";
import type { Candidatura } from "@/utils/types";

const COLUMNS: ColumnDef<Candidatura>[] = [
  { key: "numeroPersone",       label: "Numero Persone" },
  { key: "spazioSelezionato",   label: "Spazio Selezionato" },
  { key: "città",               label: "Città" },
  { key: "azienda",             label: "Azienda" },
  { key: "email",               label: "Email" },
  { key: "statoApprovazione",   label: "Stato", badge: true },
  {
    key: "dataRegistrazione",
    label: "Data invio",
    render: (value) =>
      value
        ? new Date(String(value)).toLocaleDateString("it-IT")
        : "—",
  },
];

const STATUS_MAP: StatusMap = {
  "In Attesa":  { color: "yellow" },
  "Approvato":  { color: "green" },
  "Rifiutato":  { color: "red" },
};

const API_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL || "http://localhost:8080";

const LogoutButton = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <button
      onClick={handleLogout}
      className="px-4 py-2 rounded-xl bg-gray-100 text-gray-600 hover:bg-gray-200 transition text-sm font-medium"
    >
      Esci
    </button>
  );
};

export default function AdminPage() {
  return (
    <div className="bg-white min-h-screen p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Gestione Prenotazioni
        </h1>
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-xl bg-blue-700 text-white text-sm font-semibold hover:bg-blue-800 transition shadow-sm"
          >
            Home
          </Link>
          <LogoutButton />
        </div>
      </div>

      <DataTable<Candidatura>
        endpoint={`${API_URL}/api/richieste`}
        columns={COLUMNS}
        statusMap={STATUS_MAP}
        enableActions={true}
        title="Tutte le Prenotazioni"
        emptyMsg="Nessuna prenotazione presente."
        pageSize={10}
      />
    </div>
  );
}