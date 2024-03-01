"use client";
import React, { useEffect, useState } from "react";
import RemoveBtn from "./RemoveBtn";
import Link from "next/link";
import { HiPencilAlt } from "react-icons/hi";
import { deleteNote, fetchNotes } from "@/store/notes/noteThunk";
import { AppDispatch, RootState } from "@/store/store";
import { useDispatch, useSelector } from "react-redux";

// Define the type for a note
interface Note {
  _id: string;
  title: string;
  description: string;
}

const NotesLists: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { note } = useSelector((state: any) => state.note);
  // const [notes, setNotes] = useState<Note[]>([]);
  // const getNotes = async () => {
  //   try {
  //     const res = await fetch("http://localhost:3000/api/tasks");
  //     if (!res.ok) {
  //       throw new Error("Could not load notes");
  //     }
  //     const data = await res.json();
  //     console.log(data.Data);
  //     //  console.log(res.json())
  //     return data.Data;
  //   } catch (error) {
  //     console.log("Error loading notes: ", error);
  //   }
  // };

  useEffect(() => {
    const getAUser = async () => {
      await dispatch(fetchNotes());
    };
    getAUser();
  }, []);
  const handleDelete = (id: any) => {
    dispatch(deleteNote(id));
  };
  // const handleDeleteNote = async (taskId: string) => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
  //       method: "DELETE"
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to delete note");
  //     }

  //     // Remove the deleted note from the state
  //     setNotes(prevNotes => prevNotes.filter(note => note._id !== taskId));
  //   } catch (error) {
  //     console.error("Error deleting note:", error);
  //   }
  // };
  return (
    <>
      {note?.map((note: any) => (
        <div
          key={note._id}
          className="p-4 border border-slate-300 my-3 flex justify-between gap-5 items-start"
        >
          <div>
            <h2 className="font-bold text-2xl">{note.title}</h2>
            <div>{note.description}</div>
          </div>
          <div className="flex gap-2">
            <RemoveBtn
              taskId={note._id}
              onDelete={() => handleDelete(note._id)}
            />
            <Link href={`/editNote/${note._id}`}>
              <HiPencilAlt size={24} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};
export default NotesLists;
