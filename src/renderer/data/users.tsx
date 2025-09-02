import { User } from "./types";

import maggieAvatar from './avatars/maggie.png';
import nateParrottAvatar from './avatars/nate_parrott.jpg';
import graceyunAvatar from './avatars/graceyun.jpg';
import felixAvatar from './avatars/felix.png';
import claudeAvatar from './avatars/claude.png';

export const USERS: Record<string, User> = {
  'felix': { id: 'felix', name: 'Felix Rieseberg', screenname: 'FelixSwimsAlot', avatar: felixAvatar },
  'jerome': { id: 'jerome', name: 'Jerome Swannack' },
  'kenshiro': { id: 'kenshiro', name: 'Kenshiro Nakagawa' },
  'yx': { id: 'yx', name: 'Yongxing Deng' },
  'adamj': { id: 'adamj', name: 'Adam Jones' },
  'barryz': { id: 'barryz', name: 'Barry Zhang' },
  'nikhil': { id: 'nikhil', name: 'Nikhil Bhargava' },
  'gatwood': { id: 'gatwood', name: 'Gatwood', screenname: 'xxNoScopeUrSelfxx' },
  'zach': { id: 'zach', name: 'Zachary Witten' },
  'zellyn': { id: 'zellyn', name: 'Zellyn Hunter' },
  'graceyun': { id: 'graceyun', name: 'Grace Yun', screenname: 'littlesnorlax', avatar: graceyunAvatar },
  'zack lee': { id: 'zack lee', name: 'Zack Lee' },
  'TimW': { id: 'TimW', name: 'Tim Weingarten' },
  'Scott White': { id: 'Scott White', name: 'Scott White' },
  'nate parrott': { id: 'nate parrott', name: 'Nate Parrott', screenname: 'tmnt360', avatar: nateParrottAvatar },
  'mo': { id: 'mo', name: 'Mo Julapalli' },
  'santiago': { id: 'santiago', name: 'Santiago Seira', screenname: 'hakuna_matata_to_you' },
  'mark': { id: 'mark', name: 'Mark Pike' },
  'oliverg': { id: 'oliverg', name: 'Oliver Grubin' },
  'kenneth': { id: 'kenneth', name: 'Kenneth Lien' },
  'abbie': { id: 'abbie', name: 'Abbie Freese' },
  'kylegao': { id: 'kylegao', name: 'Kyle Gao' },
  'raph': { id: 'raph', name: 'Raphael Lee' },
  'sar': { id: 'sar', name: 'Sar Warner', screenname: 'thericebowl007' },
  'Rohan Seth': { id: 'Rohan Seth', name: 'Rohan Seth' },
  'jerry.h': { id: 'jerry.h', name: 'Jerry Hong', screenname: 'jhoer' },
  'alicelovescake': { id: 'alicelovescake', name: 'Alice Zhao', screenname: 'acesoccerplayer' },
  'theo': { id: 'theo', name: 'Theo Chu' },
  'ollie': { id: 'ollie', name: 'Ollie Weller-Davies' },
  'darshan': { id: 'darshan', name: 'Darshan Patel' },
  'jwang': { id: 'jwang', name: 'Justin Wang' },
  'maggie': { id: 'maggie', name: 'Maggie Vo', screenname: 'magrettable', avatar: maggieAvatar },
  'mello': { id: 'mello', name: 'Romello Goodman' },
  'jacques': { id: 'jacques', name: 'Jacques Paye' },
  'ab': { id: 'ab', name: 'Andrew Badr', screenname: 'peanutbadr' },
  'willc': { id: 'willc', name: 'William Chou' },
  'dianne': { id: 'dianne', name: 'Dianne Penn' },
  'leon': { id: 'leon', name: 'Leon Wu', screenname: 'BIG TIGER' },
  'ibu': { id: 'ibu', name: 'Ibu Madha', screenname: 'SSJ Rampager' },
  'hoi': { id: 'hoi', name: 'Hoi Fung Ho', screenname: 'hoipolloi' },
  'ivy': { id: 'ivy', name: 'Tina Vachovsky', screenname: 'tuna95' },
  'claude': { id: 'claude', name: 'Claude', screenname: 'Claude', avatar: claudeAvatar }
};