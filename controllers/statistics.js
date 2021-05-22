const JournalEntry = require('../models/JournalEntry');
const errorHandler = require('../utils/errorHandler');
const Habit = require('../models/Habit');
const Category = require('../models/Category');
const Task = require('../models/Task');
const moment = require('moment');
const { isEqual } = require('date-fns');

module.exports.habit = async function(req, res) {

    try {
        const entries = await JournalEntry.find({ habit: req.params.id });
        const color = '#' + req.query.color;
        const calendarData = getCalendarData(entries, color);

        res.status(200).json(calendarData);

    } catch (error) {
        errorHandler(res, error)
    }
}

module.exports.category = async function(req, res) {

    const defaultCategories = [
        'Family',
        'Friends',
        'Career',
        'Fitness',
        'Health',
        'Self-development',
        'Recreation',
        'Chores'
    ];

    const categories = await Category.find({ user: req.user.id });

    categories.forEach(category => {
        defaultCategories.push(category.name);
    });

    const statistics = [];
    const data = [];
    const reducer = (accumulator, currentValue) => accumulator + currentValue;

    defaultCategories.forEach(category => {
        statistics[category] = [];
    });

    try {

        for (const category of defaultCategories) {
            const habits = await Habit.find({ user: req.user.id, categories: { $regex: category } });
            const tasks = await Task.find({ user: req.user.id, categories: { $regex: category }, 'savedData.done': true });

            if (tasks.length) {
                statistics[category].push(tasks.length);
            }

            if (habits.length) {
                for (const item of habits) {
                    const entries = await JournalEntry.find({ habit: item._id });
                    statistics[category].push(entries.length);
                }
            }

            if (statistics[category].length) {
                data.push(statistics[category].reduce(reducer));
            } else {
                data.push(0);
            }
        }

        const commonSortedArray = getSortedArray(defaultCategories, data);

        const categoryStatistics = { categories: getCategoryArray(commonSortedArray), data: getDataArray(commonSortedArray) };

        res.status(200).json(categoryStatistics);

    } catch (error) {
        errorHandler(res, error)
    }
}

function getCalendarData(entries = [], color) {
    const events = [];
    const viewDates = [];
    const journalData = [];

    entries.forEach(entry => {

        if (entry.done) {
            if (!hasDate(entry.date, viewDates)) {
                viewDates.push(getDateFromString(entry.date));
            }

            events.push((getCalendarEventObj(entry.date, entry.comment, color)));
            journalData.push(getShortEntryObj(entry));
        }
    });

    const calendarData = { events, viewDates, journalData };

    return calendarData;
}

function getCalendarEventObj(date, title = '', color) {
    const calendarEntry = {
        start: date,
        title,
        color: { primary: color, secondary: color }
    };

    return calendarEntry;
}

function getShortEntryObj(entry) {
    const shortEntry = {
        date: entry.date,
        comment: entry.comment || '',
        rating: entry.rating || 0,
        time: getPassedTime(entry.timer) || 0
    };

    return shortEntry;
}

function getDateFromString(date) {
    const dateObj = new Date(date);
    return new Date(dateObj.getFullYear(), dateObj.getMonth(), 1, 0, 0, 0);
}

function hasDate(date, viewDates) {
    const indexFound = viewDates.findIndex((i) => isEqual(new Date(i), getDateFromString(date)));
    return (indexFound !== -1) ? true : false;
}

function getPassedTime(timer) {
    let seconds = 0;

    if (timer.timestamp) {

        timer.timestamp.forEach(time => {
            const start = moment(time.start);
            const stop = moment(time.stop);

            seconds += (time.stop !== undefined) ? stop.diff(start, 'seconds') : 0;
        });
    }

    return seconds;
}

function getSortedArray(categories, data) {
    const commonArray = [];

    categories.forEach((category, index) => {
        commonArray.push({ name: category, value: data[index] });
    });

    commonArray.sort((a, b) => a.value - b.value);

    return commonArray;
}

function getCategoryArray(commonArray) {
    const categoryArray = [];

    commonArray.forEach((item) => {
        categoryArray.push(item.name);
    });

    return categoryArray;
}

function getDataArray(commonArray) {
    const dataArray = [];

    commonArray.forEach((item) => {
        dataArray.push(item.value);
    });

    return dataArray;
}