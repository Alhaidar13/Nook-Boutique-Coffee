// Ubah harga & nomor WhatsApp di sini.
export const WHATSAPP_NUMBER = "6287797890306";

export type ServiceId = "npwp" | "nib" | "pt";

export const SERVICES: Record<ServiceId, { name: string; short: string; price: number }> = {
  npwp: { name: "Pengurusan NPWP", short: "NPWP", price: 150000 },
  nib: { name: "Pengurusan NIB", short: "NIB", price: 150000 },
  pt: { name: "Pendirian PT Perorangan", short: "PT Perorangan", price: 200000 },
};

export const formatRupiah = (n: number) => "Rp" + n.toLocaleString("id-ID").replace(/,/g, ".");

export interface ConsultData {
  name: string;
  email: string;
  phone: string;
  service: ServiceId | "";
  note: string;
}

export function validateConsult(d: ConsultData) {
  const e: Partial<Record<keyof ConsultData, string>> = {};
  if (!d.name.trim()) e.name = "Nama lengkap wajib diisi.";
  if (!d.email.trim()) e.email = "Email wajib diisi.";
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email.trim())) e.email = "Format email tidak valid.";
  if (!d.phone.trim()) e.phone = "Nomor WhatsApp wajib diisi.";
  else if (!/^\+?[0-9\s-]{8,16}$/.test(d.phone.trim())) e.phone = "Nomor WhatsApp tidak valid.";
  if (!d.service) e.service = "Silakan pilih layanan.";
  return e;
}

export function buildWhatsAppUrl(d: ConsultData) {
  const s = SERVICES[d.service as ServiceId];
  const message = `Halo LegalCraft, saya ingin melakukan konsultasi layanan legalitas.

Berikut data saya:

Nama: ${d.name.trim()}
Email: ${d.email.trim()}
Nomor WhatsApp: ${d.phone.trim()}
Layanan: ${s.name}
Harga: ${formatRupiah(s.price)}

Pesan tambahan:
${d.note.trim() || "-"}

Mohon informasi lebih lanjut mengenai persyaratan dan proses pengurusan.

Terima kasih.`;
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
