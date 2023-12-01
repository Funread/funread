INSERT INTO `funread`.`user`
(`Email`, `Name`, `LastName`, `password`, `CreatedAt`, `Actived`, `UserName`)
VALUES
('holakeloke@gmail.com', 'bryan2', 'vargas2', 'vargas2', '2023-11-09 20:51:12.671445', '1', 'bryanJ2'),
('hola@gmail.com', 'bryan', 'vargas', 'vargas', '2023-11-09 20:51:24.955556', '1', 'bryanJ'),
('john@example.com', 'John', 'Doe', 'password123', '2023-01-01 00:00:00.000000', '1', 'john_doe'),
('alice@example.com', 'Alice', 'Smith', 'pass456', '2023-01-02 12:30:00.000000', '1', 'alice_smith'),
('bob@example.com', 'Bob', 'Johnson', 'secret789', '2023-01-03 09:45:00.000000', '0', 'bob_j'),
('emma@example.com', 'Emma', 'Brown', 'qwerty', '2023-01-04 18:20:00.000000', '1', 'emma_brown'),
('michael@example.com', 'Michael', 'Lee', 'mypass123', '2023-01-05 15:10:00.000000', '1', 'michael_lee'),
('sophia@example.com', 'Sophia', 'Davis', 'sophia_pass', '2023-01-06 04:30:00.000000', '0', 'sophia_d'),
('daniel@example.com', 'Daniel', 'White', 'daniel_pass', '2023-01-07 21:15:00.000000', '1', 'daniel_white'),
('olivia@example.com', 'Olivia', 'Miller', 'olivia123', '2023-01-08 11:55:00.000000', '1', 'olivia_m'),
('liam@example.com', 'Liam', 'Taylor', 'liam_pass', '2023-01-09 08:40:00.000000', '0', 'liam_taylor'),
('ava@example.com', 'Ava', 'Anderson', 'ava456', '2023-01-10 17:25:00.000000', '1', 'ava_a'),
('Richard@gmail.com', 'Richard', 'vargas', 'vargas', '2023-11-13 20:33:27.887220', '1', 'Ricardo');

INSERT INTO `funread`.`roles`
(`Role`)
VALUES
( 'administrativo'),
( 'estudiante'),
( 'profesor');


INSERT INTO `funread`.`userroles`
(`IdRole`,
`IdUser`)
VALUES
( 1, 1),(, 2, 2),( 3, 3),( 2, 4),( 2, 5),( 1, 6),( 2, 7)
,(8, 1, 8),(9, 3, 9),(10, 1, 10),(11, 2, 11),(12, 3, 12);




