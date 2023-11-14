import { Card } from "flowbite-react";
import editIcon from "../assets/images/edit_icon.svg";
import deleteIcon from "../assets/images/delete_icon.svg";

function Course() {

  return (
    <Card className="max-w-sm">
      <div className="grid grid-cols-10">
        <div className="col-span-9 text-2xl	font-bold">Introduction to Computer Science</div>
        <div>
          <div className="pb-2"><button id="edit-subject-btn" aria-label="edit-subject"><img className="edit-subj-img" src={editIcon} alt="edit subject" /></button></div>
          <div><button id="del-subject-btn" aria-label="delete-subject"><img className="delete-subj-img" src={deleteIcon} alt="delete subject" /></button></div>
        </div>
      </div>
    </Card>

  );
}

export default Course;
