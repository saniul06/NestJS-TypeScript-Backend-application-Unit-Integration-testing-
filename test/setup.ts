import * as fs from 'fs/promises';
const path = require('path');

global.beforeEach(async () => {
    try {
        await fs.rm(path.join(__dirname, "../test.sqlite"));
    } catch (err) { }
})