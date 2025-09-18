//DEPENDENCIES
import { useState, type ChangeEvent, type FormEvent } from "react";

//NATIVE
import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";
import { isValidGmail } from "../../utils/validation";

function LoginPage() {
  const loginAction = useLoginAction();

  const uiResetErrorAction = useUiResetError();
  const { pending: isFetching, error } = useAppSelector(getUi);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const { email, password, rememberMe } = credentials;
  const isDisabled = !email || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isValidGmail(email)) return;
    await loginAction({ email, password, rememberMe });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log in to MicroJobs</h1>

        <div>
          <p>Sign in by entering your username and password.</p>
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="yourname@gmail.com"
            value={email}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            placeholder="Your password"
            value={password}
            onChange={handleChange}
          />
        </div>

        <div>
          <a href="#" onClick={(e) => e.preventDefault()}>
            Forgot password?
          </a>
        </div>

        <button type="submit" disabled={isDisabled}>
          {isFetching ? "Logging in..." : "Log In"}
        </button>

        <div>
          <label htmlFor="rememberMe">
            <input
              id="rememberMe"
              type="checkbox"
              name="rememberMe"
              checked={rememberMe}
              onChange={handleChange}
            />
            Remember me
          </label>
        </div>

        {error && (
          <div>
            <span>{error.message}</span>
            <button type="button" onClick={() => uiResetErrorAction()}>
              ×
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

export default LoginPage;
