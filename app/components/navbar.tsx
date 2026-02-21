"use client";

import React from "react";
import StaggeredMenu, { type StaggeredMenuItem, type StaggeredSocialItem } from "./ui/StaggeredMenu";

const menuItems: StaggeredMenuItem[] = [
  { label: "Home", ariaLabel: "Go to home section", link: "/#top" },
  { label: "About", ariaLabel: "Go to about section", link: "/#about" },
  { label: "Events", ariaLabel: "Go to events section", link: "/#events" },
  { label: "Gallery", ariaLabel: "Go to gallery section", link: "/#gallery" },
  { label: "Team", ariaLabel: "Go to team section", link: "/#team" },
  { label: "Contact", ariaLabel: "Go to contact section", link: "/#contact" },
  { label: "My IDE", ariaLabel: "Open IDE", link: "/editor" },
];

const socialItems: StaggeredSocialItem[] = [
  { label: "Instagram", link: "https://www.instagram.com/liferobo.foet.lu/" },
  { label: "LinkedIn", link: "https://www.linkedin.com/in/roboticsclublu/" },
  { label: "X", link: "https://x.com/liferobo_foet/" },
];

const Navbar = () => {
  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials
      displayItemNumbering
      menuButtonColor="#e7edff"
      openMenuButtonColor="#ffffff"
      changeMenuColorOnOpen
      colors={["#0a1035", "#2444da"]}
      logoUrl="/next.svg"
      accentColor="#4f6dff"
      isFixed
      onMenuOpen={() => {
        // Intentionally no-op; kept for future telemetry hook.
      }}
      onMenuClose={() => {
        // Intentionally no-op; kept for future telemetry hook.
      }}
    />
  );
};

export default Navbar;
