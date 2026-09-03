/* ==========================================================================
   WOLFTYPE — HISTORICAL PASSAGE LIBRARY
   Original, historically-responsible educational writing.
   ========================================================================== */

const WT_PASSAGES = [
  {
    id: "p001", title: "The Code of Hammurabi", era: "Ancient World", category: "Mesopotamia",
    difficulty: "Intermediate", year: "-1754",
    text: "Around 1754 BCE, the Babylonian king Hammurabi ordered one of the earliest known legal codes to be carved into a towering stone stele. Nearly three hundred laws covered trade, property, family life, and criminal justice, each phrased as a direct consequence for a specific action. The code applied different penalties depending on the social standing of those involved, revealing a society organized into distinct classes. Scholars still study the stele today, not only as a legal artifact but as a window into how an early civilization tried to formalize fairness, however imperfect that fairness may have been by modern standards."
  },
  {
    id: "p002", title: "The Rise of the Roman Republic", era: "Ancient World", category: "Rome",
    difficulty: "Intermediate", year: "-509",
    text: "After the last Roman king was overthrown in 509 BCE, the city's leading families established a republic built around shared power and elected offices. Two consuls, chosen annually, held executive authority but could check one another through mutual veto. The Senate, composed largely of aristocrats, advised policy and controlled finances, while popular assemblies gave ordinary citizens a voice in choosing magistrates and passing laws. Over the following centuries, this system expanded to govern a growing Mediterranean territory, though tension between patricians and plebeians repeatedly forced reforms that gradually broadened political participation across Roman society."
  },
  {
    id: "p003", title: "Democracy in Ancient Athens", era: "Ancient World", category: "Greece",
    difficulty: "Beginner", year: "-508",
    text: "In 508 BCE, the reformer Cleisthenes reorganized Athenian society into ten tribes that cut across old family and regional loyalties. This restructuring gave rise to a system in which male citizens could speak and vote directly in the assembly, propose new laws, and serve on juries chosen by lot. Positions of civic responsibility rotated frequently, which limited any single person's ability to accumulate lasting power. Although the system excluded women, enslaved people, and foreigners, it introduced ideas about civic participation that later thinkers and governments would study, adapt, and reference for more than two thousand years."
  },
  {
    id: "p004", title: "Egypt and the Nile", era: "Ancient World", category: "Egypt",
    difficulty: "Beginner", year: "-3100",
    text: "Ancient Egyptian civilization grew almost entirely around the rhythms of the Nile River. Each year, seasonal floods deposited rich black silt across the floodplain, allowing farmers to grow surplus grain in an otherwise arid region. This predictable abundance supported a centralized state, skilled artisans, and a class of scribes who recorded harvests, taxes, and religious rituals. The river also served as the primary highway for trade and communication, linking Upper and Lower Egypt into a single kingdom under the authority of a pharaoh who was regarded as a divine intermediary between the gods and the Egyptian people."
  },
  {
    id: "p005", title: "The Persian Royal Road", era: "Ancient World", category: "Persia",
    difficulty: "Intermediate", year: "-500",
    text: "The Achaemenid Persian Empire, at its height, stretched from the Aegean Sea to the Indus Valley, and holding such a vast territory together required an extraordinary communication system. King Darius I commissioned the Royal Road, a highway stretching roughly two thousand five hundred kilometers, punctuated by way-stations where messengers could exchange tired horses for fresh ones. Herodotus marveled that royal couriers could cross the entire route in about a week, a pace that seemed almost supernatural to travelers of the era. This infrastructure allowed Persian administrators to govern a diverse, multiethnic empire with a speed no predecessor had achieved."
  },
  {
    id: "p101", title: "Charlemagne and the Carolingian Renaissance", era: "Medieval World", category: "Medieval Europe",
    difficulty: "Intermediate", year: "800",
    text: "When Charlemagne was crowned Holy Roman Emperor on Christmas Day in the year 800, he ruled over a kingdom stitched together from former Roman provinces and Germanic territories. Rather than focusing solely on conquest, he invested heavily in education, inviting scholars such as Alcuin of York to his court to revive learning that had languished since the fall of Rome. Monasteries were instructed to copy classical texts, standardize handwriting, and establish schools. This cultural investment, later called the Carolingian Renaissance, preserved countless ancient manuscripts that might otherwise have been lost, quietly shaping the intellectual foundation of medieval Europe."
  },
  {
    id: "p102", title: "The Islamic Golden Age", era: "Medieval World", category: "Islamic Golden Age",
    difficulty: "Advanced", year: "830",
    text: "In Baghdad during the ninth century, the Abbasid caliphate established the House of Wisdom, a research institution where scholars translated Greek, Persian, and Indian texts into Arabic while producing original work in mathematics, medicine, and astronomy. Al-Khwarizmi's writings on algebra introduced systematic methods for solving equations, and his name eventually gave rise to the word algorithm. Physicians such as Ibn Sina compiled medical encyclopedias that European universities would use for centuries. This period demonstrates how translation and cross-cultural exchange, rather than isolated genius alone, can accelerate the growth of human knowledge across generations."
  },
  {
    id: "p103", title: "The Mongol Empire's Reach", era: "Medieval World", category: "Mongol Empire",
    difficulty: "Advanced", year: "1206",
    text: "After unifying the Mongolian steppes in 1206, Genghis Khan built an empire that would eventually become the largest contiguous land empire in history, stretching from the Pacific coast to Eastern Europe. Mongol strategy relied on disciplined cavalry, coordinated messaging, and a willingness to adopt useful technologies from conquered peoples. Beneath the empire's fearsome reputation for warfare lay a surprisingly stable trade network. The so-called Pax Mongolica allowed merchants, missionaries, and travelers such as Marco Polo to move along the Silk Road with relative safety, accelerating the exchange of goods, ideas, and diseases across Eurasia."
  },
  {
    id: "p104", title: "Byzantium: Rome's Eastern Heir", era: "Medieval World", category: "Byzantine Empire",
    difficulty: "Intermediate", year: "330",
    text: "When Emperor Constantine relocated the capital of the Roman Empire to the ancient city of Byzantium in 330, he unknowingly set the stage for a civilization that would outlast Rome itself by nearly a thousand years. Renamed Constantinople, the city became a fortified crossroads between Europe and Asia, defended by massive walls and enriched by control over lucrative trade routes. Byzantine emperors preserved Roman law, Greek scholarship, and Orthodox Christian tradition, codifying legal principles under Justinian that would later influence European legal systems long after Constantinople itself fell to Ottoman forces in 1453."
  },
  {
    id: "p105", title: "Song Dynasty Innovation", era: "Medieval World", category: "Medieval Asia",
    difficulty: "Intermediate", year: "960",
    text: "The Song Dynasty, which governed China from 960 onward, presided over a remarkable era of technological and economic innovation. Movable type printing accelerated the spread of literature and civil service examination materials, while advances in agriculture, including fast-ripening rice strains, supported rapid population growth. Song China also pioneered the widespread use of paper currency, easing the burdens of long-distance trade. Despite frequent military pressure from northern neighbors, the dynasty's cities flourished as centers of commerce, scholarship, and craftsmanship, producing porcelain and silk that traveled along trade routes reaching as far as East Africa and the Middle East."
  },
  {
    id: "p201", title: "The Renaissance Reawakening", era: "Early Modern", category: "Renaissance",
    difficulty: "Intermediate", year: "1450",
    text: "Beginning in the city-states of Italy during the fourteenth century, the Renaissance marked a deliberate return to classical ideals of art, philosophy, and human potential. Wealthy patrons such as the Medici family in Florence funded artists like Botticelli and later Michelangelo, whose work combined technical precision with emotional depth. Scholars rediscovered ancient Greek and Roman texts, fueling a philosophy known as humanism that celebrated individual achievement and rational inquiry. The invention of the printing press around 1450 by Johannes Gutenberg then allowed these ideas to spread across Europe far faster than handwritten manuscripts ever could."
  },
  {
    id: "p202", title: "Luther and the Reformation", era: "Early Modern", category: "Reformation",
    difficulty: "Intermediate", year: "1517",
    text: "In 1517, a German monk named Martin Luther publicly challenged the sale of indulgences by the Catholic Church, arguing that salvation could not be purchased through payment. His ninety-five theses, reportedly posted on a church door in Wittenberg, quickly spread thanks to the printing press, transforming a local theological dispute into a continent-wide movement. Luther's insistence that scripture, translated into everyday language, should guide personal faith undermined centuries of institutional authority. The resulting Reformation fractured Western Christianity into competing denominations and reshaped the political map of Europe for generations to come."
  },
  {
    id: "p203", title: "Newton and the Scientific Revolution", era: "Early Modern", category: "Scientific Revolution",
    difficulty: "Advanced", year: "1687",
    text: "When Isaac Newton published his Principia Mathematica in 1687, he offered a mathematical framework describing motion and gravitation that unified observations from falling apples to orbiting planets. His work built upon earlier breakthroughs by Copernicus, Kepler, and Galileo, each of whom had chipped away at the older Aristotelian worldview through careful observation and calculation. Newton's laws suggested that the universe operated according to consistent, discoverable rules rather than mysterious or arbitrary forces. This shift toward empirical reasoning and mathematical proof became a defining feature of the Scientific Revolution and laid groundwork for modern physics."
  },
  {
    id: "p204", title: "Magellan's Voyage Around the World", era: "Early Modern", category: "Age of Exploration",
    difficulty: "Intermediate", year: "1519",
    text: "In 1519, Portuguese navigator Ferdinand Magellan set sail with five ships under the Spanish crown, seeking a westward route to the spice-rich islands of Southeast Asia. The expedition endured mutiny, starvation, and treacherous straits near the southern tip of South America before crossing the vast Pacific Ocean. Magellan himself was killed in the Philippines in 1521, but one surviving ship, the Victoria, eventually completed the circumnavigation in 1522 under Juan Sebastián Elcano's command. The voyage offered definitive proof of the Earth's spherical shape and the staggering scale of the world's oceans."
  },
  {
    id: "p301", title: "The Industrial Revolution Begins", era: "Modern History", category: "Industrial Revolution",
    difficulty: "Intermediate", year: "1760",
    text: "Starting in Britain around 1760, a wave of mechanical innovation transformed how goods were produced, moving manufacturing from scattered home workshops into centralized factories powered by water and later steam. James Watt's improvements to the steam engine allowed machinery to run independent of rivers, enabling factories to spring up wherever labor and capital converged. Textile production, once slow and largely manual, accelerated dramatically through inventions like the spinning jenny and power loom. This industrial shift reshaped daily life, drawing millions from rural farms into rapidly growing cities in search of factory work."
  },
  {
    id: "p302", title: "Trench Warfare in the Great War", era: "Modern History", category: "World War I",
    difficulty: "Advanced", year: "1914",
    text: "When the First World War erupted in 1914, military commanders on both sides expected a short, decisive conflict similar to previous European wars. Instead, machine guns, barbed wire, and artillery turned the Western Front into a stalemate of trenches stretching from the North Sea to the Swiss border. Soldiers endured mud, disease, and near-constant bombardment while gaining only meters of ground at devastating cost. New technologies, including poison gas, tanks, and aircraft, entered combat for the first time, foreshadowing the mechanized destruction that would define twentieth-century warfare and leaving a generation permanently marked by the experience."
  },
  {
    id: "p303", title: "D-Day and the Normandy Landings", era: "Modern History", category: "World War II",
    difficulty: "Advanced", year: "1944",
    text: "On the sixth of June, 1944, Allied forces launched the largest seaborne invasion in military history along the beaches of Normandy, France. Under the overall command of General Dwight Eisenhower, roughly one hundred fifty thousand troops crossed the English Channel under cover of extensive naval bombardment and airborne operations behind German lines. Despite heavy casualties, particularly at Omaha Beach, the operation established a crucial foothold in Western Europe. Within months, Allied forces liberated Paris, and the successful landing is widely regarded as a turning point that hastened the eventual defeat of Nazi Germany."
  },
  {
    id: "p304", title: "The Berlin Airlift", era: "Modern History", category: "Cold War",
    difficulty: "Intermediate", year: "1948",
    text: "In 1948, the Soviet Union blockaded all road, rail, and canal access to West Berlin, hoping to force the Western Allies to abandon the divided city. Rather than retreating, the United States and Britain organized an extraordinary airlift, flying food, coal, and medicine into the city around the clock. Pilots landed aircraft at Tempelhof Airport at a rate of nearly one plane every few minutes during peak operations. After eleven months and more than two hundred thousand flights, the Soviets lifted the blockade, and the episode became an early symbol of Cold War resolve and logistical determination."
  },
  {
    id: "p305", title: "Apollo 11 and the Space Race", era: "Modern History", category: "Space Race",
    difficulty: "Intermediate", year: "1969",
    text: "On July 20, 1969, astronaut Neil Armstrong stepped onto the lunar surface, fulfilling a goal President Kennedy had set eight years earlier of landing a human being on the Moon before the decade's end. The Apollo 11 mission represented the culmination of an intense technological rivalry between the United States and the Soviet Union, one that had begun with the launch of Sputnik in 1957. Armstrong's words, describing the moment as a giant leap, were broadcast to hundreds of millions of viewers worldwide. The mission demonstrated engineering ambition on a scale rarely attempted before or since."
  },
  {
    id: "p401", title: "The Silk Road and Chinese Trade", era: "Civilizations", category: "Chinese civilization",
    difficulty: "Intermediate", year: "-130",
    text: "For nearly two thousand years, a sprawling network of overland and maritime routes connected China to Central Asia, India, Persia, and the Mediterranean world. Chinese silk, prized for its texture and rarity, traveled westward alongside porcelain and tea, while merchants carried glassware, spices, and horses eastward in return. Beyond goods, the Silk Road facilitated the spread of Buddhism into China, along with technologies such as papermaking. Han Dynasty diplomat Zhang Qian's expeditions in the second century BCE helped establish early connections that would grow into one of history's most influential systems of long-distance exchange."
  },
  {
    id: "p402", title: "The Mauryan Empire and Ashoka", era: "Civilizations", category: "Indian civilization",
    difficulty: "Intermediate", year: "-268",
    text: "The Mauryan Empire, founded by Chandragupta Maurya around 321 BCE, eventually unified most of the Indian subcontinent under a single administration for the first time. His grandson, Ashoka, initially expanded the empire through brutal conquest, but after witnessing the devastation of the Kalinga War, he embraced Buddhist principles and renounced further military expansion. Ashoka had edicts carved on pillars and rock faces across his territory, promoting nonviolence, religious tolerance, and welfare programs for his subjects. These inscriptions remain among the earliest surviving examples of a ruler publicly committing to ethical governance."
  },
  {
    id: "p403", title: "The Ottoman Conquest of Constantinople", era: "Civilizations", category: "Ottoman Empire",
    difficulty: "Advanced", year: "1453",
    text: "In 1453, Sultan Mehmed II led Ottoman forces in a prolonged siege of Constantinople, the last remnant of the Byzantine Empire. Ottoman engineers deployed massive cannons designed by the Hungarian engineer Orban, capable of battering walls that had withstood attackers for over a thousand years. After weeks of bombardment, the city finally fell, marking both the end of the Byzantine Empire and the beginning of Constantinople's transformation into Istanbul, the Ottoman capital. The conquest gave the Ottomans control over vital trade routes between Europe and Asia, cementing their status as a major world power."
  },
  {
    id: "p406", title: "Suleiman the Magnificent's Golden Age", era: "Civilizations", category: "Ottoman Empire",
    difficulty: "Advanced", year: "1520",
    text: "Sultan Suleiman I, who ruled the Ottoman Empire from 1520 to 1566, presided over what historians often call its golden age. Known in the West as Suleiman the Magnificent and among his own subjects as Kanuni, or the Lawgiver, he reformed the empire's legal and administrative codes while extending Ottoman territory across three continents. His reign brought together military conquest and cultural flourishing in equal measure, as poets, historians, and miniature painters found generous patronage at his court. Under his rule, Istanbul grew into one of the largest and most cosmopolitan cities on Earth, home to Muslims, Christians, and Jews living under a single imperial administration."
  },
  {
    id: "p407", title: "Mimar Sinan and Ottoman Architecture", era: "Civilizations", category: "Ottoman Empire",
    difficulty: "Intermediate", year: "1550",
    text: "Mimar Sinan, chief architect to three Ottoman sultans during the sixteenth century, transformed the empire's skyline through mosques, bridges, and public works engineered with remarkable structural precision. His masterpiece, the Selimiye Mosque in Edirne, features a vast central dome supported by eight pillars, a design he considered the culmination of decades spent solving the same architectural problem that had challenged the builders of the Byzantine Hagia Sophia centuries earlier. Sinan is credited with over three hundred structures across the empire, and his systematic approach to proportion and load-bearing design influenced Ottoman architecture for generations after his death."
  },
  {
    id: "p103b", title: "Ibn Battuta's Travels Across the Islamic World", era: "Medieval World", category: "Islamic Golden Age",
    difficulty: "Advanced", year: "1325",
    text: "Setting out from Tangier in 1325 on a pilgrimage to Mecca, the Moroccan scholar Ibn Battuta ended up traveling for nearly thirty years, covering distances far greater than his contemporary Marco Polo. His journey carried him through North Africa, the Arabian Peninsula, Persia, India, and as far as China, largely following networks of trade and scholarship that connected the medieval Islamic world. Ibn Battuta served as a judge in several courts along the way and later dictated an account of his travels, the Rihla, which remains one of the richest surviving records of fourteenth-century society, describing customs, rulers, and cities across three continents in vivid detail."
  },
  {
    id: "p108", title: "Cordoba and Islamic Spain", era: "Medieval World", category: "Islamic Golden Age",
    difficulty: "Intermediate", year: "950",
    text: "By the tenth century, the city of Cordoba in Islamic Spain, known as Al-Andalus, had grown into one of the largest and most sophisticated cities in Europe, with paved streets, public libraries, and running water at a time when much of the continent lacked such infrastructure. Under the Umayyad Caliphate, Cordoba became a center of learning where Muslim, Jewish, and Christian scholars worked within the same intellectual tradition, translating and expanding upon Greek philosophy, medicine, and mathematics. The philosopher Averroes, born in Cordoba in the twelfth century, wrote influential commentaries on Aristotle that later shaped scholastic thought across medieval Christian Europe."
  },
  {
    id: "p404", title: "The Kingdom of Great Zimbabwe", era: "Civilizations", category: "African kingdoms",
    difficulty: "Intermediate", year: "1100",
    text: "Between roughly 1100 and 1450, the Kingdom of Great Zimbabwe flourished in southeastern Africa, leaving behind massive stone structures built without mortar, an engineering achievement that still impresses visitors today. The city served as a hub for trade in gold, ivory, and cattle, connecting inland Africa to coastal Swahili trading cities and, through them, to markets in Arabia, India, and China. Archaeological finds including Chinese porcelain and Persian ceramics reveal how deeply integrated this African kingdom was within global trade networks, challenging outdated assumptions that pre-colonial Africa existed in isolation from the wider world."
  },
  {
    id: "p405", title: "The Aztec Capital of Tenochtitlan", era: "Civilizations", category: "Mesoamerican civilizations",
    difficulty: "Advanced", year: "1325",
    text: "Founded around 1325 on an island in Lake Texcoco, Tenochtitlan grew into one of the largest cities in the world by the early sixteenth century, home to perhaps two hundred thousand residents. The Aztecs engineered an intricate system of causeways, canals, and chinampas, artificial floating gardens that produced abundant harvests despite the city's lake-bound location. Elaborate temples, marketplaces, and aqueducts impressed the Spanish conquistadors who arrived in 1519, with soldier Bernal Díaz del Castillo later writing that the city's grandeur seemed almost unbelievable. Tenochtitlan's ruins today lie beneath modern Mexico City."
  },
  {
    id: "p501", title: "Cleopatra: The Last Pharaoh", era: "People", category: "Historical Figures",
    difficulty: "Intermediate", year: "-51",
    text: "Cleopatra VII ascended to the throne of Egypt in 51 BCE, inheriting a kingdom weakened by internal strife and growing Roman influence. Fluent in multiple languages and skilled in diplomacy, she formed political and personal alliances with two of Rome's most powerful figures, Julius Caesar and later Mark Antony, in an effort to preserve Egyptian independence. Her reign combined genuine administrative skill with careful self-presentation, portraying herself as a living embodiment of the goddess Isis. Following her defeat alongside Antony at the Battle of Actium in 31 BCE, Egypt was absorbed into the Roman Empire, ending three thousand years of pharaonic rule."
  },
  {
    id: "p502", title: "Marie Curie's Pioneering Research", era: "People", category: "Historical Figures",
    difficulty: "Intermediate", year: "1898",
    text: "Working in a converted shed with minimal equipment, Marie Curie and her husband Pierre discovered the elements polonium and radium in 1898, coining the term radioactivity to describe the phenomenon they observed. Curie became the first woman to win a Nobel Prize and remains the only person to win Nobel Prizes in two different scientific fields, physics and chemistry. Her research laid groundwork for future advances in cancer treatment and nuclear physics, though prolonged exposure to radioactive materials ultimately contributed to her death. Curie's notebooks remain radioactive today and are stored in lead-lined boxes for safety."
  },
  {
    id: "p503", title: "Mansa Musa's Legendary Pilgrimage", era: "People", category: "Historical Figures",
    difficulty: "Intermediate", year: "1324",
    text: "Mansa Musa ruled the Mali Empire during the fourteenth century, a period when West African trade in gold and salt generated extraordinary wealth. In 1324, he embarked on a pilgrimage to Mecca accompanied by a caravan reportedly including thousands of attendants and enormous quantities of gold, which he distributed generously along the route. His spending in Cairo was so substantial that it reportedly disrupted local gold prices for years afterward. The journey drew European and Middle Eastern attention to Mali, and Musa later appeared on medieval maps as a powerful ruler, cementing his empire's reputation as a center of wealth and Islamic scholarship."
  },
  {
    id: "p601", title: "Gutenberg and the Printing Revolution", era: "Science & Technology", category: "Inventions",
    difficulty: "Intermediate", year: "1440",
    text: "Around 1440, Johannes Gutenberg in the German city of Mainz developed a printing press using movable metal type, oil-based ink, and a modified wine press mechanism. Before this innovation, books were painstakingly copied by hand, making them rare and expensive. Gutenberg's technology allowed identical pages to be reproduced quickly and consistently, dramatically lowering the cost of books over subsequent decades. His most famous production, a Latin Bible, demonstrated the technical quality achievable with the new process. Within fifty years, printing presses operated across hundreds of European cities, fueling literacy, scientific exchange, and religious reform."
  },
  {
    id: "p602", title: "The Wright Brothers Take Flight", era: "Science & Technology", category: "Inventions",
    difficulty: "Beginner", year: "1903",
    text: "On December 17, 1903, near Kitty Hawk, North Carolina, Orville and Wilbur Wright achieved the first sustained, controlled flight of a powered aircraft. Their success followed years of methodical experimentation with gliders, wind tunnels, and propeller designs, conducted while running a bicycle shop in Dayton, Ohio. The first flight covered just over one hundred twenty feet and lasted twelve seconds, a modest distance by later standards but a monumental technical achievement at the time. Their careful engineering approach, emphasizing control over raw power, distinguished their work from earlier, less successful aviation attempts around the world."
  },
  {
    id: "p603", title: "The Discovery of Penicillin", era: "Science & Technology", category: "Science",
    difficulty: "Intermediate", year: "1928",
    text: "In 1928, Scottish bacteriologist Alexander Fleming returned from vacation to find that a stray mold had contaminated one of his petri dishes, killing the surrounding bacteria. Rather than discarding the sample, Fleming investigated further and identified the mold as Penicillium, isolating a substance he called penicillin. It took over a decade, and the efforts of researchers Howard Florey and Ernst Chain, to transform Fleming's observation into a mass-produced antibiotic. By the 1940s, penicillin was saving countless lives on World War II battlefields, marking the beginning of the modern antibiotic era in medicine."
  },
  {
    id: "p604", title: "ARPANET and the Birth of the Internet", era: "Science & Technology", category: "Technology",
    difficulty: "Advanced", year: "1969",
    text: "In 1969, researchers funded by the United States Department of Defense connected computers at four universities to form ARPANET, a network designed to allow resource sharing and survive partial outages without central control. The first message, sent between UCLA and Stanford, famously crashed the system after only two letters were transmitted. Over the following two decades, protocols like TCP/IP standardized how different networks could communicate with one another, eventually merging into what became the modern internet. What began as a modest research experiment evolved into infrastructure that now underpins global communication, commerce, and culture."
  },
];

const WT_TIMELINE = [
  { year: "3100 BCE", title: "Unification of Egypt", passageId: "p004" },
  { year: "508 BCE", title: "Birth of Athenian Democracy", passageId: "p003" },
  { year: "27 BCE", title: "Founding of the Roman Empire", passageId: "p002" },
  { year: "330", title: "Constantinople Founded", passageId: "p104" },
  { year: "800", title: "Charlemagne Crowned Emperor", passageId: "p101" },
  { year: "950", title: "Cordoba, Capital of Islamic Spain", passageId: "p108" },
  { year: "1206", title: "Rise of the Mongol Empire", passageId: "p103" },
  { year: "1325", title: "Ibn Battuta Begins His Travels", passageId: "p103b" },
  { year: "1440", title: "Gutenberg's Printing Press", passageId: "p601" },
  { year: "1453", title: "Ottoman Conquest of Constantinople", passageId: "p403" },
  { year: "1517", title: "The Protestant Reformation", passageId: "p202" },
  { year: "1520", title: "Suleiman the Magnificent's Golden Age", passageId: "p406" },
  { year: "1550", title: "Mimar Sinan's Ottoman Architecture", passageId: "p407" },
  { year: "1760", title: "Industrial Revolution Begins", passageId: "p301" },
  { year: "1914", title: "The First World War", passageId: "p302" },
  { year: "1944", title: "D-Day Landings", passageId: "p303" },
  { year: "1969", title: "Apollo 11 Moon Landing", passageId: "p305" },
];

const WT_QUOTES = [
  { id: "q1", text: "The only thing we have to fear is fear itself.", source: "Franklin D. Roosevelt, 1933" },
  { id: "q2", text: "That's one small step for man, one giant leap for mankind.", source: "Neil Armstrong, 1969" },
  { id: "q3", text: "I have not failed. I've just found ten thousand ways that won't work.", source: "Thomas Edison" },
  { id: "q4", text: "Give me liberty, or give me death.", source: "Patrick Henry, 1775" },
  { id: "q5", text: "In the middle of difficulty lies opportunity.", source: "Albert Einstein" },
  { id: "q6", text: "History is written by the victors, but understood by those who question it.", source: "WolfType Editorial" },
  { id: "q7", text: "Veni, vidi, vici.", source: "Julius Caesar, 47 BCE" },
  { id: "q8", text: "Well behaved women seldom make history.", source: "Laurel Thatcher Ulrich" },
];

const WT_COMMON_WORDS = "the of and to in a is that for it as was with be by on not he this are or his from at which but have an they she you we her all their there been if more when will would who so no out up one time year work first way even new want because any these give day most us".split(" ");
