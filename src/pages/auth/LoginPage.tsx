//DEPENDENCIES
import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";

//REACT-REDUX FILES
import { useLoginAction, useUiResetError } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";

function LoginPage() {
  const loginAction = useLoginAction();

  const uiResetErrorAction = useUiResetError();
  const { pending: isFetching, error } = useAppSelector(getUi);

  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const timeoutRef = useRef<number | null>(null);

  const { email, password } = credentials;
  const isDisabled = !email || !password || isFetching;

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      console.log("Timeout", timeoutRef.current);
    }, 20000);
    console.log("creating timeout", timeoutRef.current);

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [event.target.name]: event.target.value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await loginAction(credentials);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Log in to your account</h1>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            placeholder="e.g. user@example.com"
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

        <button type="submit" disabled={isDisabled}>
          {isFetching ? "Logging in..." : "Log In"}
        </button>

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
