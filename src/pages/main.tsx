import { useState } from "react";
import Button from "../components/common/Button";
import Modal from "../components/common/Modal";

export default function main() {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <Button className="p-0 px-0 w-10 h-10" roundedFull>
        +
      </Button>
      <button onClick={() => setShowModal((prev) => !prev)}>모달열기</button>
      <Modal
        show={showModal}
        onClose={() => setShowModal((prev) => !prev)}
        modalType="sheet"
      ></Modal>
    </>
  );
}
