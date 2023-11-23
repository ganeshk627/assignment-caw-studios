import { test, expect } from '@playwright/test';
import { DynamicTablePage } from '../pageobjects/dynamictable-page';

test('Hovering Test', async ({ page }) => {

  await page.goto('https://practice.expandtesting.com/console-logs')

  page.on('console', msg => {
    console.log(msg.text());
    let msg_type = msg.type();
    console.log(msg_type)
    if(msg_type=='error') {
      expect(msg.text()).toContain('error message')
    } else if(msg_type=='log') {
      expect(msg.text()).toContain('simple message')
    }else if(msg_type=='warning') {
      expect(msg.text()).toContain('warning message')
    }
    else if(msg_type=='info') {
      expect(msg.text()).toContain('info message')
    }
  });

  await page.getByText('Log', {exact: true}).click();
  await page.getByText('Warning', {exact: true}).click();
  await page.getByText('Error', {exact: true}).click();
  await page.getByText('Info', {exact: true}).click();

});