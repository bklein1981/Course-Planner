import { Button, Label, Modal } from 'flowbite-react';
import { useState, useEffect } from "react";


function AddSubject(props) {
  const [openModal, setOpenModal] = useState(props.isOpen);

  const onCloseModal = () => {
    setOpenModal(false);
    props.onCloseModal();
  }
  useEffect(() => {
    setOpenModal(props.isOpen);
  }, [props.isOpen]);

  return (
    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add a Subject</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="subject" value="Which subject would you like to add?" />
              </div>
              <select id="subject" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                <option value="">Select a Subject</option>
                <option value="TV">TV/Monitors</option>
                <option value="PC">PC</option>
                <option value="GA">Gaming/Console</option>
                <option value="PH">Phones</option>
              </select>
            </div>
            <div className="w-full">
              <Button onClick={onCloseModal}>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddSubject;