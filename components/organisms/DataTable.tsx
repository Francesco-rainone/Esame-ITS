"use client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck, faXmark, faTrash } from "@fortawesome/free-solid-svg-icons";
import Badge from "@/components/atoms/Badge";
import Spinner from "@/components/atoms/Spinner";
import { useTableData } from "@/utils/hooks/useTableData";
import { useTableActions, type ActionType } from "@/utils/hooks/useTableActions";
import type { ColumnDef, StatusMap, BadgeColor } from "@/utils/types";


interface DataTableProps<T> {
  columns: ColumnDef<T>[];
  endpoint?: string;
  staticData?: T[] | null;
  title?: string;
  emptyMsg?: string;
  refreshKey?: number;
  statusMap?: StatusMap;
  pageSize?: number;
  enableActions?: boolean;
  filter?: { key: string; value: string };
}


const AUTO_STATUS_COLOR: Record<string, BadgeColor> = {
  "in attesa":    "yellow",
  "approvato":    "green",
  "verificato":   "green",
  "attivo":       "green",
  "rifiutato":    "red",
  "disattivato":  "red",
  "in revisione": "blue",
  "bozza":        "gray",
  "false":        "gray",
  "true":         "green",
};

const guessColor = (val: unknown): BadgeColor =>
  AUTO_STATUS_COLOR[String(val).toLowerCase()] ?? "blue";

const isStatusCol = (key: string): boolean =>
  ["stato", "status", "statoapprovazione", "statoappr", "state"].includes(
    key.toLowerCase()
  );

interface ActionButtonsProps {
  id: number;
  onAction: (action: ActionType, id: number) => Promise<void>;
}

const ActionButtons = ({ id, onAction }: ActionButtonsProps) => (
  <div className="flex items-center gap-2">
    <button
      onClick={() => onAction("approve", id)}
      className="p-1.5 rounded-lg text-green-600 hover:bg-green-50 hover:text-green-800 transition-colors"
      title="Approva"
      aria-label="Approva prenotazione"
    >
      <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4" />
    </button>
    <button
      onClick={() => onAction("reject", id)}
      className="p-1.5 rounded-lg text-yellow-600 hover:bg-yellow-50 hover:text-yellow-800 transition-colors"
      title="Rifiuta"
      aria-label="Rifiuta prenotazione"
    >
      <FontAwesomeIcon icon={faXmark} className="w-4 h-4" />
    </button>
    <button
      onClick={() => onAction("delete", id)}
      className="p-1.5 rounded-lg text-red-600 hover:bg-red-50 hover:text-red-800 transition-colors"
      title="Cancella"
      aria-label="Cancella prenotazione"
    >
      <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
    </button>
  </div>
);

export default function DataTable<T extends { id: number | string }>({
  columns,
  endpoint = "",
  staticData = null,
  title = "",
  emptyMsg = "Nessun dato disponibile.",
  refreshKey = 0,
  statusMap = {},
  pageSize = 0,
  enableActions = false,
  filter,
}: DataTableProps<T>) {
  const {
    data,
    loading,
    error,
    currentPage,
    totalPages,
    paginatedData,
    setCurrentPage,
    fetchData,
  } = useTableData<T>(endpoint, staticData, refreshKey, filter, pageSize);

  const { handleAction } = useTableActions(fetchData);

  const renderCell = (col: ColumnDef<T>, row: T) => {
    const val = row[col.key];
    if (col.render) return col.render(val, row);

    if (col.badge || isStatusCol(String(col.key))) {
      if (val === null || val === undefined)
        return <span className="text-gray-300">—</span>;
      const mapped = statusMap[String(val)];
      const color  = mapped?.color ?? guessColor(val);
      const label  = mapped?.label ?? String(val);
      return <Badge color={color} dot size="sm">{label}</Badge>;
    }

    if (val === null || val === undefined || val === "")
      return <span className="text-gray-300">—</span>;
    return String(val);
  };

  return (
    <section className="w-full">
      {title && (
        <h2 className="text-xl font-bold text-gray-900 mb-4">{title}</h2>
      )}

      {loading && (
        <div className="flex items-center gap-3 py-10 text-gray-400 text-sm">
          <Spinner size="md" color="text-blue-600" />
          Caricamento in corso…
        </div>
      )}

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm">
          ⚠️ Impossibile caricare i dati: {error}
        </div>
      )}

      {!loading && !error && (!paginatedData || paginatedData.length === 0) && (
        <div className="py-14 text-center text-gray-400 text-sm">{emptyMsg}</div>
      )}

      {!loading && !error && paginatedData && paginatedData.length > 0 && (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider w-8">
                    #
                  </th>
                  {columns.map((c) => (
                    <th
                      key={String(c.key)}
                      className="px-6 py-3 text-left text-xs font-bold text-gray-400 uppercase tracking-wider whitespace-nowrap"
                    >
                      {c.label}
                    </th>
                  ))}
                  {enableActions && (
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Azioni
                    </th>
                  )}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {paginatedData.map((row, i) => (
                  <tr key={row.id as number}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {(currentPage - 1) * (pageSize || 0) + i + 1}
                    </td>
                    {columns.map((col) => (
                      <td
                        key={String(col.key)}
                        className="px-6 py-4 whitespace-nowrap text-sm text-gray-700"
                      >
                        {renderCell(col, row)}
                      </td>
                    ))}
                    {enableActions && (
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <ActionButtons id={row.id as number} onAction={handleAction} />
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <nav
              className="flex items-center justify-between mt-4 text-sm text-gray-500"
              aria-label="Paginazione"
            >
              <span>{data?.length ?? 0} elementi totali</span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  aria-label="Pagina precedente"
                  className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  ← Prec
                </button>
                <span className="px-2">{currentPage} / {totalPages}</span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage >= totalPages}
                  aria-label="Pagina successiva"
                  className="px-3 py-1.5 rounded-lg border border-gray-200 hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition"
                >
                  Succ →
                </button>
              </div>
            </nav>
          )}
        </>
      )}
    </section>
  );
}