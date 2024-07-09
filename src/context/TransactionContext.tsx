import { createContext, ReactNode, useContext, useState } from "react";

interface UpdateTransactionType {
  transactionIdx: number[];
  storyTitle: string;
  storyContent: string;
}

interface TransactionContextType {
  selectedTransactionList: number[];
  totalPrice: number;
  updateTransaction: UpdateTransactionType;
  chosenTransaction: (
    transactionIdx: number[],
    transactionPrice: number,
  ) => void;
  storeUpdatedTransaction: (
    transactionIdx: number[],
    storyTitle: string,
    storyContent: string,
  ) => void;
}

const defaultValue: TransactionContextType = {
  selectedTransactionList: [],
  totalPrice: 0,
  updateTransaction: {
    transactionIdx: [],
    storyTitle: "",
    storyContent: "",
  },
  chosenTransaction: (transactionIdx: number[], transactionPrice: number) => {},
  storeUpdatedTransaction: (
    transactionIdx: number[],
    storyTitle: string,
    storyContent: string,
  ) => {},
};

const TransactionContext = createContext<TransactionContextType>(defaultValue);

export const TransactionProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTransactionList, setSelectedTransactionList] = useState(
    defaultValue.selectedTransactionList,
  );
  const [totalPrice, setTotalPrice] = useState<number>(defaultValue.totalPrice);
  const [updateTransaction, setUpdateTransaction] =
    useState<UpdateTransactionType>({
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
