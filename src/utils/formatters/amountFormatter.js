//@flow
import numeral from 'numeral';

export function formatETH(balance: string, fallbackString: string, successSuffix: string): string {
  successSuffix = successSuffix || '';
  if (balance === null || balance === undefined) {
    return fallbackString;
  }

  const eth = parseFloat(balance);

  if (eth < 1) {
    const mEth = eth * 1000;
    return numeral(mEth).format('0[.][000]') + ' mETH' + successSuffix;
  }

  return numeral(eth).format('0[.][000]') + ' ETH' + successSuffix;
}