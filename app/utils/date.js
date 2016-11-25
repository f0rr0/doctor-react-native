/**
 * @providesModule date
 */

import moment from 'moment';

moment.updateLocale('en', {
  relativeTime : {
    future: "in %s",
    past:   "%s ago",
    s:  "s",
    m:  "1m",
    mm: "%dm",
    h:  "1h",
    hh: "%dh",
    d:  "1d",
    dd: "%dd",
    M:  "1m",
    MM: "%dm",
    y:  "1y",
    yy: "%dy"
  }
});

export function parseStupidDateToISO(date, time) {
  return moment(`${date} ${time} +0530`, 'DD/MM/YYYY hh:mm a Z');
}

export function fromNow(date, time) {
  const now = parseStupidDateToISO(date, time);
  const today = moment().startOf('day');
  if (now.isBefore(today)) {
    return now.fromNow(true);
  }
  return now.format('h:mm A');
}
