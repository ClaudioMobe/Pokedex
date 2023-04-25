import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTable } from 'react-table';
import usePokemonData from '../hooks/usePokemonData';

const Tabla = ({tableSelected, setModalInformation, lastID, setLastID}) => {

  const [limitID, setLimitID] = useState();

  useEffect(()=>{
    fetch(`https://pokeapi.co/api/v2/${tableSelected}`).then(res => res.json()).then(value => setLimitID(value.count));
  }, [tableSelected]);

  const { columns, data } = usePokemonData({lastID, tableSelected});
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({ columns, data });
  
  const handleButtonClick = (e) => {
    //Hay saltos en los ID's en la base de datos. Por ejemplo: un objeto tiene el ID 1000 y el siguiente tiene el ID 5002, por lo que es necesario manejar esta situación
    switch(tableSelected) {
      case 'pokemon':
        if (e.target.name === 'anterior'){
          if (lastID === 10020){
            setLastID(1000)
          } else{
            setLastID(lastID-10)
          }
        } else {  //Si es botón posterior
            if (lastID === 1000){
              setLastID(10020)
            } else{
              setLastID(lastID+10)
            }
        }
        break;
        
      case 'item':
        if (e.target.name === 'anterior'){
          setLastID(lastID-10)
        } else {  //Si es botón posterior
          setLastID(lastID+10)
        }
          
        break;
      case 'location':
        if (e.target.name === 'anterior'){
          setLastID(lastID-10)
        } else {  //Si es botón posterior
          setLastID(lastID+10)
        }
        break;
      case 'ability':
        setLimitID(10060);
        if (e.target.name === 'anterior'){
          if (lastID === 10010){
            setLastID(300)
          } else{
            setLastID(lastID-10)
          }
        } else {  //Si es botón posterior
            if (lastID === 300){
              setLastID(10010)
            } else{
              setLastID(lastID+10)
            }
        }
        break;
      case 'berry':
        if (e.target.name === 'anterior'){
          setLastID(lastID-10)
        } else {  //Si es botón posterior
          setLastID(lastID+10)
        }
        break;

      default:
        break;
    }
  };

  const handleRowClick = (e, columnsData) => {
    const childrenOfSelectedRow = e.currentTarget.children;
    const imgSrc = e.currentTarget.firstChild.firstChild.firstChild.src;
    
    const columnsTitles = columnsData.map((ele)=>ele.Header);
    const content = imgSrc ? {
      src: imgSrc
    } : {};

    Object.keys(childrenOfSelectedRow).forEach((key, index) => {
      content[columnsTitles[index]]= childrenOfSelectedRow[key].innerText;
    });

    setModalInformation(content)
  }

  return (
    <TableContainer>
      <Table {...getTableProps()}>
        <THead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TH {...column.getHeaderProps()}>
                  {column.render('Header')}
                </TH>
              ))}
            </tr>
          ))}
        </THead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row)
            return (
              <TR index={index} onClick={(e)=>handleRowClick(e, columns)}{...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TD {...cell.getCellProps()}>
                      <div>
                        {cell.render('Cell')}
                      </div>
                    </TD>
                  )
                })}
              </TR>
            )
          })}
        </tbody>
      </Table>
      <ButtonContainer>
        <Button lastID={lastID} limitID={limitID} name='anterior' onClick={(e) => handleButtonClick(e)}>Anterior</Button>
        <Button lastID={lastID} limitID={limitID} name='siguiente' onClick={(e) => handleButtonClick(e)}>Siguiente</Button>
      </ButtonContainer>
    </TableContainer>
  )
}

const TableContainer = styled.div`
  flex-basis:100%;
  padding: 10px;

  @media (max-width: 720px) {
    padding:0;
    margin-top: 20px;
  }
`;

const Table = styled.table`
  border-radius: 15px;
  width: 100%;
  color: #fff;
  background: rgba(200,200,200,0.2);
`;

const THead = styled.thead`
  height: 30px;
`;

const TH = styled.th`
  width: min-content;
  background: #013558;
  color: white;
  font-weight: bold;
  
  :first-child{
    border-top-left-radius: 15px;
  }

  :last-child{
    border-top-right-radius: 15px;
  }

  @media (max-width: 720px) {
    font-size: 0.7rem;
    min-width: 50px;
  }
`;

const TR = styled.tr`  //Filas de la tabla
  background: ${props=> props.index % 2 === 0 ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.25)'};
  :hover{
    cursor: pointer;
  }  
`;

const TD = styled.td` //Celdas de la tabla
  border: solid 1px #ccc;
  
  :nth-child(1)> :nth-child(1){  //Celda con imagen, nombre y ID del objeto
    display: flex;
    min-width: 110px;
    max-width: 500px;
    align-items: center;
    justify-content: center;
    text-align: left;
    
    >div{
      width: 100%;
      padding: 0 5px;
    }

    @media (max-width: 720px) {
      height: 25px;
      min-width: 50px;
      max-width: max-content;
      
      img {
        max-height: 100%;
      }
      
      >div{
        width: max-content;
        padding: 0 2px;
      }
    }
  }

  >div {
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    padding: 10px;
    height: 50px;
    min-width: 70px;
    max-width: 400px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
        
    @media (max-width: 720px) {
      font-size: 0.7rem;
      height: 25px;
      min-width: 30px;
      max-width: 35px;
      padding: 5px;
    }
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  display: ${props => (props.lastID === 10 && props.name === 'anterior') || (props.lastID >= props.limitID && props.name === 'siguiente') ? 'none': 'block' };
  font-size: 0.9rem;
  margin: 5px;
  width: 100px;
  height: 30px;
  background: #003e67;
  border: none;
  color: #ddd;
  border-radius: 10px;
  border: solid 2px rgba(200,200,200,0.2);

  :hover{
    background: #013558;
  }

  :active{
  background: #004471;
  }

  @media (max-width: 720px) {
    font-size: 0.7rem;
    width: 60px;
    height: 20px;
  }
`;
 
export default Tabla;