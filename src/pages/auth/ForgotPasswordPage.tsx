// DEPENDENCIES
import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link } from "react-router";
import type { AxiosError } from "axios";
import { useTranslation } from "react-i18next";

// NATIVE
import { forgotPassword } from "./service";
import { isValidEmail } from "../../utils/validation";
import Alert from "../../components/ui/Alert";

interface ErrorResponse {
  error: string;
}

function ForgotPasswordPage() {
  const { t } = useTranslation("forgot-password");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setEmail(event.target.value);
    if (error) setError("");
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError(t("errorValidEmail"));
      return;
    }

    setLoading(true);
    setError("");

    try {
      await forgotPassword(email);
      setSuccess(true);
    } catch (err) {
      const axiosError = err as AxiosError<ErrorResponse>;
      setError(axiosError.response?.data?.error || t("errorSendingEmail"));
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
                <span
                  className="material-symbols-outlined text-success text-6xl"
                  aria-hidden="true"
                >
                  mark_email_read
                </span>
              </div>
              <h2 className="text-heading">{t("emailSent")}</h2>
              <p className="text-paragraph">{t("emailSentParagraph")}</p>
              <p className="text-paragraph text-sm">{t("emailSentHelp")}</p>
              <Link to="/login" className="btn btn-outlined mt-4 w-full">
                {t("backToLogin")}
              </Link>
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
                  <h2 className="text-heading">{t("forgotTitle")}</h2>
                  <p className="text-paragraph text-left">
                    {t("forgotSubtitle")}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-heading block text-sm font-medium"
                  >
                    {t("email")}
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <span
                        className="material-symbols-outlined text-paragraph text-xl opacity-60"
                        aria-hidden="true"
                      >
                        mail
                      </span>
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={email}
                      onChange={handleChange}
                      placeholder={t("emailPlaceholder")}
                      required
                      disabled={loading}
                      className="bg-container text-paragraph placeholder:text-paragraph/60 border-border focus:border-primary focus:ring-primary block w-full rounded-lg border py-2 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading || !email}
                  className={`btn btn-primary w-full ${loading || !email ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {loading ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      {t("sendPending")}
                    </div>
                  ) : (
                    t("send")
                  )}
                </button>

                <div className="space-y-2 text-center">
                  <Link to="/login" className="btn btn-outlined block w-full">
                    {t("backToLogin")}
                  </Link>
                  <p className="text-paragraph text-sm">
                    {t("signUpParagraph")}{" "}
                    <Link
                      to="/register"
                      className="text-primary hover:text-primary-hover font-medium transition-colors"
                    >
                      {t("signUpLink")}
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Alert text={t(error)} variant="error" onClick={() => setError("")} />
      )}
    </>
  );
}

export default ForgotPasswordPage;
