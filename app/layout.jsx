import '@styles/globals.css'

import Boards from '@components/boards';

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
          {children}
        </main>
      </body>
    </html>
  )
}

export default RootLayout;