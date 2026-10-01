import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

const headline = 'Your work deserves more than a PDF. Build a portfolio that feels like you.';

for (const [width, height] of [[320, 568], [375, 812], [390, 844], [640, 900], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]]) {
  test(`layout fits ${width} × ${height}`, async ({ page }) => {
    await page.setViewportSize({ width, height });
    await page.emulateMedia({ reducedMotion: 'reduce' });
    const errors: string[] = [];
    page.on('pageerror', (error) => errors.push(error.message));
    await page.goto('/');
    await expect(page.getByRole('heading', { name: headline, level: 1 })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    await page.locator('footer').scrollIntoViewIfNeeded();
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(width);
    expect(errors).toEqual([]);
  });
}

test('native wheel and keyboard scrolling reach the homepage and footer', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect.poll(() => page.evaluate(() => document.documentElement.scrollHeight)).toBeGreaterThan(3000);
  await expect(page.locator('body')).not.toHaveCSS('overflow-y', 'hidden');
  await page.mouse.move(430, 500);
  await page.mouse.wheel(0, 1000);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(700);
  await page.keyboard.press('End');
  await expect(page.locator('.footer-bottom')).toBeInViewport();
  await page.getByRole('link', { name: 'Back to top' }).click();
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await page.getByRole('link', { name: 'Scroll to explore MyFolio' }).click();
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator('#about-heading')).toBeInViewport();
});

test('real touch swipes scroll without a full-screen overlay blocking input', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true,
    reducedMotion: 'reduce', baseURL: 'http://127.0.0.1:5174',
  });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await page.getByRole('button', { name: 'Open menu' }).tap();
    await page.getByRole('button', { name: 'Close menu' }).tap();
    const cdp = await context.newCDPSession(page);
    await cdp.send('Input.synthesizeScrollGesture', {
      x: 180, y: 650, yDistance: -650, gestureSourceType: 'touch', speed: 900,
    });
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(200);
    await expect(page.locator('body')).not.toHaveCSS('overflow-y', 'hidden');
  } finally {
    await context.close();
  }
});

test('navigation opens, closes on Escape, restores focus, and visits real sections', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const trigger = page.getByRole('button', { name: 'Open menu' });
  await trigger.click();
  await expect(page.getByRole('button', { name: 'Close menu' })).toHaveAttribute('aria-expanded', 'true');
  await expect(page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'The idea' })).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(trigger).toBeFocused();
  await expect(page.locator('#site-menu')).toHaveAttribute('inert', '');
  await trigger.click();
  await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Templates' }).click();
  await expect(page).toHaveURL(/#templates$/);
  await expect(trigger).toHaveAttribute('aria-expanded', 'false');
  await expect(page.getByRole('heading', { name: 'Different by design.' })).toBeInViewport();
});

test('menu closes on outside click and cannot expose hidden links to keyboard focus', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await page.getByRole('button', { name: 'Open menu' }).click();
  await page.locator('.hero-headline').click();
  await expect(page.locator('#site-menu')).toHaveAttribute('aria-hidden', 'true');
  await expect(page.locator('#site-menu')).toHaveAttribute('inert', '');
});

test('all internal links resolve and product CTAs point to the live service', async ({ page }) => {
  await page.goto('/');
  const missing = await page.locator('a[href^="#"]').evaluateAll((links) => links.map((link) => link.getAttribute('href')!).filter((href) => !document.getElementById(href.slice(1))));
  expect(missing).toEqual([]);
  const links = page.getByRole('link', { name: 'Build my portfolio', exact: true });
  expect(await links.count()).toBeGreaterThanOrEqual(2);
  for (const link of await links.all()) await expect(link).toHaveAttribute('href', 'https://myfolio.tech/dashboard');
  await expect(page.getByRole('link', { name: 'Explore Jack live demo (opens in a new tab)' })).toHaveAttribute('href', 'https://myfolio.tech/jack-3d');
  await expect(page.getByRole('link', { name: 'Explore Nadia live demo (opens in a new tab)' })).toHaveAttribute('href', 'https://myfolio.tech/nadia');
});

test('template filters update the cards and the live count', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.template-card')).toHaveCount(2);
  const filters = page.getByRole('group', { name: 'Filter templates' });
  await filters.getByRole('button', { name: 'Developers', exact: true }).click();
  await expect(page.locator('.template-card')).toHaveCount(1);
  await expect(page.locator('.template-count')).toHaveText('01 WORLD TO EXPLORE');
  await expect(page.locator('.template-card h3')).toContainText('Jack');
  await filters.getByRole('button', { name: 'Personal brands', exact: true }).click();
  await expect(page.locator('.template-card h3')).toContainText('Nadia');
  await filters.getByRole('button', { name: 'All worlds', exact: true }).click();
  await expect(page.locator('.template-card')).toHaveCount(2);
});

test('FAQ opens one answer at a time and supports keyboard toggling', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const first = page.getByRole('button', { name: '01 What is MyFolio, exactly?' });
  const second = page.getByRole('button', { name: '02 Do I need to know how to code?' });
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await second.click();
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await expect(second).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#answer-1')).toBeVisible();
  await second.press('Enter');
  await expect(page.locator('#answer-1')).toBeHidden();
});

test('spotlight follows a mouse and the alternate view can be toggled by keyboard', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.splash')).toHaveCount(0);
  await page.mouse.move(950, 500);
  await expect(page.locator('.hero-art')).toHaveAttribute('data-spotlight', 'true');
  await expect.poll(() => page.locator('.hero-art').evaluate((node) => (node as HTMLElement).style.getPropertyValue('--reveal-x'))).not.toBe('');
  const reveal = page.getByRole('button', { name: 'Reveal another side' });
  await reveal.focus();
  await reveal.press('Space');
  await expect(page.getByRole('button', { name: 'Back to the original' })).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.hero-reveal')).toHaveCSS('mask-image', 'none');
  await page.getByRole('button', { name: 'Back to the original' }).press('Space');
  await expect(reveal).toHaveAttribute('aria-pressed', 'false');
  await page.locator('#about').scrollIntoViewIfNeeded();
  await expect(page.locator('.hero-art')).toHaveAttribute('data-spotlight', 'false');
});

test('reduced motion shows content immediately and disables cursor animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.hero-art')).toHaveCSS('opacity', '1');
  await expect(page.locator('.word-reveal').first()).toHaveCSS('animation-name', 'none');
  await page.mouse.move(900, 400);
  await expect(page.locator('.hero-art')).not.toHaveAttribute('data-spotlight', 'true');
  await page.getByRole('button', { name: 'Reveal another side' }).click();
  await expect(page.locator('.hero-reveal')).toHaveCSS('mask-image', 'none');
});

test('all local artwork and template previews load', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  for (const image of await page.locator('img').all()) {
    await image.scrollIntoViewIfNeeded();
    await expect.poll(() => image.evaluate((node) => (node as HTMLImageElement).complete && (node as HTMLImageElement).naturalWidth > 0)).toBe(true);
  }
});

test('touch users can reveal the artwork and use the navigation', async ({ browser }) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: 'reduce',
    baseURL: 'http://127.0.0.1:5174',
  });
  try {
    const page = await context.newPage();
    await page.goto('/');
    await page.getByRole('button', { name: 'Reveal another side' }).tap();
    await expect(page.locator('.hero-reveal')).toHaveCSS('mask-image', 'none');
    await page.getByRole('button', { name: 'Back to the original' }).tap();
    await expect(page.locator('.hero-art')).not.toHaveClass(/reveal-all/);
    await page.getByRole('button', { name: 'Open menu' }).tap();
    await page.getByRole('button', { name: 'Close menu' }).tap();
    await expect(page.locator('#site-menu')).toHaveAttribute('inert', '');
  } finally {
    await context.close();
  }
});

test('scroll entrance content becomes visible in normal-motion mode', async ({ page }) => {
  await page.goto('/');
  for (const id of ['about-heading', 'templates-heading', 'process-heading', 'faq-heading', 'closing-heading']) {
    await page.locator(`#${id}`).scrollIntoViewIfNeeded();
    await expect.poll(() => page.locator(`#${id}`).evaluate((node) => {
      const reveal = node.closest('.scroll-reveal');
      return reveal ? getComputedStyle(reveal).opacity : getComputedStyle(node).opacity;
    })).toBe('1');
  }
});

test('mobile page and menu have no automated accessibility violations', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole('button', { name: 'Open menu' }).click();
  const menuResults = await new AxeBuilder({ page }).include('#site-menu').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(menuResults.violations).toEqual([]);
});

test('page and open navigation pass accessibility checks', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
  await expect(page.locator('.splash')).toHaveCount(0);
  const results = await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(results.violations).toEqual([]);
  await page.getByRole('button', { name: 'Open menu' }).click();
  const menuResults = await new AxeBuilder({ page }).include('#site-menu').withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze();
  expect(menuResults.violations).toEqual([]);
});
