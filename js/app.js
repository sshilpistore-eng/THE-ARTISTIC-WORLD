/* ---------- Shared chrome: header + footer ---------- */
const PAGES = [
  ['index.html','Home'],['history.html','History'],['artists.html','Artists'],
  ['colorlab.html','Color Lab'],['world.html','World Artist'],['account.html','Account']
];

function renderHeader(active){
  const links = PAGES.map(([href,label]) =>
    `<a href="${href}" class="${active===href?'active':''}">${label}</a>`).join('');
  document.getElementById('siteHeader').innerHTML = `
    <nav class="wrap">
      <a href="index.html" class="brand"><img src="assets/logo.png" alt="The Artist World logo">The Artist World</a>
      <ul class="navlinks" id="navlinks">${links}</ul>
      <div class="navtools">
        <button id="themeToggle" aria-label="Toggle dark mode">🌙</button>
        <a class="btn-mini" href="account.html">Account</a>
      </div>
      <button class="hamburger" id="hamburger" aria-label="Menu">☰</button>
    </nav>`;
  document.getElementById('hamburger').addEventListener('click', ()=>{
    document.getElementById('navlinks').classList.toggle('open');
  });
  const themeBtn = document.getElementById('themeToggle');
  const root = document.documentElement;
  if(localStorage.getItem('aw_theme')==='dark'){root.setAttribute('data-theme','dark');themeBtn.textContent='☀️';}
  themeBtn.addEventListener('click', ()=>{
    const dark = root.getAttribute('data-theme')==='dark';
    root.setAttribute('data-theme', dark?'light':'dark');
    localStorage.setItem('aw_theme', dark?'light':'dark');
    themeBtn.textContent = dark?'🌙':'☀️';
  });
}

function renderFooter(){
  document.getElementById('siteFooter').innerHTML = `
    <div class="wrap">
      <div class="foot-grid">
        <div><h5>Explore</h5><ul><li><a href="history.html">History</a></li><li><a href="artists.html">Artists</a></li><li><a href="colorlab.html">Color Lab</a></li></ul></div>
        <div><h5>Community</h5><ul><li><a href="world.html">World Artist</a></li><li><a href="account.html">My Account</a></li></ul></div>
        <div><h5>Resources</h5><ul><li>Glossary</li><li>Tutorials</li><li>Newsletter</li></ul></div>
        <div><h5>About</h5><ul><li>About Us</li><li>Contact</li><li>Privacy Policy</li></ul></div>
      </div>
      <div class="foot-bottom">
        <span>Made for people who love to create.</span>
        <span>© The Artist World</span>
      </div>
    </div>`;
}

/* ---------- Intro loader (logo animation) ---------- */
function runIntroLoader(){
  const el = document.getElementById('introLoader');
  if(!el) return;
  setTimeout(()=>{ el.classList.add('hide'); setTimeout(()=>el.remove(),700); }, 900);
}

/* ---------- Scroll reveal ---------- */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target); } });
  }, {threshold:.15});
  items.forEach(i=>io.observe(i));
}

/* ---------- Data store (localStorage-backed demo "database") ---------- */
const Store = {
  key(k){return 'aw_'+k;},
  get(k, fallback){
    const raw = localStorage.getItem(this.key(k));
    if(raw===null){ this.set(k, fallback); return fallback; }
    try{ return JSON.parse(raw); }catch(e){ return fallback; }
  },
  set(k, val){ localStorage.setItem(this.key(k), JSON.stringify(val)); }
};

const SEED_POSTS = [
  {id:'p1', name:'Maya Chen', caption:'Trying gouache for the first time — cloud study over the harbor.', likes:14, liked:false, comments:[{n:'Theo R.',t:'That sky is gorgeous!'}], reposts:2},
  {id:'p2', name:'Diego Alvarez', caption:'Day 6 of the sketchbook challenge: a stranger on the metro.', likes:9, liked:false, comments:[], reposts:0},
  {id:'p3', name:'Priya Nair', caption:'Color study exploring split-complementary palettes.', likes:21, liked:false, comments:[{n:'Maya Chen',t:'Love this palette.'}], reposts:5},
  {id:'p4', name:'Sam O.', caption:'Charcoal portrait, 40 minutes, no reference.', likes:31, liked:false, comments:[], reposts:1}
];

const SEED_ARTISTS = [
  {name:"Leonardo da Vinci", era:"1452–1519 · High Renaissance", country:"Italy", work:"Mona Lisa", movement:"Renaissance", bio:"Painter, engineer and anatomist whose notebooks fused art and close observation of the natural world. His painted works are few but among the most studied in history."},
  {name:"Vincent van Gogh", era:"1853–1890 · Post-Impressionism", country:"Netherlands", work:"The Starry Night", movement:"Post-Impressionism", bio:"Known for expressive brushwork and saturated color, most of his best-known paintings date from the final two years of his life."},
  {name:"Frida Kahlo", era:"1907–1954 · Modern", country:"Mexico", work:"The Two Fridas", movement:"Modernism / Surrealism", bio:"Painted searching self-portraits that drew on Mexican folk tradition, her own physical pain, and personal identity."},
  {name:"Katsushika Hokusai", era:"1760–1849 · Edo period", country:"Japan", work:"The Great Wave off Kanagawa", movement:"Ukiyo-e", bio:"A woodblock print master whose Thirty-Six Views of Mount Fuji shaped how the West came to see Japanese art."},
  {name:"Georgia O'Keeffe", era:"1887–1986 · American Modernism", country:"United States", work:"Jimson Weed/White Flower No. 1", movement:"American Modernism", bio:"Known for large-scale flower paintings and the New Mexico desert landscapes she painted for decades."},
  {name:"Rembrandt van Rijn", era:"1606–1669 · Dutch Golden Age", country:"Netherlands", work:"The Night Watch", movement:"Baroque", bio:"A master of light and shadow, and one of history's most prolific self-portraitists, charting his own face across four decades."},
  {name:"Claude Monet", era:"1840–1926 · Impressionism", country:"France", work:"Impression, Sunrise", movement:"Impressionism", bio:"A founder of Impressionism, best known for his repeated studies of water lilies, haystacks and light at different times of day."},
  {name:"Pablo Picasso", era:"1881–1973 · Cubism / Modern", country:"Spain", work:"Les Demoiselles d'Avignon", movement:"Cubism", bio:"Co-founder of Cubism, he worked across painting, sculpture and ceramics over an unusually long and varied career."}
];

const SEED_HISTORY = [
  {period:"Prehistoric Art", range:"c. 40,000–4,000 BCE", body:"Cave paintings, carved figurines and rock engravings made with mineral pigments, found from Indonesia to France. The earliest known evidence of humans representing the world around them."},
  {period:"Ancient Egyptian Art", range:"c. 3,100–30 BCE", body:"Art tied closely to religion and the afterlife: tomb painting, relief carving and sculpture followed strict conventions of proportion and pose for over two thousand years."},
  {period:"Ancient Greek & Roman Art", range:"c. 900 BCE–400 CE", body:"Greek sculpture developed increasingly naturalistic anatomy and proportion; Roman art absorbed Greek style while adding portraiture, mosaic and large-scale fresco."},
  {period:"Medieval Art", range:"c. 500–1400", body:"Religious art dominated European production — illuminated manuscripts, stained glass and Byzantine mosaics, generally favoring symbolic over naturalistic representation."},
  {period:"Renaissance", range:"c. 1400–1600", body:"A revival of classical ideals in Italy and beyond, marked by linear perspective, anatomical study and artists such as Leonardo, Michelangelo and Raphael."},
  {period:"Baroque", range:"c. 1600–1750", body:"Dramatic contrasts of light and shadow, movement and emotional intensity, seen in the work of Caravaggio, Rembrandt and Rubens."},
  {period:"Rococo", range:"c. 1720–1780", body:"A lighter, ornamental style favoring pastel colors, playful subject matter and asymmetry, popular in French court art."},
  {period:"Neoclassicism", range:"c. 1750–1850", body:"A return to classical restraint and moral seriousness, partly in reaction against Rococo excess, influenced by renewed interest in Greco-Roman antiquity."},
  {period:"Romanticism", range:"c. 1780–1850", body:"Emphasis on emotion, nature and the sublime over classical order, seen in the work of Turner, Delacroix and Goya."},
  {period:"Realism", range:"c. 1840–1880", body:"A turn toward everyday subjects and working-class life, painted without idealization, led by artists such as Gustave Courbet."},
  {period:"Impressionism", range:"c. 1860–1890", body:"Loose brushwork and a focus on capturing light and momentary perception, often painted outdoors, pioneered by Monet, Renoir and Degas."},
  {period:"Post-Impressionism", range:"c. 1880–1905", body:"Building on Impressionist color while pursuing more personal, structural or symbolic aims — Van Gogh, Cézanne and Seurat each took a distinct path."},
  {period:"Modern Art", range:"c. 1900–1970", body:"A period of rapid experimentation spanning Cubism, Surrealism, Abstract Expressionism and more, as artists questioned representation itself."},
  {period:"Contemporary Art", range:"c. 1970–present", body:"A pluralistic, global era with no single dominant style, incorporating new media, installation, digital art and diverse cultural perspectives."}
];
