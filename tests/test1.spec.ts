import { test, expect } from '@playwright/test';
import { DynamicTablePage } from '../pageobjects/dynamictable-page';

test('Hovering Test', async ({ page }) => {
  

  await page.goto('https://practice.expandtesting.com/hovers')

  await page.locator('.figure').first().hover()
  expect(await page.locator('//div[@class="figure"]').first()).toBeVisible()
  expect(await page.locator('//h5[text()="name: user1"]/parent::div//a')).toBeVisible()
  expect(await page.locator('//div[@class="figure"]').first().locator('//h5')).toHaveText('name: user1')
  expect(await page.locator('//h5[text()="name: user1"]/parent::div//a')).toHaveText('View profile')


  // await page.waitForTimeout(2000)
  await page.locator('.figure').nth(1).hover()
  expect(await page.locator('//div[@class="figure"]').nth(1)).toBeVisible()
  expect(await page.locator('//h5[text()="name: user2"]/parent::div//a')).toBeVisible()
  expect(await page.locator('//div[@class="figure"]').nth(1).locator('//h5')).toHaveText('name: user2')
  expect(await page.locator('//h5[text()="name: user2"]/parent::div//a')).toHaveText('View profile')
  // await page.waitForTimeout(2000)


  await page.locator('.figure').nth(2).hover()
  expect(await page.locator('//div[@class="figure"]').nth(2)).toBeVisible()
  expect(await page.locator('//h5[text()="name: user3"]/parent::div//a')).toBeVisible()
  expect(await page.locator('//div[@class="figure"]').nth(2).locator('//h5')).toHaveText('name: user3')
  expect(await page.locator('//h5[text()="name: user3"]/parent::div//a')).toHaveText('View profile')
  // await page.waitForTimeout(5000)



});