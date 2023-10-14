import axios from 'axios';

/**
 * Function to form the Request Object
 * @memberof RestAPIHandler
 */
export const RestAPIHandler = {
  async invokeRESTApi(options) {
    return axios(options)
      .then(res => {
        if (res.status === 200) {
          return res.data;
        }
        const {errorModel} = this;
        errorModel.errCode = res.status;
        return errorModel;
      })
      .catch(errors => handleError(errors));
  },
};

/**
 * Function to Handle Error
 * @memberof RestAPIHandler
 */
function handleError(error) {
  const errorObj = {
    isAxiosError: true,
    statuscode: error?.response?.status || '100',
    errorMsg: error?.response?.data || 'General Error',
  };
  return errorObj;
}

/**
 * Function to check the axios response success
 * @memberof RestAPIHandler
 */
export function isResponseSuccess(response) {
  return !response?.errorMessageKey && !response?.isAxiosError;
}
