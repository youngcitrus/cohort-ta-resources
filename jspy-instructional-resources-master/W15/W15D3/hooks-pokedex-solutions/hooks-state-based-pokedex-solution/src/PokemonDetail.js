import React, { useState, useEffect } from "react";
import { imageUrl, baseUrl } from "./config";

const PokemonDetail = ({ match: { params: { id }}, token }) => {
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const loadPokemon = async () => {
      const response = await fetch(`${baseUrl}/pokemon/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        const pokemonResponse = await response.json();
        setPokemon(pokemonResponse);
      }
    };

    loadPokemon();
  }, [id, token]);

  if (!pokemon) {
    return null;
  }

  return (
    <div className="pokemon-detail">
      <h1 className="bigger">{pokemon.name}</h1>
      <div className="pokemon-detail-image-background">
        <div
          className="pokemon-detail-image"
          style={{ backgroundImage: `url('${imageUrl}${pokemon.imageUrl}')` }}
        ></div>
      </div>
      <div className="pokemon-detail-lists">
        <h2>Information</h2>
        <ul>
          <li>
            <b>Type</b> {pokemon.type}
          </li>
          <li>
            <b>Attack</b> {pokemon.attack}
          </li>
          <li>
            <b>Defense</b> {pokemon.defense}
          </li>
          <li>
            <b>Moves</b>
            <ul>
              {pokemon.moves.map((move) => (
                <li key={move}>{move}</li>
              ))}
            </ul>
          </li>
        </ul>
        <h2>Items</h2>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>Name</th>
              <th>Happiness</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {pokemon.items.map((item) => (
              <tr key={item.name}>
                <td>
                  <img
                    className="item-image"
                    alt={item.imageUrl}
                    src={`${imageUrl}${item.imageUrl}`}
                  />
                </td>
                <td>{item.name}</td>
                <td className="centered">{item.happiness}</td>
                <td className="centered">${item.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PokemonDetail;
