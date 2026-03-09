import { useState } from "react";
import { profile, whoAmI } from "../content/portfolio.js";
import AboutModal from "./AboutModal.jsx";
import { trackEvent } from "../lib/analytics";

export default function Navbar() {
  const [aboutOpen, setAboutOpen] = useState(false);

  return (
    <>
      <header className="sticky top-3 z-40">
        <div className="mx-auto max-w-6xl px-5">
          <div className="glass-card nav-glass flex items-center justify-between rounded-2xl px-4 py-3">
            <a href="#" className="font-semibold tracking-tight text-zinc-100">
              {profile.name}
            </a>

            <nav className="flex items-center gap-4 text-sm text-zinc-200/80">
              <button
                type="button"
                onClick={() => {
                  trackEvent("click_who_am_i", {
                    source: "navbar",
                    label: "who_am_i_button",
                  });
                  setAboutOpen(true);
                }}
                className="rounded-xl border border-amber-200/15 bg-gradient-to-b from-white/10 via-amber-100/8 to-amber-300/10 px-3 py-2 text-sm font-medium text-amber-100/85 backdrop-blur-md transition duration-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_8px_20px_rgba(0,0,0,0.18)] hover:border-amber-200/25 hover:from-white/12 hover:via-amber-100/10 hover:to-amber-300/12 hover:text-amber-50"
              >
                More about me!
              </button>

              <a className="hover:text-white" href="#work">
                Work
              </a>
              <a className="hover:text-white" href="#contact">
                Contact
              </a>
            </nav>
          </div>
        </div>
      </header>

      <AboutModal
        open={aboutOpen}
        onClose={() => setAboutOpen(false)}
        items={whoAmI}
      />
    </>
  );
}
