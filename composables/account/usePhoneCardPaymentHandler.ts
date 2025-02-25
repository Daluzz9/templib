import _ from "lodash";
import { MaintenanceStatusIndicatorBtnStatusEnum } from "~/components/molecules/button/maintenance-status-indicator-btn";

export const usePhoneCardPaymentHandler = () => {
  const { mappedSystemPhoneCardPaymentWImg } = useSystemPhoneCardPayment();

  const getInitPhoneCardPayment = () => {
    let initPhoneCardPayment;
    if (mappedSystemPhoneCardPaymentWImg.value) {
      initPhoneCardPayment = mappedSystemPhoneCardPaymentWImg.value.find(
        (network) => network.systemPhoneCardPaymentInfo.status === SystemCardPaymentResponseStatus.USEABLE,
      );
    }

    if (!initPhoneCardPayment) {
      return {
        systemPhoneCardProviderName: SystemPhoneCardPaymentNameEnum.VIETTEL,
        img: "",
        systemPhoneCardPaymentInfo: { rate: 0, value: [], status: 0 },
      };
    }

    return _.cloneDeep(initPhoneCardPayment);
  };

  const currentPhoneCardPaymentWImg = reactive<IMappedSystemPhoneCardPaymentWImg>(getInitPhoneCardPayment());

  const phoneCardPriceByProviderList = computed<number[] | undefined>(() => {
    if (mappedSystemPhoneCardPaymentWImg.value === undefined || mappedSystemPhoneCardPaymentWImg.value === null) {
      return;
    }

    const currentAmount = mappedSystemPhoneCardPaymentWImg.value.find(
      (network) => network.systemPhoneCardProviderName === currentPhoneCardPaymentWImg.systemPhoneCardProviderName,
    );

    if (!currentAmount) {
      return [];
    }

    return currentAmount.systemPhoneCardPaymentInfo.value;
  });

  const getPhoneCardPaymentStatus = (
    selectedPhoneCardPayment: IMappedSystemPhoneCardPaymentWImg,
  ): MaintenanceStatusIndicatorBtnStatusEnum => {
    if (selectedPhoneCardPayment.systemPhoneCardPaymentInfo.status !== SystemCardPaymentResponseStatus.USEABLE) {
      return MaintenanceStatusIndicatorBtnStatusEnum.MAINTENANCE;
    }

    if (
      selectedPhoneCardPayment.systemPhoneCardProviderName === currentPhoneCardPaymentWImg.systemPhoneCardProviderName
    ) {
      return MaintenanceStatusIndicatorBtnStatusEnum.ACTIVE;
    }

    return MaintenanceStatusIndicatorBtnStatusEnum.DEFAULT;
  };

  /*
   - Theo dõi sự thay đổi của mappedSystemPhoneCardPaymentWImg.value
   - Khi giá trị mới (newValue) tồn tại nhưng giá trị cũ (oldValue) chưa được thiết lập,
    thì cập nhật lại currentPhoneCardPaymentWImg bằng dữ liệu khởi tạo từ getInitPhoneCardPayment().
   - Điều này đảm bảo currentPhoneCardPaymentWImg luôn có giá trị hợp lệ khi dữ liệu hệ thống thay đổi.
  */
  watch(
    () => mappedSystemPhoneCardPaymentWImg.value,
    (newValue, oldValue) => {
      if (newValue && !oldValue) {
        _.merge(currentPhoneCardPaymentWImg, getInitPhoneCardPayment());
      }
    },
  );

  return {
    phoneCardPriceByProviderList,
    currentPhoneCardPaymentWImg,
    mappedSystemPhoneCardPaymentWImg,
    getPhoneCardPaymentStatus,
  };
};
