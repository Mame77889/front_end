import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../Context/AppContext";

export default function Register() {
  const {token,setToken} =useContext(AppContext);
  const navigate =useNavigate();
  const [formData, setFormData]= useState({
    name:'',
    email:'',
    password:'',
    password_comfirmation:'',

  });

  const [errors,setErrors] =useState({});

  async function handleRegister(e) {
    e.preventDefault();
    const res = await fetch('/api/register',{
      method: "post",
      body: JSON.stringify(formData),
    });
   const data= await res.json();

   if (data.errors) {
    setErrors(data.errors);
    
   }else{
    localStorage.setItem("token",data.token);
    setToken(data.token);
navigate("/");
    // console.log(data);
   }

   
    
  }
    return(
        <>
          <h1 className="title">Register a new account</h1>
          {token}
          <form action="" onSubmit={handleRegister} className="W-1/2 mx-auto space-y-6">

              <div>
                <input type="text" placeholder="Name"
                value={formData.name}
                onChange={(e) => setFormData(
                  {...formData, name: e.target.value})}/>

                  {errors.name && <p className="error">{errors.name[0]}</p>}
              </div>

              <div>
                <input type="text" placeholder="Email" 
                value={formData.email}
                onChange={(e) => setFormData(
                  {...formData, email: e.target.value})}/>

                    {errors.email && <p className="error">{errors.email[0]}</p>}
              
              </div>

              <div>
                <input type="password" placeholder=" Password" 
                value={formData.password}
                onChange={(e) => setFormData(
                  {...formData, password: e.target.value})}/>

                    {errors.password && <p className="error">{errors.password[0]}</p>}
              
              </div>

            <div>
              <input type="password" placeholder="Comfirm Password"
              value={formData.password_comfirmation}
              onChange={(e) => setFormData(
                {...formData, password_comfirmation: e.target.value})}/> 
            
            </div>
            <button className="primary-btn">Register</button>

          </form>
        </>
    );
}