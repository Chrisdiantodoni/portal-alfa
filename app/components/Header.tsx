import { Icon } from "@iconify/react";
import { ProfileDropdown } from "./ProfileDropdown";

function Header() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-white/5">
      <div className="flex justify-between items-center h-16 px-6 md:px-8 w-full max-w-screen-2xl mx-auto">
        <div className="text-xl font-black tracking-tighter text-primary">
          Portal Korporat
        </div>

        <div className="flex items-center space-x-1 md:space-x-2">
          <button className="text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high p-2 rounded-lg transition-colors relative">
            <Icon icon="mdi:bell" className="text-xl" />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-primary rounded-full ring-2 ring-surface" />
          </button>
          <ProfileDropdown />
        </div>
      </div>
    </nav>
  );
}

export default Header;
