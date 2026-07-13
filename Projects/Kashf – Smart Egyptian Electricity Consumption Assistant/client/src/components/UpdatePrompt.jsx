import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdatePrompt() {
    const {
        needRefresh: [needRefresh, setNeedRefresh],
        updateServiceWorker,
    } = useRegisterSW({
        onRegisterError(error) {
            console.error('SW registration error:', error)
        },
    })

    if (!needRefresh) return null

    return (
        <div className="fixed bottom-4 left-1/2 z-50 -translate-x-1/2 animate-slide-up">
            <div className="flex items-center gap-3 rounded-xl bg-slate-900 px-5 py-3 shadow-2xl ring-1 ring-white/10">
                <p className="text-sm text-white/90">
                    تم تحديث التطبيق
                </p>
                <button
                    onClick={() => updateServiceWorker(true)}
                    className="rounded-lg bg-emerald-500 px-4 py-1.5 text-sm font-medium text-white transition-colors hover:bg-emerald-400"
                >
                    تحديث
                </button>
                <button
                    onClick={() => setNeedRefresh(false)}
                    className="rounded-lg px-2 py-1.5 text-sm text-white/60 transition-colors hover:text-white/90"
                >
                    إلغاء
                </button>
            </div>
        </div>
    )
}
