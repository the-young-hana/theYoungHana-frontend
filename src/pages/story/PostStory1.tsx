import React from "react";
import { TopBar } from "../../components/common/TopBar";
import { getCookie } from "../../utils/cookie";
import TransactionList from "../../components/story/TransactionList";
import TotalPrice from "../../components/story/TotalPrice";

function PostStory1() {
  return (
    <>
      <TopBar
        title="스토리 추가"
        path={`/story/${getCookie("deptIdx")}/stories`}
      />
      <div className="mt-14 mb-36 flex-1 flex-col overflow-y-auto">
        <TransactionList />
      </div>
      <TotalPrice />
    </>
  );
}

export default PostStory1;
