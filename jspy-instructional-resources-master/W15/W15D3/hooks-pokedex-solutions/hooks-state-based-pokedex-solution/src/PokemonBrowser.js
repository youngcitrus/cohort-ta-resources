import React from "react";
import { NavLink, Route } from "react-router-dom";
import { imageUrl } from "./config";
import PokemonDetail from "./PokemonDetail";

const PokemonBrowser = ({ pokemon, token }) => {
  if (!pokemon) return null;

  return (
    <main>
      <nav>
        {pokemon.map((poke) => {
          return (
            <NavLink key={poke.name} to={`/pokemon/${poke.id}`}>
              <div className="nav-entry">
                <div className="nav-entry-image"
                  style={{
                    backgroundImage: `url('${imageUrl}${poke.imageUrl}')`
                  }} />
                <h1>{poke.name}</h1>
              </div>
            </NavLink>
          );
        })}
      </nav>
      <Route
        path="/pokemon/:id"
        render={(props) => <PokemonDetail {...props} token={token} />}
      />
    </main>
  );
};

export default PokemonBrowser;
