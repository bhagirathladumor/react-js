const Card = ({ data, onClick }: any) => {
  return (
    <div className="card" onClick={onClick}>
      {data.revealed ? data.value : "❓"}
    </div>
  );
};

export default Card;