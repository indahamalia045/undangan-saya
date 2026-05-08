import React, { useState, useEffect } from 'react';
import { MailOpen } from 'lucide-react';
import {
  Calendar,
  MapPin,
  Clock,
  Music,
  X,
  ChevronLeft,
  ChevronRight,
  Send,
  Copy,
  Gift,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const sectionFade = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0 }
};

const CONFIG = {
  bride: {
    fullName: "Rina Karimah Harahap S.Pd",
    nickname: "Rina",
    instagram: "@rinakarimah16",
    father: "Bapak Muhammad Hatta Harahap",
    mother: "Ibu (Almh) Asnun Siregar"
  },
  groom: {
    fullName: "Hotma Khoirul Amin Siregar SE",
    nickname: "Amin",
    instagram: "@hotmakhoirull",
    father: "Bapak H. Sabilillah Siregar S.Pd",
    mother: "Ibu Hj. Ummi Kalsum Harahap S.Sos"
  },
  wedding: {
    date: "2026-05-30",
    date1: "2026-05-31",
    location: "1.4071923625971186,99.29793375046012",
    akad: {
      time: "08:00 WIB - Selesai",
      venue: "Rumah Mempelai Pria",
      address: "Gunung Hasahatan Kecamatan Padangsidimpuan Batunadua Kota Padangsidimpuan"
    },
    resepsi: {
      time: "10:00 WIB - Selesai",
      venue: "Rumah Mempelai Pria",
      address: "Gunung Hasahatan Kecamatan Padangsidimpuan Batunadua Kota Padangsidimpuan"
    },
    timeline: {
  saturday: [
    { time: "08.00 - 09.00", event: "Manaek Gondang" },
    { time: "09.00 - 11.00", event: "Margalanggang" },
    { time: "11.00 - 12.30", event: "Mangalo-alo bayo pangoli dohot boru nadioli" },
    { time: "12.30 - 13.00", event: "Isoma" },
    { time: "13.00 - 15.30", event: "Marosong-osong" },
    { time: "15.30 - 18.30", event: "Mangalo-alo mora" },
    { time: "18.30 - 20.00", event: "Isoma" },
    { time: "20.00 - 23.00", event: "Maralok-alok" },
    { time: "23.00 - 24.00", event: "Margalanggang" },
  ],

  sunday: [
    { time: "00.01 - 05.30", event: "Margalanggang" },
    { time: "05.30 - 08.00", event: "Isoma" },
    { time: "08.00 - 14.30", event: "Margalanggang" },
    { time: "14.30 - 16.00", event: "Patuaekkon" },
    { time: "16.00 - 18.30", event: "Mangupa" },
  ]
}
  },
  mapsLink: "https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d249.2903563445872!2d99.29793375046012!3d1.4071923625971186!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2s!5e0!3m2!1sid!2sid!4v1777175845652!5m2!1sid!2sid",
  musicUrl: "/music/onango.mp3",
  photos: [
    "/images/1.jpeg",
    "/images/2.jpeg",
    "/images/3.jpeg",
    "/images/4.jpeg",
    "/images/9.jpeg",
    "/images/11.jpeg",
    "/images/12.jpeg",
    "/images/14.jpeg"
  ],
  coverPhoto: "/images/1.jpeg",
  heroPhoto: "/images/4.jpeg",
  loveStoryPhoto: "/images/9.jpeg",
  quote: {
    text: "Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya.",
    source: "QS. Ar-Rum: 21"
  },
  gift: {
    bankName: "Dana",
    accountName: "Hotma Khoirul Amin",
    accountNumber: "0821-6694-3752",
    qr: "/images/qr.jpeg"
  }
};

function RevealSection({ children, className = "", delay = 0 }) {
  return (
    <motion.section
      className={className}
      variants={sectionFade}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.22 }}
      transition={{ duration: 0.7, ease: "easeOut", delay }}
    >
      {children}
    </motion.section>
  );
}

export default function WeddingInvitation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [currentPhoto, setCurrentPhoto] = useState(0);
  const [showGallery, setShowGallery] = useState(false);
  const [copied, setCopied] = useState(false);
  

  const openInvitation = () => {
    setIsOpen(true);
    setIsMusicPlaying(true);
  };

  const copyAccount = async () => {
    try {
      await navigator.clipboard.writeText(CONFIG.gift.accountNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  return (
    <div className="min-h-screen bg-[#e9e3dc] font-[Inter] relative overflow-hidden">
      <FloatingPetals />
      {!isOpen ? (
        <CoverPage openInvitation={openInvitation} />
      ) : (
        <MainContent
          isMusicPlaying={isMusicPlaying}
          setIsMusicPlaying={setIsMusicPlaying}
          currentPhoto={currentPhoto}
          setCurrentPhoto={setCurrentPhoto}
          showGallery={showGallery}
          setShowGallery={setShowGallery}
          copied={copied}
          copyAccount={copyAccount}
        />
      )}
    </div>
  );
}

function FloatingPetals() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden opacity-30">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full bg-[#c8a99a]"
          initial={{ y: -40, x: `${Math.random() * 100}%`, opacity: 0 }}
          animate={{ y: '110vh', opacity: [0, 0.5, 0] }}
          transition={{ duration: 14 + i * 1.4, repeat: Infinity, ease: 'linear', delay: i * 0.7 }}
        />
      ))}
    </div>
  );
}

function CoverPage({ openInvitation }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#e9e3dc] relative overflow-hidden px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-lg text-center relative z-10 bg-[#f5efe9]/90 backdrop-blur-sm rounded-[28px] shadow-2xl px-6 md:px-8 py-10 md:py-12"
      >
        <div className="w-48 h-64 mx-auto rounded-[20px] overflow-hidden shadow-lg border-4 border-white">
          <img
            src={CONFIG.coverPhoto}
            alt="cover"
            className="w-full h-full object-cover"
          />
        </div>

        <h1 className="text-4xl mt-6 text-[#6b4f4f] font-['Parisienne']">
          {CONFIG.groom.nickname} &amp; {CONFIG.bride.nickname}
        </h1>

        <p className="text-sm mt-4 text-[#8b7a6f] font-[Inter]">
          Kepada Bapak/Ibu/Saudara/i
        </p>

        <p className="font-semibold text-[#6b4f4f] mt-2 font-[Inter] whitespace-pre-line">
  {decodeURIComponent(
    new URLSearchParams(window.location.search).get("to") || "Tamu Undangan"
  )}
</p>

        <button
          onClick={openInvitation}
          className="mt-6 inline-flex items-center justify-center gap-2 bg-[#6b4f4f] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#5a4343] transition-all font-[Inter]"
        >
          <MailOpen className="w-5 h-5 text-[#e2c7b8]" />
          <span>Buka Undangan</span>
        </button>
      </motion.div>
    </div>
  );
}

function MainContent({
  isMusicPlaying,
  setIsMusicPlaying,
  currentPhoto,
  setCurrentPhoto,
  showGallery,
  setShowGallery,
  copied,
  copyAccount,
}) {
  const [rsvpName, setRsvpName] = useState('');
  const [attendance, setAttendance] = useState('');
  const [rsvpMessage, setRsvpMessage] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  

  const handleRsvpSubmit = (e) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    setTimeout(() => {
      setRsvpSubmitted(false);
      setRsvpName('');
      setAttendance('');
      setRsvpMessage('');
    }, 3000);
  };

  

  return (
    <div className="max-w-4xl mx-auto bg-[#f5efe9] overflow-hidden relative z-10">
      <MusicPlayer isPlaying={isMusicPlaying} setIsPlaying={setIsMusicPlaying} />
      <HeroSection />
      <RevealSection className="bg-[#f5efe9]"><QuoteSection /></RevealSection>
      <RevealSection className="bg-[#f5efe9]"><BrideGroomSection /></RevealSection>
      <RevealSection><LoveStorySection /></RevealSection>
      <RevealSection><CountdownSection /></RevealSection>
      <RevealSection><EventDetailsSection /></RevealSection>
      <RevealSection>
  <TimelineSection />
</RevealSection>
      <RevealSection className="bg-[#f5efe9]">
        <GallerySection currentPhoto={currentPhoto} setCurrentPhoto={setCurrentPhoto} showGallery={showGallery} setShowGallery={setShowGallery} />
      </RevealSection>
      <RevealSection><MapSection /></RevealSection>
      <RevealSection className="bg-[#f5efe9]">
        <GiftSection copied={copied} copyAccount={copyAccount} />
      </RevealSection>
      
      <RevealSection className="bg-[#f5efe9]">
        <RSVPSection
          rsvpName={rsvpName}
          setRsvpName={setRsvpName}
          attendance={attendance}
          setAttendance={setAttendance}
          rsvpMessage={rsvpMessage}
          setRsvpMessage={setRsvpMessage}
          rsvpSubmitted={rsvpSubmitted}
          handleRsvpSubmit={handleRsvpSubmit}
        />
      </RevealSection>
      <RevealSection>
  <ClosingSection />
</RevealSection>
      <FooterSection />
    </div>
  );
}

function MusicPlayer({ isPlaying, setIsPlaying }) {
  const [audio] = useState(new Audio(CONFIG.musicUrl));

  useEffect(() => {
    audio.loop = true;
    if (isPlaying) audio.play().catch(() => {});
    else audio.pause();
    return () => audio.pause();
  }, [isPlaying, audio]);

  return (
    <button
      onClick={() => setIsPlaying(!isPlaying)}
      className="fixed bottom-6 right-6 z-50 bg-[#6b4f4f] text-white p-4 rounded-full shadow-lg hover:bg-[#5a4343] transition-all"
    >
      <Music className={`w-6 h-6 ${isPlaying ? 'animate-pulse' : ''}`} />
    </button>
  );
}

function HeroSection() {
  const buildGoogleCalendarUrl = () => {
    const title = encodeURIComponent("Wedding of Hotma Khoirul Amin & Rina Karimah Harahap");
    const details = encodeURIComponent("Undangan pernikahan Hotma Khoirul Amin & Rina Karimah Harahap");
    const location = encodeURIComponent(CONFIG.wedding.resepsi.address);
    const start = "20260530T100000";
    const end = "20260531T130000";

    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${start}/${end}&details=${details}&location=${location}`;
  };

  return (
    <section className="relative min-h-screen px-4 py-10 flex items-center justify-center bg-[#f5efe9] overflow-hidden">
      <div className="w-full max-w-4xl grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="order-2 md:order-1 text-center md:text-left"
        >
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="text-sm tracking-[0.35em] text-[#8b7a6f] uppercase mb-4 font-[Inter]"
          >
            The Wedding Of
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-4xl md:text-6xl text-[#6b4f4f] leading-tight font-['Parisienne']"
          >
            {CONFIG.groom.nickname} &amp; {CONFIG.bride.nickname}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="mt-4 text-[#7a5b5b] text-base md:text-lg font-[Inter]"
          >
            Sabtu-Minggu, 30-31 Mei 2026
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.35 }}
          >
            <a
              href={buildGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center justify-center bg-[#6b4f4f] text-white px-6 py-3 rounded-full shadow-md hover:bg-[#5a4343] transition font-[Inter]"
            >
              Save The Date
            </a>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 70 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.9, ease: "easeOut", delay: 0.1 }}
          className="order-1 md:order-2 flex justify-center"
        >
          <div className="relative w-full max-w-[360px] h-[520px] rounded-[28px] overflow-hidden shadow-2xl">
            <img src={CONFIG.heroPhoto} alt="cover" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#e9e3dc] via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function QuoteSection() {
  return (
    <section className="py-16 bg-[#f5efe9] px-4">
      <div className="max-w-3xl mx-auto text-center">
        <p className="text-xl md:text-2xl italic text-[#7a5b5b] mb-4 leading-relaxed font-['Cormorant_Garamond']">
          "{CONFIG.quote.text}"
        </p>
        <p className="text-[#6b4f4f] font-semibold font-[Inter]">{CONFIG.quote.source}</p>
      </div>
    </section>
  );
}

function BrideGroomSection() {
  const item = {
    hiddenLeft: { opacity: 0, x: -70 },
    hiddenRight: { opacity: 0, x: 70 },
    show: { opacity: 1, x: 0 }
  };

  const InstagramIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      className="w-8 h-8"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f58529" />
          <stop offset="35%" stopColor="#dd2a7b" />
          <stop offset="70%" stopColor="#8134af" />
          <stop offset="100%" stopColor="#515bd4" />
        </linearGradient>
      </defs>
      <path
        fill="url(#instagramGradient)"
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9a5.5 5.5 0 0 1-5.5 5.5h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Zm0 1.5A4 4 0 0 0 3.5 7.5v9a4 4 0 0 0 4 4h9a4 4 0 0 0 4-4v-9a4 4 0 0 0-4-4h-9Zm4.5 3.5a5 5 0 1 1 0 10 5 5 0 0 1 0-10Zm0 1.5a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7Zm5.25-1.8a1.05 1.05 0 1 1 0 2.1 1.05 1.05 0 0 1 0-2.1Z"
      />
    </svg>
  );

  const lineTransition = (delay) => ({
    duration: 0.7,
    delay,
    ease: "easeOut"
  });

  return (
    <section className="py-20 px-4 bg-[#f5efe9]">
      <div className="max-w-3xl mx-auto space-y-20">
        <div className="text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0)}
            className="text-center mb-8 px-4"
          >
            <p className="text-[#7a5b5b] text-xl md:text-2xl leading-relaxed font-['Cormorant_Garamond'] italic">
              Assalamualaikum Wr. Wb.
            </p>
            <p className="text-[#7a5b5b] text-base md:text-lg leading-relaxed font-[Inter] mt-3">
              Dengan memohon Rahmat &amp; Ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan putra-putri kami:
            </p>
          </motion.div>

          <motion.div
            variants={item}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.1)}
          >
            <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-8 border-[#e2c7b8] shadow-xl">
              <img src={CONFIG.photos[3]} alt={CONFIG.groom.nickname} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.h3
            variants={item}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.2)}
            className="text-3xl mb-2 text-[#6b4f4f] font-['Cormorant_Garamond']"
          >
            {CONFIG.groom.fullName}
          </motion.h3>

          <motion.p
            variants={item}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.3)}
            className="text-[#8b7a6f] mb-2 font-[Inter]"
          >
            Putra dari:
          </motion.p>

          <motion.p
            variants={item}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.4)}
            className="text-[#7a5b5b] font-[Inter]"
          >
            {CONFIG.groom.father}
          </motion.p>

          <motion.p
            variants={item}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.5)}
            className="text-[#7a5b5b] mb-4 font-[Inter]"
          >
            {CONFIG.groom.mother}
          </motion.p>

          <motion.a
            variants={item}
            initial="hiddenRight"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.6)}
            href={`https://instagram.com/${CONFIG.groom.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-[#6b4f4f] hover:scale-110 transition-transform duration-300"
            aria-label={`Instagram ${CONFIG.groom.fullName}`}
          >
            <InstagramIcon />
          </motion.a>
        </div>

        <div className="text-center">
          <motion.div
            variants={item}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.1)}
          >
            <div className="w-64 h-64 mx-auto mb-6 rounded-full overflow-hidden border-8 border-[#e2c7b8] shadow-xl">
              <img src={CONFIG.photos[1]} alt={CONFIG.bride.nickname} className="w-full h-full object-cover" />
            </div>
          </motion.div>

          <motion.h3
            variants={item}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.2)}
            className="text-3xl mb-2 text-[#6b4f4f] font-['Cormorant_Garamond']"
          >
            {CONFIG.bride.fullName}
          </motion.h3>

          <motion.p
            variants={item}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.3)}
            className="text-[#8b7a6f] mb-2 font-[Inter]"
          >
            Putri dari:
          </motion.p>

          <motion.p
            variants={item}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.4)}
            className="text-[#7a5b5b] font-[Inter]"
          >
            {CONFIG.bride.father}
          </motion.p>

          <motion.p
            variants={item}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.5)}
            className="text-[#7a5b5b] mb-4 font-[Inter]"
          >
            {CONFIG.bride.mother}
          </motion.p>

          <motion.a
            variants={item}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            transition={lineTransition(0.6)}
            href={`https://instagram.com/${CONFIG.bride.instagram.replace('@', '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center text-[#6b4f4f] hover:scale-110 transition-transform duration-300"
            aria-label={`Instagram ${CONFIG.bride.fullName}`}
          >
            <InstagramIcon />
          </motion.a>
        </div>
      </div>
    </section>
  );
}

function LoveStorySection() {
  const stories = [
    {
      title: "First Chapter : Encounter",
      text: "Cinta Kami adalah cerita tentang dua jiwa yang bertemu di 01 Oktober 2025 tanpa disengaja. Tidak ada yang menyangka, sebuah pertemuan biasa justru menjadi awal dari kisah luar biasa."
    },
    {
      title: "Second Chapter : Destiny",
      text: "Dari Obrolan ringan hingga diskusi mendalam, kami menemukan bahwa kami saling melengkapi. Setiap langkah dalam perjalanan takdir ini, telah membawa kami lebih dekat satu sama lain."
    },
    {
      title: "Final Chapter : Forever Starts Here",
      text: "Dengan penuh rasa syukur, kami ingin merayakan cinta kami di hari yang istimewa di Tahun 2026 ini.Cinta yang sakral, cinta yang bermuara pada cinta-Nya."
    }
  ];

  return (
    <section className="py-20 px-4 bg-[#f5efe9]">
      <div className="max-w-3xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.7 }} className="text-center mb-12">
          <div className="w-full max-w-md mx-auto h-[260px] md:h-[340px] rounded-[28px] overflow-hidden shadow-xl mb-6">
            <img src={CONFIG.loveStoryPhoto} alt="Love Story" className="w-full h-full object-cover" />
          </div>
          <h3 className="text-4xl md:text-5xl text-[#6b4f4f] font-['Great_Vibes'] leading-none mb-2">
            Love Story
          </h3>
          <p className="mt-3 text-[#8b7a6f] font-[Inter]">Perjalanan singkat kisah kami</p>
        </motion.div>

        <div className="space-y-10">
          {stories.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.6, delay: index * 0.08 }}
              className="text-center"
            >
              <h4 className="text-3xl md:text-4xl text-[#6b4f4f] mb-6 font-['Great_Vibes'] leading-tight tracking-wide drop-shadow-sm">
                {item.title}
              </h4>
              <p className="text-[#7a5b5b] leading-relaxed font-[Inter] text-lg max-w-2xl mx-auto px-4">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timer = setInterval(() => {
      const weddingDate = new Date(CONFIG.wedding.date);
      const now = new Date();
      const difference = weddingDate - now;
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        });
      }
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="py-20 bg-[#6b4f4f] text-white px-4">
      <div className="max-w-4xl mx-auto text-center">
        <Calendar className="w-12 h-12 mx-auto mb-6" />
        <h3 className="text-3xl mb-8 font-['Cormorant_Garamond']">Menghitung Hari</h3>
        <div className="grid grid-cols-4 gap-2 md:gap-3">
          {Object.entries(timeLeft).map(([unit, value]) => (
            <div key={unit} className="bg-white/20 backdrop-blur-sm rounded-lg p-3 md:p-5">
              <div className="text-2xl md:text-4xl font-bold mb-1 tracking-tight">{value}</div>
              <div className="text-[10px] md:text-xs uppercase tracking-wide font-[Inter]">{unit}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function EventDetailsSection() {
  return (
    <section className="py-20 px-4 bg-[#f5efe9]">
      <div className="max-w-4xl mx-auto">
        <h3 className="text-4xl md:text-5xl text-center mb-16 text-[#6b4f4f] font-['Great_Vibes'] leading-none drop-shadow-sm">
          Detail Acara
        </h3>

        <div className="grid md:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-[#fffaf6] rounded-2xl shadow-xl p-8 border-t-4 border-[#6b4f4f] hover:shadow-2xl transition-all duration-300"
          >
            <h4 className="text-2xl md:text-3xl mb-6 text-[#6b4f4f] font-['Cormorant_Garamond'] font-semibold tracking-tight">
              Acara Adat
            </h4>
            <div className="space-y-4 text-[#7a5b5b] font-[Inter]">
              <div className="flex items-start gap-4 p-3 bg-white/50 rounded-xl">
                <Calendar className="w-6 h-6 text-[#6b4f4f] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#6b4f4f] text-sm tracking-wide">Tanggal</p>
                  <p className="text-lg font-medium">{CONFIG.wedding.date}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-white/50 rounded-xl">
                <Clock className="w-6 h-6 text-[#6b4f4f] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#6b4f4f] text-sm tracking-wide">Waktu</p>
                  <p className="text-lg font-medium">{CONFIG.wedding.akad.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-white/50 rounded-xl">
                <MapPin className="w-6 h-6 text-[#6b4f4f] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#6b4f4f] text-sm tracking-wide">Tempat</p>
                  <p className="font-medium">{CONFIG.wedding.akad.venue}</p>
                  <p className="text-sm text-[#8b7a6f] mt-1 leading-relaxed">{CONFIG.wedding.akad.address}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="bg-white rounded-2xl shadow-xl p-8 border-t-4 border-[#6b4f4f] hover:shadow-2xl transition-all duration-300"
          >
            <h4 className="text-2xl md:text-3xl mb-6 text-[#6b4f4f] font-['Cormorant_Garamond'] font-semibold tracking-tight">
              Resepsi
            </h4>
            <div className="space-y-4 text-[#7a5b5b] font-[Inter]">
              <div className="flex items-start gap-4 p-3 bg-white/50 rounded-xl">
                <Calendar className="w-6 h-6 text-[#6b4f4f] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#6b4f4f] text-sm tracking-wide">Tanggal</p>
                  <p className="text-lg font-medium">{CONFIG.wedding.date1}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-white/50 rounded-xl">
                <Clock className="w-6 h-6 text-[#6b4f4f] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#6b4f4f] text-sm tracking-wide">Waktu</p>
                  <p className="text-lg font-medium">{CONFIG.wedding.resepsi.time}</p>
                </div>
              </div>
              <div className="flex items-start gap-4 p-3 bg-white/50 rounded-xl">
                <MapPin className="w-6 h-6 text-[#6b4f4f] mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-[#6b4f4f] text-sm tracking-wide">Tempat</p>
                  <p className="font-medium">{CONFIG.wedding.resepsi.venue}</p>
                  <p className="text-sm text-[#8b7a6f] mt-1 leading-relaxed">{CONFIG.wedding.resepsi.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function TimelineSection() {
  return (
    <section className="py-20 px-4 bg-[#fffaf6]">
      <div className="max-w-5xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl text-center mb-16 text-[#6b4f4f] font-['Great_Vibes'] leading-none drop-shadow-sm"
        >
          Rangkaian Acara
        </motion.h3>

        <div className="grid md:grid-cols-2 gap-8">

          {/* SABTU */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-[#ead8cb]"
          >
            <h4 className="text-3xl text-[#6b4f4f] mb-8 text-center font-['Cormorant_Garamond']">
              Sabtu, 30 Mei 2026
            </h4>

            <div className="space-y-4">
              {CONFIG.wedding.timeline.saturday.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start border-b border-[#f0e5dc] pb-4"
                >
                  <div className="min-w-[110px]">
                    <p className="text-[#6b4f4f] font-semibold text-sm md:text-base">
                      {item.time}
                    </p>
                  </div>

                  <div className="flex-1">
                    <p className="text-[#7a5b5b] leading-relaxed font-[Inter]">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* MINGGU */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="bg-white rounded-3xl shadow-xl p-8 border border-[#ead8cb]"
          >
            <h4 className="text-3xl text-[#6b4f4f] mb-8 text-center font-['Cormorant_Garamond']">
              Minggu, 31 Mei 2026
            </h4>

            <div className="space-y-4">
              {CONFIG.wedding.timeline.sunday.map((item, index) => (
                <div
                  key={index}
                  className="flex gap-4 items-start border-b border-[#f0e5dc] pb-4"
                >
                  <div className="min-w-[110px]">
                    <p className="text-[#6b4f4f] font-semibold text-sm md:text-base">
                      {item.time}
                    </p>
                  </div>

                  <div className="flex-1">
                    <p className="text-[#7a5b5b] leading-relaxed font-[Inter]">
                      {item.event}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

function GallerySection({ currentPhoto, setCurrentPhoto, showGallery, setShowGallery }) {
  return (
    <>
      <section className="py-20 bg-[#f5efe9] px-4">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-4xl md:text-5xl text-center mb-12 text-[#6b4f4f] font-['Great_Vibes'] leading-none drop-shadow-sm">
            Galeri Foto
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {CONFIG.photos.map((photo, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.45, delay: index * 0.04 }}
                onClick={() => {
                  setCurrentPhoto(index);
                  setShowGallery(true);
                }}
                className="aspect-square overflow-hidden rounded-xl cursor-pointer hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-xl group"
              >
                <img
                  src={photo}
                  alt={`Foto ${index + 1}`}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {showGallery && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          >
            <button
              onClick={() => setShowGallery(false)}
              className="absolute top-6 right-6 text-white/90 hover:text-white transition-all p-2 rounded-full bg-black/30 backdrop-blur-sm"
            >
              <X className="w-8 h-8" />
            </button>

            <button
              onClick={() => setCurrentPhoto((currentPhoto - 1 + CONFIG.photos.length) % CONFIG.photos.length)}
              className="absolute left-6 text-white/90 hover:text-white transition-all p-3 rounded-full bg-black/30 backdrop-blur-sm"
            >
              <ChevronLeft className="w-10 h-10" />
            </button>

            <img
              src={CONFIG.photos[currentPhoto]}
              alt="Foto Gallery"
              className="max-w-[95vw] max-h-[90vh] object-contain rounded-2xl shadow-2xl"
            />

            <button
              onClick={() => setCurrentPhoto((currentPhoto + 1) % CONFIG.photos.length)}
              className="absolute right-6 text-white/90 hover:text-white transition-all p-3 rounded-full bg-black/30 backdrop-blur-sm"
            >
              <ChevronRight className="w-10 h-10" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function MapSection() {
  return (
    <section className="py-20 px-4 bg-[#f5efe9]">
      <div className="max-w-4xl mx-auto">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl text-center mb-16 text-[#6b4f4f] font-['Great_Vibes'] leading-none drop-shadow-sm"
        >
          Lokasi Acara
        </motion.h3>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="rounded-2xl overflow-hidden shadow-2xl border-4 border-white/50"
        >
          <iframe
            title="Lokasi Acara Pernikahan"
            src={CONFIG.mapsLink}
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-center mt-10"
        >
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(CONFIG.wedding.location)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#6b4f4f] text-white px-8 py-4 rounded-full hover:bg-[#5a4343] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-[1.02] font-[Inter] font-semibold text-lg"
          >
            <MapPin className="w-5 h-5" />
            Buka di Google Maps
          </a>
        </motion.div>
      </div>
    </section>
  );
}


function GiftSection({ copied, copyAccount }) {
  return (
    <section className="py-20 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <Gift className="w-10 h-10 mx-auto mb-4 text-[#6b4f4f]" />
        <h3 className="text-3xl md:text-4xl text-[#6b4f4f] font-['Cormorant_Garamond']">Gift Wish</h3>
        <p className="mt-3 text-[#8b7a6f] font-[Inter]">
          Kehadiran Anda adalah hadiah terindah. Jika ingin memberi tanda kasih, silakan gunakan rekening berikut.
        </p>

        <div className="mt-10 bg-[#fffaf6] rounded-2xl shadow-lg p-8 border border-[#e2c7b8]">
          <div className="flex items-center justify-center mb-4">
            <img
              src="/images/dana.png"
              alt="Logo DANA"
              className="w-32 h-32 object-contain"
            />
          </div>

          <p className="text-2xl text-[#6b4f4f] font-semibold mt-2 font-['Cormorant_Garamond']">
            {CONFIG.gift.accountName}
          </p>
          <p className="text-xl text-[#7a5b5b] mt-1 font-[Inter]">
            {CONFIG.gift.accountNumber}
          </p>

          <button
            onClick={copyAccount}
            className="mt-5 inline-flex items-center gap-2 bg-[#6b4f4f] text-white px-5 py-3 rounded-full hover:bg-[#5a4343] transition font-[Inter]"
          >
            <Copy className="w-4 h-4" />
            {copied ? 'Nomor Disalin' : 'Salin Nomor'}
          </button>

          <div className="mt-8">
            <div className="w-44 h-44 mx-auto rounded-2xl overflow-hidden border-4 border-white shadow-md">
              <img src={CONFIG.gift.qr} alt="QR Gift" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}



function RSVPSection({
  rsvpName,
  setRsvpName,
  attendance,
  setAttendance,
  rsvpMessage,
  setRsvpMessage,
  rsvpSubmitted,
  handleRsvpSubmit
}) {
  return (
    <section className="py-20 bg-[#f5efe9] px-4">
      <div className="max-w-2xl mx-auto">
        <h3 className="text-3xl md:text-4xl text-center mb-4 text-[#6b4f4f] font-['Cormorant_Garamond']">Konfirmasi Kehadiran</h3>
        <p className="text-center text-[#8b7a6f] mb-12 font-[Inter]">Mohon konfirmasi kehadiran Anda</p>

        {rsvpSubmitted ? (
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-8 text-center">
            <div className="text-green-600 text-xl font-semibold mb-2 font-[Inter]">Terima Kasih!</div>
            <p className="text-[#7a5b5b] font-[Inter]">Konfirmasi Anda telah kami terima</p>
          </div>
        ) : (
          <form onSubmit={handleRsvpSubmit} className="bg-white rounded-xl shadow-lg p-8 space-y-6">
            <div>
              <label className="block text-[#6b4f4f] mb-2 font-semibold font-[Inter]">Nama</label>
              <input
                type="text"
                value={rsvpName}
                onChange={(e) => setRsvpName(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6b4f4f] font-[Inter]"
                placeholder="Masukkan nama Anda"
              />
            </div>

            <div>
              <label className="block text-[#6b4f4f] mb-2 font-semibold font-[Inter]">Kehadiran</label>
              <select
                value={attendance}
                onChange={(e) => setAttendance(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6b4f4f] font-[Inter]"
              >
                <option value="">Pilih konfirmasi kehadiran</option>
                <option value="hadir">Hadir</option>
                <option value="tidak-hadir">Tidak Hadir</option>
                <option value="ragu">Masih Ragu</option>
              </select>
            </div>

            <div>
              <label className="block text-[#6b4f4f] mb-2 font-semibold font-[Inter]">Ucapan & Doa</label>
              <textarea
                value={rsvpMessage}
                onChange={(e) => setRsvpMessage(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#6b4f4f] font-[Inter]"
                placeholder="Tuliskan ucapan dan doa untuk kami..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#6b4f4f] text-white py-3 rounded-lg hover:bg-[#5a4343] transition-colors font-semibold flex items-center justify-center gap-2 font-[Inter]"
            >
              <Send className="w-5 h-5" />
              Kirim Konfirmasi
            </button>
          </form>
        )}
      </div>
    </section>
  );
}

function ClosingSection() {
  const [currentBg, setCurrentBg] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % CONFIG.photos.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative py-28 px-4 overflow-hidden">

      {/* Background slideshow */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBg}
            src={CONFIG.photos[currentBg]}
            alt="background"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.8 }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </AnimatePresence>

        {/* Overlay gelap */}
        <div className="absolute inset-0 bg-black/45" />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto text-center relative z-10 text-white">

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >

          {/* Terima kasih */}
          <p className="text-white/90 italic text-lg md:text-xl mb-12 font-['Cormorant_Garamond']">
            
          </p>
          {/* Terima kasih */}
          <p className="text-white/90 italic text-lg md:text-xl mb-12 font-['Cormorant_Garamond']">
            
          </p>
          {/* Terima kasih */}
          <p className="text-white/90 italic text-lg md:text-xl mb-12 font-['Cormorant_Garamond']">
            
          </p>
          
          {/* Ucapan */}
          <p className="text-white/80 text-base md:text-lg leading-relaxed font-[Inter] mb-6">
            Merupakan suatu kehormatan dan kebahagiaan bagi kami apabila
            Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
            pada hari bahagia kami.
          </p>

         

          {/* Terima kasih */}
          <p className="text-white/90 italic text-lg md:text-xl mb-12 font-['Cormorant_Garamond']">
            Atas doa dan restunya kami ucapkan terima kasih.
          </p>

          {/* Nama */}
          <h3 className="text-5xl md:text-7xl text-white font-['Great_Vibes'] leading-none mb-4 drop-shadow-2xl">
            {CONFIG.groom.nickname} &amp; {CONFIG.bride.nickname}
          </h3>

          {/* Keluarga */}
          <div className="mt-8 space-y-2">
            <p className="text-white/70 text-sm uppercase tracking-[0.3em] font-[Inter]">
              Kami yang berbahagia
            </p>

            <p className="text-white/90 text-lg font-['Cormorant_Garamond']">
              Keluarga Besar Kedua Mempelai
            </p>
          </div>

          {/* Line */}
          <div className="w-32 h-[2px] bg-white/50 mx-auto mt-10 rounded-full"></div>

        </motion.div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="py-12 bg-[#6b4f4f] text-white text-center px-4">
      
      <p className="text-sm text-gray-400 mt-6 font-[Inter]">Made with ❤️ by IndahLia </p>
      
    </footer>
  );
}