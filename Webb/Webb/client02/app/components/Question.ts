// Question.ts
class Question {
    id: number;
    questionText: string;
    options: string[];
    correctAnswer: string;
  
    constructor(id: number, questionText: string, options: string[], correctAnswer: string) {
      this.id = id;
      this.questionText = questionText;
      this.options = options;
      this.correctAnswer = correctAnswer;
    }
  
    // Phương thức kiểm tra câu trả lời của người dùng
    checkAnswer(answer: string): boolean {
      return answer === this.correctAnswer;
    }
  
    // Phương thức để lấy thông tin câu hỏi
    getQuestionInfo(): string {
      return `${this.questionText}\nOptions: ${this.options.join(", ")}\nCorrect Answer: ${this.correctAnswer}`;
    }
  }
  
  export default Question;
  