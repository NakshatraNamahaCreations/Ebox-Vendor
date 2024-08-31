import {View, Text} from 'react-native';
import React from 'react';

export default function NumberToWord({numberWord}) {
  const numbersToWords = {
    0: 'Zero',
    1: 'One',
    2: 'Two',
    3: 'Three',
    4: 'Four',
    5: 'Five',
    6: 'Six',
    7: 'Seven',
    8: 'Eight',
    9: 'Nine',
    10: 'Ten',
    11: 'Eleven',
    12: 'Twelve',
    13: 'Thirteen',
    14: 'Fourteen',
    15: 'Fifteen',
    16: 'Sixteen',
    17: 'Seventeen',
    18: 'Eighteen',
    19: 'Nineteen',
    20: 'Twenty',
    30: 'Thirty',
    40: 'Forty',
    50: 'Fifty',
    60: 'Sixty',
    70: 'Seventy',
    80: 'Eighty',
    90: 'Ninety',
  };

  // Define the convertNumberToWords function
  function convertNumberToWords(number) {
    if (number < 1000 && number in numbersToWords)
      return numbersToWords[number];

    let words = '';
    let integerPart = Math.floor(number);
    let decimalPart = Math.round((number - integerPart) * 100);

    if (integerPart >= 1000) {
      words +=
        convertNumberToWords(Math.floor(integerPart / 1000)) + ' thousand';
      integerPart %= 1000;
    }

    if (integerPart >= 100) {
      words +=
        (words ? ' ' : '') +
        convertNumberToWords(Math.floor(integerPart / 100)) +
        ' hundred';
      integerPart %= 100;
    }

    if (integerPart > 0) {
      if (words !== '') words += ' and ';
      if (integerPart < 20) words += numbersToWords[integerPart];
      else {
        words += numbersToWords[Math.floor(integerPart / 10) * 10];
        if (integerPart % 10 > 0) {
          words += '-' + numbersToWords[integerPart % 10];
        }
      }
    }

    if (decimalPart > 0) {
      words += ` and ${convertNumberToWords(decimalPart)} paise`;
    }

    return words;
  }

  const convertedWord = convertNumberToWords(numberWord);
  // console.log('convertedWord', convertedWord);

  return (
    <View>
      <Text
        style={{
          fontFamily: 'Montserrat-Bold',
          color: 'black',
        }}>
        {convertedWord}
      </Text>
    </View>
  );
}
