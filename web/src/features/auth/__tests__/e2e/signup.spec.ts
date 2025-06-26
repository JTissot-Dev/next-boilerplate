import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('/signup');
  await page.getByRole('textbox', { name: 'Nom' }).click();
  await page.getByRole('textbox', { name: 'Nom' }).fill('test.user');
  await page.getByRole('textbox', { name: 'Adresse email' }).click();
  await page.getByRole('textbox', { name: 'Adresse email' }).fill('test@hotmail.fr');
  await page.getByRole('textbox', { name: 'Mot de passe' }).click();
  await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Test2025*');
  await page.getByRole('button', { name: 'S\'inscrire' }).click();
  await expect(page.getByRole('button', { name: 'Création du compte...' })).toBeVisible();
  await expect(page.getByRole('listitem')).toBeVisible();
  await expect(page).toHaveURL('/login');
});