import React from "react";
import SocialLinks from "./social-links";

export default function Footer() {
  return (
    <footer className="fixed bottom-2.5 start-5 space-x-2 sm:hidden">
      <SocialLinks />
    </footer>
  );
}
