CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	task varchar(256),
	completed BOOLEAN DEFAULT FALSE,
	notes varchar(256)
);
INSERT INTO "tasks"
	("task", "completed", "notes")
VALUES
	('Clean Room', 'false','Remove hoard of pizza crusts'),
	('Karate Lesson', 'false', 'Throat punches only'),
	('Groceries', 'false', 'Bananas, Oatmeal, Battery acid, Flour,Green beans, laundry detergent, milk, almond milk, bagels, lava, lunchables, pizza crust'),
	('Invest in dogecoin', 'false', 'INVEST INVEST INVEST'),
	('Weekend Project', 'false', 'Spend at least 72 hours on styling'),
	('Water plants', 'false','Do not water the fake ones again');