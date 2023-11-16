import { Label, TextInput, Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Datepicker from "tailwind-datepicker-react"

import { useMutation } from '@apollo/client';
import { EDIT_COURSE } from '../../utils/mutations'

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
  const courseId = props.courseId
  // Stores data for updated course in a use state
  const [courseData, setcourseData] = useState({ name: '', description: '', startDate: '', endDate: '',  courseId:courseId}); // subject: props.subjectId
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
    setcourseData({ ...courseData, startDate: selectedDate })
  };

  const handleChangeEndDate = (selectedDate) => {
    console.log("End Date:", selectedDate);
    // Additional logic if needed
    setcourseData({ ...courseData, endDate: selectedDate })
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setcourseData({ ...courseData, [name]: value });
  };

  const [EditCourse, { error }] = useMutation(EDIT_COURSE);

  // submit form on line 105
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onCloseModal();

    console.log(courseData);

    // mutation for editing course
    try {
      const response = await EditCourse({
        variables: courseData
      });
      console.log('editedCourse', response)
    } catch (err) {
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
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Course Details</h3>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="name" value="Course Name" />
                </div>
                <TextInput
                  id="name"
                  name="name"
                  type='text'
                  placeholder="Course Name"
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="description" value="Course Description" />
                </div>
                <TextInput
                  id="name"
                  name="description"
                  type='text'
                  placeholder="Course Description"
                  onChange={handleInputChange}
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
                <Button type="submit" id='submit'>Submit Changes</Button>
              </div>

            </div>
          </form>

        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditCourse;