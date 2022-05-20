import { Button } from '~/components/Button';
import { CustomText } from '~/components/CustomText';
import { Input } from '~/components/Input';
import { Picker } from '~/components/Picker';
import Radio from '~/components/Radio';
import { Screen } from '~/components/Screen';

import useHook from './hook';

const SendScreen = () => {
  const { currencyData, fieldProps, formik, loading, receiveAmount, selectedUser, userData } =
    useHook();

  return (
    <Screen
      header={{ headerTitle: 'Send money', headerMode: 'modal' }}
      keyboardShouldPersistTaps="never"
      mode="keyboard-aware"
    >
      <CustomText>Transfer to:</CustomText>
      <Picker data={userData} {...fieldProps('receiverId')} />
      <Radio containerProps={{ mb: '20px' }} data={currencyData} {...fieldProps('currency')} />
      <Input
        label="Amount"
        placeholder="Enter amount"
        keyboardType="number-pad"
        {...fieldProps('amount')}
      />
      {!!receiveAmount && (
        <CustomText mb="40px">
          {selectedUser?.firstName} will receive {}
          <CustomText>{receiveAmount}</CustomText>
        </CustomText>
      )}

      <Input label="Note" placeholder="Enter note" textarea {...fieldProps('description')} />

      <Button
        disabled={!formik.isValid}
        label="Send"
        loading={loading}
        onPress={formik.submitForm}
        type={formik.isValid ? 'primary' : 'default'}
      />
    </Screen>
  );
};

export default SendScreen;
