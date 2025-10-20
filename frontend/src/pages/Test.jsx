import React, { useState } from 'react';
import Modal from '../components/Modal';
import CreateLog from '../components/CreateLogForm';

function Test() {
  const [modalOpen, setModalOpen] = useState(false); // true = modal visible initially

  return (
    <div>
      <button onClick={() => setModalOpen(true)}> test </button>
      <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)}>
        <CreateLog/>
      </Modal>
    </div>
  );
}

export default Test;
