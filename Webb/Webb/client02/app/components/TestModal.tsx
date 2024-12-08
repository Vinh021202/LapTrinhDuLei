import React, { useState } from "react";
import { useGetAllQuestionsQuery, useSubmitTestMutation } from "../../redux/features/question/questionApi";

interface TestModalProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  onTestCompleted: () => void;
}

const TestModal: React.FC<TestModalProps> = ({ open, setOpen, onTestCompleted }) => {
  const { data : questions, isLoading } = useGetAllQuestionsQuery(undefined, {
    skip: !open, // Only fetch if modal is open
  });
  console.log("questions: " , data);
  

  const [submitTest, { isLoading: isSubmitting }] = useSubmitTestMutation();
  const [answers, setAnswers] = useState<any[]>([]);

  const handleSubmit = async () => {
    try {
      const result = await submitTest({ answers }).unwrap();
      onTestCompleted(); // Update user state after successful submission
      setOpen(false); // Close modal
      alert("Test submitted successfully!");
    } catch (error) {
      console.error("Failed to submit test:", error);
    }
  };

  if (!open) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Complete the Test</h2>
        {isLoading ? (
          <p>Loading questions...</p>
        ) : (
          questions?.map((question: any, index: number) => (
            <div key={index}>
              <p>{question.questionText}</p>
              <input
                type="text"
                placeholder="Your answer"
                onChange={(e) => {
                  const newAnswers = [...answers];
                  newAnswers[index] = { questionId: question.id, answer: e.target.value };
                  setAnswers(newAnswers);
                }}
              />
            </div>
          ))
        )}
        <button onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
        <button onClick={() => setOpen(false)}>Cancel</button>
      </div>
    </div>
  );
};

export default TestModal;