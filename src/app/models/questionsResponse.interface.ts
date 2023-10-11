export interface QuestionsResponse {
    category:         string;
    correctAnswer:    string;
    difficulty:       Difficulty;
    id:               string;
    incorrectAnswers: string[];
    isNiche:          boolean;
    question:         Question;
    regions:          any[];
    tags:             string[];
    type:             Type;
   }
   
   export enum Difficulty {
    Easy = "easy",
    Hard = "hard",
    Medium = "medium",
   }
   
   export interface Question {
    text: string;
   }
   
   export enum Type {
    TextChoice = "text_choice",
   }
   