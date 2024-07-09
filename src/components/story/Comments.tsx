import React, { RefObject, useEffect, useRef, useState } from "react";
import ApiClient from "../../apis/apiClient";
import { useParams } from "react-router-dom";
import { FiSend } from "react-icons/fi";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { getCookie } from "../../utils/cookie";
import { dateToString } from "../../utils/date";
import cn from "../../utils/cn";

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
  const [isReplyClicked, setIsReplyClicked] = useState<boolean>(false);

  const { lastStoryElementRef, page, setPage } = useInfiniteScroll({
    observer,
    isOffset: false,
    lastIndex:
      comments.length <= 0 ? 0 : comments[comments.length - 1].commentIdx,
  });

  const getComments = async (currentPage: number) => {
    try {
      const res = await ApiClient.getInstance().getStoryComments(
        Number(storyIdx),
        currentPage,
      );
      if (res.data) {
        if (res.data.length < 10)
          setPage((prev) => ({ ...prev, hasMore: false }));
        else setPage((prev) => ({ ...prev, hasMore: true }));

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
      if (res.status === 200) {
        setState((prev) => ({ ...prev, isDelete: true }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    setComments([]);
    getComments(0);
  }, [state]);

  useEffect(() => {
    getComments(page.page);
  }, [page.page]);

  return (
    <div className="relative -translate-y-11">
      <div className="text-center border-b border-hanaGray2 pb-4 mb-8">
        댓글
      </div>
      <ul className="h-[30rem] flex-grow overflow-y-auto">
        {comments?.map((comment, idx) => (
          <li
            key={idx}
            className="flex flex-col"
            ref={comments.length === idx + 1 ? lastStoryElementRef : null}
          >
            {/* 댓글 */}
            <div
              className={cn(
                "flex items-start gap-4 p-2",
                commentIdx === comment.commentIdx && isReplyClicked
                  ? "bg-hanaGreen bg-opacity-20"
                  : "",
              )}
            >
              <img
                src="/images/profile.png"
                className="w-10 h-10"
                alt="profile"
              />
              <div className="flex-grow">
                <div className="flex justify-between items-center text-sm">
                  <div
                    className={cn(
                      comment.commentContent.includes("삭제된 댓글입니다")
                        ? "text-hanaGray2"
                        : "",
                      "font-bold",
                    )}
                  >
                    {comment.studentNickname}
                  </div>
                  <div className="text-hanaGray2">
                    {dateToString(new Date(comment.createdAt))}
                  </div>
                </div>
                <div
                  className={cn(
                    comment.commentContent.includes("삭제된 댓글입니다")
                      ? "text-hanaGray2"
                      : "",
                    "text-sm",
                  )}
                >
                  {comment.commentContent}
                </div>
                <div
                  className={cn(
                    comment.commentContent.includes("삭제된 댓글입니다")
                      ? "hidden"
                      : "",
                    "flex gap-2 mt-1",
                  )}
                >
                  <button
                    className="text-xs text-hanaGray2 hover:underline"
                    onClick={() => {
                      setIsReplyClicked(true);
                      setCommentIdx(comment.commentIdx);
                      inputRef.current?.focus();
                    }}
                  >
                    댓글달기
                  </button>
                  {comment.createdBy === getCookie("memberIdx") && (
                    <button
                      className="text-xs text-hanaGray2 hover:underline"
                      onClick={() => handleDelete(comment.commentIdx)}
                    >
                      삭제
                    </button>
                  )}
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
                        <div
                          className={cn(
                            reply.commentContent.includes("삭제된 댓글입니다")
                              ? "text-hanaGray2"
                              : "",
                            "font-bold",
                          )}
                        >
                          {reply.studentNickname}
                        </div>
                        <div className="text-hanaGray2">
                          {dateToString(new Date(reply.createdAt))}
                        </div>
                      </div>
                      <div
                        className={cn(
                          reply.commentContent.includes("삭제된 댓글입니다")
                            ? "text-hanaGray2"
                            : "",
                          "text-sm",
                        )}
                      >
                        {reply.commentContent}
                      </div>
                      <div className="mt-1">
                        {reply.createdBy === getCookie("memberIdx") ||
                          (!reply.commentContent.includes(
                            "삭제된 댓글입니다",
                          ) && (
                            <button
                              className="text-xs text-hanaGray2 hover:underline"
                              onClick={() => handleDelete(reply.commentIdx)}
                            >
                              삭제
                            </button>
                          ))}
                      </div>
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
          placeholder={
            isReplyClicked ? "대댓글을 입력하세요..." : "댓글을 입력하세요..."
          }
          onBlur={() => setIsReplyClicked(false)}
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
