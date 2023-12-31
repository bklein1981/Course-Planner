import { Label, TextInput, Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Datepicker from "tailwind-datepicker-react"
import Auth from '../../utils/auth';
import { useQuery, useMutation } from '@apollo/client'; //
import{ ADD_COURSE, ADD_COURSE_TO_USER } from '../../utils/mutations' //

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

function AddCourse(props) {
  const [courseData, setcourseData] = useState({name:'', description:'',startDate: '', endDate:'',subject:props.subjectId }); // set state for course input
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
    setcourseData({...courseData, startDate: selectedDate })
  };

	const handleChangeEndDate = (selectedDate) => {
    console.log("End Date:", selectedDate);
    // Additional logic if needed
    setcourseData({...courseData, endDate: selectedDate })
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setcourseData({ ...courseData, [name]: value });
  };

  const [addCourse] = useMutation(ADD_COURSE);
  const [addCourseToUser, { error }] = useMutation(ADD_COURSE_TO_USER);

  const addToUser = async (courseId) => {
    const token = Auth.getProfile()
    console.log(token)

    const userId = token.data._id 

    // console.log('courseid',CourseIdNum)

    try {
      const response = await addCourseToUser({
        variables: {userId: userId, courseId: courseId}
      });
      console.log('adduser', response)
    } catch (err) {
      console.error(error);
    }
  }

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    onCloseModal();

    try {
      const response = await addCourse({
        variables: courseData
      });

      const courseId = response.data.addCourse._id
      console.log('addedCourse',response)

      addToUser(courseId);
    } catch (err) {
      console.error(error);
    }
  }

  return (

    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add a Course</h3>
              <form >
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Name" value="Name" />
                  </div>
                  <TextInput
                    id="name"
                    type='text'
                    placeholder="Course Name"
                    name="name"
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="Description" value="Description" />
                  </div>
                  <TextInput
                    id="description"
                    type='text'
                    placeholder="Course Description"
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
                </div>

                  <Button type="submit" onClick={handleFormSubmit}>+ Add Course</Button>
              </form>
            </div>
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCourse;