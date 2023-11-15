import { Button, Label, Modal } from 'flowbite-react';
import { useState, useEffect } from "react";
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SUBJECTS } from "../../utils/queries";
import { ADD_SUBJECT_TO_USER } from "../../utils/mutations";

function AddSubject({ isOpen, onCloseModal, userId}) {
  const [selectedSubjectId, setSectedSubjectId] = useState("");
  const { data: subjectsData } = useQuery(QUERY_SUBJECTS);
  const [addSubjectToUser] = useMutation(ADD_SUBJECT_TO_USER);

  const handleAddSubject = async (event) => {
    setSelectedSubjectId(event.target.value);
  };

  const handleFormSubmit = async (event) => {
    if (selectedSubjectId) {
      try {
        await addSubjectToUser({
          variables: {
            userId: userId,
            subjectId: selectedSubjectId
          }
        });
        onCloseModal();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <>
      <Modal show={isOpen} size="md" onClose={onCloseModal} popup>
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
                {subjectsData?.subjects.map((subject) => (
                  <option key={subject._id} value={subject._id}>
                    {subject.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="w-full">
              <Button onClick={handleFormSubmit}>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddSubject;