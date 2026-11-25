import React from "react";
import { whatsappContact } from "./contact.js";
import "./whatsapp-header-link.css";

// Même accès WhatsApp dans les deux en-têtes.
// compact : doublon réservé au menu mobile du mode Explorer.
export default function WhatsAppHeaderLink({ compact = false }) {
  return <a
    className={"whatsapp-header-link" + (compact ? " whatsapp-header-mobile" : "")}
    href={whatsappContact.url}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={"M'écrire sur WhatsApp au " + whatsappContact.display}
    title={"WhatsApp : " + whatsappContact.display}
  >
    <img src="/images/whatsapp-header.webp" width="32" height="32" alt="" aria-hidden="true" />
    <span className="whatsapp-header-label">WhatsApp</span>
    <span className="whatsapp-header-number">06 74 20 53 68</span>
  </a>;
}
