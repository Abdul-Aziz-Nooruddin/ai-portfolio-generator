import { expect, test } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/');
});

test('homepage covers the complete visitor journey', async ({ page }) => {
  for (const id of ['about', 'use-cases', 'features', 'templates', 'how-it-works', 'studio', 'publishing', 'resources', 'faq', 'contact']) {
    await expect(page.locator(`section#${id}`)).toHaveCount(1);
    await expect(page.locator(`section#${id} h2`)).toHaveCount(1);
  }
  await expect(page.getByRole('heading', { level: 1 })).toHaveCount(1);
  await expect(page.locator('.ps-feature')).toHaveCount(6);
  await expect(page.locator('.faq-item')).toHaveCount(12);
  await expect(page.locator('.resource-guide')).toHaveCount(3);
  await expect(page.locator('.footer-directory nav')).toHaveCount(4);
});

test('audience chooser provides distinct, keyboard-accessible professional guidance', async ({ page }) => {
  const chooser = page.getByRole('group', { name: 'Choose your portfolio audience' });
  for (const [label, id, heading] of [
    ['Designer', 'designer', 'Put your process next to the pixels.'],
    ['Independent professional', 'independent', 'Make your expertise easy to understand.'],
    ['Early career', 'early-career', 'You do not need years to have a story.'],
    ['Developer', 'developer', 'Show the thinking behind the build.'],
  ]) {
    const button = chooser.getByRole('button', { name: label, exact: true });
    await button.focus();
    await button.press('Enter');
    await expect(button).toHaveAttribute('aria-pressed', 'true');
    await expect(page.locator('#audience-panel')).toHaveAttribute('data-persona', id);
    await expect(page.locator('#audience-detail-heading')).toHaveText(heading);
    await expect(chooser.locator('[aria-pressed="true"]')).toHaveCount(1);
    await expect(page.locator('.ps-persona-checklist li')).toHaveCount(4);
  }
});

test('studio walkthrough changes its explanation and preview without pretending to publish', async ({ page }) => {
  const modes = page.getByRole('group', { name: 'Studio preview modes' });
  await expect(page.locator('#studio-demo-disclaimer')).toContainText('not connected to your account');
  await modes.getByRole('button', { name: 'Appearance' }).click();
  await expect(page.locator('.ps-studio-workspace')).toHaveAttribute('data-mode', 'appearance');
  await expect(page.locator('#studio-preview')).toHaveAttribute('data-template', 'nadia');
  await expect(page.locator('#studio-preview img')).toHaveAttribute('src', '/images/template-nadia.webp');
  await modes.getByRole('button', { name: 'Publish', exact: true }).click();
  await expect(page.locator('.ps-studio-workspace')).toHaveAttribute('data-mode', 'publish');
  await expect(page.locator('#studio-preview-caption')).toContainText('Nothing here is saved or published.');
  await expect(page.getByRole('link', { name: 'Open Web Studio', exact: true })).toHaveAttribute('href', 'https://myfolio.tech/studio');
});

test('portfolio guides are real, expandable reading material', async ({ page }) => {
  const guides = page.locator('.resource-guide');
  for (let i = 0; i < await guides.count(); i += 1) {
    const guide = guides.nth(i);
    const summary = guide.locator('summary');
    await summary.focus();
    await summary.press('Enter');
    await expect(guide).toHaveAttribute('open', '');
    await expect(guide.locator('.resource-guide-content')).toBeVisible();
    expect(await guide.locator('.resource-guide-content li').count()).toBeGreaterThanOrEqual(4);
    await summary.press('Enter');
    await expect(guide).not.toHaveAttribute('open', '');
  }
});

test('contact form rejects empty or invalid inputs and never claims a message was sent', async ({ page }) => {
  await page.getByRole('button', { name: 'Open email draft', exact: true }).click();
  await expect(page.getByLabel('Your name', { exact: true })).toBeFocused();
  await expect(page.locator('.contact-status')).toBeEmpty();
  await page.getByLabel('Your name', { exact: true }).fill('Alex Example');
  await page.getByLabel('Email address', { exact: true }).fill('not-an-email');
  await page.getByLabel('What’s it about?').selectOption('support');
  await page.getByLabel('Your message', { exact: true }).fill('I would like help choosing a portfolio.');
  await page.getByRole('button', { name: 'Copy inquiry', exact: true }).click();
  await expect(page.getByLabel('Email address', { exact: true })).toBeFocused();
  expect(await page.getByLabel('Email address', { exact: true }).evaluate((input) => (input as HTMLInputElement).validity.typeMismatch)).toBe(true);
  await expect(page.locator('.contact-draft')).toHaveCount(0);
  await expect(page.locator('.contact-status')).toBeEmpty();
});

test('contact inquiry copies the correct recipient and offers a manual fallback', async ({ page }) => {
  // Test copying without sending email or writing to the real system clipboard.
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async (text: string) => sessionStorage.setItem('test-inquiry', text) },
  }));
  await page.getByLabel('Your name', { exact: true }).fill('Alex Example');
  await page.getByLabel('Email address', { exact: true }).fill('alex@example.com');
  await page.getByLabel('What’s it about?').selectOption('partnership');
  await page.getByLabel('Your message', { exact: true }).fill('A portfolio workshop for our design & engineering cohort.');
  await expect(page.locator('.contact-recipient a')).toHaveAttribute('href', 'mailto:aziz@myfolio.tech');
  await page.getByRole('button', { name: 'Copy inquiry', exact: true }).click();
  await expect(page.locator('.contact-status')).toContainText('Inquiry copied.');
  await expect(page.locator('.contact-status')).toContainText('Nothing has been sent');
  const copied = await page.evaluate(() => sessionStorage.getItem('test-inquiry'));
  expect(copied).toContain('To: aziz@myfolio.tech');
  expect(copied).toContain('Reply email: alex@example.com');
  expect(copied).toContain('design & engineering');
  await page.getByLabel('What’s it about?').selectOption('support');
  await expect(page.locator('.contact-draft')).toHaveCount(0);
  await expect(page.locator('.contact-status')).toBeEmpty();
  await page.evaluate(() => Object.defineProperty(navigator, 'clipboard', {
    configurable: true,
    value: { writeText: async () => { throw new Error('Permission denied in regression test'); } },
  }));
  await page.getByRole('button', { name: 'Copy inquiry', exact: true }).click();
  await expect(page.locator('.contact-status')).toContainText('Clipboard access is unavailable.');
  await page.locator('.contact-draft summary').click();
  await expect(page.getByLabel('Your prepared email (not sent)')).toHaveValue(/To: support@myfolio.tech/);
});

test('expanded mobile menu scrolls to every destination and returns control to the document', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 568 });
  await page.getByRole('button', { name: 'Open menu' }).click();
  const menu = page.getByRole('navigation', { name: 'Main navigation' });
  await expect(menu.getByRole('link')).toHaveCount(10);
  await menu.getByRole('link', { name: 'Let’s talk' }).click();
  await expect(page).toHaveURL(/#contact$/);
  await expect(page.locator('#contact-heading')).toBeInViewport();
  await expect(page.locator('#site-menu')).toHaveAttribute('inert', '');
  await expect(page.locator('body')).not.toHaveCSS('overflow-y', 'hidden');
});
