const moment = require('moment')
const simpleGit = require('simple-git')
const git = simpleGit();
const fs = require('fs');
const jsonfile = require('jsonfile')
const FILE_PATH = './data.txt'
const COMMIT_MESSAGE = "1337";

function getRandomStanza() {
    const lyrics = fs.readFileSync('alllyrics.txt', 'utf8');
    const stanzas = lyrics.split('\n\n');

    // Get a random index within the range of stanzas
    const randomIndex = Math.floor(Math.random() * stanzas.length);
    return stanzas[randomIndex];
}

async function pushDates(dates) {
    try {

        for (const dateStr of dates) {
            const date = moment(dateStr, "DD/MM/YYYY");
            if (!date.isValid()) {
                console.error(`Invalid date format for ${dateStr}. Please provide date in the format 'dd/mm/yyyy'`);
                continue;
            }

            const currentDate = moment();
            const daysToSubtract = Math.abs(currentDate.diff(date, 'days'));

            console.log(`Pushing commit for ${dateStr}...`);
            await commitAndPush(daysToSubtract, getRandomStanza());
        }

        console.log('Pushing to remote repository...');
        await git.push('origin', 'main');
        console.log('Push successful');
    } catch (err) {
        console.error('Error during fetch, rebase/merge, or commit/push:', err);
    }

    async function commitAndPush(daysToSubtract, contents) {
        const DATE = moment().subtract(daysToSubtract, 'days').format();
        const data = {contents};

        try {
            await jsonfile.writeFile(FILE_PATH, data);
            await git.add([FILE_PATH]);
            await git.commit(COMMIT_MESSAGE, [FILE_PATH], {'--date': DATE});
            console.log('Commit successful');
        } catch (err) {
            console.error('Error during commit:', err);
            throw err;
        }
    }
}

const dates = ["03/07/2023", "08/07/2023", "09/07/2023",  "10/07/2023", "11/07/2023", "12/07/2023", "13/07/2023", "14/07/2023", "15/07/2023", "22/07/2023", "06/08/2023", "09/08/2023", "12/08/2023", "13/08/2023", "16/08/2023", "19/08/2023", "21/08/2023", "22/08/2023", "24/08/2023", "25/08/2023", "10/09/2023", "13/09/2023", "16/09/2023", "17/09/2023", "20/09/2023", "23/09/2023", "25/09/2023", "26/09/2023", "28/09/2023", "29/09/2023", "15/10/2023", "22/10/2023", "29/10/2023", "30/10/2023", "31/10/2023", "01/11/2023", "02/11/2023", "03/11/2023", "04/11/2023"];

console.log(dates)


function parseDate(dateString) {
    const [day, month, year] = dateString.split('/');
    return new Date(`${year}-${month}-${day}`);
}

function formatDate(date) {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
}

function findNextMonday(date) {
    const dayOfWeek = date.getDay();
    const daysUntilMonday = dayOfWeek === 1 ? 7 : 8 - dayOfWeek;
    const nextMonday = new Date(date.getTime() + daysUntilMonday * 24 * 60 * 60 * 1000);
    return nextMonday;
}

function subtractSixMonths(date) {
    return new Date(date.getFullYear(), date.getMonth() - 6, date.getDate());
}

function generateNewDatesArray(dates) {
    const numDaysArray = [0];
    for (let i = 1; i < dates.length; i++) {
        const prevDate = parseDate(dates[i - 1]);
        const currDate = parseDate(dates[i]);
        const diffTime = Math.abs(currDate - prevDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        numDaysArray.push(diffDays);
    }

    const today = new Date();
    const sixMonthsAgo = subtractSixMonths(today);
    const newStartDate = findNextMonday(sixMonthsAgo);

    const newDatesArray = [formatDate(newStartDate)];
    let currentDate = newStartDate;

    for (let i = 1; i < numDaysArray.length; i++) {
        const daysToAdd = numDaysArray[i];
        const newDate = new Date(currentDate.getTime() + daysToAdd * 24 * 60 * 60 * 1000);
        newDatesArray.push(formatDate(newDate));
        currentDate = newDate;
    }

    return newDatesArray;
}


const newDates = generateNewDatesArray(dates)

console.log(newDates)

function executeWithInterval(times, seconds) {
  let count = 0;

  function run() {
    if (count < times) {
      pushDates(newDates);
      count++;
      setTimeout(run, seconds * 1000); // Convert seconds to milliseconds
    }
  }

  run();
}

executeWithInterval(5, 12); // Executes exampleFunction 5 times with a 2-second interval

