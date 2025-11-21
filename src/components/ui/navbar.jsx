"use client";
import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import Image from 'next/image';

const Navbar = ({
  items = [
    { href: '#', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#services', label: 'Services' },
    { href: '#contact', label: 'Contact' }
  ],
  activeHref = '#',
  className = "shadow-[0_1px_1px_rgba(0,0,0,0.05),0_4px_6px_rgba(34,42,53,0.04),0_24px_68px_rgba(47,48,55,0.05),0_2px_3px_rgba(0,0,0,0.04)] rounded-full",
  ease = 'power3.easeOut',
  baseColor = '#364153',
  pillColor = '#ffffff',
  hoveredPillTextColor = '#ffffff',
  pillTextColor = '#364153',
  lastItemColor = '#2b7fff',
  navHeight = '4rem'
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const circleRefs = useRef([]);
  const tlRefs = useRef([]);
  const activeTweenRefs = useRef([]);
  const hamburgerRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const layout = () => {
      circleRefs.current.forEach(circle => {
        if (!circle?.parentElement) return;

        const pill = circle.parentElement;
        const rect = pill.getBoundingClientRect();
        const { width: w, height: h } = rect;
        const R = ((w * w) / 4 + h * h) / (2 * h);
        const D = Math.ceil(2 * R) + 2;
        const delta = Math.ceil(R - Math.sqrt(Math.max(0, R * R - (w * w) / 4))) + 1;
        const originY = D - delta;

        circle.style.width = `${D}px`;
        circle.style.height = `${D}px`;
        circle.style.bottom = `-${delta}px`;

        gsap.set(circle, {
          xPercent: -50,
          scale: 0,
          transformOrigin: `50% ${originY}px`
        });

        const label = pill.querySelector('.pill-label');
        const white = pill.querySelector('.pill-label-hover');

        if (label) gsap.set(label, { y: 0 });
        if (white) gsap.set(white, { y: h + 12, opacity: 0 });

        const index = circleRefs.current.indexOf(circle);
        if (index === -1) return;

        tlRefs.current[index]?.kill();
        const tl = gsap.timeline({ paused: true });

        tl.to(circle, { scale: 1.2, xPercent: -50, duration: 2, ease, overwrite: 'auto' }, 0);

        if (label) {
          tl.to(label, { y: -(h + 8), duration: 2, ease, overwrite: 'auto' }, 0);
        }

        if (white) {
          gsap.set(white, { y: Math.ceil(h + 100), opacity: 0 });
          tl.to(white, { y: 0, opacity: 1, duration: 2, ease, overwrite: 'auto' }, 0);
        }

        tlRefs.current[index] = tl;
      });
    };

    layout();

    const onResize = () => layout();
    window.addEventListener('resize', onResize);

    if (document.fonts?.ready) {
      document.fonts.ready.then(layout).catch(() => {});
    }

    const menu = mobileMenuRef.current;
    if (menu) {
      gsap.set(menu, { visibility: 'hidden', opacity: 0, scaleY: 1, y: 0 });
    }

    return () => window.removeEventListener('resize', onResize);
  }, [items, ease]);

  const handleEnter = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(tl.duration(), {
      duration: 0.3,
      ease,
      overwrite: 'auto'
    });
  };

  const handleLeave = i => {
    const tl = tlRefs.current[i];
    if (!tl) return;
    activeTweenRefs.current[i]?.kill();
    activeTweenRefs.current[i] = tl.tweenTo(0, {
      duration: 0.2,
      ease,
      overwrite: 'auto'
    });
  };

  const toggleMobileMenu = () => {
    const newState = !isMobileMenuOpen;
    setIsMobileMenuOpen(newState);

    const hamburger = hamburgerRef.current;
    const menu = mobileMenuRef.current;

    if (hamburger) {
      const lines = hamburger.querySelectorAll('.hamburger-line');
      if (newState) {
        gsap.to(lines[0], { rotation: 45, y: 3, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: -45, y: -3, duration: 0.3, ease });
      } else {
        gsap.to(lines[0], { rotation: 0, y: 0, duration: 0.3, ease });
        gsap.to(lines[1], { rotation: 0, y: 0, duration: 0.3, ease });
      }
    }

    if (menu) {
      if (newState) {
        gsap.set(menu, { visibility: 'visible' });
        gsap.fromTo(
          menu,
          { opacity: 0, y: 10, scaleY: 1 },
          {
            opacity: 1,
            y: 0,
            scaleY: 1,
            duration: 0.3,
            ease,
            transformOrigin: 'top center'
          }
        );
      } else {
        gsap.to(menu, {
          opacity: 0,
          y: 10,
          scaleY: 1,
          duration: 0.2,
          ease,
          transformOrigin: 'top center',
          onComplete: () => {
            gsap.set(menu, { visibility: 'hidden' });
          }
        });
      }
    }
  };

  const cssVars = {
    ['--base']: baseColor,
    ['--pill-bg']: pillColor,
    ['--hover-text']: hoveredPillTextColor,
    ['--pill-text']: pillTextColor,
    ['--last-item-color']: lastItemColor,
    ['--nav-h']: navHeight,
    ['--pill-pad-x']: '39px',
    ['--pill-gap']: '12px'
  };

  return (
    <div className="fixed top-4 z-[1000] w-full left-0 md:w-auto md:left-1/2 md:-translate-x-1/2 px-4 md:px-0  cursor-none">
      <nav
        className={`w-full md:w-max flex items-center justify-between md:justify-start box-border px-4 md:px-6 ${className}`}
        aria-label="Primary"
        style={{ ...cssVars, background: '#ffffff', height: navHeight }}
      >
        {/* <a href="">
          <Image
                              width={50}
                              height={50}
                              alt="project"
                              className="rounded-3xl invert"
                              src="/images/logo.png"
                            />
        </a> */}
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center ml-3">
          <ul
            role="menubar"
            className="list-none flex items-stretch m-0 p-0 h-full"
            style={{ gap: 'var(--pill-gap)' }}
          >
            {items.map((item, i) => {
              const isActive = activeHref === item.href;
              const isLastItem = i === items.length - 1;

              const pillStyle = {
                background: 'var(--pill-bg, #fff)',
                color: 'var(--pill-text, #000)',
                paddingLeft: 'var(--pill-pad-x)',
                paddingRight: 'var(--pill-pad-x)'
              };

              const basePillClasses =
                'relative satoshi1 overflow-hidden inline-flex items-center justify-center py-2 h-full no-underline rounded-full box-border font-semibold text-[19px] leading-[0] tracking-[0.3px] whitespace-nowrap cursor-pointer ';

              return (
                <li key={item.href} role="none" className="flex h-full">
                  <a
                    role="menuitem"
                    href={item.href}
                    className={basePillClasses}
                    style={pillStyle}
                    aria-label={item.ariaLabel || item.label}
                    onMouseEnter={() => handleEnter(i)}
                    onMouseLeave={() => handleLeave(i)}
                  >
                    <span
                      className="hover-circle absolute left-1/2 bottom-0 rounded-full z-[1] block pointer-events-none"
                      style={{
                        background: isLastItem ? 'var(--last-item-color, #60a5fa)' : 'var(--base, #000)',
                        willChange: 'transform'
                      }}
                      aria-hidden="true"
                      ref={el => {
                        circleRefs.current[i] = el;
                      }}
                    />
                    <span className="label-stack relative inline-block leading-[1] z-[2] flex items-center gap-2">
                      <span
                        className="pill-label relative z-[2] inline-block leading-[1]"
                        style={{ willChange: 'transform' }}
                      >
                        {item.label}
                      </span>
                      <span
                        className="pill-label-hover absolute left-0 top-0 z-[3] inline-block"
                        style={{
                          color: 'var(--hover-text, #fff)',
                          willChange: 'transform, opacity'
                        }}
                        aria-hidden="true"
                      >
                        {item.label}
                      </span>
                    </span>
                    
                  </a>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <button
          ref={hamburgerRef}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          className="md:hidden rounded-full border-0 flex flex-col items-center justify-center gap-1 cursor-pointer p-0 relative"
          style={{
            width: '48px',
            height: '48px',
            background: baseColor
          }}
        >
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: '#ffffff' }}
          />
          <span
            className="hamburger-line w-4 h-0.5 rounded origin-center"
            style={{ background: '#ffffff' }}
          />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        ref={mobileMenuRef}
        className="md:hidden absolute top-[calc(4rem+1rem)] left-0 right-0 mx-4 rounded-[32px] shadow-lg z-[998] origin-top"
        style={{
          background: '#ffffff'
        }}
      >
        <ul className="list-none m-0 p-[12px] flex flex-col gap-[6px]">
          {items.map((item, i) => {
            const isLastItem = i === items.length - 1;
            const defaultStyle = {
              background: 'var(--pill-bg, #fff)',
              color: 'var(--pill-text, #000)'
            };
            const hoverIn = e => {
              e.currentTarget.style.background = isLastItem ? lastItemColor : baseColor;
              e.currentTarget.style.color = hoveredPillTextColor;
            };
            const hoverOut = e => {
              e.currentTarget.style.background = pillColor;
              e.currentTarget.style.color = pillTextColor;
            };

            const linkClasses =
              'block py-5 px-8 text-[20px] font-semibold rounded-full transition-all duration-200 ease-[cubic-bezier(0.25,0.1,0.25,1)]';

            return (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={linkClasses}
                  style={defaultStyle}
                  onMouseEnter={hoverIn}
                  onMouseLeave={hoverOut}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;