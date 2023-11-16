import { Label, TextInput, Button, Modal, Checkbox } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Datepicker from "tailwind-datepicker-react"

import { useMutation } from '@apollo/client';
import { EDIT_PROJECT } from '../../utils/mutations'

const options = {
  autoHide: true,
  todayBtn: false,
  clearBtn: true,
  clearBtnText: "Clear",
  maxDate: new Date("2030-01-01"),
  minDate: new Date("1950-01-01"),
  theme: {
    background: "bg-gray-100",
    todayBtn: "",
    clearBtn: "",
    icons: "",
    text: "",
    disabledText: "",
    input: "",
    inputIcon: "",
    selected: "",
  },
  icons: {
    // () => ReactElement | JSX.Element
    prev: () => <span>Previous</span>,
    next: () => <span>Next</span>,
  },
  datepickerClassNames: "top-12",
  defaultDate: new Date("2022-01-01"),
  language: "en",
  disabledDates: [],
  weekDays: ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
  inputNameProp: "date",
  inputIdProp: "date",
  inputPlaceholderProp: "Select Date",
  inputDateFormatProp: {
    day: "numeric",
    month: "long",
    year: "numeric"
  }
}

function EditProject(props) {
  const projectId = props.projectId
  const [projectData, setProjectData] = useState({ name: '', description: '', startDate: '', endDate: '', projectId: projectId });
  const [openModal, setOpenModal] = useState(props.isOpen);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);

  function onCloseModal() {
    setOpenModal(false);
    props.onCloseModal();
  }

  useEffect(() => {
    setOpenModal(props.isOpen);
  }, [props.isOpen]);
  
  const handleChangeStartDate = (selectedDate) => {
    console.log("Start Date:", selectedDate);
    // Additional logic if needed
    setProjectData({ ...projectData, startDate: selectedDate });
  };

	const handleChangeEndDate = (selectedDate) => {
    console.log("End Date:", selectedDate);
    // Additional logic if needed
    setProjectData({ ...projectData, endDate: selectedDate });
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  }

  const [editProject, { error }] = useMutation(EDIT_PROJECT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onCloseModal();

    console.log('projectData', projectData);
    try {
      const response = await editProject({
        variables: projectData
    });
    console.log('editedCourse', response)
  }catch (err) {
    console.error(error);
  }
}

  return (

    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <form onSubmit={handleFormSubmit}>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Project Details</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Project Name" />
              </div>
              <TextInput
                id="name"
                type='text'
                name="name"
                placeholder="Project Name"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="description" value="Project Description" />
              </div>
              <TextInput
                id="description"
                type='text'
                placeholder="Project Description"
                name="description"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="start-date" value="Start Date" />
              </div>
              <div>
                <Datepicker classNames='cursor-pointer' id="start-date" options={options} onChange={handleChangeStartDate} show={showStartDatePicker} setShow={setShowStartDatePicker} />
              </div>
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="end-date" value="End Date" />
              </div>
              <div>
                <Datepicker id="end-date" options={options} onChange={handleChangeEndDate} show={showEndDatePicker} setShow={setShowEndDatePicker} />
              </div>
            </div>
            <div>
              <Checkbox id="completed" />
              <Label className="pl-3" htmlFor="remember">is Completed</Label>
            </div>

            <div className="w-full">
              <Button type="submit" onClick={handleFormSubmit}>Submit Changes</Button>
            </div>

          </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
  }


export default EditProject;