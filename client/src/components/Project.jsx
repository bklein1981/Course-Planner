import { useState } from 'react';
import EditProject from './EditProject';
import { REMOVE_PROJECT } from '../utils/mutations'
import { useMutation } from '@apollo/client';
import editIcon from '../assets/images/edit_icon.svg';
import deleteIcon from '../assets/images/delete_icon.svg';

function Project(projectData) {
  const [openEditModal, setEditModal] = useState(false);

  const [removeProject, { error }] = useMutation(REMOVE_PROJECT);

  const edithandleClickEvent = () => {
    setEditModal(true)
    console.log('openEditModal', openEditModal)
  }


  const project = projectData.projects;

  const deleteProject = async () => {
    try {
      // const token = Auth.getProfile()
      // const userId = token.data._id 
      const projectId = project._id
      console.log(projectId._id)

      const response = await removeProject({
        variables: {projectId: projectId}
      });
      console.log('response',response)
    } catch (err) {
      console.error(error);
    }
  }

  const projectStartDate = new Date(Number(project.startDate)).toLocaleDateString()
  const projectEndDate = new Date(Number(project.endDate)).toLocaleDateString()

  return (

      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <div className='grid grid-cols-12'>
                  <div className="col-span-9 truncate text-md font-bold text-gray-900 dark:text-white">{project.name}</div>
                  <EditProject projectId={project._id} isOpen={openEditModal} onCloseModal={() => setEditModal(false)} />
                  <button className='col-span-2 lg:justify-self-center' aria-label="edit" onClick={edithandleClickEvent}><img className='edit-button-img' src={editIcon} alt="edit button" /></button>
                  <button aria-label="delete"><img className='delete-button-img' src={deleteIcon} alt="delete button" onClick={deleteProject}/></button>
                </div>
                <div className="truncate text-sm text-gray-500 dark:text-gray-400">{project.description}</div>
              </div>
            </div>
            <div className="grid grid-cols-6 pt-3">
              <div className="col-span-2 text-md font-medium text-gray-900">Start Date:</div>
              <div className="col-span-2 text-md font-medium text-gray-500">{!project.startDate ? "N/A" : projectStartDate}</div>
            </div>
            <div className="grid grid-cols-6 pt-3">
              <div className="col-span-2 text-md font-medium text-gray-900">End Date:</div>
              <div className="col-span-2 text-md font-medium text-gray-500">{!project.endDate ? "N/A" : projectEndDate}</div>
            </div>
          </li>

        </ul>
      </div>
    // </Card>
  );
}

export default Project;
