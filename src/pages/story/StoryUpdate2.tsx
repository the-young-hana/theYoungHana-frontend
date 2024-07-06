import React, { useEffect, useState } from "react";
import { TopBar } from "../../components/common/TopBar";
import { useNavigate, useParams } from "react-router-dom";
import PostStoryForm from "../../components/story/\bPostStoryForm";
import { useTransaction } from "../../context/TransactionContext";
import { Button } from "../../components/common/Button";
import ApiClient from "../../apis/apiClient";

const StoryUpdate2 = () => {
  const { storyIdx } = useParams();
  const navigate = useNavigate();

  const [story, setStory] = useState({
    title: "스토리 제목",
    content: "",
    textLength: 0,
  });

  const { selectedTransactionList, updateTransaction, chosenTransaction } =
    useTransaction();

  const handleUpdateStory = async () => {
    // const formData = new FormData();

    // const storyInfo = new Blob(
    //   [
    //     JSON.stringify({
    //       storyTitle: story.title,
    //       storyContent: story.content,
    //       deptIdx: getCookie("deptIdx"),
    //       transactionList: [...selectedTransactionList],
    //     }),
    //   ],
    //   { type: "application/json" },
    // );
    // formData.append("storyCreateReqDto", storyInfo);

    // for (let i = 0; i < images.length; i += 1) {
    //   formData.append("imgs", images[i]);
    // }

    try {
      const res = await ApiClient.getInstance().editStory(Number(storyIdx), {
        storyTitle: story.title,
        storyContent: story.content,
        transactionList: selectedTransactionList,
      });
      console.log(res);
      if (res.status === 200) {
        chosenTransaction([], 0);
        navigate("/story/completion", { state: "updateStory" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(updateTransaction);
    setStory({
      title: updateTransaction.storyTitle,
      content: updateTransaction.storyContent,
      textLength: 0,
    });
  }, []);
  return (
    <>
      <TopBar title="스토리 추가" path={`/story/update/${storyIdx}/1`} />
      <div className="flex flex-col gap-6 mt-2 px-4 pt-14 bg-white h-full">
        <PostStoryForm story={story} setStory={setStory} />
      </div>

      <div className="absolute bottom-6 w-11/12">
        <Button className="w-full mt-4" onClick={handleUpdateStory}>
          스토리 수정하기
        </Button>
      </div>
    </>
  );
};

export default StoryUpdate2;
