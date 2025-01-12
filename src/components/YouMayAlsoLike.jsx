const YouMayAlsoLike = ({ suggestions }) => (
    <div>
      <h2>You May Also Like</h2>
      <ul>
        {suggestions.map((coin) => (
          <li key={coin.id}>
            <p>{coin.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
  
  export default YouMayAlsoLike;
  