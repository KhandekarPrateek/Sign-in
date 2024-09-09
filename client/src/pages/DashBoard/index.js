import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { nanoid } from "nanoid";
import NavigationBar from "../../common/NavigationBar";
import { useNavigate, useParams } from "react-router";

import { ThemeContext } from "../../utils/ThemeContext";
import { toast } from "react-toastify";
import TinyMceEditor from "./Editor";
import NoteTab from "./NoteTab";
import Loader from "../../common/Loader";

const Notes = () => {
  // Removed handleUID and auth since they are not defined
  // useEffect(() => {
  //   handleUID();
  // }, [auth]);

  const defaultNote = {
    noteUUId: nanoid(),
    noteId: 1,
    noteHeader: null,
    noteContent: "Create Your own notes",
    noteImage: null,
  };
  const storedData = localStorage.getItem("userInfo");
  const parsedData = JSON.parse(storedData);
  const [note, setNote] = useState([]);
  const [heading, setHeading] = useState("");
  const [content, setContent] = useState("");
  const [onClickUUID, setOnClickUUID] = useState("");
  const [loading, setLoading] = useState(false);

  const createNewNote = () => {
    const newNote = {
      ...defaultNote,
      noteId: note.length + 1,
      noteUUId: nanoid(),
      noteHeader: heading,
      noteContent: content,
    };
    setNote([...note, newNote]);
    setHeading("");
    setContent("");
    const result = [...note, newNote].filter((element) => {
      return element.noteHeader !== "";
    });
    // Removed createFirbaseNote call
    toast.success("Note added", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleNoteNameChange = (event) => {
    setHeading(event.target.value);
  };

  const openNoteBody = (num) => {
    const { noteContent, noteHeader, noteUUId } = note[num];
    setHeading(noteHeader);
    setContent(noteContent);
    setOnClickUUID(noteUUId);
    navigateToNoteName(num);
  };

  const removeNote = (num) => {
    setHeading("");
    setContent("");
    // Removed createFirbaseNote call
    const updatedNotes = note.filter((_, index) => index !== num);
    setNote(updatedNotes);
    // Removed createFirbaseNote call
    if (updatedNotes.length > 0) {
      navigateToNoteName(0);
    }
    toast.success("Note deleted", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const navigate = useNavigate();
  const navigateToNoteName = (num) => {
    const storedData = localStorage.getItem("userInfo");
    const parsedData = JSON.parse(storedData);
    if (note[num].noteHeader === null) {
      navigate(`/dashboard/${parsedData}`);
    } else {
      navigate(`/dashboard/${parsedData}/${note[num].noteUUId}`);
    }
  };

  const updateNote = (index) => {
    const updatedNote = { ...note[index], noteContent: content, noteHeader: heading };
    const updatedNotes = [...note];
    updatedNotes[index] = updatedNote;
    setNote(updatedNotes);
    // Removed createFirbaseNote call
    toast.success("Note updated", {
      position: toast.POSITION.TOP_RIGHT,
    });
  };

  const handleEditorChange = (content) => {
    setContent(content);
  };

  const { noteUUID } = useParams();

  const BlogPost = () => {
    let flag = null;
    note.forEach((element) => {
      const { noteUUId, noteHeader, noteContent } = element;
      if (noteUUId === noteUUID) {
        setHeading(noteHeader);
        setContent(noteContent);
        return (flag = true);
      } else if (onClickUUID === noteUUId) {
        navigate(`/dashboard/${parsedData}/${onClickUUID}`);
        return (flag = true);
      }
      if (flag === false) {
        navigate(`/dashboard/${parsedData}`);
      }
    });
  };

  useEffect(() => {
    BlogPost();
  }, [note, noteUUID]);

  const [{ isDark }] = useContext(ThemeContext);
  const foo = () => {
    if (document.querySelector("iframe")) {
      const iframe1 = document.querySelector("iframe").contentDocument;
      const styleTag = iframe1.createElement("style");
      const cssRules = `
        .mce-content-body:not([dir=rtl])[data-mce-placeholder]:not(.mce-visualblocks)::before {
          color: ${isDark ? "white" : "black"};
        }
      `;
      styleTag.appendChild(iframe1.createTextNode(cssRules));
      iframe1.head.appendChild(styleTag);
    }
  };

  const tinyMceIframeFunc = () => {
    if (document.querySelector("iframe")) {
      const iframe = document.querySelector("iframe").contentWindow;
      if (isDark) {
        iframe.document.querySelector("body").style.color = "white";
      } else {
        iframe.document.querySelector("body").style.color = "black";
      }
    }
  };

  const iframeFunc = () => {
    foo();
    tinyMceIframeFunc();
  };

  useEffect(() => {
    iframeFunc();
  }, [isDark]);

  const [openNoteContainer, setopenNoteContainer] = useState(true);
  const togglePageSizeChange = (oldopenNoteContainer) => {
    setopenNoteContainer(!oldopenNoteContainer);
  };

  return (
    <div className="profile-container">
      {loading ? (
        <Loader />
      ) : (
        <>
          {openNoteContainer ? (
            <>
              <Row className="d-flex justify-content-end g-0 ">
                <Col
                  sm={3}
                  className="justify-content-center d-flex align-items-center border-bottom border-end g-0 dashboard-border "
                >
                  <div className="navbar-rules">
                    <h3>All notes</h3>
                  </div>
                </Col>
                <Col sm={9}>
                  <NavigationBar
                    UUID={noteUUID}
                    navNoteName={heading}
                    openNoteContainer={openNoteContainer}
                    createNewNote={createNewNote}
                    togglePageSizeChange={togglePageSizeChange}
                  />
                </Col>
                <Row className="g-0">
                  <Col sm={3}>
                    <NoteTab
                      noteArray={note}
                      openNoteBody={openNoteBody}
                      removeNote={removeNote}
                      updateNote={updateNote}
                      isDark={isDark}
                      setNote={setNote}
                    />
                  </Col>
                  <Col sm={9} className="justify-content-end ">
                    <TinyMceEditor
                      handleNoteNameChange={handleNoteNameChange}
                      heading={heading}
                      iframeFunc={iframeFunc}
                      content={content}
                      handleEditorChange={handleEditorChange}
                    />
                  </Col>
                </Row>
              </Row>
            </>
          ) : (
            <>
              <NavigationBar
                UUID={noteUUID}
                navNoteName={heading}
                openNoteContainer={openNoteContainer}
                createNewNote={createNewNote}
                togglePageSizeChange={togglePageSizeChange}
              />
              <TinyMceEditor
                handleNoteNameChange={handleNoteNameChange}
                heading={heading}
                iframeFunc={iframeFunc}
                content={content}
                handleEditorChange={handleEditorChange}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Notes;