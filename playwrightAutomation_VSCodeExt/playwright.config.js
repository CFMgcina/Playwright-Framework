// @ts-check
import { defineConfig, devices } from '@playwright/test';
import { on } from 'events';

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './tests',
  

  //Maximum time a test can run from 
    timeout: 30 * 1000,
    expect:{
      timeout: 5000,
    },
    reporter: 'html',

   use: {

    browserName : 'chromium',
    headless: false,

    actionTimeout: 10 * 1000, //clicks, fill, select..
    navigationTimeout: 30 * 1000, // goto, page switch...
 
    screenshot : 'on',
    trace : 'on',


  },


});

