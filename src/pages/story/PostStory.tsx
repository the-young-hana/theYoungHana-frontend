import React from "react";
import { TopBar } from "../../components/common/TopBar";
import { getCookie } from "../../utils/cookie";
import TransactionList from "../../components/story/TransactionList";

const PostStory = () => {
  return (
    <>
      <TopBar
        title="스토리 추가"
        path={`/story/${getCookie("deptIdx")}/stories`}
      />
      <div className="mt-14">
        <TransactionList />
      </div>
    </>
  );
};

export default PostStory;
