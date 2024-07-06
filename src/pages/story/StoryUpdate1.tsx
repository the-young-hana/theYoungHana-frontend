import React from "react";
import { TopBar } from "../../components/common/TopBar";
import { useParams } from "react-router-dom";
import { useTransaction } from "../../context/TransactionContext";
import TransactionList from "../../components/story/TransactionList";
import TotalPrice from "../../components/story/TotalPrice";

const StoryUpdate1 = () => {
  const { storyIdx } = useParams();

  const { updateTransaction } = useTransaction();

  console.log(updateTransaction);

  return (
    <>
      <TopBar title="스토리 수정" path={`/story/detail/${storyIdx}`} />
      <div className="pt-14">
        <TransactionList />
        <TotalPrice />
      </div>
    </>
  );
};

export default StoryUpdate1;
