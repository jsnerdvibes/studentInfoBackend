import expres from "express"
import {student} from "../model/studentmodel.js" 

const router = expres.Router();




//new route for post method

router.post("/", async (req,res)=>{
    try {
        if(
            !req.body.name ||
            !req.body.age ||
            !req.body.totalMarks
        ){
            return res.status(400).send({
                message:"send all req field",
            });
        }

        const newStudent = {
            name : req.body.name,
            age :req.body.age,
            totalMarks: req.body.totalMarks
        }

        const stud = await student.create(newStudent)
        return res.status(201).send(stud)
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message});
    }
})

// new route for get methon 

router.get("/",async (req,res)=>{

    try {
        
        const stud = await student.find({});

        return res.status(201).json({
            count : stud.length,
            data:stud
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }
    
})

// get 1 student info by id 

router.get("/:id",async (req,res)=>{

    try {

        const {id}= req.params
        
        const stud = await student.findById(id);

        return res.status(201).json({stud});

    } catch (error) {
        console.log(error);
        res.status(500).send({message:error.message})
    }
    
})

// new route for update

router.put('/:id', async (req,res)=>{
    try {
        if(
            !req.body.name||!req.body.age||req.body.totalMarks
        ){
            const {id} = req.params

            const result = await student.findByIdAndUpdate(id,req.body)

            if(!result){
                return res.status(404).json({message:"Stud not fund"})
            }
            return res.status(201).send({message:"Stud info updated "})
        }
        
    } catch (error) {
        console.log(error.message);
        res.status(500).send({message: error.message})
    }
})

// new route to delete stud info

router.delete('/:id', async (req,res)=>{
    const {id}= req.params;
    const result = await student.findByIdAndDelete(id)

    if(!result){
        return res.status(404).send({message:"invalid input"})
    }
    return res.status(200).send({message:"field updated successfully"});
})

export default router