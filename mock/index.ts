import { tellerMock } from "./teller";
import { userMock } from "./user";
import { flowMock } from "./flow";
import { taskMock } from "./task";

export default [...userMock, ...tellerMock, ...flowMock, ...taskMock];
