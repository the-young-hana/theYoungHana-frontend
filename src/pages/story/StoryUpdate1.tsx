import { TopBar } from "../../components/common/TopBar";
import { useParams } from "react-router-dom";
import TransactionList from "../../components/story/TransactionList";
import TotalPrice from "../../components/story/TotalPrice";

function StoryUpdate1() {
  const { storyIdx } = useParams();

  return (
    <>
      <TopBar title="스토리 수정" path={`/story/detail/${storyIdx}`} />
      <div className="pt-14">
        <TransactionList />
        <TotalPrice />
      </div>
    </>
  );
}

export default StoryUpdate1;
