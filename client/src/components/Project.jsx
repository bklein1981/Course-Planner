import { Card } from 'flowbite-react';

import addIcon from '../assets/images/add_icon.svg';
import editIcon from '../assets/images/edit_icon.svg';
import deleteIcon from '../assets/images/delete_icon.svg';

function Project() {
  return (
    <Card className="max-w-sm">
      <div className="flex items-center justify-between grid grid-cols-12 pb-3">
        <h5 className="col-span-9 text-xl font-bold leading-none text-gray-900 dark:text-white">Current Projects</h5>
        <button className='col-span-3 justify-self-center'><img className='add-button' src={addIcon} alt="add button" /></button>
      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <div className='grid grid-cols-12'>
                <div className="col-span-9 truncate text-sm font-medium text-gray-900 dark:text-white">Project 1</div>
                <button className='col-span-2 lg:justify-self-center'><img className='edit-button' src={editIcon} alt="edit button" /></button>
                <button><img className='delete-button' src={deleteIcon} alt="delete button" /></button>
                </div>
                <div className="truncate text-sm text-gray-500 dark:text-gray-400">This is the first project</div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  );
}

export default Project;
