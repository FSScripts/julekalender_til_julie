const year=2026;
const letters=[
['Velkommen, min musse','Glædelig 1. december, min dejlige musse ❤️ Jeg har lavet den her kalender til dig, fordi du fortjener lidt ekstra kærlighed. Jeg håber, den får dig til at smile hver dag.'],
['Sådan startede det','Tænk at det hele startede på Snapchat. Jeg er så glad for, at vi begyndte at skrive sammen, og at det endte med at blive os to.'],
['Dit smil','Jeg bliver aldrig træt af dit smil. Jeg elsker at se dig glad, især når det er mig, der får dig til at smile.'],
['En sang til dig','Når du hører den her sang, så tænk på os. ❤️',{type:'link',url:'https://suno.com/s/0XU62vuShF7qtDbF'}],
['Fem ting jeg elsker','Dit smil. Din personlighed. Hvor sød du er. Måden du behandler mig på. Og hvordan en helt almindelig dag bliver bedre sammen med dig.'],
['Vores første møde','Jeg tænker stadig tilbage på første gang, vi skulle mødes. Jeg ville gerne opleve den dag igen, nu hvor jeg ved, hvor meget du betyder for mig.'],
['Kom her, min Mulle','Mine yndlingskram er dem, hvor ingen af os har travlt med at give slip. Jeg glæder mig allerede til det næste. ❤️'],
['Mit yndlingsminde','Alle de små øjeblikke sammen med dig betyder noget for mig. Jeg glæder mig til at skabe endnu flere.'],
['En lille quiz','Hvor begyndte vores historie? Hvem har verdens dejligste smil? Og hvem elsker jeg? Du kender vist svarene, musse.'],
['Min fødselsdag','Min fødselsdag er et af mine yndlingsminder med dig. Jeg er så glad for, at vi kunne dele den dag.'],
['En lille hilsen','Jeg elsker dig, min Mulle, og jeg glæder mig allerede til næste gang, vi skal ses.'],
['Halvvejs','24 låger er slet ikke nok til alle de ting, jeg elsker ved dig. ❤️'],
['Min yndlingsperson','Vi behøver ikke lave noget særligt. Bare det at være sammen med dig gør mig glad.'],
['Smukke Julie','Jeg håber, du ved, hvor smuk du er i mine øjne, også på de dage hvor du ikke selv synes det.'],
['Tak for dig','Tak for måden du behandler mig på. Tak for at være så sød. Og mest af alt tak for bare at være dig.'],
['Vores fremtid','Jeg glæder mig til flere dates, fødselsdage, hyggelige aftener og alle de minder, vi endnu ikke har skabt.'],
['Til en dårlig dag','Du behøver ikke altid have overskud. Jeg elsker dig også på de mindre gode dage, min musse.'],
['Du bestemmer','Du vælger vores næste date: film og putning, en middag eller en hyggelig aftentur. Jeg glæder mig uanset hvad.'],
['Vores første måneder','Vores første seks måneder sammen har betydet utrolig meget for mig. Jeg håber, det bare er begyndelsen.'],
['En besked fra mig','Jeg er virkelig glad for at have dig som min kæreste. Jeg håber, du aldrig glemmer, hvor meget du betyder for mig.'],
['En decembertur med dig','Jeg glæder mig til at gå hånd i hånd med dig, mens julelysene er tændt. Det er sådan et lille øjeblik, jeg gerne vil have flere af med dig.'],
['Jeg ville vælge dig igen','Hvis jeg kunne gå tilbage til vores første samtale på Snapchat, ville jeg vælge dig igen.'],
['Lillejuleaften','Jeg håber, kalenderen har fået dig til at smile lidt ekstra. Selvom den snart slutter, stopper jeg ikke med at elske dig.'],
['Glædelig jul, min Mulle','Til min elskede Julie ❤️\n\nTænk at det hele startede med Snapchat. Fra vores første møde til min fødselsdag og alle de almindelige dage sammen er du blevet en utrolig vigtig del af mit liv.\n\nJeg elsker dit smil, din personlighed og måden du behandler mig på. Jeg glæder mig til alle vores kommende minder. Tak for at være min kæreste og for bare at være dig.\n\nJeg elsker dig, Julie. Glædelig jul.\nDin Tobias ❤️']
];
const gifts = {
  3: {
    title: 'En afslappende massage',
    description: 'Du vælger en aften, hvor du trænger til at slappe af. Jeg står for massagen, og du vælger musikken.'
  },
  7: {
    title: 'Uendelige kys og kram',
    description: 'Brug det, hver gang du trænger til et kys eller et langt kram. Gavekortet udløber aldrig. ♥'
  },
  10: {
    title: 'Morgenmad på sengen',
    description: 'Du vælger, hvad du har lyst til at spise. Jeg laver morgenmaden, og du bliver under dynen.'
  },
  12: {
    title: 'Filmaften med putning',
    description: 'Du vælger filmen, også hvis vi har set den før. Jeg sørger for snacks, tæppe og en plads helt tæt på mig.'
  },
  15: {
    title: 'En middag, du vælger',
    description: 'Du bestemmer menuen. Jeg laver maden, dækker bord og tager opvasken.'
  },
  18: {
    title: 'En date på dine præmisser',
    description: 'Fortæl mig, hvad du har lyst til at lave sammen. Jeg planlægger daten ud fra dit ønske.'
  },
  21: {
    title: 'Varm kakao og en vintertur',
    description: 'Vi går en tur og kigger på julelys, og jeg har varm kakao med til os begge.'
  },
  23: {
    title: 'En dans i stuen',
    description: 'Du vælger sangen. Jeg tænder et par stearinlys, og så danser vi sammen i stuen.'
  }
};

function localDate(now){const p=Object.fromEntries(new Intl.DateTimeFormat('en-GB',{timeZone:'Europe/Copenhagen',year:'numeric',month:'numeric',day:'numeric'}).formatToParts(now).map(x=>[x.type,x.value]));return Number(p.year)*10000+Number(p.month)*100+Number(p.day)}
export default async function(req){const now=new Date(),today=localDate(now),unlocked=Math.max(0,Math.min(24,today<year*10000+1201?0:today>year*10000+1224?24:today%100));const day=new URL(req.url).searchParams.get('day');const headers={'Cache-Control':'no-store','Content-Type':'application/json; charset=utf-8'};const send=(data,status=200)=>new Response(JSON.stringify(data),{status,headers});if(day===null)return send({unlocked,now:now.toISOString(),next:unlocked<24?new Date(Date.UTC(year,11,unlocked+1,-1)).toISOString():null});const n=Number(day);if(!Number.isInteger(n)||n<1||n>24)return send({error:'Ugyldig låge'},400);if(n>unlocked)return send({error:'Lågen er stadig låst ❤️'},403);const [title,message,media]=letters[n-1];return send({title,message,media,gift:gifts[n]});}
