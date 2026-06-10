import { Icon } from "@iconify/react";
const PORTALS = [
  {
    id: 1,
    nama: "Aplikasi SPK",
    kode: "SPK",
    url: "https://spk.alfascorpii.id",
    icon: "mdi:clipboard-text",
  },
  {
    id: 2,
    nama: "Sistem HRIS",
    kode: "HRIS",
    url: "https://hris.alfascorpii.id",
    icon: "mdi:account-group",
  },
  {
    id: 3,
    nama: "Laporan Keuangan",
    kode: "FIN",
    url: "https://finance.alfascorpii.id",
    icon: "mdi:finance",
  },
  {
    id: 4,
    nama: "Chat Tim",
    kode: "CHAT",
    url: "https://chat.alfascorpii.id",
    icon: "mdi:forum",
  },
  {
    id: 5,
    nama: "Aset Pemasaran",
    kode: "MKT",
    url: "https://assets.alfascorpii.id",
    icon: "mdi:package-variant-closed",
  },
  {
    id: 6,
    nama: "Pusat Belajar",
    kode: "LRN",
    url: "https://learn.alfascorpii.id",
    icon: "mdi:school",
  },
];
function PortalCard({ portal }: { portal: (typeof PORTALS)[number] }) {
  return (
    <div className="group relative p-6 rounded-3xl bg-surface-container-low/70 backdrop-blur-md hover:shadow-lg hover:shadow-primary/5 hover:scale-[1.01] transition-all duration-500 cursor-pointer">
      <div className="flex items-start gap-4">
        <div className="w-12 h-12 rounded-xl bg-surface-container-highest flex items-center justify-center shrink-0 text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-on-primary transition-all duration-300">
          <Icon icon={portal.icon} className="text-2xl" />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold truncate group-hover:text-primary transition-colors">
            {portal.nama}
          </h3>
          <p className="text-on-surface-variant text-xs mt-0.5">
            Kode:{" "}
            <span className="font-mono font-medium text-on-surface">
              {portal.kode}
            </span>
          </p>
          <p className="text-on-surface-variant text-[11px] mt-1 truncate opacity-70">
            {portal.url}
          </p>
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-white/5 flex items-center justify-between">
        <span className="text-[10px] font-medium text-on-surface-variant/50 uppercase tracking-wider">
          Buka Portal
        </span>
        <Icon
          icon="mdi:arrow-right"
          className="text-primary text-lg opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0"
        />
      </div>
    </div>
  );
}

export default PortalCard;
