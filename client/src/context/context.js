import { createContext } from 'react';
import { contextValues } from 'scripts.js';

const UserContext = createContext(contextValues.user);

export default UserContext;
