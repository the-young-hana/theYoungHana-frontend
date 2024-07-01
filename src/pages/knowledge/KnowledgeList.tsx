import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";
import { useEffect, useState } from "react";
import { ApiClient } from "../../apis/apiClient";

export const KnowledgeList = () => {
  const navigate = useNavigate();
  const [, setLoading] = useState<boolean>(false);
  const [knowledges, setKnowledges] = useState<KnowledgeType[]>([]);

  useEffect(() => {
    const getKnowledge = async () => {
      try {
        setLoading(true);
        const res = await ApiClient.getInstance().getKnowledge();
        if (res.data) {
          setKnowledges(res.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getKnowledge();
  }, []);

  return (
    <>
      <TopBar title="재테크 꿀팁" back />
      <div className="flex flex-col gap-3 min-h-full items-center px-5 py-7 mt-12">
        {knowledges.map((knowledge) => (
          <div
            className="w-full flex justify-between bg-white rounded-xl p-3 gap-3 cursor-pointer"
            onClick={() =>
              navigate(`/knowledge/detail/${knowledge.knowledgeIdx}`)
            }
          >
            <div className="flex flex-col gap-2">
              <p className="font-bold">{knowledge.knowledgeTitle}</p>
              <p className="text-sm">{knowledge.knowledgeSummary}</p>
            </div>
            <img src={knowledge.knowledgeImage} className="w-20" />
          </div>
        ))}
      </div>
    </>
  );
};
