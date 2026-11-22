import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";
import "./App.css";

const raw = [
  [
    "malkovich",
    "front",
    "成为约翰·马尔科维奇",
    "Being John Malkovich",
    "1999",
    "113 分钟",
    0,
    0,
    "爱一个人，无关她身在哪副躯壳",
  ],
  [
    "apex",
    "front",
    "巅峰猎杀",
    "Apex",
    "待确认",
    "—",
    0,
    1,
    "我们不把谋杀叫做献祭\n我们不把沉湎叫做信仰",
  ],
  [
    "hero",
    "front",
    "英雄百夜",
    "The 100 Nights of Hero",
    "2025",
    "—",
    0,
    2,
    "Story survives,\n\nStory salvages,\n\nStory spreads,\n\nStory sublimes.",
  ],
  [
    "girl-king",
    "front",
    "年轻的女王",
    "The Girl King",
    "2015",
    "106 分钟",
    0,
    3,
    "克里斯蒂娜是我当年的理想型。",
  ],
  [
    "annihilation",
    "front",
    "湮灭",
    "Annihilation",
    "2018",
    "115 分钟",
    1,
    0,
    "To the lighthouse,\n\nTo atonement,\n\nTo annihilation.\n\n当你死前的绝望\n成为了你唯一幸存下来的一部分\n当死亡不是终结\n而是在杀死你的那副躯体上绵延\n湮灭即是重生\n自毁即是永生",
    "https://movie.douban.com/subject/26384741/",
  ],
  [
    "orlando",
    "front",
    "奥兰多",
    "Orlando",
    "1992",
    "94 分钟",
    1,
    1,
    "作为过男人与女人\n困缚于曾经的自由\n遍览了过去与未来\n见证了破碎与流动\n经历了死亡与重生\n\n伍尔夫的《奥兰多》被誉为「二十世纪最长的情书」\n最深情的告白便是\n赋予笔下的爱人\n以时间\n以不朽\n以不朽的时间",
  ],
  [
    "oceans8",
    "front",
    "瞒天过海：美人计",
    "Ocean's Eight",
    "2018",
    "110 分钟",
    1,
    2,
    "其实都无所谓，就是把好莱坞最有名最好看的 8 个女演员请过来当特工了。",
  ],
  [
    "fury-road",
    "front",
    "疯狂的麦克斯：狂暴之路",
    "Mad Max: Fury Road",
    "2015",
    "120 分钟",
    1,
    3,
    "走过这狂暴之路是\n髓换骨般的一场赎罪\n但是总有名为希望的基因\n永随你我一路驰骋",
  ],
  [
    "atomic",
    "front",
    "极寒之城",
    "Atomic Blonde",
    "2017",
    "115 分钟",
    1,
    4,
    "– The world is run on secret\n– 世界是靠秘密运行的\n– It’s a double pleasure to deceive the deceiver\n– 但是欺骗骗子带来的快感是双倍的",
  ],
  [
    "montreal",
    "left",
    "蒙特利尔，我的美人",
    "Montreal, My Beauty",
    "待确认",
    "—",
    0,
    0,
    "20 年后，第二部《面子》",
  ],
  [
    "dreams",
    "left",
    "性梦爱三部曲：梦",
    "Sex Dreams Love: Dreams",
    "2024",
    "111 分钟",
    0,
    1,
    "“爱情仿佛一场大梦，到梦醒的时候自然结束，无论如何。”\n\n好像看到了我的 17 岁。太细腻了、太真切了。每一秒都在共情。\n\n仿佛身边的街灯都化作相片里的光晕\n仿佛攀上无限螺旋的楼梯\n仿佛融化在那片烘热的暖觉中\n抚触着那片阴湿的爱意\n忽而梦醒，与其说我已分不清梦与现实，不如说我太想让它成真。\n\n我写下梦里的你，梦里的我，和，梦里的你我。",
  ],
  [
    "light",
    "left",
    "光，光，光",
    "Light Light Light",
    "2023",
    "90 分钟",
    0,
    2,
    "她们只是想逃离切尔诺贝利的阴霾，太早了，却也太晚了。\n\n你我于辐射中尽兴沐浴\n呼吸着那光，光，光\n– 你为什么选择我？\n– 是你选择了我。\n可是你永远地留在了那个夏天\n我们一起做了一场散漫在天空中的紫色的梦",
  ],
  [
    "duke",
    "left",
    "勃艮第公爵",
    "The Duke of Burgundy",
    "2014",
    "104 分钟",
    0,
    3,
    "囚你于蛹中\n我受剐于万千翅膀之棱\n\n你不忍吧？\n你不忍看见\n成双的蛾共享我的孤灯\n\n不必破蛹\n你我仍在此\n吐织着某张巨大的梦",
  ],
  [
    "lovers",
    "left",
    "唯爱永存",
    "You Can Live Forever",
    "2022",
    "96 分钟",
    0,
    4,
    "你的信仰是能够爱我\n而我的信仰是你",
  ],
  [
    "bloomington",
    "left",
    "布卢明顿",
    "Bloomington",
    "2010",
    "83 分钟",
    1,
    0,
    "我清晰地目睹着你的背影\n期待你讶然回首\n于浓夜中拥我入怀\n当海王星再次划过你我头顶之日\n即你我的心将再次属于彼此之时",
  ],
  [
    "vicky",
    "left",
    "午夜巴塞罗那",
    "Vicky Cristina Barcelona",
    "2008",
    "96 分钟",
    1,
    1,
    "《燃冬》抄的这部，两女一男",
  ],
  [
    "unveiled",
    "left",
    "同心难改",
    "I Can’t Think Straight",
    "2008",
    "82 分钟",
    1,
    2,
    "不管走多远\n每次回头\n都能一眼捕获你的影\n且清晰地自信着\n你也恰会回首",
  ],
  [
    "extremely",
    "left",
    "极爱",
    "Polarized",
    "2023",
    "104 分钟",
    1,
    3,
    "在长夜之笼中\n沉默着的\n你我长出了翅膀\n不飞的鸣鸟\n在天堂遗落的羽翼\n坠入爱的裂隙间",
  ],
  [
    "unseen",
    "left",
    "看不见的世界",
    "The World Unseen",
    "2007",
    "94 分钟",
    1,
    4,
    "同心难改、极爱原班人马，深沉的矛盾螺旋，忧怨的种族悲奏。",
  ],
  [
    "aimless",
    "right",
    "战火中的伊甸园",
    "Aimée & Jaguar",
    "1999",
    "125 分钟",
    0,
    0,
    "我一直在等你回答“你怎么能爱上我？”\n而我永远也无法回到使你沉沦于我的那天",
  ],
  [
    "snake",
    "right",
    "青蛇",
    "Green Snake",
    "1993",
    "99 分钟",
    0,
    1,
    "历尽尘世，她眼里依旧只有与姐姐的那五百年，那一世痴缠。",
  ],
  [
    "ammonite",
    "right",
    "菊石",
    "Ammonite",
    "2020",
    "117 分钟",
    0,
    2,
    "开放式的结局之外\n是黯淡无光的未来\n又是一场「笼中鸟」的悲剧\n爱只是名为爱的施舍\n自由只是名为自由的折磨\n其实永远也走不出\n这精致却绝望的鸟笼",
  ],
  [
    "world",
    "right",
    "打开心世界",
    "The World to Come",
    "2020",
    "105 分钟",
    0,
    3,
    "只有当世界万籁俱寂\n你我才可放声歌唱\n唯有当生命万念俱灰\n你我才可依偎彼此\n\n只愿与你\n此生\n同困鸟笼\n深醉于浅梦",
  ],
  [
    "chloe",
    "right",
    "克洛伊",
    "Chloe",
    "2009",
    "96 分钟",
    0,
    4,
    "朱丽安·摩尔 × 阿曼达·塞弗里德，含金量不必多说。",
  ],
  [
    "hours",
    "right",
    "时时刻刻",
    "The Hours",
    "2002",
    "114 分钟",
    1,
    0,
    "To look life in the face, always to look life in the face, and to know it for what it is. At last, to know it, to love it for what it is, and then to put it away.\n\n从逃避人生的事事陆离\n到敢于直面人生的破碎流动\n自生命的时时刻刻中走出\n走向自由\n走向新生\n「Always the years, always the love, always the hours.」",
  ],
  [
    "carol",
    "right",
    "卡罗尔",
    "Carol",
    "2015",
    "118 分钟",
    1,
    1,
    "我的女同性恋启蒙之作。",
    "https://movie.douban.com/subject/10741834/",
  ],
  [
    "mulholland",
    "right",
    "穆赫兰道",
    "Mulholland Drive",
    "2001",
    "147 分钟",
    1,
    2,
    "我的梦是一场在梦中也无法实现的梦。",
    "https://movie.douban.com/subject/1292217/",
  ],
  [
    "portrait",
    "right",
    "燃烧女子的肖像",
    "Portrait of a Lady on Fire",
    "2019",
    "122 分钟",
    1,
    3,
    "我还没看，但是好像别人说必看。",
    "https://movie.douban.com/subject/30257175/",
  ],
];
const groupOneCovers = [
  "01_Being_John_Malkovich.png", "02_APEX.png", "100  nights of hero.png",
  "THE GIRL KING.png", "05_Annihilation.png", "ORLANDO.png",
  "07_Oceans_8.png", "08_Mad_Max_Fury_Road.png", "09_Atomic_Blonde.png",
];
const groupTwoCovers = {
  montreal: "01_Montreal_My_Beautiful.png",
  dreams: "02_Dreams.png",
  light: "03_Light_Light_Light.png",
  duke: "04_The_Duke_of_Burgundy.png",
  lovers: "05_You_Can_Live_Forever.png",
  bloomington: "06_Bloomington.png",
  vicky: "07_Vicky_Cristina_Barcelona.png",
  unveiled: "08_I_Cant_Think_Straight.png",
  extremely: "09_Polarized.png",
  unseen: "10_The_World_Unseen.png",
};
const groupThreeCovers = {
  aimless: "01_Aimee_and_Jaguar_战火中的伊甸园.png",
  snake: "02_Green_Snake_青蛇.png",
  ammonite: "03_Ammonite_菊石.png",
  world: "04_The_World_to_Come_打开心世界.png",
  chloe: "05_Chloe_克洛伊.png",
  hours: "06_The_Hours_时时刻刻.png",
  carol: "07_Carol_卡罗尔.png",
  mulholland: "08_Mulholland_Drive_穆赫兰道.png",
  portrait: "09_Portrait_of_a_Lady_on_Fire_燃烧女子的肖像.png",
};
const publicUrl = (path) => `${import.meta.env.BASE_URL}${path}`;
const films = raw.map((f, i) => ({
  id: f[0],
  wall: f[1],
  title: f[2],
  original: f[3],
  year: f[4],
  runtime: f[5],
  shelf: f[6],
  slot: f[7],
  note: f[8],
  douban: f[9],
  cover: groupThreeCovers[f[0]] ? publicUrl(`covers/group-three/${groupThreeCovers[f[0]]}`) : groupTwoCovers[f[0]] ? publicUrl(`covers/group-two/${groupTwoCovers[f[0]]}`) : groupOneCovers[i] ? publicUrl(`covers/group-one/${groupOneCovers[i]}`) : undefined,
}));
const walls = { front: "剧情", left: "文艺", right: "高分经典" };
const asset = (name) => publicUrl(`shop-assets/${name}.png`);
const tracks = ["music/音乐1.mp3", "music/音乐2.mp3", "music/音乐3.mp3"].map(publicUrl);
const trackNames = ["Real Friends", "You & Me", "hate that i made you love me"];

function Recommendation({ note }) {
  return <section className="recommend"><h2>店主影评</h2><p className="review-text" tabIndex={0}>{note}</p></section>;
}
function App() {
  const [wall, setWall] = useState("front"), [selected, setSelected] = useState(null),
    [saved, setSaved] = useState(() => JSON.parse(localStorage.getItem("after-credits-saved") || "[]")),
    [ticket, setTicket] = useState(false), [saving, setSaving] = useState(false), [signSwing, setSignSwing] = useState(false), [signEntered, setSignEntered] = useState(false),
    [flight, setFlight] = useState(false), [closing, setClosing] = useState(false),
    [track, setTrack] = useState(null), [playing, setPlaying] = useState(false), [audioError, setAudioError] = useState(false), [lightsOff, setLightsOff] = useState(false), [doorLightsOff, setDoorLightsOff] = useState(false), [posterOpen, setPosterOpen] = useState(false), [posterClosing, setPosterClosing] = useState(false),
    [requests, setRequests] = useState(() => JSON.parse(localStorage.getItem("after-credits-requests") || "[]")),
    [requestTitle, setRequestTitle] = useState(""), [requestNote, setRequestNote] = useState(""), [requestSent, setRequestSent] = useState(false);
  const reduced = useReducedMotion();
  const focus = useRef();
  const closeButton = useRef();
  const detailCover = useRef();
  const sourceRect = useRef();
  const closingRef = useRef(false);
  const selectedRef = useRef(null);
  const activeFlight = useRef(null);
  const audio = useRef();
  const sfxCtx = useRef(null);
  const noiseBuf = useRef(null);
  const lastHoverSfx = useRef(0);

  const getSfx = () => {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return null;
    if (!sfxCtx.current) sfxCtx.current = new AudioCtx();
    const ctx = sfxCtx.current;
    if (ctx.state === "suspended") ctx.resume().catch(() => {});
    if (!noiseBuf.current) {
      const len = Math.floor(ctx.sampleRate * 0.6);
      const buf = ctx.createBuffer(1, len, ctx.sampleRate);
      const data = buf.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < len; i++) {
        const w = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + w * 0.099046;
        b1 = 0.96300 * b1 + w * 0.2965164;
        b2 = 0.57000 * b2 + w * 1.0526913;
        data[i] = (b0 + b1 + b2 + w * 0.1848) * 0.14;
      }
      noiseBuf.current = buf;
    }
    return { ctx, buf: noiseBuf.current };
  };

  const playHoverSfx = () => {
    const nowMs = performance.now();
    if (nowMs - lastHoverSfx.current < 55) return;
    lastHoverSfx.current = nowMs;
    const sfx = getSfx();
    if (!sfx || sfx.ctx.state !== "running") return;
    const { ctx, buf } = sfx;
    const t = ctx.currentTime;
    const pitch = 0.92 + Math.random() * 0.16;

    // 纸壳/书脊与木隔板的短促微擦声
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.playbackRate.value = pitch;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(520 * pitch, t);
    bp.frequency.exponentialRampToValueAtTime(980 * pitch, t + 0.085);
    bp.Q.value = 2.2;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t);
    gain.gain.linearRampToValueAtTime(0.165, t + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.095);
    src.connect(bp);
    bp.connect(gain);
    gain.connect(ctx.destination);
    src.start(t, Math.random() * 0.2, 0.11);

    // 底部木架极轻的低频共鸣
    const osc = ctx.createOscillator();
    osc.type = "triangle";
    osc.frequency.setValueAtTime(145 * pitch, t);
    osc.frequency.exponentialRampToValueAtTime(82 * pitch, t + 0.055);
    const oGain = ctx.createGain();
    oGain.gain.setValueAtTime(0.048, t);
    oGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.06);
    osc.connect(oGain);
    oGain.connect(ctx.destination);
    osc.start(t);
    osc.stop(t + 0.065);
  };

  const playPullOutSfx = () => {
    const sfx = getSfx();
    if (!sfx) return;
    const { ctx, buf } = sfx;
    const t = ctx.currentTime;
    const pitch = 0.95 + Math.random() * 0.1;

    // 1. 抽出时的厚实纸质/木质滑动摩擦声 (0 ~ 280ms)
    const slide = ctx.createBufferSource();
    slide.buffer = buf;
    slide.playbackRate.value = pitch;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(340 * pitch, t);
    bp.frequency.exponentialRampToValueAtTime(1350 * pitch, t + 0.22);
    bp.Q.value = 1.6;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2400, t);
    const sGain = ctx.createGain();
    sGain.gain.setValueAtTime(0.0001, t);
    sGain.gain.linearRampToValueAtTime(0.48, t + 0.035);
    sGain.gain.setValueAtTime(0.39, t + 0.12);
    sGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.29);
    slide.connect(bp);
    bp.connect(lp);
    lp.connect(sGain);
    sGain.connect(ctx.destination);
    slide.start(t, 0, 0.32);

    // 2. 书脊/碟盒离开木槽时的木腔低频共振 (15ms ~ 130ms)
    const wood = ctx.createOscillator();
    wood.type = "sine";
    wood.frequency.setValueAtTime(165 * pitch, t + 0.015);
    wood.frequency.exponentialRampToValueAtTime(64 * pitch, t + 0.125);
    const wGain = ctx.createGain();
    wGain.gain.setValueAtTime(0.0001, t);
    wGain.gain.linearRampToValueAtTime(0.21, t + 0.024);
    wGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.135);
    wood.connect(wGain);
    wGain.connect(ctx.destination);
    wood.start(t + 0.015);
    wood.stop(t + 0.14);

    // 3. 彻底抽出脱离搁板瞬间的纸壳轻拂尾音 (130ms ~ 260ms)
    const brush = ctx.createBufferSource();
    brush.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "bandpass";
    hp.frequency.setValueAtTime(1600 * pitch, t + 0.12);
    hp.frequency.exponentialRampToValueAtTime(950 * pitch, t + 0.25);
    hp.Q.value = 2.4;
    const bGain = ctx.createGain();
    bGain.gain.setValueAtTime(0.0001, t + 0.12);
    bGain.gain.linearRampToValueAtTime(0.18, t + 0.15);
    bGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
    brush.connect(hp);
    hp.connect(bGain);
    bGain.connect(ctx.destination);
    brush.start(t + 0.12, 0.15, 0.16);
  };

  const playPutBackSfx = () => {
    const sfx = getSfx();
    if (!sfx) return;
    const { ctx, buf } = sfx;
    const t = ctx.currentTime;
    const pitch = 0.94 + Math.random() * 0.12;

    // 1. 滑入木架槽位的下行纸/木摩擦声 (160ms ~ 420ms，配合飞回落位)
    const slide = ctx.createBufferSource();
    slide.buffer = buf;
    slide.playbackRate.value = pitch;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(1150 * pitch, t + 0.16);
    bp.frequency.exponentialRampToValueAtTime(320 * pitch, t + 0.42);
    bp.Q.value = 1.65;
    const lp = ctx.createBiquadFilter();
    lp.type = "lowpass";
    lp.frequency.setValueAtTime(2100, t + 0.16);
    const sGain = ctx.createGain();
    sGain.gain.setValueAtTime(0.0001, t + 0.16);
    sGain.gain.linearRampToValueAtTime(0.42, t + 0.22);
    sGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.44);
    slide.connect(bp);
    bp.connect(lp);
    lp.connect(sGain);
    sGain.connect(ctx.destination);
    slide.start(t + 0.16, 0.08, 0.30);

    // 2. 碟盒归位抵住木架背板的沉稳轻顿声 (410ms ~ 540ms)
    const thud = ctx.createOscillator();
    thud.type = "sine";
    thud.frequency.setValueAtTime(118 * pitch, t + 0.41);
    thud.frequency.exponentialRampToValueAtTime(48 * pitch, t + 0.53);
    const tGain = ctx.createGain();
    tGain.gain.setValueAtTime(0.0001, t + 0.40);
    tGain.gain.linearRampToValueAtTime(0.32, t + 0.42);
    tGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.55);
    thud.connect(tGain);
    tGain.connect(ctx.destination);
    thud.start(t + 0.41);
    thud.stop(t + 0.56);

    // 3. 归位瞬间的短促木质轻叩瞬态 (415ms)
  const tap = ctx.createBufferSource();
    tap.buffer = buf;
    const tapFilter = ctx.createBiquadFilter();
    tapFilter.type = "lowpass";
    tapFilter.frequency.setValueAtTime(680 * pitch, t + 0.41);
    const tapGain = ctx.createGain();
    tapGain.gain.setValueAtTime(0.0001, t + 0.41);
    tapGain.gain.linearRampToValueAtTime(0.24, t + 0.418);
    tapGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.47);
    tap.connect(tapFilter);
    tapFilter.connect(tapGain);
    tapGain.connect(ctx.destination);
    tap.start(t + 0.41, 0.25, 0.08);
  };

  // 拉绳/开关咔哒声 (吊灯、门内小灯)
  const playSwitchSfx = (turningOff = false) => {
    const sfx = getSfx();
    if (!sfx) return;
    const { ctx, buf } = sfx;
    const t = ctx.currentTime;
    [0, 0.036].forEach((offset, i) => {
      const f = (turningOff ? (i === 0 ? 1900 : 1250) : (i === 0 ? 1450 : 2250));
      const osc = ctx.createOscillator();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(f, t + offset);
      osc.frequency.exponentialRampToValueAtTime(f * 0.42, t + offset + 0.022);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + offset);
      g.gain.linearRampToValueAtTime(i === 0 ? 0.16 : 0.24, t + offset + 0.003);
      g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.026);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t + offset);
      osc.stop(t + offset + 0.03);

      const click = ctx.createBufferSource();
      click.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.value = f * 1.1;
      bp.Q.value = 3.0;
      const cg = ctx.createGain();
      cg.gain.setValueAtTime(0.0001, t + offset);
      cg.gain.linearRampToValueAtTime(0.22, t + offset + 0.002);
      cg.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.018);
      click.connect(bp);
      bp.connect(cg);
      cg.connect(ctx.destination);
      click.start(t + offset, 0.05, 0.025);
    });
  };

  // 铜版纸海报掀起/翻回声
  const playPosterFlipSfx = (opening = true) => {
    const sfx = getSfx();
    if (!sfx) return;
    const { ctx, buf } = sfx;
    const t = ctx.currentTime;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    const bp = ctx.createBiquadFilter();
    bp.type = "bandpass";
    bp.frequency.setValueAtTime(opening ? 650 : 1400, t);
    bp.frequency.exponentialRampToValueAtTime(opening ? 1850 : 580, t + 0.24);
    bp.Q.value = 1.4;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.26, t + 0.045);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.26);
    src.connect(bp);
    bp.connect(g);
    g.connect(ctx.destination);
    src.start(t, 0.1, 0.28);
  };

  // 顶部木质吊牌摇晃声
  const playSignSwingSfx = () => {
    const sfx = getSfx();
    if (!sfx) return;
    const { ctx } = sfx;
    const t = ctx.currentTime;
    [0, 0.19, 0.38].forEach((offset, i) => {
      const osc = ctx.createOscillator();
      osc.type = "sine";
      osc.frequency.setValueAtTime(220 - i * 18, t + offset);
      osc.frequency.exponentialRampToValueAtTime(95, t + offset + 0.07);
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + offset);
      g.gain.linearRampToValueAtTime(0.14 / (i + 1), t + offset + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.085);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(t + offset);
      osc.stop(t + offset + 0.09);

      const ring = ctx.createOscillator();
      ring.type = "triangle";
      ring.frequency.setValueAtTime(1480 + i * 60, t + offset);
      const rg = ctx.createGain();
      rg.gain.setValueAtTime(0.0001, t + offset);
      rg.gain.linearRampToValueAtTime(0.045 / (i + 1), t + offset + 0.005);
      rg.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.055);
      ring.connect(rg);
      rg.connect(ctx.destination);
      ring.start(t + offset);
      ring.stop(t + offset + 0.06);
    });
  };

  // 切换分类时整排影碟错落上架声
  const playShelfShuffleSfx = () => {
    const sfx = getSfx();
    if (!sfx) return;
    const { ctx, buf } = sfx;
    const t = ctx.currentTime;
    [0, 0.048, 0.098, 0.15].forEach((offset, i) => {
      const src = ctx.createBufferSource();
      src.buffer = buf;
      const bp = ctx.createBiquadFilter();
      bp.type = "bandpass";
      bp.frequency.setValueAtTime(750 + i * 140, t + offset);
      bp.Q.value = 2.0;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.0001, t + offset);
      g.gain.linearRampToValueAtTime(0.16, t + offset + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + offset + 0.07);
      src.connect(bp);
      bp.connect(g);
      g.connect(ctx.destination);
      src.start(t + offset, i * 0.07, 0.08);
    });
  };

  // 黑胶唱机落针声
  const playNeedleDropSfx = () => {
    const sfx = getSfx();
    if (!sfx) return;
    const { ctx, buf } = sfx;
    const t = ctx.currentTime;
    const thump = ctx.createOscillator();
    thump.type = "sine";
    thump.frequency.setValueAtTime(92, t);
    thump.frequency.exponentialRampToValueAtTime(38, t + 0.08);
    const tg = ctx.createGain();
    tg.gain.setValueAtTime(0.0001, t);
    tg.gain.linearRampToValueAtTime(0.22, t + 0.012);
    tg.gain.exponentialRampToValueAtTime(0.0001, t + 0.095);
    thump.connect(tg);
    tg.connect(ctx.destination);
    thump.start(t);
    thump.stop(t + 0.1);

    const crackle = ctx.createBufferSource();
    crackle.buffer = buf;
    const hp = ctx.createBiquadFilter();
    hp.type = "highpass";
    hp.frequency.value = 2800;
    const cg = ctx.createGain();
    cg.gain.setValueAtTime(0.0001, t + 0.015);
    cg.gain.linearRampToValueAtTime(0.08, t + 0.025);
    cg.gain.exponentialRampToValueAtTime(0.0001, t + 0.11);
    crackle.connect(hp);
    hp.connect(cg);
    cg.connect(ctx.destination);
    crackle.start(t + 0.015, 0.2, 0.11);
  };

  const close = () => {
    if (history.state?.detail) history.back();
    else {
      if (selectedRef.current && !selectedRef.current.isRequest) playPutBackSfx();
      setSelected(null);
    }
  };
  const closePoster = () => { if (posterClosing) return; playPosterFlipSfx(false); if (reduced) setPosterOpen(false); else setPosterClosing(true); };
  useEffect(() => {
    const unlock = () => getSfx();
    addEventListener("pointerdown", unlock, { once: true });
    addEventListener("keydown", unlock, { once: true });
    return () => {
      removeEventListener("pointerdown", unlock);
      removeEventListener("keydown", unlock);
    };
  }, []);
  useEffect(() => localStorage.setItem("after-credits-saved", JSON.stringify(saved)), [saved]);
  useEffect(() => localStorage.setItem("after-credits-requests", JSON.stringify(requests)), [requests]);
  const show = films.filter(x => x.wall === wall);
  useEffect(() => { const f = (e) => { if (e.key === "Escape" && selected) close(); }; addEventListener("keydown", f); return () => removeEventListener("keydown", f); }, [selected]);
  useEffect(() => { const f = (e) => { if (e.key === "Escape" && posterOpen && !posterClosing) { playPosterFlipSfx(false); if (reduced) setPosterOpen(false); else setPosterClosing(true); } }; addEventListener("keydown", f); return () => removeEventListener("keydown", f); }, [posterOpen, posterClosing, reduced]);
  useEffect(() => { if (!selected) focus.current?.focus({ preventScroll: true }); }, [selected]);
  useEffect(() => { if (selected) closeButton.current?.focus(); }, [selected]);
  const animateCover = (from, to, film, done) => {
    if (activeFlight.current) {
      activeFlight.current.animation.cancel();
      activeFlight.current.image.remove();
      activeFlight.current = null;
    }
    if (reduced || !from || !to) { done(); return; }
    const image = document.createElement(film.cover ? "img" : "div");
    if (film.cover) image.src = film.cover;
    image.className = `traveling-dvd ${film.cover ? "" : "traveling-empty"}`;
    Object.assign(image.style, { left: `${from.left}px`, top: `${from.top}px`, width: `${from.width}px`, height: `${from.height}px` });
    document.body.appendChild(image);
    const animation = image.animate([
      { transform: "translate(0, 0) scale(1) rotate(0deg)", filter: "drop-shadow(4px 6px 3px #00153288)" },
      { transform: `translate(${(to.left - from.left) * .22}px, ${(to.top - from.top) * .22 - 24}px) scale(1.08) rotate(-3deg)`, offset: .28, filter: "drop-shadow(10px 18px 12px #00153288)" },
      { transform: `translate(${to.left - from.left}px, ${to.top - from.top}px) scale(${to.width / from.width}, ${to.height / from.height}) rotate(0deg)`, filter: "drop-shadow(4px 6px 3px #00153288)" },
    ], { duration: 720, easing: "cubic-bezier(.22,1,.36,1)", fill: "forwards" });
    activeFlight.current = { animation, image };
    animation.onfinish = () => { image.remove(); activeFlight.current = null; done(); };
  };
  useLayoutEffect(() => {
    if (!selected || !flight || closingRef.current) return;
    const target = detailCover.current?.getBoundingClientRect();
    animateCover(sourceRect.current, target, selected, () => setFlight(false));
  // The flight starts only when a new film is selected; completion changes flight state.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);
  useEffect(() => {
    selectedRef.current = selected;
  }, [selected]);
  useEffect(() => {
    const onBack = () => {
      const film = selectedRef.current;
      if (!film || closingRef.current) return;
      closingRef.current = true;
      setClosing(true);
      setFlight(true);
      const from = activeFlight.current?.image.getBoundingClientRect() || detailCover.current?.getBoundingClientRect();
      const source = focus.current?.isConnected ? (focus.current.querySelector("img") || focus.current).getBoundingClientRect() : null;
      const to = source || (from && { left: innerWidth / 2 - from.width / 4, top: innerHeight / 2 - from.height / 4, width: from.width / 2, height: from.height / 2 });
      if (film.isRequest) { setSelected(null); setFlight(false); setClosing(false); closingRef.current = false; return; }
      playPutBackSfx();
      animateCover(from, to, film, () => { setSelected(null); setFlight(false); setClosing(false); closingRef.current = false; });
    };
    addEventListener("popstate", onBack);
    return () => removeEventListener("popstate", onBack);
  });
  const open = (film, e) => {
    if (selectedRef.current || closingRef.current) return;
    playPullOutSfx();
    focus.current = e.currentTarget;
    sourceRect.current = (e.currentTarget.querySelector("img") || e.currentTarget).getBoundingClientRect();
    setRequestSent(false);
    setFlight(!reduced && !film.isRequest);
    setSelected(film);
    history.pushState({ detail: true }, "");
  };
  const toggleSaved = (id) => {
    if (!saved.includes(id) && !reduced) { setSaving(true); setTimeout(() => setSaving(false), 700); }
    setSaved(x => x.includes(id) ? x.filter(i => i !== id) : [...x, id]);
  };
  const visitDouban = () => {
    if (!reduced) { setTicket(true); setTimeout(() => setTicket(false), 500); }
  };
  const playTrack = (index, forcePlay = false) => {
    const player = audio.current;
    setAudioError(false);
    if (!forcePlay && track === index && !player.paused) { player.pause(); return; }
    if (track !== index || player.paused) playNeedleDropSfx();
    if (track !== index) { player.src = tracks[index]; setTrack(index); }
    player.play().catch(error => { if (error.name !== "AbortError") { setPlaying(false); setAudioError(true); } });
  };
  return <LayoutGroup><main className="shop">
    <audio ref={audio} preload="none" onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onError={() => { setPlaying(false); setAudioError(true); }} onEnded={() => playTrack(((track ?? 0) + 1) % tracks.length)} />
    {!reduced && <div className="entrance" aria-hidden="true"><div /><div /></div>}
    <div className="scene-wrap"><section className={`scene ${lightsOff ? "room-closed" : ""}`} aria-label="片尾之后 DVD 店">
      <div className="floor" />
      <div className="room-light" aria-hidden="true" />
      <div className="floor-shadows" aria-hidden="true" />
      <img className="prop arch" src={asset("09_archway")} alt="" />
      <div className={`arch-control-layer ${doorLightsOff ? "door-dark" : ""}`}><div className="arch-jamb-fix" aria-hidden="true" /><div className="arch-shade" aria-hidden="true" /><button className="door-lamp" aria-label={doorLightsOff ? "打开门内的灯" : "关闭门内的灯"} aria-pressed={doorLightsOff} onClick={() => setDoorLightsOff(value => { playSwitchSfx(!value); return !value; })} /></div>
      <div className="prop poster-good poster-status" tabIndex={0} aria-label={audioError ? "音乐暂时无法播放" : track === null ? "当前没有播放音乐" : `${playing ? "播放中" : "已暂停"}：${trackNames[track]}`}><img src={asset("04_good_sounds_poster")} alt="" /><span className="poster-tooltip" aria-hidden="true">{audioError ? "音乐暂时无法播放" : track === null ? "当前没有播放音乐" : `${playing ? "播放中" : "已暂停"}：${trackNames[track]}`}</span></div>
      <button className={`prop poster-spin poster-flip-control ${posterOpen ? "poster-open" : ""} ${posterClosing ? "poster-closing" : ""}`} onClick={() => { if (posterOpen) closePoster(); else { playPosterFlipSfx(true); setPosterOpen(true); } }} aria-pressed={posterOpen} aria-label={posterOpen ? "翻回海报正面" : "翻看海报背面的店主留言"}><span className="poster-flip-inner" onAnimationEnd={e => { if (e.animationName === "poster-return") { setPosterOpen(false); setPosterClosing(false); } }}><span className="poster-face poster-front"><img src={asset("les-more-poster")} alt="" /></span><span className="poster-face poster-back"><span>不要懂，<br />长大了会问。<br /><small>——店主</small></span></span></span></button>
      <div className="music-player" role="group" aria-label="背景音乐">
        <div className="music-discs">{tracks.map((_, index) => <button key={index} className={`music-button ${track === index ? "is-current" : ""}`} aria-label={`${track === index && playing ? "暂停" : "播放"} ${trackNames[index]}`} aria-pressed={track === index && playing} onClick={() => playTrack(index)}><span className={`music-disc disc-${index} ${track === index && playing ? "is-playing" : ""}`} style={{ backgroundImage: `url("${asset("03_vinyl_wall")}")` }} /></button>)}</div>
        <span className="music-status" role="status">{audioError ? "音乐暂时无法播放" : track === null ? "" : `${trackNames[track]} ${playing ? "播放中" : "已暂停"}`}</span>
      </div>
      <img className="prop cabinet" src={asset("07_record_cabinet")} alt="" />
      <button className="prop turntable turntable-control" onClick={() => playTrack(0, true)} aria-label="播放第一首背景音乐"><img src={asset("06_turntable")} alt="" /><span className="object-tooltip" aria-hidden="true">播放</span></button>
      <div className="prop rug" aria-hidden="true" />
      <button className="prop lamp lamp-control" onClick={() => setLightsOff(value => { playSwitchSfx(!value); return !value; })} aria-label={lightsOff ? "打开吊灯" : "关闭吊灯"} aria-pressed={lightsOff}><img src={asset("02_pendant_lamp")} alt="" /></button>
      <button className={`sign-button ${signEntered ? "entered" : ""} ${signSwing ? "swing" : ""}`} aria-label="摇晃 Welcome to LEZHUB 吊牌" onClick={() => { playSignSwingSfx(); setSignEntered(true); setSignSwing(false); requestAnimationFrame(() => setSignSwing(true)); }} onAnimationEnd={e => { if (e.animationName === "sign-drop") setSignEntered(true); if (e.animationName === "sign-swing") setSignSwing(false); }}><img src={asset("welcome-sign")} alt="" /></button>
      <div className="shelf"><img className="shelf-image" src={asset("08_empty_dvd_shelf")} alt="" />
        {[0, 1].map(row => <div className={`film-row row-${row}`} key={row}><AnimatePresence initial={false} mode="popLayout">{show.filter(f => f.shelf === row).map((f, index) => <motion.button key={f.id} className={`dvd ${selected?.id === f.id ? "dvd-picked" : ""}`} onPointerEnter={playHoverSfx} onFocus={e => { if (e.currentTarget !== focus.current) playHoverSfx(); }} onClick={e => open(f, e)} aria-label={`查看《${f.title}》`} initial={reduced ? false : { opacity: 0, y: 22, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={reduced ? { opacity: 0 } : { opacity: 0, y: 18, scale: .9 }} transition={{ duration: reduced ? 0 : .42, delay: reduced ? 0 : index * .045 }}><img src={f.cover} alt="" />{saved.includes(f.id) && <span className="mark" aria-label="已加入片单">✓</span>}</motion.button>)}{wall === "right" && row === 1 && <motion.button key="request" className="dvd empty-dvd" aria-label="留言推荐想看的电影" onPointerEnter={playHoverSfx} onFocus={e => { if (e.currentTarget !== focus.current) playHoverSfx(); }} onClick={e => open({ id: "request", title: "想看什么电影？", wall: "right", isRequest: true }, e)} initial={reduced ? false : { opacity: 0, y: 22, scale: .9 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}><span className="empty-dvd-label">YOUR<br />MOVIE<br /><small>＋</small></span></motion.button>}</AnimatePresence></div>)}
        <div className="rail rail-top" /><div className="rail rail-bottom" />
        <nav className="genres" aria-label="电影分类">{[["front", "11_genre_drama"], ["left", "12_genre_art"], ["right", "13_genre_classics"]].map(([id, image]) => <button key={id} className={wall === id ? "active" : ""} aria-pressed={wall === id} onClick={() => { if (wall !== id) playShelfShuffleSfx(); setWall(id); }}><img src={asset(image)} alt={walls[id]} /></button>)}</nav>
      </div>
      <img className="prop plant" src={asset("10_monstera_plant")} alt="" />
      <div className="night-shade" aria-hidden="true" />
    </section></div>
    <AnimatePresence>{selected && <motion.div className={`overlay ${closing ? "is-closing" : ""}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reduced ? 0 : .2 }} onMouseDown={e => e.target === e.currentTarget && close()}><article className="card" role="dialog" aria-modal="true" aria-labelledby="film-title">
      <div className="card-ornaments" aria-hidden="true">
        <img className="card-rainbow card-rainbow-right" src={publicUrl("detail-assets/rainbow-side-hd.png")} alt="" />
        <img className="card-rainbow card-rainbow-left" src={publicUrl("detail-assets/rainbow-left-hd.png")} alt="" />
        <img className="card-rainbow card-rainbow-bottom" src={publicUrl("detail-assets/rainbow-right-hd.png")} alt="" />
      </div>
      <button ref={closeButton} className="close" onClick={close} aria-label="关闭详情">×</button>
      <div className={`detail-art ${selected.isRequest ? "empty-stage" : ""}`}>
        {!selected.isRequest && <div className="detail-case"><span className="case-spine" aria-hidden="true">DVD</span><img ref={detailCover} style={{ visibility: flight ? "hidden" : "visible" }} src={selected.cover} alt={`${selected.title}封面`} /></div>}
        <img className="platform" src={publicUrl("detail-assets/03_display_platform.png")} alt="" />
        {!selected.isRequest && <div className="acrylic-stand" aria-hidden="true" />}
        {saving && <img className="flying-cover" src={selected.cover} alt="" />}
      </div>
      {selected.isRequest ? <div className="copy request-copy"><p className="eyebrow">DVD / YOUR PICK</p><h1 id="film-title">想看什么电影？</h1><p className="request-intro">留下一部你想看的电影，放进这间小店的愿望清单。</p><form className="request-form" onSubmit={e => { e.preventDefault(); const title = requestTitle.trim(); if (!title) return; setRequests(items => [{ title, note: requestNote.trim(), id: Date.now() }, ...items]); setRequestTitle(""); setRequestNote(""); setRequestSent(true); }}><label>电影名称<input value={requestTitle} onChange={e => setRequestTitle(e.target.value)} maxLength={120} required placeholder="写下电影的名字" /></label><label>想说的话 <span>（选填）</span><textarea value={requestNote} onChange={e => setRequestNote(e.target.value)} maxLength={500} placeholder="为什么想看这部电影？" /></label><button type="submit">留下心愿</button><p className="request-feedback" role="status">{requestSent ? "已保存到这台设备。" : "留言保存在这台设备上。"}</p></form>{requests.length > 0 && <div className="request-list"><h2>我的电影心愿</h2><ul>{requests.map(item => <li key={item.id}><strong>{item.title}</strong>{item.note && <span>{item.note}</span>}</li>)}</ul></div>}</div> : <><div className="copy"><p className="eyebrow">DVD / {walls[selected.wall]}</p><h1 id="film-title">{selected.title}</h1><p className="original">{selected.original}</p><p className="meta">{selected.year} | {selected.runtime}</p><Recommendation key={selected.id} note={selected.note} /></div><div className="actions"><a onClick={visitDouban} href={selected.douban || `https://www.douban.com/search?q=${encodeURIComponent(selected.title)}`} target="_blank" rel="noreferrer"><span className="ticket-wrap">{ticket && <i className="ticket" />}</span>↗ 打开豆瓣</a><button className="save-button" onClick={() => toggleSaved(selected.id)}><span className={saved.includes(selected.id) ? "save-icon saved" : "save-icon"}>{saved.includes(selected.id) ? "✓" : "+"}</span> {saved.includes(selected.id) ? "已加入片单" : "加入片单"}</button></div></>}
    </article></motion.div>}</AnimatePresence>
  </main></LayoutGroup>;
}
export default App;
