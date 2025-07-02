import { test, expect } from '@playwright/test';
import prisma from '@/lib/prisma';


test.describe('Signup tests', () => {

  const signupEmail = 'test.signup@example.com';
  const signupName = 'test.user.signup';

  test.beforeEach(async () => {
    test.setTimeout(200_000);

    await prisma.user.deleteMany({
      where: {
        email: signupEmail
      }
    });
  });

  test.afterAll(async () => {
    await prisma.$disconnect();
  });

  test('signup with valid inputs', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('textbox', { name: 'Nom' }).click();
    await page.getByRole('textbox', { name: 'Nom' }).fill(signupName);
    await page.getByRole('textbox', { name: 'Adresse email' }).click();
    await page.getByRole('textbox', { name: 'Adresse email' }).fill(signupEmail);
    await page.getByRole('textbox', { name: 'Mot de passe' }).click();
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Test20251**');
    await page.getByRole('button', { name: 'S\'inscrire' }).click();
    await expect(page.getByRole('button', { name: 'Création du compte...' })).toBeVisible();
    await expect(page.getByText('Inscription réussie !')).toBeVisible({ timeout: 200_000 });
    await expect(page).toHaveURL('/login', { timeout: 50_000 });
  });

  test('signup with existing email', async ({ page }) => {
    await page.goto('/signup');
    await page.getByRole('textbox', { name: 'Nom' }).click();
    await page.getByRole('textbox', { name: 'Nom' }).fill('John Doe');
    await page.getByRole('textbox', { name: 'Adresse email' }).click();
    await page.getByRole('textbox', { name: 'Adresse email' }).fill('john.doe@example.com');
    await page.getByRole('textbox', { name: 'Mot de passe' }).click();
    await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Password2025*');
    await page.getByRole('button', { name: 'S\'inscrire' }).click();
    await expect(page.getByRole('button', { name: 'Création du compte...' })).toBeVisible();
    await expect(page.getByText('Un compte utilisateur est déjà associé à cet email.')).toBeVisible({ timeout: 200_000 });
    await expect(page).toHaveURL('/signup');
  });
})
