import React, { useMemo, useEffect, useState } from 'react';

const usePokemonData = ({lastID, tableSelected}) => {
    //Información de las columnas
    const getHeaders = (array) => {
        const headers = array.map((element, index)=>{
            return {
                Header: element,
                accessor: `col${index+1}`
            }
        })
        return headers;
    };
    
    const columns = useMemo(() => {
        let array = [];
        switch (tableSelected) {
            case 'pokemon':
                array = ['Pokemon', 'Height', 'Weight', 'Abilities', 'Base Experience', 'Moves']
                break;   
            case 'item':
                array = ['Item', 'Category', 'Effect', 'Attributes', 'Cost', 'Held By']
                break;
            case 'location':
                array = ['Location', 'Region', 'Areas', 'Generation', 'Game Indices']
                break;
            case 'ability':
                array = ['Ability', 'Generation', 'Flavor Text', 'Effect', 'Pokemon With It', 'Is Main Series?']
                break;
            case 'berry':
                array = ['Berry', 'Size', 'Firmness', 'Flavors', 'Natural Gift Power', 'Natural Gift Type']
                break;
            default:
                break;
        }
        return getHeaders(array);
    },[tableSelected]);

    //Datos de la tabla
    const [data, setData] = useState([]);
    useEffect(() => {

        const firstCapitalLetter = (str) => {
            const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
            return capitalizedStr;
        }

        const getRowsData = (value) => {
            let obj = {};
            switch (tableSelected) {
                case 'pokemon':
                    obj = {
                        col1: [ <img key={0} src={value.sprites.front_default} alt='Pokemon'></img> , <div key={1}><p>{value.name.toUpperCase()}</p><p>{`ID#${value.id}`}</p></div> ],
                        col2: `${value.height*10} cm`,
                        col3: `${value.weight/10} kg`,
                        col4: value.abilities.map(element => firstCapitalLetter(element.ability.name.replace(/-/g," "))).join(', '),
                        col5: value.base_experience,
                        col6: value.moves.map(element => element.move).map(element => firstCapitalLetter(element.name.replace(/-/g," "))).join(', ')
                    }
                    break;   
                case 'item':
                    obj = {
                        col1: [ <img key={0} src={value.sprites.default} alt='Item'></img> , <div key={1}><p>{value.name.replace(/-/g," ").toUpperCase()}</p><p>{`ID#${value.id}`}</p></div> ],
                        col2: value.category ? firstCapitalLetter(value.category.name.replace(/-/g," "))  : 'Unknown',
                        col3: value.effect_entries ? value.effect_entries[0].effect : 'Unknown',
                        col4: value.attributes && value.attributes.length>0 ? value.attributes.map(element => firstCapitalLetter(element.name.replace(/-/g," ")) ).join(', ') : 'Unknown',
                        col5: `$${value.cost}`,
                        col6: value.held_by_pokemon && value.held_by_pokemon.length>0 ? value.held_by_pokemon.map(element => element.pokemon.name).join(', '): 'Unknown',
                    }
                    break;
                case 'location':
                    obj = {
                        col1: <div key={1}><p>{value.name.replace(/-/g," ").toUpperCase()}</p><p>{`ID#${value.id}`}</p></div>,
                        col2: value.region ? firstCapitalLetter(value.region.name)  : 'Unknown',
                        col3: value.areas.length>0 ? value.areas.map(element => firstCapitalLetter(element.name.replace(/-/g," "))).join(', ') : 'Unknown',
                        col4: value.game_indices.length>0 ? value.game_indices.map(element => element.generation.name.split('-')[1]).join(', ').toUpperCase() : 'Unknown',
                        col5: value.game_indices.length>0 ? value.game_indices.map(element => element.game_index).join(', ') : 'Unknown'
                    }
                    break;
                case 'ability':
                    obj = {
                        col1: <div key={1}><p>{value.name.replace(/-/g," ").toUpperCase()}</p><p>{`ID#${value.id}`}</p></div>,
                        col2: value.generation ? value.generation.name.split('-')[1].toUpperCase() : 'Unknown',
                        col3: value.flavor_text_entries.find(ele => ele.language.name === 'en')?.flavor_text ? value.flavor_text_entries.find(ele => ele.language.name === 'en')?.flavor_text : 'Unknown',
                        col4: value.effect_entries.find(ele => ele.language.name === 'en')?.effect ? value.effect_entries.find(ele => ele.language.name === 'en')?.effect : 'Unknown',
                        col5: value.pokemon.length>0 ? value.pokemon.map(element => firstCapitalLetter(element.pokemon.name.replace(/-/g," "))).join(', ') : 'Unknown',
                        col6: value.is_main_series ? 'Yes' : 'No'
                    }
                    break;
                case 'berry':
                    obj = {
                        col1: <div key={1}><p>{value.name.replace(/-/g," ").toUpperCase()}</p><p>{`ID#${value.id}`}</p></div>,
                        col2: `${value.size} mm`,
                        col3: value.firmness ? firstCapitalLetter(value.firmness.name.replace(/-/g," "))  : 'Unknown',
                        col4: value.flavors.length>0 ? value.flavors.map(element => firstCapitalLetter(element.flavor.name.replace(/-/g," "))).join(', ') : 'Unknown',
                        col5: value.natural_gift_power,
                        col6: value.natural_gift_type ? firstCapitalLetter(value.natural_gift_type.name)  : 'Unknown',
                    }
                    break;
                default:
                    break;
            }
            return obj;
        }

        const fetchData = async () => {
            try {
                const promises = [];
                for (let i = lastID-10; i < lastID; i++) {
                    const promise = fetch(`https://pokeapi.co/api/v2/${tableSelected}/${i+1}`).then(res => res.json());
                    promises.push(promise);
                }
                const results = [];
                for (const promise of promises) {
                    try {
                        const result = await promise;
                        results.push(result);
                    } catch (error) {
                        console.error(`Error fetching data: ${error}`);
                    }
                }
                const newData = results.map(value => getRowsData(value));
                setData(newData);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, [lastID, tableSelected]);

    return {columns, data}
}

export default usePokemonData;