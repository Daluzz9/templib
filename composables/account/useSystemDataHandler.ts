import _ from "lodash";

export const useSystemDataHandler = () => {
  const { $systemService } = useNuxtApp();

  const appStore = useAppStore();
  const { systemPlan, systemDepositPayment } = storeToRefs(appStore);

  const fetchDataOnDeposit = async () => {
    await Promise.allSettled([fetchAndUpdateSystemDepositPayment(), fetchAndUpdateSystemPlan()]);
  };

  const fetchAndUpdateSystemPlan = async () => {
    try {
      const data = await $systemService.getSystemPlan();
      systemPlan.value = data;
    } catch {
      // TODO Meidai: update using logger service in not expected error case
    }
  };

  const fetchAndUpdateSystemDepositPayment = async () => {
    try {
      systemDepositPayment.value = undefined;
      const res = await $systemService.getSystemDepositPayment();
      systemDepositPayment.value = _.merge(systemDepositPayment.value, res);
    } catch {
      // TODO Meidai: update using logger service in not expected error case
    }
  };

  const initSystemData = async (): Promise<void> => {
    await Promise.allSettled([fetchAndUpdateSystemPlan(), fetchAndUpdateSystemDepositPayment()]);
  };

  return {
    initSystemData,
    fetchDataOnDeposit,
    fetchAndUpdateSystemPlan,
    fetchAndUpdateSystemDepositPayment,
  };
};
