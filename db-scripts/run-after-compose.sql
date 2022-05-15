-- create tables
CREATE TABLE `users` (
    `id` int primary key auto_increment,
    `mobile_number` varchar(12) not null,
    `password` varchar(255) not null
);

CREATE TABLE `tasks` (
    `id` int primary key auto_increment,
    `user_id` int not null,
    `body` varchar(255) not null,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

-- seed data
INSERT INTO `users` (`id`,`mobile_number`,`password`) VALUES (1,'9999999999','688787d8ff144c502c7f5cffaafe2cc588d86079f9de88304c26b0cb99ce91c6');
INSERT INTO `tasks` (`user_id`, `body`) VALUES ('1', 'todo item 1');
INSERT INTO `tasks` (`user_id`, `body`) VALUES ('1', 'todo item 2');