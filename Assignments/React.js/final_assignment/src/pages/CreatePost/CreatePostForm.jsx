import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import "./CreatePostForm.css";
import MainButton from "../../components/common/MainButton/MainButton";
import {
    CATEGORY_MIN_LENGTH,
    CONTENT_MIN_LENGTH,
    createPostDefaultValues,
    createPostSchema,
    DESCRIPTION_MAX_LENGTH,
    DESCRIPTION_MIN_LENGTH,
    TITLE_MIN_LENGTH,
} from "../../validations/createPostValidation";

function translateCreatePostFieldError(t, error) {
    if (!error?.message) return "";
    const key = error.message;
    const countByKey = {
        "validation.titleMin": TITLE_MIN_LENGTH,
        "validation.categoryMin": CATEGORY_MIN_LENGTH,
        "validation.contentMin": CONTENT_MIN_LENGTH,
        "validation.descriptionMin": DESCRIPTION_MIN_LENGTH,
        "validation.descriptionMax": DESCRIPTION_MAX_LENGTH,
    };
    const count = countByKey[key];
    return count !== undefined ? t(key, { count }) : t(key);
}

const CreatePostForm = () => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(createPostSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: createPostDefaultValues(),
    });
    const descriptionValue =
        useWatch({
            control,
            name: "description",
        }) || "";

    const onSubmit = async (formData) => {
        try {
            const res = await axios.post(
                "http://localhost:3000/posts",
                formData,
            );
            const createdPost = res.data;

            try {
                window.dispatchEvent(
                    new CustomEvent("postCreated", { detail: createdPost }),
                );
            } catch {
                // ignore dispatch errors
            }

            toast.success(t("createPost.success"));
            reset(createPostDefaultValues());
        } catch {
            toast.error(t("createPost.error"));
        }
    };

    const requiredMark = <span className="text-danger">*</span>;

    return (
        <form
            className="create-post-form w-100 p-4 rounded mx-auto"
            style={{ maxWidth: 650 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <h3 className="form-title mb-4">{t("createPost.title")}</h3>
            <fieldset className="create-post-fieldset" disabled={isSubmitting}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-semibold">
                        {t("createPost.fieldTitle")} {requiredMark}
                    </label>
                    <input
                        type="text"
                        className={`form-control app-form-control ${errors.title ? "is-invalid" : ""}`}
                        id="title"
                        placeholder={t("createPost.placeholderTitle")}
                        minLength={TITLE_MIN_LENGTH}
                        {...register("title")}
                    />
                    {errors.title ? (
                        <div className="app-field-error">
                            {translateCreatePostFieldError(t, errors.title)}
                        </div>
                    ) : null}
                </div>

                <div className="author-category-row mb-3">
                    <div className="author-category-field">
                        <label
                            htmlFor="author"
                            className="form-label fw-semibold"
                        >
                            {t("createPost.fieldAuthor")} {requiredMark}
                        </label>
                        <input
                            type="text"
                            className={`form-control app-form-control ${errors.author ? "is-invalid" : ""}`}
                            id="author"
                            placeholder={t("createPost.placeholderAuthor")}
                            {...register("author")}
                        />
                        {errors.author ? (
                            <div className="app-field-error">
                                {translateCreatePostFieldError(
                                    t,
                                    errors.author,
                                )}
                            </div>
                        ) : null}
                    </div>

                    <div className="author-category-field">
                        <label
                            htmlFor="category"
                            className="form-label fw-semibold"
                        >
                            {t("createPost.fieldCategory")} {requiredMark}
                        </label>
                        <input
                            type="text"
                            className={`form-control app-form-control ${errors.category ? "is-invalid" : ""}`}
                            id="category"
                            placeholder={t("createPost.placeholderCategory")}
                            minLength={CATEGORY_MIN_LENGTH}
                            {...register("category")}
                        />
                        {errors.category ? (
                            <div className="app-field-error">
                                {translateCreatePostFieldError(
                                    t,
                                    errors.category,
                                )}
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label fw-semibold">
                        {t("createPost.fieldImage")} {requiredMark}
                    </label>
                    <input
                        type="text"
                        className={`form-control app-form-control ${errors.image ? "is-invalid" : ""}`}
                        id="image"
                        placeholder={t("createPost.placeholderImage")}
                        {...register("image")}
                    />
                    {errors.image ? (
                        <div className="app-field-error">
                            {translateCreatePostFieldError(t, errors.image)}
                        </div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="description"
                        className="form-label fw-semibold"
                    >
                        {t("createPost.fieldDescription")} {requiredMark}
                    </label>
                    <textarea
                        className={`form-control app-form-control ${errors.description ? "is-invalid" : ""}`}
                        id="description"
                        rows={3}
                        placeholder={t("createPost.placeholderDescription")}
                        minLength={DESCRIPTION_MIN_LENGTH}
                        maxLength={DESCRIPTION_MAX_LENGTH}
                        {...register("description")}
                    ></textarea>
                    <div className="app-field-counter">
                        {descriptionValue.length}/{DESCRIPTION_MAX_LENGTH}
                    </div>
                    {errors.description ? (
                        <div className="app-field-error">
                            {translateCreatePostFieldError(
                                t,
                                errors.description,
                            )}
                        </div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label fw-semibold">
                        {t("createPost.fieldContent")} {requiredMark}
                    </label>
                    <textarea
                        className={`form-control app-form-control ${errors.content ? "is-invalid" : ""}`}
                        id="content"
                        rows={5}
                        placeholder={t("createPost.placeholderContent")}
                        minLength={CONTENT_MIN_LENGTH}
                        {...register("content")}
                    ></textarea>
                    {errors.content ? (
                        <div className="app-field-error">
                            {translateCreatePostFieldError(t, errors.content)}
                        </div>
                    ) : null}
                </div>

                <MainButton
                    type="submit"
                    className="create-post-btn mt-3"
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting
                        ? t("createPost.submitting")
                        : t("createPost.submit")}
                </MainButton>
            </fieldset>
        </form>
    );
};

export default CreatePostForm;
