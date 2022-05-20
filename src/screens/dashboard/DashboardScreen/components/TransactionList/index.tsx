import { Ionicons } from "@expo/vector-icons";
import { useRef } from "react";
import { Animated } from "react-native";
import { Button } from "~/components/Button";

import { Container } from "~/components/Container";
import { CustomText } from "~/components/CustomText";
import { TouchableOpacity } from "~/components/TouchableOpacity";
import { Colors } from "~/themes";
import { IAnyType, ITransactionType } from "~/types";

import TransactionItem from "../TransactionItem";

import useHook from "./hook";
import { FlatContainer, FlatList, FilterButton } from "./styles";

const filters = ["All", "Received", "Sent"];

const TransactionList: React.FC = () => {
  const {
    count,
    data,
    filter,
    handleFilterPress,
    handleLoadMore,
    handleShowFilter,
    showFilter,
  } = useHook();
  const translate = useRef(new Animated.Value(0)).current;

  const renderHeader = () => (
    <Container p="20px" pb="0px" width="100%">
      <Container flexDirection="row" justifyContent="space-between">
        <CustomText type="h5">{filter} activites</CustomText>
        <TouchableOpacity onPress={handleShowFilter}>
          <Ionicons name="filter" size={20} />
        </TouchableOpacity>
      </Container>

      {showFilter && (
        <Container flexDirection="row" pt="10px">
          {filters.map((item) => (
            <FilterButton
              key={item}
              onPress={handleFilterPress(item)}
              selected={item === filter}
            >
              <CustomText color={item === filter ? Colors.white : Colors.body}>
                {item}
              </CustomText>
            </FilterButton>
          ))}
        </Container>
      )}
    </Container>
  );

  const renderFooter = () => {
    if (data?.length && count && data?.length < count) {
      return (
        <Container m="20px">
          <Button label="Load more" onPress={handleLoadMore} />
        </Container>
      );
    }
    return null;
  };

  const keyExtractor = (item: ITransactionType): string => item.id;

  const renderItem = ({ item }: { item: ITransactionType }) => (
    <TransactionItem transaction={item} />
  );
  const translateY = translate.interpolate({
    inputRange: [0, 200, 20000],
    outputRange: [200, 20, 20],
  });
  return (
    <FlatContainer style={{ transform: [{ translateY }] }}>
      <FlatList<IAnyType>
        data={data}
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  y: translate,
                },
              },
            },
          ],
          { useNativeDriver: true }
        )}
        ListHeaderComponent={renderHeader()}
        ListFooterComponent={renderFooter()}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
      />
    </FlatContainer>
  );
};

export default TransactionList;
