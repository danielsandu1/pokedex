"use client";

import React, { useEffect, useState } from "react";
import { Pokemon } from "pokenode-ts";

import usePokemonApi from "@/hooks/usePokemonApi";
import usePokemonFilter from "@/hooks/usePokemonFilter";
import SearchBar from "@/components/SearchBar";
import PokemonCard from "@/components/PokemonCard";
import { Separator } from "@/components/ui/";
import { Header, SkeletonCard } from "@/components/shared/";

const Home: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Pokemon[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { pokemons, pokemonTypes, error: errorPokemon } = usePokemonApi();

  const {
    filteredResults,
    loading,
    error: errorFilter,
  } = usePokemonFilter(pokemons, searchInput, selectedType);

  useEffect(() => {
    setSearchResults(filteredResults);
  }, [filteredResults]);

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleTypeSelectChange = (type: string | null) => {
    setSelectedType(type);
  };

  const errorMsg = errorPokemon || errorFilter;

  return (
    <div className="max-w-lg mx-auto p-4 md:pt-7">
      <Header />

      <SearchBar
        onSearchInputChange={handleSearchInputChange}
        onTypeSelectChange={handleTypeSelectChange}
        options={pokemonTypes}
      />
      <Separator className="mb-4" />

      {loading ? (
        [...Array(3)].map((_, i) => <SkeletonCard key={i} />)
      ) : errorMsg ? (
        <p className="text-red-500">{errorMsg}</p>
      ) : (
        <div>
          {searchResults.map((result) => (
            <PokemonCard key={result.id} pokemon={result} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
