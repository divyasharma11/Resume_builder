import React, { useState, useEffect } from 'react';
import './App.css';  // Make sure to create the CSS file
import Person2Icon from '@mui/icons-material/Person2';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import html2pdf from 'html2pdf.js';
import mammoth from 'mammoth';

const CVForm = ({
  userDetails,
  handleInputChange,
  handleSubmit,
  handleReset,
  handleAddLanguage,
  handleAddLink,
  handleAddEducation,
  handleSkillClick,
  handleImageChange,
  selectedImage,
  selectedSkills,
  showAddLanguage,
  showLink,
  showEducation,
  progress,
  displayedDetails,
}) => {
    const [docxLink, setDocxLink] = useState('');
    const [showPreview, setShowPreview] = useState(true);
    const downloadPDF = () => {
        // setShowPreview(false); // Hide the preview before downloading PDF
    
        const content = document.getElementById('cv-container');
        const options = {
          margin: 10,
          filename: 'resume.pdf',
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        };
    
        html2pdf().from(content).set(options).outputPdf().then((pdf) => {
          const blob = new Blob([pdf], { type: 'application/pdf' });
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = 'resume.pdf';
          link.click();
        });
      };
    
      const downloadDOCX = () => {
        setShowPreview(false); // Hide the preview before downloading DOCX
    
        const content = document.getElementById('cv-container');
        const options = {
          styleMap: ['p[style-name=\'Heading 1\'] => h1', 'p[style-name=\'Heading 2\'] => h2'],
        };
    
        mammoth.extractRawText({ arrayBuffer: new Uint8Array() }, content, options)
          .then((result) => {
            const blob = new Blob([result.value], { type: 'application/msword' });
            const link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = 'resume.docx';
            link.click();
          });
      };
  return (
    <div className='main_container'>
    <div className='left_container'>
      <div className='resume_main_container'>
        <div className='resume_container'>
          <div className='resume_content'>
            <div className='resume_score'>{`${progress}%`}</div>
            <p className='resume_p'>Resume score</p>
          </div>
          <div className='resume_score_right'>
            <div className='resume_score_rights'>   
            <div className='resume_score1'>{`+${progress}%`}</div>
            <p className='resume_p1'>Add employment history</p>
            <div className='mark'>?</div>
            </div>
          </div>
        </div>
        <div className='progress_bar'>
          <div className='progress' style={{width:`${progress}%`}}></div>
        </div>
      </div>
      <div className='horse_tag'>
        <div>
          <img src='https://graphicriver.img.customer.envatousercontent.com/files/308283051/preview.jpg?auto=compress%2Cformat&q=80&fit=crop&crop=top&max-h=8000&max-w=590&s=e2ab17efc6f5d1b6fa1a038bbf930186' alt='horse' className='horse'/>
        </div>
        <div>
          <div className='text1'>Ensure your resume fits the job opening, boost your chances!</div>
          <div className='text2'>Simply paste the link to the job listing, we’ll help you optimize your resume.</div>
        </div>
        <div className='arrow_icon'><ArrowForwardIosIcon /></div>
      </div>
    <h2>Personal Details</h2>
    <div className='personal_details'>
      <div>
    <label>
    Wanted Job Title<span className='questn'>?</span> <br />
        <input
          type="text"
          value={userDetails.jobTitle}
          placeholder='e.g Teacher'
          onChange={(e) => handleInputChange('jobTitle', e.target.value)}
        />
      </label>
      </div>
      <div className='img_container'>
        <div className='img'>
        <input
        type='file'
        accept='image/*'
        onChange={handleImageChange}
        className='input_img'
      />
          {/* <Person2Icon className='person-icon'/> */}
        </div>
        <p>Upload photo</p> 
      </div>
    </div>
     <div className='personal_details'>
      <div>
      <label>First Name <br />
        <input
          type="text"
          value={userDetails.firstName}
          onChange={(e) => handleInputChange('firstName', e.target.value)}
        />
      </label>
   </div>
   <div>
      <label>
        Last Name <br />
        <input
          type="text"
          value={userDetails.lastName}
          onChange={(e) => handleInputChange('lastName', e.target.value)}
        />
      </label>
      </div>
    </div>
    <div className='personal_details'>
      <div>
      <label>
        Email<br />
        <input
          type="text"
          value={userDetails.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
        />
      </label>
      </div>
      <div>
      <label>
        phone <br />
        <input
          type="text"
          value={userDetails.phone}
          onChange={(e) => handleInputChange('phone', e.target.value)}
        />
      </label>
      </div>
    </div>
    <div className='personal_details'>
      <div>
      <label>
      Address <br />
        <input
          type="text"
          value={userDetails.address}
          onChange={(e) => handleInputChange('address', e.target.value)}
        />
      </label>
      </div>
      <div>
      <label>
        City <br />
        <input
          type="text"
          value={userDetails.city}
          onChange={(e) => handleInputChange('city', e.target.value)}
        />
      </label>
      </div>
    </div>
    <div className='gap'>
    <h2>Professional Summary</h2>
    <p>Write 2-4 short & energetic sentences to interest the reader! Mention your role,<br />
     experience & most importantly - your biggest achievements, best qualities and skills.</p>
     <div >
     <input className='Professional_summary'
      type='text'
      value={userDetails.summary} 
      onChange={(e) => handleInputChange('summary', e.target.value)}
      placeholder='e.g. Passionate Science teacher with 8+ years and a track record of...' />
     </div>
     <p>Recruiter tip: write 50-200 characters to increase interview chances</p>
     </div>
     <div className='gap'>
       <h2>Experience</h2>
       <p>Show your relevant experience(last 10 years). Use bullet points to note your achievments.<br />
       possible-use numbers/facts (Achieved X, measured by Y,by doing Z).</p>
       <input type='text' className='history' value={userDetails.employment}
        onChange={(e) => handleInputChange('employment', e.target.value)}
       placeholder='add experience'/>
       {/* <h3>+ Add one more employment</h3> */}
     </div>
     <div className='gap'>
      <h2>Education</h2>
      <p>A varied education on your resume sums up the value that your learnings and background <br />
       will bring to job.</p>
       <h3 onClick={handleAddEducation}>+ Add education</h3>
       {showEducation && <div>
       <input type='text' className='history' value={userDetails.education1}
       onChange={(e) => handleInputChange('education1', e.target.value)}
      placeholder='add education'/>
       <input type='text' className='history' value={userDetails.education2}
       onChange={(e) => handleInputChange('education2', e.target.value)}
      placeholder='add education'/>
      </div>
       }
     </div>
     <div className='gap'>
      <h2>Websites & Social Links</h2>
      <p>you can ad links to websites you want hiring managers to see! Perhaps it will be a link to <br />
      your portfolio. LinkedIn profile, or personal website.</p>
       <h3 onClick={handleAddLink}>+ Add link</h3>
       {showLink && <div>
        <input type='text' className='history' value={userDetails.linkedinLink}
        onChange={(e) => handleInputChange('linkedinLink', e.target.value)}
       placeholder='add linkedin'/>
        <input type='text' className='history' value={userDetails.facebookLink}
        onChange={(e) => handleInputChange('facebookLink', e.target.value)}
       placeholder='add facebook'/>
        <input type='text' className='history' value={userDetails.instagramLink}
        onChange={(e) => handleInputChange('instagramLink', e.target.value)}
       placeholder='add instagram'/>
       </div>
       }
     </div>
     <div className='gap'>
      <h2>Skills</h2>
      <p>Choose 5 important skills that show you fit the position. Make sure they match the key <br />
      skill mentioned in the job listing (especially when applying via an online system).</p>
     <div className='skill_btn'>
      <Button variant="outlined"  onClick={() => handleSkillClick('HTML')}>HTML +</Button>
      <Button variant="outlined"  onClick={() => handleSkillClick('CSS')}>CSS +</Button>
      <Button variant="outlined"  onClick={() => handleSkillClick('JavaScript')}>JavaScricpt +</Button>
      <Button variant="outlined"  onClick={() => handleSkillClick('Java')}>Java +</Button>
      <Button variant="outlined"  onClick={() => handleSkillClick('NodeJs')}>NodeJs +</Button>
      </div>
      <div  className='skill_btn'>
      <Button variant="outlined" onClick={() => handleSkillClick('ReactJs')}>ReactJs +</Button>
      <Button variant="outlined" onClick={() => handleSkillClick('Data Analysis')}>Data Analysis +</Button>
      <Button variant="outlined" onClick={() => handleSkillClick('Management Skills')}>Management Skills +</Button>
      <Button variant="outlined" onClick={() => handleSkillClick('PHP ')}>PHP +</Button>
      </div>
      <div  className='skill_btn'>
      <Button variant="outlined" onClick={() => handleSkillClick('Communication Skills')}>Communication Skills +</Button>
      <Button variant="outlined" onClick={() => handleSkillClick('Project Management')}>Project Management +</Button>
      <Button variant="outlined" onClick={() => handleSkillClick('Team Management')}>Team Management +</Button>
      </div>
     </div>
     <div className='gap'>
      <h2>Languages</h2>
       
       {showAddLanguage && 
       <div>
           <input type='text' className='history' value={userDetails.language1}
           onChange={(e) => handleInputChange('language1', e.target.value)}
          placeholder='add language'/>
           <input type='text' className='history' value={userDetails.language2}
           onChange={(e) => handleInputChange('language2', e.target.value)}
          placeholder='add language'/>
          </div>
       }
       <h3 onClick={handleAddLanguage}>+ Add language</h3>
     </div>
     <div style={{display:'flex',justifyContent:'space-evenly'}}>
      <div>
      <Button variant='contained' onClick={handleSubmit}>Save</Button>
      </div>
      <div>
      <Button variant='contained' onClick={handleReset}>Reset</Button>
      </div>
     </div>
    </div>
    <div className='right_container'>
      <div className='top'>
        <p>Select template</p>
        <p>|</p>
        <p>-</p>
        <p>Aa</p>
        <p>+</p>
        <Button variant="contained" onClick={downloadPDF}>Download PDF</Button>
        <Button variant="contained" onClick={downloadDOCX}>Download DOCX</Button>
      </div>
      {/* {showPreview && ( */}
      <div className='display_container'>
       <div className='display1'>
        <div className="profile_img">
        {selectedImage ? (
        <img src={selectedImage} alt='Uploaded' className='person-icon' />
      ) : (
        <Person2Icon className='person-icon' />
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
         {/* )} */}
    </div>
  </div>
  );
};

export default CVForm;
