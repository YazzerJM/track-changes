import { useEffect, useRef, useState } from 'react';

// import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';
// import '@ckeditor/ckeditor5-collaboration-core/theme/integrations/codeblock.css';
// import { CKEditor } from '../public/libraries/ckeditor/build/ckeditor';

const Editor2 = () => {
  const editorRef = useRef()

  // const [users, setUsers] = useState();

  const [editorLoaded, setEditorLoaded] = useState(false)
  const {
    CKEditor,
    Editor,
  } = editorRef.current || {}

  const config = {
    licenseKey: 'heaPPwoEPI7CuyZ5ZmcQwO5yKmPuqxLELh26WBJdF8yt4YyOpMQkFd48Xg==',
    // plugins: [TrackChanges],
    placeholder: "asdsadas",

    licenseKey: 'heaPPwoEPI7CuyZ5ZmcQwO5yKmPuqxLELh26WBJdF8yt4YyOpMQkFd48Xg==',
    language: 'es',
    // extraPlugins: [
    //   // Learn more about users at https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/users.html.

    //   class UsersInit {
    //     static get requires() {
    //       return ['Users'];
    //     }

    //     constructor(editor) {
    //       this.editor = Editor;
    //       console.log("asd");
    //     }

    //     init() {
    //       const users = this.editor.get('Users');

    //       users.addUser({
    //         id: 'u1'
    //       });

    //       users.defineMe('u1');
    //     }
    //   }

    // ]
  }

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      Editor: require('../public/libraries/ckeditor/build/ckeditor'), //Added .CKEditor
    }
    setEditorLoaded(true)
  }, []);

  const [data, setData] = useState('');

  return (
    <>
      {editorLoaded ? <><CKEditor
        name={"editor"}
        editor={Editor}
        data={data}
        config={config}
        onReady={editor => {
          // You can store the "editor" and use when it is needed.
          console.log('Editor is ready to use!', editor);
          editor.ui.getEditableElement().parentElement.insertBefore(
            editor.ui.view.toolbar.element,
            editor.ui.getEditableElement()
          );
          editor.execute('trackChanges');

          const users = editor.plugins.get('Users');
          // setUsers(userInstance);
          users.addUser({
            id: 'u1',
            initials: 'YJM',
            isAnonymous: false,
            name: 'Yasser Jiménez Martínez'
          });

          users.defineMe('u1');
          console.log(users)

          editor.editing.view.change((writer) => {
            writer.setStyle(
              "height",
              "600px",
              editor.editing.view.document.getRoot()
            );
          });
        }}
        onChange={(event, editor) => {
          const data = editor.getData()
          setData(data);
          console.log(data);


          const cambios = editor.plugins.get('TrackChanges');
          console.log(cambios.getSuggestions({
            skipNotAttached: true,
            toJSON: true
          }))

          const editorData = editor.data.get();
          console.log(editorData);
        }}
      />
        <h1>CKEditor 2</h1>
        <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          Obtener cambios
        </a>
      </> : <p>Cargando...</p>}
    </>
  )
}


export default Editor2;
