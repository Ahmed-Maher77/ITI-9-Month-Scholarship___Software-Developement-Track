import { useEffect, useId, useMemo } from "react";
import { useTranslation } from "react-i18next";

const ProfilePictureUpload = ({ value, onChange, error }) => {
    const { t } = useTranslation();
    const inputId = useId();

    const previewUrl = useMemo(
        () => (value ? URL.createObjectURL(value) : null),
        [value]
    );

    useEffect(() => {
        if (!previewUrl) {
            return;
        }

        return () => URL.revokeObjectURL(previewUrl);
    }, [previewUrl]);

    const handleFileChange = (event) => {
        const file = event.target.files?.[0] ?? null;
        onChange(file);
    };

    return (
        <div>
            <label htmlFor={inputId} className="mb-3 block text-sm text-neutral-400">
                {t("register.picture")}
            </label>

            <div className="flex items-center gap-4">
                <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-full border border-kashf-border bg-kashf-muted">
                    {previewUrl ? (
                        <img
                            src={previewUrl}
                            alt={t("register.picturePreviewAlt")}
                            className="size-full object-cover"
                        />
                    ) : (
                        <span className="text-xs text-neutral-500 max-w-[88%] text-center">
                            {t("register.pictureEmpty")}
                        </span>
                    )}
                </div>

                <div>
                    <input
                        id={inputId}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                    />
                    <label
                        htmlFor={inputId}
                        className="inline-block cursor-pointer rounded-md border border-kashf-border px-3 py-2 text-sm text-kashf-light-blue transition-colors hover:border-kashf-blue"
                    >
                        {t("register.pictureChoose")}
                    </label>
                    {value && (
                        <button
                            type="button"
                            onClick={() => onChange(null)}
                            className="ms-3 cursor-pointer border-none bg-transparent text-sm text-neutral-500 hover:text-red-400"
                        >
                            {t("register.pictureRemove")}
                        </button>
                    )}
                </div>
            </div>

            {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
        </div>
    );
};

export default ProfilePictureUpload;
