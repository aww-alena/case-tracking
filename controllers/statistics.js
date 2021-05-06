const Habit = require('../models/Habit');
const JournalEntry = require('../models/JournalEntry');
const errorHandler = require('../utils/errorHandler');
const moment = require('moment');
const { startOfDay, isEqual } = require('date-fns');

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


function getCalendarData(entries = [], color) {
    const events = [];
    const viewDates = [];
    const journalData = [];

    entries.forEach(entry => {

        if (entry.done) {
            if (!hasDate(entry.date, viewDates)) {
                viewDates.push(getDateFromString(entry.date));
            }

            events.push((initCalendarEvent(entry.date, entry.comment, color)));
            journalData.push(initShortEntry(entry));
        }
    });

    const calendarData = { events, viewDates, journalData };

    return calendarData;
}

function initCalendarEvent(date, title = '', color) {
    const calendarEntry = {
        start: startOfDay(new Date(date)),
        color,
        title
    };

    return calendarEntry;
}

function initShortEntry(entry) {
    const ShortEntry = {
        date: entry.date,
        title: entry.comment || '',
        rating: entry.rating || 0,
        time: getPassedTime(entry.timer) || 0
    };

    return ShortEntry;
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