
// import { Editor2 } from '../components/Editor2'

import dynamic from 'next/dynamic'

const Editor2 = dynamic(
    () => import('../components/Editor2'),
    { ssr: false }
)

export default function CKEditorPage2() {

    return (

        <div className="p-6 m-10 bg-white rounded-lg border border-gray-200 shadow-md">
            <Editor2 />
        </div>
    )
}
