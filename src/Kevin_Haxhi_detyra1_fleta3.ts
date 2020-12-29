import cp from 'child_process';
import { exit } from 'process';
import { promisify } from 'util';
import fs from 'fs';

// transformo ne promise based
const exec = promisify(cp.exec);
const writeFile = promisify(fs.writeFile);

// funksion qe ben pozicionimin ne direktorine e kerkuar
const pozicionohu = async (pozicion: string): Promise<void> => {
  try {
    await exec(`cd ${pozicion}`);
    console.log(`✔︎ Pozicionimi ne '${pozicion}' u krye`);
  } catch (gabim) {
    console.log(`✘ Pozicionimi ne '${pozicion}' deshtoi!\n\n`, gabim);
    exit(1);
  }
}

// funksion qe printon daten dhe oren e sistemit
const printoDateDheOre = async (): Promise<void> => {
  try {
    const { stdout } = await exec('date');
    console.log(`✔︎ Data dhe ora e sistemit: ${stdout.substr(0, stdout?.length - 1)}`);
  } catch (gabim) {
    console.log('✘ Printimi i dates dhe ores deshtoi!\n\n', gabim);
    exit(1);
  }
};

// funksion qe printon vendndodhjen e entitetit te kerkuar
const gjejVendndodhjen = async (entitet: string): Promise<void> => {
  try {
    const { stdout } = await exec(`which ${entitet}`);
    console.log(`✔︎ Vendndodhja e entitetit '${entitet}': ${stdout.substr(0, stdout?.length - 1)}`);
  } catch (gabim) {
    console.log(`✘ Vendndodhja e entitetit '${entitet}' nuk u gjet!\n\n`, gabim);
    exit(1);
  }
};

// funksion qe gjeneron manualin e plote per nje komande dhe e ruan ne nje skedar
const gjeneroManual = async (komande: string): Promise<void> => {
  try {
    const { stdout } = await exec(`man ${komande}`);
    await writeFile(`src/assets/${komande}.txt`, stdout.toString(), {
      flag: 'w',
      encoding: 'utf-8',
    });
    console.log(`✔︎ Manuali i komandes '${komande}' u gjenerua ne skedarin '${komande}.txt'`);
  } catch (gabim) {
    console.log(`✘ Manuali i komandes '${komande}' nuk u gjenerua me sukses!\n\n`, gabim);
    exit(1);
  }
};

const fleta3 = async (): Promise<void> => {
  await pozicionohu(`$HOME`);
  await printoDateDheOre();
  await gjejVendndodhjen('ssh');
  await gjeneroManual('more');
  await gjeneroManual('less');
};

export default fleta3;
