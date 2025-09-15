export function TokenLaunchpad() {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: "12px", // adds spacing instead of <br />
      }}
    >
      <h1>Solana Token Launchpad</h1>
      <input className="inputText" type="text" placeholder="Name" />
      <input className="inputText" type="text" placeholder="Symbol" />
      <input className="inputText" type="text" placeholder="Image URL" />
      <input className="inputText" type="text" placeholder="Initial Supply" />
      <button className="btn">Create a token</button>
    </div>
  );
}
