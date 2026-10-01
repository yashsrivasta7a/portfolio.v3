import { useSyncExternalStore } from "react";

/**
 * One bit of shared state: has the home preloader lifted yet?
 *
 * The hero waits on it so its entrance plays as the sheet rises, instead of
 * running unseen behind the overlay. Module-level rather than context because
 * the preloader lives in the root layout and the hero in the page.
 */

let done = false;
const listeners = new Set();

export function finishIntro() {
  if (done) return;
  done = true;
  listeners.forEach((fn) => fn());
}

function subscribe(fn) {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

/** True once the preloader is gone. The server says true so the HTML is complete without JS. */
export function useIntroDone() {
  return useSyncExternalStore(subscribe, () => done, () => true);
}
