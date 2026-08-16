// SYSTEM MOCK DATABASE & LOCALSTORAGE PERSISTENCE ENGINE

export const INITIAL_DATA = {
  currentUser: {
    id: "user-student-1",
    email: "nguyenvanan@hocsinh.edu.vn",
    full_name: "Nguyễn Văn An",
    role: "student",
    student_code: "HS2026001",
    dob: "2011-05-15",
    avatar_url: "https://api.dicebear.com/7.x/bottts/svg?seed=AnNguyen",
    xp: 480,
    level: 3,
    streak_days: 7,
    badges_unlocked: ["badge-1", "badge-2", "badge-3"]
  },

  roles: [
    { id: "student", label: "Học sinh", desc: "Học tập, Thử thách Quiz & Nhận Huy Hiệu" },
    { id: "teacher", label: "Giáo viên", desc: "Quản lý Lớp, Điểm danh & Tạo Đề thi" },
    { id: "parent", label: "Cổng Tra Cứu Phụ Huynh", desc: "Tra cứu Báo cáo & Điểm số" }
  ],

  classes: [
    {
      id: "class-9a",
      name: "Lớp 9A - Toán & Khoa Học Tự Nhiên",
      grade_level: "Khối 9",
      join_code: "TOAN9A",
      teacher_name: "Thầy Nguyễn Quốc Cường",
      students_count: 38,
      description: "Chương trình nâng cao Ôn thi vào Lớp 10 Chuyên và Thử nghiệm Học tập Tương tác.",
      bg_gradient: "from-emerald-500 to-teal-700"
    },
    {
      id: "class-8b",
      name: "Lớp 8B - Vật Lý Tương Tác & Thí Nghiệm",
      grade_level: "Khối 8",
      join_code: "VATLY8B",
      teacher_name: "Cô Trần Thị Mai",
      students_count: 35,
      description: "Khám phá thế giới Vật lý mô phỏng 3D và Trò chơi Đố vui Sinh động.",
      bg_gradient: "from-amber-500 to-orange-600"
    }
  ],

  students: [
    { id: "hs-1", student_code: "HS2026001", full_name: "Nguyễn Văn An", dob: "2011-05-15", xp: 480, level: 3, streak: 7, status: "present" },
    { id: "hs-2", student_code: "HS2026002", full_name: "Trần Thị Bình", dob: "2011-08-20", xp: 350, level: 2, streak: 4, status: "present" },
    { id: "hs-3", student_code: "HS2026003", full_name: "Lê Hoàng Nam", dob: "2011-02-10", xp: 210, level: 2, streak: 2, status: "absent_excused" },
    { id: "hs-4", student_code: "HS2026004", full_name: "Phạm Minh Dung", dob: "2011-11-05", xp: 520, level: 4, streak: 12, status: "present" },
    { id: "hs-5", student_code: "HS2026005", full_name: "Vũ Đức Thắng", dob: "2011-03-30", xp: 190, level: 1, streak: 1, status: "late" }
  ],

  lessons: [
    {
      id: "les-1",
      class_id: "class-9a",
      title: "Chuyên Đề: Hàm Số Bậc Nhất & Phương Trình Bậc Hai",
      material_type: "pdf",
      file_url: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      description: "Tài liệu hệ thống kiến thức trọng tâm ôn thi vào lớp 10 THPT."
    },
    {
      id: "les-2",
      class_id: "class-9a",
      title: "Mô Phỏng Tương Tác: Cân Bằng Lực & Đòn Bẩy (PhET Simulation)",
      material_type: "iframe_game",
      embed_url: "https://phet.colorado.edu/sims/html/balancing-act/latest/balancing-act_all.html",
      description: "Game học tập mô phỏng trực quan giúp học sinh tự thao tác thí nghiệm Vật lý."
    },
    {
      id: "les-3",
      class_id: "class-9a",
      title: "Video Bài Giảng: Kỹ Thuật Giải Nhanh Hình Học Lớp 9",
      material_type: "video",
      embed_url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
      description: "Video hướng dẫn phương pháp vẽ đường phụ trong tam giác vuông."
    }
  ],

  quizzes: [
    {
      id: "quiz-1",
      class_id: "class-9a",
      title: "⚡ Thử Thách Quiz: Ôn Tập Phương Trình Bậc Hai Toán 9",
      duration_minutes: 10,
      xp_reward: 100,
      total_questions: 3,
      questions: [
        {
          id: "q1",
          question_text: "Phương trình $x^2 - 5x + 6 = 0$ có các nghiệm là gì?",
          options: ["x = 1 và x = 6", "x = 2 và x = 3", "x = -2 và x = -3", "Phương trình vô nghiệm"],
          correct_option: 1,
          explanation: "Ta có a + b + c ≠ 0, nhẩm nghiệm theo Vi-ét: x1 + x2 = 5, x1 * x2 = 6 ⇒ Nghiệm x1 = 2, x2 = 3."
        },
        {
          id: "q2",
          question_text: "Căn bậc hai số học của số 81 là bao nhiêu?",
          options: ["9", "-9", "±9", "81"],
          correct_option: 0,
          explanation: "Căn bậc hai số học của a (a ≥ 0) là số không âm x sao cho x^2 = a. Vì 9 > 0 và 9^2 = 81 nên √81 = 9."
        },
        {
          id: "q3",
          question_text: "Cho tam giác ABC vuông tại A, AB = 3cm, AC = 4cm. Độ dài cạnh huyền BC là:",
          options: ["5 cm", "6 cm", "7 cm", "12 cm"],
          correct_option: 0,
          explanation: "Áp dụng định lý Pythagore: BC^2 = AB^2 + AC^2 = 3^2 + 4^2 = 9 + 16 = 25 ⇒ BC = 5 cm."
        }
      ]
    }
  ],

  quizSubmissions: [
    {
      id: "sub-1",
      student_code: "HS2026001",
      student_name: "Nguyễn Văn An",
      quiz_title: "⚡ Thử Thách Quiz: Ôn Tập Phương Trình Bậc Hai Toán 9",
      score: 10.0,
      correct_answers: 3,
      total_questions: 3,
      xp_earned: 100,
      submitted_at: "2026-08-15 14:30"
    }
  ],

  badges: [
    { id: "badge-1", name: "🥇 Chăm Học Chăm Làm", description: "Đạt chuỗi 7 ngày truy cập học tập liên tục", icon: "🔥", color: "bg-amber-100 text-amber-800 border-amber-300" },
    { id: "badge-2", name: "⚡ Vua Trắc Nghiệm", description: "Đạt điểm 10 tuyệt đối trong bài Quiz Toán", icon: "👑", color: "bg-emerald-100 text-emerald-800 border-emerald-300" },
    { id: "badge-3", name: "🚀 Thần Đồng Khoa Học", description: "Tích lũy trên 300 điểm kinh nghiệm XP", icon: "🎯", color: "bg-sky-100 text-sky-800 border-sky-300" },
    { id: "badge-4", name: "🏆 Siêu Chiến Binh", description: "Thăng hạng Level 4 trên Bảng Xếp Hạng", icon: "💎", color: "bg-rose-100 text-rose-800 border-rose-300" }
  ],

  posts: [
    {
      id: "post-1",
      author: "Thầy Nguyễn Quốc Cường",
      role: "Giáo viên",
      avatar: "https://api.dicebear.com/7.x/bottts/svg?seed=CuongTeacher",
      content: "Chào cả lớp 9A! Thầy đã cập nhật Game mô phỏng Vật Lý & Đòn Bẩy trên hệ thống. Các em vào phần Học liệu để trải nghiệm và làm bài Quiz nhận 100 XP nhé!",
      likes: 18,
      comments: [
        { author: "Nguyễn Văn An", content: "Dạ thưa thầy, em đã làm xong Quiz và được 100 XP rồi ạ! Game mô phỏng rất hay!", time: "10 phút trước" },
        { author: "Trần Thị Bình", content: "Em cũng vừa vượt qua thử thách, cảm ơn thầy ạ!", time: "5 phút trước" }
      ],
      created_at: "Hôm nay 08:30"
    }
  ]
};

// HELPER PERSISTENCE FUNCTIONS
export function getStoredData() {
  const data = localStorage.getItem("classroom_app_data");
  if (!data) {
    localStorage.setItem("classroom_app_data", JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  }
  return JSON.parse(data);
}

export function saveStoredData(data) {
  localStorage.setItem("classroom_app_data", JSON.stringify(data));
}
