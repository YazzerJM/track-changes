
import { conn } from '../../utils/database';

export default async function index(req, res){
  const response = await conn.query('SELECT NOW()');

  console.log(response);
  return res.json({ message: 'pong', time: response.rows[0].nows });
}