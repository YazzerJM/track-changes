import { useEffect, useRef, useState } from 'react';

export default function Editor3(){

    const editorRef = useRef(null);
    const [editorLoaded, setEditorLoaded] = useState(false)
    const {
        DecoupledDocumentEditor,
    } = editorRef.current || {}

    useEffect(() => {
        editorRef.current = {
            DecoupledDocumentEditor: require('../public/libraries/ckeditor/build/ckeditor'), //Added .CKEditor
        }
        setEditorLoaded(true)
    }, []);


    return (
        <>
            {editorLoaded ? <div data-editor="DecoupledDocumentEditor" data-collaboration="false" data-revision-history="true">
                <main>
                    <div className="message">
                        <div className="centered">
                            <h2>CKEditor 5 online builder demo - DecoupledDocumentEditor build</h2>
                        </div>
                    </div>
                    <div className="centered">
                        <div className="row">
                            <div className="document-editor__toolbar"></div>
                        </div>
                        <div className="row row-editor">
                            <div className="editor-container">
                                <div className="editor">
                                    <h2>Bilingual Personality Disorder</h2>
                                    <p>
                                        This may be the first time you hear about this made-up disorder but
                                        it actually isn’t so far from the truth. Even the studies that were conducted almost half a
                                        century show that
                                        <strong>the language you speak has more effects on you than you realise</strong>.
                                    </p>
                                    <p>
                                        One of the very first experiments conducted on this topic dates back to 1964.
                                        In the experiment
                                        designed by linguist Ervin-Tripp who is an authority expert in psycholinguistic and
                                        sociolinguistic studies,
                                        adults who are bilingual in English in French were showed series of pictures and were asked
                                        to create 3-minute stories.
                                        In the end participants emphasized drastically different dynamics for stories in English and
                                        French.
                                    </p>
                                    <p>
                                        Another ground-breaking experiment which included bilingual Japanese women married to
                                        American men in San Francisco were
                                        asked to complete sentences. The goal of the experiment was to investigate whether or not
                                        human feelings and thoughts
                                        are expressed differently in <strong>different language mindsets</strong>.
                                        Here is a sample from the the experiment:
                                    </p>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>English</th>
                                                <th>Japanese</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Real friends should</td>
                                                <td>Be very frank</td>
                                                <td>Help each other</td>
                                            </tr>
                                            <tr>
                                                <td>I will probably become</td>
                                                <td>A teacher</td>
                                                <td>A housewife</td>
                                            </tr>
                                            <tr>
                                                <td>When there is a conflict with family</td>
                                                <td>I do what I want</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <p>
                                        More recent <a href="https://books.google.pl/books?id=1LMhWGHGkRUC">studies</a> show, the
                                        language a person speaks affects
                                        their cognition, behaviour, emotions and hence <strong>their personality</strong>.
                                        This shouldn’t come as a surprise
                                        <a href="https://en.wikipedia.org/wiki/Lateralization_of_brain_function">since we already
                                            know</a> that different regions
                                        of the brain become more active depending on the person’s activity at hand. Since structure,
                                        information and especially
                                        <strong>the culture</strong> of languages varies substantially and the language a person
                                        speaks is an essential element of daily life.
                                    </p>
                                </div>
                                <div className="sidebar"></div>
                            </div>
                            <div className="revision-viewer-container">
                                <div className="editor-container">
                                    <div className="revision-viewer-editor"></div>
                                    <div className="revision-viewer-sidebar"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
                {
                    DecoupledDocumentEditor
                        .create(document.querySelector('.editor'), {

                            extraPlugins: [
                                // Learn more about users at https://ckeditor.com/docs/ckeditor5/latest/features/collaboration/users.html.

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
                                            id: 'u1'
                                        });

                                        users.defineMe('u1');
                                    }
                                }

                            ],
                            licenseKey: '',
                            sidebar: {
                                container: document.querySelector('.sidebar')
                            },

                            revisionHistory: {
                                showRevisionViewerCallback: config => {
                                    const editorContainer = document.querySelector('.editor-container');
                                    const viewerContainer = document.querySelector('.revision-viewer-container');
                                    const viewerElement = document.querySelector('.revision-viewer-editor');

                                    config.revisionHistory.viewerSidebarContainer = document.querySelector('.revision-viewer-sidebar');

                                    return DecoupledDocumentEditor.create(viewerElement, config).then(viewerEditor => {
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
                                        toolbarContainer.appendChild(window.editor.ui.view.toolbar.element);
                                    });
                                }
                            }

                        })
                        }
            </div> : <h3> Cargando ... </h3>}
        </>
    )
}
