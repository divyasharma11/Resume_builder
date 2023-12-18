import { useEffect, useState } from 'react'
import './App.css'
import Person2Icon from '@mui/icons-material/Person2';
import Button from '@mui/material/Button';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import html2pdf from 'html2pdf.js';
import mammoth from 'mammoth';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';

function App() {
  const [selectedImage, setSelectedImage] = useState(localStorage.getItem('uploadedImage') || null);
  const[showAddLanguage,setShowAddLanguage]=useState(false);
  const[showLink,setShowLink]=useState(false);
  const[showEducation,setShowEducation]=useState(false);
  const[progress,setProgress]=useState(0);
  const [selectedSkills, setSelectedSkills] = useState(JSON.parse(localStorage.getItem('selectedSkills')) || []);
  const [userDetails, setUserDetails] = useState({
    firstName: '',
    lastName: '',
     email:'',
    phone:'',
    city:'',
    address:'',
    education1: '',
    education2: '',
    jobTitle:'',
    summary:'',
    employment:'',
    language1:'',
    language2:'',
    linkedinLink:'',
    facebookLink:'',
    instagramLink:'',
  });
  const{jobTitle,firstName,lastName,email,phone,city,summary,address,education1,education2,employment,language1,language2,linkedinLink,facebookLink,instagramLink}=userDetails;
  const [displayedDetails, setDisplayedDetails] = useState({
    firstName: '',lastName: '', email:'',
    phone:'',
    city:'',
    address:'',
    education1: '',
    education2: '',
    jobTitle:'',
    summary:'',
    employment:'',
    language1:'',
    language2:'',
    linkedinLink:'',
    facebookLink:'',
    instagramLink:'',
  });
  useEffect(()=>{
    const progressCount=()=>{
      const arr=[firstName,lastName,email,phone,city,address,education1,education2,jobTitle,summary,employment,language1,linkedinLink];
      const data= arr.reduce((count,curr)=>{
         if(curr !== null && curr !==  undefined && curr.toString().trim() !== ''){
           count++;
         }
         return count;
       },0);
       return data;
    }
    const totalcount=progressCount();
    const total = 14;
    const complete = Math.floor((totalcount/total)*100);
    setProgress(complete);
  },[firstName,lastName,email,phone,city,address,education1,education2,jobTitle,summary,employment,language1,linkedinLink])

  useEffect(() => {
    // Retrieve data from local storage on component mount
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      try {
        const parsedData = JSON.parse(storedData);
        setDisplayedDetails(parsedData);
      } catch (error) {
        console.error('Error parsing JSON data from local storage:', error);
      }
    }
  }, []);
  
  const handleInputChange = (field, value) => {
    setUserDetails((prevDetails) => ({
      ...prevDetails,
      [field]: value,
    }));
   
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save only relevant details to local storage
    const dataToStore = {
      jobTitle: userDetails.jobTitle || '',
      firstName: userDetails.firstName || '',
      lastName: userDetails.lastName || '',
      email:userDetails.email || '',
      phone:userDetails.phone || '',
      address:userDetails.address || '',
      city:userDetails.city || '',
      summary:userDetails.summary || '',
      employment:userDetails.employment || '',
      education1: userDetails.education1 || '',
      education2: userDetails.education2 || '',
      language1: userDetails.language1 || '',
      language2: userDetails.language2 || '',
      linkedinLink: userDetails.linkedinLink || '',
      facebookLink: userDetails.facebookLink || '',
      instagramLink: userDetails.instagramLink || '',
    };
  
    localStorage.setItem('userData', JSON.stringify(dataToStore));
    setDisplayedDetails(dataToStore);
    setUserDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      education1: '',
      education2: '',
      jobTitle: '',
      summary: '',
      employment: '',
      language1: '',
      language2: '',
      linkedinLink:'',
      facebookLink:'',
      instagramLink:'',
    });
  };
  const handleReset = () => {
    // Remove data from local storage
    localStorage.removeItem('userData');
    localStorage.removeItem('uploadedImage');
    localStorage.removeItem('selectedSkills');
    // Reset state values
    setUserDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      education1: '',
      education2: '',
      jobTitle: '',
      summary: '',
      employment: '',
      language1: '',
      language2: '',
      linkedinLink:'',
      facebookLink:'',
      instagramLink:'',
    });

    setDisplayedDetails({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      city: '',
      address: '',
      education1: '',
      education2: '',
      jobTitle: '',
      summary: '',
      employment: '',
      language1: '',
      language2: '',
      linkedinLink:'',
      facebookLink:'',
      instagramLink:'',
    });
    setSelectedImage(null);
    setSelectedSkills([]);
    // Reload the page
    window.location.reload();
  };

  const handleAddLanguage=()=>{
    setShowAddLanguage(true);
  }
  const handleAddLink=()=>{
    setShowLink(true);
  }
  const handleAddEducation=()=>{
    setShowEducation(true);
  }
 
  const handleSkillClick = (skill) => {
    // Toggle the selected skill
    if (selectedSkills.includes(skill)) {
      setSelectedSkills((prevSkills) => prevSkills.filter((s) => s !== skill));
    } else {
      setSelectedSkills((prevSkills) => [...prevSkills, skill]);
    }
    // Save selected skills in local storage
    localStorage.setItem('selectedSkills', JSON.stringify(selectedSkills));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageData = reader.result;
        setSelectedImage(imageData);
        localStorage.setItem('uploadedImage', imageData);
      };
      reader.readAsDataURL(file);
    }
  };
 
  const downloadPDF = () => {
    const element = document.getElementById('cv-container');
    html2pdf(element, {
      margin: 10,
      filename: 'resume.pdf',
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
    });
  };
  
  const downloadDOCX = () => {
    const { displayedDetails } = userDetails;
    const { firstName, lastName, jobTitle, email, phone, address, linkedinLink, facebookLink, instagramLink, summary, employment, education1, education2, language1, language2 } = displayedDetails;
  
    const docxContent = `
      <h2>${firstName} ${lastName}</h2>
      <p><strong>Job Title:</strong> ${jobTitle}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>LinkedIn:</strong> ${linkedinLink}</p>
      <p><strong>Facebook:</strong> ${facebookLink}</p>
      <p><strong>Instagram:</strong> ${instagramLink}</p>
  
      <h2>Professional Summary</h2>
      <p>${summary}</p>
  
      <h2>Experience</h2>
      <p>${employment}</p>
  
      <h2>Education</h2>
      <p>${education1}</p>
      <p>${education2}</p>
  
      <h2>Languages</h2>
      <p>${language1}</p>
      <p>${language2}</p>
    `;
  
    mammoth.extractRawText({ value: docxContent })
      .then((result) => {
        const documentBlob = new Blob([result.value], { type: 'application/octet-stream' });
        const link = document.createElement('a');
        link.href = URL.createObjectURL(documentBlob);
        link.download = 'resume.docx';
        link.click();
      })
      .catch((error) => {
        console.error('Error generating DOCX:', error);
      });
  };
  return (
    <div className='main_container'>
      <div className='left_container'>
        <div className='resume_main_container'>
        <h1 className="heading"><span style={{color:'rgb(254, 125, 139)'}}>R</span>esume</h1>
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
            value={jobTitle}
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
          </div>
          <p className='upload'>Upload photo</p> 
        </div>
      </div>
       <div className='personal_details'>
        <div>
        <label>First Name <br />
          <input
            type="text"
            value={firstName}
            onChange={(e) => handleInputChange('firstName', e.target.value)}
          />
        </label>
     </div>
     <div>
        <label>
          Last Name <br />
          <input
            type="text"
            value={lastName}
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
            value={email}
            onChange={(e) => handleInputChange('email', e.target.value)}
          />
        </label>
        </div>
        <div>
        <label>
          phone <br />
          <input
            type="text"
            value={phone}
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
            value={address}
            onChange={(e) => handleInputChange('address', e.target.value)}
          />
        </label>
        </div>
        <div>
        <label>
          City <br />
          <input
            type="text"
            value={city}
            onChange={(e) => handleInputChange('city', e.target.value)}
          />
        </label>
        </div>
      </div>
      <div className='gap'>
      <h2>Professional Summary</h2>
      <p>Write 2-4 short & energetic sentences to interest the reader! Mention your role,
       experience & most importantly - your biggest achievements, best qualities and skills.</p>
       <div >
       <input className='Professional_summary'
        type='text'
        value={summary} 
        onChange={(e) => handleInputChange('summary', e.target.value)}
        placeholder='e.g. Passionate Science teacher with 8+ years and a track record of...' />
       </div>
       <p>Recruiter tip: write 50-200 characters to increase interview chances</p>
       </div>
       <div className='gap'>
         <h2>Experience</h2>
         <p>Show your relevant experience(last 10 years). Use bullet points to note your achievments.
         possible-use numbers/facts (Achieved X, measured by Y,by doing Z).</p>
         <input type='text' className='history' value={employment}
          onChange={(e) => handleInputChange('employment', e.target.value)}
         placeholder='add experience'/>
         {/* <h3>+ Add one more employment</h3> */}
       </div>
       <div className='gap'>
        <h2>Education</h2>
        <p>A varied education on your resume sums up the value that your learnings and background 
         will bring to job.</p>
         <h3 onClick={handleAddEducation}>+ Add education</h3>
         {showEducation && <div>
         <input type='text' className='history' value={education1}
         onChange={(e) => handleInputChange('education1', e.target.value)}
        placeholder='add education'/>
         <input type='text' className='history' value={education2}
         onChange={(e) => handleInputChange('education2', e.target.value)}
        placeholder='add education'/>
        </div>
         }
       </div>
       <div className='gap'>
        <h2>Websites & Social Links</h2>
        <p>you can ad links to websites you want hiring managers to see! Perhaps it will be a link to 
        your portfolio. LinkedIn profile, or personal website.</p>
         <h3 onClick={handleAddLink}>+ Add link</h3>
         {showLink && <div>
          <input type='text' className='history' value={linkedinLink}
          onChange={(e) => handleInputChange('linkedinLink', e.target.value)}
         placeholder='add linkedin'/>
          <input type='text' className='history' value={facebookLink}
          onChange={(e) => handleInputChange('facebookLink', e.target.value)}
         placeholder='add facebook'/>
          <input type='text' className='history' value={instagramLink}
          onChange={(e) => handleInputChange('instagramLink', e.target.value)}
         placeholder='add instagram'/>
         </div>
         }
       </div>
       <div className='gap'>
        <h2>Skills</h2>
        <p>Choose 5 important skills that show you fit the position. Make sure they match the key 
        skill mentioned in the job listing (especially when applying via an online system).</p>
       <div className='skill_btn'>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('HTML')}>HTML +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('CSS')}>CSS +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('JavaScript')}>JavaScricpt +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('Java')}>Java +</Button>
        </div>
        <div  className='skill_btn'>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('NodeJs')}>NodeJs +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('ReactJs')}>ReactJs +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('Data Analysis')}>Data Analysis +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('Management Skills')}>Management Skills +</Button>
        </div>
        <div  className='skill_btn'>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('PHP ')}>PHP +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('Communication Skills')}>Communication Skills +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('Project Management')}>Project Management +</Button>
        <Button variant="outlined" className='mui_btn' onClick={() => handleSkillClick('Team Management')}>Team Management +</Button>
        </div>
       </div>
       <div className='gap'>
        <h2>Languages</h2>
         
         {showAddLanguage && 
         <div>
             <input type='text' className='history' value={language1}
             onChange={(e) => handleInputChange('language1', e.target.value)}
            placeholder='add language'/>
             <input type='text' className='history' value={language2}
             onChange={(e) => handleInputChange('language2', e.target.value)}
            placeholder='add language'/>
            </div>
         }
         <h3 onClick={handleAddLanguage}>+ Add language</h3>
       </div>
       <div style={{display:'flex',justifyContent:'space-evenly'}}>
        <div>
        <Button variant='contained' className='mui_btn' onClick={handleSubmit}>Save</Button>
        </div>
        <div>
        <Button variant='contained' className='mui_btn' onClick={handleReset}>Reset</Button>
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
          <Button variant="contained" className='mui_btn' onClick={downloadPDF}>Download PDF</Button>
          <Button variant="contained" className='mui_btn' onClick={downloadDOCX}>Download DOCX</Button>
        </div>
        <div className="display_container" id="cv-container">
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
      </div>
    </div>
  )
}

export default App
