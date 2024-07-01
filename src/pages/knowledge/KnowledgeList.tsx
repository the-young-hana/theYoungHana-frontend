import { useNavigate } from "react-router-dom";
import { TopBar } from "../../components/common/TopBar";

const knowledgeList = [
  {
    knowledgeIdx: 0,
    knowledgeTitle: "대학생도 연말정산 해야 하나요?",
    knowledgeSummary:
      "아르바이트를 하고 있다면 연말정산 대상자일 수 있어요. 하지만 아르바이...",
    knowledgeImage: "/images/investment.svg",
  },
  {
    knowledgeIdx: 1,
    knowledgeTitle: "대학생도 연말정산 해야 하나요?",
    knowledgeSummary:
      "아르바이트를 하고 있다면 연말정산 대상자일 수 있어요. 하지만 아르바이...",
    knowledgeImage: "/images/investment.svg",
  },
  {
    knowledgeIdx: 2,
    knowledgeTitle: "대학생도 연말정산 해야 하나요?",
    knowledgeSummary:
      "아르바이트를 하고 있다면 연말정산 대상자일 수 있어요. 하지만 아르바이...",
    knowledgeImage: "/images/investment.svg",
  },
  {
    knowledgeIdx: 3,
    knowledgeTitle: "대학생도 연말정산 해야 하나요?",
    knowledgeSummary:
      "아르바이트를 하고 있다면 연말정산 대상자일 수 있어요. 하지만 아르바이...",
    knowledgeImage: "/images/investment.svg",
  },
  {
    knowledgeIdx: 4,
    knowledgeTitle: "대학생도 연말정산 해야 하나요?",
    knowledgeSummary:
      "아르바이트를 하고 있다면 연말정산 대상자일 수 있어요. 하지만 아르바이...",
    knowledgeImage: "/images/investment.svg",
  },
  {
    knowledgeIdx: 5,
    knowledgeTitle: "대학생도 연말정산 해야 하나요?",
    knowledgeSummary:
      "아르바이트를 하고 있다면 연말정산 대상자일 수 있어요. 하지만 아르바이...",
    knowledgeImage: "/images/investment.svg",
  },
  {
    knowledgeIdx: 6,
    knowledgeTitle: "대학생도 연말정산 해야 하나요?",
    knowledgeSummary:
      "아르바이트를 하고 있다면 연말정산 대상자일 수 있어요. 하지만 아르바이...",
    knowledgeImage: "/images/investment.svg",
  },
];

export const KnowledgeList = () => {
  const navigate = useNavigate();

  return (
    <>
      <TopBar title="재테크 꿀팁" back />
      <div className="flex flex-col gap-3 min-h-full items-center px-5 py-7">
        {knowledgeList.map((knowledge) => (
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
