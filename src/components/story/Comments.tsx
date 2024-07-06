import React, { RefObject, useEffect, useRef, useState } from "react";
import ApiClient from "../../apis/apiClient";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

const Comments = () => {
  const { storyIdx } = useParams();

  const [comments, setComments] = useState<StoryCommentResType[]>([]);
  const [commentIdx, setCommentIdx] = useState<number>();
  const [state, setState] = useState({
    isAdd: false,
    isUpdate: false,
    isDelete: false,
  });
  const observer = useRef<IntersectionObserver | null>(null);

  const inputRef: RefObject<HTMLInputElement> = useRef<HTMLInputElement>(null);

  const { lastStoryElementRef, page } = useInfiniteScroll({
    observer,
    lastIndex: true,
  });

  const getComments = async () => {
    try {
      const res = await ApiClient.getInstance().getStoryComments(
        Number(storyIdx),
        page.page,
      );
      if (res.data) {
        if (page.page === 0) setComments(res.data);
        else setComments((prev) => [...prev, ...(res.data || [])]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddComment = async () => {
    try {
      const res = await ApiClient.getInstance().addStoryComments(
        Number(storyIdx),
        {
          commentParentIdx: commentIdx!,
          commentContent: inputRef.current!.value,
        },
      );
      console.log(res);
      if (res.status === 200) {
        setState((prev) => ({ ...prev, isAdd: true }));
        inputRef.current!.value = "";
        setCommentIdx(undefined);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (commentIdx: number) => {
    try {
      const res = await ApiClient.getInstance().deleteStoryComments(
        Number(storyIdx),
        commentIdx,
      );
      console.log(res);
      if (res.status === 200) {
        setState((prev) => ({ ...prev, isDelete: true }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, [state, page.page]);

  return (
    <div className="relative -translate-y-11">
      <div className="text-center border-b border-hanaGray2 pb-4 mb-8">
        댓글
      </div>
      <ul className="h-[30rem] flex-grow overflow-y-auto">
        {comments?.map((comment, idx) => (
          <li
            key={comment.commentIdx}
            className="flex flex-col mb-6"
            ref={comments.length === idx + 1 ? lastStoryElementRef : null}
          >
            {/* 댓글 */}
            <div className="flex items-start gap-4">
              <img
                src="/images/profile.png"
                className="w-10 h-10"
                alt="profile"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center text-sm">
                  <div>익명</div>
                  <div className="text-hanaGray2">2024-04-25</div>
                </div>
                <div className="text-sm">{comment.commentContent}</div>
                <div className="flex gap-2 mt-1">
                  <button
                    className="text-xs text-hanaGray2 hover:underline"
                    onClick={() => setCommentIdx(comment.commentIdx)}
                  >
                    댓글달기
                  </button>
                  <button
                    className="text-xs text-hanaGray2 hover:underline"
                    onClick={() => handleDelete(comment.commentIdx)}
                  >
                    삭제
                  </button>
                </div>
              </div>
            </div>
            {/* 대댓글 */}
            <ul>
              {comment.replyList.map((reply) => (
                <li key={reply.commentIdx}>
                  <div className="flex items-start gap-4 pl-8 my-4">
                    <img
                      src="/images/profile.png"
                      className="w-10 h-10"
                      alt="profile"
                    />
                    <div className="flex-grow">
                      <div className="flex justify-between items-center text-sm">
                        <div>익명</div>
                        <div className="text-hanaGray2">2024-04-25</div>
                      </div>
                      <div className="text-sm">{reply.commentContent}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
      <div className="absolute w-full flex">
        <input
          ref={inputRef}
          type="text"
          className="border border-hanaGray2 rounded-lg indent-3 w-full h-10"
          placeholder="댓글을 입력하세요..."
        />
        <div
          className="absolute right-4 top-3 cursor-pointer"
          onClick={handleAddComment}
        >
          <FiSend color="#008485" />
        </div>
      </div>
    </div>
  );
};

export default Comments;
