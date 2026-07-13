const SmartMeterNumbers = () => (
    <svg
        className="absolute inset-0 size-full pointer-events-none z-10"
        viewBox="0 0 200 200"
    >
        <text
            x="35"
            y="146"
            fill="#4b5563"
            fontSize="7"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
        >
            0
        </text>
        <text
            x="32"
            y="80"
            fill="#4b5563"
            fontSize="7"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
            transform="rotate(-10 32 80)"
        >
            100
        </text>
        <text
            x="100"
            y="30"
            fill="#4b5563"
            fontSize="7"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
        >
            200
        </text>
        <text
            x="168"
            y="80"
            fill="#4b5563"
            fontSize="7"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
            transform="rotate(10 168 80)"
        >
            300
        </text>
        <text
            x="160"
            y="146"
            fill="#4b5563"
            fontSize="7"
            fontWeight="bold"
            fontFamily="monospace"
            textAnchor="middle"
            transform="rotate(10 166 146)"
        >
            400+
        </text>
    </svg>
);

export default SmartMeterNumbers;