import { createContext, ReactNode, useContext, useState } from "react";

interface updateTransactionType {
  transactionIdx: number[];
  storyTitle: string;
  storyContent: string;
}

const defaultValue = {
  selectedTransactionList: [] as number[],
  totalPrice: 0,
  updateTransaction: {},
  chosenTransaction: (transactionIdx: number[], transactionPrice: number) => {},
  storeUpdatedTransaction: (
    transactionIdx: number[],
    storyTitle: string,
    storyContent: string,
  ) => {},
};

const TransactionContext = createContext(defaultValue);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTransactionList, setSelectedTransactionList] = useState(
    defaultValue.selectedTransactionList,
  );
  const [totalPrice, setTotalPrice] = useState<number>(defaultValue.totalPrice);
  const [updateTransaction, setUpdateTransaction] =
    useState<updateTransactionType>({
      transactionIdx: [],
      storyTitle: "",
      storyContent: "",
    });

  const chosenTransaction = (
    transactionIdx: number[],
    transactionPrice: number,
  ) => {
    setSelectedTransactionList([...transactionIdx]);
    setTotalPrice(transactionPrice);
  };

  const storeUpdatedTransaction = (
    transactionIdx: number[],
    storyTitle: string,
    storyContent: string,
  ) => {
    setUpdateTransaction({
      transactionIdx: [...transactionIdx],
      storyTitle: storyTitle,
      storyContent: storyContent,
    });
  };

  return (
    <TransactionContext.Provider
      value={{
        selectedTransactionList,
        totalPrice,
        updateTransaction,
        chosenTransaction,
        storeUpdatedTransaction,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => useContext(TransactionContext);
