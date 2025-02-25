enum FieldEnum {
  USERNAME = "username",
  FULLNAME = "fullname",
  EMAIL = "email",
  PHONE = "phone",
  MASK_PASSWORD = "maskPassword",
  PASSWORD = "password",
  NEW_PASSWORD = "newPassword",
  CONFIRM_NEW_PASSWORD = "confirmNewPassword",
}

type IProfileForm = {
  username: string;
  fullname?: string;
  email: string;
  phone: string;
  password?: string;
  newPassword?: string;
  maskPassword: string;
  confirmNewPassword?: string;
};

type IFormField = {
  key: FieldEnum;
  type: "text" | "email" | "password" | "number";
  label: string;
  minLength: number;
  maxLength: number;
  disabled?: Ref<boolean>;
  isShow?: boolean;
};

type IDomVirtual = HTMLElement & { focus: () => void };

const DEFAULT_DISPLAY_PASSWORD = "***********";

const passwordRelatedFields = [FieldEnum.PASSWORD, FieldEnum.NEW_PASSWORD, FieldEnum.CONFIRM_NEW_PASSWORD];

export const useProfileInfo = () => {
  const { $userService, $device } = useNuxtApp();
  const { refreshUserInfo } = useRefresh();

  const { currentUser } = useCurrentUser();
  const { createToast } = useToast();
  const isChangingPassword = ref<boolean>(false);
  const isSendingVerifyEmail = ref<boolean>(false);
  const dynamicRefs = ref<Record<string, IDomVirtual | undefined>>({});

  // account will always used with currentUser.value available
  const user = currentUser.value!;

  const isVerifiedEmail = computed(() => user.is_verify_email);
  const isVerifiedPhone = computed(() => user.is_verify_phone);
  const isDisplayNameUpdated = computed(() => user.fullname !== user.username);

  const formProfileValues = reactive<IProfileForm>({
    username: user.username,
    fullname: isDisplayNameUpdated.value ? user.fullname : undefined,
    email: isVerifiedEmail.value ? user.emailmask : user.email,
    phone: isVerifiedPhone.value ? user.phonemask : user.phone,
    maskPassword: DEFAULT_DISPLAY_PASSWORD,
    password: undefined,
    newPassword: undefined,
  });

  watchEffect(() => {
    if (isVerifiedEmail.value && formProfileValues.email === user.email) {
      formProfileValues.email = user.emailmask;
    }
  });

  const baseFields: IFormField[] = [
    {
      key: FieldEnum.USERNAME,
      label: "Tên đăng nhập",
      type: "text",
      minLength: 6,
      maxLength: 29,
      disabled: ref(true),
      isShow: true,
    },
    {
      key: FieldEnum.FULLNAME,
      label: "Tên hiển thị",
      type: "text",
      minLength: 6,
      maxLength: 15,
      isShow: true,
      disabled: isDisplayNameUpdated,
    },
    {
      key: FieldEnum.PHONE,
      label: "Số điện thoại",
      type: "number",
      minLength: 10,
      maxLength: 10,
      isShow: true,
      disabled: isVerifiedPhone,
    },
    {
      key: FieldEnum.EMAIL,
      label: "Email",
      type: "email",
      minLength: 6,
      maxLength: 32,
      isShow: true,
      disabled: computed(() => isVerifiedEmail.value || isSendingVerifyEmail.value),
    },
    {
      key: FieldEnum.MASK_PASSWORD,
      label: "Mật khẩu",
      type: "password",
      minLength: 6,
      maxLength: 32,
      isShow: true,
      disabled: ref(true),
    },
    {
      key: FieldEnum.PASSWORD,
      label: "Mật khẩu hiện tại",
      type: "password",
      minLength: 6,
      maxLength: 32,
      isShow: false,
      disabled: ref(false),
    },
    {
      key: FieldEnum.NEW_PASSWORD,
      label: "Mật khẩu mới",
      type: "password",
      minLength: 6,
      maxLength: 32,
      isShow: false,
    },
    {
      key: FieldEnum.CONFIRM_NEW_PASSWORD,
      label: "Nhập lại mật khẩu mới",
      type: "password",
      minLength: 6,
      maxLength: 32,
      isShow: false,
    },
  ];

  const getSortedFields = () => {
    const fields = [...baseFields];

    if ($device.isDesktop) {
      const phoneField = fields.find((field) => field.key === FieldEnum.PHONE);
      const emailField = fields.find((field) => field.key === FieldEnum.EMAIL);

      if (phoneField && emailField) {
        const filteredFields = fields.filter((field) => field.key !== FieldEnum.PHONE && field.key !== FieldEnum.EMAIL);

        const passwordIndex = filteredFields.findIndex((field) => field.key === FieldEnum.MASK_PASSWORD);
        filteredFields.splice(passwordIndex, 0, emailField, phoneField);

        return filteredFields;
      }
    }

    return fields;
  };

  const formFields = reactive<IFormField[]>(getSortedFields());

  const changePasswordValidationSchema = computed(() => {
    const changePasswordSchema = createSchemaValidationBuilder().buildNewPasswordSchema();
    return toTypedSchema(changePasswordSchema);
  });

  const profileValidationSchema = computed(() => {
    // Schema for changing password
    if (isChangingPassword.value) {
      return changePasswordValidationSchema.value;
    }

    // Schema for changing profile
    let profileFormSchema = createSchemaValidationBuilder();

    if (!isVerifiedEmail.value) {
      profileFormSchema = profileFormSchema.buildEmailSchema(true);
    }

    if (!isVerifiedPhone.value) {
      profileFormSchema = profileFormSchema.buildPhoneSchema();
    }

    const schema = profileFormSchema.buildFullnameSchema().build();

    return toTypedSchema(schema);
  });

  const isValidChangePassword = computed(
    () =>
      isChangingPassword.value &&
      !!formProfileValues.password &&
      !!formProfileValues.newPassword &&
      !!formProfileValues.confirmNewPassword,
  );

  const isValidChangeProfile = computed(() => {
    return (
      (formProfileValues.email &&
        user.email !== formProfileValues.email &&
        user.emailmask !== formProfileValues.email) ||
      (!!formProfileValues.fullname && user.fullname !== formProfileValues.fullname) ||
      user.phone !== formProfileValues.phone
    );
  });

  const isEnableButtonSubmit = computed(() => isValidChangeProfile.value || isValidChangePassword.value);

  const setRef = (el: unknown, key: string) => {
    if (el) {
      dynamicRefs.value[key] = el as IDomVirtual;
    } else {
      delete dynamicRefs.value?.[key];
    }
  };

  const allowChangePassword = () => {
    const idxMaskPassword = formFields.findIndex((field) => field.key === FieldEnum.MASK_PASSWORD);
    formFields[idxMaskPassword].isShow = false;
    formFields.filter((field) => passwordRelatedFields.includes(field.key)).forEach((field) => (field.isShow = true));

    isChangingPassword.value = true;

    // Focus to password field
    nextTick(() => {
      dynamicRefs.value?.[FieldEnum.PASSWORD as string]?.focus();
    });
  };

  // TODO confirm again
  const cancelChangePassword = () => {
    const idxMaskPassword = formFields.findIndex((field) => field.key === FieldEnum.MASK_PASSWORD);
    formFields[idxMaskPassword].isShow = true;
    formFields
      .filter((field) => passwordRelatedFields.includes(field.key as FieldEnum))
      .forEach((field) => {
        field.isShow = false;
        formProfileValues[field.key as FieldEnum] = undefined;
      });

    isChangingPassword.value = false;

    window?.scrollBy({
      top: 0,
      behavior: "smooth",
      left: 0,
    });
  };

  const submitUpdatePassword = async (showToast = true): Promise<boolean> => {
    try {
      const message = await $userService.updatePassword({
        password: formProfileValues.password,
        newPassword: formProfileValues.newPassword || "",
      });

      if (message) {
        throw new Error(message);
      }

      cancelChangePassword();

      if (showToast) {
        createToast({
          variant: "success",
          description: "Thay đổi mật khẩu thành công.",
        });
      }

      return true;
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });

      return false;
    }
  };

  const updateProfile = async (showToast = true): Promise<boolean> => {
    try {
      // Update Password if changing password is true
      if (isValidChangePassword.value) {
        const isSucceeded = await submitUpdatePassword(false);
        if (!isSucceeded) return false;
      }

      // Update Profile
      const payload: Partial<IProfileForm> = {};

      if (!isDisplayNameUpdated.value && !!formProfileValues.fullname) {
        payload.fullname = formProfileValues.fullname;
      }

      if (!isVerifiedEmail.value && !!formProfileValues.email) {
        payload.email = formProfileValues.email;
      }

      if (!isVerifiedPhone.value) {
        payload.phone = formProfileValues.phone;
      }

      if (Object.keys(payload).length > 0) {
        await $userService.updateProfileInfo(payload);
        await refreshUserInfo();

        if (showToast) {
          createToast({
            description: "Cập nhật thông tin tài khoản thành công.",
          });
        }
      }

      return true;
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message,
      });

      return false;
    }
  };

  const sendVerifyEmail = async (showToast = true): Promise<boolean> => {
    try {
      if (!formProfileValues.email) {
        return false;
      }

      isSendingVerifyEmail.value = true;

      // Update email before send verify email
      if (isValidChangeProfile.value) {
        const isUpdateProfileSucceeded = await updateProfile(false);
        if (!isUpdateProfileSucceeded) {
          isSendingVerifyEmail.value = false;
          return false;
        }
      }

      const message = await $userService.sendVerifyEmail({
        email: formProfileValues.email,
      });

      if (showToast) {
        createToast({
          description: message || "Vui lòng kiểm tra email để xác thực.",
        });
      }

      return true;
    } catch (error: unknown) {
      createToast({
        variant: "destructive",
        description: (error as Error).message || "Xác thực email thất bại.",
      });

      isSendingVerifyEmail.value = false;
      return false;
    }
  };

  return {
    isDisplayNameUpdated,
    formFields,
    formProfileValues,
    isVerifiedEmail,
    isVerifiedPhone,
    FieldEnum,
    allowChangePassword,
    isChangingPassword,
    cancelChangePassword,
    profileValidationSchema,
    updateProfile,
    isEnableButtonSubmit,
    isSendingVerifyEmail,
    sendVerifyEmail,
    setRef,
    isValidChangeProfile,
    submitUpdatePassword,
    changePasswordValidationSchema,
    dynamicRefs,
  };
};
