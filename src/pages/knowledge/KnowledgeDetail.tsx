import { useEffect, useState } from "react";
import ApiClient from "../../apis/apiClient";
import { TopBar } from "../../components/common/TopBar";
import { useParams } from "react-router-dom";
import { dateToString } from "../../utils/date";
import { Loading } from "../../components/common/Loading";

export default function KnowledgeDetail() {
  const [loading, setLoading] = useState<boolean>(false);
  const [knowledgeDetail, setKnowledgeDetail] = useState<KnowledgeDetailType>();
  const param = useParams();

  const getKnowledge = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getKnowledgeDetail(
        Number(param.knowledgeIdx),
      );
      if (res.data) {
        setKnowledgeDetail(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getKnowledge();
  }, []);

  return (
    <>
      <TopBar title="재테크 꿀팁" back />
      <div className="bg-white min-h-full flex flex-col items-center mt-12">
        {knowledgeDetail && (
          <div className="mx-3 ">
            <div className="my-5 flex flex-col gap-2 border-b-2 border-hanaGray2 pb-2">
              <p className="font-semibold text-2xl">
                {knowledgeDetail.knowledgeTitle}
              </p>
              <p>
                by 하나은행 {dateToString(new Date(knowledgeDetail.createdAt))}
              </p>
            </div>

            <div
              dangerouslySetInnerHTML={{
                __html: knowledgeDetail.knowledgeContent,
              }}
              className="mb-8"
            />
          </div>
        )}
      </div>
      <Loading show={loading} />
    </>
  );
}
