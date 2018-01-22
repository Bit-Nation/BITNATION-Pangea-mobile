//@flow
import numeral from 'numeral';

export function formatETH(balance: string): string {
  const eth = parseFloat(balance);

  if (eth < 0.1) {
    const mEth = eth * 1000;
    return numeral(mEth).format('0[.][000]') + ' mETH';
  }

  return numeral(eth).format('0[.][000]') + ' ETH';
}