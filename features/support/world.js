import seleniumWebdriver from 'selenium-webdriver';
import { setWorldConstructor, setDefaultTimeout } from '@cucumber/cucumber';
import { timeout, browser } from '../../config';

class CustomWorld {
  constructor() {

    this.driver = new seleniumWebdriver
      .Builder()
      .forBrowser(browser)
      .build();
  }
}

setDefaultTimeout(timeout);
setWorldConstructor(CustomWorld);