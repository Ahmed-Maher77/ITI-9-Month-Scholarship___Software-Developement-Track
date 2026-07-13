import { useTranslation } from "react-i18next";

const TestimonialCard = ({ testimonial }) => {
    const { t } = useTranslation();

    const renderStars = () => (
        <div className="flex gap-1 mb-4">
            {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-4 h-4 fill-kashf-blue" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );

    return (
        <div
            className="
                testimonial-slide
                flex-shrink-0
                w-[calc(100vw-2rem)]
                sm:w-[calc(50%-12px)]
                lg:w-[calc(33.333%-16px)]
                max-w-sm sm:max-w-none
            "
        >
            <div className="h-full bg-kashf-surface border border-kashf-border rounded-2xl p-5 sm:p-6 hover:border-kashf-blue/40 transition-colors duration-300">
                {renderStars()}
                <p className="text-neutral-300 text-sm sm:text-base leading-relaxed mb-6 min-h-[72px]">
                    &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3 sm:gap-4">
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 shrink-0 rounded-full ${testimonial.bgColor} ${testimonial.textColor} flex items-center justify-center font-semibold text-base sm:text-lg`}>
                        {testimonial.initials}
                    </div>
                    <div className="min-w-0">
                        <h4 className="font-semibold text-neutral-100 truncate">
                            {testimonial.name}
                        </h4>
                        <p className="text-xs sm:text-sm text-neutral-500 truncate">
                            {testimonial.title}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;