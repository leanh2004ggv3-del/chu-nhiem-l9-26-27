-- ====================================================================
-- DỰ ÁN CLASSROOM APP - DATABASE SCHEMA (SUPABASE POSTGRESQL)
-- ====================================================================

-- 1. BẢNG NGƯỜI DÙNG & HỒ SƠ (PROFILES)
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT NOT NULL,
    role TEXT CHECK (role IN ('teacher', 'student', 'parent', 'admin')) NOT NULL DEFAULT 'student',
    avatar_url TEXT,
    student_code TEXT UNIQUE, -- Mã học sinh (VD: HS2026001)
    dob DATE,                 -- Ngày sinh học sinh cho Phụ huynh tra cứu
    xp INTEGER DEFAULT 150,
    level INTEGER DEFAULT 2,
    streak_days INTEGER DEFAULT 5,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. BẢNG LỚP HỌC (CLASSES)
CREATE TABLE IF NOT EXISTS public.classes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    grade_level TEXT NOT NULL,
    join_code VARCHAR(10) UNIQUE NOT NULL, -- Mã tham gia lớp (VD: TOAN9A)
    teacher_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    description TEXT,
    cover_color TEXT DEFAULT 'from-emerald-500 to-teal-600',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BẢNG THÀNH VIÊN LỚP HỌC (CLASS_MEMBERS)
CREATE TABLE IF NOT EXISTS public.class_members (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    joined_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, student_id)
);

-- 4. BẢNG ĐIỂM DANH HÀNG NGÀY (ATTENDANCE)
CREATE TABLE IF NOT EXISTS public.attendance (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    date DATE NOT NULL DEFAULT CURRENT_DATE,
    status TEXT CHECK (status IN ('present', 'absent_excused', 'absent_unexcused', 'late')) NOT NULL,
    note TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(class_id, student_id, date)
);

-- 5. BẢNG HỌC LIỆU & BÀI GIẢNG (LESSONS)
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    content TEXT,
    material_type TEXT CHECK (material_type IN ('pdf', 'video', 'slide', 'iframe_game')) NOT NULL,
    file_url TEXT,
    embed_url TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. BẢNG ĐỀ THI & QUIZ (QUIZZES)
CREATE TABLE IF NOT EXISTS public.quizzes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT,
    duration_minutes INTEGER DEFAULT 15,
    xp_reward INTEGER DEFAULT 100,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BẢNG CÂU HỎI QUIZ (QUIZ_QUESTIONS)
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    options JSONB NOT NULL, -- Format: ["Đội 1", "Đội 2", "Đội 3", "Đội 4"]
    correct_option INTEGER NOT NULL, -- Index 0..3
    explanation TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BẢNG BÀI NỘP QUIZ (QUIZ_SUBMISSIONS)
CREATE TABLE IF NOT EXISTS public.quiz_submissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    quiz_id UUID REFERENCES public.quizzes(id) ON DELETE CASCADE,
    student_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    score NUMERIC(5,2) NOT NULL,
    total_questions INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    xp_earned INTEGER DEFAULT 0,
    submitted_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. BẢNG HUY HIỆU (BADGES) & HUY HIỆU CỦA USER
CREATE TABLE IF NOT EXISTS public.badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    xp_required INTEGER DEFAULT 100
);

CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE,
    unlocked_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. BẢNG TIN LỚP HỌC & BÌNH LUẬN (CLASS_POSTS & COMMENTS)
CREATE TABLE IF NOT EXISTS public.class_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    class_id UUID REFERENCES public.classes(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    likes_count INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS public.post_comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id UUID REFERENCES public.class_posts(id) ON DELETE CASCADE,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    content TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- BẬT CHẾ ĐỘ CHÍNH SÁCH BẢO MẬT ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.class_posts ENABLE ROW LEVEL SECURITY;

-- CHÍNH SÁCH RLS MẪU
CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Students view own class info" ON public.classes FOR SELECT USING (true);
