import { type Locator, type Page, expect} from "@playwright/test";
import * as fs from 'fs';


export class DynamicTablePage {

    //variables
    protected readonly page:Page;
    private readonly TEST_DATA_BUTTON: Locator;
    private readonly JSON_DATA_INPUT: Locator;
    private readonly CAPTION_INPUT: Locator;
    private readonly TABLE_ID_INPUT: Locator;
    private readonly REFRESH_TABLE_BUTTON: Locator;
    private readonly DYNAMIC_TABLE: Locator;



    //constructor
    constructor (page: Page) {
        this.page = page;
        this.TEST_DATA_BUTTON = page.getByText('Table Data');
        this.JSON_DATA_INPUT = page.locator('#jsondata');
        this.CAPTION_INPUT = page.locator('#caption');
        this.TABLE_ID_INPUT = page.locator('#tableid');
        this.REFRESH_TABLE_BUTTON = page.getByRole('button', { name: 'Refresh Table' });
        this.DYNAMIC_TABLE = page.locator('#dynamictable');
    }



    // methods

    async expandTestData() {
        await expect(this.JSON_DATA_INPUT).toBeHidden();
        await this.TEST_DATA_BUTTON.click();
        await expect(this.JSON_DATA_INPUT).toBeVisible();
    }

    async shrinkTestData() {
        await expect(this.JSON_DATA_INPUT).toBeVisible();
        await this.TEST_DATA_BUTTON.click();
        await expect(this.JSON_DATA_INPUT).toBeHidden();    
    }

    async fillJsonData(jsonPath: string) {
        const jsonFile = fs.readFileSync(jsonPath, 'utf8');
        const jsonString = JSON.stringify(JSON.parse(jsonFile));
        await this.JSON_DATA_INPUT.fill(jsonString);
    }

    async fillCaption(caption: string) {
        await this.CAPTION_INPUT.fill(caption);
    }

    async fillTableId(table_id: string) {
        await this.TABLE_ID_INPUT.fill(table_id);
    }

    async clickRefreshTable() {
        await this.REFRESH_TABLE_BUTTON.click();
    }

    async assertTableDataWithJson(jsonPath: string) {
        const jsonObject = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
        let rows = await this.DYNAMIC_TABLE.locator('tr').all();
        for(var i=1; i<rows.length; i++) {
            expect.soft(jsonObject[i-1].name == (await this.DYNAMIC_TABLE.locator('tr').nth(i).locator('td').first().innerText()).toString()).toBeTruthy()
            expect.soft(jsonObject[i-1].age == (await this.DYNAMIC_TABLE.locator('tr').nth(i).locator('td').nth(1).innerText()).toString()).toBeTruthy()
            expect.soft(jsonObject[i-1].gender == (await this.DYNAMIC_TABLE.locator('tr').nth(i).locator('td').nth(2).innerText()).toString()).toBeTruthy()
        }

        // verify that the the all the json data is populated in table
        expect(jsonObject[i-1], 'Some data is not populated in table!!!').toBeUndefined()
    }

}
export default DynamicTablePage;
