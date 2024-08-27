import * as moment from 'moment-timezone';
import { toZonedTime } from 'date-fns-tz';
// Hàm để tạo thời gian với múi giờ +7
export function getCurrentDate() {
  // var format = 'YYYY/MM/DD HH:mm:ss ZZ';

  return moment.tz(Date.now(), 'Asia/Ho_Chi_Minh'); //moment().tz('Asia/Ho_Chi_Minh');
}

export function getCurrentDate1() {
  // var format = 'YYYY/MM/DD HH:mm:ss ZZ';
  console.log(
    'SOS',
    new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    }),
  );
  return new Date(
    new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Ho_Chi_Minh',
    }),
  );
}

export function convertToTimeZone(date?: Date, offsetInHours?: number): Date {
  if (!offsetInHours) {
    offsetInHours = 7;
  }

  // Lấy thời gian hiện tại tính bằng milliseconds kể từ epoch
  const utcTime = date.getTime();

  // Tính toán lại thời gian với offset (chuyển đổi từ giờ sang milliseconds)
  const localTime = utcTime + offsetInHours * 60 * 60 * 1000;

  // Tạo đối tượng Date mới từ thời gian đã điều chỉnh
  return new Date(localTime);
}

export function convertFromStringToDate(dateString: string) {
  return moment.tz(dateString, 'Asia/Ho_Chi_Minh').toDate();
}

export function getDateTimeCurrent(type: 'date' | 'time') {
  return moment().format(type == 'date' ? 'YYYY-MM-DD' : 'HH:mm:ss');
}
