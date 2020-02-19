import multer from "multer";
import randomstring from "randomstring";
import path from "path";
import fs from "fs";
let uploadFile = (field, folderdes = "users", fileNameLength = 10, fileSizemb = 1, fileExtension = "jpeg|jpg|png|gif") => {
	const storage = multer.diskStorage({ //Up load vao dau
		destination: (req, file, cb) => {
			  cb(null, __path_uploads +"/"+ folderdes + "/");
		},
		filename: (req, file, cb) => { //upload len sau do dat ten la gi?
			cb(null,  randomstring.generate(fileNameLength) + path.extname(file.originalname));
		},
	});
	
	const upload = multer({
		storage: storage,
		limits: {
			fileSize: fileSizemb * 1024 * 1024,
		},
		fileFilter: (req, file, cb) => {
			const filetype = new RegExp(fileExtension);
			const extname  = filetype.test(path.extname(file.originalname).toLowerCase());
			const mimetype = filetype.test(file.mimetype);

			if(mimetype && extname){
				return cb(null, true);
			}else{
				cb("Phần mở rộng không phù hợp");
			}
		}
	}).single(field);
	return upload;
};
const removefile = (folder, filename) =>{
	if(filename != "" && filename != undefined){
		let path = folder + filename;
    	if (fs.existsSync(path)) { fs.unlinkSync(path, (err) => {if (err) throw err;});}
	}
}

module.exports = {
	uploadFile,
	removefile,
};