import 'intl';
import 'intl/locale-data/jsonp/en';

/**
 * Formatter Util
 * Contain method to format values
 */
export default class FormattersUtil {
  /**
   * Format value to USD Currency string
   * @param value
   * @return string
   */
  static formatCurrencyUSD(value: number): string {
    return new Intl.NumberFormat('us-us', {
      style: 'currency',
      currency: 'USD',
    }).format(value);
  }

  /**
   * Format value to BTC Currency string
   * @param value
   * @return string
   */
  static formatCurrencyBTC(value: number): string {
    return new Intl.NumberFormat('us-us', {
      style: 'currency',
      currency: 'BTC',
      minimumFractionDigits: 6,
    }).format(value);
  }
}
