import '@styles/globals.css'

import Nav from '@components/Nav';
import Boards from '@components/Boards';
import Columns from '@components/Columns';
import Provider from '@components/Provider';
import '@styles/index.css';
import '@styles/Typography.css';


export const metadata = {
  title: 'Kanban Desk',
  description: 'Agile Task Management App'
}

const RootLayout = ({children}) => {
  return (
    <html lang='en'>
      <body>
        <Provider>
          <main>
            <Nav />
            <Boards />
            <Columns />
            {children}
            </main>
          </Provider>
      </body>
    </html>
  )
}

export default RootLayout;
