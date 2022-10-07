CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task varchar(256),
	completed BOOLEAN DEFAULT FALSE,
	notes varchar(256)
);
INSERT INTO "tasks"
	("task", "completed", "notes")
VALUES
	('Clean Room', 'false','Start with dusting'),
	('Karate Lesson', 'false', 'Work on round kick'),
	('Groceries', 'false', 'Do not forget orange juice'),
	('Invest in dogecoin', 'false', 'INVEST INVEST INVEST'),
	('Weekend Project', 'false', 'Remember to drink water'),
	('Water plants', 'false','Plants need water too');
