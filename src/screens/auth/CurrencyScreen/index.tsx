import { Button } from '~/components/Button';
import { CustomText } from '~/components/CustomText';
import { Picker } from '~/components/Picker';
import { Screen } from '~/components/Screen';

import useHook from './hook';

const CurrencyScreen = () => {
  const { currency, handleChange, handleSave, loading, pickerData } = useHook();

  return (
    <Screen alignItems="center" justifyContent="center" mode="scroll">
      <CustomText mb="10px" type="h4">
        Currency
      </CustomText>
      <CustomText mb="40px">Please select your default currency</CustomText>

      <Picker data={pickerData} onChange={handleChange} value={currency} />

      <Button label="Save" loading={loading} onPress={handleSave} type="primary" />
    </Screen>
  );
};

export default CurrencyScreen;
