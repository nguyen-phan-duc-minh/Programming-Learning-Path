USE master;
GO

-- 1. Tạo Database
IF NOT EXISTS (SELECT name FROM sys.databases WHERE name = N'Codefinity')
BEGIN
    CREATE DATABASE [Codefinity];
END
GO

USE [Codefinity];
GO

-- ============================================
-- 1. USER TABLE (Gốc)
-- ============================================
CREATE TABLE [user] (
    id INT IDENTITY(1,1) PRIMARY KEY,
    google_id VARCHAR(100) UNIQUE,
    email VARCHAR(120) NOT NULL UNIQUE,
    name NVARCHAR(80) NOT NULL,
    picture VARCHAR(500),
    created_at DATETIME DEFAULT GETDATE(),
    is_active BIT DEFAULT 1
);
CREATE INDEX idx_user_email ON [user](email);
GO

-- ============================================
-- 2. SURVEY TABLE (Thông tin đầu vào)
-- ============================================
CREATE TABLE survey (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    role VARCHAR(50),
    experience_level VARCHAR(50),
    motivation NVARCHAR(100),
    time_commitment NVARCHAR(50),
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT fk_survey_user FOREIGN KEY (user_id) REFERENCES [user](id) ON DELETE CASCADE
);
GO

-- ============================================
-- 3. LEARNING PATH TABLE (Lộ trình tổng)
-- ============================================
CREATE TABLE learning_path (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    title NVARCHAR(200) NOT NULL,
    description NVARCHAR(MAX),
    duration_days INT DEFAULT 30,
    status VARCHAR(20) DEFAULT 'in_progress', -- in_progress, completed, dropped
    created_at DATETIME DEFAULT GETDATE(),
    CONSTRAINT fk_lp_user FOREIGN KEY (user_id) REFERENCES [user](id) ON DELETE CASCADE
);
GO

-- ============================================
-- 4. DAILY SCHEDULE TABLE (Bài học từng ngày)
-- ============================================
CREATE TABLE daily_schedule (
    id INT IDENTITY(1,1) PRIMARY KEY,
    learning_path_id INT NOT NULL,
    day_number INT NOT NULL,
    title NVARCHAR(200) NOT NULL,
    content NVARCHAR(MAX) NOT NULL, -- Lý thuyết tóm tắt
    estimated_hours FLOAT DEFAULT 1.0,
    completed BIT DEFAULT 0,
    completed_at DATETIME,
    
    CONSTRAINT fk_ds_lp FOREIGN KEY (learning_path_id) REFERENCES learning_path(id) ON DELETE CASCADE,
    CONSTRAINT uq_path_day UNIQUE(learning_path_id, day_number)
);
CREATE INDEX idx_ds_completed ON daily_schedule(completed);
GO

-- ============================================
-- 5. DAILY VIDEO TABLE (Mới: Quản lý Video riêng)
-- ============================================
-- Thay vì lưu JSON, ta tách ra bảng riêng để dễ quản lý link chết, update video
CREATE TABLE DailyVideo (
    id INT IDENTITY(1,1) PRIMARY KEY,
    daily_schedule_id INT NOT NULL,
    title NVARCHAR(200) NOT NULL,
    url VARCHAR(500) NOT NULL,
    duration_minutes INT,
    platform VARCHAR(50) DEFAULT 'youtube', -- youtube, vimeo, internal
    
    CONSTRAINT fk_dv_ds FOREIGN KEY (daily_schedule_id) REFERENCES daily_schedule(id) ON DELETE CASCADE
);
GO

-- ============================================
-- 6. DAILY RESOURCE TABLE (Mới: Tài liệu đọc thêm)
-- ============================================
CREATE TABLE DailyResource (
    id INT IDENTITY(1,1) PRIMARY KEY,
    daily_schedule_id INT NOT NULL,
    title NVARCHAR(200) NOT NULL,
    url VARCHAR(500) NOT NULL,
    type VARCHAR(50), -- documentation, github, blog, pdf
    
    CONSTRAINT fk_dr_ds FOREIGN KEY (daily_schedule_id) REFERENCES daily_schedule(id) ON DELETE CASCADE
);
GO

-- ============================================
-- 7. USER NOTE TABLE (Mới: Ghi chú học tập)
-- ============================================
-- Cho phép user note lại kiến thức quan trọng của ngày hôm đó
CREATE TABLE UserNote (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    daily_schedule_id INT NOT NULL,
    note_content NVARCHAR(MAX) NOT NULL,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT fk_un_user FOREIGN KEY (user_id) REFERENCES [user](id), -- Không cascade để giữ data nếu user lỡ tay xóa path
    CONSTRAINT fk_un_ds FOREIGN KEY (daily_schedule_id) REFERENCES daily_schedule(id) ON DELETE CASCADE
);
GO

-- ============================================
-- 8. CERTIFICATE TABLE (Mới: Chứng chỉ)
-- ============================================
-- Cấp khi user hoàn thành 1 learning path
CREATE TABLE Certificate (
    id INT IDENTITY(1,1) PRIMARY KEY,
    certificate_code VARCHAR(100) UNIQUE NOT NULL, -- UUID hoặc Mã định danh
    user_id INT NOT NULL,
    learning_path_id INT NOT NULL,
    issued_date DATETIME DEFAULT GETDATE(),
    image_url VARCHAR(500), -- Link ảnh chứng chỉ đã render
    
    CONSTRAINT fk_cert_user FOREIGN KEY (user_id) REFERENCES [user](id),
    CONSTRAINT fk_cert_lp FOREIGN KEY (learning_path_id) REFERENCES learning_path(id)
);
GO

-- ============================================
-- 9. BADGE TABLE (Mới: Định nghĩa danh hiệu)
-- ============================================
-- Ví dụ: "Thợ săn Python", "Chuỗi 7 ngày", "Kẻ hủy diệt Bug"
CREATE TABLE Badge (
    id INT IDENTITY(1,1) PRIMARY KEY,
    name NVARCHAR(100) NOT NULL,
    description NVARCHAR(500),
    icon_url VARCHAR(500),
    criteria_type VARCHAR(50) -- streak, completion, quiz_score
);
GO

-- ============================================
-- 10. USER BADGE TABLE (Mới: Danh hiệu user đạt được)
-- ============================================
CREATE TABLE UserBadge (
    id INT IDENTITY(1,1) PRIMARY KEY,
    user_id INT NOT NULL,
    badge_id INT NOT NULL,
    earned_at DATETIME DEFAULT GETDATE(),
    
    CONSTRAINT fk_ub_user FOREIGN KEY (user_id) REFERENCES [user](id) ON DELETE CASCADE,
    CONSTRAINT fk_ub_badge FOREIGN KEY (badge_id) REFERENCES Badge(id) ON DELETE CASCADE,
    CONSTRAINT uq_user_badge UNIQUE(user_id, badge_id) -- Mỗi huy hiệu chỉ nhận 1 lần
);
GO

-- ============================================
-- INSERT SAMPLE DATA (Dữ liệu mẫu)
-- ============================================

-- 1. User
INSERT INTO [user] (google_id, email, name) VALUES ('g123', 'vu.ho@codefinity.com', N'Hồ Duy Vũ');

-- 2. Survey
INSERT INTO survey (user_id, role, motivation) VALUES (1, 'software', N'Muốn làm Senior Dev');

-- 3. Path
INSERT INTO learning_path (user_id, title, duration_days) VALUES (1, N'Fullstack Java Spring Boot', 60);

-- 4. Schedule (Ngày 1)
INSERT INTO daily_schedule (learning_path_id, day_number, title, content) 
VALUES (1, 1, N'Java Core: OOP Basics', N'Học về Class, Object và Inheritance');

-- 5. Video cho ngày 1
INSERT INTO DailyVideo (daily_schedule_id, title, url, duration_minutes)
VALUES (1, N'OOP in 10 minutes', 'https://youtu.be/xyz', 10);

-- 6. Resource cho ngày 1
INSERT INTO DailyResource (daily_schedule_id, title, url, type)
VALUES (1, N'Oracle Java Docs', 'https://docs.oracle.com/java', 'documentation');

-- 7. Badge Definition
INSERT INTO Badge (name, description, criteria_type) 
VALUES (N'Khởi đầu mới', N'Hoàn thành bài học đầu tiên', 'completion');

-- 8. User Note
INSERT INTO UserNote (user_id, daily_schedule_id, note_content)
VALUES (1, 1, N'Lưu ý: Interface khác Abstract Class ở chỗ đa kế thừa.');

-- 9. Cấp huy hiệu
INSERT INTO UserBadge (user_id, badge_id) VALUES (1, 1);

-- Kiểm tra toàn bộ
SELECT * FROM [user];
SELECT * FROM learning_path;
SELECT * FROM daily_schedule;
SELECT * FROM DailyVideo;
SELECT * FROM UserBadge;
GO