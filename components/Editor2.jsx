
// import style from '../styles/CKEditor.module.css';
import { useEffect, useRef, useState } from 'react';

// import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';
// import '@ckeditor/ckeditor5-collaboration-core/theme/integrations/codeblock.css';
// import { CKEditor } from '../public/libraries/ckeditor/build/ckeditor';

const Editor2 = () => {
  const editorRef = useRef();
  const sidebarRef = useRef();

  // const [users, setUsers] = useState();

  const [editorLoaded, setEditorLoaded] = useState(false)
  const {
    CKEditor,
    Editor,
  } = editorRef.current || {}

  const config = {
    licenseKey: 'heaPPwoEPI7CuyZ5ZmcQwO5yKmPuqxLELh26WBJdF8yt4YyOpMQkFd48Xg==',
    placeholder: "Empieza a desarrollar el documento",
    language: 'es',
    sidebar: {
      container: sidebarRef.current
    },
    revisionHistory: {
      showRevisionViewerCallback: config => {
        const editorContainer = document.querySelector('.editor-container');
        const viewerContainer = document.querySelector('.revision-viewer-container');
        const viewerElement = document.querySelector('.revision-viewer-editor');

        config.revisionHistory.viewerSidebarContainer = document.querySelector('.revision-viewer-sidebar');

        return Editor.create(viewerElement, config).then(viewerEditor => {
          viewerContainer.style.display = 'flex';
          editorContainer.style.display = 'none';

          const toolbarContainer = document.querySelector('.document-editor__toolbar');

          toolbarContainer.innerHTML = '';
          toolbarContainer.appendChild(viewerEditor.ui.view.toolbar.element);

          return viewerEditor;
        });
      },
      closeRevisionViewerCallback: viewerEditor => {
        const editorContainer = document.querySelector('.editor-container');
        const viewerContainer = document.querySelector('.revision-viewer-container');

        viewerContainer.style.display = 'none';
        editorContainer.style.display = '';

        return viewerEditor.destroy().then(() => {
          const toolbarContainer = document.querySelector('.document-editor__toolbar');

          toolbarContainer.innerHTML = '';
          toolbarContainer.appendChild(viewerEditor.ui.view.toolbar.element);
        });
      }
    },
    extraPlugins: [
      class UsersInit {
        static get requires() {
          return ['Users'];
        }

        constructor(editor) {
          this.editor = editor;
        }

        init() {

          const users = this.editor.plugins.get('Users');

          users.addUser({
            id: 'u1',
            initials: 'YJM',
            isAnonymous: false,
            name: 'Yasser Jiménez Martínez'
          });

          users.defineMe('u1');

          const suggestions = this.editor.plugins.get('TrackChanges');

          const suggestionsLS = localStorage.getItem('suggestions');
          suggestionsLS = JSON.parse(suggestionsLS)
          console.log(suggestionsLS)
          suggestionsLS.map(suggestion => {
            suggestions.addSuggestion({
              id: suggestion.id,
              type: suggestion.type,
              authorId: suggestion.authorId,
              createdAt: suggestion.createdAt,
              data: suggestion.data,
              attributes: {}
            })
          });

          suggestions.addSuggestion(
            {
              id: 'ed9bf744997dda29ae611e720a5a5e068',
              type: 'deletion',
              authorId: 'u1',
              createdAt: new Date(2019, 1, 13, 11, 20, 48),
              data: null,
              attributes: {}
            }
          );
        }
      }
    ]
  }

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      Editor: require('../public/libraries/ckeditor/build/ckeditor'), //Added .CKEditor
    }
    setEditorLoaded(true)

  }, []);

  const [data, setData] = useState('');
  // const [content, setContent] = useState('<p>asds<suggestion-start name="deletion:ed9bf744997dda29ae611e720a5a5e068:u1"></suggestion-start>ad<suggestion-end name="deletion:ed9bf744997dda29ae611e720a5a5e068:u1"></suggestion-end></p>');
  const [content, setContent] = useState('');
  const [suggestionsC, setSuggestions] = useState([]);

  const handleData = (data) => {
    setData(data);
  }

  const handleSuggestions = (dataSuggestions) => {
    console.log(dataSuggestions)
    setSuggestions(dataSuggestions);
    console.log(suggestionsC);
  }

  const handleDocument = () => {

    localStorage.setItem('content', data);
    localStorage.setItem('suggestions', JSON.stringify(suggestionsC));
  }

  const test = () => {
    // console.log(Editor.editor.getData())
  }

  return (
    <>
      {editorLoaded ? <>

        <div className="m-10 bg-white rounded-lg border border-gray-200 shadow-md">
          <CKEditor
            name={"editor"}
            editor={Editor}
            data={data}
            config={config}
            onReady={editor => {
              const a = localStorage.getItem('content');
              localStorage.setItem('content', a);
              // You can store the "editor" and use when it is needed.
              console.log('Editor is ready to use!', editor);
              editor.ui.getEditableElement().parentElement.insertBefore(
                editor.ui.view.toolbar.element,
                editor.ui.getEditableElement()
              );
              editor.execute('trackChanges');
              console.log(content)
              editor.setData(localStorage.getItem('content'));
              // editor.data.set('asdsad');
              console.log(content)
            }}
            onChange={(event, editor) => {
              const contenido = editor.getData()
              handleData(contenido);

              const cambios = editor.plugins.get('TrackChanges');
              const dataSuggestions = cambios.getSuggestions({
                skipNotAttached: true,
                toJSON: true
              });

              handleSuggestions(dataSuggestions);

              const revisiones = editor.plugins.get('RevisionHistory');

              // console.log(revisiones)

              // const editorData = editor.data.get();
              // console.log(editorData);
            }}
          />
        </div>

        <div className='flex justify-center'>
          <button onClick={handleDocument} className="ml-10 bg-blue-500 hover:bg-blue-400 text-white font-bold py-2 px-4 border-b-4 border-blue-700 hover:border-blue-500 rounded">
            Guardar documento
          </button>
          <button onClick={test} className="ml-10 bg-red-500 hover:bg-red-400 text-white font-bold py-2 px-4 border-b-4 border-red-700 hover:border-red-500 rounded">
            TEST
          </button>
        </div>
      </> : <p>Cargando...</p>}
    </>
  )
}


export default Editor2;
