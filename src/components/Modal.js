import React from 'react';
import {ReactComponent as IconClose} from '../assets/icon-close.svg';
import styled from 'styled-components';

const Modal = ({modalInformation, setModalInformation}) => {
    const imgSrc= modalInformation.src;
    const modalContent = imgSrc ? Object.entries(modalInformation).splice(1) : Object.entries(modalInformation);

    return (
        <ModalContainer>
            <TableContainer>
                <IconClose onClick={()=>setModalInformation(null)}/>
                {imgSrc && <ImgContainer><img src={imgSrc} alt='Objeto seleccionado'></img></ImgContainer>}
                <GridTable>
                    {modalContent.map((content, index)=>{
                        return  <GridItem key={index}>
                                    <h2>{content[0]}</h2>
                                    <p>{content[1]}</p>
                                </GridItem>
                    })}
                </GridTable>
            </TableContainer>
        </ModalContainer>
    );
}

const ModalContainer = styled.div`
    position: absolute;
    height: 100vh;
    width: 100vw;
    display: flex;
    background: rgba(0,0,0,0.8);

    svg {
        position: relative;
        z-index: 100;
        margin: 20px;
        :hover{
            cursor: pointer;
        }
        path{
            fill: #000;
        }
    }
`;

const TableContainer = styled.div`
    width: 50%;
    border-radius: 15px;
    max-height: 90vh;
    overflow: scroll;
    background: white;
    margin: auto;

    @media (max-width: 720px) {
        width: 90%;
    }
`;

const ImgContainer = styled.div`
    display: flex;
    justify-content: center;
    img{
        transform: scale(2);
    }
`;

const GridTable = styled.div`
    margin: 15px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: minmax(100px, auto);
    row-gap: 10px;

    @media (max-width: 720px) {
        grid-template-columns: 1fr;
        grid-auto-rows: minmax(60px, auto);
        row-gap: 5px;
    }
`;

const GridItem = styled.div`
    text-align: center;
    p{
        overflow: scroll;
        font-size: 1.1rem;
        padding: 10px;
    }

    @media (max-width: 720px) {
        p{
        padding: 5px;
    }
    }
`;

 
export default Modal;