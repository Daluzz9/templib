export const useOtp = () => {
  const { createToast } = useToast();
  const { $systemService } = useNuxtApp();

  const sendOtp = async (): Promise<{ remainTime?: string; isSucceeded: boolean }> => {
    try {
      const res = await $systemService.sendOtp();

      // 422: OTP is already lived
      if (res.code === 422 && res.data?.expired_time) {
        createToast({
          variant: "warning",
          description: res.message,
        });
        return { remainTime: res.data.expired_time, isSucceeded: true };
      }

      createToast({
        description: res?.message,
      });
      return {
        remainTime: new Date(Date.now() + 3 * 60 * 1000).toISOString(),
        isSucceeded: true,
      };
    } catch (error) {
      // 400: send OTP many times
      if ((error as INuxtCustomError).statusCode === 400) {
        createToast({
          variant: "warning",
          description: (error as INuxtCustomError).message,
        });
        return { remainTime: undefined, isSucceeded: false };
      }

      // TODO Meidai: update using logger service in not expected error case
      return { remainTime: undefined, isSucceeded: false };
    }
  };

  const verifyOtp = async (otp: string): Promise<{ isSucceeded: boolean }> => {
    try {
      const res = await $systemService.verifyOtp(otp);

      /**
       * 405: send OTP many wrong times (5)
       * 408: OTP expired
       * 422: OTP is empty
       */
      const warningCode = [405, 408, 422];
      if (res.code && warningCode.includes(res.code)) {
        createToast({
          variant: "warning",
          description: res.message,
        });
        return { isSucceeded: false };
      }

      createToast({
        description: res.message,
      });
      return { isSucceeded: true };
    } catch (error) {
      /**
       * 400: OTP is wrong
       * 405: verify OTP many wrong times (5)
       * 408: OTP expired
       * 422: OTP is empty
       */
      const expectedError = [400, 405, 408, 422];
      if (expectedError.includes((error as INuxtCustomError).statusCode)) {
        createToast({
          variant: "warning",
          description: (error as INuxtCustomError).message,
        });
        return { isSucceeded: false };
      }

      // TODO Meidai: update using logger service in not expected error case
      return { isSucceeded: false };
    }
  };

  return {
    sendOtp,
    verifyOtp,
  };
};
