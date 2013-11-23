/**
 *               __     __
 * .-----.-----.|__|.--|  |.-----.--.--.
 * |__ --|  _  ||  ||  _  ||  -__|  |  |
 * |_____|   __||__||_____||_____|___  |
 *       |__|                    |_____|
 *
 * SPIDEY v0.2.0
 *
 * Copyright (C) 2013 Fabio Cicerchia <info@fabiocicerchia.it>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Test Module
 *
 * It manage the test case files: creation, retrieving and parsing.
 *
 * @module Test
 */
var Test = function (fsWrapper, glob, mainDir) {
    /**
     * Test case directory.
     *
     * @property TEST_CASE_DIRECTORY
     * @type {String}
     * @default "/../tests/cases/"
     */
    this.TEST_CASE_DIRECTORY = '/tests/cases/';

    /**
     * Current instance.
     *
     * @property currentTest
     * @type {Object}
     * @default this
     */
    var currentTest = this;

    /**
     * Create test case file.
     *
     * @method create
     * @param  {String}   name     The name of the test case.
     * @param  {String}   data     The data of the test case.
     * @param  {Function} callback The data of the test case.
     * @return undefined
     */
    this.create = function (url, name, data, callback) {
        var content      = '',
            testCaseFile = mainDir + this.TEST_CASE_DIRECTORY + url.replace(/[^a-zA-Z0-9]/g, '_') + '/' + name + '.tst',
            k;

        if (url === '' || name === '' || Object.keys(data).length === 0) {
            return (callback !== undefined) ? callback() : undefined;
        }

        for (k in data) {
            if (data.hasOwnProperty(k)) {
                content += k + '=' + data[k] + "\n";
            }
        }

        if (!fsWrapper.existsSync(mainDir + currentTest.TEST_CASE_DIRECTORY + url.replace(/[^a-zA-Z0-9]/g, '_'))) {
            fsWrapper.mkdirSync(mainDir + currentTest.TEST_CASE_DIRECTORY + url.replace(/[^a-zA-Z0-9]/g, '_'), '0777');
        }

        fsWrapper.writeFileSync(testCaseFile, content, {flag: 'w+', mode: 0755});
        if (callback !== undefined) callback();
    };

    /**
     * Returns a list of test cases based on the URL.
     *
     * @method getCases
     * @param  {String} url The URL for the test cases.
     * @return {Object}
     */
    this.getCases = function (url) {
        if (url === '' || !fsWrapper.existsSync(mainDir + this.TEST_CASE_DIRECTORY + url)) {
            return [];
        }

        var cases = [],
            filename,
            testCase,
            files = glob.sync(mainDir + this.TEST_CASE_DIRECTORY + url.replace(/[^a-zA-Z0-9]/g, '_') + '/*.tst');

        for (filename in files) {
            if (files.hasOwnProperty(filename)) {
                testCase = currentTest.parseCase(filename);

                if (testCase !== {}) {
                    cases.push(testCase);
                }
            }
        }

        return cases;
    };

    /**
     * Parse a test cases file to return the testing data to be used.
     *
     * @method parseCases
     * @param  {String} The test case file.
     * @return {Object}
     */
    this.parseCase = function (file) {
        var i, value, content, lines,
            data = {};

        if (!fsWrapper.existsSync(file)) {
            return {};
        }

        content = fsWrapper.readFileSync(file).toString();
        lines   = content.split("\n");

        for (i in lines) {
            if (lines[i] !== '') {
                value = lines[i].split(/=/, 2);
                data[value[0]] = value[1];
            }
        }

        return data;
    };
};

module.exports = Test;