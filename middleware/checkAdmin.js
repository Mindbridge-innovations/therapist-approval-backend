// middleware/checkAdmin.js
const checkAdmin = (req, res, next) => {
    if (!req.user.role==="admin") {
      return res.status(403).json({ message: 'Access denied' });
    }
    next();
  };

const checkTherapist=(req,res,next)=>{
    if(!req.user.isTherapist){
        return res.status(403).json({message:'Access denied'});
    }
    next();
}
  
  module.exports = {checkAdmin, checkTherapist};