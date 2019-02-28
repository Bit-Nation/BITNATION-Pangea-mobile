import Color from 'color';

import Colors, { convertHex } from '../../../src/global/colors';

const expectColorsEquality = (lhs, rhs) => {
  expect(Color(lhs).rgb()).toEqual(Color(rhs).rgb());
};

test('convert hex to rgba', () => {
  expectColorsEquality(convertHex('#FF120A'), 'rgb(255,18,10)');
  expectColorsEquality(convertHex('#FF120A', 0.3), 'rgba(255,18,10,0.3)');
});

test('shadeOf', () => {
  expectColorsEquality(Colors.shadeOf('#12CCAA'), '#12CCAA');
  expectColorsEquality(Colors.shadeOf('#12CCAA', 0.2), 'rgba(18,204,170,0.2)');
  expectColorsEquality(Colors.shadeOf('#12CCAA', 0.5), 'rgba(18,204,170,0.5)');
});

test('shadeOfBitnationColor', () => {
  expectColorsEquality(Colors.shadeOfBitnationColor(), Colors.BitnationColor);
  expectColorsEquality(
    Colors.shadeOfBitnationColor(0.3),
    Colors.shadeOf(Colors.BitnationColor, 0.3),
  );
});

test('shadeOfBitnationLightColor', () => {
  expectColorsEquality(Colors.shadeOfBitnationLightColor(), Colors.BitnationLightColor);
  expectColorsEquality(
    Colors.shadeOfBitnationLightColor(0.3),
    Colors.shadeOf(Colors.BitnationLightColor, 0.3),
  );
});
