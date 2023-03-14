import express from 'express'
//import cors from "cors"
import authRoutes from "../server/routes/auth.js"
import postRoutes from "../server/routes/posts.js"
import userRoutes from "../server/routes/users.js"
import cookieParser from 'cookie-parser'
import multer from "multer"

const PORT=8800;
const app= express()

app.use(express.json())
app.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, '../client/public/upload')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now()+file.originalname)
    }
  })
  

const upload=multer({storage})

app.post("/api/upload",upload.single('file'),function(req,res){
    const file=req.file;
    res.status(200).json(file.filename)
})

//app.use(cors());
app.use("/api/auth",authRoutes)
app.use("/api/posts",postRoutes)
app.use("/api/user",userRoutes)

app.listen(PORT,()=>{
    console.log("Port running on "+PORT)
}) 