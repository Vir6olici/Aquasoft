  import React,{useState,useEffect} from 'react';
  import axios from 'axios';
  import Messages from './messages.js';
  import {Route,BrowserRouter as Redirect,Link,Router,Switch} from 'react-router-dom'
  import {browserHistory} from 'react'

  class User{
    constructor(username,email,phone){
      this.username = username;
      this.email = email;
      this.phone = phone;
    }
    getUser(){
      return this.username;
    }
    getEmail(){
      return this.email;
    }
    getPhone(){
      return this.phone;
    }
  }

  class Mesage{
    constructor(sender,reciver,content,data){
      this.message_date = data;
      this.receiver = reciver;
      this.sender = sender;
      this.content = content;
    }
    getData(){
      return this.message_date;
    }
    getReceiver(){
      return this.receiver;
    }
    getSender(){
      return this.sender;
    }
    getContent(){
      return this.content;
    }
  }

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
    const [submitted,setSubmitted] = useState({
      submitted : false
    });

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
    
    const handleSubmit = (event) => {
      event.preventDefault();
      setSubmitted(true);
      console.log(submitted);
      setTimeout(() => {console.log(submitted);}, 2000);
      const dataFront = Date.now();
      const userFront = new User(values.username,values.email,values.phone);
      const mesajFront = new Mesage(values.username,values.reciver,values.content,dataFront);
      axios.post('http://localhost:27017/',{
        users : userFront ,
        date : dataFront ,
        messages : mesajFront
      })
    
      axios.get('http://localhost:27017/messages').then(response =>{
        let array = [...response.data];
        array.forEach(elem => console.log(elem));               
      })
      
      console.log(submitted);
    }


    return(
      <Router>
        <form onSubmit={handleSubmit}>
          <input onChange = {handleUsernameInputChange} value = {values.username} type="text" placeholder = "User Name" name = "username"/> 
          {submitted && isUserNameCorrect(values.username) === true ? <span> Please Enter a valid Username</span> : <span></span>}
          <input onChange = {handleEmailInputChange} value = {values.email} type="email" placeholder = "email" name = "email"/> 
          {submitted && isEmailCorrect(values.email) === true ?<span> Please enter an email</span> : <span></span>}
          <input onChange = {handlePhoneInputChange} value = {values.phone} type="text" placeholder = "phone" name = "phone"/> 
          {submitted && isPhoneCorrect(values.phone) === true ?<span> Please enter a valid phone number</span> : <span> </span>}
          <input onChange = {handleReciverInputChange} value = {values.reciver} type="text" placeholder = "reciver" name ="receiver"/>
          {submitted && isReceiverCorect(values.reciver) === true ?<span> Please enter a valid receiver </span> : <span> </span>}
          <input onChange = {handleContentInputChange} value = {values.content} type="content" placeholder = "Mesaj" name = "mesaj" />
          {submitted && isContentCorect(values.content) === true ?<span> Please enter a valid content </span> : <span> </span>}
          <button type="submit"> Submit! </button>
          {submitted ? 
          <div> NO </div>
          :
          <Route path = "/messages" exact component = {Messages} />
        }
        </form>
      </Router>
    ); 
  }

  export default App;
