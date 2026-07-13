import { motion } from "framer-motion";

const SmartMeterNeedle = () => (
    <>
        <motion.div
            className="absolute bottom-[44%] left-1/2 w-4 h-[84px] origin-bottom z-10 pointer-events-none"
            initial={{ rotate: -105, x: "-50%" }}
            whileInView={{ rotate: 78, x: "-50%" }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.6 }}
            style={{ transformOrigin: "bottom center" }}
        >
            <svg className="w-full h-full" viewBox="0 0 16 84" fill="none">
                <path
                    d="M8 0L12 65L8 84L4 65L8 0Z"
                    fill="black"
                    opacity="0.3"
                    className="translate-x-[1px] translate-y-[2px]"
                />
                <path
                    d="M8 0L11 65L8 80L5 65L8 0Z"
                    fill="url(#needle-gradient)"
                />
                <circle cx="8" cy="65" r="2.5" fill="#f43f5e" />

                <defs>
                    <linearGradient id="needle-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#ef4444" />
                        <stop offset="70%" stopColor="#dc2626" />
                        <stop offset="100%" stopColor="#991b1b" />
                    </linearGradient>
                </defs>
            </svg>
        </motion.div>
        <div className="absolute bottom-[44%] left-1/2 size-6 -translate-x-1/2 translate-y-1/2 rounded-full bg-gradient-to-tr from-neutral-900 via-neutral-700 to-neutral-500 p-[1px] shadow-[0_4px_8px_rgba(0,0,0,0.5),inset_0_1px_2px_rgba(255,255,255,0.2)] flex items-center justify-center z-20">
            <div className="size-full rounded-full bg-gradient-to-b from-neutral-800 to-neutral-950 flex items-center justify-center">
                <div className="size-2 rounded-full bg-neutral-900 shadow-[inset_0_1px_2px_rgba(0,0,0,0.8)] border border-neutral-800/40" />
            </div>
        </div>
    </>
);

export default SmartMeterNeedle;