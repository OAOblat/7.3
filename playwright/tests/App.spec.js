import { test, expect } from "@playwright/test";
import { login, password } from "./user.js";

test.describe("Testing the login to the personal account on netology.ru", () => {
  test("Successful test with valid login and password", async ({ page }) => {
    await page.goto("https://netology.ru/");
    await page.getByRole("link", { name: "Войти" }).click();
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(login);
    await page.getByPlaceholder("Пароль").click();
    await page.getByPlaceholder("Пароль").fill(password);
    await page.getByTestId("login-submit-btn").click();
    await expect(
      page.getByRole("link", { name: "Моё обучение" })
    ).toBeVisible();
    await page.screenshot({ path: "screenshots/dashboard.png" });
  });

  test("Failed test with invalid login and password", async ({ page }) => {
    const login = "aaa@ya.ru";
    const password = "111111";
    await page.goto("https://netology.ru/");
    await page.getByRole("link", { name: "Войти" }).click();
    await page.getByPlaceholder("Email").click();
    await page.getByPlaceholder("Email").fill(login);
    await page.getByPlaceholder("Пароль").click();
    await page.getByPlaceholder("Пароль").fill(password);
    await page.getByTestId("login-submit-btn").click();
    await expect(page.getByTestId("login-error-hint")).toContainText(
      "Вы ввели неправильно логин или пароль"
    );
    await page.screenshot({ path: "screenshots/error_message.png" });
  });
});
