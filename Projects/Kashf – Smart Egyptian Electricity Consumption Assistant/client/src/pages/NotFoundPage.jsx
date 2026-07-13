import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import BrandLogo from "../components/common/BrandLogo";

const NotFoundPage = () => {
    const { t } = useTranslation();

    return (
        <>
            <Helmet>
                <title>الصفحة غير موجودة — كشف</title>
                <meta name="description" content="عذراً، الصفحة التي تبحث عنها غير موجودة." />
            </Helmet>
            <main className="min-h-screen flex flex-col items-center justify-center px-6 py-12 bg-kashf-bg text-neutral-100">
            <div className="w-full max-w-2xl text-center">
                {/* Logo */}
                <div className="mb-8">
                    <BrandLogo to="/" />
                </div>

                {/* 404 Number */}
                <div className="mb-6">
                    <h1 className="text-[8rem] md:text-[10rem] font-extrabold leading-none text-transparent bg-clip-text opacity-90" style={{
                        backgroundImage: 'linear-gradient(to bottom, var(--color-kashf-blue), var(--color-kashf-light-blue))'
                    }}>
                        404
                    </h1>
                </div>

                {/* Error Message */}
                <h2 className="mb-4 text-2xl md:text-3xl font-semibold text-neutral-100">
                    {t("pages.notFound.title")}
                </h2>

                <p className="mb-10 max-w-md mx-auto text-base md:text-lg text-neutral-400 leading-relaxed">
                    {t("pages.notFound.description")}
                </p>

                {/* Navigation Buttons */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        to="/"
                        className="w-full sm:w-auto px-8 py-3 bg-kashf-blue text-kashf-bg font-semibold rounded-lg hover:bg-kashf-light-blue transition-colors duration-200 no-underline text-center"
                    >
                        {t("notFound.goWelcome") || "Go to Home"}
                    </Link>
                    <Link
                        to="/dashboard"
                        className="w-full sm:w-auto px-8 py-3 bg-kashf-muted text-kashf-light-blue font-semibold rounded-lg hover:bg-kashf-border transition-colors duration-200 no-underline text-center"
                    >
                        {t("notFound.goDashboard") || "Go to Dashboard"}
                    </Link>
                </div>
            </div>
        </main>
        </>
    );
};

export default NotFoundPage;
