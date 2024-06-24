import { useEffect, useState, useContext } from "react";
import UserContext from "../../models/utils/context/UserContext";
import Cookies from "js-cookie";

export default function Note() {
  const note = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");

    const fetchNotes = async () => {
      try {
        const response = await fetch("http://localhost:8390/app/note", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setNotes(data);
      } catch (error) {
        console.error("Erreur de récupération des notes", error);
      }
    };

    fetchNotes();
  }, []);

  const formatDate = (dateString) => {
    return new Intl.DateTimeFormat("fr-FR", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(new Date(dateString));
  };

  return (
    <>
      <h1>Note</h1>
      <p>Page de prise de notes</p>
      {Array.isArray(notes) ? (
        notes.map((note) => (
          <div key={note.id}>
            <h2>{note.title}</h2>
            <p> Contenu : {note.content}</p>
            <p>
              Créé le :{formatDate(note.createdAt)}
              {note.createdAt !== note.updatedAt &&
                ` | ${formatDate(note.updatedAt)}`}
            </p>
            <p>Par: {note.userId}</p>
          </div>
        ))
      ) : (
        <p>Aucune note à afficher</p>
      )}
    </>
  );
}
