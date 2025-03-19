import express,{json} from 'express';
import postRoutes from '../routes/postRoutes';
import getRoutes from '../routes/getRoutes';
import putRoutes from '../routes/putRoutes';
import deleteRoutes from '../routes/deleteRoutes';
import { errorHandler } from '../utils/errorhandler';
import cors from 'cors';


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(json());

app.get('/', (req, res) => {
    res.send('GAGANA NA');
});

app.use(getRoutes);
app.use(putRoutes);
app.use(deleteRoutes);
app.use(postRoutes);
app.use(errorHandler);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});