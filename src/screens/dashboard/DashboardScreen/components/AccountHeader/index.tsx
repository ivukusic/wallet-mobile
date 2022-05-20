import Icon from 'react-native-ico-flags';

import { Container } from '~/components/Container';
import { CustomText } from '~/components/CustomText';
import { Colors } from '~/themes';
import { IAccountType, ICurrencyType } from '~/types';
import { amountToFix } from '~/utils/string';

import useHook from './hook';
import { Account, Scroll } from './styles';

const flags = {
  [ICurrencyType.USD]: 'united-states-of-america',
  [ICurrencyType.EUR]: 'european-union',
  [ICurrencyType.YEN]: 'japan',
};

const currencies = {
  [ICurrencyType.USD]: 'US Dollar',
  [ICurrencyType.EUR]: 'EU Euro',
  [ICurrencyType.YEN]: 'JA YEN',
};

const AccountHeader = () => {
  const { accounts } = useHook();

  const renderAccount = (item: IAccountType) => (
    <Account key={item.id}>
      <Icon name={flags[item.currency]} />
      <Container>
        <CustomText>
          {item.balance.toString().includes('.') ? amountToFix(item.balance) : item.balance}{' '}
          {item.currency}
        </CustomText>
        <CustomText type="caption">{currencies[item.currency]}</CustomText>
      </Container>
    </Account>
  );

  return (
    <Container backgroundColor={Colors.header} pb="200px" width="100%">
      <Scroll horizontal showsHorizontalScrollIndicator={false}>
        {!!accounts?.length && accounts.map(renderAccount)}
      </Scroll>
    </Container>
  );
};

export default AccountHeader;
