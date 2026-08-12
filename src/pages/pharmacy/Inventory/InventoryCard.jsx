function InventoryCard({ item, onEdit }) {
    return (
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden hover:shadow-xl hover:border-teal-100 transition-all duration-300 flex flex-col justify-between group p-5">
            <div className="space-y-4">
                {/* Image */}
                <div className="relative h-48 bg-slate-50 rounded-2xl overflow-hidden">
                    {item.medicine.image ? (
                        <img
                            src={item.medicine.image}
                            alt={item.medicine.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-slate-300 text-4xl">
                            💊
                        </div>
                    )}
                    <span className={`absolute top-3 right-3 text-[11px] font-bold px-3 py-1 rounded-full border shadow-sm backdrop-blur-md ${
                        item.quantity < 5
                            ? "bg-rose-50/90 text-rose-700 border-rose-200"
                            : "bg-emerald-50/90 text-emerald-700 border-emerald-200"
                    }`}>
                        {item.quantity} in stock
                    </span>
                </div>

                {/* Information */}
                <div>
                    <div className="flex justify-between items-start gap-2">
                        <div>
                            <h2 className="text-lg font-extrabold text-slate-900 group-hover:text-teal-600 transition-colors">
                                {item.medicine.name}
                            </h2>
                            <p className="text-xs italic text-slate-500 mt-0.5">
                                {item.medicine.scientific_name}
                            </p>
                        </div>
                        <div className="text-right shrink-0">
                            <span className="text-xl font-black text-teal-600">{item.price}</span>
                            <span className="text-xs font-semibold text-slate-400 ml-1">EGP</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 p-3 rounded-2xl border border-slate-100 mt-3">
                        <div>
                            <span className="block text-slate-400 font-medium">Batch Number</span>
                            <span className="font-mono font-bold text-slate-700">{item.batch_number}</span>
                        </div>
                        <div>
                            <span className="block text-slate-400 font-medium">Expiration</span>
                            <span className="font-bold text-slate-700">
                                {new Date(item.expiration_date).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Button */}
            <button
                type="button"
                onClick={() => onEdit(item)}
                className="mt-5 w-full py-3 px-4 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 focus:outline-none focus:ring-4 focus:ring-teal-500/20 shadow-md shadow-teal-500/20 transition-all duration-200 active:scale-[0.98] flex items-center justify-center gap-2"
            >
                <svg className="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                </svg>
                Edit Item
            </button>
        </div>
    );
}

export default InventoryCard;