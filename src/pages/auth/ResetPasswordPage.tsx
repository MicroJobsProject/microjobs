// DEPENDENCIES
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { Link, useSearchParams, useNavigate } from "react-router";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

// NATIVE
import { useResetPasswordAction, useAuth } from "../../store/hooks";
import Alert from "../../components/ui/Alert"; // ✅ Importar Alert

interface ErrorResponse {
  error: string;
}

function ResetPasswordPage() {
  const { t } = useTranslation("forgot-password");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const resetPasswordAction = useResetPasswordAction();
  const isLogged = useAuth();

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isLogged) {
      navigate("/home", { replace: true });
      return;
    }

    if (!token) {
      setErrors({ general: "Invalid reset link" });
    }
  }, [token, isLogged, navigate]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }

    if (errors.general) {
      setErrors((prev) => ({ ...prev, general: "" }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors: { [key: string]: string } = {};

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (!token) {
      setErrors({ general: "Invalid token" });
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      await resetPasswordAction(token, formData.password);
      setSuccess(true);
    } catch (error) {
      const axiosError = error as AxiosError<ErrorResponse>;
      const errorMessage =
        axiosError.response?.data?.error || "Error resetting password";

      setErrors({ general: errorMessage });
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="wrapper">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-container border-border rounded-xl border p-8 shadow-sm">
              <div className="mb-4 flex justify-center">
                <span className="material-symbols-outlined text-success text-6xl">
                  check_circle
                </span>
              </div>
              <h2 className="text-heading">Password Reset Successful!</h2>
              <p className="text-paragraph">
                Your password has been updated successfully.
              </p>
              <p className="text-paragraph text-sm">
                Logging you in and redirecting...
              </p>
              <div className="mt-4 flex justify-center">
                <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="wrapper">
        <div className="flex items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-container border-border rounded-xl border p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-heading">Reset Password</h2>
                  <p className="text-paragraph text-left">
                    Enter your new password below.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-heading block text-sm font-medium"
                  >
                    New Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-paragraph text-xl opacity-60">
                        lock
                      </span>
                    </div>
                    <input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Minimum 6 characters"
                      required
                      disabled={loading}
                      className={`bg-container text-paragraph placeholder:text-paragraph/60 block w-full rounded-lg border py-2 pr-10 pl-10 text-sm focus:ring-1 focus:outline-none ${
                        errors.password
                          ? "border-destructive focus:border-destructive focus:ring-destructive"
                          : "border-border focus:border-primary focus:ring-primary"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      <span className="material-symbols-outlined text-paragraph text-xl">
                        {showPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-destructive text-sm">
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="confirmPassword"
                    className="text-heading block text-sm font-medium"
                  >
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span className="material-symbols-outlined text-paragraph text-xl opacity-60">
                        lock
                      </span>
                    </div>
                    <input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      required
                      disabled={loading}
                      className={`bg-container text-paragraph placeholder:text-paragraph/60 block w-full rounded-lg border py-2 pr-10 pl-10 text-sm focus:ring-1 focus:outline-none ${
                        errors.confirmPassword
                          ? "border-destructive focus:border-destructive focus:ring-destructive"
                          : "border-border focus:border-primary focus:ring-primary"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      <span className="material-symbols-outlined text-paragraph text-xl">
                        {showConfirmPassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-destructive text-sm">
                      {errors.confirmPassword}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={
                    loading || !formData.password || !formData.confirmPassword
                  }
                  className={`btn btn-primary w-full ${loading || !formData.password || !formData.confirmPassword ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Resetting...
                    </div>
                  ) : (
                    "Reset Password"
                  )}
                </button>

                <div className="text-center">
                  <Link to="/login" className="btn btn-outlined w-full">
                    Back to Login
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {errors.general && (
        <Alert
          text={
            errors.general.includes("expired") ||
            errors.general.includes("Invalid")
              ? `${errors.general} Click here to request a new link.`
              : errors.general
          }
          variant="error"
          onClick={() => {
            if (
              errors.general.includes("expired") ||
              errors.general.includes("Invalid")
            ) {
              navigate("/forgot-password");
            } else {
              setErrors((prev) => ({ ...prev, general: "" }));
            }
          }}
        />
      )}
    </>
  );
}

export default ResetPasswordPage;
