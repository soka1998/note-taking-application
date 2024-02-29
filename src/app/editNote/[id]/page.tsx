import EditNoteForm from "@/app/components/EditNoteForm";

export default function EditNotes({params}: {params:{id:String}}){
    return <EditNoteForm params={params}/>
}