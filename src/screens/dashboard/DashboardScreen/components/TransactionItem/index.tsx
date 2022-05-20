import { useMemo } from 'react';

import { Feather } from '@expo/vector-icons';
import dayjs from 'dayjs';

import { Container } from '~/components/Container';
import { CustomText } from '~/components/CustomText';
import useCurrentUser from '~/hooks/useCurrentUser';
import { Colors } from '~/themes';
import { amountToFix } from '~/utils/string';

import { Props } from './types';

const TransactionItem: React.FC<Props> = ({ transaction }) => {
  const { currentUser } = useCurrentUser();

  const { amount, currency, description, exchangeRate, receiver, sender, createdAt } = transaction;

  const isCurrentSender = sender.id === currentUser.id;

  const receiverAmount = useMemo(() => {
    const receiverCurrency = receiver.accounts[0].currency;
    if (receiverCurrency === currency) {
      return `+${amountToFix(amount)} ${receiverCurrency}`;
    }
    return `+${amountToFix(amount * exchangeRate)} ${receiverCurrency}`;
  }, [amount, currency, exchangeRate, receiver.accounts]);

  const senderAmount = useMemo(() => {
    const senderCurrency = sender.accounts[0].currency;
    if (senderCurrency === currency) {
      return `-${amountToFix(amount)} ${senderCurrency}`;
    }
    return `-${amountToFix(amount / exchangeRate)} ${senderCurrency}`;
  }, [amount, currency, exchangeRate, sender.accounts]);

  const senderName = `${sender.firstName} ${sender.lastName}`;
  const receiverName = `${receiver.firstName} ${receiver.lastName}`;
  return (
    <Container p="20px">
      <CustomText fontSize="11px">{dayjs(createdAt).format('DD.MM.YYYY. HH:mm')}</CustomText>

      <Container flexDirection="row" alignItems="center" justifyContent="space-between">
        <Container flex={1} pr="20px">
          <Container
            flex={1}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
          >
            <CustomText color={Colors.black}>
              To {isCurrentSender ? receiverName : senderName}
            </CustomText>
            <CustomText color={Colors.black}>{receiverAmount}</CustomText>
          </Container>

          <Container flexDirection="row" alignItems="center" justifyContent="space-between">
            <CustomText type="caption">
              From {isCurrentSender ? senderName : receiverName}
            </CustomText>
            <CustomText type="caption">{senderAmount}</CustomText>
          </Container>
        </Container>

        {isCurrentSender ? (
          <Feather color={Colors.red} name="arrow-down-circle" size={22} />
        ) : (
          <Feather color={Colors.green} name="arrow-up-circle" size={22} />
        )}
      </Container>

      {!!description && <CustomText>{description}</CustomText>}
    </Container>
  );
};

export default TransactionItem;
