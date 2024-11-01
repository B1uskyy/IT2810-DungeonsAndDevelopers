import dragonborn from '../assets/images/race/dragonborn.png';
import dwarf from '../assets/images/race/dwarf.png';
import elf from '../assets/images/race/elf.png';
import gnome from '../assets/images/race/gnome.png';
import half_elf from '../assets/images/race/half-elf.png';
import half_orc from '../assets/images/race/half-orc.png';
import halfling from '../assets/images/race/halfling.png';
import human from '../assets/images/race/human.png';
import tiefling from '../assets/images/race/tiefling.png';

const imageMapping: { [key: string]: string } = {
  dragonborn,
  dwarf,
  elf,
  gnome,
  'half-elf': half_elf,
  'half-orc': half_orc,
  halfling,
  human,
  tiefling,
};

export default imageMapping;
