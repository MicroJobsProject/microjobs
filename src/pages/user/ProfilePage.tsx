//DEPENDENCIES
import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import axios from "axios";

//NATIVE
import {
  useUser,
  useUserLoadAction,
  useUserUpdateAction,
  useLogoutAction,
  useUiResetError,
} from "../../store/hooks";
import { useAppSelector } from "../../store";
import { getUi } from "../../store/selectors";
import { isValidEmail } from "../../utils/validation";
import Alert from "../../components/ui/Alert";

function ProfilePage() {
  const user = useUser();
  const loadUser = useUserLoadAction();
  const updateUser = useUserUpdateAction();
  const logout = useLogoutAction();
  const uiResetErrorAction = useUiResetError();
  const { pending: isFetching, error } = useAppSelector(getUi);

  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
  });

  useEffect(() => {
    if (!user) {
      loadUser();
    }
  }, [user, loadUser]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
  }, [user]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const newErrors = {
      username: "",
      email: "",
    };

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    }

    if (!isValidEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (newErrors.username || newErrors.email) {
      setErrors(newErrors);
      return;
    }

    try {
      await updateUser(formData);
      setIsEditing(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  }

  function handleCancel() {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
      });
    }
    setErrors({ username: "", email: "" });
    setIsEditing(false);
  }

  async function handleLogout() {
    await logout();
  }

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile</h2>

      {!isEditing && (
        <button onClick={() => setIsEditing(true)}>Edit Profile</button>
      )}

      <form onSubmit={handleSubmit}>
        <div>
          <p>{user.username.charAt(0).toUpperCase()}</p>
          <p>{user.username}</p>
          <p>{user.email}</p>
        </div>

        <div>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {errors.username && <p>{errors.username}</p>}
        </div>

        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            disabled={!isEditing}
          />
          {errors.email && <p>{errors.email}</p>}
        </div>

        {user.createdAt && (
          <div>
            <p>Member since: {new Date(user.createdAt).toLocaleDateString()}</p>
          </div>
        )}

        {isEditing ? (
          <div>
            <button type="submit" disabled={isFetching}>
              {isFetching ? "Saving..." : "Save Changes"}
            </button>
            <button type="button" onClick={handleCancel} disabled={isFetching}>
              Cancel
            </button>
          </div>
        ) : (
          <button type="button" onClick={handleLogout}>
            Log Out
          </button>
        )}
      </form>

      {showSuccess && (
        <Alert
          text="Profile updated successfully!"
          variant="success"
          onClick={() => setShowSuccess(false)}
        />
      )}

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
    </div>
  );
}

export default ProfilePage;
