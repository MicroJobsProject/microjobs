//DEPENDENCIES
import { useState, type ChangeEvent, type FormEvent } from "react";

//NATIVE
import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";

function LoginPage() {
  const loginAction = useLoginAction();

  const uiResetErrorAction = useUiResetError();
  const { pending: isFetching, error } = useAppSelector(getUi);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
    rememberMe: false,
  });

  const { username, password, rememberMe } = credentials;
  const isDisabled = !username || !password || isFetching;

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loginAction({ username, password, rememberMe });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log in to MicroJobs</h1>

        <div>
          <p>Sign in by entering your username and password.</p>
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            placeholder="Enter your username"
            value={username}
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
