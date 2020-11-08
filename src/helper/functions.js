import dayjs from "dayjs";

import {Pacer, Length, Timespan} from "fitness-js";

export const jsonToRuns = (json) => json.map((jsonRun) => {
    return {
        date: dayjs(jsonRun[0]),
        distance: parseFloat(jsonRun[1]),
        duration: stringToDuration(jsonRun[2])
    }
})

export const isValidRun = (newRun) => {
    let code, i, len;

    const distance = newRun.distance;
    const duration = newRun.duration;

    if (!distance || !duration) return false;

    for (i = 0, len = distance.length; i < len; i++) {
        code = distance.charCodeAt(i);
        if (!(code > 47 && code < 58) && code !== 46) {
            return false;
        }
    }

    for (i = 0, len = duration.length; i < len; i++) {
        code = duration.charCodeAt(i);
        if (!(code > 47 && code < 58) && code !== 58) {
            return false;
        }
    }

    return true;
}

export const stringToDuration = (str) => {
    let [seconds, minutes, hours] = str.split(":").reverse().map((str) => parseInt(str));

    return dayjs.duration({
        seconds: seconds || 0,
        minutes: minutes || 0,
        hours: hours || 0
    });
}

export const durationToString = (duration) =>
    Math.floor(duration.asHours()) + ":" + duration.minutes() + ":" + duration.seconds();

export const combineRuns = (runs) => {
    if (runs.length === 0) return null;

    let duration = dayjs.duration({'hours': 10});
    let distance = 0;

    runs.forEach((run) => {
        distance += parseFloat(run.distance);
        duration = duration.add(run.duration);
    })

    return {
        runs: runs.length,
        distance: distance.toFixed(2),
        avgDistance: (distance / runs.length).toFixed(2),
        duration: duration,
        avgDuration: dayjs.duration(duration.asMilliseconds() /  runs.length)
    };
}

export const getDateRange = (range, deviation = 0) => {
    const date = dayjs().add(deviation, range);

    return [
        date.clone().startOf(range),
        date.clone().endOf(range)
    ];
}

export const getRunsBetween = (runs, range, deviation = 0) => runs.filter((run) => {
    const dateRange = getDateRange(range, deviation);
    return run.date.isAfter(dateRange[0]) && run.date.isBefore(dateRange[1]);
});

export const findFastestRun = (runs) => runs.reduce((prev, current) => {
    const durationA = stringToDuration(calcPace(prev.distance, prev.duration));
    const durationB = stringToDuration(calcPace(current.distance, current.duration));
    return (durationA.asMilliseconds() < durationB.asMilliseconds()) ? prev : current
});

export const findLongestRun = (runs) => runs.reduce((prev, current) => (prev.duration.asMilliseconds() > current.duration.asMilliseconds()) ? prev : current);

export const findFurthestRun = (runs) => runs.reduce((prev, current) => (prev.distance > current.distance) ? prev : current);

export const calcPace = (distance, duration) => new Pacer()
    .withLength(new Length(distance, 'km'))
    .withTime(new Timespan().addMilliseconds(duration.asMilliseconds()))
    .toPaceUnit('min/km').toString();