import { createLightTheme, Theme } from '@fluentui/react-components';

const brand = {
  10: '#001322',
  20: '#03263e',
  30: '#05385b',
  40: '#074b78',
  50: '#095d95',
  60: '#0c70b2',
  70: '#0f82cf',
  80: '#1395ed',
  90: '#3aa3f0',
  100: '#56b1f3',
  110: '#6ebff6',
  120: '#85cdf8',
  130: '#9bdbfa',
  140: '#b0e9fc',
  150: '#c6f6fe',
  160: '#dcffff'
};
export const griffinTheme: Theme = {
  ...createLightTheme(brand),
  colorPaletteRedBackground3: '#fce9ea'
};
