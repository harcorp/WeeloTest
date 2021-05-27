/**
 * Request util contain methods to help server request
 */
export default class RequestUtil {
  /**
   * Method to validate if backend response is valid
   * @param response
   */
  static isBackendResponseOK(response: any): boolean {
    return response.status === 200;
  }
}
