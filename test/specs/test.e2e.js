import { expect } from '@wdio/globals'
import LoginPage from '../pageobjects/login.page.js'
import SecurePage from '../pageobjects/secure.page.js'

describe('My Positive Login application', () => {
    it('should login with valid credentials', async () => {

        for (let i = 0; i < LoginPage.credentials.users.length; i++) {
            await LoginPage.open()
            if (LoginPage.credentials.users[i] === "locked_out_user") {
                await LoginPage.login(LoginPage.credentials.users[i], LoginPage.credentials.password)
                await expect(SecurePage.errorAlert).toBeExisting()
                await expect(SecurePage.errorAlert).toHaveText(expect.stringContaining("Sorry, this user has been locked out.")) 
            } else {
                await LoginPage.login(LoginPage.credentials.users[i], LoginPage.credentials.password)
                await expect(SecurePage.flashAlert).toBeExisting()
                await expect(SecurePage.flashAlert).toHaveText(expect.stringContaining('Products'))
            }

        }        
    })
})

describe('My Negative Login application', () => [
    it('should not be able to login', async () => {

        for (let i = 0; i < LoginPage.credentials.users.length; i++) {
            await LoginPage.open()
            await LoginPage.login(LoginPage.credentials.users[i], LoginPage.credentials.badPass)
            await expect(SecurePage.errorAlert).toBeExisting()
            await expect(SecurePage.errorAlert).toHaveText(expect.stringContaining("Username and password do not match any user in this service"))
        }
    })
])
