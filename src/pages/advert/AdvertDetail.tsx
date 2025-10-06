// DEPENDENCIES
import { Link, useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import clsx from "clsx";
import { formatDistanceToNow } from "date-fns";
import { enUS, es } from "date-fns/locale";

//NATIVE
import Page from "../../components/layout/Page";
import {
  useAdvertDeleteAction,
  useAdvertsDetailAction,
  useAuth,
  useUiResetError,
  useUser,
  useUserLoadAction,
  useContactSendAction,
  useSuccessMessage,
} from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getAdvertById, getUi } from "../../store/selectors";
import Alert from "../../components/ui/Alert";
import Modal from "../../components/ui/Modal";

//ASSETS
import PlaceholderImage from "/placeholder.png";
import { API_BASE_URL } from "../../config/constants";

function AdvertDetail() {
  const params = useParams();
  const navigate = useNavigate();
  const isLogged = useAuth();
  const user = useUser();
  const loadUser = useUserLoadAction();
  const advertDetailAction = useAdvertsDetailAction();
  const advert = useAppSelector(getAdvertById(params.advertId));
  const { pending, error } = useAppSelector(getUi);
  const uiResetErrorAction = useUiResetError();
  const advertDeleteAction = useAdvertDeleteAction();
  const contactSend = useContactSendAction();
  const successMessage = useSuccessMessage();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { t, i18n } = useTranslation([
    "detail",
    "profile",
    "advert-card",
    "advert-category",
    "contact",
  ]);

  const [contactForm, setContactForm] = useState({
    senderName: user?.username || "",
    senderEmail: user?.email || "",
    subject: "",
    message: "",
  });
  const [contactErrors, setContactErrors] = useState<{ [key: string]: string }>(
    {},
  );

  useEffect(() => {
    if (user) {
      setContactForm((prev) => ({
        ...prev,
        senderName: user.username || "",
        senderEmail: user.email || "",
      }));
    }
  }, [user]);

  const isOwner = user?.id === advert?.owner._id;

  const locale = i18n.language === "es-ES" ? es : enUS;
  const date = advert?.updatedAt ? new Date(advert.updatedAt) : new Date();
  const timeAgo = formatDistanceToNow(date, { locale });

  useEffect(() => {
    if (!params.advertId) {
      return;
    }
    if (!user && isLogged) {
      loadUser();
    }
  }, []);

  useEffect(() => {
    if (params.advertId) {
      advertDetailAction(params.advertId);
    }
  }, [params.advertId]);

  async function handleConfirmDelete() {
    try {
      if (advert && user) {
        await advertDeleteAction(advert?._id);
      }
      setShowDeleteModal(false);
      navigate("/", { replace: true });
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // error
    }
  }

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setContactForm({ ...contactForm, [e.target.name]: e.target.value });
  };

  const validateContactForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!contactForm.subject)
      newErrors.subject = t("contact:errorSubjectRequired");
    if (!contactForm.message)
      newErrors.message = t("contact:errorMessageRequired");

    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateContactForm()) return;

    try {
      await contactSend(params.advertId!, {
        senderName: contactForm.senderName,
        senderEmail: contactForm.senderEmail,
        subject: contactForm.subject,
        message: contactForm.message,
        username: user?.username,
      });

      setContactForm({
        senderName: user?.username || "",
        senderEmail: user?.email || "",
        subject: "",
        message: "",
      });
      setContactErrors({});
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // error
    }
  };

  return (
    <>
      <Page>
        {pending && <p>Loading...</p>}
        <div className="grid grid-cols-1 items-start gap-y-8 lg:grid-cols-3 lg:gap-x-8">
          <div className="bg-container border-border col-span-2 overflow-hidden rounded-xl shadow-sm lg:col-span-2">
            <div className="relative">
              <img
                src={
                  advert?.photo
                    ? `${API_BASE_URL}${advert.photo}`
                    : PlaceholderImage
                }
                alt={
                  advert?.photo
                    ? t("advert-card:ariaAdvertPhoto", { name: advert.name })
                    : t("placeholder")
                }
                className="w-full object-cover"
              />
            </div>
            <div className="p-6">
              {/* Título, etiquetas y precio */}
              <div className="mb-6 flex flex-col items-start justify-between gap-4 sm:flex-row">
                <div className="flex flex-col items-start">
                  <h2 className="">{advert?.name}</h2>
                  <div className="flex flex-col items-start gap-2 md:flex-row md:items-center">
                    <span
                      className="flex justify-center rounded-full bg-amber-300 px-3 py-0.5"
                      aria-label={t(
                        advert?.offer
                          ? "advert-card:ariaAdvertTypeOffer"
                          : "advert-card:ariaAdvertTypeNeed",
                      )}
                    >
                      {t(
                        advert?.offer
                          ? "advert-card:advertTypeOffer"
                          : "advert-card:advertTypeNeed",
                      )}
                    </span>
                    <span aria-hidden="true" className="hidden md:block">
                      ·
                    </span>
                    {advert?.category && (
                      <span>
                        {t(advert.category, {
                          ns: "advert-category",
                          defaultValue: advert.category,
                        })}
                      </span>
                    )}
                    <span aria-hidden="true" className="hidden md:block">
                      ·
                    </span>
                    {advert?.updatedAt && (
                      <span>{t("detail:updatedAgo", { time: timeAgo })}</span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col text-right">
                  <h2 className="!text-primary">{advert?.price}€</h2>
                  <span>{t("per hour")}</span>
                </div>
              </div>
              {isOwner && (
                <div className="mb-6 flex gap-4">
                  <button
                    className="btn btn-destructive"
                    onClick={() => setShowDeleteModal(true)}
                  >
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      delete
                    </span>
                    <span>{t("profile:Delete")}</span>
                  </button>
                </div>
              )}
              <div>
                <h3 className="!mb-4">{t("Description")}</h3>
                <p>{advert?.description}</p>
              </div>
            </div>
          </div>

          <div className="bg-container border-border flex h-auto flex-col gap-4 rounded-xl border p-6 shadow-sm">
            <div className="flex items-center gap-6">
              <img
                src={PlaceholderImage}
                alt={advert?.owner.username}
                className="size-15 rounded-full object-cover"
              />
              <span className="text-heading text-xl">
                {advert?.owner.username}
              </span>
            </div>

            {isLogged && (
              <div className="flex flex-col gap-4">
                {isOwner ? (
                  <Link className="btn btn-primary" to="/profile">
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      account_circle
                    </span>
                    <span>{t("My Profile")}</span>
                  </Link>
                ) : (
                  <>
                    <h3 className="mb-2">{t("contact:contactTitle")}</h3>

                    <form
                      onSubmit={handleContactSubmit}
                      className="flex flex-col gap-3"
                    >
                      <div className="flex flex-col gap-1">
                        <label htmlFor="senderName" className="label text-sm">
                          {t("contact:name")}
                        </label>
                        <input
                          type="text"
                          name="senderName"
                          id="senderName"
                          value={contactForm.senderName}
                          readOnly
                          className="input bg-gray-100"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="senderEmail" className="label text-sm">
                          {t("contact:email")}
                        </label>
                        <input
                          type="email"
                          name="senderEmail"
                          id="senderEmail"
                          value={contactForm.senderEmail}
                          readOnly
                          className="input bg-gray-100"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="subject" className="label text-sm">
                          {t("contact:subject")}
                        </label>
                        <input
                          type="text"
                          name="subject"
                          id="subject"
                          placeholder={t("contact:subjectPlaceholder")}
                          value={contactForm.subject}
                          onChange={handleContactChange}
                          className={clsx(
                            "input",
                            contactErrors.subject && "input-error",
                          )}
                        />
                        {contactErrors.subject && (
                          <p className="text-destructive text-xs">
                            {contactErrors.subject}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <label htmlFor="message" className="label text-sm">
                          {t("contact:message")}
                        </label>
                        <textarea
                          name="message"
                          id="message"
                          placeholder={t("contact:messagePlaceholder")}
                          value={contactForm.message}
                          onChange={handleContactChange}
                          className={clsx(
                            "input min-h-[100px]",
                            contactErrors.message && "input-error",
                          )}
                        />
                        {contactErrors.message && (
                          <p className="text-destructive text-xs">
                            {contactErrors.message}
                          </p>
                        )}
                      </div>

                      <button
                        type="submit"
                        disabled={pending}
                        className="btn btn-primary w-full"
                      >
                        {pending
                          ? t("contact:sendingMessage")
                          : t("contact:sendMessage")}
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </Page>

      {error && (
        <Alert
          text={t(
            axios.isAxiosError(error)
              ? error.response?.data?.error || error.message
              : error.message,
          )}
          variant="error"
          onClick={() => uiResetErrorAction()}
        />
      )}

      {successMessage && (
        <Alert
          text={successMessage}
          variant="success"
          onClick={() => uiResetErrorAction()}
        />
      )}

      <Modal
        isOpen={showDeleteModal}
        onClose={() => {
          setShowDeleteModal(false);
        }}
        title={t("Confirm Deletion")}
        variant="destructive"
      >
        <div className="space-y-4">
          <p className="text-destructive text-sm font-medium">
            {t("This action cannot be undone.")}
          </p>

          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                setShowDeleteModal(false);
              }}
              className="btn btn-secondary"
            >
              {t("profile:Cancel")}
            </button>
            <button
              onClick={handleConfirmDelete}
              disabled={pending}
              className={clsx(
                "btn btn-destructive",
                pending && "cursor-not-allowed opacity-50",
              )}
            >
              {pending ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                  {t("profile:Deleting...")}
                </div>
              ) : (
                t("profile:Delete")
              )}
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default AdvertDetail;
