import { addDays } from "@/lib/dates";
import { localPhotos, type LocalPhotoKey } from "./media";
import type { Photo, Trip } from "./types";

/**
 * DATA DEMO open trip.
 *
 * Tanggal ditulis sebagai offset hari dari "hari ini" supaya demo selalu terlihat
 * upcoming. Di versi klien (CMS), cukup ganti `getTrips()` agar mengembalikan
 * data dengan `startDate` / `endDate` absolut — bentuk `Trip` tetap sama.
 */

type TripSeed = Omit<Trip, "startDate" | "endDate"> & {
  /** Berangkat H+n dari hari ini (negatif = sudah lewat). */
  startsInDays: number;
  /** Lama trip dalam hari (3D2N = 3). */
  days: number;
};

const local = (key: LocalPhotoKey): Photo => ({ ...localPhotos[key] });

const tripSeeds: TripSeed[] = [
  {
    slug: "bromo-midnight-sunrise",
    title: "Bromo Midnight Sunrise",
    destination: "Bromo, Jawa Timur",
    category: "gunung",
    tagline: "Berangkat tengah malam, pulang bawa sunrise paling dramatis se-Jawa.",
    description:
      "Trip singkat tapi nendang. Kita jemput tengah malam dari Malang, naik jeep ke Penanjakan buat ngejar golden hour, lanjut lautan pasir, kawah Bromo, Bukit Teletubbies, sampai Pasir Berbisik. Cocok buat kamu yang cutinya mepet tapi pengen healing beneran.",
    coverImage: local("bromo"),
    gallery: [local("bromo"), local("sindoro"), local("rinjani")],
    startsInDays: 11,
    days: 2,
    durationLabel: "2D1N",
    meetingPoint: {
      name: "Stasiun Malang Kota Baru",
      address: "Jl. Trunojoyo, Kiduldalem, Kec. Klojen, Kota Malang",
      time: "23.00 WIB",
      mapsUrl: "https://maps.google.com/?q=Stasiun+Malang+Kota+Baru",
    },
    price: 650_000,
    originalPrice: 799_000,
    quota: { total: 14, booked: 12 },
    highlights: [
      "Sunrise di Penanjakan 1 tanpa desak-desakan",
      "Jeep 4x4 private, 1 jeep maksimal 6 orang",
      "Lautan pasir, kawah Bromo & Bukit Teletubbies",
      "Dokumentasi foto & video drone",
    ],
    itinerary: [
      {
        day: 1,
        title: "Meet up & midnight ride",
        activities: [
          "23.00 kumpul di Stasiun Malang Kota Baru, kenalan dulu sama circle baru",
          "23.30 berangkat ke Tumpang, transit jeep",
          "Ngopi & jagung bakar di rest area Jemplang",
        ],
      },
      {
        day: 2,
        title: "Sunrise, kawah & pulang",
        activities: [
          "03.30 naik ke Penanjakan 1, siap-siap golden hour",
          "06.30 lautan pasir & naik tangga ke bibir kawah Bromo",
          "08.30 Pasir Berbisik & Bukit Teletubbies",
          "11.00 sarapan bareng, lanjut drop di Stasiun Malang",
        ],
      },
    ],
    includes: [
      "Jeep 4x4 PP Tumpang–Bromo",
      "Tiket masuk TNBTS (weekday)",
      "Trip leader & driver berpengalaman",
      "Sarapan 1x & air mineral",
      "Dokumentasi foto + video drone",
    ],
    excludes: ["Transport ke Malang", "Sewa jaket & kuda", "Pengeluaran pribadi"],
    tags: ["sunrise", "short getaway", "pemula friendly"],
    featured: true,
  },
  {
    slug: "sailing-komodo-labuan-bajo",
    title: "Sailing Komodo 3D2N",
    destination: "Labuan Bajo, NTT",
    category: "sailing",
    tagline: "Tidur di kapal phinisi, bangun di tengah taman nasional paling iconic.",
    description:
      "Tiga hari full di laut Flores: trekking Pulau Padar pas sunrise, ketemu komodo langsung di habitatnya, snorkeling bareng manta, dan main pasir di Pink Beach. Kabin AC, makan enak di kapal, dan sunset tiap hari. Ini trip yang bikin feed kamu naik level.",
    coverImage: local("padar"),
    gallery: [local("padar"), local("phinisi"), local("piaynemo"), local("kelingking")],
    startsInDays: 23,
    days: 3,
    durationLabel: "3D2N",
    meetingPoint: {
      name: "Bandara Komodo Labuan Bajo",
      address: "Jl. Bandara Komodo, Labuan Bajo, Manggarai Barat, NTT",
      time: "09.00 WITA",
      mapsUrl: "https://maps.google.com/?q=Bandara+Komodo+Labuan+Bajo",
    },
    price: 3_450_000,
    originalPrice: 3_900_000,
    quota: { total: 16, booked: 9 },
    highlights: [
      "Sunrise trekking di Pulau Padar",
      "Lihat komodo di Pulau Komodo / Rinca",
      "Snorkeling di Manta Point & Pink Beach",
      "Kapal phinisi kabin AC sharing",
    ],
    itinerary: [
      {
        day: 1,
        title: "Welcome aboard",
        activities: [
          "Penjemputan di bandara, transfer ke pelabuhan",
          "Check-in kapal & safety briefing",
          "Pulau Kelor & Manjarite, snorkeling pertama",
          "Sunset di Pulau Kalong sambil lihat ribuan kalong terbang",
        ],
      },
      {
        day: 2,
        title: "Padar, Komodo & Pink Beach",
        activities: [
          "Sunrise trekking Pulau Padar",
          "Pink Beach: berenang & foto-foto",
          "Pulau Komodo bareng ranger",
          "Manta Point & Taka Makassar",
        ],
      },
      {
        day: 3,
        title: "Kanawa & pulang",
        activities: ["Snorkeling Pulau Kanawa", "Brunch di kapal", "Drop di bandara / hotel area Labuan Bajo"],
      },
    ],
    includes: [
      "Kapal phinisi kabin AC sharing",
      "Makan 3x sehari + snack",
      "Tiket masuk TN Komodo & ranger",
      "Alat snorkeling & life jacket",
      "Trip leader + dokumentasi",
    ],
    excludes: ["Tiket pesawat", "Hotel sebelum/sesudah trip", "Tips kru (opsional)"],
    tags: ["sailing", "snorkeling", "best seller"],
    featured: true,
  },
  {
    slug: "nusa-penida-island-hopping",
    title: "Nusa Penida Island Hopping",
    destination: "Nusa Penida, Bali",
    category: "pulau",
    tagline: "Kelingking, Diamond Beach & snorkeling bareng manta dalam satu trip.",
    description:
      "Bali versi lebih liar. Kita eksplor sisi barat dan timur Nusa Penida, snorkeling bareng manta di Crystal Bay, terus sunset di Atuh. Nginep di villa dengan pool, tinggal bawa baju renang dan energi.",
    coverImage: local("kelingking"),
    gallery: [local("kelingking"), local("piaynemo"), local("phinisi"), local("padar")],
    startsInDays: 17,
    days: 3,
    durationLabel: "3D2N",
    meetingPoint: {
      name: "Pelabuhan Sanur",
      address: "Jl. Matahari Terbit, Sanur, Denpasar Selatan, Bali",
      time: "07.30 WITA",
      mapsUrl: "https://maps.google.com/?q=Pelabuhan+Sanur",
    },
    price: 1_850_000,
    quota: { total: 20, booked: 11 },
    highlights: [
      "Kelingking Beach & Broken Beach",
      "Snorkeling Manta Bay + Crystal Bay",
      "Diamond Beach & Atuh sunset",
      "Villa private pool, 1 kamar ber-2",
    ],
    itinerary: [
      {
        day: 1,
        title: "Nyebrang & west tour",
        activities: ["Fast boat Sanur–Penida", "Kelingking Beach", "Broken Beach & Angel's Billabong", "Check-in villa"],
      },
      {
        day: 2,
        title: "Snorkeling day",
        activities: ["Manta Bay, Gamat Bay, Crystal Bay", "Makan siang seafood", "Free time di villa & pool party kecil"],
      },
      {
        day: 3,
        title: "East tour & pulang",
        activities: ["Diamond Beach & Atuh", "Rumah Pohon Molenteng", "Fast boat balik ke Sanur"],
      },
    ],
    includes: [
      "Fast boat PP Sanur–Penida",
      "Villa 2 malam (twin sharing)",
      "Mobil + driver selama di Penida",
      "Paket snorkeling 4 spot",
      "Makan 5x & tiket wisata",
    ],
    excludes: ["Transport ke Sanur", "Sewa GoPro", "Pengeluaran pribadi"],
    tags: ["pantai", "snorkeling", "villa"],
    featured: true,
  },
  {
    slug: "rinjani-summit-crater-lake",
    title: "Rinjani Summit & Segara Anak",
    destination: "Lombok, NTB",
    category: "gunung",
    tagline: "Summit 3.726 mdpl, camping di bibir kawah, berendam air panas.",
    description:
      "Trip buat yang pengen naik level. Via Sembalun, kita camping di Plawangan, summit attack dini hari, lalu turun ke Danau Segara Anak buat berendam di air panas. Porter, tenda, dan logistik kita yang urus, kamu fokus jalan aja.",
    coverImage: local("rinjani"),
    gallery: [local("rinjani"), local("airTerjun"), local("sindoro"), local("bromo")],
    startsInDays: 30,
    days: 4,
    durationLabel: "4D3N",
    meetingPoint: {
      name: "Bandara Internasional Lombok",
      address: "Jl. Bypass BIL, Praya, Lombok Tengah, NTB",
      time: "08.00 WITA",
      mapsUrl: "https://maps.google.com/?q=Bandara+Internasional+Lombok",
    },
    price: 2_950_000,
    quota: { total: 12, booked: 12 },
    highlights: [
      "Summit Rinjani 3.726 mdpl",
      "Camping di Plawangan Sembalun",
      "Danau Segara Anak & hot spring",
      "Porter, tenda & makan full",
    ],
    itinerary: [
      {
        day: 1,
        title: "Sembalun – Plawangan",
        activities: ["Transfer ke Sembalun & briefing", "Trekking savana Sembalun", "Camp di Plawangan Sembalun"],
      },
      {
        day: 2,
        title: "Summit attack",
        activities: ["02.00 summit attack", "Sunrise di puncak", "Turun ke Danau Segara Anak & berendam"],
      },
      {
        day: 3,
        title: "Segara Anak – Senaru",
        activities: ["Santai di danau", "Naik ke Plawangan Senaru", "Camp terakhir dengan view danau"],
      },
      {
        day: 4,
        title: "Turun & pulang",
        activities: ["Turun via Senaru", "Makan siang di basecamp", "Drop bandara / Senggigi"],
      },
    ],
    includes: [
      "Transport bandara–basecamp PP",
      "Porter & guide lokal berlisensi",
      "Tenda, sleeping bag & matras",
      "Makan 3x sehari selama pendakian",
      "Tiket masuk TN Gunung Rinjani",
    ],
    excludes: ["Tiket pesawat", "Porter pribadi", "Peralatan pribadi (sepatu, headlamp)"],
    tags: ["summit", "camping", "challenging"],
    featured: false,
  },
  {
    slug: "raja-ampat-piaynemo",
    title: "Raja Ampat Piaynemo Escape",
    destination: "Raja Ampat, Papua Barat Daya",
    category: "pulau",
    tagline: "Gugusan karst Piaynemo, laut paling biru, dan sunyi yang mahal.",
    description:
      "Bucket list level akhir. Lima hari menjelajah Raja Ampat: view legendaris Piaynemo, snorkeling di salah satu terumbu karang terkaya di dunia, ketemu cenderawasih, dan nginep di homestay di atas laut. Kuota kecil biar tetap intimate.",
    coverImage: local("wayag"),
    gallery: [local("wayag"), local("piaynemo"), local("pulauCottage"), local("phinisi")],
    startsInDays: 58,
    days: 5,
    durationLabel: "5D4N",
    meetingPoint: {
      name: "Bandara Domine Eduard Osok",
      address: "Jl. Basuki Rahmat, Kota Sorong, Papua Barat Daya",
      time: "10.00 WIT",
      mapsUrl: "https://maps.google.com/?q=Bandara+Domine+Eduard+Osok",
    },
    price: 8_900_000,
    originalPrice: 9_750_000,
    quota: { total: 12, booked: 4 },
    highlights: [
      "Viewpoint Piaynemo & Telaga Bintang",
      "Snorkeling Arborek & Cape Kri",
      "Birdwatching cenderawasih",
      "Homestay di atas laut",
    ],
    itinerary: [
      {
        day: 1,
        title: "Sorong – Waisai",
        activities: ["Ferry Sorong–Waisai", "Check-in homestay", "Sunset di dermaga"],
      },
      {
        day: 2,
        title: "Piaynemo day",
        activities: ["Speedboat ke Piaynemo", "Telaga Bintang", "Snorkeling Melissa's Garden"],
      },
      {
        day: 3,
        title: "Arborek & manta",
        activities: ["Kampung Arborek", "Manta Sandy", "Snorkeling Cape Kri"],
      },
      {
        day: 4,
        title: "Cenderawasih & chill",
        activities: ["Birdwatching subuh", "Pasir Timbul", "Bakar ikan bareng warga"],
      },
      {
        day: 5,
        title: "Pulang",
        activities: ["Sarapan santai", "Ferry ke Sorong", "Drop bandara"],
      },
    ],
    includes: [
      "Ferry & speedboat selama trip",
      "Homestay 4 malam",
      "Makan 3x sehari",
      "Tiket konservasi Raja Ampat",
      "Guide lokal + dokumentasi",
    ],
    excludes: ["Tiket pesawat ke Sorong", "Sewa alat diving", "Pengeluaran pribadi"],
    tags: ["bucket list", "snorkeling", "small group"],
    featured: true,
  },
  {
    slug: "toraja-heritage-trip",
    title: "Toraja Heritage Trip",
    destination: "Tana Toraja, Sulawesi Selatan",
    category: "budaya",
    tagline: "Rumah tongkonan, negeri di atas awan, dan cerita budaya yang bikin merinding.",
    description:
      "Trip budaya yang bikin kamu pulang dengan perspektif baru. Kita jalan ke Kete Kesu, Lemo, Londa, sampai Lolai, negeri di atas awan, ditemani guide lokal yang ceritanya seru banget. Plus kopi Toraja langsung dari kebunnya.",
    coverImage: local("toraja"),
    gallery: [local("toraja"), local("sumba"), local("bromo")],
    startsInDays: 40,
    days: 4,
    durationLabel: "4D3N",
    meetingPoint: {
      name: "Bandara Sultan Hasanuddin",
      address: "Jl. Bandara Baru, Maros, Sulawesi Selatan",
      time: "20.00 WITA",
      mapsUrl: "https://maps.google.com/?q=Bandara+Sultan+Hasanuddin",
    },
    price: 3_250_000,
    quota: { total: 15, booked: 13 },
    highlights: [
      "Sunrise negeri di atas awan Lolai",
      "Kete Kesu, Lemo & Londa",
      "Ngopi di kebun kopi Toraja",
      "Guide lokal asli Toraja",
    ],
    itinerary: [
      {
        day: 1,
        title: "Makassar – Toraja",
        activities: ["Kumpul di bandara", "Perjalanan malam ke Rantepao (bus sleeper)"],
      },
      {
        day: 2,
        title: "Heritage day",
        activities: ["Kete Kesu", "Batu Tumonga", "Lemo & Londa", "Pasar Bolu (jika hari pasar)"],
      },
      {
        day: 3,
        title: "Di atas awan",
        activities: ["Sunrise Lolai", "Kebun kopi & cupping", "Malam kembali ke Makassar"],
      },
      {
        day: 4,
        title: "Makassar city",
        activities: ["Pantai Losari", "Kuliner coto & pisang epe", "Drop bandara"],
      },
    ],
    includes: [
      "Bus sleeper PP Makassar–Toraja",
      "Hotel 1 malam di Rantepao",
      "Mobil & guide lokal",
      "Tiket semua objek wisata",
      "Makan 6x",
    ],
    excludes: ["Tiket pesawat", "Oleh-oleh", "Pengeluaran pribadi"],
    tags: ["budaya", "sunrise", "kuliner"],
    featured: false,
  },
  {
    slug: "sumba-savana-roadtrip",
    title: "Sumba Savana Roadtrip",
    destination: "Sumba, NTT",
    category: "budaya",
    tagline: "Bukit savana, kuda Sandalwood, dan kampung adat yang masih hidup.",
    description:
      "Roadtrip ke pulau yang vibes-nya beda sendiri. Bukit Wairinding pas golden hour, Danau Weekuri yang airnya sebening kaca, kampung adat Ratenggaro, dan air terjun Tanggedu. Siapin memori HP, beneran.",
    coverImage: local("sumba"),
    gallery: [local("sumba"), local("toraja"), local("padar")],
    startsInDays: 47,
    days: 4,
    durationLabel: "4D3N",
    meetingPoint: {
      name: "Bandara Tambolaka",
      address: "Tambolaka, Sumba Barat Daya, NTT",
      time: "11.00 WITA",
      mapsUrl: "https://maps.google.com/?q=Bandara+Tambolaka",
    },
    price: 4_150_000,
    originalPrice: 4_500_000,
    quota: { total: 14, booked: 6 },
    highlights: [
      "Golden hour di Bukit Wairinding",
      "Danau Weekuri & Pantai Mandorak",
      "Kampung adat Ratenggaro",
      "Air terjun Tanggedu",
    ],
    itinerary: [
      {
        day: 1,
        title: "Sumba Barat Daya",
        activities: ["Penjemputan bandara", "Danau Weekuri", "Pantai Mandorak", "Sunset Ratenggaro"],
      },
      {
        day: 2,
        title: "Menyeberang ke timur",
        activities: ["Air Terjun Lapopu", "Perjalanan ke Waingapu", "Sunset Bukit Wairinding"],
      },
      {
        day: 3,
        title: "Sumba Timur",
        activities: ["Air Terjun Tanggedu", "Bukit Warinding & Persaudaraan", "Pantai Walakiri saat senja"],
      },
      {
        day: 4,
        title: "Pulang",
        activities: ["Sarapan & belanja tenun", "Drop Bandara Umbu Mehang Kunda"],
      },
    ],
    includes: [
      "Mobil + driver selama trip",
      "Hotel 3 malam",
      "Makan 3x sehari",
      "Tiket & retribusi wisata",
      "Trip leader + dokumentasi",
    ],
    excludes: ["Tiket pesawat", "Sewa kuda / kain tenun", "Pengeluaran pribadi"],
    tags: ["roadtrip", "savana", "budaya"],
    featured: false,
  },
  {
    slug: "sindoro-sunrise-hike",
    title: "Sindoro Sunrise Hike",
    destination: "Wonosobo, Jawa Tengah",
    category: "gunung",
    tagline: "Pendakian 2 hari buat lihat Sumbing & Merapi muncul dari lautan awan.",
    description:
      "Gunung favorit buat naik kelas dari bukit ke gunung beneran. Jalur Kledung, camp di pos 3, summit pas subuh, dan view Sumbing di depan mata. Batch ini sudah berangkat, tapi batch berikutnya segera dibuka!",
    coverImage: local("sindoro"),
    gallery: [local("sindoro"), local("bromo"), local("rinjani")],
    startsInDays: -6,
    days: 2,
    durationLabel: "2D1N",
    meetingPoint: {
      name: "Basecamp Kledung",
      address: "Kledung, Temanggung, Jawa Tengah",
      time: "08.00 WIB",
      mapsUrl: "https://maps.google.com/?q=Basecamp+Kledung+Sindoro",
    },
    price: 550_000,
    quota: { total: 15, booked: 15 },
    highlights: ["Summit Sindoro 3.153 mdpl", "Camping di pos 3", "View Sumbing dari dekat", "Guide & tenda"],
    itinerary: [
      {
        day: 1,
        title: "Basecamp – Pos 3",
        activities: ["Briefing & ojek ke pos 1", "Trekking ke pos 3", "Camp & masak bareng"],
      },
      {
        day: 2,
        title: "Summit & turun",
        activities: ["03.00 summit attack", "Sunrise di puncak", "Turun & bersih-bersih di basecamp"],
      },
    ],
    includes: ["Guide & porter tenda", "Tenda & matras", "Makan 3x", "Simaksi"],
    excludes: ["Transport ke basecamp", "Ojek pos 1", "Peralatan pribadi"],
    tags: ["sunrise", "camping", "pemula friendly"],
    featured: false,
  },
];

/** Ambil semua trip dengan tanggal absolut relatif terhadap `today` (YYYY-MM-DD). */
export function getTrips(today: string): Trip[] {
  return tripSeeds.map(({ startsInDays, days, ...trip }) => {
    const startDate = addDays(today, startsInDays);
    return { ...trip, startDate, endDate: addDays(startDate, days - 1) };
  });
}
