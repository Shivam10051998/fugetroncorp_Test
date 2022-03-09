import React, { useState } from "react";
import { EditorState } from "draft-js";
import { Editor } from "react-draft-wysiwyg";
import { convertToRaw, Modifier } from "draft-js";
import { Button, Grid } from "@mui/material";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./TextEditor.css";
import draftToHtml from "draftjs-to-html";

const TextEditor = () => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [showImage, setShowImage] = useState(false);

  const handleEditorChange = (state) => {
    setEditorState(state);
    setMessage(draftToHtml(convertToRaw(state.getCurrentContent())));
  };

  const onImageChange = (event) => {
    const editorState_1 = editorState;
    const selection = editorState_1.getSelection();
    const contentState = editorState_1.getCurrentContent();
    const ncs = Modifier.insertText(
      contentState,
      selection,
      event.target.files[0].name
    );
    const es = EditorState.push(editorState_1, ncs, "insert-fragment");
    setEditorState(es);
    if (event.target.files && event.target.files[0]) {
      setImage(URL.createObjectURL(event.target.files[0]));
    }
  };

  const convertContentToHTML = () => {
    setShowImage(true)
    setMessage(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "50%" }}>
        <div className="leftDiv">
          <input
            style={{ fontSize: "16px" }}
            type="file"
            onChange={onImageChange}
            className="filetype"
          />
        </div>
        <div className="editorDiv">
          <Editor
            editorState={editorState}
            onEditorStateChange={handleEditorChange}
            wrapperClassName="wrapper-class"
            editorClassName="editor-class"
            toolbarClassName="toolbar-class"
          />
        </div>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Button className="submitButton" onClick={convertContentToHTML}>
            submit
          </Button>
          <div style={{ width: "30px" }} />
          <Button onClick={()=>setShowImage(false)} className="cancelButton">Cancel</Button>
        </div>
      </div>

      <div className="lineDiv" />

      {showImage ? (
        <div className="rightDiv">
          <img src={image} className="image" alt="" />
          <Grid container>
            <Grid item xs={3}></Grid>
            <Grid item xs={12} className="grid">
              <div dangerouslySetInnerHTML={{ __html: message }}></div>
            </Grid>
            <Grid item xs={3}></Grid>
          </Grid>
        </div>
      ) : null}
    </div>
  );
};
export default TextEditor;
