import noteModel from "../model/noteModel.js"
import createError from "../utils/createError.js";


// create-note
export const createNote = async (req, res, next) => {
    try {

        const newNote = new noteModel({ ...req.body, userId: req.userId });
        await newNote.save();
        res.status(200).send(newNote);

    } catch (err) {
        next(err)

    }

}

//get-allnotes
export const getAllNotes = async (req, res, next) => {
    try {
        const allNotes = await noteModel.find({});
        res.status(200).send(allNotes);


    } catch (err) {
        next(err)

    }
}

//get-single-notes

export const getSingleNotes = async (req, res, next) => {
    try {
        const note = await noteModel.findById(req.params.id)
        console.log(note)
        res.status(200).json(note)


    } catch (err) {
        next(err)

    }
}

//update-notes


export const updateNote = async (req, res, next) => {
    try {

        let note = await noteModel.findById(req.params.id);
        if (!note) return next(createError(404, "note not found"))

        if (req.userId !== note.userId.toString()) {
            return next(createError(403, "you can only update your account"))
        }



        note = await noteModel.findByIdAndUpdate(req.params.id, req.body, {
            new: true,

        });

        res.status(200).send(note);

    } catch (err) {
        next(err)

    }

}
// delete-notes

export const deleteNote = async (req, res, next) => {
    try {

        let note = await noteModel.findById(req.params.id);
        if (!note) return next(createError(404, "note not found"));
        
        if (req.userId !== note.userId.toString()) {
            return next(createError(403, "you can only delete your account"))
        }

        await noteModel.findByIdAndDelete(req.params.id);
        res.status(200).send("deleted successfully")

    } catch (err) {
        next(err)

    }
}