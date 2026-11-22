import { Feature } from "./Feature";

const SpeedIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const UserCheckIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const ChatIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const ShieldIcon = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
);

const features = [
  {
    title: "Respon Cepat",
    description: "Mendapatkan jawaban seketika tanpa perlu menunggu proses yang lama.",
    icon: <SpeedIcon />,
  },
  {
    title: "Sangat Mudah Dipakai",
    description: "Cukup ketik pertanyaan pada kolom input dan klik kirim.",
    icon: <UserCheckIcon />,
  },
  {
    title: "Bantuan Serbaguna",
    description: "Membantu tanya jawab, merangkum materi, hingga mencari ide baru.",
    icon: <ChatIcon />,
  },
  {
    title: "Aman & Langsung di Web",
    description: "Dapat langsung diakses dari browser tanpa perlu download aplikasi.",
    icon: <ShieldIcon />,
  },
];

export const Features = () => {
  return (
    <section id="features" className="bg-[#030712] text-white py-14 sm:py-18 relative scroll-mt-12">
      <div className="container mx-auto px-4 sm:px-6 max-w-4xl">
        <div className="text-center">
          <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase">
            Fitur Utama
          </span>
          <h2 className="mt-2 font-bold text-3xl sm:text-4xl text-white">
            Kemudahan yang Anda Dapatkan
          </h2>
          <p className="mt-2 text-sm sm:text-base text-gray-400 max-w-md mx-auto">
            Fokus pada hal penting dengan asisten yang selalu siap membantu.
          </p>
        </div>

        {/* Grid kartu fitur yang rapi dan ringkas */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6 flex items-start gap-4 hover:border-indigo-500/30 transition-colors"
            >
              <div className="flex-none inline-flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-cyan-400 border border-indigo-500/20">
                {feature.icon}
              </div>
              <div>
                <h3 className="font-semibold text-base text-white">
                  {feature.title}
                </h3>
                <p className="mt-1 text-sm text-gray-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
