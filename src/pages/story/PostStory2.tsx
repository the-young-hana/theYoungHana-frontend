import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/cookie";
import { ImageClient } from "../../apis/imageClient";
import { useTransaction } from "../../context/TransactionContext";
import { TopBar } from "../../components/common/TopBar";
import ImageUpload from "../../components/common/ImageUpload";
import { Button } from "../../components/common/Button";
import PostStoryForm from "../../components/story/PostStoryForm";

function PostStory2() {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [story, setStory] = useState({
    title: "",
    content: "",
    textLength: 0,
  });

  const { selectedTransactionList, chosenTransaction } = useTransaction();

  const handleMakeStory = async () => {
    const formData = new FormData();

    const storyInfo = new Blob(
      [
        JSON.stringify({
          storyTitle: story.title,
          storyContent: story.content,
          deptIdx: getCookie("deptIdx"),
          transactionList: [...selectedTransactionList],
        }),
      ],
      { type: "application/json" },
    );
    formData.append("storyCreateReqDto", storyInfo);

    for (let i = 0; i < images.length; i += 1) {
      formData.append("imgs", images[i]);
    }

    try {
      const res = await ImageClient.getInstance().postStory(formData);
      console.log(res);
      if (res.status === 200) {
        chosenTransaction([], 0);
        navigate("/story/completion", { state: "postStory" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <TopBar
        title="스토리 추가"
        path={`/story/post/${getCookie("deptIdx")}`}
      />

      {/* 스토리 정보 확인 */}
      <div className="flex flex-col gap-6 mt-2 px-4 pt-14 bg-white h-full">
        <PostStoryForm story={story} setStory={setStory} />

        {/* 이미지 선택 */}
        <ImageUpload images={images} setImages={setImages} />

        <div className="absolute bottom-6 w-11/12">
          <Button className="w-full mt-4" onClick={handleMakeStory}>
            스토리 만들기
          </Button>
        </div>
      </div>
    </>
  );
}

export default PostStory2;
