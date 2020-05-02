import Head from 'next/head'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faMinus, faPlus, faArrowLeft, faSyncAlt } from '@fortawesome/free-solid-svg-icons'

library.add(faMinus, faPlus, faArrowLeft, faSyncAlt)

const Layout = (props) => (
    <div>
        <Head>
        <title>Fore-Score</title>
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://bootswatch.com/4/sandstone/bootstrap.min.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/js/fontawesome.min.js" />
        <meta charSet="utf-8" />  
        </Head>
        <div style={{margin: "1rem"}}>
            {props.children}
        </div>
    </div>
)

export default Layout;