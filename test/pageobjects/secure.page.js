import { $ } from '@wdio/globals'
import Page from './page.js';

/**
 * sub page containing specific selectors and methods for a specific page
 */
class SecurePage extends Page {
    /**
     * define selectors using getter methods
     */
    get flashAlert () {
        return $('//span[@class="title"]');
    }
    get errorAlert () {
        return $('//h3[@data-test="error"]')

    }
}

export default new SecurePage();
