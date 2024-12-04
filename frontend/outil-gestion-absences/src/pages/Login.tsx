import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useAuth } from "./../auth/AuthContext";

export default function Login() {
  const {
    login,
    error: apiError,
    loading,
    register,
    registrationError,
  } = useAuth();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [classes, setClasses] = useState("");

  const [localError, setLocalError] = useState("");

  // Fonction pour vérifier la validité de l'email
  const isValidEmail = (email: string) => {
    return email.endsWith("@student.junia.com") || email.endsWith("@junia.com");
  };

  useEffect(() => {
    // Réinitialiser localError lorsque l'on change de mode
    setLocalError("");

    // Mettre à jour localError en fonction de l'état actuel
    if (isRegistering && registrationError) {
      setLocalError(registrationError);
    } else if (!isRegistering && apiError) {
      setLocalError(apiError);
    }
  }, [apiError, registrationError, isRegistering]);

  const resetData = () => {
    setLocalError("");
    setPassword("");
    setConfirmPassword("");
    setFirstName("");
    setLastName("");
    setClasses("");
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError("");

    if (isRegistering) {
      if (!isValidEmail(email)) {
        setLocalError(
          "L'email doit se terminer par @ext.junia.com ou @junia.com"
        );
        return;
      }

      if (password === confirmPassword) {
        const success = await register(
          firstName,
          lastName,
          email,
          password,
          classes
        );
        if (!success) return;
        resetData();
        navigate("/");
      } else {
        setLocalError("Les mots de passe ne correspondent pas");
      }
    } else {
      const success = await login(email, password);
      if (!success) return;
      resetData();
      navigate("/");
    }
  };

  return (
    <div className="flex min-h-screen flex-grow items-center justify-center pt-24 bg-lightOrange">
      <div className="w-full max-w-md bg-white p-8 mb-14 rounded-lg shadow-lg">
        <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          {isRegistering ? "Inscription" : "Connexion"}
        </h2>
        <form className="space-y-6 mt-6" onSubmit={handleLogin}>
          {isRegistering && (
            <>
              <InputForm
                id="first-name"
                label="Prénom"
                type="text"
                required={true}
                autoComplete="first-name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              <InputForm
                id="last-name"
                label="Nom"
                type="text"
                required={true}
                autoComplete="last-name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />

              <InputForm
                id="classes"
                label="Classes"
                type="text"
                required={true}
                autoComplete="classes"
                value={classes}
                onChange={(e) => setClasses(e.target.value)}
              />
            </>
          )}

          <InputForm
            id="email"
            label="Email"
            type="email"
            required={true}
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <InputForm
            id="password"
            label="Mot de passe"
            type={showPassword ? "text" : "password"}
            required={true}
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            showEye={true}
            toggleEye={() => setShowPassword(!showPassword)}
          />

          {isRegistering && (
            <InputForm
              id="confirm-password"
              label="Confirmation du mot de passe"
              type={showConfirmPassword ? "text" : "password"}
              required={true}
              autoComplete="current-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              showEye={true}
              toggleEye={() => setShowConfirmPassword(!showConfirmPassword)}
            />
          )}

          {/* Afficher les erreurs */}
          {localError && (
            <div className="mt-2 text-red-600 text-sm">{localError}</div>
          )}

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              disabled={loading}
            >
              {loading
                ? "Chargement..."
                : isRegistering
                ? "S'inscrire"
                : "Se connecter"}
              Se connecter
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          {isRegistering
            ? "Vous avez déjà un compte ?"
            : "Vous n’avez pas de compte ?"}{" "}
          <a
            href="#"
            onClick={() => {
              setIsRegistering(!isRegistering);
              setLocalError("");
            }}
            className="font-semibold leading-6 text-darkPurple hover:text-orange"
          >
            {isRegistering ? "Se connecter" : "S'inscrire"}
          </a>
        </p>
      </div>
    </div>
  );
}
