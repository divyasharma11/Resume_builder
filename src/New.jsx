import React, { useEffect, useState } from 'react';
import './App.css';
import CVPreview from './Cvpreview';
import CVForm from './CvForm';
// ... (import other dependencies)

function New() {
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
        const arr=[firstName,lastName,email,phone,city,address,education1,education2,jobTitle,summary,employment,language1,language2,linkedinLink];
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
    },[firstName,lastName,email,phone,city,address,education1,education2,jobTitle,summary,employment,language1,language2,linkedinLink])
  
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

  return (
    <div>
      <CVForm
        userDetails={userDetails}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        handleReset={handleReset}
        handleAddLanguage={handleAddLanguage}
        handleAddLink={handleAddLink}
        handleAddEducation={handleAddEducation}
        handleSkillClick={handleSkillClick}
        handleImageChange={handleImageChange}
        selectedImage={selectedImage}
        selectedSkills={selectedSkills}
        showAddLanguage={showAddLanguage}
        showLink={showLink}
        showEducation={showEducation}
        progress={progress}
        displayedDetails={displayedDetails}
      />
      <CVPreview
        displayedDetails={displayedDetails}
        selectedSkills={selectedSkills}
        selectedImage={selectedImage}
      />
    </div>
  );
}

export default New;
