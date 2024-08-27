import moment from 'moment-timezone';

export function getDateTimeCurrent(type: 'date' | 'time') {
  return moment().format(type == 'date' ? 'YYYY-MM-DD' : 'HH:mm:ss');
}
