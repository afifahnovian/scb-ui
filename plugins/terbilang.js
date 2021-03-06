/* eslint-disable eqeqeq */
import Vue from 'vue'

/*
  Fungsi => terbilang(angka)
    Penjelasan :
      ~ angka : angka yang ingin dijadikan kata-kata
    Contoh :
      terbilang(100) : return => seratus
      terbilang(23) : return => dua puluh tiga
 */

const convertToUnit = (digit) => {
  if (digit >= 63) return 'vigintiliun'
  else if (digit >= 60) return 'novemdesiliun'
  else if (digit >= 57) return 'oktodesiliun'
  else if (digit >= 54) return 'septendesiliun'
  else if (digit >= 51) return 'sexdesiliun'
  else if (digit >= 48) return 'quindesiliun'
  else if (digit >= 45) return 'quattuordesiliun'
  else if (digit >= 42) return 'tredesiliun'
  else if (digit >= 39) return 'duodesiliun'
  else if (digit >= 36) return 'undesiliun'
  else if (digit >= 33) return 'desiliun'
  else if (digit >= 30) return 'noniliun'
  else if (digit >= 27) return 'oktiliun'
  else if (digit >= 24) return 'septiliun'
  else if (digit >= 21) return 'sextiliun'
  else if (digit >= 18) return 'quintiliun'
  else if (digit >= 15) return 'quadriliun'
  else if (digit >= 12) return 'triliun'
  else if (digit >= 9) return 'milyar'
  else if (digit >= 6) return 'juta'
  else if (digit >= 3) return 'ribu'
  else return ''
}

const numberToString = (index) => {
  const numbers = [
    'satu',
    'dua',
    'tiga',
    'empat',
    'lima',
    'enam',
    'tujuh',
    'delapan',
    'sembilan'
  ]
  return numbers[index - 1] || ''
}

const numberInWords = (angka) => {
  if (/^0*$/.test(angka)) {
    return 'nol'
  }
  let result = ''
  let printUnit = true
  let isBelasan = false

  for (let i = 0; i < angka.length; i++) {
    const length = angka.length - 1 - i
    if (length % 3 == 0) {
      const num =
        angka[i] == 1 &&
        (isBelasan ||
          (convertToUnit(length) == 'ribu' &&
            (angka[i - 2] == undefined || angka[i - 2] == 0) &&
            (angka[i - 1] == undefined || angka[i - 1] == 0)))
          ? 'se'
          : `${numberToString(angka[i])} `
      result += ` ${num}`

      if (
        (angka[i - 2] && angka[i - 2] != 0) ||
        (angka[i - 1] && angka[i - 1] != 0) ||
        angka[i] != 0
      ) {
        printUnit = true
      }
      if (printUnit) {
        printUnit = false
        result += (isBelasan ? 'belas ' : '') + convertToUnit(length)
        if (isBelasan) {
          isBelasan = false
        }
      }
    } else if (length % 3 == 2 && angka[i] != 0) {
      result += ` ${angka[i] == 1 ? 'se' : numberToString(angka[i]) + ' '}ratus`
    } else if (length % 3 == 1 && angka[i] != 0) {
      if (angka[i] == 1) {
        if (angka[i + 1] == 0) {
          result += ' sepuluh'
        } else {
          isBelasan = true
        }
      } else {
        result += ` ${numberToString(angka[i])} puluh`
      }
    }
  }
  return result.trim().replace(/\s+/g, ' ')
}

Vue.prototype.$terbilang = (angka) => {
  // Check null value
  if (angka == null || angka == '' || isNaN(angka)) return ''

  // Check minus
  let prefix = ''
  if (parseInt(angka, 10) < 0) {
    prefix = 'minus '
    angka = parseInt(angka, 10) * -1
  }

  // Do the work
  const bagian = angka.toString().split('.')
  let hasil = ''
  for (let i = 0; i < bagian.length; i++) {
    hasil += numberInWords(bagian[i]) + ' '
    if (i != bagian.length - 1) {
      hasil += 'koma '
    }
  }

  return prefix + hasil + 'rupiah'
}
