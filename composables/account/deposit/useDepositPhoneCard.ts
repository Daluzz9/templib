import _ from "lodash";

export const useDepositPhoneCard = () => {
  const { $depositService } = useNuxtApp();

  const { createToast } = useToast();

  const { setComposableResponse } = useSharedComposableResponse<IDepositCardData>();
  const {
    currentPhoneCardPaymentWImg,
    phoneCardPriceByProviderList,
    mappedSystemPhoneCardPaymentWImg,
    getPhoneCardPaymentStatus,
  } = usePhoneCardPaymentHandler();

  enum DepositPhoneCardFormFIeldsEnum {
    CARD_AMOUNT = "card_amount",
    CARD_CODE = "card_code",
    CARD_SERIAL = "card_serial",
    TO_TELCOM_CODE = "to_telcom_code",
  }

  const depositCardFormSchema = computed(() => {
    const schema = createSchemaValidationBuilder()
      .buildCardSerialSchema(currentPhoneCardPaymentWImg.systemPhoneCardProviderName)
      .buildCardCodeSchema(currentPhoneCardPaymentWImg.systemPhoneCardProviderName)
      .build();

    return toTypedSchema(schema);
  });

  const { handleSubmit, submitCount, isSubmitting, values, errors, resetForm, defineField, setFieldValue } =
    useForm<IDepositPhoneCardBody>({
      validationSchema: depositCardFormSchema.value,
      initialValues: {
        card_amount: 0,
        card_code: "",
        card_serial: "",
        to_telcom_code: currentPhoneCardPaymentWImg.systemPhoneCardProviderName,
      },
    });

  const shouldValidate = computed(() => submitCount.value > 0); // Enable validation only after the form has been submitted at least once

  const [cardNetwork] = defineField(DepositPhoneCardFormFIeldsEnum.TO_TELCOM_CODE);
  const [cardAmount] = defineField(DepositPhoneCardFormFIeldsEnum.CARD_AMOUNT);
  const [cardCode] = defineField(DepositPhoneCardFormFIeldsEnum.CARD_CODE, {
    validateOnBlur: shouldValidate.value,
    validateOnChange: shouldValidate.value,
    validateOnInput: shouldValidate.value,
    validateOnModelUpdate: shouldValidate.value,
  });
  const [cardSerial] = defineField(DepositPhoneCardFormFIeldsEnum.CARD_SERIAL, {
    validateOnBlur: shouldValidate.value,
    validateOnChange: shouldValidate.value,
    validateOnInput: shouldValidate.value,
    validateOnModelUpdate: shouldValidate.value,
  });

  const systemPhoneCardPaymentFee = computed<number>(() => {
    return Math.round((1 - (currentPhoneCardPaymentWImg.systemPhoneCardPaymentInfo.rate || 0)) * 100);
  });

  const isDepositCardDisabled = computed<boolean>(() => {
    return Object.values(values).some((value) => !value); // values is the formValues
  });

  const handlePasteContent = async (fieldName: DepositPhoneCardFormFIeldsEnum) => {
    const clipboardData = await navigator.clipboard.readText();
    return currentPhoneCardPaymentWImg.systemPhoneCardProviderName === SystemPhoneCardPaymentNameEnum.ZING
      ? clipboardData
          .replace(/\s/g, "")
          .substring(
            0,
            fieldName === DepositPhoneCardFormFIeldsEnum.CARD_SERIAL ? CARD_SERIAL_LENGTH.MAX : CARD_CODE_LENGTH.MAX,
          )
      : clipboardData
          .replace(/\s/g, "")
          .replace(/[^0-9]/g, "")
          .substring(
            0,
            fieldName === DepositPhoneCardFormFIeldsEnum.CARD_SERIAL ? CARD_SERIAL_LENGTH.MAX : CARD_CODE_LENGTH.MAX,
          );
  };

  const handleActionCardSerial = async () => {
    if (cardSerial.value) {
      // action delete
      setFieldValue(DepositPhoneCardFormFIeldsEnum.CARD_SERIAL, "", shouldValidate.value);
    } else {
      // action paste
      const value = await handlePasteContent(DepositPhoneCardFormFIeldsEnum.CARD_SERIAL);
      setFieldValue(DepositPhoneCardFormFIeldsEnum.CARD_SERIAL, value, shouldValidate.value);
    }
  };

  const handleActionCardCode = async () => {
    if (cardCode.value) {
      // action delete
      setFieldValue(DepositPhoneCardFormFIeldsEnum.CARD_CODE, "", shouldValidate.value);
    } else {
      // action paste
      const value = await handlePasteContent(DepositPhoneCardFormFIeldsEnum.CARD_CODE);
      setFieldValue(DepositPhoneCardFormFIeldsEnum.CARD_CODE, value, shouldValidate.value);
    }
  };

  const handleSelectCardNetwork = (selectedPhoneCard: IMappedSystemPhoneCardPaymentWImg) => {
    if (currentPhoneCardPaymentWImg.systemPhoneCardProviderName !== selectedPhoneCard.systemPhoneCardProviderName) {
      resetForm(); // reset data when changing selectedPhoneCard
      _.merge(currentPhoneCardPaymentWImg, selectedPhoneCard);
      cardNetwork.value = selectedPhoneCard.systemPhoneCardProviderName;
    }
  };

  const submitFormDepositCard = handleSubmit(async () => {
    try {
      const response = await $depositService.sendDepositCardRequest(values);

      setComposableResponse(response);
      navigateTo(APP_PATH.TRANSACTION_HISTORY);
      createToast({
        description: "Tạo phiếu nạp thành công.",
      });
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message || "Nạp tiền thất bại",
      });
    }
  });

  return {
    DepositPhoneCardFormFIeldsEnum,
    systemPhoneCardPaymentFee,
    phoneCardPriceByProviderList,
    currentPhoneCardPaymentWImg,
    mappedSystemPhoneCardPaymentWImg,
    handleSelectCardNetwork,
    isDepositCardDisabled,
    handleActionCardCode,
    handleActionCardSerial,
    submitFormDepositCard,
    getPhoneCardPaymentStatus,
    cardAmount,
    cardCode,
    cardSerial,
    handleSubmit,
    isSubmitting,
    errors,
  };
};
