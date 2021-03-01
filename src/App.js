import React,{useState} from 'react';

function App() {
  const [values,setValues]  = useState({
    date : "",
    username : "",
    email : "",
    phone : "",
    message_date : "",
    sender : "",
    reciver : "",
    content : "",
  });
  const [submitted,setSubmitted] = useState(false);

  const handleDateInputChange = (event) =>{
    setValues({...values,date: event.target.date})
  }
  const handleUsernameInputChange =(event) =>{
    setValues({...values,username: event.target.value})
  }
  const handleEmailInputChange = (event) =>{
    setValues({...values,email : event.target.value})
  }
  const handlePhoneInputChange = (event) =>{
    setValues({...values,phone: event.target.value})
  }
  const handleMessageDateChange = (event) =>{
    setValues({...values,message_date: event.target.value})
  }
  const handleSenderInputChange = (event) =>{
    setValues({...values,sender: event.target.value})
  }
  const handleReciverInputChange = (event) =>{
    setValues({...values,reciver: event.target.value})
  }
  const handleContentInputChange = (event) =>{
    setValues({...values,content: event.target.value})
  }

  const handleSubmit = (event) =>{
    event.preventDefault();
    setSubmitted(true);
  }
  const isUserNameCorrect = (username) =>{
    if(username === "") // aici trebuie verificat daca exista in baza de date , daca cumva trebuie sa contina anumite carctere speciale etc.
        {return true;}
      else 
        {return false;}
  }
  const isEmailCorrect = (email) => {
    if(email === "") // aici trebuie verificat daca exista in baza de date
      {return true;}
    else 
      {return false;}
  }
  const isPhoneCorrect = (phone) => {
    if(phone.length !== 10) // trebuie verificat si daca la inceput are 07.
      {return true;}
      else 
      {return false;}
  }
  const isSenderCorect = (sender) =>{
    if(sender === "") 
    {return true;}
    else 
    {return false;}
  }
  const isReceiverCorect = (receiver) =>{
    if(receiver === "")
    {return true;}
    else 
    {return false;}
  }
  const isContentCorect = (content) =>{
    if(content === "")
    {return true;}
    else 
    {return false;}
  } 
   

  return (
    <form onSubmit={handleSubmit}>
      <input onChange = {handleDateInputChange} value = {values.date} type="date" placeholder = "data-currenta" name = "data-curenta"/> 
      {submitted && values.date ? <span> Please Enter a valid Date</span> : <span> </span>} 
      <input onChange = {handleUsernameInputChange} value = {values.username} type="text" placeholder = "User Name" name = "username"/> 
      {submitted && isUserNameCorrect(values.username) === true ? <span> Please Enter a valid Username</span> : <span></span>}
      <input onChange = {handleEmailInputChange} value = {values.email} type="email" placeholder = "email" name = "email"/> 
      {submitted && isEmailCorrect(values.email) === true ?<span> Please enter an email</span> : <span></span>}
      <input onChange = {handlePhoneInputChange} value = {values.phone} type="text" placeholder = "phone" name = "phone"/> 
      {submitted && isPhoneCorrect(values.phone) === true ?<span> Please enter a valid phone number</span> : <span> </span>}
      <input onChange = {handleMessageDateChange} value = {values.message_date} type="date" placeholder = "data-mesaj" name = "data-mesaj"/>
      {submitted && values.message_date ? <span> Please enter a valid Date</span> : <span> </span>}
      <input onChange = {handleSenderInputChange} value = {values.sender} type="text" placeholder = "sender" name="username" />
      {submitted && isSenderCorect(values.sender) === true ? <span> Please enter a valid sender </span> : <span> </span>}
      <input onChange = {handleReciverInputChange} value = {values.reciver} type="text" placeholder = "reciver" name ="receiver"/>
      {submitted && isReceiverCorect(values.reciver) === true ?<span> Please enter a valid receiver </span> : <span> </span>}
      <input onChange = {handleContentInputChange} value = {values.content} type="content" placeholder = "Mesaj" name = "mesaj" />
      {submitted && isContentCorect(values.content) === true ?<span> Please enter a valid content </span> : <span> </span>}
      <button> Send! </button> 
      {submitted ? <div> Yes</div> : <div>No </div>}
    </form>  
  );
}

export default App;
