import { exec } from 'child_process';
import { exit } from 'process';
import { promisify } from 'util';

// transformo exec ne promise based
const withPromiseExec = promisify(exec);

// funksion qe ben pozicionimin ne direktorine e kerkuar
const pozicionohu = async (pozicion: string): Promise<void> => {
  try {
    await withPromiseExec(`cd ${pozicion}`);
    console.log(`✔︎ Pozicionimi ne ${pozicion} u krye`);
  } catch (error) {
    console.log('✘ Pozicionimi deshtoi!\n\n', error);
    
    exit(1);
  }
}

const fleta3 = async (): Promise<void> => {
  await pozicionohu(`$HOME`);
};

export default fleta3;
