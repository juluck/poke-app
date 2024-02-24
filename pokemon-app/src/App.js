
import './App.css';
import { useEffect, useState } from 'react';
import { getAllPokemon, getPokemon } from './utils/pokemon';
import { Card } from './components/Card/Card'
import { Navbar } from './components/Navbar/Navbar'

function App() {
  // API エンドポイント
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';

  // APIロード中判定変数
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンデータを取得
      let res = await getAllPokemon(initialURL);

      // 各ポケモンの詳細データを取得
      loadPokemon(res.results);

      // 次へページのリンク
      setNextUrl(res.next);
      // console.log(res.results);
      // API取得完了でFalse
      setLoading(false);
    }
    fetchPokemonData();


  }, []);

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map((pokemon) => {
        // console.log(pokemon)
        let pokemonRecord = getPokemon(pokemon.url);

        return pokemonRecord;
      }));
    setPokemonData(_pokemonData);

  }
  const handlePrevPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    // console.log(data)
    setLoading(false);
    // let data = await getAllPokemon(nextUrl);
  };
  const handleNextPage = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    // console.log(data)
    setLoading(false);
  };


  return (
    <>
      <Navbar />
      <div className="App">
        {/* ロード中の表現は三項演算子でtrue false判定するといい */}
        {loading ? (
          <h1>ロード中...</h1>
        ) : (
          <>
            <div className='pokemonCaradContainer'>
              {/* {console.log(pokemonData)} */}
              {pokemonData.map((pokemon, index) => {
                // console.log(pokemon);
                return <Card key={index} pokemon={pokemon}></Card>
              })}
            </div>
            <div className="btn">
              {
                prevUrl ? <button onClick={handlePrevPage}>前へ</button> : ""

              }
              <button onClick={handleNextPage}>次へ</button>
            </div>
          </>
        )}
      </div >
    </>
  );
};
export default App;
