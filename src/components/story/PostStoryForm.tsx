import React from "react";
import { useTransaction } from "../../context/TransactionContext";

const PostStoryForm = ({
  story,
  setStory,
}: {
  story: { title: string; content: string; textLength: number };
  setStory: React.Dispatch<
    React.SetStateAction<{ title: string; content: string; textLength: number }>
  >;
}) => {
  const { selectedTransactionList, totalPrice } = useTransaction();

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStory((prev) => ({ ...prev, title: e.target.value }));
    // if (e.target.value.length === 0) {
    //   setStory((prev) => ({ ...prev, title: "스토리 제목" }));
    // } else {
    //   setStory((prev) => ({ ...prev, title: e.target.value }));
    // }
  };

  const handleTextCount = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.value.length === 0) {
      setStory((prev) => ({ ...prev, textLength: 0 }));
    } else {
      setStory((prev) => ({ ...prev, textLength: e.target.value.length }));
    }
    setStory((prev) => ({ ...prev, content: e.target.value }));
  };
  return (
    <>
      <div className="border border-hanaGray2 rounded-2xl px-8 py-4 bg-white">
        <img src="/images/hanabank.png" alt="hanabank" className="w-8 h-8" />
        <div className="h-10">{story.title}</div>
        <div className="text-xs text-hanaGray2 text-right">
          총 {selectedTransactionList.length}회
        </div>
        <div className="text-right">
          <span className="text-sm text-hanaRed">출금 </span>
          <span className="font-bold">
            {totalPrice.toLocaleString("KR-kr")}원
          </span>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <input
          type="text"
          value={story.title}
          className="w-full h-10 border border-hanaGray2 rounded-lg indent-4"
          placeholder="스토리 제목을 입력해주세요."
          onChange={handleTitleChange}
        />
        <textarea
          value={story.content}
          className="w-full h-28 border border-hanaGray2 rounded-lg px-4 py-2"
          placeholder="스토리 내용을 입력해주세요."
          maxLength={500}
          onChange={handleTextCount}
        />
        <span className="text-right text-xs">
          <span className="text-hanaGreen">{story.textLength}자</span> / 500자
        </span>
      </div>
    </>
  );
};

export default PostStoryForm;
