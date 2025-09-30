//DEPENDENCIES
import { useState } from "react";

//NATIVE
import { useRegisterAction } from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";
import { isValidEmail } from "../../utils/validation";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const register = useRegisterAction();
  const ui = useAppSelector(getUi);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.username) newErrors.username = "Username is required";

    if (!isValidEmail(formData.email)) {
      newErrors.email =
        "Please enter a valid Gmail address (example@gmail.com)";
    }

    if (formData.password.length < 6)
      newErrors.password = "The password must be at least 6 characters long";

    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });
    } catch (error) {
      console.error("Error registering:", error);
    }
  };

  return (
    <main className="bg-background flex min-h-screen flex-col items-center justify-center px-4 py-8">
      {/* Título de la página */}
      <h1 className="font-heading text-heading mb-8 text-center text-4xl font-extrabold">
        Create Account
      </h1>

      {/* Card del formulario */}
      <div className="bg-container w-full max-w-md rounded-2xl p-8 shadow-lg">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Username */}
          <div className="flex flex-col gap-1">
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formData.username}
              onChange={handleChange}
              className="border-border bg-background text-paragraph focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2 outline-none focus:ring-1"
            />
            {errors.username && (
              <p className="text-destructive text-sm">{errors.username}</p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border-border bg-background text-paragraph focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2 outline-none focus:ring-1"
            />
            {errors.email && (
              <p className="text-destructive text-sm">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border-border bg-background text-paragraph focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2 outline-none focus:ring-1"
            />
            {errors.password && (
              <p className="text-destructive text-sm">{errors.password}</p>
            )}
            <p className="text-paragraph text-xs">
              Password must be at least 6 characters.
            </p>
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border-border bg-background text-paragraph focus:border-primary focus:ring-primary w-full rounded-lg border px-4 py-2 outline-none focus:ring-1"
            />
            {errors.confirmPassword && (
              <p className="text-destructive text-sm">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Botón */}
          <button
            type="submit"
            disabled={ui.pending}
            className="btn btn-primary w-full rounded-lg py-3 text-base font-semibold"
          >
            {ui.pending ? "Creating account..." : "Create Account"}
          </button>

          {/* Error general */}
          {ui.error && (
            <p className="text-destructive mt-2 text-center text-sm">
              {ui.error.message}
            </p>
          )}
        </form>
      </div>
    </main>
  );
}
