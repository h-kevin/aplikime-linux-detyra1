import Colors, { bgBlue } from 'colors/safe';

import fleta3 from './Kevin_Haxhi_detyra1_fleta3';

const app = async (): Promise<void> => {
  console.log(
    Colors.black(
      Colors.bgBlue(
        'FILLIMI I EKZEKUTIMIT\n',
      ),
    ),
  );
  
  // ekzekuto funksionin fleta3
  await fleta3();
  
  console.log(
    Colors.black(
      Colors.bgRed(
        '\nFUNDI I EKZEKUTIMIT',
      ),
    ),
  );
};

app();
