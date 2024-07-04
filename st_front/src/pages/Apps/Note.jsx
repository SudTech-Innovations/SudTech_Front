import { useEffect, useState, useContext } from "react";
import UserContext from "../../models/utils/context/UserContext";
import Cookies from "js-cookie";

export default function Note() {
  const note = useContext(UserContext);
  const [notes, setNotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingNoteId, setEditingNoteId] = useState(null);
  const [notesPerPage, setNotesPerPage] = useState(9);

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
        // console.log("API response:", data);
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

  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = Array.isArray(notes)
    ? notes.slice(indexOfFirstNote, indexOfLastNote)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const togglePopup = (note = null) => {
    setIsPopupOpen(!isPopupOpen);
    if (note) {
      setTitle(note.title);
      setContent(note.content);
      setEditingNoteId(note.id);
    } else {
      setTitle("");
      setContent("");
      setEditingNoteId(null);
    }

    if (isPopupOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  };

  const handleClickOutside = (event) => {
    if (event.target.closest(".popup")) return;
    togglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    const token = Cookies.get("token");
    const newNote = {
      title,
      content,
    };
    try {
      const response = await fetch("http://localhost:8390/app/note", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
      });
      const data = await response.json();
      setNotes([...notes, data]);
      setTitle("");
      setContent("");
      setIsPopupOpen(false);
    } catch (error) {
      console.error("Erreur de création de la note", error);
    }
  };

  const handleDelete = async (id) => {
    const token = Cookies.get("token");
    try {
      await fetch(`http://localhost:8390/app/note/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(notes.filter((note) => note.id !== id));
    } catch (error) {
      console.error("Erreur de suppression de la note", error);
    }
  };

  const handleEdit = (id) => {
    const noteToEdit = notes.find((note) => note.id === id);
    togglePopup(noteToEdit);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    if (!title || !content) {
      alert("Veuillez remplir tous les champs");
      return;
    }
    const token = Cookies.get("token");
    const updatedNote = {
      title,
      content,
    };
    try {
      const response = await fetch(
        `http://localhost:8390/app/note/${editingNoteId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedNote),
        }
      );
      const data = await response.json();
      setNotes(notes.map((note) => (note.id === editingNoteId ? data : note)));
      setTitle("");
      setContent("");
      setEditingNoteId(null);
      togglePopup();
    } catch (error) {
      console.error("Erreur de mise à jour de la note", error);
    }
  };

  const changeNotesPerPage = (event) => {
    setNotesPerPage(parseInt(event.target.value));
    setCurrentPage(1);
  };

  return (
    <>
      <div id="pageNote">
        <h1>
          Note<button onClick={togglePopup}>Ajouter une note</button>
        </h1>
        <p>
          Nombre de note par page:
          <select value={notesPerPage} onChange={changeNotesPerPage}>
            <option value={3}>3</option>
            <option value={9}>9</option>
            <option value={15}>15</option>
            <option value={21}>21</option>
            <option value={27}>27</option>
          </select>
        </p>

        {isPopupOpen && (
          <>
            <div className="overlay" onClick={togglePopup}></div>
            <div className="popup">
              <form onSubmit={editingNoteId ? handleUpdate : handleSubmit}>
                <label>
                  Titre:
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                  />
                </label>
                <label>
                  Contenu:
                  <textarea
                    value={content}
                    onChange={(event) => setContent(event.target.value)}
                  />
                </label>
                <button className="green-button" type="submit">
                  {editingNoteId ? "Mettre à jour" : "Enregistrer"}
                </button>
                <button
                  className="red-button"
                  type="button"
                  onClick={togglePopup}
                >
                  Annuler
                </button>
              </form>
            </div>
          </>
        )}
        <div className="noteList">
          {Array.isArray(currentNotes) ? (
            currentNotes.map((note) => (
              <div className="oneNote" key={note.id}>
                <div className="title">
                  <h2>
                    {note.id} - {note.title}
                  </h2>
                </div>
                <div className="contentBloc">
                  <p className="content"> Contenu : {note.content}</p>
                </div>
                <div className="dates">
                  <p>
                    Créé le :{formatDate(note.createdAt)}
                    {note.createdAt !== note.updatedAt &&
                      ` | ${formatDate(note.updatedAt)}`}
                  </p>
                </div>
                <div className="editor">
                  <p>Par: {note.userId}</p>
                </div>
                <div className="button">
                  <button
                    className="green-button"
                    onClick={() => handleEdit(note.id)}
                  >
                    Modifier
                  </button>
                  <button
                    className="red-button"
                    onClick={() => handleDelete(note.id)}
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Aucune note à afficher</p>
          )}
        </div>
        <div className="pages">
          {Array.from(
            { length: Math.ceil(notes.length / notesPerPage) },
            (_, i) => (
              <button key={i} onClick={() => paginate(i + 1)}>
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </>
  );
}
