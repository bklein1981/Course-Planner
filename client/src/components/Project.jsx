import { Card } from 'flowbite-react';

function Project() {
  return (
    <Card className="max-w-sm">
      <div className="mb-4 flex items-center justify-between">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Current Projects</h5>

      </div>
      <div className="flow-root">
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Project 1</p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">This is the first project</p>
              </div>
            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Project 2</p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">This is the second project</p>
              </div>

            </div>
          </li>
          <li className="py-3 sm:py-4">
            <div className="flex items-center space-x-4">
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-gray-900 dark:text-white">Project 3</p>
                <p className="truncate text-sm text-gray-500 dark:text-gray-400">This is the third project</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </Card>
  );
}

export default Project;
