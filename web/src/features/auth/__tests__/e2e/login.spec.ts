import { test, expect, type Page } from '@playwright/test';


test.describe('Login tests', () => {

    test.beforeEach(async () => {
        test.setTimeout(200_000);
    });

    test('Login with valid credentials', async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('textbox', { name: 'Adresse email' }).click();
        await page.getByRole('textbox', { name: 'Adresse email' }).fill('john.doe@example.com');
        await page.getByRole('textbox', { name: 'Mot de passe' }).click();
        await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Password2025*');
        await page.getByRole('button', { name: 'Se connecter', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Connexion...' })).toBeVisible();
        await expect(page).toHaveURL('/dashboard', { timeout: 200_000 });
    });

    test('Login with inexisting email', async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('textbox', { name: 'Adresse email' }).click();
        await page.getByRole('textbox', { name: 'Adresse email' }).fill('fake-email@example.com');
        await page.getByRole('textbox', { name: 'Mot de passe' }).click();
        await page.getByRole('textbox', { name: 'Mot de passe' }).fill('Password2025*');
        await page.getByRole('button', { name: 'Se connecter', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Connexion...' })).toBeVisible();
        await expect(page.getByText('Email ou mot de passe')).toBeVisible({ timeout: 150_000 });
        await expect(page).toHaveURL('/login');
    });

    test('Login with invalid password', async ({ page }) => {
        await page.goto('/login');
        await page.getByRole('textbox', { name: 'Adresse email' }).click();
        await page.getByRole('textbox', { name: 'Adresse email' }).fill('john.doe@example.com');
        await page.getByRole('textbox', { name: 'Mot de passe' }).click();
        await page.getByRole('textbox', { name: 'Mot de passe' }).fill('FakePassword2*');
        await page.getByRole('button', { name: 'Se connecter', exact: true }).click();
        await expect(page.getByRole('button', { name: 'Connexion...' })).toBeVisible();
        await expect(page.getByText('Email ou mot de passe')).toBeVisible({ timeout: 150_000 });
        await expect(page).toHaveURL('/login');
    });
})
