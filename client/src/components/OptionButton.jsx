export default function OptionButton({ option, onClick, isSelected }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "block",
        width: "100%",
        padding: "10px 15px",
        margin: "8px 0",
        backgroundColor: isSelected ? "#4caf50" : "#f0f0f0",
        color: isSelected ? "#fff" : "#000",
        border: "1px solid #ccc",
        borderRadius: 5,
        cursor: "pointer",
      }}
    >
      {option}
    </button>
  );
}
