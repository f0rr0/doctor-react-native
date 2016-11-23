/**
 * @providesModule date
 */

import moment from 'moment';

export function parseStupidDateToISO(date, time) {
  return moment(`${date} ${time} +0530`, 'DD/MM/YYYY hh:mm a Z');
}
