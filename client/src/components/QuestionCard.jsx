import OptionButton from "./OptionButton";

export default function QuestionCard({ question, selectAnswer, selected }) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 20, borderRadius: 8, marginTop: 20 }}>
      <h3>{question.question}</h3>

      {question.options.map((option, idx) => (
        <OptionButton
          key={idx}
          option={option}
          onClick={() => selectAnswer(option)}
          isSelected={selected === option}
        />
      ))}
    </div>
  );
}