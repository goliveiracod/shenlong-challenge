import { app } from '@shared/infra/http/express';
import '@shared/infra/typeorm';

app.listen(3333, () => {
  console.log('Server started on port 3333');
});
