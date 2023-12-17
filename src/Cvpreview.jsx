import React from 'react';
import Person2Icon from '@mui/icons-material/Person2';
import "./App.css"
const CVPreview = ({ displayedDetails, selectedSkills, selectedImage }) => {
  return (
    <div className='display_container'>
        <div className='display1'>
      <div className="profile_img">
        {selectedImage ? (
          <img src={selectedImage} alt="Uploaded" className="person-icon" />
        ) : (
          <Person2Icon className="person-icon" />
        )}
      </div>
      <h2 className='name'>{displayedDetails.firstName} {displayedDetails.lastName}</h2>
          <div className='job'>{displayedDetails.jobTitle}</div>
          <h2 className='details'>Details</h2>
            <p>Email : {displayedDetails.email}</p>
            <p>Phone :  {displayedDetails.phone}</p>
            <p>Address :  {displayedDetails.address}</p>          
            <h2 className='details'>Links</h2>
            <p>{displayedDetails.linkedinLink} </p>
            <p>{displayedDetails.facebookLink} </p>
            <p>{displayedDetails.instagramLink} </p>
            <h2 className='details'>Skills</h2>
            {selectedSkills.map((skill, index) => (
            <p key={index}>{skill}</p>
          ))}
         </div>
         <div className='display2'>
          <strong>Professional Summary</strong>
          <p>{displayedDetails.summary}</p>
          <strong>Experience</strong>
          <p>{displayedDetails.employment}</p>
          <strong>Education</strong>
          <p> {displayedDetails.education1} </p>
            <p> {displayedDetails.education2} </p>
          <h3></h3>
          <p></p>
          <strong>Languge</strong>
          <p>{displayedDetails.language1}</p>
          <p>{displayedDetails.language2}</p> 
         </div>
    </div>
  );
};

export default CVPreview;
