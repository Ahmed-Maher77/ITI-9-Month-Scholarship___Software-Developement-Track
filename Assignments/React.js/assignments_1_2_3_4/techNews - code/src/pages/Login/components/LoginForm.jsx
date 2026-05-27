import MainButton from "../../../components/common/MainButton/MainButton";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginDefaultValues, loginSchema } from "../../../validations/loginValidation";

function LoginForm({ onSubmit }) {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: loginDefaultValues,
    });

    const submitHandler = (values) => {
        onSubmit(values);
        reset({ ...values, password: "" });
    };

    return (
        <form
            key="login-form"
            className="auth-form auth-form-panel auth-form-panel--login"
            onSubmit={handleSubmit(submitHandler)}
            autoComplete="off"
            noValidate
        >
            <h1 className="h4 mb-3 text-center">Welcome back</h1>
            <div className="mb-3">
                <label htmlFor="login-email" className="form-label">
                    Email
                </label>
                <input
                    type="email"
                    className={`form-control app-form-control ${errors.email ? "is-invalid" : ""}`}
                    id="login-email"
                    name="login_email"
                    autoComplete="off"
                    placeholder="Enter your email"
                    {...register("email")}
                />
                {errors.email ? (
                    <div className="auth-field-error">{errors.email.message}</div>
                ) : null}
            </div>
            <div className="mb-3">
                <label htmlFor="login-password" className="form-label">
                    Password
                </label>
                <input
                    type="password"
                    className={`form-control app-form-control ${errors.password ? "is-invalid" : ""}`}
                    id="login-password"
                    name="login_password"
                    autoComplete="new-password"
                    placeholder="Enter your password"
                    {...register("password")}
                />
                {errors.password ? (
                    <div className="auth-field-error">{errors.password.message}</div>
                ) : null}
            </div>
            <MainButton
                type="submit"
                className="auth-submit-btn mt-2"
                fullWidth
                disabled={isSubmitting}
            >
                {isSubmitting ? "Logging in..." : "Login"}
            </MainButton>
        </form>
    );
}

export default LoginForm;
