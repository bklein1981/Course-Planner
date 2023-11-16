import { Label, TextInput, Button, Modal, Checkbox } from 'flowbite-react';
import { useState, useEffect } from 'react';
import Datepicker from "tailwind-datepicker-react"

import { useQuery, useMutation } from '@apollo/client';
import { ADD_PROJECT } from '../../utils/mutations'
import { QUERY_COURSES } from '../../utils/queries';
import Auth from '../../utils/auth';

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

function AddProject(props) {
  const token = Auth.getProfile()
  const userId = token.data._id

  const [projectData, setProjectData] = useState({ name: '', description: '', startDate: '', endDate: '', isCompleted: false, course: props.courseId, user:userId}); // set state for course input
  const [openModal, setOpenModal] = useState(props.isOpen);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);


  function onCloseModal() {
    setOpenModal(false);
    props.onCloseModal();
    window.location.reload()
  }

  useEffect(() => {
    setOpenModal(props.isOpen);
  }, [props.isOpen]);

  const { loading, data } = useQuery(QUERY_COURSES);


  const handleChangeStartDate = (selectedDate) => {
    // Additional logic if needed
    setProjectData({ ...projectData, startDate: selectedDate })
  };

  const handleChangeEndDate = (selectedDate) => {
    // Additional logic if needed
    setProjectData({ ...projectData, endDate: selectedDate })
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProjectData({ ...projectData, [name]: value });
  };

  const [addProject, { error }] = useMutation(ADD_PROJECT);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await addProject({
        variables: projectData 
      });

      
      onCloseModal();
    } catch (err) {
      console.error(error);
    };

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
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Add a Project</h3>
              <form>
                <div>
                  <div className="mb-2 block">
                    <Label htmlFor="name" value="Project Name" />
                  </div>
                  <TextInput
                    id="name"
                    type='text'
                    placeholder="Project Name"
                    name='name'
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
                    name='description'
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

                <div className="w-full pt-2">
                  <Button type='submit' onClick={handleFormSubmit}>+ Add Project</Button>
                </div>
              </form>
            </div>
          </Modal.Body>
        </Modal>
      </>
    );
  }

  export default AddProject;