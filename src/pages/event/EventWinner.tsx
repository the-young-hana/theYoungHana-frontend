import { TopBar } from "../../components/common/TopBar";

const eventWinner = [
  {
    prizeRank: 0,
    prizeName: "아이패드 14 pro",
    winnerList: [
      {
        memberId: 20191042,
        memberName: "이은수",
      },
    ],
  },
  {
    prizeRank: 1,
    prizeName: "에어팟 프로",
    winnerList: [
      {
        memberId: 20167777,
        memberName: "정재건",
      },
      {
        memberId: 20181234,
        memberName: "최지웅",
      },
    ],
  },
  {
    prizeRank: 2,
    prizeName: "빅맥 교환권",
    winnerList: [
      {
        memberId: 20161042,
        memberName: "임혜진",
      },
      {
        memberId: 20184638,
        memberName: "김백규",
      },
      {
        memberId: 20203748,
        memberName: "문혜영",
      },
    ],
  },
];

export const EventWinner = () => {
  return (
    <>
      <TopBar title="당첨자 명단" back />
      <div className="relative min-h-full bg-white p-5 pb-28 flex flex-col items-center">
        <img
          src="/images/eventWinner.svg"
          className="absolute top-0 left-0 w-full"
        />
        <div className="mt-[200px] flex flex-col justify-center items-center">
          {eventWinner.map((list) => (
            <>
              <div className="px-8 py-1 bg-hanaGreen rounded-full text-white font-semibold mb-1">
                {list.prizeRank + 1}등 {list.prizeName}
              </div>
              <div className="mb-5">
                {list.winnerList.map((winner) => (
                  <div className="flex gap-2">
                    <p className="text-hanaGreen font-semibold">
                      {winner.memberId}
                    </p>
                    <p className="font-semibold">{winner.memberName}</p>
                  </div>
                ))}
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};
