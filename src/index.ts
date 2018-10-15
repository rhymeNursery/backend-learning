import express from 'express';
import body from 'body-parser';
import 'reflect-metadata';
import { createConnection, getRepository } from 'typeorm';
import { User } from './db/user.entity';

/** ORM连接 */
createConnection()
	.then((connection) => {
		console.log(`ORM连接状态:${connection.isConnected}`);
	})
	.catch((error) => console.log(error));

const app = express();
app.use(body.urlencoded({ extended: false }));
app.use(body.json());

const PORT = 4000;
const HOSTNAME = '0.0.0.0';

app.get('/', (req, res) => {
	const users = getRepository(User).find({}).then((data) => {
		res.json(data);
	});
});

app.post('/', (req, res) => {
	const username: string = req.body.username;
	const password: string = req.body.password;
	const userRepository = getRepository(User);
	if (username.length && password.length) {
		const user = new User();
		user.username = username;
		user.password = password;
		userRepository
			.save(user)
			.then((data) => {
				res.json(data);
			})
			.catch((error) => {
				res.status(500), res.send(`存储失败:${error}`);
			});
	} else {
		res.status(403);
		res.send('格式不对');
	}
});

app.listen(PORT, HOSTNAME, () => {
	console.log(`服务器运行在http://${HOSTNAME}:${PORT}`);
});
