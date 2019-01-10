'use strict';

const fetch = require("node-fetch");
const chalk = require('chalk');

const url = "https://nofluffjobs.com/api/posting";

const getJobPostings = async url => {
    const response = await fetch(url);

    const data = await response.json();

    return data.postings;
};

module.exports = async () => {
    try {
        const postings = await getJobPostings(url);

        const rubyPostings = postings
            .filter(posting => posting.technology === 'ruby');

        console.log(`Currently there are ${rubyPostings.length} job offers for Ruby developers:\n`);

        rubyPostings.forEach((posting, index) =>
            console.log(`${index + 1}) ${posting.title} ${posting.level} @ ${posting.name}`));
    } catch (error) {
        console.error(chalk.red('Error - unable fetch data from NoFluffJobs API!'));
    }

};
