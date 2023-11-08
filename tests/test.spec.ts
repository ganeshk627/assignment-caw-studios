import { test, expect } from '@playwright/test';
import {DynamicTablePage} from '../pageobjects/dynamictable-page';

test('Updating Table Test', async({page})=> {
      const dynamicTablePage = new DynamicTablePage(page);
      const jsonPath = 'testdata/dynamic-table/data.json';
     
  await test.step('Landing Dynamic Table Page', async () => {
    await page.goto('/styled/tag/dynamic-table.html');
  });

  await test.step('Click on Table Data button , a new input text box will be displayed:', async () => {
    await dynamicTablePage.expandTestData();
    // await homePage.shrinkTestData();
  });

  await test.step('Insert the following data in input text box and click on Refresh Table button', async () => {
    await dynamicTablePage.fillJsonData(jsonPath);
    await dynamicTablePage.clickRefreshTable();
    await page.waitForTimeout(2000);
  });

  await test.step('The entered data will be populated in the table', async () => {
    await dynamicTablePage.assertTableDataWithJson(jsonPath);
  })


  
  });