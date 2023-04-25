import React from 'react';
import styled from 'styled-components';
import Logo from '../assets/logo.png';

const Menu = ({tableSelected, setTableSelected, setLastID}) => {
    const menuElements = ['Pokemons', 'Items', 'Locations', 'Abilities', 'Berries'];
    const menuLinks= ['pokemon', 'item', 'location', 'ability', 'berry'];

    const handleClick = (index) => {
        menuLinks[index] !== tableSelected &&
            setTableSelected(menuLinks[index]); 
            setLastID(10);
    }

    return (
        <Nav>
            <div>
                <LogoContainer><img src={Logo} alt="Pokemon" /></LogoContainer>
                <MenuContainer>
                    {menuElements.map((element, index)=>{
                        return <MenuElement 
                        key={index} 
                        table={menuLinks[index]} 
                        tableSelected={tableSelected} 
                        onClick={()=> handleClick(index)}>{element}</MenuElement>
                    })}
                </MenuContainer>
            </div>
        </Nav>
    );
}
 
const Nav = styled.nav`
    flex-shrink: 0;
    height: 100vh;
    width: 275px;
    display: flex;
    align-items: center;

    @media (max-width: 720px) {
        height: 20vh;
        width: 100vw;
    }
`;
const LogoContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    margin-bottom: 50px;
    
    img{
        max-width: 90%;
        max-height: 100%;
    }

    @media (max-width: 720px) {
        height: 90%;
        width: 100vw;
        margin-bottom: 10px;
    }
`;

const MenuContainer = styled.ul`
    width: 100%;
    list-style: none;

    a{
        text-decoration: none;
    }

    @media (max-width: 720px) {
        display: flex;
        width: 100vw;
        justify-content: space-around;
    }
`;

const MenuElement = styled.li`
    padding: 16px;
    width: 100%;
    font-size: 2.5rem;
    font-weight: 500;
    text-decoration: none;   
    color: #fff;
    opacity: ${props => props.table === props.tableSelected ? 1 : 0.5} ;

    :hover{
        cursor: pointer;
        opacity: ${props => props.table === props.tableSelected ? 1 : 0.6};
    }

    @media (max-width: 720px) {
        font-size: 1rem;
        padding: 0;
        text-align: center;
    }
`;

export default Menu;