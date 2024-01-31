import "./App.css";
import PokedexImg from "./assets/pokedex.png";
import UseFetch from "./hooks/useFetch";
import { useState, useEffect } from "react";
import MyInput from "./components/my_input";
import MyButton from "./components/my_button";
import { RiseLoader } from 'react-spinners';
import { CSSProperties } from "react";

type pokemonTypes = {
  name: string,
  id: string,
  sprites: {
    versions: {
      ["generation-v"]: {
        ["black-white"]: {
          animated: {
            front_default: string
          }
        }
      }
    }
  }
};

interface pokemon {
  name: string;
  id: string;
  img: string;
}

export default function App() {
  const limitToken: number = 649;
  const [pokemonToken, setPokemonToken] = useState<string>("1");
  const [pokemonObj, setPokemonObj] = useState<pokemon | null>(null);
  const [errorSearch, setErrorSearch] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    UseFetch({ url: `https://pokeapi.co/api/v2/pokemon/${pokemonToken.toLowerCase()}` })
      .then((data) => {
        if (data) {
          const currentData = data as pokemonTypes;
          setPokemonObj({
            name: currentData.name,
            id: currentData.id,
            img: currentData.sprites.versions["generation-v"]["black-white"].animated.front_default
          });
          setErrorSearch("");
          setIsLoading(false);
        }
      })
      .catch((error) => {
        if (error == "Request failed with status 404") {
          setErrorSearch("Não encontrado");
        }

        setIsLoading(false);
      });
  }, [pokemonToken]);

  useEffect(() => {
    if (pokemonObj) {
      const convertID: number = parseInt(pokemonObj.id);
      if (convertID > limitToken) {
        setErrorSearch("Não encontrado");
        setPokemonObj(null);
      }
    }
  }, [pokemonObj])

  type changTokenTypes = {
    action: "increase" | "decrease";
  }

  const changToken = ({ action }: changTokenTypes) => {
    if (pokemonObj && action) {
      if (action == "increase") {
        const currentID = parseInt(pokemonObj.id);
        if (currentID < limitToken) {
          const newId = currentID + 1;
          setPokemonToken(newId.toString());
        }
      } else if (action == "decrease") {
        const currentID = parseInt(pokemonObj.id);
        if (currentID > 1) {
          const newId = currentID - 1;
          setPokemonToken(newId.toString());
        }
      }
    }
  }

  const overrideSpinners: CSSProperties = {
    top: "38%",
    position: "absolute",
    zIndex: "10"
  };

  return (
    <div id="app_body">
      <main>
        <div id="pokedex">
          <img id="pokedex_img" src={PokedexImg} alt="Pokedex" />
          {!isLoading && (
            <div id="pokedex_box">
              {!errorSearch && <img id="pokemon_img" src={pokemonObj?.img} alt={pokemonObj?.name} />}
              {!errorSearch && <h1 id="pokemon_info">{`${pokemonObj?.id} - ${pokemonObj?.name}`}</h1>}
              {errorSearch && <h1 id="pokemon_info">{`${errorSearch}`}</h1>}
            </div>
          )}
          <RiseLoader color="#d30a40" loading={isLoading} size={10} cssOverride={overrideSpinners} />
          <div id="pokedex_bottom">
            <MyInput
              type="search"
              placeholder="Insira o token"
              hide={isLoading}
              onReset={() => {
                setPokemonToken("1");
              }}
              onKeyDown={(value, event) => {
                if (event.key === "Enter" && value) {
                  const currentValue: string = value;
                  setPokemonToken(currentValue);
                }
              }}
            />
            {!isLoading && (
              <>
                <div id="line_button">
                  <MyButton text="<" onClick={() => changToken({ action: "decrease" })} />
                  <MyButton text=">" onClick={() => changToken({ action: "increase" })} />
                </div>
              </>
            )
            }
          </div>
        </div>
      </main>
    </div>
  )
}