import { useTranslation } from "react-i18next";

const PagePlaceholder = ({ pageKey, route }) => {
    const { t, i18n } = useTranslation();
    const isReady = i18n?.isInitialized && typeof t === 'function';

    if (!isReady) {
        return <div className="h-[300px] animate-pulse bg-neutral-900/50 rounded-xl" />;
    }

    const sections = t(`pages.${pageKey}.sections`, { returnObjects: true });

    return (
        <main className="mx-auto max-w-3xl px-6 py-8 pb-12 text-start">
            <header>
                <h1 className="mb-2 text-[1.75rem] font-semibold text-neutral-100">
                    {t(`pages.${pageKey}.title`)}
                </h1>
                {route && (
                    <code
                        className="inline-block rounded bg-kashf-muted px-2 py-0.5 text-sm text-kashf-light-blue"
                        dir="ltr"
                    >
                        {route}
                    </code>
                )}
            </header>
            <p className="my-5 leading-relaxed text-neutral-400">
                {t(`pages.${pageKey}.description`)}
            </p>
            {Array.isArray(sections) && sections.length > 0 && (
                <section>
                    <h2 className="mb-3 text-base font-semibold tracking-wide text-neutral-200 uppercase">
                        {t("common.plannedContent")}
                    </h2>
                    <ul className="list-disc space-y-1 ps-5 leading-relaxed text-neutral-500">
                        {sections.map((item) => (
                            <li key={item}>{item}</li>
                        ))}
                    </ul>
                </section>
            )}
        </main>
    );
};

export default PagePlaceholder;
