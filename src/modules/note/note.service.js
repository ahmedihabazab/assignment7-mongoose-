import { Types } from "mongoose";
import { notesModel } from "../../models/notes.model.js";

export async function createNote(userId, NoteData) {
  const { content, title } = NoteData;
  const createdNote = await notesModel.create({ title, content, userId });
  return { message: "Note created" };
}

export async function updateNote(userId, noteData) {
  const { _id } = noteData;
  const isNoteExist = await notesModel.findById(_id);
  if (!isNoteExist) {
    throw new Error("Note not found");
  }
  const { title: updatedTitle, content: updatedContent } = noteData;
  const updateResult = await notesModel.findOneAndUpdate(
    { _id, userId },
    { title: updatedTitle, content: updatedContent },
    { returnDocument: "after" },
  );
  if (!updateResult) {
    throw new Error("You are not the Owner");
  }
  return updateResult;
}

export async function replaceNote(userId, noteId, replacementData) {
  const noteMatched = await notesModel.findById(noteId);
  if (!noteMatched) {
    throw new Error("Note not found");
  }
  const replaceQueryResult = await notesModel.findOneAndReplace(
    { _id: noteId, userId },
    replacementData,
    { returnDocument: "after" },
  );
  if (!replaceQueryResult) {
    throw new Error("You are not the owner");
  }
  return { message: "Note replaced" };
}

export async function updateTitle(userId, newTitle) {
  const updateQueryResult = await notesModel.updateMany(
    { userId },
    { title: newTitle },
    { returnDocument: "after" },
  );
  console.log(updateQueryResult);

  if (!updateQueryResult.matchedCount) {
    throw new Error("No note found");
  }
  return { message: "All Notes update" };
}

export async function deleteNote(userId, noteId) {
  const noteMatched = await notesModel.findById(noteId);
  if (!noteMatched) {
    throw new Error("Note not found");
  }
  const deleteQueryResult = await notesModel.findOneAndDelete({
    _id: noteId,
    userId,
  });
  if (!deleteQueryResult) {
    throw new Error("You are not the owner");
  }
  return deleteQueryResult;
}

export async function pagination(userId, page, limit) {
  const skip = Number(limit) * (number(page) - 1);
  const pagenation = await notesModel
    .find({ userId })
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  return { currentPage: page, pagenation };
}

export async function getNote(userId, noteId) {
  const noteMatched = await notesModel.findById(noteId);
  if (!noteMatched) {
    throw new Error("no note found");
  }
  const ownerCheck = await notesModel.findOne({ _id: noteId, userId });
  if (!ownerCheck) {
    throw new Error("You are not the owner");
  }
  return ownerCheck;
}

export async function getNoteWithUser() {
  const noteMatched = await notesModel
    .find({}, { title: 1, userId: 1, createdAt: 1 })
    .populate("userId", "email -_id");

  return noteMatched;
}

export async function getNoteWithUserAggregate(searchTitle, userId) {
  const noteMatched = await notesModel.aggregate([
    {
      $match: {
        title: searchTitle,
        userId: new Types.ObjectId(userId),
      },
    },
    {
      $project: {
        title: 1,
        userId: 1,
        createdAt: 1,
        _id: 0,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "userData",
        pipeline: [
          {
            $project: {
              name: 1,
              email: 1,
              _id: 0,
            },
          },
        ],
      },
    },
    { $unwind: "$userData" },
  ]);

  return noteMatched;
}
