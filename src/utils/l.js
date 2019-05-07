import format from 'date-fns/format';

const DEFAULT_FORMAT = 'YYYY-MM-DD HH:mm:ss';
const SHORT_FORMAT = 'YYYY-MM-DD HH:mm';
export default function l(time, locale) {
  locale = locale || DEFAULT_FORMAT;
  if (locale === 'short') locale = SHORT_FORMAT;
  if (time) {
    return format(time, locale);
  } else {
    return '';
  }
}
