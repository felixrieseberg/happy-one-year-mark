import { Message } from "./types";
import { USERS } from "./users";

import santiagoAttachment from './attachments/santiago.png';
import raphAttachment from './attachments/raph.png';
import willcAttachment from './attachments/willc.webp';
import ivyAttachment from './attachments/ivy.png';

export const MESSAGES: Map<keyof typeof USERS, Message[]> = new Map([
  ['felix', [
    { from: USERS['felix'], message: "maaaaaaaaaaaaaaaaaaaark" },
    { from: USERS['felix'], message: "hey buddy it's me, felix" },
    { from: USERS['felix'], message: "i just wanted to say happy one year at anthropic!!" },
    { from: USERS['felix'], message: "you're doing great things here and i'm so proud of you :)" },
    { from: USERS['felix'], message: "also, thank you so much for the very warm welcome you gave me and the kindness you show to everyone else around here" },
  ]],
  ['jerome', [
    { from: USERS['jerome'], message: "hb" },
  ]],
  ['kenshiro', [
    { from: USERS['kenshiro'], message: "hb" },
  ]],
  ['yx', [
    { from: USERS['yx'], message: "shinypb!! happy 1 year!! ur like the coolest person at work lol. always making everything more fun" },
  ]],
  ['adamj', [
    { from: USERS['adamj'], message: "happy anniversary shinypb!!" },
  ]],
  ['barryz', [
    { from: USERS['barryz'], message: "Stay shiny! ^.^" },
  ]],
  ['nikhil', [
    { from: USERS['nikhil'], message: "hags" },
  ]], 
  ['gatwood', [
    { from: USERS['gatwood'], message: "Happy 1 year <3 !! Mom says she'll get me halo 3 later this month let's get on and play later" },
  ]],
  ['zach', [
    { from: USERS['zach'], message: "hbdspb" },
  ]],
  ['zellyn', [
    { from: USERS['zellyn'], message: "Happy anniversary! Stay interesting, my friend! 🙂" },
  ]],
  ['graceyun', [
    { from: USERS['graceyun'], message: "happy 1 year mark!! xD can't wait 2 get more opportuniez to work 2gether!!!!! <33" },
  ]],
  ['zack lee', [
    { from: USERS['zack lee'], message: "~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~\\n!!!!! HAPPY ONE YEAR Shinypb!!!!!!\\n~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~\\n     _     _                   _     \\n ___| |__ (_)_ __  _   _ _ __ | |__  \\n/ __| '_ \\| | '_ \\| | | | '_ \\| '_ \\ \\n\\__ \\ | | | | | | | |_| | |_) | |_) |\\n|___/_| |_|_|_| |_|\\__, | .__/|_.__/ \\n                   |___/|_|          \\nOmG i CaNt BeLiEvE u've been at Anthropic for a year!! Looking forward to working more with you :D\\n~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~\\n~*DoNt CrY bEcAuSe iTs OvEr, sMiLe bEcAuSe iT hApPeNeD*~" },
  ]],
  ['TimW', [
    { from: USERS['TimW'], message: "Happy one year anniversary!!!!!!" },
  ]],
  ['Scott White', [
    { from: USERS['Scott White'], message: "happy 1 year!" },
  ]],
  ['nate parrott', [
    { from: USERS['nate parrott'], message: "hbd shinypb. I wrote you a poem\\nS tay\\nH aving\\nI nteresting\\nN ice\\nY ears\\nP lz\\nB roseph" },
  ]],
  ['mo', [
    { from: USERS['mo'], message: "happy antiversary!" },
  ]],
  ['santiago', [
    { from: USERS['santiago'], message: "Congrats on an excellent year of looking for which rocks will have the most interesting bugs underneath them!", attachments: [santiagoAttachment] },
  ]],
  ['mark', [
    { from: USERS['mark'], message: "🐜✨🎉 HAPPY ANTVERSARY %n! 🎉✨🐜\n💫⭐ MAKE AN ANT WISH RIGHT NOW! ⭐💫\nThis is a REAL antversary chain! Send this to 4 other ants within the next 10 minutes and you will:\n✅ Ship your next feature bug-free\n✅ Have Claude give you perfect responses\n✅ Unlock secret Sonnet 6 ((new)(new))\n⚠️ BUT IF U DON'T SEND THIS TO 4 ANTS... ⚠️\nClaude will run 37% slower 4 u for a whole month!\nMy friend sent this and got their PR approved in 5 minutes!\n🐜➡️🐜➡️🐜DON'T STOP THE ANT CHAIN!" },
  ]],
  ['oliverg', [
    { from: USERS['oliverg'], message: "hb" },
  ]],
  ['kenneth', [
    { from: USERS['kenneth'], message: "shinyhb" }, 
  ]],
  ['abbie', [
    { from: USERS['abbie'], message: "~~~ hAppY OnE YeAr ShiNyPB!!! Excited for another trip around the sun filled with even MORE shenanigans!! LOlz rotflmao ~~~" },
  ]],
  ['kylegao', [
    { from: USERS['kylegao'], message: "happy anniversary shinypb!  thank you for making it fun!" },
  ]],
  ['raph', [
    { from: USERS['raph'], message: "", attachments: [raphAttachment] },
  ]],
  ['sar', [
    { from: USERS['sar'], message: "happy one year antiversary! ur so gr8, im glad we're friends. 8-)\\n~~~~ \"Celebrate we will. Because life is short but sweet for certain. - DMB\" ~~~~" },
  ]],
  ['Rohan Seth', [
    { from: USERS['Rohan Seth'], message: "Happy Anniversary, shinypb! It was fun to get to know the lore behind the name shinypb. Hope we continue adding to the lore of shinypb for many years to come at Anthropic!" },
  ]],
  ['jerry.h', [
    { from: USERS['jerry.h'], message: 'happy antversary shinypb XD\n(\\__/)\n(+\'.\'+) this is bunny\n(")_(") bunny want world domination!' },
  ]],
  ['alicelovescake', [
    { from: USERS['alicelovescake'], message: "~*~ HaPpY AnT-VeRsArY!!! :ant: * ! All my notion friends who know you from Slack tell me that you are the best and that I need to chat with you! Looking forward to collaborating!" },
  ]],
  ['theo', [
    { from: USERS['theo'], message: "happy happy one year!!!!" },
  ]],
  ['ollie', [
    { from: USERS['ollie'], message: "happy one year!" },
  ]],
  ['darshan', [
    { from: USERS['darshan'], message: "Happy 1 year shinypb!!" },
  ]],
  ['jwang', [
    { from: USERS['jwang'], message: "congrats on 1 year!" },
  ]],
  ['maggie', [
    { from: USERS['maggie'], message: "xXx ~HAPPY ANTVERSARY!~ xXx\n\nu rock!!! keep on shining and pb'ing lmao - excited for moar to come!!! BD", attachments: [] },
  ]],
  ['mello', [
    { from: USERS['mello'], message: "hbhbhbhb!" },
    { from: USERS['mello'], message: "every time we chat I come away with more awe and wonder for the crazy world we are buidling xD" },
  ]],
  ['jacques', [
    { from: USERS['jacques'], message: "happy 1 year!" },
  ]],
  ['ab', [
    { from: USERS['ab'], message: ",.-:'^':-.,_,.-:'^':-.,_,.-:'^':Happy antiversary shiny :D!!!:'^':-.,_,.-:'^':-.,_,.-:'^':-.," },
  ]],
  ['willc', [
    { from: USERS['willc'], message: "when I see \"shiny\" I always think of the crab from moana", attachments: [
      willcAttachment
    ] },
    { from: USERS['willc'], message: "but then I see \"pb\" and I think peanut butter" },
    { from: USERS['willc'], message: "happy 1 year!" },
  ]],
  ['dianne', [
    { from: USERS['dianne'], message: "Happy one year Mark!" },
  ]],
  ['leon', [
    { from: USERS['leon'], message: "hApPy 1 yEaR!!1!" },
  ]],
  ['ibu', [
    { from: USERS['ibu'], message: "cool away message dude, happy 1 year. would you mind FTPing my action script changes to the SmarterChild Flash intro when you get back?" },
  ]],
  ['hoi', [
    { from: USERS['hoi'], message: "Every time I see your name pop up on Slack, I immediately hear REM in my head, so here's to wishing you a🎵 Shiny happy one year anniversary 🎵" },
  ]],
  ['ivy', [
    { from: USERS['ivy'], message: "hApPy OnE yEaR working with u has been so fun haha lol XD XD XD", attachments: [ivyAttachment] },
  ]],
]);
