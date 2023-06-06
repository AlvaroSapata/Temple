function isAdminBack (req,res, next) {
    


    let isAdminRole = false
  
  
  
    const foundUser =  User.findOne({ role });
    if (foundUser.role === "admin") { 
      return isAdminRole(true);
  }else {
    return isAdminRole(false);
    }

    }


    module.exports = isAdminBack