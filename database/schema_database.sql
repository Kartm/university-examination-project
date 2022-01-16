create database myStarterDatabase;
use myStarterDatabase;

CREATE TABLE Participant(
	participant_id INT PRIMARY KEY AUTO_INCREMENT,
	score FLOAT NOT NULL,
    email VARCHAR(45) NOT NULL UNIQUE,
    name VARCHAR(45) NOT NULL
);
CREATE TABLE Owner(
	owner_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL
);
CREATE TABLE QuestionType(
	question_type_id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(45) NOT NULL
);
CREATE TABLE Settings(
	settings_id INT PRIMARY KEY AUTO_INCREMENT,
    show_results_overview BOOLEAN NOT NULL,
    allow_going_back BOOLEAN NOT NULL,
    show_points_per_question BOOLEAN NOT NULL
);
CREATE TABLE Link(
	link_id INT PRIMARY KEY AUTO_INCREMENT,
    participant_id INT NOT NULL,
    used BOOLEAN NOT NULL,
	sent_at DATETIME NOT NULL,
    link VARCHAR(45) NOT NULL UNIQUE,
    FOREIGN KEY (participant_id) REFERENCES Participant(participant_id)
);
CREATE TABLE QuestionChoice(
	question_choice_id INT PRIMARY KEY AUTO_INCREMENT,
    question_text VARCHAR(150) NOT NULL,
    is_correct BOOL NOT NULL
);
CREATE TABLE QuestionAnswer(
	question_answer_id INT PRIMARY KEY AUTO_INCREMENT,
    answer_text VARCHAR(45),
    seconds_spent INT NOT NULL,
    tab_focus_lost_count INT,
    check_status ENUM ('Non Displayed', 'Displaying', 'Skipped', 'Done') NOT NULL
);
CREATE TABLE Test(
	test_id INT PRIMARY KEY AUTO_INCREMENT,
    owner_id INT NOT NULL,
    settings_id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    owner_link VARCHAR (100) NOT NULL,
    FOREIGN KEY (owner_id) REFERENCES Owner(owner_id),
    FOREIGN KEY (settings_id) REFERENCES Settings(settings_id)
);
CREATE TABLE Question(
	question_id INT PRIMARY KEY AUTO_INCREMENT,
    test_id INT NOT NULL,
    question_type_id INT NOT NULL,
    FOREIGN KEY (test_id) REFERENCES Test(test_id),
    FOREIGN KEY (question_type_id) REFERENCES QuestionType(question_type_id)
);
CREATE TABLE Template(
	template_id INT PRIMARY KEY AUTO_INCREMENT,
    settings_id INT NOT NULL,
    name VARCHAR(45) NOT NULL,
    FOREIGN KEY (settings_id) REFERENCES Settings(settings_id)
);
CREATE TABLE QuestionsPreset(
	question_preset_id INT PRIMARY KEY AUTO_INCREMENT,
    template_id INT NOT NULL,
    question_type_id INT NOT NULL,
	question_num INT NOT NULL,
    FOREIGN KEY (template_id) REFERENCES Template(template_id),
    FOREIGN KEY (question_type_id) REFERENCES QuestionType(question_type_id)
);

ALTER TABLE Participant ADD COLUMN test_id INT NOT NULL;
ALTER TABLE Participant ADD FOREIGN KEY (test_id) REFERENCES Test(test_id);

ALTER TABLE QuestionAnswer ADD COLUMN question_choice_id INT NOT NULL;
ALTER TABLE QuestionAnswer ADD COLUMN participant_id INT NOT NULL;
ALTER TABLE QuestionAnswer ADD FOREIGN KEY (question_choice_id) REFERENCES QuestionChoice(question_choice_id);
ALTER TABLE QuestionAnswer ADD FOREIGN KEY (participant_id) REFERENCES Participant(participant_id);

ALTER TABLE QuestionChoice ADD COLUMN question_id INT NOT NULL;
ALTER TABLE QuestionChoice ADD FOREIGN KEY (question_id) REFERENCES Question(question_id);
