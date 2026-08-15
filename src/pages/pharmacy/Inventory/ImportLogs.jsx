import { useEffect, useState } from "react";
import { getImportLogs } from "../../../services/pharmacyService.js";

function ImportLogs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        async function fetchLogs() {
            try {
                const response = await getImportLogs();

                setLogs(response.data.data.data);
            } catch (error) {
                console.log(error);
                setError("Failed to load import logs.");
            } finally {
                setLoading(false);
            }
        }

        fetchLogs();
    }, []);

    if (loading) {
        return <h2>Loading...</h2>;
    }

    if (error) {
        return <h2>{error}</h2>;
    }

    return (
        <div className="max-w-6xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">
                Import Logs
            </h1>

            {logs.length === 0 ? (
                <div className="bg-white rounded-2xl p-8 text-center shadow-sm border border-slate-100">
                    <p className="text-slate-500">
                        No import logs found.
                    </p>
                </div>
            ) : (
                <div className="grid gap-5">
                    {logs.map((log) => (
                        <div
                            key={log.id}
                            className="bg-white rounded-3xl border border-slate-100 shadow-sm p-6"
                        >
                            <div className="flex justify-between items-start">
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">
                                        {log.file_name}
                                    </h2>

                                    <p className="text-sm text-slate-500 mt-1">
                                        Imported on{" "}
                                        {new Date(log.created_at).toLocaleString()}
                                    </p>
                                </div>

                                <span
                                    className={`px-4 py-2 rounded-full text-xs font-bold ${
                                        log.failed_rows === 0
                                            ? "bg-emerald-100 text-emerald-700"
                                            : "bg-amber-100 text-amber-700"
                                    }`}
                                >
                                    {log.failed_rows === 0
                                        ? "Success"
                                        : "Completed with Errors"}
                                </span>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mt-6">
                                <div className="bg-slate-50 rounded-xl p-4">
                                    <p className="text-xs text-slate-500">
                                        Total Rows
                                    </p>

                                    <p className="text-2xl font-bold">
                                        {log.total_rows}
                                    </p>
                                </div>

                                <div className="bg-emerald-50 rounded-xl p-4">
                                    <p className="text-xs text-emerald-600">
                                        Imported
                                    </p>

                                    <p className="text-2xl font-bold text-emerald-700">
                                        {log.imported_rows}
                                    </p>
                                </div>

                                <div className="bg-rose-50 rounded-xl p-4">
                                    <p className="text-xs text-rose-600">
                                        Failed
                                    </p>

                                    <p className="text-2xl font-bold text-rose-700">
                                        {log.failed_rows}
                                    </p>
                                </div>
                            </div>

                            {log.errors?.length > 0 && (
                                <div className="mt-6">
                                    <h3 className="font-semibold text-rose-600 mb-3">
                                        Errors
                                    </h3>

                                    <div className="space-y-3">
                                        {log.errors.map((error, index) => (
                                            <div
                                                key={index}
                                                className="bg-rose-50 border border-rose-200 rounded-xl p-4"
                                            >
                                                <p className="font-semibold mb-2">
                                                    Row {error.row}
                                                </p>

                                                <ul className="list-disc list-inside text-sm text-rose-700">
                                                    {error.errors.map((message, i) => (
                                                        <li key={i}>
                                                            {message}
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default ImportLogs;