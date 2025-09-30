//DEPENDENCIES
import { useState, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

//NATIVE
import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";
import { isValidEmail } from "../../utils/validation";
import Alert from "../../components/ui/Alert";

//ASSETS
import EmailIcon from "../../assets/user-light.svg";
import PasswordIcon from "../../assets/lock-light.svg";

function LoginPage() {
  const loginAction = useLoginAction();
  const uiResetErrorAction = useUiResetError();
  const { pending: isFetching, error } = useAppSelector(getUi);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  const { email, password, rememberMe } = credentials;
  const isDisabled = !email || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "email" && emailError) {
      setEmailError("");
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidEmail(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters");
      return;
    }

    await loginAction({ email, password, rememberMe });
  }

  return (
    <>
      <div className="wrapper">
        <div className="flex min-h-screen items-center justify-center">
          <div className="w-full max-w-md">
            <div className="bg-container border-border rounded-xl border p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="text-center">
                  <h2 className="text-heading font-heading mb-2 text-3xl font-extrabold">
                    Log in to MicroJobs
                  </h2>
                  <p className="text-paragraph">
                    Sign in by entering your username and password.
                  </p>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="text-heading block text-sm font-medium"
                  >
                    Email
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <img
                        src={EmailIcon}
                        alt=""
                        className="text-paragraph h-5 w-5 opacity-60"
                      />
                    </div>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="yourname@gmail.com"
                      value={email}
                      onChange={handleChange}
                      className={`bg-container text-paragraph placeholder:text-paragraph/60 block w-full rounded-lg border py-2 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none ${
                        emailError
                          ? "border-destructive focus:border-destructive focus:ring-destructive"
                          : "border-border focus:border-primary focus:ring-primary"
                      }`}
                    />
                  </div>
                  {emailError && (
                    <p className="text-destructive text-sm">{emailError}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="password"
                    className="text-heading block text-sm font-medium"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                      <img
                        src={PasswordIcon}
                        alt=""
                        className="text-paragraph h-5 w-5 opacity-60"
                      />
                    </div>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      placeholder="Your password"
                      value={password}
                      onChange={handleChange}
                      className={`bg-container text-paragraph placeholder:text-paragraph/60 block w-full rounded-lg border py-2 pr-3 pl-10 text-sm focus:ring-1 focus:outline-none ${
                        passwordError
                          ? "border-destructive focus:border-destructive focus:ring-destructive"
                          : "border-border focus:border-primary focus:ring-primary"
                      }`}
                    />
                  </div>
                  {passwordError && (
                    <p className="text-destructive text-sm">{passwordError}</p>
                  )}
                </div>

                <div className="text-left">
                  <a
                    href="#"
                    onClick={(e) => e.preventDefault()}
                    className="text-paragraph hover:text-heading text-sm font-medium transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  disabled={isDisabled}
                  className={`btn btn-primary w-full ${isDisabled ? "cursor-not-allowed opacity-50" : ""}`}
                >
                  {isFetching ? (
                    <div className="flex items-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                      Logging in...
                    </div>
                  ) : (
                    "Log In"
                  )}
                </button>

                <div className="flex items-center justify-between">
                  <label
                    htmlFor="rememberMe"
                    className="text-paragraph text-sm font-medium"
                  >
                    Remember me
                  </label>
                  <div className="relative">
                    <input
                      id="rememberMe"
                      type="checkbox"
                      name="rememberMe"
                      checked={rememberMe}
                      onChange={handleChange}
                      className="sr-only"
                    />
                    <div
                      className={`block h-6 w-11 cursor-pointer rounded-full transition-colors ${
                        rememberMe ? "bg-primary" : "bg-border"
                      }`}
                      onClick={() =>
                        handleChange({
                          target: {
                            name: "rememberMe",
                            type: "checkbox",
                            checked: !rememberMe,
                          },
                        } as ChangeEvent<HTMLInputElement>)
                      }
                    >
                      <div
                        className={`absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-transform ${
                          rememberMe ? "translate-x-5" : "translate-x-0"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-paragraph text-sm">
                    Don't have an account?{" "}
                    <a
                      href="/register"
                      className="text-primary hover:text-primary-hover font-medium transition-colors"
                    >
                      Sign up here
                    </a>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {error && (
        <Alert
          text={
            axios.isAxiosError(error)
              ? error.response?.data?.error || error.message
              : error.message
          }
          variant="error"
          onClick={() => uiResetErrorAction()}
        />
      )}
    </>
  );
}

export default LoginPage;
