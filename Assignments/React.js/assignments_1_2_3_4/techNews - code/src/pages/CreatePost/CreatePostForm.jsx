import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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

const CreatePostForm = () => {
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

            // Notify other parts of the app (Posts page) about the new post
            try {
                window.dispatchEvent(
                    new CustomEvent("postCreated", { detail: createdPost }),
                );
            } catch {
                // ignore dispatch errors
            }

            toast.success("Post created successfully.");
            reset(createPostDefaultValues());
        } catch {
            toast.error("Unable to create post. Please check json-server.");
        }
    };

    return (
        <form
            className="create-post-form w-100 p-4 rounded mx-auto"
            style={{ maxWidth: 650 }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
        >
            <h3 className="form-title mb-4">Create New Post</h3>
            <fieldset className="create-post-fieldset" disabled={isSubmitting}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label fw-semibold">
                        Title <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control app-form-control ${errors.title ? "is-invalid" : ""}`}
                        id="title"
                        placeholder="Enter post title"
                        minLength={TITLE_MIN_LENGTH}
                        {...register("title")}
                    />
                    {errors.title ? (
                        <div className="app-field-error">
                            {errors.title.message}
                        </div>
                    ) : null}
                </div>

                <div className="author-category-row mb-3">
                    <div className="author-category-field">
                        <label
                            htmlFor="author"
                            className="form-label fw-semibold"
                        >
                            Author <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control app-form-control ${errors.author ? "is-invalid" : ""}`}
                            id="author"
                            placeholder="Author name"
                            {...register("author")}
                        />
                        {errors.author ? (
                            <div className="app-field-error">
                                {errors.author.message}
                            </div>
                        ) : null}
                    </div>

                    <div className="author-category-field">
                        <label
                            htmlFor="category"
                            className="form-label fw-semibold"
                        >
                            Category <span className="text-danger">*</span>
                        </label>
                        <input
                            type="text"
                            className={`form-control app-form-control ${errors.category ? "is-invalid" : ""}`}
                            id="category"
                            placeholder="e.g. React, AI"
                            minLength={CATEGORY_MIN_LENGTH}
                            {...register("category")}
                        />
                        {errors.category ? (
                            <div className="app-field-error">
                                {errors.category.message}
                            </div>
                        ) : null}
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="image" className="form-label fw-semibold">
                        Image URL <span className="text-danger">*</span>
                    </label>
                    <input
                        type="text"
                        className={`form-control app-form-control ${errors.image ? "is-invalid" : ""}`}
                        id="image"
                        placeholder="https://example.com/image.jpg"
                        {...register("image")}
                    />
                    {errors.image ? (
                        <div className="app-field-error">
                            {errors.image.message}
                        </div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label
                        htmlFor="description"
                        className="form-label fw-semibold"
                    >
                        Description <span className="text-danger">*</span>
                    </label>
                    <textarea
                        className={`form-control app-form-control ${errors.description ? "is-invalid" : ""}`}
                        id="description"
                        rows={3}
                        placeholder="Short post summary..."
                        minLength={DESCRIPTION_MIN_LENGTH}
                        maxLength={DESCRIPTION_MAX_LENGTH}
                        {...register("description")}
                    ></textarea>
                    <div className="app-field-counter">
                        {descriptionValue.length}/{DESCRIPTION_MAX_LENGTH}
                    </div>
                    {errors.description ? (
                        <div className="app-field-error">
                            {errors.description.message}
                        </div>
                    ) : null}
                </div>

                <div className="mb-3">
                    <label htmlFor="content" className="form-label fw-semibold">
                        Content <span className="text-danger">*</span>
                    </label>
                    <textarea
                        className={`form-control app-form-control ${errors.content ? "is-invalid" : ""}`}
                        id="content"
                        rows={5}
                        placeholder="Full post content..."
                        minLength={CONTENT_MIN_LENGTH}
                        {...register("content")}
                    ></textarea>
                    {errors.content ? (
                        <div className="app-field-error">
                            {errors.content.message}
                        </div>
                    ) : null}
                </div>

                <MainButton
                    type="submit"
                    className="create-post-btn mt-3"
                    fullWidth
                    disabled={isSubmitting}
                >
                    {isSubmitting ? "Creating..." : "Create Post"}
                </MainButton>
            </fieldset>
        </form>
    );
};

export default CreatePostForm;
