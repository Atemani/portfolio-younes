import React from "react";
import { projectLogos } from "./project-logos.js";
import "./project-logos-marquee.css";

export default function ProjectLogosMarquee() {
  return <section className="cp-project-logos" aria-labelledby="cp-project-logos-title">
    <div className="cp-project-logos-heading">
      <p className="cp-project-logos-eyebrow">PROJETS / UNIVERS</p>
      <h2 id="cp-project-logos-title">ILS FONT PARTIE<br />DE MON PARCOURS<span>.</span></h2>
      <p className="cp-project-logos-intro">Quelques projets, expériences et univers visuels que j’ai pu accompagner, concevoir ou faire évoluer.</p>
    </div>
    <div className="cp-project-logos-window" tabIndex="0" role="region"
      aria-label="Logos des projets. Le défilement se met en pause au survol ou au focus.">
      <div className="cp-project-logos-track">
        {[false, true].map(duplicate => <ul className="cp-project-logos-sequence" key={String(duplicate)} aria-hidden={duplicate ? "true" : undefined}>
          {projectLogos.map(logo => <li className="cp-project-logo" key={logo.name}>
            <img className={logo.presentation === "padded-wordmark" ? "cp-project-logo-padded" : undefined}
              src={logo.src} alt={duplicate ? "" : logo.name} width={logo.width} height={logo.height}
              loading="lazy" decoding="async" draggable="false" />
          </li>)}
        </ul>)}
      </div>
    </div>
    {/* Une présentation mobile distincte évite les logos coupés sur les côtés. */}
    <ul className="cp-project-logos-mobile" aria-label="Projets et expériences">
      {projectLogos.map((logo, index) => <li className="cp-project-logo-mobile" key={logo.name}
        style={{ "--logo-delay": `${index * 3.5}s` }}>
        <img className={logo.presentation === "padded-wordmark" ? "cp-project-logo-padded" : undefined}
          src={logo.src} alt={logo.name} width={logo.width} height={logo.height}
          loading="lazy" decoding="async" draggable="false" />
      </li>)}
    </ul>
  </section>;
}
