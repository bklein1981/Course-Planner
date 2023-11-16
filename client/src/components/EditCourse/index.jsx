import { Label, TextInput, Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Datepicker from "tailwind-datepicker-react"

import { useMutation } from '@apollo/client';
import{ EDIT_COURSE } from '../../utils/mutations'

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

function EditCourse(props) {
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
  };

	const handleChangeEndDate = (selectedDate) => {
    console.log("End Date:", selectedDate);
    // Additional logic if needed
  };

  const [addCourse, { error }] = useMutation(EDIT_COURSE);

  return (

    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Course Details</h3>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="name" value="Course Name" />
              </div>
              <TextInput
                id="name"
                type='text'
                placeholder="Course Name"
                required
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="start-date" value="Start Date" />
              </div>
              <div>
                <Datepicker id="start-date" options={options} onChange={handleChangeStartDate} show={showStartDatePicker} setShow={setShowStartDatePicker} />
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

            <div className="w-full">
              <Button id='submit' onClick={onCloseModal}>Submit Changes</Button>
            </div>

          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditCourse;