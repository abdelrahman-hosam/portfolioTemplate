CREATE TABLE IF NOT EXISTS Project(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    describtion TEXT NOT NULL,
    stack_used TEXT,
    github_link VARCHAR(360)
);

CREATE TABLE IF NOT EXISTS Skill(
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    level ENUM('Beginner', 'intermediate', 'above intermediate', 'advanced', 'expert') NOT NULL,
    type ENUM('Technical', 'Concept') NOT NULL,
    is_learning BOOLEAN NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    learnt_date DATE
);

CREATE TABLE IF NOT EXISTS Article(
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    body TEXT NOT NULL,
    link VARCHAR(350),
    description TEXT,
    still_writing BOOLEAN NOT NULL,
    hidden BOOLEAN DEFAULT True,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Contact(
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    info VARCHAR(350),
    photo_url VARCHAR(255)
);

CREATE TABLE IF NOT EXISTS Resume(
    id INT AUTO_INCREMENT PRIMARY KEY,
    file_url VARCHAR(255),
    uploaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Experience(
    id INT PRIMARY KEY AUTO_INCREMENT,
    type ENUM('Education', 'Work') NOT NULL,
    name TEXT NOT NULL,
    duration INT NOT NULL,
    link TEXT,
    duties TEXT
);

CREATE TABLE IF NOT EXISTS OpenTo(
    id INT PRIMARY KEY AUTO_INCREMENT,
    employmentType ENUM('Part-time', 'Full-time', 'Contract', 'Project-based') NOT NULL,
    flexible_hours BOOLEAN NOT NULL,
    duties TEXT,
    position VARCHAR(255) NOT NULL,
    locationType ENUM('Remote', 'On-site', 'Hybrid') NOT NULL
);

