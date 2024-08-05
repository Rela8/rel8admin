import React from "react"
import { Editor } from "@tinymce/tinymce-react";
type Props = {
    editorRef: React.MutableRefObject<any>;
    initialValue: string;
    disabled?: boolean;
  };
  
  function TextEditor({ editorRef, disabled, initialValue }: Props) {
    const apiKey = process.env.REACT_APP_TINYMCE_API_KEY;

    return (
      <>
        <Editor
          apiKey={apiKey}
          onInit={(_evt, editor) => (editorRef.current = editor)}
          initialValue={initialValue}
          disabled={disabled}
          init={{
            max_height: 700,
            menubar: false,
            plugins: [
              "a11ychecker",
              "advlist",
              "advcode",
              "advtable",
              "autolink",
              "checklist",
              "export",
              "lists",
              "link",
              "charmap",
              "preview",
              "anchor",
              "searchreplace",
              "visualblocks",
              "powerpaste",
              "fullscreen",
              "formatpainter",
              "insertdatetime",
              "help",
              "wordcount",
            ],
            toolbar:
              "undo redo | casechange blocks | bold italic backcolor | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | removeformat | preview help",
          }}
        />
      </>
    );
  }
  
  export default TextEditor;
  