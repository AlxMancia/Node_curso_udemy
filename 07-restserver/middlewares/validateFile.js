const { response } = require("express")

const validateFileToUpload = (req,res = response,next)=>{
    if (!req.files || Object.keys(req.files).length === 0 || !req.files.archivo) {
        return res.status(400).json({msg:'No files were uploaded.-archivo-validararchivosubir'});
       
      }
      next();

}

module.exports = {
    validateFileToUpload
}