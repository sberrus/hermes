import { App } from '@/models/app';

const app = new App()
app.start()

// todo
// [ ] implement anti brute force strategies ** express-brute library could help.
// [ ] add helmet and investigate
// [ ] add csurf and investigate
// [ ] research about how to defend ddos attacks
// [ ] research about how to log and monitorize the api correctly