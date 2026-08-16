export type UserRole = 'student' | 'teacher' | 'parent' | 'admin';

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  role: UserRole;
  avatar_url?: string;
  student_code?: string;
  dob?: string;
  xp: number;
  level: number;
  streak_days: number;
}

export interface Classroom {
  id: string;
  name: string;
  grade_level: string;
  join_code: string;
  teacher_id?: string;
  teacher_name: string;
  students_count: number;
  description: string;
  bg_gradient?: string;
}

export interface StudentRecord {
  id: string;
  student_code: string;
  full_name: string;
  dob: string;
  xp: number;
  level: number;
  streak: number;
  status: 'present' | 'absent_excused' | 'absent_unexcused' | 'late';
}

export interface LessonMaterial {
  id: string;
  class_id: string;
  title: string;
  material_type: 'pdf' | 'video' | 'slide' | 'iframe_game';
  file_url?: string;
  embed_url?: string;
  description: string;
}

export interface QuizQuestion {
  id: string;
  question_text: string;
  options: string[];
  correct_option: number;
  explanation: string;
}

export interface Quiz {
  id: string;
  class_id: string;
  title: string;
  duration_minutes: number;
  xp_reward: number;
  total_questions: number;
  questions: QuizQuestion[];
}

export interface QuizSubmission {
  id: string;
  student_code: string;
  student_name: string;
  quiz_title: string;
  score: number;
  correct_answers: number;
  total_questions: number;
  xp_earned: number;
  submitted_at: string;
}

export interface Badge {
  id: string;
  name: string;
  desc: string;
  icon: string;
  color: string;
}

export interface ClassPost {
  id: string;
  author: string;
  role: string;
  content: string;
  likes: number;
  comments: { author: string; content: string; time: string }[];
  created_at: string;
}
