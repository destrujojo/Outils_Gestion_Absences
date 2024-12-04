import { useState } from "react";
import { Dialog, DialogPanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../auth/AuthContext";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../route/route";
import Logo from "../assets/PAJ_WHITE.png";

export default function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { logout, isAuthenticated } = useAuth();

  const handleLogout = () => {
    logout();
    navigateToHome();
  };

  const navigateToHome = () => {
    navigate(ROUTES.LOGIN);
  };

  const logoutButton = (
    <button
      onClick={handleLogout}
      className="rounded-md bg-transparent px-3 py-2 text-sm font-semibold text-orange shadow-sm hover:bg-orange hover:text-darkPurple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange border border-orange"
    >
      Déconnexion
    </button>
  );

  const logo = (
    <button onClick={navigateToHome} className="p-1.5">
      <span className="sr-only">PRJ</span>
      <img
        alt="Logo de la Plateforme de Ressources Junia"
        src={Logo}
        className="h-7 w-auto"
      />
    </button>
  );

  return (
    <header className="bg-darkPurple fixed w-full z-50">
      <nav
        aria-label="Global"
        className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-2"
      >
        <div className="flex lg:flex-1">{logo}</div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white-700"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="h-6 w-6" color="white" />
          </button>
        </div>
        {isAuthenticated && (
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            {logoutButton}
          </div>
        )}
      </nav>
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-10" />
        <DialogPanel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            {logo}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="py-6">{logoutButton}</div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
  );
}
