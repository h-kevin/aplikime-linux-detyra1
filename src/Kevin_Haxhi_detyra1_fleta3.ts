import cp from 'child_process';
import { exit } from 'process';
import { promisify } from 'util';
import fs from 'fs';

// transformo ne promise based
const exec = promisify(cp.exec);
const writeFile = promisify(fs.writeFile);
const readFile = promisify(fs.readFile);

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

// funksion qe lexon 2 skedare tekst dhe krahason permbajtjen
const krahasoSkedare = async (
  adrSkedar1: string,
  adrSkedar2: string,
): Promise<void> => {
  try {
    const skedar1 = await readFile(adrSkedar1);
    const skedar2 = await readFile(adrSkedar2);
    const perputhen = skedar1.equals(skedar2) ? 'perputhen' : 'nuk perputhen';
    console.log(`✔︎ Krahasimi i skedareve u krye dhe ata ${perputhen}`);
  } catch (gabim) {
    console.log(`✘ Krahasimi i skedareve nuk u krye me sukses!\n\n`, gabim);
    exit(1);
  }
}

// funksion qe afishon x rreshtat e pare te nje skedari
const afishoNgaFillimi = async (
  numri: number,
  adrSkedari: string,
): Promise<void> => {
  try {
    const tekstiSkedarit = await readFile(adrSkedari);
    const rreshtat = tekstiSkedarit.toString().split('\n').slice(0, numri);
    console.log(`✔︎ ${numri} rreshtat e pare te skedarit:\n`);
    for (const e of rreshtat) { console.log(e.toString()) }
  } catch (gabim) {
    console.log(`✘ Afishimi i rreshtave te skedarit deshtoi!\n\n`, gabim);
    exit(1);
  }
};

// funksion qe afishon x rreshtat e fundit te nje skedari
const afishoNgaFundi = async (
  numri: number,
  adrSkedari: string,
): Promise<void> => {
  try {
    const tekstiSkedarit = await readFile(adrSkedari);
    const rreshtat = tekstiSkedarit.toString().split('\n').slice(-(numri + 1), -1);
    console.log(`✔︎ ${numri} rreshtat e fundit te skedarit:\n`);
    for (const e of rreshtat) { console.log(e.toString()) }
  } catch (gabim) {
    console.log(`✘ Afishimi i rreshtave te skedarit deshtoi!\n\n`, gabim);
    exit(1);
  }
};

// funksion qe bashkon permbajtjen e dy skedareve dhe e afishon ate
const bashkoSkedare = async (
  adrSkedar1: string,
  adrSkedar2: string,
): Promise<void> => {
  try {
    const emriSk1 = adrSkedar1.split('/')[2].split('.')[0];
    const emriSk2 = adrSkedar2.split('/')[2].split('.')[0];
    const skedar1 = await readFile(adrSkedar1);
    const skedar2 = await readFile(adrSkedar2);
    const bashkimiSkedareve = `${skedar1}
      \n================================================================================
      \n================================================================================
      \n\n${skedar2}
    `;
    await writeFile(`src/assets/${emriSk1}_${emriSk2}.txt`, bashkimiSkedareve, {
      flag: 'w',
      encoding: 'utf-8',
    });
    console.log(`✔︎ Skedaret u bashkuan dhe gjeneruan '${emriSk1}_${emriSk2}.txt'`);

  } catch (gabim) {
    console.log(`✘ Afishimi i rreshtave te skedarit deshtoi!\n\n`, gabim);
    exit(1);
  }
};

const fleta3 = async (): Promise<void> => {
  await pozicionohu(`$HOME`);
  await printoDateDheOre();
  await gjejVendndodhjen('ssh');
  await gjeneroManual('more');
  await gjeneroManual('less');
  await krahasoSkedare('src/assets/more.txt', 'src/assets/less.txt');
  console.log();
  await afishoNgaFillimi(5, 'src/assets/more.txt');
  console.log();
  await afishoNgaFundi(5, 'src/assets/less.txt');
  console.log();
  await bashkoSkedare('src/assets/more.txt', 'src/assets/less.txt');
};

export default fleta3;
