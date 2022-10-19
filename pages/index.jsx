import { useRef, useState } from 'react';
import tinymce from 'tinymce/tinymce';
if (typeof window !== 'undefined'){
  // require ('tinymce/tinymce');
  // require ('tinymce/themes/silver');
  // require ('tinymce/plugins/advlist');
  // require ('tinymce/plugins/autolink');
  // etc.
}

import { Editor } from '@tinymce/tinymce-react';
// dynamic(() => import('tinymce/tinymce'), {
//   ssr: false,
// });

// import 'tinymce/plugins/insertdatetime';

// import '../public/plugin/trackchanges';

// import '../public/plugin/trackchanges'

// dynamic(() => import('../public/plugin/trackchanges'), {
//   ssr: false,
// });


export default function Home() {

  // return (
  //   <>
  //     <CEditor />
  //   </>
  // )






  const [caretPos, setCaretPos] = useState(0);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      // console.log(editorRef.current.getContent());
      // console.log(editorRef.selectionStart);
    }
  };

  const handleCursor = (tiny) => {

    const contenido = tiny.getContent();

    console.log(tiny.selection.getNode())

    // console.log(contenido)
    // const selection = tiny.selection.getRng();

    // console.log(selection)
    // console.log(selection.startOffset)
    // console.log(selection.endOffset)
    // console.log(tiny.execCommand('mceEndTyping'));
  }

  return (
    <div className="m-4">

      <div className="grid grid-cols-3 gap-4">

        <div className="col-span-2">
          {/* <form>
            <div className="mb-4 w-full bg-gray-50 rounded-lg border border-gray-200 dark:bg-gray-700 dark:border-gray-600">
              <div className="py-2 px-4 bg-white rounded-t-lg dark:bg-gray-800">
                <label for="contenido" className="sr-only">Contenido</label>
                <textarea id="contenido" rows="10" className="px-0 w-full text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400" placeholder="Escribe algo..." required=""></textarea>
              </div>
              <div className="flex justify-between items-center py-2 px-3 border-t dark:border-gray-600">

                <div className="flex pl-0 space-x-1 sm:pl-2">
                  <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a3 3 0 00-3 3v4a5 5 0 0010 0V7a1 1 0 112 0v4a7 7 0 11-14 0V7a5 5 0 0110 0v4a3 3 0 11-6 0V7a1 1 0 012 0v4a1 1 0 102 0V7a3 3 0 00-3-3z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Attach file</span>
                  </button>
                  <button type="button" className="inline-flex justify-center p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600">
                    <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clip-rule="evenodd"></path></svg>
                    <span className="sr-only">Upload image</span>
                  </button>
                </div>
                <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                  Guardar documento
                </button>
              </div>
            </div>
          </form> */}
          <Editor
            apiKey='1b94w1a74r62ozu9d2zskma8519yo0pkb1x8g4zbzonzdlpl'
            onMouseUp={(evt, editor) => handleCursor(editorRef.current)}
            onInit={(evt, editor) => editorRef.current = editor}
            id='asd'
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
              remove_linebreaks: false,
              selector: 'textarea',
              height: 500,
              menubar: true,
              skin: "oxide-dark",
              // content_css: "dark",
              menu: {
                advanced: { title: "Advanced", items: "trackchanges" },
                view: { title: "View", items: "code" }, // I add this to show the codes.
              },
              plugins: [
                'advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table paste code help wordcount',
                // 'code trackchanges'
              ],
              toolbar: 'undo redo | formatselect | ' +
                'bold italic backcolor | alignleft aligncenter ' +
                'alignright alignjustify | bullist numlist outdent indent | ' +
                'removeformat | help' +
                'table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol' +
                'inserttext deletetext showchanges hidechanges',
              content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
          />
          <button onClick={log} className="mt-3 inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 ml-2">Log editor content</button>
        </div>

        <div>

          <div className="p-6 mb-2 w-full h-fit rounded-lg bordershadow-md bg-gray-800 border-gray-700">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-white">Yasser Jiménez Martínez</h5>
            <p className="mb-3 text-xs text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus non voluptas vel minima vero illo quisquam. Ea magni qui voluptates minima laboriosam inventore, eligendi laudantium at aperiam rem optio dolorum magnam reprehenderit officiis aliquam sunt explicabo perspiciatis consectetur, natus provident atque? Quibusdam illum unde aut similique voluptates earum, eius possimus?</p>
            <hr />
            <div className="flex justify-center mt-2">
              <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                Aceptar
              </a>
              <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ml-2">
                Rechazar
              </a>
            </div>

          </div>
          <div className="p-6 mb-2 w-full h-fit rounded-lg bordershadow-md bg-gray-800 border-gray-700">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-white">Yasser Jiménez Martínez</h5>
            <p className="mb-3 text-xs text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus non voluptas vel minima vero illo quisquam. Ea magni qui voluptates minima laboriosam inventore, eligendi laudantium at aperiam rem optio dolorum magnam reprehenderit officiis aliquam sunt explicabo perspiciatis consectetur, natus provident atque? Quibusdam illum unde aut similique voluptates earum, eius possimus?</p>
            <hr />
            <div className="flex justify-center mt-2">
              <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                Aceptar
              </a>
              <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ml-2">
                Rechazar
              </a>
            </div>
          </div>

          <div className="p-6 mb-2 w-full h-fit rounded-lg bordershadow-md bg-gray-800 border-gray-700">
            <h5 className="mb-2 text-lg font-bold tracking-tight text-white">Yasser Jiménez Martínez</h5>
            <p className="mb-3 text-xs text-gray-400">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Temporibus non voluptas vel minima vero illo quisquam. Ea magni qui voluptates minima laboriosam inventore, eligendi laudantium at aperiam rem optio dolorum magnam reprehenderit officiis aliquam sunt explicabo perspiciatis consectetur, natus provident atque? Quibusdam illum unde aut similique voluptates earum, eius possimus?</p>
            <hr />
            <div className="flex justify-center mt-2">
              <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300">
                Aceptar
              </a>
              <a href="#" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 ml-2">
                Rechazar
              </a>
            </div>
          </div>
        </div>


      </div>
    </div>
  )
}
