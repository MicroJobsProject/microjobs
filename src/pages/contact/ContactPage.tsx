//DEPENDENCIES
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import clsx from "clsx";
import axios from "axios";
import { useTranslation } from "react-i18next";

//NATIVE
import { useContactSendAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";
import Alert from "../../components/ui/Alert";

export default function ContactPage() {
  const { advertId } = useParams<{ advertId: string }>();

  const [formData, setFormData] = useState({
    senderName: "",
    senderEmail: "",
    message: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const contactSend = useContactSendAction();
  const ui = useAppSelector(getUi);
  const uiResetErrorAction = useUiResetError();
  const { t } = useTranslation("contact");

  // Limpia errores globales al montar
  useEffect(() => {
    uiResetErrorAction();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.senderName) newErrors.senderName = t("errorNameRequired");
    if (!formData.senderEmail) newErrors.senderEmail = t("errorEmailRequired");
    if (!formData.message) newErrors.message = t("errorMessageRequired");

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await contactSend(advertId!, {
        senderName: formData.senderName,
        senderEmail: formData.senderEmail,
        message: formData.message,
      });

      setFormData({ senderName: "", senderEmail: "", message: "" });
    } catch (error) {
      console.error("Error enviando mensaje de contacto:", error);
    }
  };

  return (
    <div className="flex h-full w-full lg:grid lg:grid-cols-2">
      {/* Formulario */}
      <div className="wrapper flex flex-1 items-center justify-center">
        <div className="bg-container border-border w-full max-w-md rounded-xl border p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <h2 className="text-center">{t("contactTitle")}</h2>
              <p>{t("contactSubtitle")}</p>
            </div>

            {/* Nombre */}
            <div className="flex flex-col">
              <label htmlFor="senderName" className="label">
                {t("name")}
              </label>
              <input
                type="text"
                name="senderName"
                id="senderName"
                placeholder={t("namePlaceholder")}
                value={formData.senderName}
                onChange={handleChange}
                className={clsx("input", errors.senderName && "input-error")}
              />
              {errors.senderName && (
                <p className="text-destructive text-sm">{errors.senderName}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col">
              <label htmlFor="senderEmail" className="label">
                {t("email")}
              </label>
              <input
                type="email"
                name="senderEmail"
                id="senderEmail"
                placeholder={t("emailPlaceholder")}
                value={formData.senderEmail}
                onChange={handleChange}
                className={clsx("input", errors.senderEmail && "input-error")}
              />
              {errors.senderEmail && (
                <p className="text-destructive text-sm">{errors.senderEmail}</p>
              )}
            </div>

            {/* Mensaje */}
            <div className="flex flex-col">
              <label htmlFor="message" className="label">
                {t("message")}
              </label>
              <textarea
                name="message"
                id="message"
                placeholder={t("messagePlaceholder")}
                value={formData.message}
                onChange={handleChange}
                className={clsx(
                  "input min-h-[120px]",
                  errors.message && "input-error",
                )}
              />
              {errors.message && (
                <p className="text-destructive text-sm">{errors.message}</p>
              )}
            </div>

            {/* Botón */}
            <button
              type="submit"
              disabled={ui.pending}
              className="btn btn-primary w-full rounded-lg py-3 text-base font-semibold"
            >
              {ui.pending ? t("sendingMessage") : t("sendMessage")}
            </button>
          </form>

          {ui.error && (
            <Alert
              text={t(
                axios.isAxiosError(ui.error)
                  ? ui.error.response?.data?.error || ui.error.message
                  : ui.error.message,
              )}
              variant="error"
              onClick={() => uiResetErrorAction()}
            />
          )}
        </div>
      </div>

      {/* Imagen lateral */}
      <div className="absolute top-0 right-0 -z-10 hidden h-[calc(100vh-64px)] w-1/2 bg-[url('/contact-image.jpg')] bg-cover bg-center bg-no-repeat lg:block"></div>
    </div>
  );
}
