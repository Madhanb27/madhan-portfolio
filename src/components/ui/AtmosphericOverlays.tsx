"use client";

export default function AtmosphericOverlays() {
  return (
    <>
      {/* Film grain */}
      <div className="film-grain" aria-hidden="true" role="presentation" />

      {/* Vignette */}
      <div className="vignette" aria-hidden="true" role="presentation" />
    </>
  );
}
