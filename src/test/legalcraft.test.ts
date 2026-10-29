import { describe, it, expect } from "vitest";
import { SERVICES, formatRupiah, buildWhatsAppUrl, validateConsult } from "@/lib/legalcraft";

describe("LegalCraft rules", () => {
  it("prices are fixed", () => {
    expect(formatRupiah(SERVICES.npwp.price)).toBe("Rp150.000");
    expect(formatRupiah(SERVICES.nib.price)).toBe("Rp150.000");
    expect(formatRupiah(SERVICES.pt.price)).toBe("Rp200.000");
  });
  it("whatsapp url uses LegalCraft number and includes price", () => {
    const url = buildWhatsAppUrl({ name: "A", email: "a@b.co", phone: "0812345678", service: "pt", note: "" });
    expect(url.startsWith("https://wa.me/6287797890306?text=")).toBe(true);
    expect(decodeURIComponent(url.split("text=")[1] ?? "")).toContain("Harga: Rp200.000");
  });
  it("validation rejects bad email and missing service, note optional", () => {
    const e = validateConsult({ name: "A", email: "bad", phone: "0812345678", service: "", note: "" });
    expect(e.email).toBeTruthy();
    expect(e.service).toBeTruthy();
    expect(e.note).toBeUndefined();
  });
});
