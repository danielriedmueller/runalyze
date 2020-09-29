import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

dayjs.extend(duration);
import {Pacer, Length, Timespan} from "fitness-js";

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

export const stringToDuration = (str, duration = null) => {
    let [seconds, minutes, hours] = str.split(":").reverse();
    const data = {
        seconds: seconds || 0,
        minutes: minutes || 0,
        hours: hours || 0
    };

    return duration ? duration.add(data) : dayjs.duration(data)
}

export const durationToString = (duration) => {
    if (!duration) return "";

    return duration.get('hours') + ":" + duration.get('minutes') + ":" + duration.get('seconds')
}

export const combineRuns = (runs) => {
    if (runs.length === 0) {
        return {
            runs: 0,
            distance: 0,
            duration: stringToDuration("0:0")
        };
    }

    let duration = dayjs.duration({
        seconds: 0,
        minutes: 0,
        hours: 0
    });

    let distance = 0;

    runs.forEach((run) => {
        distance += parseFloat(run[1]);
        duration = stringToDuration(run[2], duration);
    })

    return {
        runs: runs.length,
        distance: distance,
        avgDistance: distance / runs.length,
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
    const date = dayjs(run[0]);
    return date.isAfter(dateRange[0]) && date.isBefore(dateRange[1]);
});

export const calcPace = (distance, duration) => new Pacer()
    .withLength(new Length(distance, 'km'))
    .withTime(new Timespan()
        .addHours(duration.get('hours'))
        .addMinutes(duration.get('minutes'))
        .addSeconds(duration.get('seconds'))
    )
    .toPaceUnit('min/km').toString()