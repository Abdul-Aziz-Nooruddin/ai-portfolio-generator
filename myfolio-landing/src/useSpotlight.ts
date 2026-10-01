import { useEffect, type RefObject } from 'react';

/** A CSS mask, not a canvas data URL: no image encoding on every frame. */
export function useSpotlight(
  heroRef: RefObject<HTMLElement | null>,
  artRef: RefObject<HTMLDivElement | null>,
) {
  useEffect(() => {
    const hero = heroRef.current;
    const art = artRef.current;
    if (!hero || !art) return;

    const pointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    let visible = true;
    let active = false;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      active = false;
      art.dataset.spotlight = 'false';
    };

    const paint = () => {
      current.x += (target.x - current.x) * 0.14;
      current.y += (target.y - current.y) * 0.14;
      art.style.setProperty('--reveal-x', `${current.x.toFixed(1)}px`);
      art.style.setProperty('--reveal-y', `${current.y.toFixed(1)}px`);
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > 0.2) {
        frame = requestAnimationFrame(paint);
      } else {
        frame = 0;
      }
    };

    const move = (event: PointerEvent) => {
      if (!pointer.matches || motion.matches || !visible || event.pointerType === 'touch') return;
      const bounds = art.getBoundingClientRect();
      target.x = event.clientX - bounds.left;
      target.y = event.clientY - bounds.top;
      if (!active) {
        current.x = target.x;
        current.y = target.y;
        active = true;
      }
      art.dataset.spotlight = 'true';
      if (!frame) frame = requestAnimationFrame(paint);
    };

    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (!visible) stop();
    });
    observer.observe(hero);
    hero.addEventListener('pointermove', move);
    hero.addEventListener('pointerleave', stop);
    pointer.addEventListener('change', stop);
    motion.addEventListener('change', stop);
    const onVisibility = () => { if (document.hidden) stop(); };
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      observer.disconnect();
      hero.removeEventListener('pointermove', move);
      hero.removeEventListener('pointerleave', stop);
      pointer.removeEventListener('change', stop);
      motion.removeEventListener('change', stop);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [heroRef, artRef]);
}
