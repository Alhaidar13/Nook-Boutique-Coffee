import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Menu, X, FileText, Building2, BadgeCheck, MessageCircle, ArrowRight, Check, Star,
  ShieldCheck, Clock, Wallet, HeadphonesIcon, ChevronDown, Mail, Phone,
} from "lucide-react";
import {
  SERVICES, formatRupiah, validateConsult, buildWhatsAppUrl, type ServiceId, type ConsultData,
} from "@/lib/legalcraft";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "LegalCraft — Jasa Pengurusan NPWP, NIB & PT Perorangan" },
      { name: "description", content: "Legalitas Usaha, Lebih Mudah. Bantuan pengurusan NPWP, NIB, dan PT Perorangan mulai Rp150.000. Konsultasi via WhatsApp." },
      { property: "og:title", content: "LegalCraft — Legalitas Usaha, Lebih Mudah" },
      { property: "og:description", content: "Bantuan pengurusan NPWP, NIB, dan PT Perorangan dengan harga jelas." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const NAV = [
  ["Beranda", "beranda"], ["Layanan", "layanan"], ["Cara Kerja", "cara-kerja"],
  ["Testimonial", "testimonial"], ["FAQ", "faq"],
] as const;

const SERVICE_CARDS: { id: ServiceId; icon: typeof FileText; desc: string; cta: string }[] = [
  { id: "npwp", icon: FileText, desc: "Bantuan pengurusan NPWP sesuai kebutuhan wajib pajak dengan informasi persyaratan yang mudah dipahami.", cta: "Konsultasi NPWP" },
  { id: "nib", icon: BadgeCheck, desc: "Bantuan pengurusan Nomor Induk Berusaha untuk kamu yang ingin melengkapi kebutuhan legalitas usaha.", cta: "Konsultasi NIB" },
  { id: "pt", icon: Building2, desc: "Bantuan pengurusan pendirian PT Perorangan untuk pengusaha yang ingin membangun usaha dengan bentuk badan usaha yang sesuai.", cta: "Konsultasi PT Perorangan" },
];

const BENEFITS: Record<ServiceId, string[]> = {
  npwp: ["Syarat administrasi perpajakan & pekerjaan", "Dibutuhkan untuk pengajuan kredit/bank", "Memudahkan pelaporan pajak", "Pendampingan proses dari awal"],
  nib: ["Identitas resmi usaha di sistem OSS", "Berlaku sebagai izin usaha dasar", "Membuka akses pembiayaan & program pemerintah", "Bantuan pemilihan KBLI yang sesuai"],
  pt: ["Usaha berbadan hukum dengan satu pendiri", "Pemisahan harta pribadi dan usaha", "Meningkatkan kepercayaan mitra & klien", "Bantuan nama PT dan KBLI"],
};

const STEPS = [
  ["Isi Form Konsultasi", "Lengkapi data diri dan pilih layanan yang kamu butuhkan."],
  ["Diskusi via WhatsApp", "Admin menjelaskan persyaratan dan alur pengurusan."],
  ["Siapkan Dokumen", "Kirim dokumen sesuai daftar persyaratan yang diberikan."],
  ["Proses Pengurusan", "Kami bantu jalankan proses hingga selesai."],
];

const WHY = [
  [Wallet, "Harga Jelas", "Biaya layanan transparan sejak awal, tanpa biaya tersembunyi."],
  [HeadphonesIcon, "Konsultasi Ramah", "Penjelasan dengan bahasa sederhana dan mudah dipahami."],
  [Clock, "Praktis", "Semua komunikasi cukup lewat WhatsApp."],
  [ShieldCheck, "Data Terjaga", "Data kamu hanya digunakan untuk keperluan pengurusan."],
] as const;

// Placeholder — ganti dengan review asli saat publikasi.
const TESTI_ROW1 = [
  ["Proses konsultasinya mudah dipahami dan informasi yang diberikan cukup jelas.", "Pengurusan NIB"],
  ["Admin responsif menjawab pertanyaan soal persyaratan NPWP.", "Pengurusan NPWP"],
  ["Alurnya dijelaskan step by step, jadi tidak bingung.", "Pendirian PT Perorangan"],
  ["Harga sudah jelas dari awal, jadi lebih tenang.", "Pengurusan NIB"],
];
const TESTI_ROW2 = [
  ["Cocok untuk pelaku UMKM yang baru mulai mengurus legalitas.", "Pengurusan NIB"],
  ["Komunikasi lewat WhatsApp terasa praktis dan cepat.", "Pengurusan NPWP"],
  ["Membantu saya memahami perbedaan NIB dan PT Perorangan.", "Pendirian PT Perorangan"],
  ["Penjelasan dokumen yang dibutuhkan sangat membantu.", "Pengurusan NPWP"],
];

const FAQS: [string, React.ReactNode][] = [
  ["Apa itu NPWP?", "Nomor Pokok Wajib Pajak, identitas wajib pajak yang digunakan dalam administrasi perpajakan."],
  ["Apa itu NIB?", "Nomor Induk Berusaha, identitas pelaku usaha yang diterbitkan melalui sistem OSS."],
  ["Apa itu PT Perorangan?", "Badan hukum yang dapat didirikan oleh satu orang dan memenuhi kriteria usaha mikro dan kecil."],
  ["Siapa yang membutuhkan NPWP?", "Individu berpenghasilan, freelancer, maupun pelaku usaha yang memiliki kewajiban perpajakan."],
  ["Siapa yang membutuhkan NIB?", "Pelaku usaha, termasuk UMKM dan bisnis online, yang ingin usahanya tercatat resmi."],
  ["Apa perbedaan NIB dan PT Perorangan?", "NIB adalah identitas izin berusaha, sedangkan PT Perorangan adalah bentuk badan usaha berbadan hukum."],
  ["Apa saja persyaratan pengurusan?", "Umumnya KTP, NPWP (jika ada), email, nomor HP, dan data usaha. Detail akan dijelaskan saat konsultasi."],
  ["Berapa biaya pengurusan?", (
    <ul className="space-y-1">
      <li>NPWP: {formatRupiah(SERVICES.npwp.price)}</li>
      <li>NIB: {formatRupiah(SERVICES.nib.price)}</li>
      <li>PT Perorangan: {formatRupiah(SERVICES.pt.price)}</li>
    </ul>
  )],
  ["Berapa lama proses pengurusan?", "Tergantung kelengkapan dokumen dan proses di instansi terkait. Estimasi akan diinformasikan saat konsultasi."],
  ["Apakah LegalCraft merupakan instansi pemerintah?", "Bukan. LegalCraft adalah penyedia jasa bantuan pengurusan legalitas. Penerbitan dokumen merupakan kewenangan instansi terkait."],
];

function Index() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [modal, setModal] = useState<{ open: boolean; service: ServiceId | "" }>({ open: false, service: "" });
  const [benefitOpen, setBenefitOpen] = useState<ServiceId | null>(null);
  const [faqOpen, setFaqOpen] = useState<number | null>(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const consult = (service: ServiceId | "" = "") => setModal({ open: true, service });

  return (
    <div className="min-h-screen overflow-x-hidden bg-background font-sans text-foreground">
      {/* NAVBAR */}
      <header className={`sticky top-0 z-40 border-b transition-all ${scrolled ? "border-border bg-background/90 shadow-soft backdrop-blur" : "border-transparent bg-background/60 backdrop-blur"}`}>
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <a href="#beranda" className="flex items-center gap-2 font-display text-xl font-bold text-primary">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-deep text-primary-foreground"><ShieldCheck className="h-5 w-5" /></span>
            LegalCraft
          </a>
          <ul className="hidden items-center gap-8 md:flex">
            {NAV.map(([l, id]) => (
              <li key={id}><a href={`#${id}`} className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary">{l}</a></li>
            ))}
          </ul>
          <button onClick={() => consult()} className="hidden rounded-full bg-gradient-deep px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft transition hover:-translate-y-0.5 hover:shadow-lift md:inline-flex">Konsultasi</button>
          <button aria-label="Buka menu" onClick={() => setMenuOpen(!menuOpen)} className="rounded-lg p-2 text-primary md:hidden">
            {menuOpen ? <X /> : <Menu />}
          </button>
        </nav>
        {menuOpen && (
          <div className="border-t border-border bg-background px-4 pb-4 md:hidden">
            {NAV.map(([l, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)} className="block py-3 font-medium text-foreground hover:text-primary">{l}</a>
            ))}
            <button onClick={() => { setMenuOpen(false); consult(); }} className="mt-2 w-full rounded-full bg-gradient-deep py-3 font-semibold text-primary-foreground">Konsultasi</button>
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="beranda" className="relative bg-gradient-hero">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 md:py-24 lg:grid-cols-2">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-1.5 text-xs font-semibold text-primary shadow-soft">
              <BadgeCheck className="h-4 w-4" /> Legalitas Usaha, Lebih Mudah.
            </span>
            <h1 className="mt-6 text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl lg:text-6xl">
              Urus Legalitas Usaha, <span className="text-gradient">Jadi Lebih Mudah.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted-foreground">
              Mulai dari NPWP, NIB, hingga PT Perorangan. LegalCraft membantu kamu memahami dan menjalani proses pengurusan legalitas usaha dengan lebih praktis.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={() => consult()} className="inline-flex items-center gap-2 rounded-full bg-gradient-deep px-7 py-3.5 font-semibold text-primary-foreground shadow-lift transition hover:-translate-y-0.5">
                Konsultasi Sekarang <ArrowRight className="h-4 w-4" />
              </button>
              <a href="#layanan" className="inline-flex items-center rounded-full border border-primary/30 bg-card px-7 py-3.5 font-semibold text-primary transition hover:bg-accent">Lihat Layanan</a>
            </div>
          </div>
          <div className="relative mx-auto h-[380px] w-full max-w-md">
            <div className="absolute inset-6 rounded-[2rem] bg-gradient-brand opacity-90 shadow-lift" />
            <div className="absolute left-1/2 top-8 w-60 -translate-x-1/2 rounded-2xl bg-card p-5 shadow-lift">
              <div className="flex items-center gap-2 text-sm font-semibold text-primary"><FileText className="h-4 w-4" /> Dokumen Legalitas</div>
              <div className="mt-4 space-y-2">
                <div className="h-2 w-full rounded bg-muted" /><div className="h-2 w-4/5 rounded bg-muted" /><div className="h-2 w-3/5 rounded bg-muted" />
              </div>
              <div className="mt-4 flex justify-end"><span className="grid h-10 w-10 place-items-center rounded-full bg-accent text-primary"><Check className="h-5 w-5" /></span></div>
            </div>
            {[
              { id: "npwp" as const, cls: "left-0 top-48", icon: FileText, delay: "0s" },
              { id: "nib" as const, cls: "right-0 top-40", icon: BadgeCheck, delay: "1.5s" },
              { id: "pt" as const, cls: "left-1/2 -translate-x-1/2 bottom-2", icon: Building2, delay: "3s" },
            ].map((c) => (
              <div key={c.id} className={`absolute ${c.cls}`}>
                <div className="animate-float flex items-center gap-3 rounded-2xl bg-card px-4 py-3 shadow-lift" style={{ animationDelay: c.delay }}>
                  <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-deep text-primary-foreground"><c.icon className="h-5 w-5" /></span>
                  <div>
                    <div className="font-display text-sm font-semibold">{SERVICES[c.id].short}</div>
                    <div className="text-xs text-muted-foreground">{formatRupiah(SERVICES[c.id].price)}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LAYANAN */}
      <section id="layanan" className="mx-auto max-w-6xl px-4 py-20">
        <SectionHead title="Layanan Kami" sub="Pilih layanan legalitas yang sesuai dengan kebutuhanmu." />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICE_CARDS.map((s) => (
            <div key={s.id} className="group flex flex-col rounded-3xl border border-border bg-card p-7 shadow-soft transition hover:-translate-y-1 hover:shadow-lift">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-deep text-primary-foreground"><s.icon className="h-7 w-7" /></span>
              <h3 className="mt-6 text-xl font-semibold">{SERVICES[s.id].name}</h3>
              <p className="mt-3 flex-1 text-muted-foreground">{s.desc}</p>
              <button onClick={() => setBenefitOpen(benefitOpen === s.id ? null : s.id)} aria-expanded={benefitOpen === s.id} className="mt-5 inline-flex items-center gap-1 self-start text-sm font-semibold text-primary hover:underline">
                {benefitOpen === s.id ? "Sembunyikan benefit" : "Lihat benefit"}
                <ChevronDown className={`h-4 w-4 transition-transform ${benefitOpen === s.id ? "rotate-180" : ""}`} />
              </button>
              {benefitOpen === s.id && (
                <ul className="mt-4 space-y-2 rounded-2xl bg-accent/60 p-4 text-sm">
                  {BENEFITS[s.id].map((b) => <li key={b} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />{b}</li>)}
                </ul>
              )}
              <div className="mt-6 font-display text-3xl font-bold text-primary">{formatRupiah(SERVICES[s.id].price)}</div>
              <button onClick={() => consult(s.id)} className="mt-6 inline-flex items-center justify-center gap-2 rounded-full border border-primary/30 py-3 font-semibold text-primary transition group-hover:bg-primary group-hover:text-primary-foreground">
                {s.cta} <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CARA KERJA */}
      <section id="cara-kerja" className="bg-accent/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead title="Cara Kerja" sub="Empat langkah sederhana untuk memulai pengurusan legalitas." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([t, d], i) => (
              <div key={t} className="rounded-3xl bg-card p-6 shadow-soft">
                <span className="font-display text-4xl font-extrabold text-gradient">0{i + 1}</span>
                <h3 className="mt-3 text-lg font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="bg-accent/50 py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead title="Kenapa LegalCraft?" sub="Kami bantu proses legalitas jadi lebih tenang dan terarah." />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {WHY.map(([Icon, t, d]) => (
              <div key={t} className="rounded-3xl bg-card p-6 text-center shadow-soft">
                <span className="mx-auto grid h-12 w-12 place-items-center rounded-2xl bg-accent text-primary"><Icon className="h-6 w-6" /></span>
                <h3 className="mt-4 font-semibold">{t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIAL */}
      <section id="testimonial" className="py-20">
        <div className="mx-auto max-w-6xl px-4">
          <SectionHead title="Apa Kata Mereka?" sub="Pengalaman pelanggan dalam memahami dan mengurus kebutuhan legalitas usaha." />
        </div>
        <TestiCarousel items={[...TESTI_ROW1, ...TESTI_ROW2]} />
      </section>

      {/* FAQ */}
      <section id="faq" className="mx-auto max-w-3xl px-4 py-20">
        <SectionHead title="Pertanyaan Umum" sub="Jawaban singkat untuk pertanyaan yang sering diajukan." />
        <div className="mt-10 space-y-3">
          {FAQS.map(([q, a], i) => {
            const open = faqOpen === i;
            return (
              <div key={q} className="rounded-2xl border border-border bg-card shadow-soft">
                <button aria-expanded={open} onClick={() => setFaqOpen(open ? null : i)} className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left font-display font-semibold">
                  {q}
                  <ChevronDown className={`h-5 w-5 shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} />
                </button>
                {open && <div className="px-6 pb-5 text-muted-foreground">{a}</div>}
              </div>
            );
          })}
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-4 pb-20">
        <div className="mx-auto max-w-6xl rounded-[2rem] bg-gradient-deep px-6 py-16 text-center text-primary-foreground shadow-lift">
          <h2 className="text-3xl font-bold sm:text-4xl">Siap Memulai Legalitas Usahamu?</h2>
          <p className="mx-auto mt-4 max-w-xl text-primary-foreground/85">Konsultasikan kebutuhan NPWP, NIB, atau PT Perorangan bersama LegalCraft.</p>
          <button onClick={() => consult()} className="mt-8 inline-flex items-center gap-2 rounded-full bg-card px-8 py-3.5 font-semibold text-primary transition hover:-translate-y-0.5">
            Konsultasi Sekarang <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="kontak" className="bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 font-display text-xl font-bold"><ShieldCheck className="h-6 w-6" /> LegalCraft</div>
            <p className="mt-4 text-sm text-primary-foreground/80">LegalCraft membantu individu dan pelaku usaha memahami serta menjalani proses pengurusan legalitas dengan lebih praktis.</p>
          </div>
          <FooterCol title="Layanan">
            {(Object.keys(SERVICES) as ServiceId[]).map((id) => (
              <li key={id}><button onClick={() => consult(id)} className="hover:underline">{SERVICES[id].name}</button></li>
            ))}
          </FooterCol>
          <FooterCol title="Informasi">
            <li><a href="#beranda" className="hover:underline">Tentang Kami</a></li>
            <li><a href="#faq" className="hover:underline">FAQ</a></li>
            <li><a href="#kontak" className="hover:underline">Kontak</a></li>
          </FooterCol>
          <FooterCol title="Hubungi Kami">
            <li><a href="https://wa.me/6287797890306" target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" /> +62 877-9789-0306</a></li>
            <li><a href="mailto:legalcraft.contact@gmail.com" className="flex items-center gap-2 break-all hover:underline"><Mail className="h-4 w-4 shrink-0" /> legalcraft.contact@gmail.com</a></li>
            <li className="flex items-start gap-2"><Clock className="mt-0.5 h-4 w-4 shrink-0" /><span>Setiap hari: 09.00–22.00 WIB<br />Minggu: 09.00–17.00 WIB</span></li>
          </FooterCol>
        </div>
        <div className="border-t border-primary-foreground/15">
          <div className="mx-auto max-w-6xl space-y-2 px-4 py-6 text-xs text-primary-foreground/70">
            <p>© 2026 LegalCraft. All rights reserved.</p>
            <p>LegalCraft merupakan penyedia jasa bantuan pengurusan legalitas dan bukan instansi pemerintah. Penerbitan serta persetujuan dokumen berada pada kewenangan instansi terkait sesuai ketentuan yang berlaku.</p>
          </div>
        </div>
      </footer>

      {/* FLOATING WA */}
      <button aria-label="Konsultasi via WhatsApp" onClick={() => consult()} className="fixed bottom-5 right-5 z-30 grid h-14 w-14 place-items-center rounded-full bg-gradient-deep text-primary-foreground shadow-lift transition hover:scale-105">
        <MessageCircle className="h-6 w-6" />
      </button>

      {modal.open && <ConsultModal initial={modal.service} onClose={() => setModal({ open: false, service: "" })} />}
    </div>
  );
}

function SectionHead({ title, sub }: { title: string; sub: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <h2 className="text-3xl font-bold sm:text-4xl">{title}</h2>
      <p className="mt-3 text-muted-foreground">{sub}</p>
    </div>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="font-semibold">{title}</h4>
      <ul className="mt-4 space-y-3 text-sm text-primary-foreground/80">{children}</ul>
    </div>
  );
}

function TestiCarousel({ items }: { items: string[][] }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const [perView, setPerView] = useState(3);
  useEffect(() => {
    const r = () => setPerView(window.innerWidth < 640 ? 1 : window.innerWidth < 1024 ? 2 : 3);
    r(); window.addEventListener("resize", r);
    return () => window.removeEventListener("resize", r);
  }, []);
  const max = items.length - perView;
  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setInterval(() => setIdx((i) => (i >= max ? 0 : i + 1)), 3500);
    return () => clearInterval(t);
  }, [paused, max]);
  const cur = Math.min(idx, max);
  return (
    <div className="mx-auto mt-12 max-w-6xl px-4" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="overflow-hidden py-4">
        <div className="flex transition-transform duration-700 ease-out" style={{ transform: `translateX(-${(cur * 100) / perView}%)` }}>
          {items.map(([text, svc], i) => (
            <div key={i} className="shrink-0 px-3" style={{ width: `${100 / perView}%` }}>
              <div className="h-full rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div className="flex gap-1 text-star">{Array.from({ length: 5 }).map((_, k) => <Star key={k} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-4 text-sm text-foreground">"{text}"</p>
                <div className="mt-5 flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-gradient-deep font-display text-sm font-semibold text-primary-foreground">PL</span>
                  <div>
                    <div className="text-sm font-semibold">Pelanggan LegalCraft</div>
                    <div className="text-xs text-muted-foreground">{svc}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {Array.from({ length: max + 1 }).map((_, i) => (
          <button key={i} aria-label={`Slide ${i + 1}`} onClick={() => setIdx(i)} className={`h-2.5 rounded-full transition-all ${i === cur ? "w-8 bg-primary" : "w-2.5 bg-primary/25"}`} />
        ))}
      </div>
    </div>
  );
}

function ConsultModal({ initial, onClose }: { initial: ServiceId | ""; onClose: () => void }) {
  const [d, setD] = useState<ConsultData>({ name: "", email: "", phone: "", service: initial, note: "" });
  const [errors, setErrors] = useState<ReturnType<typeof validateConsult>>({});

  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", k);
    document.body.style.overflow = "hidden";
    return () => { document.removeEventListener("keydown", k); document.body.style.overflow = ""; };
  }, [onClose]);

  const set = (k: keyof ConsultData) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setD({ ...d, [k]: e.target.value });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validateConsult(d);
    setErrors(errs);
    if (Object.keys(errs).length) return;
    window.open(buildWhatsAppUrl(d), "_blank");
    onClose();
  };

  const input = "mt-1.5 w-full rounded-xl border border-input bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20";
  const err = (k: keyof ConsultData) => errors[k] && <p className="mt-1 text-xs text-destructive">{errors[k]}</p>;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-foreground/50 p-0 backdrop-blur-sm sm:items-center sm:p-4" onClick={onClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="consult-title" onClick={(e) => e.stopPropagation()} className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-t-3xl bg-card shadow-lift sm:rounded-3xl">
        <div className="relative bg-gradient-deep px-6 py-6 text-primary-foreground">
          <h3 id="consult-title" className="text-xl font-semibold">Form Konsultasi</h3>
          <p className="mt-1 text-sm text-primary-foreground/80">Isi data berikut, lalu lanjutkan ke WhatsApp.</p>
          <button aria-label="Tutup" onClick={onClose} className="absolute right-4 top-4 rounded-full p-1.5 hover:bg-primary-foreground/15"><X className="h-5 w-5" /></button>
        </div>
        <form noValidate onSubmit={submit} className="space-y-4 p-6">
          <label className="block text-sm font-medium">Nama Lengkap
            <input className={input} placeholder="Masukkan nama lengkap" value={d.name} onChange={set("name")} />{err("name")}
          </label>
          <label className="block text-sm font-medium">Email
            <input type="email" className={input} placeholder="Masukkan alamat email" value={d.email} onChange={set("email")} />{err("email")}
          </label>
          <label className="block text-sm font-medium">Nomor WhatsApp
            <input type="tel" className={input} placeholder="Masukkan nomor WhatsApp" value={d.phone} onChange={set("phone")} />{err("phone")}
          </label>
          <label className="block text-sm font-medium">Pilih Layanan
            <select className={input} value={d.service} onChange={set("service")}>
              <option value="">-- Pilih layanan --</option>
              {(Object.keys(SERVICES) as ServiceId[]).map((id) => (
                <option key={id} value={id}>{SERVICES[id].name} — {formatRupiah(SERVICES[id].price)}</option>
              ))}
            </select>{err("service")}
          </label>
          <label className="block text-sm font-medium">Pesan Tambahan <span className="text-muted-foreground">(opsional)</span>
            <textarea rows={3} className={input} placeholder="Jelaskan kebutuhan legalitas kamu..." value={d.note} onChange={set("note")} />
          </label>
          <button type="submit" className="flex w-full items-center justify-center gap-2 rounded-full bg-gradient-deep py-3.5 font-semibold text-primary-foreground shadow-soft transition hover:shadow-lift">
            <MessageCircle className="h-5 w-5" /> Lanjutkan ke WhatsApp
          </button>
        </form>
      </div>
    </div>
  );
}
