import '@styles/globals.css'

import Boards from '@components/boards';
import Columns from '@components/columns';

export const metadata = {
  title: 'Kanban Desk',
  description: 'Agile Task Management App'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <div className="main">
          <div className='gradient'/>
        </div>
        <main className="">
          <Boards />
          <Columns />
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;