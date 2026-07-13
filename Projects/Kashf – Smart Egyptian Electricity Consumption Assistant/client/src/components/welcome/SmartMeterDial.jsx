const SmartMeterDial = () => (
    <svg
        className="absolute inset-0 size-full origin-center scale-[0.96]"
        style={{ rotate: "169.2deg" }}
        viewBox="0 0 200 200"
    >
        <circle
            cx="100"
            cy="100"
            r="89"
            fill="none"
            stroke="#10b981"
            strokeWidth="2.5"
            strokeDasharray="110 418"
            strokeDashoffset="0"
            strokeLinecap="butt"
            className="opacity-80"
        />
        <circle
            cx="100"
            cy="100"
            r="89"
            fill="none"
            stroke="#f59e0b"
            strokeWidth="2.5"
            strokeDasharray="133 395"
            strokeDashoffset="-110"
            strokeLinecap="butt"
            className="opacity-80"
        />
        <circle
            cx="100"
            cy="100"
            r="89"
            fill="none"
            stroke="#ef4444"
            strokeWidth="2.5"
            strokeDasharray="101 427"
            strokeDashoffset="-243"
            strokeLinecap="butt"
            className="opacity-80"
        />
        <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="#2d2d3d"
            strokeWidth="2"
            strokeDasharray="1 3.5"
            strokeLinecap="butt"
        />
        <circle
            cx="100"
            cy="100"
            r="95"
            fill="none"
            stroke="#4b5563"
            strokeWidth="3.5"
            strokeDasharray="1.5 14"
            strokeLinecap="butt"
            className="opacity-70"
        />
    </svg>
);

export default SmartMeterDial;