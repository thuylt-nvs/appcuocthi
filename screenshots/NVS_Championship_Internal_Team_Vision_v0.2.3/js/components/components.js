/* ==========================================================================
   NovaStars MVP — Component Registry Alias Wrapper
   Aggregates modular components (NSLayout, NSCards, NSModals)
   ========================================================================== */

const NSComponents = {
  ...NSLayout,
  ...NSCards,
  ...NSModals
};

window.NSComponents = NSComponents;
