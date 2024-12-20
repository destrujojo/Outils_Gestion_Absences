import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InputForm from "../components/InputForm";
import { useAuth } from "./../auth/AuthContext";
import { getRole } from "../utils/authUtils";

export default function Login() {
  const {
    login,
    loading,
    verifMail,
    generateCode,
    updateMdp,
    resetCode,
    verifCode,
    registrationError,
    error: apiError,
  } = useAuth();
  const navigate = useNavigate();

  // const [isRegistering, setIsRegistering] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [codeValide, setCodeValide] = useState(false);
  const [isVerifMail, setIsVerifMail] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [code, setCode] = useState("");

  const [localError, setLocalError] = useState("");

  // Fonction pour vérifier la validité de l'email
  const isValidEmail = (email: string) => {
    return email.endsWith("@student.junia.com") || email.endsWith("@junia.com");
  };

  useEffect(() => {
    // Réinitialiser localError lorsque l'on change de mode
    setLocalError("");

    // Mettre à jour localError en fonction de l'état actuel
    if (isReset && registrationError) {
      setLocalError(registrationError);
    } else if (!isReset && apiError) {
      setLocalError(apiError);
    }
  }, [apiError, registrationError, isReset]);

  const resetData = () => {
    setLocalError("");
    setPassword("");
    setConfirmPassword("");
    setCode("");
    setEmail("");
  };

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError("");

    if (!isValidEmail(email)) {
      setLocalError("L'email doit se terminer pas @student.junia.com");
      return;
    }

    const success = await login(email, password);
    if (!success) {
      setLocalError("Email ou mot de passe incorrect");
      return;
    }
    resetData();

    if (getRole() === "Admin") {
      navigate("/Home_Admin");
    } else {
      navigate("/");
    }
  };

  const handleReset = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLocalError("");

    if (password === confirmPassword) {
      await updateMdp(email, password);
      resetData();
      setIsReset(false);
      setCodeValide(false);
      setIsVerifMail(false);
      navigate("/login");
    } else {
      setLocalError("Les mots de passe ne correspondent pas");
    }
  };

  const verifMailFunction = async (email: string) => {
    setLocalError("");
    setIsVerifMail(false);

    // if (!isValidEmail(email)) {
    //   setLocalError(
    //     "L'email doit se terminer par @student.junia.com ou @junia.com"
    //   );
    //   return false;
    // }

    try {
      const result = await verifMail(email);
      if (!result) {
        setLocalError(
          "L'email n'existe pas, merci de vous rapprocher de l'admin"
        );
        return false;
      } else {
        setIsVerifMail(true);
        await generateCode(email);
        return true;
      }
    } catch (err) {
      setLocalError(
        "L'email n'existe pas, merci de vous rapprocher de l'admin"
      );
      return false;
    }
  };

  const verifCodeFonction = async (code: string) => {
    setLocalError("");
    try {
      const result = await verifCode(email, code);
      if (!result) {
        setLocalError("Code invalide, merci de générer un nouveau code");
        await resetCode(email);
        return false;
      }
      setCodeValide(true);
      await resetCode(email);
      return true;
    } catch (err) {
      await resetCode(email);
      setLocalError("Code invalide, merci de générer un nouveau code");
      return false;
    }
  };

  return (
    <div className="flex min-h-screen flex-grow items-center justify-center pt-24 bg-lightOrange">
      <div className="w-full max-w-md bg-white p-8 mb-14 rounded-lg shadow-lg">
        {isReset ? (
          codeValide ? (
            <>
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset mot de passe
              </h2>
              <form className="space-y-6 mt-6" onSubmit={handleReset}>
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
                <div>
                  <button
                    type="submit"
                    className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    disabled={loading}
                  >
                    Valider mot de passe
                  </button>
                </div>
                {localError && (
                  <div className="mt-2 text-red-600 text-sm">{localError}</div>
                )}
              </form>
            </>
          ) : (
            <>
              <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Reset mot de passe
              </h2>
              <form className="space-y-6 mt-6">
                <InputForm
                  id="email"
                  label="Email"
                  type="email"
                  required={true}
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <div>
                  <button
                    type="button"
                    className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    onClick={() => {
                      verifMailFunction(email);
                    }}
                  >
                    {isVerifMail ? "Mail valide" : "Vérifier mail"}
                  </button>
                </div>
                {isVerifMail && (
                  <>
                    <InputForm
                      id="code"
                      label="Code"
                      type="text"
                      required={false}
                      autoComplete="code"
                      value={code}
                      onChange={(e) => setCode(e.target.value)}
                    />
                    <div>
                      <button
                        type="button"
                        className="flex w-full justify-center rounded-md bg-orange px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={() => {
                          verifCodeFonction(code);
                        }}
                      >
                        Vérifier code
                      </button>
                    </div>
                  </>
                )}
                {localError && (
                  <div className="mt-2 text-red-600 text-sm">{localError}</div>
                )}
              </form>
            </>
          )
        ) : (
          <>
            <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
              Connexion
            </h2>
            <form className="space-y-6 mt-6" onSubmit={handleLogin}>
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
                  {loading ? "Chargement..." : "Se connecter"}
                </button>
              </div>
            </form>
          </>
        )}
        <p className="mt-10 text-center text-sm text-gray-500">
          {isReset ? "Connectez-vous ?" : "Reset votre mot de passe ?"}{" "}
          <a
            href="#"
            onClick={() => {
              // setIsRegistering(!isRegistering);
              setIsReset(!isReset);
              setLocalError("");
            }}
            className="font-semibold leading-6 text-darkPurple hover:text-orange"
          >
            {isReset ? "Se connecter" : "Reset"}
          </a>
        </p>
      </div>
    </div>
  );
}
