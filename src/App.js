import React, { useState } from 'react';
import Menu from './components/Menu';
import Tabla from './components/Tabla';
import Modal from './components/Modal';
import styled from 'styled-components';

const App = () => {
  const [tableSelected, setTableSelected] = useState('pokemon');
  const [lastID, setLastID] = useState(10);
  const [modalInformation, setModalInformation] = useState();

  return ( 
    <AppContainer>
      <Menu 
        tableSelected={tableSelected} 
        setTableSelected={setTableSelected}
        setLastID={setLastID}
      />
      <Tabla 
        tableSelected={tableSelected} 
        setModalInformation={setModalInformation} 
        lastID={lastID} 
        setLastID={setLastID}  
      />
      {modalInformation && <Modal modalInformation={modalInformation} setModalInformation={setModalInformation}/>}
    </AppContainer>
   );
}

const AppContainer = styled.div`
  display: flex;
  align-items: center;

  @media (max-width: 720px) {
    flex-direction: column;
  }
`;
 
export default App;