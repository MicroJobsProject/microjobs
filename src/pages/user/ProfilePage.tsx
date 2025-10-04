//DEPENDENCIES
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";
import { useTranslation } from "react-i18next";

//NATIVE
import {
  useUser,
  useUserLoadAction,
  useLogoutAction,
  useUiResetError,
  useUserStats,
  useUserStatsLoadAction,
} from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";
import Alert from "../../components/ui/Alert";
import Modal from "../../components/ui/Modal";
import { changePassword, deleteAccount } from "./service";

//ASSETS
import PlaceholderImage from "../../assets/placeholder.png";
import clsx from "clsx";

type Section = "profile" | "security" | "stats";

function ProfilePage() {
  const user = useUser();
  const loadUser = useUserLoadAction();
  const logout = useLogoutAction();
  const uiResetErrorAction = useUiResetError();
  const { error } = useAppSelector(getUi);
  const { t } = useTranslation("profile");

  const userStats = useUserStats();
  const loadUserStats = useUserStatsLoadAction();

  const [activeSection, setActiveSection] = useState<Section>("profile");
  const [showSuccess, setShowSuccess] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showDeletePassword, setShowDeletePassword] = useState(false);

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [deletePassword, setDeletePassword] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!user) {
      loadUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && !userStats.loaded) {
      loadUserStats();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  function handlePasswordChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  async function handlePasswordSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    };

    if (!passwordData.currentPassword) {
      newErrors.currentPassword = t("errorPasswordRequired");
    }

    if (passwordData.newPassword.length < 6) {
      newErrors.newPassword = t("errorPasswordTooShort");
    }

    if (passwordData.currentPassword === passwordData.newPassword) {
      newErrors.newPassword = t("errorPasswordSame");
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      newErrors.confirmPassword = t("errorPasswordNoMatch");
    }

    if (
      newErrors.currentPassword ||
      newErrors.newPassword ||
      newErrors.confirmPassword
    ) {
      setPasswordErrors(newErrors);
      return;
    }

    setIsProcessing(true);
    try {
      await changePassword(passwordData);
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
      setShowChangePassword(false);
      setSuccessMessage(t("updateSuccess"));
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setPasswordErrors({
          ...passwordErrors,
          currentPassword: t(error.response?.data?.error || "errorUpdate"),
        });
      }
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleDeleteAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!deletePassword) {
      setDeleteError(t("errorPasswordRequiredDelete"));
      return;
    }

    setIsProcessing(true);
    try {
      await deleteAccount(deletePassword);
      await logout();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setDeleteError(t(error.response?.data?.error || "errorDeletion"));
      }
    } finally {
      setIsProcessing(false);
    }
  }

  async function handleLogout() {
    await logout();
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex min-h-screen items-center justify-center">
          <div className="border-primary h-8 w-8 animate-spin rounded-full border-4 border-t-transparent"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="wrapper">
        <h2 className="!mb-6">{t("Account Settings")}</h2>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="bg-container border-border sticky top-24 rounded-xl border p-4 shadow-sm">
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => setActiveSection("profile")}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition ${
                      activeSection === "profile"
                        ? "bg-primary text-white"
                        : "text-paragraph hover:bg-border"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      account_circle
                    </span>
                    <span>{t("Profile")}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection("security")}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition ${
                      activeSection === "security"
                        ? "bg-primary text-white"
                        : "text-paragraph hover:bg-border"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      lock
                    </span>
                    <span>{t("Security")}</span>
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setActiveSection("stats")}
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition ${
                      activeSection === "stats"
                        ? "bg-primary text-white"
                        : "text-paragraph hover:bg-border"
                    }`}
                  >
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      bar_chart
                    </span>
                    <span>{t("Statistics")}</span>
                  </button>
                </li>
                <li className="border-border border-t pt-2">
                  <button
                    onClick={handleLogout}
                    className="text-paragraph hover:bg-border flex w-full items-center gap-3 rounded-lg px-4 py-2 text-left transition"
                  >
                    <span
                      className="material-symbols-outlined"
                      aria-hidden="true"
                    >
                      logout
                    </span>
                    <span>{t("Log Out")}</span>
                  </button>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {/* Profile Section */}
            {activeSection === "profile" && (
              <div className="bg-container border-border min-h-[500px] rounded-xl border p-8 shadow-sm">
                <h3 className="mb-6">{t("Profile Information")}</h3>

                <div className="flex items-center gap-6">
                  <div className="relative">
                    <img
                      src={PlaceholderImage}
                      alt={user.username}
                      className="h-24 w-24 rounded-full object-cover"
                    />
                    <button
                      type="button"
                      disabled
                      className="border-border bg-container absolute right-0 bottom-0 flex h-8 w-8 cursor-not-allowed items-center justify-center rounded-full border opacity-50"
                      title="Image upload coming soon"
                    >
                      <span
                        className="material-symbols-outlined text-paragraph text-base"
                        aria-hidden="true"
                      >
                        add_a_photo
                      </span>
                    </button>
                  </div>
                  <div>
                    <p className="text-heading text-xl font-semibold">
                      {user.username}
                    </p>
                    <p className="text-paragraph">{user.email}</p>
                    {user.createdAt && (
                      <p className="text-paragraph text-sm">
                        {t("Member since")}{" "}
                        {new Date(user.createdAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </div>

                <div className="border-border mt-6 border-t pt-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label className="text-paragraph mb-2 block text-sm font-medium">
                        {t("Username")}
                      </label>
                      <p className="text-heading">{user.username}</p>
                    </div>
                    <div>
                      <label className="text-paragraph mb-2 block text-sm font-medium">
                        {t("Email")}
                      </label>
                      <p className="text-heading">{user.email}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Security Section */}
            {activeSection === "security" && (
              <div className="bg-container border-border min-h-[500px] rounded-xl border shadow-sm">
                {/* Change Password */}
                <div className="border-border border-b p-8">
                  <div className="mb-4 flex items-center justify-between">
                    <div>
                      <h3 className="mb-1">{t("Change Password")}</h3>
                      <p className="text-paragraph text-sm">
                        {t("Update your account password")}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowChangePassword(!showChangePassword)}
                      className="btn btn-secondary text-sm"
                    >
                      {showChangePassword ? t("Cancel") : t("Change")}
                    </button>
                  </div>

                  {showChangePassword && (
                    <form
                      onSubmit={handlePasswordSubmit}
                      className="border-border border-t pt-6"
                    >
                      <div className="space-y-4">
                        <div className="space-y-2">
                          <label
                            htmlFor="currentPassword"
                            className="text-heading block text-sm font-medium"
                          >
                            {t("Current Password")}
                          </label>
                          <div className="relative">
                            <input
                              id="currentPassword"
                              type={showCurrentPassword ? "text" : "password"}
                              name="currentPassword"
                              value={passwordData.currentPassword}
                              onChange={handlePasswordChange}
                              className={clsx(
                                "input",
                                passwordErrors.currentPassword && "input-error",
                              )}
                            />
                            <button
                              type="button"
                              onClick={() =>
                                setShowCurrentPassword(!showCurrentPassword)
                              }
                              className="absolute top-1/2 right-3 -translate-y-1/2"
                            >
                              <span className="material-symbols-outlined text-paragraph text-xl">
                                {showCurrentPassword
                                  ? "visibility_off"
                                  : "visibility"}
                              </span>
                            </button>
                          </div>
                          {passwordErrors.currentPassword && (
                            <p className="text-destructive text-sm">
                              {t(passwordErrors.currentPassword)}
                            </p>
                          )}
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                          <div className="space-y-2">
                            <label
                              htmlFor="newPassword"
                              className="text-heading block text-sm font-medium"
                            >
                              {t("New Password")}
                            </label>
                            <div className="relative">
                              <input
                                id="newPassword"
                                type={showNewPassword ? "text" : "password"}
                                name="newPassword"
                                value={passwordData.newPassword}
                                onChange={handlePasswordChange}
                                className={clsx(
                                  "input",
                                  passwordErrors.newPassword && "input-error",
                                )}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowNewPassword(!showNewPassword)
                                }
                                className="absolute top-1/2 right-3 -translate-y-1/2"
                              >
                                <span className="material-symbols-outlined text-paragraph text-xl">
                                  {showNewPassword
                                    ? "visibility_off"
                                    : "visibility"}
                                </span>
                              </button>
                            </div>
                            {passwordErrors.newPassword && (
                              <p className="text-destructive text-sm">
                                {t(passwordErrors.newPassword)}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <label
                              htmlFor="confirmPassword"
                              className="text-heading block text-sm font-medium"
                            >
                              {t("Confirm New Password")}
                            </label>
                            <div className="relative">
                              <input
                                id="confirmPassword"
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={passwordData.confirmPassword}
                                onChange={handlePasswordChange}
                                className={clsx(
                                  "input",
                                  passwordErrors.confirmPassword &&
                                    "input-error",
                                )}
                              />
                              <button
                                type="button"
                                onClick={() =>
                                  setShowConfirmPassword(!showConfirmPassword)
                                }
                                className="absolute top-1/2 right-3 -translate-y-1/2"
                              >
                                <span className="material-symbols-outlined text-paragraph text-xl">
                                  {showConfirmPassword
                                    ? "visibility_off"
                                    : "visibility"}
                                </span>
                              </button>
                            </div>
                            {passwordErrors.confirmPassword && (
                              <p className="text-destructive text-sm">
                                {t(passwordErrors.confirmPassword)}
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex justify-end">
                          <button
                            type="submit"
                            disabled={isProcessing}
                            className={`btn btn-primary ${
                              isProcessing
                                ? "cursor-not-allowed opacity-50"
                                : ""
                            }`}
                          >
                            {isProcessing ? (
                              <div className="flex items-center gap-2">
                                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                                {t("Updating...")}
                              </div>
                            ) : (
                              t("Update Password")
                            )}
                          </button>
                        </div>
                      </div>
                    </form>
                  )}
                </div>

                {/* Delete Account */}
                <div className="p-8">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-destructive mb-1">
                        {t("Delete Account")}
                      </h3>
                      <p className="text-paragraph text-sm">
                        {t("Permanently delete your account and all data")}
                      </p>
                    </div>
                    <button
                      onClick={() => setShowDeleteAccount(true)}
                      className="btn btn-destructive text-sm"
                    >
                      {t("Delete")}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <Modal
              isOpen={showDeleteAccount}
              onClose={() => {
                setShowDeleteAccount(false);
                setDeletePassword("");
                setDeleteError("");
              }}
              title={t("Confirm Account Deletion")}
              variant="destructive"
            >
              <form onSubmit={handleDeleteAccount} className="space-y-4">
                <div className="bg-destructive/10 border-destructive rounded-lg border p-4">
                  <p className="text-destructive text-sm font-medium">
                    {t("warningDeletion")}
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="deletePassword"
                    className="text-heading block text-sm font-medium"
                  >
                    {t("Enter your password to confirm")}
                  </label>
                  <div className="relative">
                    <input
                      id="deletePassword"
                      type={showDeletePassword ? "text" : "password"}
                      value={deletePassword}
                      onChange={(e) => {
                        setDeletePassword(e.target.value);
                        setDeleteError("");
                      }}
                      className={clsx("input", deleteError && "input-error")}
                    />
                    <button
                      type="button"
                      onClick={() => setShowDeletePassword(!showDeletePassword)}
                      className="absolute top-1/2 right-3 -translate-y-1/2"
                    >
                      <span className="material-symbols-outlined text-paragraph text-xl">
                        {showDeletePassword ? "visibility_off" : "visibility"}
                      </span>
                    </button>
                  </div>
                  {deleteError && (
                    <p className="text-destructive text-sm">{t(deleteError)}</p>
                  )}
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setShowDeleteAccount(false);
                      setDeletePassword("");
                      setDeleteError("");
                    }}
                    className="btn btn-secondary"
                  >
                    {t("Cancel")}
                  </button>
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className={`btn btn-destructive ${
                      isProcessing ? "cursor-not-allowed opacity-50" : ""
                    }`}
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                        {t("Deleting...")}
                      </div>
                    ) : (
                      t("Delete My Account")
                    )}
                  </button>
                </div>
              </form>
            </Modal>

            {/* Statistics Section */}
            {activeSection === "stats" && (
              <div className="bg-container border-border min-h-[500px] rounded-xl border p-8 shadow-sm">
                <h3 className="mb-6">{t("Account Statistics")}</h3>

                <div className="bg-background rounded-lg p-6">
                  <div className="flex items-center gap-4">
                    <span
                      className="material-symbols-outlined text-primary text-5xl"
                      aria-hidden="true"
                    >
                      campaign
                    </span>
                    <div>
                      <p className="text-paragraph mb-1 text-sm">
                        {t("Total Adverts")}
                      </p>
                      <p className="text-heading text-4xl font-bold">
                        {userStats.loaded ? userStats.advertCount : "..."}
                      </p>
                      <p className="text-paragraph text-xs">
                        {t("Adverts created with this account")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {showSuccess && (
        <Alert
          text={successMessage}
          variant="success"
          onClick={() => setShowSuccess(false)}
        />
      )}

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
    </>
  );
}

export default ProfilePage;
