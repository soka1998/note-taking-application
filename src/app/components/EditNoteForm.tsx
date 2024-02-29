"use client"
import { useState, useEffect } from "react";
import Link from "next/link";
import { updateNote  } from "@/store/notes/noteThunk"
import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"


interface Note {
  _id: string;
  title: string;
  description: string;
}

export default function EditNoteForm({params}: {params:{id: string}}) {
  const dispatch = useDispatch<AppDispatch>()
  const  {note }  = useSelector((state : RootState) => state.note)
 console.log(note)
  const { id } = params; // Assert router.query to have the type { id: string }

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault(); 
    dispatch(updateNote({id  ,title , description}));
   
  };

  useEffect(() => {
    // Fetch the note data when the component mounts
    const getNoteById = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/tasks/${id}`);
        console.log(id)
        if (!res.ok) {
          throw new Error("Could not load note");
        }
        const data: Note = await res.json();
        setTitle(data.title); // Populate the input fields with fetched data
        setDescription(data.description);
      } catch (error) {
        console.error("Error loading note:", error);
      }
    };

    if (id) {
      getNoteById(); // Fetch the note data only if ID is available
    }
  }, [id]);

  // const editNote = async () => {
  //   try {
  //     const res = await fetch(`http://localhost:3000/api/tasks/${id}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         title: title,
  //         description: description
  //       })
  //     });

  //     if (!res.ok) {
  //       throw new Error("Failed to edit note");
  //     }
  //   } catch (error) {
  //     console.error("Error editing note:", error);
  //   }
  // };

  return (
    <>
      <form
        className="flex flex-col gap-3"
        // onSubmit={(e) => {
        //   e.preventDefault();
        //   editNote();
        // }}
      >
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Note Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="border border-slate-500 px-8 py-2"
          type="text"
          placeholder="Note Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
          <Link href="/">
        <button
          type="submit"
          className="bg-green-600 font-bold text-white py-3 px-6 w-fit"
          onClick={handleUpdate}
        >
          Edit Note
        </button>
        </Link>
      </form>
    </>
  );
}
