import { Label, TextInput, Button, Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Datepicker from "tailwind-datepicker-react"

import { useQuery, useMutation } from '@apollo/client'; //
import{ ADD_COURSE } from '../../utils/mutations' //
import { QUERY_SUBJECTS } from '../../utils/queries' 

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

  console.log('porps',props)

  function onCloseModal() {
    setOpenModal(false);
    props.onCloseModal();
  }

  useEffect(() => {
    setOpenModal(props.isOpen);
  }, [props.isOpen]);

  const { loading, data } = useQuery(QUERY_SUBJECTS);

  console.log(data?.subjects);
  const subjectArray = data?.subjects;
  
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

  const callBothFunction= () =>  {
    handleInputChange();
    onCloseModal();
  }


  const [addCourse, { error }] = useMutation(ADD_COURSE);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await addCourse({
        variables: courseData
      });

      console.log(response)
    } catch (err) {
      console.error(error);
    }
  }

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  return (

    <>
      <Modal show={openModal} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          
            <div className="space-y-6">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add a Course</h3>
              <form onSubmit={handleFormSubmit}>
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
                  {/* <div className="mb-2 block">
                    <Label htmlFor="end-date" value="Subject" />
                  </div> */}
                  {/* <div>
                    <select name="subject" onChange={handleInputChange}>
                      {subjectArray.map((subject, index)=>{
                        return(
                          <option key={index} value={subject._id}>{subject.name}</option>
                        )
                      })}
                    </select>
                </div> */}
                </div>

                  <Button type="submit" onClick={callBothFunction}>+ Add Course</Button>
              </form>
            </div>
          
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddCourse;