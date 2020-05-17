import NPC from './src/client';
import * as Env from './env';

const npc: NPC = new NPC(Env);
npc.start();

setInterval(() => npc.emit('ready'), 15e3);//15000

export default npc;
