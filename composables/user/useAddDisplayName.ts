export const useAddDisplayName = () => {
  const { $userService } = useNuxtApp();
  const { currentUser } = useCurrentUser();
  const { createToast } = useToast();
  const isAddDisplayNameProcessing = ref<boolean>(false);
  const isDisplayNameExist = ref<boolean>(false);

  const addDisplayNameFormSchema = createSchemaValidationBuilder()
    .buildDisplayNameSchema(currentUser.value?.username)
    .build();

  const addDisplayNameValidationSchema = toTypedSchema(addDisplayNameFormSchema);

  const addDisplayName = async (addDisplayNameFormValue: IUpdateInfoBody): Promise<boolean> => {
    isAddDisplayNameProcessing.value = true;
    try {
      await $userService.updateInfo(addDisplayNameFormValue);
      currentUser.value = Object.assign({}, currentUser.value, { fullname: addDisplayNameFormValue.fullname });
      return true;
    } catch (error) {
      createToast({
        variant: "destructive",
        description: (error as INuxtCustomError).message,
      });
      return false;
    } finally {
      isAddDisplayNameProcessing.value = false;
    }
  };

  return {
    addDisplayName,
    isAddDisplayNameProcessing,
    isDisplayNameExist,
    addDisplayNameValidationSchema,
  };
};
