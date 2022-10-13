import { useEffect, useRef, useState } from 'react';

// import TrackChanges from '@ckeditor/ckeditor5-track-changes/src/trackchanges';
// import '@ckeditor/ckeditor5-collaboration-core/theme/integrations/codeblock.css';


export const Editor = () => {
    const editorRef = useRef()
    const [editorLoaded, setEditorLoaded] = useState(false)
    const {
        CKEditor,
        ClassicEditor,
        LITE,
        // TrackChanges,
    } = editorRef.current || {}

    const config = {
        licenseKey: 'heaPPwoEPI7CuyZ5ZmcQwO5yKmPuqxLELh26WBJdF8yt4YyOpMQkFd48Xg==',
        // plugins: [TrackChanges],
        plugins: [{
            LITE:
                {
                    path: '../public/libraries/lite/',
                    filename: 'lite-interface.js'
                }
        }],
        extraPlugins: [LITE],
        language: 'es'
    }

    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
            LITE: require('../public/libraries/lite/lite-interface'),
            // TrackChanges: require('@ckeditor/ckeditor5-track-changes/src/trackchanges')
        }
        setEditorLoaded(true)
    }, []);

    const [data, setData] = useState('');

    return (
        <>
            {editorLoaded ? <CKEditor
                editor={ClassicEditor}
                data={data}
                config={config}
                onReady={editor => {
                    // You can store the "editor" and use when it is needed.
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData()
                    setData(data);
                    console.log(data);
                }}
            /> : <p>Cargando...</p>}
        </>
    )
}

