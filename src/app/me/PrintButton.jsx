"use client";

/**
 * Save this page as a PDF.
 *
 * `window.print()` rather than a PDF library: every browser's print dialog
 * offers "Save as PDF", the output uses real text rather than a rasterised
 * screenshot, and it adds nothing to the bundle. The print stylesheet in
 * me.css is what makes the result worth having — without it you would get a
 * black page with the collapsed sections still collapsed.
 */
export default function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()}>
      Save as PDF
    </button>
  );
}
