
// import { Editor2 } from '../components/Editor2'

import dynamic from 'next/dynamic'

const Editor2 = dynamic(
    () => import('../components/Editor2'),
    { ssr: false }
)

export default function CKEditorPage2() {

    return (

        <Editor2 />
    )
}
