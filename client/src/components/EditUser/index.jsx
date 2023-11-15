import { Button, Label, Modal, TextInput } from 'flowbite-react';
import { useState, useEffect } from "react";
import { useMutation } from '@apollo/client';
import { EDIT_PROFILE } from "../../utils/mutations";


function EditUserProfile({isOpen, onCloseModal, userData}) {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [bio, setBio] = useState('');
    const [skills, setSkills] = useState('');
    const [editProfile] = useMutation(EDIT_PROFILE);

  useEffect(() => {
        if (userData)
            setFirstName(userData.first_name);
            setLastName(userData.last_name);
            setBio(userData.biography);
            setSkills(userData.skills ? userData.skills.join(', ') : '');
    }
    , [userData]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await editProfile({
                variables: {
                    userId: userData._id,
                    first_name: firstName,
                    last_name: lastName,
                    biography: bio,
                    skills: skills.split(', ').map(skill => skill.trim()),
                },
            });
            onCloseModal();
        } catch (err) {
            console.error(err);
        }
    };


  return (
    <>
      <Modal show={isOpen} size="md" onClose={onCloseModal} popup>
        <Modal.Header />
        <Modal.Body>
          <div className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Edit Profile</h3>
            <div>
              <TextInput id="firstName" type="text" placeholder="First Name" onChange={(e) => setFirstName(e.target.value)} />
              <TextInput id="lastName" type="text" placeholder="Last Name" onChange={(e) => setLastName(e.target.value)} />
              <TextInput id="bio" type="text" placeholder="Biography" onChange={(e) => setBio(e.target.value)} />
              <TextInput id="skills" type="text" placeholder="Skills" onChange={(e) => setSkills(e.target.value)} />
            </div>
            <div className="w-full">
              <Button onClick={handleSubmit}>Submit</Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}


export default EditUserProfile;