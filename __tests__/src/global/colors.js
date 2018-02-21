import Colors, { isEmpty, convertHex } from '../../../src/global/colors';

test('isEmpty', () => {
  expect(isEmpty(undefined)).toBe(true);
  expect(isEmpty(null)).toBe(true);
  expect(isEmpty(1)).toBe(false);
  expect(isEmpty(false)).toBe(true);
  expect(isEmpty('undefined')).toBe(false);
  expect(isEmpty('null')).toBe(false);
  expect(isEmpty({})).toBe(false);
});

test('convert hex to rgba', () => {
  expect(convertHex('#FF120AE')).toBe('rgb(255,18,10)');
  expect(convertHex('#FF120AE', 0.3)).toBe('rgba(255,18,10,0.3)');
  expect(convertHex('#FF120AE', 30)).toBe('rgba(255,18,10,0.3)');
});

test('shadeOf', () => {
  let rgbValue = convertHex('#12CCAA');
  expect(Colors.shadeOf('#12CCAA')).toBe(rgbValue);
  rgbValue = convertHex('#12CCAA', 0.2);
  expect(Colors.shadeOf('#12CCAA', 0.2)).toBe(rgbValue);
  rgbValue = convertHex('#12CCAA', 50);
  expect(Colors.shadeOf('#12CCAA', 50)).toBe(rgbValue);
});

test('shadeOfBitnationColor', () => {
  let rgbValue = convertHex(Colors.BitnationColor);
  expect(Colors.shadeOfBitnationColor()).toBe(rgbValue);
  rgbValue = convertHex(Colors.BitnationColor, 30);
  expect(Colors.shadeOfBitnationColor(30)).toBe(rgbValue);
});

test('shadeOfBitnationLightColor', () => {
  let rgbValue = convertHex(Colors.BitnationLightColor);
  expect(Colors.shadeOfBitnationLightColor()).toBe(rgbValue);
  rgbValue = convertHex(Colors.BitnationLightColor, 30);
  expect(Colors.shadeOfBitnationLightColor(30)).toBe(rgbValue);
});
