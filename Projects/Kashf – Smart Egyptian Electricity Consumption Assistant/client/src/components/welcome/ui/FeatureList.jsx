const FeatureList = ({ items, iconWrapClass = "" }) => (
    <ul className="flex flex-col gap-3 mt-2">
        {items.map(({ icon: Icon, label }, i) => (
            <li
                key={i}
                className="flex items-center gap-3 text-neutral-300 text-sm sm:text-base"
            >
                <span
                    className={`w-8 h-8 flex items-center justify-center shrink-0 text-kashf-blue ${iconWrapClass}`}
                >
                    <Icon className="w-4 h-4" />
                </span>
                <span>{label}</span>
            </li>
        ))}
    </ul>
);

export default FeatureList;
