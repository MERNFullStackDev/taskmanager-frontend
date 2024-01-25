export const validateCreateTask = (values) => {
  let isValid = true;
  let errors = {};
  if(!values.taskName){
    errors.taskName = "Task Name is required";
    isValid = false;
  }
  if(values.dueDate === null){
    errors.dueDate = "Due Date is required";
    isValid = false;
  }
  
  return {isValid, errors};
}

export const validateLoginPage = (values) => {
  let isValid = true;
  let errors = {};
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  if(!values.email){
    errors.email = "Email Field is required";
    isValid = false;
  }else if(!emailRegex.test(values.email)){
    errors.email = "Invalid Email";
    isValid = false;
  }
  if(!values.password){
    errors.password = "Password Field is required";
    isValid = false;
  } else if(values.password.length < 6){
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }
  
  return {isValid, errors};
}


export const validateSignupPage = (values) => {
  let isValid = true;
  let errors = {};
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

  if(values.name.trim() === ""){
    errors.name = "Please Enter Your Full Name.";
    isValid = false;
  }

  if(!values.email){
    errors.email = "Email Field is required";
    isValid = false;
  }else if(!emailRegex.test(values.email)){
    errors.email = "Invalid Email";
    isValid = false;
  }
  if(!values.password){
    errors.password = "Password Field is required";
    isValid = false;
  } else if(values.password.length < 6){
    errors.password = "Password must be at least 6 characters";
    isValid = false;
  }
  
  return {isValid, errors};
}