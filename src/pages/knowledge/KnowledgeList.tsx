import { useNavigate } from "react-router-dom";
import ApiClient from "../../apis/apiClient";
import { TopBar } from "../../components/common/TopBar";
import { useEffect, useRef, useState } from "react";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";
import { Loading } from "../../components/common/Loading";

export default function KnowledgeList() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [knowledges, setKnowledges] = useState<KnowledgeType[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const { lastStoryElementRef, page, setPage } = useInfiniteScroll({
    observer,
    isOffset: false,
    lastIndex:
      knowledges.length <= 0
        ? 0
        : knowledges[knowledges.length - 1].knowledgeIdx,
  });

  const getKnowledge = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getKnowledge(page.page);
      if (res.data && res.data[0].knowledgeIdx) {
        if (page.page === 0) setKnowledges(res.data);
        else setKnowledges((prevList) => [...prevList, ...(res.data || [])]);
        if (res.data.length < 10)
          setPage((prev) => ({ ...prev, hasMore: false }));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getKnowledge();
  }, [page.page]);

  return (
    <>
      <TopBar title="재테크 꿀팁" back />
      <div className="flex flex-col gap-3 min-h-full items-center px-5 py-7 mt-12">
        {knowledges.map((knowledge, index) => (
          <div
            key={index}
            className="w-full flex justify-between bg-white rounded-xl p-3 gap-3 cursor-pointer"
            onClick={() =>
              navigate(`/knowledge/detail/${knowledge.knowledgeIdx}`)
            }
            ref={knowledges.length === index + 1 ? lastStoryElementRef : null}
          >
            <div className="flex flex-col gap-2">
              <p className="font-bold">{knowledge.knowledgeTitle}</p>
              <p className="text-sm">{knowledge.knowledgeSummary}</p>
            </div>
            <img src={knowledge.knowledgeImage} className="w-20" />
          </div>
        ))}
      </div>
      <Loading show={loading} />
    </>
  );
}
